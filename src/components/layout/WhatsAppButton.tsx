"use client";

import { getGeneralWhatsAppLink } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href={getGeneralWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105 group"
    >
      <MessageCircle size={22} className="animate-pulse" />
      <span className="text-sm font-medium hidden group-hover:inline transition-all">
        ¿Necesitas ayuda?
      </span>
    </a>
  );
}