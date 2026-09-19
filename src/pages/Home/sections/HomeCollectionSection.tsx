import {
  CalendarDays,
  Clock3,
  Home,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import { Container } from "../../../components/common/Container";

import { useTheme } from "../../../components/theme/ThemeProvider";

import {
  CONTACT_SETTINGS_UPDATED_EVENT,
  getContactSettings,
  getPhoneHref,
  getWhatsAppHref,
  type ContactSettings,
} from "../../../features/contact/contactService";


export function HomeCollectionSection() {

  const {
    getSectionColors,
  } = useTheme();


  /*
   * ============================================================
   * HOME COLLECTION THEME
   * ============================================================
   *
   * Controlled from:
   *
   * Admin → Theme & Appearance
   * → Home Collection
   *
   */

  const colors =
    getSectionColors(
      "homeCollection",
    );


  /*
   * ============================================================
   * CONTACT SETTINGS
   * ============================================================
   *
   * Controlled from:
   *
   * Admin → Contact Settings
   *
   */

  const [
    contact,
    setContact,
  ] = useState<ContactSettings>(
    getContactSettings(),
  );


  /*
   * ============================================================
   * LOAD CONTACT SETTINGS
   * ============================================================
   *
   * When Super Admin changes the phone/WhatsApp number,
   * the Contact Settings page dispatches:
   *
   * CONTACT_SETTINGS_UPDATED_EVENT
   *
   * We listen for that event and reload the settings.
   *
   */

  useEffect(() => {

    const handleContactUpdate =
      () => {

        setContact(
          getContactSettings(),
        );

      };


    window.addEventListener(
      CONTACT_SETTINGS_UPDATED_EVENT,
      handleContactUpdate,
    );


    return () => {

      window.removeEventListener(
        CONTACT_SETTINGS_UPDATED_EVENT,
        handleContactUpdate,
      );

    };

  }, []);


  /*
   * ============================================================
   * HOME COLLECTION FEATURES
   * ============================================================
   */

  const items = [
    {
      icon: CalendarDays,
      title: "Choose a date",
      text:
        "Select a convenient collection date.",
    },

    {
      icon: Clock3,
      title: "Choose a slot",
      text:
        "Pick an available time slot.",
    },

    {
      icon: ShieldCheck,
      title: "Safe collection",
      text:
        "Samples collected by trained professionals.",
    },
  ];


  /*
   * ============================================================
   * CONTACT ACTIONS
   * ============================================================
   */

  const phoneHref =
    getPhoneHref(
      contact.supportPhone,
    );


  const whatsappHref =
    getWhatsAppHref(
      contact.whatsappNumber,
    );


  return (

    <section
      className="
        bg-white
        py-12
        sm:py-16
        lg:py-20
      "
      style={{
        backgroundColor:
          colors.background,
      }}
    >

      <Container>

        {/* ======================================================
            APOLLO STYLE NEED HELP SECTION
            ====================================================== */}

        <div
          className="
            overflow-hidden
            rounded-3xl
            border
          "
          style={{
            backgroundColor:
              colors.accent,

            borderColor:
              colors.border,
          }}
        >

          <div
            className="
              grid
              items-center
              gap-8
              p-6
              sm:p-8
              lg:grid-cols-[1.2fr_1fr]
              lg:p-10
            "
          >

            {/* ==================================================
                LEFT SIDE
                HOME COLLECTION
                ================================================== */}

            <div>

              {/* ICON */}

              <div
                className="
                  mb-5
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                "
                style={{
                  backgroundColor:
                    `${colors.buttonBackground}20`,
                }}
              >

                <Home
                  size={28}
                  style={{
                    color:
                      colors.buttonBackground,
                  }}
                />

              </div>


              {/* TITLE */}

              <h2
                className="
                  text-3xl
                  font-bold
                  leading-tight
                  sm:text-4xl
                "
                style={{
                  color:
                    colors.buttonBackground,
                }}
              >
                Get your samples
                collected at home
              </h2>


              {/* DESCRIPTION */}

              <p
                className="
                  mt-4
                  max-w-xl
                  text-base
                  leading-7
                "
                style={{
                  color:
                    colors.buttonBackground,

                  opacity: 0.9,
                }}
              >
                No need to travel. Choose a
                convenient collection slot and
                our trained collection
                professional will visit your home.
              </p>


              {/* BOOK BUTTON */}

              <Link
                to="/home-collection"
                className="
                  mt-7
                  inline-flex
                  items-center
                  justify-center
                  rounded-lg
                  px-5
                  py-3
                  text-sm
                  font-bold
                  transition
                  hover:opacity-90
                "
                style={{
                  backgroundColor:
                    colors.buttonBackground,

                  color:
                    colors.buttonText,
                }}
              >
                Book Home Collection
              </Link>

            </div>


            {/* ==================================================
                RIGHT SIDE
                FEATURES
                ================================================== */}

            <div
              className="
                grid
                gap-4
              "
            >

              {items.map(
                (item) => {

                  const Icon =
                    item.icon;

                  return (

                    <div
                      key={
                        item.title
                      }
                      className="
                        flex
                        gap-4
                        rounded-2xl
                        p-5
                      "
                      style={{
                        backgroundColor:
                          `${colors.buttonBackground}18`,
                      }}
                    >

                      {/* FEATURE ICON */}

                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                        "
                        style={{
                          backgroundColor:
                            colors.buttonBackground,
                        }}
                      >

                        <Icon
                          size={21}
                          style={{
                            color:
                              colors.buttonText,
                          }}
                        />

                      </div>


                      {/* FEATURE CONTENT */}

                      <div>

                        <h3
                          className="
                            font-bold
                          "
                          style={{
                            color:
                              colors.buttonBackground,
                          }}
                        >
                          {
                            item.title
                          }
                        </h3>


                        <p
                          className="
                            mt-1
                            text-sm
                            leading-6
                          "
                          style={{
                            color:
                              colors.buttonBackground,

                            opacity: 0.85,
                          }}
                        >
                          {
                            item.text
                          }
                        </p>

                      </div>

                    </div>

                  );

                },
              )}

            </div>

          </div>


          {/* ====================================================
              NEED HELP / CONTACT SECTION
              ==================================================== */}

          <div
            className="
              border-t
              px-6
              py-6
              sm:px-8
              lg:px-10
            "
            style={{
              borderColor:
                `${colors.buttonBackground}30`,
            }}
          >

            <h3
              className="
                text-xl
                font-bold
              "
              style={{
                color:
                  colors.buttonBackground,
              }}
            >
              Need help?
            </h3>


            <p
              className="
                mt-1
                text-sm
              "
              style={{
                color:
                  colors.buttonBackground,

                opacity: 0.85,
              }}
            >
              Our team is here to help you
              book your diagnostic tests.
            </p>


            {/* ==================================================
                CONTACT CARDS
                ================================================== */}

            <div
              className="
                mt-5
                grid
                gap-4
                md:grid-cols-2
              "
            >

              {/* =================================================
                  CALL US
                  ================================================= */}

              <a
                href={
                  contact.supportPhone
                    ? phoneHref
                    : undefined
                }
                aria-disabled={
                  !contact.supportPhone
                }
                className={`
                  group
                  flex
                  items-center
                  justify-between
                  gap-4
                  rounded-2xl
                  border
                  p-5
                  transition
                  ${
                    contact.supportPhone
                      ? "hover:-translate-y-0.5 hover:shadow-md"
                      : "cursor-not-allowed opacity-60"
                  }
                `}
                style={{
                  backgroundColor:
                    colors.buttonBackground,

                  borderColor:
                    colors.border,
                }}
              >

                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >

                  {/* PHONE ICON */}

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                    "
                    style={{
                      backgroundColor:
                        `${colors.accent}20`,
                    }}
                  >

                    <Phone
                      size={21}
                      style={{
                        color:
                          colors.accent,
                      }}
                    />

                  </div>


                  {/* TEXT */}

                  <div>

                    <h4
                      className="
                        font-bold
                      "
                      style={{
                        color:
                          colors.buttonText,
                      }}
                    >
                      Call us to book
                      your tests
                    </h4>


                    <p
                      className="
                        mt-1
                        text-sm
                      "
                      style={{
                        color:
                          colors.buttonText,

                        opacity: 0.65,
                      }}
                    >
                      {contact.supportPhone
                        ? contact.supportPhone
                        : "No phone number configured"}
                    </p>

                  </div>

                </div>


                {/* ARROW */}

                <span
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    text-lg
                    transition
                    group-hover:translate-x-1
                  "
                  style={{
                    backgroundColor:
                      `${colors.accent}15`,

                    color:
                      colors.accent,
                  }}
                >
                  →
                </span>

              </a>


              {/* =================================================
                  WHATSAPP
                  ================================================= */}

              <a
                href={
                  contact.whatsappNumber
                    ? whatsappHref
                    : undefined
                }
                target={
                  contact.whatsappNumber
                    ? "_blank"
                    : undefined
                }
                rel={
                  contact.whatsappNumber
                    ? "noopener noreferrer"
                    : undefined
                }
                aria-disabled={
                  !contact.whatsappNumber
                }
                className={`
                  group
                  flex
                  items-center
                  justify-between
                  gap-4
                  rounded-2xl
                  border
                  p-5
                  transition
                  ${
                    contact.whatsappNumber
                      ? "hover:-translate-y-0.5 hover:shadow-md"
                      : "cursor-not-allowed opacity-60"
                  }
                `}
                style={{
                  backgroundColor:
                    colors.buttonBackground,

                  borderColor:
                    colors.border,
                }}
              >

                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >

                  {/* WHATSAPP ICON */}

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                    "
                    style={{
                      backgroundColor:
                        "#25D36620",
                    }}
                  >

                    <MessageCircle
                      size={22}
                      className="
                        text-green-600
                      "
                    />

                  </div>


                  {/* TEXT */}

                  <div>

                    <h4
                      className="
                        font-bold
                      "
                      style={{
                        color:
                          colors.buttonText,
                      }}
                    >
                      WhatsApp Booking
                    </h4>


                    <p
                      className="
                        mt-1
                        text-sm
                      "
                      style={{
                        color:
                          colors.buttonText,

                        opacity: 0.65,
                      }}
                    >
                      {contact.whatsappNumber
                        ? "Chat with us on WhatsApp"
                        : "No WhatsApp number configured"}
                    </p>

                  </div>

                </div>


                {/* ARROW */}

                <span
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    text-lg
                    transition
                    group-hover:translate-x-1
                  "
                  style={{
                    backgroundColor:
                      "#25D36615",

                    color:
                      "#16A34A",
                  }}
                >
                  →
                </span>

              </a>

            </div>

          </div>

        </div>

      </Container>

    </section>
  );
}