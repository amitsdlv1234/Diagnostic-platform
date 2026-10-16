
import { useEffect, useState } from "react";
import {
  BellRing,
  CheckCircle2,
//   Info,
  TriangleAlert,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  getAdminNotification,
  type AdminNotification,
} from "../../features/admin/notificationStorage";

const SESSION_KEY = "diagnostic-notification-dismissed";

export function NotificationPopup() {
  const [notification, setNotification] =
    useState<AdminNotification>(() => getAdminNotification());

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const refresh = () => {
      const next = getAdminNotification();

      setNotification(next);

      const dismissed =
        sessionStorage.getItem(SESSION_KEY) ===
        `${next.title}|${next.message}`;

      setVisible(
        next.active &&
          !(next.showOncePerSession && dismissed),
      );
    };

    refresh();

    window.addEventListener(
      "admin-notification-updated",
      refresh,
    );

    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener(
        "admin-notification-updated",
        refresh,
      );

      window.removeEventListener("storage", refresh);
    };
  }, []);

  const close = () => {
    sessionStorage.setItem(
      SESSION_KEY,
      `${notification.title}|${notification.message}`,
    );

    setVisible(false);
  };

  if (!visible || !notification.active) {
    return null;
  }

  const toneClass =
    notification.tone === "success"
      ? "border-green-200 bg-green-50"
      : notification.tone === "warning"
        ? "border-amber-200 bg-amber-50"
        : "border-blue-200 bg-blue-50";

  const iconClass =
    notification.tone === "success"
      ? "text-green-700"
      : notification.tone === "warning"
        ? "text-amber-700"
        : "text-blue-700";

//   const ToneIcon =
//     notification.tone === "success"
//       ? CheckCircle2
//       : notification.tone === "warning"
//         ? TriangleAlert
//         : Info;

  const buttonLink = notification.buttonLink || "/";
  const isExternal = /^https?:\/\//i.test(buttonLink);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/65 p-3 backdrop-blur-sm sm:p-5"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          close();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="site-notification-title"
        className={`relative max-h-[94dvh] w-full max-w-2xl overflow-y-auto rounded-3xl border p-3 shadow-2xl sm:p-4 ${toneClass}`}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={close}
          aria-label="Close notification"
          className="absolute right-3 top-3 z-20 rounded-full bg-white/95 p-2 text-gray-700 shadow-md transition hover:bg-white hover:text-gray-950"
        >
          <X size={20} />
        </button>

        {/* Poster image: displayed when uploaded */}
        {notification.posterDataUrl && (
          <div className="-mx-2 -mt-2 overflow-hidden rounded-2xl bg-white sm:-mx-3 sm:-mt-3">
            <img
              src={notification.posterDataUrl}
              alt={
                notification.title ||
                "Nidan Diagnostic Centre announcement"
              }
              className="mx-auto max-h-[55dvh] w-full object-contain"
            />
          </div>
        )}

        {/* Notification content: always displayed */}
        <div className="px-1 pt-4">
          <div
            className={`mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-gray-500 ${iconClass}`}
          >
            {notification.tone === "success" ? (
              <CheckCircle2 size={17} />
            ) : notification.tone === "warning" ? (
              <TriangleAlert size={17} />
            ) : (
              <BellRing size={17} />
            )}

            <span>Nidan Diagnostic Centre</span>
          </div>

          <h2
            id="site-notification-title"
            className="pr-8 text-xl font-extrabold leading-tight text-gray-950 sm:text-2xl"
          >
            {notification.title}
          </h2>

          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-700 sm:text-base sm:leading-7">
            {notification.message}
          </p>
        </div>

        {/* Action button and dismiss */}
        <div className="mt-4 flex flex-wrap items-center gap-3 px-1 pb-1">
          {notification.buttonText.trim() &&
            (isExternal ? (
              <a
                href={buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="inline-flex items-center justify-center rounded-xl bg-pink-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-pink-700"
              >
                {notification.buttonText}
              </a>
            ) : (
              <Link
                to={buttonLink}
                onClick={close}
                className="inline-flex items-center justify-center rounded-xl bg-pink-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-pink-700"
              >
                {notification.buttonText}
              </Link>
            ))}

          <button
            type="button"
            onClick={close}
            className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Dismiss
          </button>
        </div>
      </section>
    </div>
  );
}
