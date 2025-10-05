"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // const { email, password } = form;

    // const { data, error } = await supabase.auth.signInWithPassword({
    //   email,
    //   password,
    // });
      router.push("/feed");

    setLoading(false);

    // if (error) {
    //   setError(error.message);
    // } else {
    //   console.log("✅ Logged in:", data.user.email);
    //   router.push("/feed");
    // }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h1 className="text-2xl font-bold text-center mb-4">Đăng nhập</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Mật khẩu</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>

      <p className="text-center text-sm text-gray-500 mt-4">
        Chưa có tài khoản?{" "}
        <a href="/register" className="text-blue-500 font-medium">
          Đăng ký
        </a>
      </p>
    </form>
  );
}
