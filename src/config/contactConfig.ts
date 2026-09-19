const phoneNumber =
  import.meta.env.VITE_CONTACT_PHONE || "";

const whatsappNumber =
  import.meta.env.VITE_WHATSAPP_NUMBER || "";

export const contactConfig = {
  phoneNumber,

  whatsappNumber,

  phoneHref: phoneNumber
    ? `tel:+${phoneNumber}`
    : "#",

  whatsappHref: whatsappNumber
    ? `https://wa.me/${whatsappNumber}`
    : "#",
};