export default function IrisLogo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Borde magenta exterior del rombo */}
      <rect
        x="12" y="12" width="76" height="76"
        rx="14"
        transform="rotate(45 50 50)"
        fill="#C8187A"
      />
      {/* Borde blanco interior */}
      <rect
        x="15" y="15" width="70" height="70"
        rx="12"
        transform="rotate(45 50 50)"
        fill="white"
      />
      {/* Relleno azul marino principal */}
      <rect
        x="18" y="18" width="64" height="64"
        rx="10"
        transform="rotate(45 50 50)"
        fill="#1B2A8A"
      />

      {/* Círculo rojo - borde blanco */}
      <circle cx="63" cy="26" r="12" fill="white" />
      {/* Círculo rojo - relleno */}
      <circle cx="63" cy="26" r="10" fill="#E8181E" />

      {/* Cuerpo de la i - sombra/borde blanco */}
      <path
        d="M 52 38 C 48 45 36 52 34 65 C 33 72 38 78 44 78"
        stroke="white"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
      {/* Cuerpo de la i - relleno rojo */}
      <path
        d="M 52 38 C 48 45 36 52 34 65 C 33 72 38 78 44 78"
        stroke="#E8181E"
        strokeWidth="11"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}