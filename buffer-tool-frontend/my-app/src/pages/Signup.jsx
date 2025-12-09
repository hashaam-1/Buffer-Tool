import { useSignupMutation } from "../features/auth/authApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [signup] = useSignupMutation();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await signup(form).unwrap();
    localStorage.setItem("token", res.token);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSignup} className="p-4 max-w-md mx-auto space-y-4">
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} className="input" />
      <button className="btn">Signup</button>
    </form>
  );
};

export default Signup;