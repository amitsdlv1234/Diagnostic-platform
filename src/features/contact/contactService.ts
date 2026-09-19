export interface ContactSettings {
  supportPhone: string;
  whatsappNumber: string;
}

const STORAGE_KEY = "diagnostic_contact_settings";

export const CONTACT_SETTINGS_UPDATED_EVENT =
  "diagnostic-contact-settings-updated";

/*
 * ============================================================
 * ENV DEFAULTS
 * ============================================================
 */

const envSettings: ContactSettings = {
  supportPhone: import.meta.env.VITE_SUPPORT_PHONE || "",
  whatsappNumber: import.meta.env.VITE_SUPPORT_WHATSAPP || "",
};

/*
 * ============================================================
 * GET CONTACT SETTINGS
 * ============================================================
 *
 * Priority:
 *
 * 1. Admin Contact Settings
 * 2. .env
 * 3. Empty
 *
 * ============================================================
 */

export function getContactSettings(): ContactSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return {
        ...envSettings,
      };
    }

    const parsed = JSON.parse(stored);

    return {
      supportPhone:
        typeof parsed?.supportPhone === "string" &&
        parsed.supportPhone.trim() !== ""
          ? parsed.supportPhone.trim()
          : envSettings.supportPhone,

      whatsappNumber:
        typeof parsed?.whatsappNumber === "string" &&
        parsed.whatsappNumber.trim() !== ""
          ? parsed.whatsappNumber.trim()
          : envSettings.whatsappNumber,
    };
  } catch {
    return {
      ...envSettings,
    };
  }
}

/*
 * ============================================================
 * SAVE
 * ============================================================
 */

export function saveContactSettings(
  settings: ContactSettings,
): void {
  const cleanedSettings: ContactSettings = {
    supportPhone: settings.supportPhone.trim(),
    whatsappNumber: settings.whatsappNumber.trim(),
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(cleanedSettings),
  );

  window.dispatchEvent(
    new CustomEvent(
      CONTACT_SETTINGS_UPDATED_EVENT,
    ),
  );
}

/*
 * ============================================================
 * RESET
 * ============================================================
 *
 * After reset:
 * Admin values are removed.
 * .env values automatically become active.
 *
 * ============================================================
 */

export function resetContactSettings(): void {
  localStorage.removeItem(STORAGE_KEY);

  window.dispatchEvent(
    new CustomEvent(
      CONTACT_SETTINGS_UPDATED_EVENT,
    ),
  );
}

/*
 * ============================================================
 * PHONE HREF
 * ============================================================
 */

export function getPhoneHref(
  phone: string,
): string {
  if (!phone?.trim()) {
    return "";
  }

  const cleanedPhone = phone.replace(
    /[\s()-]/g,
    "",
  );

  return `tel:${cleanedPhone}`;
}

/*
 * ============================================================
 * WHATSAPP HREF
 * ============================================================
 */

export function getWhatsAppHref(
  whatsapp: string,
): string {
  if (!whatsapp?.trim()) {
    return "";
  }

  const number = whatsapp.replace(
    /\D/g,
    "",
  );

  if (!number) {
    return "";
  }

  return `https://wa.me/${number}`;
}