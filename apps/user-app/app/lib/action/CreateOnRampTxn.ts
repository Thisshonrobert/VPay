'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function CreateOnRampTxn(provider: string, amount: number) {
  const session = await getServerSession(authOptions);
  const token = (Math.random()*1000).toString(); // this should come from a banking api
  const userId = session.user.id;

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
    return {
      message: "Onramp Created",
    };
  } catch (error) {
    return {
      error: "Error while Onramping" + error,
    };
  }
}