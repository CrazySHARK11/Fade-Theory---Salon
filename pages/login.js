import Link from "next/link";
import axiosInstance from "../utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { showToast } from "../utils/showToast";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import { setUser } from "../store/slices/authSlice";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async (logUser) => {
      const { data } = await axiosInstance.post("/auth/login", logUser);
      return data;
    },

    onSuccess: (data) => {
      showToast("success", data.message);
      dispatch(setUser(data.user));
      setTimeout(() => {
        router.push('/user')
        console.log("wow, triggering again from login ?")
      }, 1500);  
      return;
    },

    onError: (err) => {
      setError(err.response?.data?.message || "Login Failed");
    },
 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  return (
    <main className="min-h-screen flex">
      <Toaster />
      <section className="left w-[50%] h-screen bg-center bg-[url(/images/login.jpg)] bg-cover"></section> 
      <div className="right w-[50%] h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-10">
          {/* Heading */}
          <h1
            className="text-3xl font-semibold text-center tracking-wide mb-2"
            style={{ letterSpacing: "1px" }}
          >
            Welcome Back
          </h1>
          <p
            className="text-center text-sm text-gray-500 mb-8"
            style={{ letterSpacing: "0.5px" }}
          >
            Sign in to continue your journey
          </p>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            {error && (
              <div className="bg-red-100 text-red-700 p-2 mb-3 text-center rounded-full text-sm">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm mb-2 uppercase tracking-wider text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                placeholder="example@email.com"
                className="w-full border border-gray-400 bg-transparent p-3 text-sm focus:outline-none focus:border-black transition-all"
                style={{
                  borderRadius: "3px",
                  color: "#000",
                }}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm mb-2 uppercase tracking-wider text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full border border-gray-400 bg-transparent p-3 text-sm focus:outline-none focus:border-black transition-all"
                  style={{
                    borderRadius: "3px",
                    color: "#000",
                  }}
                  required
                />
                <p
                  className="absolute text-sm cursor-pointer"
                  style={{ right: "12px", top: "11px" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "hide" : "show"}
                </p>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full p-3 font-medium uppercase tracking-wide transition-all"
              style={{
                backgroundColor: "#000",
                color: "#fff",
                borderRadius: "3px",
                border: "1px solid #000",
              }}
            >
              {loginMutation.isPending ? "Signing in ..." : "SIGN IN"}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-600">
            <p>
              Don’t have an account?{" "}
              <Link
                href="/register"
                className="text-black underline hover:text-gray-700 transition-colors"
              >
                Create one
              </Link>
            </p>
            <p className="mt-4">
              <a
                href="#"
                className="underline hover:text-gray-700 transition-colors"
              >
                Forgot password?
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
