"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";
import IrisLogo from "@/components/layout/IrisLogo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Credenciales incorrectas. Verifica tu email y contraseña.");
      setLoading(false);
      return;
    }

    router.push("/admin/productos");
    router.refresh();
  }

  const inputStyle = {
    background: "#0D1225",
    border: "1px solid rgba(27, 42, 138, 0.4)",
    color: "#ffffff",
    fontFamily: "Exo 2, sans-serif",
  };

  return (
    <div className="min-h-screen bg-brand-dark grid-bg flex items-center justify-center px-4">

      {/* Glow de fondo */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #1B2A8A 0%, transparent 70%)" }}
      />

      <div className="relative w-full max-w-md">

        {/* Card */}
        <div
          className="relative p-8"
          style={{
            background: "linear-gradient(135deg, #0D1225 0%, #080C18 100%)",
            border: "1px solid rgba(27, 42, 138, 0.4)",
            clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)",
          }}
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-red" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand-red" />

          {/* Header */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <IrisLogo size={48} />
            <div className="text-center">
              <h1
                className="text-2xl font-bold text-white uppercase tracking-widest"
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                Panel <span className="text-brand-red">Admin</span>
              </h1>
              <p className="text-white/30 text-xs tracking-widest mt-1 uppercase">
                Acceso restringido
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-white/50 text-xs uppercase tracking-widest"
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="admin@ejemplo.com"
                className="px-4 py-3 text-sm placeholder-white/20 focus:outline-none transition-all"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "rgba(232, 24, 30, 0.6)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(27, 42, 138, 0.4)")}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-white/50 text-xs uppercase tracking-widest"
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 text-sm placeholder-white/20 focus:outline-none transition-all"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(232, 24, 30, 0.6)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(27, 42, 138, 0.4)")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="flex items-center gap-2 px-4 py-3 text-sm"
                style={{
                  background: "rgba(232, 24, 30, 0.08)",
                  border: "1px solid rgba(232, 24, 30, 0.3)",
                  color: "#E8181E",
                }}
              >
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-3 py-3.5 text-white font-bold uppercase tracking-widest mt-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: loading ? "rgba(232, 24, 30, 0.5)" : "#E8181E",
                fontFamily: "Rajdhani, sans-serif",
                clipPath: "polygon(0 0, 100% 0, 100% 70%, 97% 100%, 0 100%)",
              }}
            >
              <LogIn size={16} />
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
