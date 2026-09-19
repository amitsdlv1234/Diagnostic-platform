import {
  useEffect,
  useState,
} from "react";

import {
  ArrowRight,
  FileText,
  Phone,
  MessageCircle,
} from "lucide-react";

import {
  getContactSettings,
  getPhoneHref,
  getWhatsAppHref,
  CONTACT_SETTINGS_UPDATED_EVENT,
  type ContactSettings,
} from "../../../features/contact/contactService";

export function NeedHelpSection() {

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
   */

  useEffect(() => {

    const loadSettings = () => {
      setContactSettings(
        getContactSettings(),
      );
    };

    /*
     * Load initially
     */
    loadSettings();

    /*
     * Reload when Admin changes settings
     */
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

  /*
   * ============================================================
   * CONTACT LINKS
   * ============================================================
   */

  const phoneHref = getPhoneHref(
    contactSettings.supportPhone,
  );

  const whatsappHref = getWhatsAppHref(
    contactSettings.whatsappNumber,
  );

  /*
   * ============================================================
   * HELP ITEMS
   * ============================================================
   */

  const helpItems = [
    {
      title: "Have a Prescription?",
      description:
        "Upload and book your tests",
      icon: FileText,
      href: "/booking",
      enabled: true,
      external: false,
    },

    {
      title:
        "Call us to book your tests",
      description:
        "Our team of experts will guide you",
      icon: Phone,
      href: phoneHref,
      enabled: Boolean(phoneHref),
      external: false,
    },

    {
      title: "WhatsApp Booking",
      description:
        "Text us on WhatsApp to book a test",
      icon: MessageCircle,
      href: whatsappHref,
      enabled: Boolean(whatsappHref),
      external: true,
    },
  ];

  return (
    <section
      className="
        bg-gray-50
        px-4
        py-8
        sm:px-6
        lg:px-8
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
        "
      >

        {/* =====================================================
            HEADER
            ===================================================== */}

        <div className="mb-5">
          <h2
            className="
              text-2xl
              font-bold
              text-gray-900
              sm:text-3xl
            "
          >
            Need help?
          </h2>
        </div>

        {/* =====================================================
            CARDS
            ===================================================== */}

        <div
          className="
            grid
            gap-4
            md:grid-cols-3
          "
        >

          {helpItems.map((item) => {

            const Icon = item.icon;

            return (
              <a
                key={item.title}
                href={
                  item.enabled
                    ? item.href
                    : undefined
                }
                target={
                  item.enabled && item.external
                    ? "_blank"
                    : undefined
                }
                rel={
                  item.enabled && item.external
                    ? "noopener noreferrer"
                    : undefined
                }
                aria-disabled={!item.enabled}
                onClick={(event) => {
                  if (!item.enabled) {
                    event.preventDefault();
                  }
                }}
                className={`
                  group
                  flex
                  min-h-[100px]
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-pink-100
                  bg-white
                  px-4
                  py-4
                  transition
                  duration-200

                  ${
                    item.enabled
                      ? `
                        hover:-translate-y-0.5
                        hover:border-pink-200
                        hover:shadow-md
                      `
                      : `
                        cursor-not-allowed
                        opacity-60
                      `
                  }
                `}
              >

                {/* =================================================
                    LEFT
                    ================================================= */}

                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-pink-50
                      text-pink-700
                    "
                  >
                    <Icon size={21} />
                  </div>

                  <div>

                    <h3
                      className="
                        text-base
                        font-bold
                        text-gray-900
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-sm
                        text-gray-500
                      "
                    >
                      {item.description}
                    </p>

                  </div>

                </div>

                {/* =================================================
                    ARROW
                    ================================================= */}

                <div
                  className="
                    ml-3
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-pink-100
                    text-pink-700
                    transition
                    group-hover:bg-pink-700
                    group-hover:text-white
                  "
                >
                  <ArrowRight size={16} />
                </div>

              </a>
            );
          })}

        </div>

      </div>
    </section>
  );
}