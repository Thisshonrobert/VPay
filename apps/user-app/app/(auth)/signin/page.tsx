'use client'

import { SkeletonForm } from '@components/Skeleton'
import { useMessage } from 'hooks/useMessage'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {  useState } from 'react'
import {
  Button, Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle, Input, Label
} from "ui"



const LoginPage = () => {
   const router = useRouter();
    const [form, setForm] = useState({
  name: "",
  email: "",
  phone: "",
  password: "",
});

    const [loading,setLoading] = useState(false) //todo:add spinner while loading
    const {bark} = useMessage();

    const onSubmit = async()=>{
      setLoading(true);
        const response = await signIn("credentials",{
          name:form.name, 
          email:form.email, 
          phone:form.phone,
          password:form.password,
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
    if(loading){
      return (
        <div className='flex flex-col items-center py-2 mt-20'>
          <SkeletonForm />
          <SkeletonForm/>
        </div>
      )
    }
  return (
    <div className='flex justify-center mt-20'>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login / Signup</CardTitle>
            <CardDescription>
              Already have an account? Log in. New here? Sign up.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
          <div className="grid gap-2">
              <Label>Name</Label>
              <Input onChange={(e)=>setForm({...form,name:e.target.value})} id="name" type="text" placeholder="alice" required />
            </div>
            <div className="grid gap-2">
              <Label>email</Label>
              <Input onChange={(e)=>setForm({...form,email:e.target.value})} id="email" type="email" placeholder="alice@gmail.com" required />
            </div>
            <div className="grid gap-2">
              <Label>Number</Label>
              <Input onChange={(e)=>setForm({...form,phone:e.target.value})} id="phone" type="text" placeholder="1111111111" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input onChange={(e)=>setForm({...form,password:e.target.value})} id="password" type="password" placeholder="alice" required />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={onSubmit} className="w-full">Signup/Login</Button>
          </CardFooter>
        </Card>
        </div>
      )
  
}

export default LoginPage



