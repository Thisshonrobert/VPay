import express from "express";
import db from "@repo/db/client";
import { z } from "zod";

const app = express();

app.use(express.json())


const paymentSchema = z.object({
    token: z.string(),
    user_identifier: z.string(),
    amount: z.string()
});

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here?
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
   
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    const result = paymentSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ message: "Invalid data", errors: result.error.errors });
    }

    try {
        const result = await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: Number(paymentInformation.amount)
                    },
                    locked:{
                        decrement:Number(paymentInformation.amount)
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
        console.log(result); 

        res.json({
            message: "Captured"
        })
    } catch(e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})
console.log("server is running")
app.listen(3003);