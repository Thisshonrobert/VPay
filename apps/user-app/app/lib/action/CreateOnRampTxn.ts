'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
import { useMessage } from "hooks/useMessage";

export async function CreateOnRampTxn(provider: string, amount: number) {
  const session = await getServerSession(authOptions);
  const token = (Math.random()*1000).toString(); // this should come from a banking api
  const userId = session!.user.id;
  const {bark} = useMessage();

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
    bark({ message: "OnRamp Initiated", success: true });

    return {
      message: "Onramp Created",
    };
  } catch (error) {
    return {
      error: "Error while Onramping" + error,
    };
  }
}
