'use client'
import { supabase } from "@/lib/supabaseclient";
import { loginInputValid } from "@/lib/validators/auth";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const router = useRouter()
  const handleLogin = async (form: loginInputValid) => {
    const {email ,password} = form
    const {data , error} = await supabase.auth.signInWithPassword({email , password})
    if(error){}
  }
  return (
    <div
      className="
      min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-[#050509] via-[#0d0f14] to-[#050509]
      relative overflow-hidden
    "
    >
      <div className="absolute w-[600px] h-[600px] bg-blue-600/10 blur-[180px] rounded-full -top-10 -left-20" />
      <div className="absolute w-[500px] h-[500px] bg-fuchsia-600/10 blur-[200px] rounded-full bottom-0 right-[-100px]" />

      <Card
        className="
        w-full max-w-md p-8 rounded-2xl border border-white/10 
        bg-white/5 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.4)]
        hover:shadow-[0_0_60px_rgba(0,122,255,0.45)]
        transition-all duration-500 transform hover:-translate-y-1
      "
      >
        <CardHeader className="text-center">
          <h1 className="text-3xl font-bold text-white tracking-wide">
            Sign In
          </h1>
        </CardHeader>

        <CardBody>
          <Form className="space-y-6 mt-4">
            <Input
              type="email"
              placeholder="Enter Your Email: "
              variant="flat"
              classNames={{
                inputWrapper:
                  "bg-white/10 p-2 rounded-[8px] border border-white/10 hover:border-blue-500/40 focus-within:border-blue-500/70 backdrop-blur-xl",
                input: "text-white placeholder:text-neutral-400",
                label: "text-neutral-300",
              }}
            />

            <Input
              type="password"
              placeholder="Enter your password: "
              variant="flat"
              classNames={{
                inputWrapper:
                  "bg-white/10 rounded-[8px] border p-2 border-white/10 hover:border-blue-500/40 focus-within:border-blue-500/70 backdrop-blur-xl",
                input: "text-white placeholder:text-neutral-400",
                label: "text-neutral-300",
              }}
            />

            <Button
              type="submit"
              className="
              w-full py-3 font-semibold
              bg-blue-600 text-white
              rounded-xl
              shadow-[0_0_15px_rgba(37,99,235,0.5)]
              hover:shadow-[0_0_35px_rgba(37,99,235,0.9)]
              hover:bg-blue-500
              transition-all duration-300
              active:scale-95
            "
            onClick={() => router.push('/dashboard')}
            >
              login
            </Button>

            <p className="text-center text-sm text-neutral-400">
              Don`t have an account?
              <Link
                href={"/register"}
                className="text-blue-400 ml-1 cursor-pointer hover:text-blue-300"
              >
                Create One
              </Link>
            </p>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
