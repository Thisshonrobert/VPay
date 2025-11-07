'use client'

import { useMessage } from 'hooks/useMessage'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import {
  Button, Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle, Input, Label
} from "ui"



const LoginPage = () => {
    const phone = useRef("");
    const password = useRef("");
    const name =useRef("");
    const router = useRouter();
    const email = useRef("");
    const [loading,setLoading] = useState(false) //todo:add spinner while loading
    const {bark} = useMessage();

    const onSubmit = async()=>{
      setLoading(true);
        const response = await signIn("credentials",{
          name:name.current, 
          email:email.current, 
          phone:phone.current,
          password:password.current,
          redirect:false,
          callbackUrl:"/dashboard"
        })
        if (response?.ok) {
          router.push("/dashboard");
          //router.refresh();
          setLoading(false);
          bark({ message: "Successfully Logged In", success: true });
        } else {
          bark({
            message: "Unable to login. Please enter valid credentials",
            success: false,
          });
          console.error("Login failed:", response?.error);
          setLoading(false);
        }
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
              <Input onChange={(e)=>name.current=e.target.value} id="name" type="text" placeholder="alice" required />
            </div>
            <div className="grid gap-2">
              <Label>email</Label>
              <Input onChange={(e)=>email.current=e.target.value} id="email" type="email" placeholder="alice@gmail.com" required />
            </div>
            <div className="grid gap-2">
              <Label>Number</Label>
              <Input onChange={(e)=>phone.current=e.target.value} id="phone" type="text" placeholder="1111111111" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input onChange={(e)=>password.current=e.target.value} id="password" type="password" placeholder="alice" required />
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



