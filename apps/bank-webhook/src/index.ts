import express from "express";
import db from "@repo/db/client";

import swaggerJSDoc from "swagger-jsdoc";
import { z } from "zod";
import swaggerUi from 'swagger-ui-express';
import dotenv from "dotenv";
dotenv.config();

// const db = require("@repo/db/client")
const app = express();

app.use(express.json())

const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "VPay Bank Webhook API",
            version: "1.0.0",
            description: "Swagger documentation for bank webhook - Can hit /hdfcWebhook endpoint instead of actual bank for testing",
        },
    },
    apis: ["./src/index.ts"], // Or wherever you keep your routes/controllers
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const paymentSchema = z.object({
    token: z.string(),
    user_identifier: z.string(),
    amount: z.string(),
    PaymentResponse: z.enum(["Success", "Failure"])
});
/**
 * @swagger
 * /hdfcWebhook:
 *   post:
 *     summary: HDFC webhook for payment response
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               user_identifier:
 *                 type: string
 *               amount:
 *                 type: string
 *               PaymentResponse:
 *                 type: string
 *                 enum: [Success, Failure]
 *     responses:
 *       200:
 *         description: Payment recorded
 *       400:
 *         description: Bad Request
 *       411:
 *         description: Length Required
 */

app.post("/hdfcWebhook", async (req, res) => {

    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them


    // Zod validation
    const validation = paymentSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validation.error.errors
        });
    }
    enum PaymentResponse {
        Success = "Success",
        Failure = "Failure"
    }
    // Use validated data
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string;
        PaymentResponse: PaymentResponse;
    } = {
        token: validation.data.token,
        userId: validation.data.user_identifier,
        amount: validation.data.amount,
        PaymentResponse: validation.data.PaymentResponse === "Success" ? PaymentResponse.Success : PaymentResponse.Failure
    };

    try {
        if (paymentInformation.PaymentResponse !== PaymentResponse.Success) {
            await db.$transaction([
                db.balance.updateMany({
                    where: {
                        userId: Number(paymentInformation.userId)
                    },
                    data: {
                        locked: {
                            decrement: Number(paymentInformation.amount)
                        }
                    }
                }),
                db.onRampTransaction.updateMany({
                    where: {
                        token: paymentInformation.token
                    },
                    data: {
                        status: "Failure",
                    }
                })
            ]);
            return res.status(411).json({
                message: "Error while processing webhook: No records updated"
            });
        }

        else {
            const [balanceUpdate, transactionUpdate] = await db.$transaction([
                db.balance.updateMany({
                    where: {
                        userId: Number(paymentInformation.userId)
                    },
                    data: {
                        amount: {
                            increment: Number(paymentInformation.amount)
                        },
                        locked: {
                            decrement: Number(paymentInformation.amount)
                        }
                    }
                }),
                db.onRampTransaction.updateMany({
                    where: {
                        token: paymentInformation.token
                    },
                    data: {
                        status: "Success",
                    }
                })
            ]);
            try {
                await axios.post(
                    "http://localhost:3002/hooks/catch/1/41ff9d05-7a20-41e3-9874-c0e6ecc6450b",
                    {
                        from: "thisshonrobert0205@gmail.com",
                        to: "thisshonrobert0205@gmail.com",
                        subject: "Vpay Wallet credited",
                        body: `Vpay ₹${paymentInformation.amount} added to your wallet`
                    },
                    {
                        headers: {
                            "X-ZAP-SECRET": process.env.ZAP_SECRET!,
                        }
                    }
                );

            } catch (error) {
                console.error("Failed to send email notification: through Zap", error);
            }
            console.log(balanceUpdate, transactionUpdate);


            res.json({
                message: "Captured"
            });
        }
    } catch (e) {
        console.error(e);
        // On failure, update transaction status to 'Failed' and remove locked amount
        try {
            await db.$transaction([
                db.balance.updateMany({
                    where: {
                        userId: Number(paymentInformation.userId)
                    },
                    data: {
                        locked: {
                            decrement: Number(paymentInformation.amount)
                        }
                    }
                }),
                db.onRampTransaction.updateMany({
                    where: {
                        token: paymentInformation.token
                    },
                    data: {
                        status: "Failure",
                    }
                })
            ]);
        } catch (dbError) {
            console.error("DB update on failure also failed:", dbError);
        }
        res.status(411).json({
            message: "Error while processing webhook"
        });
    }

})
app.listen(3003, () => {
    console.log("Server running at http://localhost:3003");
    console.log("Docs available at http://localhost:3003/api-docs");
});



