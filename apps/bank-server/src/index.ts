import express from "express";
import { type Response, type Request } from "express";
import { z } from "zod";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const REDIRECT_URL = process.env.REDIRECT_URL 

app.use(express.json())


const initializeToken = z.object({
      userId:z.number(),
      amount:z.string(),
      referenceId: z.number(),
     
})

app.post('/bank-server/api/create-payment',async(req:Request,res:Response)=>{
     const validation = initializeToken.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validation.error.errors
        });
    }
     const paymentInformation: {
       userId:number,
      amount:string,
      refId: number,
    } = {
        userId: validation.data.userId,
        amount: validation.data.amount,
        refId: validation.data.referenceId,  
    };

    
    
    const paymentToken = Buffer.from(JSON.stringify(paymentInformation)).toString('base64');
    
    res.json({
      paymentToken,
      redirectUrl: `${REDIRECT_URL}/bankfrontend?token=${paymentToken}`
    });
})


app.listen(3004,()=>{
    console.log('BANK SERVER RUNNING at 3004')
})