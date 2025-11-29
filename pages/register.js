import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { showToast } from "../utils/showToast";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/authSlice";
import { useRouter } from "next/router";

export default function Login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPass: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: async (newUser) => {
      const { data } = await axiosInstance.post("/auth/register", newUser);
      return data;
    },

    onSuccess: (data) => {
      showToast("success", "User Registered Successfully");
      dispatch(setUser(data.user));
      setTimeout(() => {
        router.push('/user')
      }, 1500);  
    },

    onError: (err) => {
      setError(err.response?.data?.message || "Registration Failed");
    },
 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  return (
    <main className="min-h-screen flex">
      <Toaster />
      <section className="left w-[50%] h-screen bg-center bg-[url(/images/salon.jpg)] bg-cover"></section>
      <div className="right w-[50%] h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-10">
          {/* Heading */}
          <h1
            className="text-3xl font-semibold text-center tracking-wide mb-5"
            style={{ letterSpacing: "1px" }}
          >
            Welcome
          </h1>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Username */}

            {error && (
              <div className="bg-red-100 text-red-700 p-2 mb-3 text-center rounded-full text-sm">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="username"
                className="block text-sm mb-2 uppercase tracking-wider text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="name"
                onChange={handleChange}
                placeholder="Username"
                className="w-full border border-gray-400 bg-transparent p-3 text-sm focus:outline-none focus:border-black transition-all"
                style={{
                  borderRadius: "3px",
                  color: "#000",
                }}
                required
              />
            </div>

            {/* Email */}
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

            {/* Email */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm mb-2 uppercase tracking-wider text-gray-700"
              >
                Phone Number
              </label>
              <div className="relative w-full">
                <span
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-black text-sm"
                  style={{ pointerEvents: "none" }}
                >
                  +1
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full border border-gray-400 bg-transparent p-3 text-sm focus:outline-none focus:border-black transition-all pl-10"
                  style={{
                    borderRadius: "3px",
                    color: "#000",
                  }}
                  required
                />
              </div>
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
              <p className="absolute text-sm cursor-pointer" style={{ right: '12px', top: '11px' }} onClick={()=>setShowPassword(!showPassword)}>{ showPassword ? "hide" : "show" }</p>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmpassword"
                className="block text-sm mb-2 uppercase tracking-wider text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative">
              <input
                type={showConfirmPass ? "text" : "password"}
                id="confirmpassword"
                name="confirmPass"
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full border border-gray-400 bg-transparent p-3 text-sm focus:outline-none focus:border-black transition-all"
                style={{
                  borderRadius: "3px",
                  color: "#000",
                }}
                required
              />
             <p className="absolute text-sm cursor-pointer" style={{ right: '12px', top: '11px' }} onClick={()=>setShowConfirmPass(!showConfirmPass)}>{ showConfirmPass ? "hide" : "show" }</p>
             </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full p-3 font-medium uppercase tracking-wide transition-all cursor-pointer"
              style={{
                backgroundColor: "#000",
                color: "#fff",
                borderRadius: "3px",
                border: "1px solid #000",
              }}
            >
              { registerMutation.isPending ? "Creating Account" : "Sign up"  }
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-600">
            <p>
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-black underline hover:text-gray-700 transition-colors"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
