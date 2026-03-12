"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Monitor, Menu, X } from "lucide-react";
import { useState } from "react";
import IrisLogo from "./IrisLogo";


const links = [
  { href: "/",        label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
       <Link href="/" className="flex items-center gap-2 group">
  <IrisLogo size={38} />
  <span className="font-bold text-lg tracking-tight">
    <span className="text-white">Iris</span>
    <span className="text-brand-magenta"> Computer</span>
  </span>
</Link>

        {/* Links escritorio */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-brand-magenta"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Menú móvil botón */}
        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div className="md:hidden bg-brand-darker border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-brand-magenta"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}