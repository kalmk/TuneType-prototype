import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";
import { toast, ToastContainer } from "react-toastify";
import useUserStore from "../store/userStore";

const SignUp = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/signup", {
        userName,
        email,
        password,
      });
      setUser(data);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-amber-100 p-6 font-sans">
      <div className="text-4xl mb-6 font-bold">TUNETYPE</div>

      <div className="bg-white border-4 border-gray-900 rounded-3xl shadow-xl p-8 w-full max-w-md animate-fade-up">
        <h2 className="text-center text-3xl mb-7 font-bold ">CREATE ACCOUNT</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1 font-bold">
              USERNAME
            </label>
            <input
              className="border-2 border-gray-900 rounded-xl p-3 bg-amber-50 outline-none"
              type="text"
              placeholder="e.g. melody_cat"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1 font-bold">
              EMAIL
            </label>
            <input
              className="border-2 border-gray-900 rounded-xl p-3 bg-amber-50 outline-none"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1 font-bold">
              PASSWORD
            </label>
            <div className="relative">
              <input
                className="border-2 border-gray-900 rounded-xl w-full p-3 pr-16 outline-none bg-amber-50"
                type={showPass ? "text" : "password"}
                placeholder="min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold cursor-pointer select-none"
                onClick={() => setShowPass((v) => !v)}
              >
                {showPass ? "HIDE" : "SHOW"}
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`w-full text-xl p-3 rounded-xl border-4 border-gray-900 
              shadow-md bg-amber-400 hover:bg-amber-500
              transition-all flex justify-center items-center gap-2 ${
                loading ? "cursor-not-allowed opacity-60" : ""
              }`}
            disabled={loading}
          >
            {loading ? "Creating account…" : "SIGN UP"}
          </button>
        </form>

        <div
          className="flex items-center gap-2 text-gray-400 
        font-bold my-4 text-xs"
        >
          <span className="flex-1 h-px bg-gray-300"></span>
          OR
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => navigate("/signin")}
            className="w-full text-base p-3 border-2 border-gray-900 rounded-xl
             bg-white shadow-md hover:bg-gray-100 font-bold"
          >
            Already have an account? <strong>Sign In</strong>
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full text-sm p-2 border-2 border-gray-300 rounded-xl
             bg-white shadow-md hover:bg-amber-50"
          >
            Back to Welcome
          </button>
        </div>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default SignUp;
