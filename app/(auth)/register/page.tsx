'use client'
import { supabase } from "@/lib/supabaseclient";
import { Input } from "@heroui/input";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error , setError] = useState<string | null>(null)
  const router = useRouter()
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else router.push('/login');
  };
  return <div className="dark:bg-[#111111]">
    <form onSubmit={handleRegister}>
        <Input type="email" placeholder="Enter Your Email : "/>
    </form>
  </div>;
};

export default Register;
