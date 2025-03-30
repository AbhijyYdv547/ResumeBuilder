import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function login() {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    await axios.post(BACKEND_URL + "/api/auth/login", {
      email,
      password
    })
    navigate("/dashboard");
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg bg-white">
      <h2 className="text-2xl font-bold">Login</h2>
      <Input reference={emailRef} placeholder='Email' />
      <Input reference={passwordRef} placeholder='Password' />
      <div className="flex justify-center pt-4">
        <Button variant='primary' text='Login' fullWidth={true} loading={false} onClick={login} />
      </div>
    </div>
  );
};

export default Login;
