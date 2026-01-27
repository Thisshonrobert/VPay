'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

import { headers } from "next/headers";
import { rateLimitter } from "./rateLimitter";
import { revalidatePath } from "next/cache"; 

export async function CreateOnRampTxn(provider: string, amount: number) {
  const session = await getServerSession(authOptions);
  // const token = (Math.random()*1000).toString(); // this should come from a banking api
  const userId = session!.user.id;
 
  const ip = headers().get("x-forwarded-for") ?? "unknown";
  const isRateLimited= rateLimitter(ip);
  if (isRateLimited) {
    return {
      message:"too many request , try after 10 mins",
      status:"error"
    }
  }

  if (!userId) {
    return {
      message: "User not found",
    };
  }
  try {
    // await prisma.onRampTransaction.create({
    //   data: {
    //     userId:Number(userId),
    //     status: "Processing",
    //     provider,
    //     amount,
    //     startTime: new Date(),
    //     token,
    //   },
    // });
    const txn = await prisma.onRampTransaction.create({
    data: {
      userId: Number(userId),
      provider,
      amount,
      status: "Initiated",
      startTime: new Date()
    }
  });
   const bankResponse = await fetch("http://localhost:3004/bank-server/api/create-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId:Number(userId),
      amount:String(amount),
      referenceId: txn.id,
    })
  });
   const { paymentToken, redirectUrl } = await bankResponse.json();
    await prisma.onRampTransaction.update({
    where: { id: txn.id },
    data: {
      token: paymentToken,
      status: "Processing"
    }
  });
    await prisma.balance.updateMany({
      where: {
        userId: Number(userId)
      },
      data: {
        locked: {
          increment: amount
        }
      }
    })

    revalidatePath('/dashboard/transfer');
    return {
      message: "Onramp Created",
      paymentToken:paymentToken,
      redirectUrl:redirectUrl

    };
  } catch (error) {
    return {
      error: "Error while Onramping" + error,
    };
  }
}


