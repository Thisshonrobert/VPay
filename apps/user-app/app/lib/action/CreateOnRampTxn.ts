'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

import { headers } from "next/headers";
import { rateLimitter } from "./rateLimitter"; 

export async function CreateOnRampTxn(provider: string, amount: number) {
  const session = await getServerSession(authOptions);
  const token = (Math.random()*1000).toString(); // this should come from a banking api
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
    await prisma.onRampTransaction.create({
      data: {
        userId:Number(userId),
        status: "Processing",
        provider,
        amount,
        startTime: new Date(),
        token,
      },
    });
    await prisma.balance.updateMany({
      where:{
        userId:Number(userId)
      },
      data:{
        locked:amount
      }
    })

    return {
      message: "Onramp Created",
    };
  } catch (error) {
    return {
      error: "Error while Onramping" + error,
    };
  }
}


