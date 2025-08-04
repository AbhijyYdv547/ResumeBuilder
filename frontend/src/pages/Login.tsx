import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthPage from "@/components/AuthPage";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function login(e: React.FormEvent) {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/auth/login",
        {
          email,
          password,
        },
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        alert("Login failed");
      }
    } catch (err) {
      console.log(err);
      alert("Invalid credentials");
    }
  }

  return (
    <AuthPage
      emailRef={emailRef}
      passwordRef={passwordRef}
      onSubmit={login}
      login={true}
    />
  );
};

export default Login;
