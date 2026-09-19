import {
  useEffect,
  useState,
} from "react";

import {
  Check,
  MessageCircle,
  Phone,
  RotateCcw,
  Save,
} from "lucide-react";

import {
  getContactSettings,
  resetContactSettings,
  saveContactSettings,
  type ContactSettings as ContactSettingsType,
} from "../../features/contact/contactService";

export function ContactSettings() {
  const [
    settings,
    setSettings,
  ] = useState<ContactSettingsType>({
    supportPhone: "",
    whatsappNumber: "",
  });

  const [
    saved,
    setSaved,
  ] = useState(false);

  /*
   * ============================================================
   * LOAD SETTINGS
   * ============================================================
   */

  useEffect(() => {
    setSettings(
      getContactSettings(),
    );
  }, []);

  /*
   * ============================================================
   * HANDLE CHANGE
   * ============================================================
   */

  const handleChange = (
    field: keyof ContactSettingsType,
    value: string,
  ) => {
    setSettings(
      (previous) => ({
        ...previous,
        [field]: value,
      }),
    );

    setSaved(false);
  };

  /*
   * ============================================================
   * SAVE
   * ============================================================
   */

  const handleSave = () => {
    saveContactSettings(
      settings,
    );

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  /*
   * ============================================================
   * RESET
   * ============================================================
   */

  const handleReset = () => {
    resetContactSettings();

    setSettings(
      getContactSettings(),
    );

    setSaved(false);
  };

  return (
    <div className="max-w-4xl">

      {/* ======================================================
          HEADER
          ====================================================== */}

      <div>
        <h1 className="text-2xl font-bold text-gray-950">
          Contact Settings
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage the phone and WhatsApp numbers
          displayed on the website.
        </p>
      </div>

      {/* ======================================================
          SETTINGS CARD
          ====================================================== */}

      <div className="mt-7 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900">
            Booking Contact Details
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            These contact details are used in the
            "Need help?" section on the home page.
          </p>
        </div>

        {/* ====================================================
            PHONE
            ==================================================== */}

        <div>
          <label
            htmlFor="supportPhone"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Support Phone Number
          </label>

          <div className="relative">
            <Phone
              size={18}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              id="supportPhone"
              type="tel"
              value={
                settings.supportPhone
              }
              onChange={(event) =>
                handleChange(
                  "supportPhone",
                  event.target.value,
                )
              }
              placeholder="+91 9999999999"
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                py-3
                pl-10
                pr-4
                text-sm
                outline-none
                transition
                focus:border-pink-500
                focus:ring-2
                focus:ring-pink-100
              "
            />
          </div>

          <p className="mt-2 text-xs text-gray-500">
            This number will be used for the
            "Call us to book your tests" button.
          </p>
        </div>

        {/* ====================================================
            WHATSAPP
            ==================================================== */}

        <div className="mt-6">
          <label
            htmlFor="whatsappNumber"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            WhatsApp Number
          </label>

          <div className="relative">
            <MessageCircle
              size={18}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              id="whatsappNumber"
              type="tel"
              value={
                settings.whatsappNumber
              }
              onChange={(event) =>
                handleChange(
                  "whatsappNumber",
                  event.target.value,
                )
              }
              placeholder="919999999999"
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                py-3
                pl-10
                pr-4
                text-sm
                outline-none
                transition
                focus:border-pink-500
                focus:ring-2
                focus:ring-pink-100
              "
            />
          </div>

          <p className="mt-2 text-xs text-gray-500">
            Enter the WhatsApp number with country
            code. Example: 919999999999. This number will be used for the
            "WhatsApp Booking" button.
          </p>
        </div>

        {/* ====================================================
            PREVIEW
            ==================================================== */}

        <div className="mt-8 rounded-xl border border-pink-100 bg-pink-50 p-5">

          <h3 className="text-sm font-bold text-gray-900">
            Preview
          </h3>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">

            {/* PHONE PREVIEW */}

            <div className="rounded-xl border border-gray-200 bg-white p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 text-pink-700">
                  <Phone size={19} />
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Call us to book your tests
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {settings.supportPhone ||
                      "No phone number configured"}
                  </p>
                </div>

              </div>

            </div>

            {/* WHATSAPP PREVIEW */}

            <div className="rounded-xl border border-gray-200 bg-white p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <MessageCircle
                    size={19}
                  />
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-900">
                    WhatsApp Booking
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {settings.whatsappNumber ||
                      "No WhatsApp number configured"}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ====================================================
            ACTIONS
            ==================================================== */}

        <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-gray-100 pt-6">

          <button
            type="button"
            onClick={handleSave}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-pink-700
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-pink-800
            "
          >
            {saved ? (
              <Check size={17} />
            ) : (
              <Save size={17} />
            )}

            {saved
              ? "Saved"
              : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-gray-300
              bg-white
              px-5
              py-3
              text-sm
              font-semibold
              text-gray-700
              transition
              hover:bg-gray-50
            "
          >
            <RotateCcw size={17} />

            Reset
          </button>

        </div>

      </div>

    </div>
  );
}