"use client";

import { supabase } from "@/lib/supabaseclient";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerInputValid, registerSchema } from "@/lib/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { Link } from "@heroui/link";
const Register = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerInputValid>({
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = async (form: registerInputValid) => {
    const { email, password } = form;
    Swal.fire({
      title: "Please Verify Your Email",
      text: "We Sent a Verification Url To Your Email",
      confirmButtonText:'OK',
      theme : 'dark',
      icon: "warning",
      showClass: {
        popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
      },
      hideClass: {
        popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
      },
    });
    const { error } = await supabase.auth.signUp({ email, password , options : {
      emailRedirectTo : 'http://localhost:3000/login'
    }});

    if (error) setError(error.message);
    else router.push("/login");
  };
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
            Create Account
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
            Join the next generation dashboard
          </p>
        </CardHeader>

        <CardBody>
          <form
            className="space-y-6 mt-4"
            onSubmit={handleSubmit(handleRegister)}
          >
            <div className="justify-end">
              <Input
                type="email"
                placeholder="Enter Your Email: "
                variant="flat"
                classNames={{
                  inputWrapper:
                    "bg-white/10 p-2 pb-2 rounded-[8px] border border-white/10 hover:border-blue-500/40 focus-within:border-blue-500/70 backdrop-blur-xl",
                  input: "text-white placeholder:text-neutral-400",
                  label: "text-neutral-300",
                }}
                {...register("email")}
              />
              {errors?.email && (
                <p className="text-[#c72d2d] ml-2 mt-2 text-[16px]">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="justify-end">
              <Input
                type={showPassword ? "string" : "password"}
                placeholder="Enter your password: "
                variant="flat"
                classNames={{
                  inputWrapper:
                    "bg-white/10 rounded-[8px] border p-2 border-white/10 hover:border-blue-500/40 focus-within:border-blue-500/70 backdrop-blur-xl",
                  input: "text-white placeholder:text-neutral-400",
                  label: "text-neutral-300",
                }}
                {...register("password")}
              />
              {errors?.password && (
                <p className="text-[#c72d2d] ml-2 mt-2 text-[16px]">
                  {errors?.password?.message}
                </p>
              )}
            </div>
            <div className="justify-end">
              <Input
                type={showPassword ? "string" : "password"}
                placeholder="Confirm Your Password: "
                variant="flat"
                classNames={{
                  inputWrapper:
                    "bg-white/10 rounded-[8px] border p-2 border-white/10 hover:border-blue-500/40 focus-within:border-blue-500/70 backdrop-blur-xl",
                  input: "text-white placeholder:text-neutral-400",
                  label: "text-neutral-300",
                }}
                {...register("confirmPass")}
              />
              {errors?.confirmPass && (
                <p className="text-[#c72d2d] ml-2 mt-2 text-[16px]">
                  {errors?.confirmPass?.message}
                </p>
              )}
            </div>
            {error && (
              <p className="text-[#c72d2d] ml-2 mt-2 text-[16px]">{error}</p>
            )}{" "}
            <Button
              type="button"
              className="
              w-full py-3 font-semibold
              bg-[#146527] text-white
              rounded-xl
              shadow-[0_0_15px_rgba(37,99,235,0.5)]
              hover:shadow-[0_0_35px_rgba(37,99,235,0.9)]
              hover:bg-[#308e1d]
              transition-all duration-300
              active:scale-95
            "
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </Button>
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
            >
              Register
            </Button>
            <p className="text-center text-sm text-neutral-400">
              Already have an account?
              <Link href="/login"
                className="text-blue-400 ml-1 cursor-pointer hover:text-blue-300"
                onClick={() => router.push("/login")}
              >
                Login
              </Link>
            </p>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
export default Register;
