"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  // const session = useSession();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 6) {
      setError("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/dashboard");
    } else {
      setError("");
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="bg-[#363a1c] p-8 rounded shadow-md w-96">
          <h1 className="text-4xl text-center font-semibold mb-8 text-white">
            Login
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Email"
              required
            />
            <input
              type="password"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {" "}
              Sign In
            </button>
            <p className="text-red-800 text-[16px] mb-4">{error && error}</p>
          </form>
          <button
            className="w-full bg-white text-black py-2 rounded hover:bg-gray-300 flex gap-4 justify-center items-center"
            onClick={(e) => {
              e.preventDefault();
              signIn("github");
            }}
          >
            <Image
              src="/images/github.svg"
              width={40}
              height={40}
              alt="github login"
            />
            <span>Sign In with Github</span>
          </button>
          <div className="text-center font-semibold text-slate-100 mt-4">
            - OR -
          </div>
          <Link
            className="block text-center text-white underline hover:no-underline mt-2"
            href="/register"
          >
            Register Here
          </Link>
        </div>
      </div>
    )
  );
};

export default Login;
