"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, LogOut, PlusCircle } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import IrisLogo from "@/components/layout/IrisLogo";

const navItems = [
  { href: "/admin/productos", label: "Productos", icon: Package },
  { href: "/admin/productos/nuevo", label: "Agregar producto", icon: PlusCircle },
];

export default function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-64 flex flex-col z-40"
      style={{
        background: "#080C18",
        borderRight: "1px solid rgba(27, 42, 138, 0.4)",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-6 py-5"
        style={{ borderBottom: "1px solid rgba(27, 42, 138, 0.3)" }}
      >
        <IrisLogo size={32} />
        <div>
          <p
            className="text-white font-bold text-sm uppercase tracking-widest"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
          >
            IRIS <span className="text-brand-red">ADMIN</span>
          </p>
          <p className="text-white/25 text-[10px] tracking-wider">Panel de control</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 flex flex-col gap-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-3 text-sm font-semibold uppercase tracking-wider transition-all"
              style={{
                fontFamily: "Rajdhani, sans-serif",
                color: active ? "#ffffff" : "rgba(255,255,255,0.35)",
                background: active ? "rgba(232, 24, 30, 0.1)" : "transparent",
                borderLeft: active ? "2px solid #E8181E" : "2px solid transparent",
              }}
            >
              <Icon size={16} className={active ? "text-brand-red" : ""} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer / logout */}
      <div
        className="px-4 py-5"
        style={{ borderTop: "1px solid rgba(27, 42, 138, 0.3)" }}
      >
        <p className="text-white/25 text-xs truncate px-2 mb-3">{userEmail}</p>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-white/35 hover:text-brand-red transition-colors"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
        >
          <LogOut size={15} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
