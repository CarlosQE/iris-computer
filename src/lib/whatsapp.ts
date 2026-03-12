const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "59162203096";

export function getWhatsAppLink(productName: string, price: number): string {
  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(price);

  const message = encodeURIComponent(
    `Hola! Estoy interesado en: *${productName}* - ${formattedPrice}. ¿Está disponible?`
  );

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

export function getGeneralWhatsAppLink(): string {
  const message = encodeURIComponent(
    "Hola! Quisiera más información sobre sus productos."
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}