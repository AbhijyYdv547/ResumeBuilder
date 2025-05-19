import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

const Register = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function register() {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    await axios.post(BACKEND_URL + "/api/auth/register", {
      name,
      email,
      password
    })
    alert("User has been registered")
    navigate("/login");
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg bg-white">
      <h2 className="text-2xl font-bold">Register</h2>
      <Input reference={nameRef} placeholder='Name' />
      <Input reference={emailRef} placeholder='Email' />
      <Input reference={passwordRef} placeholder='Password' />
      <div className="flex justify-center pt-4">
        <Button variant='primary' text='Register' fullWidth={true} loading={false} onClick={register} />
      </div>
    </div>
  );
};

export default Register;
