'use client'

import { Container } from '@radix-ui/themes'
import { signIn } from 'next-auth/react'
import React, { useRef } from 'react'
import { Button } from "ui"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "ui"
import { Input } from "ui"
import { Label } from "ui"

export const description =
  "A simple login form with email and password. The submit button says 'Sign in'."

const LoginPage = () => {
    const phone = useRef("");
    const password = useRef("");
    const name =useRef("");

    const onSubmit = async()=>{
        await signIn("credentials",{
            phone:phone.current,
            password:password.current,
            name:name.current,
            redirect:true,
            callbackUrl:"/dashboard"
        })
    }
  return (
    <div className='flex justify-center mt-20'>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your mobile number below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
          <div className="grid gap-2">
              <Label>Name</Label>
              <Input onChange={(e)=>name.current=e.target.value} id="name" type="text" placeholder="Robert" required />
            </div>
            <div className="grid gap-2">
              <Label>Number</Label>
              <Input onChange={(e)=>phone.current=e.target.value} id="phone" type="text" placeholder="1234567890" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input onChange={(e)=>password.current=e.target.value} id="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={onSubmit} className="w-full">Sign in</Button>
          </CardFooter>
        </Card>
        </div>
      )
  
}

export default LoginPage

