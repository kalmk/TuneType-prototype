import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import api from "../lib/axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const { data } = await api.post("/auth/login", { email, password });

      toast.success("Welcome back!", {
        autoClose: 1500,
        onClose: () => navigate("/homepage"),
      });

      console.log("Login success:", data);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(message, { autoClose: 1500 });
    }
  };

  return (
    <div
      className="min-h-screen flex"
      style={{
        backgroundColor: "#fef9e7",
        backgroundImage: `radial-gradient(circle at 10px 10px, #f6d365 5%, transparent 6%),
                        radial-gradient(circle at 30px 30px, #f6d365 5%, transparent 6%)`,
        backgroundSize: "40px 40px",
      }}
    >
      <div className="w-full flex items-center justify-center p-8">
        <form
          onSubmit={handleLogin}
          className="border-4 border-black rounded-3xl p-6 bg-white w-full max-w-md"
        >
          <h2 className="text-xl font-bold mb-4">SIGN IN</h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full border-2 border-black p-2 mb-4 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border-2 border-black p-2 mb-4 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-gray-200 border-4 border-black px-8 py-2 rounded-xl font-bold hover:bg-gray-300"
          >
            SIGN IN
          </button>
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="w-full mt-4 text-sm hover:font-bold transition"
          >
            Don’t have an account? <span>→</span>
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default SignIn;
