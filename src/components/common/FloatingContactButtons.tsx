import {
  FileText,
  Phone,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getContactSettings,
  getPhoneHref,
  CONTACT_SETTINGS_UPDATED_EVENT,
} from "../../features/contact/contactService";

interface ContactSettings {
  supportPhone: string;
  whatsappNumber: string;
}

export function FloatingContactButtons() {
  const [
    contactSettings,
    setContactSettings,
  ] = useState<ContactSettings>(
    getContactSettings(),
  );

  /*
   * ============================================================
   * LOAD CONTACT SETTINGS
   * ============================================================
   *
   * Priority:
   *
   * Super Admin Contact Settings
   *          ↓
   * .env fallback
   *
   * ============================================================
   */

  useEffect(() => {
    const loadSettings = () => {
      setContactSettings(
        getContactSettings(),
      );
    };

    loadSettings();

    window.addEventListener(
      CONTACT_SETTINGS_UPDATED_EVENT,
      loadSettings,
    );

    return () => {
      window.removeEventListener(
        CONTACT_SETTINGS_UPDATED_EVENT,
        loadSettings,
      );
    };
  }, []);

  const phoneHref = getPhoneHref(
    contactSettings.supportPhone,
  );

  return (
    <div
      className="
        fixed
        right-4
        bottom-6
        z-40
        flex
        flex-col
        items-center
        gap-4
        sm:right-6
        sm:bottom-8
      "
    >
      {/* ======================================================
          PRESCRIPTION BUTTON
          ====================================================== */}

      <Link
        to="/booking"
        aria-label="Upload prescription"
        title="Upload Prescription"
        className="
          group
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          border
          border-pink-100
          bg-pink-50
          text-pink-700
          shadow-lg
          transition-all
          duration-200
          hover:scale-105
          hover:bg-pink-100
          hover:shadow-xl
          sm:h-16
          sm:w-16
        "
      >
        <FileText
          size={23}
          strokeWidth={2}
          className="
            transition-transform
            duration-200
            group-hover:scale-110
          "
        />
      </Link>

      {/* ======================================================
          CALL BUTTON
          ====================================================== */}

      {contactSettings.supportPhone && (
        <a
          href={phoneHref}
          aria-label="Call us"
          title={`Call ${contactSettings.supportPhone}`}
          className="
            group
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            border
            border-pink-100
            bg-pink-50
            text-pink-700
            shadow-lg
            transition-all
            duration-200
            hover:scale-105
            hover:bg-pink-100
            hover:shadow-xl
            sm:h-16
            sm:w-16
          "
        >
          <Phone
            size={23}
            strokeWidth={2}
            className="
              transition-transform
              duration-200
              group-hover:scale-110
            "
          />
        </a>
      )}
    </div>
  );
}