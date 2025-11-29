import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { showToast } from "../../utils/showToast";
import { useDispatch } from "react-redux";
import { setAdmin } from "../../store/slices/adminSlice";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const adminLoginMutation = useMutation({
    mutationFn: async (adminInfo) => {
      setError("")
      const { data } = await axiosInstance.post("/admin/login", adminInfo);
      return data;
    },

    onSuccess: (data) => {
      showToast("success", "Admin Logged In");
      dispatch(setAdmin(data.admin));
      setTimeout(() => {
        router.push("/admin");
      }, 1500);
    },

    onError: (err) => {
      setError(err.response.data.message || "Admin Login Failed");
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adminLoginMutation.mutate(formData);
  };

  return (
    <section className="flex w-full h-screen items-center justify-center">
      <Toaster />
      <div className="bg-white/80 backdrop-blur-xl p-10 w-full max-w-md border border-blue-200">
        {/* Header */}
        <h2 className="text-3xl font-semibold text-blue-950 text-center mb-2 tracking-wide">
          Admin Login
        </h2>
        <p className="text-center text-blue-950 mb-8 text-sm">
          Welcome back! Please enter your admin credentials
        </p>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 text-red-700 p-2 mb-3 text-center rounded-full text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-blue-800 mb-1 font-medium">
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              className="w-full p-3 rounded-md border border-blue-200 focus:border-blue-950 outline-none transition-all"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-blue-800 mb-1 font-medium">
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              className="w-full p-3 rounded-md border border-blue-200 focus:border-blue-950 outline-none transition-all"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={adminLoginMutation.isPending}
            className="w-full p-3 mt-5 cursor-pointer disabled:bg-blue-200 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-sm shadow-xl transition-all"
          >
            { adminLoginMutation.isPending ? "Logging in" : "Login" }
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-blue-700">
          © 2025 Salon Admin Panel
        </div>
      </div>
    </section>
  );
}
