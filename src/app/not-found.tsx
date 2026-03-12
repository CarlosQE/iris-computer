import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
      <div className="text-center flex flex-col items-center gap-6">

        {/* Icono */}
        <div className="w-24 h-24 rounded-full bg-brand-magenta/10 border border-brand-magenta/30 flex items-center justify-center">
          <SearchX size={40} className="text-brand-magenta" />
        </div>

        {/* Código 404 */}
        <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-navy to-brand-magenta">
          404
        </h1>

        {/* Mensaje */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-white">
            Página no encontrada
          </h2>
          <p className="text-white/50 max-w-sm">
            El producto o página que buscas no existe o fue removido del catálogo.
          </p>
        </div>

        {/* Botones */}
        <div className="flex gap-3 flex-wrap justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 bg-brand-magenta hover:bg-brand-magenta/80 text-white font-medium px-5 py-2.5 rounded-lg transition-all"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>
          <Link
            href="/catalogo"
            className="flex items-center gap-2 bg-brand-card border border-white/10 hover:border-brand-magenta/50 text-white font-medium px-5 py-2.5 rounded-lg transition-all"
          >
            Ver catálogo
          </Link>
        </div>

      </div>
    </div>
  );
}
