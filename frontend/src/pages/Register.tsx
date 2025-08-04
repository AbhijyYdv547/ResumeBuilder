import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthPage from "@/components/AuthPage";

const Register = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function register(e: React.FormEvent) {
    e.preventDefault();

    const name = nameRef.current?.value.trim();
    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value;
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        {
          name,
          email,
          password,
        },
      );
      alert("User has been registered");
      navigate("/login");
    } catch (e: unknown) {
      console.log(e);
      alert("Registration failed. Please try again.");
    }
  }

  return (
    <AuthPage
      nameRef={nameRef}
      emailRef={emailRef}
      passwordRef={passwordRef}
      onSubmit={register}
      login={false}
    />
  );
};

export default Register;
