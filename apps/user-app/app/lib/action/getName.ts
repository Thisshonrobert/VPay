'use server'
import prisma from "@repo/db/client";

export async function getName(name: string) {
    try {
        if (!name || name.trim() === "") {
            return [];
        }
        
        const users = await prisma.user.findMany({
            where: {
                name: {
                    startsWith: name,
                    mode: 'insensitive'
                }
            },
            select: {
                id: true,
                name: true,
                number: true
            },
            take: 10
        });
        
        return users;
    } catch (error) {
        console.error("failed to fetch user name", error);
        return [];
    }
}

export default getName
