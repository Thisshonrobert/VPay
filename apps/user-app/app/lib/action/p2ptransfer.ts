"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2ptransfer(tonumber: string, amount: number) {
  const session = await getServerSession(authOptions);
  const fromuserId = session.user.id;

  if (!fromuserId) {
    return {
      message: "Error while sending",
    };
  }
  const toUser = await prisma.user.findFirst({
    where: {
      number: tonumber,
    },
  });

  if (!toUser) {
    return {
      message: "User not found",
    };
  }

  await prisma.$transaction(async (tnx) => {
    const fromBalance = await tnx.balance.findUnique({
      where: {
        userId: Number(fromuserId),
      },
    });
    if (!fromBalance || fromBalance.amount < amount) {
       throw new Error("Insufficient Balance")
    }

    await tnx.balance.update({
      where: {
        userId: Number(fromuserId),
      },
      data: {
        amount: {
          decrement: amount,
        },
      },
    });
    await tnx.balance.update({
      where: { userId: toUser.id },
      data: { amount: { increment: amount } },
    });
  });
}