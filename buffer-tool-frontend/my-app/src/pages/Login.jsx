import { useLoginMutation } from "../features/auth/authApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [login] = useLoginMutation();
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login(form).unwrap();
    localStorage.setItem("token", res.token);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleLogin} className="p-4 max-w-md mx-auto space-y-4">
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} className="input" />
      <button className="btn">Login</button>
    </form>
  );
};

export default Login;