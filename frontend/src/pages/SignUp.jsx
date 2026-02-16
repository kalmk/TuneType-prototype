import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";
import { toast, ToastContainer } from "react-toastify";
import useUserStore from "../store/userStore";

const SignUp = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setUser = useUserStore((state) => state.setUser);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/signup", {
        userName,
        email,
        password,
      });

      setUser(data);
      console.log("Signup success:", data);
      toast.success("Welcome to TuneType!", {
        autoClose: 1500,
        onClose: () => navigate("/homepage"),
      });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(message);
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
          <h2 className="text-xl font-bold mb-4">SIGN UP</h2>

          <input
            type="text"
            placeholder="Username"
            className="w-full border-2 border-black p-2 mb-4 rounded"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

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
            className="w-full bg-gray-200 border-4 border-black px-8 py-2 rounded-xl font-bold hover:bg-gray-300 mb-4"
          >
            SIGN UP
          </button>

          <div className="flex flex-col items-end gap-2">
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="text-sm hover:font-bold transition"
            >
              Already have an account? →
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-sm hover:font-bold transition"
            >
              ← Back to Welcome
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default SignUp;
