import db from "@repo/db/client";
import bcrypt from "bcrypt";
import { DefaultSession, NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import Email from "next-auth/providers/email";

declare module "next-auth" {
    interface Session {
        user: {
            id: string | undefined;
            number:String,
            name:String
            email:String
        } & DefaultSession["user"];
    }
}

export const authOptions:NextAuthOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            name:{type:"text",required:true},
            phone: { label: "Phone number", type: "text", placeholder: "1111111111", required: true },
            email:{label:"email" ,type: "email", placeholder: "alice@gmail.com" ,required: true},
            password: { label: "Password", type: "password", required: true },
          },
        
          async authorize(credentials) {
            if (!credentials) return null;
            // Do zod validation, OTP validation here
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await db.user.findFirst({
                where: {
                    number: credentials.phone
                }
            });

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        number: existingUser.number,
                        email:existingUser.email
                    }
                }
                return null;
            }

            try {
                const user = await db.user.create({
                    data: {
                        name:credentials.name,
                        number: credentials.phone,
                        password: hashedPassword,
                        email:credentials.email
                    },
                    
                });
                 await db.balance.create({
                    data:{
                        amount:0,
                        locked:0,
                        userId:user.id
                    }
                })
                
               
            
                return {
                    id: user.id.toString(),
                    name: user.name,
                    number: user.number
                }
            } catch(e) {
                console.error(e);
            }
            return null
          },
        })
    ],
    pages: {
        signIn: '/signin', 
      },
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async redirect({ url, baseUrl }: { url: string; baseUrl: string }): Promise<string> {
            return url.startsWith(baseUrl) ? url : process.env.NEXTAUTH_URL || baseUrl;
        },
        async session({ token, session }: {token:JWT,session:Session}) {
            try {
                const user = await db.user.findFirst({
                  where: {
                    id: Number(token.sub)
                  }
                });
        
            session.user.id = token.sub;//token.sub typically represents the user's ID in the JWT.
            session.user.number = user.number;
            session.user.name = user.name; 
            session.user.email = user.email; // Assuming email is also stored in the user object
            return session;
        }catch(err){
            console.error("Error in session callback:", err);
                return session;
        }
    }
}
}
/*
  Safe internal redirect
ts
Copy
Edit
url = "http://localhost:3000/dashboard"
baseUrl = "http://localhost:3000"
✅ Since url.startsWith(baseUrl) → the user gets redirected to /dashboard.

Example 2: External redirect (unsafe)
ts
Copy
Edit
url = "http://hacker-site.com/phish"
baseUrl = "http://localhost:3000"
*/

  