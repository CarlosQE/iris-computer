"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import IrisLogo from "./IrisLogo";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Línea superior roja */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-brand-red to-transparent" />

      <div className="bg-brand-darker/95 backdrop-blur-xl border-b border-brand-navy/40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <IrisLogo size={36} />
            <div className="flex flex-col leading-none">
              <span
                className="font-bold text-lg tracking-widest uppercase flicker"
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                <span className="text-white">IRIS</span>
                <span className="text-brand-red"> COMPUTER</span>
              </span>
              <span className="text-white/30 text-[9px] tracking-[0.3em] uppercase">
                Technology Store
              </span>
            </div>
          </Link>

          {/* Links escritorio */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-semibold tracking-widest uppercase transition-all ${
                  pathname === link.href
                    ? "text-brand-red"
                    : "text-white/50 hover:text-white"
                }`}
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-brand-red shadow-[0_0_8px_#E8181E]" />
                )}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white/50 hover:text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-darker border-b border-brand-navy/40 px-6 py-4 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-2.5 text-sm font-semibold tracking-widest uppercase transition-colors ${
                pathname === link.href
                  ? "text-brand-red border-l-2 border-brand-red pl-4"
                  : "text-white/50 hover:text-white"
              }`}
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
