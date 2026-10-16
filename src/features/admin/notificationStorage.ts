
export type NotificationTone = "info" | "success" | "warning";

export interface AdminNotification {
  title: string;
  message: string;
  buttonText: string;
  buttonLink: string;
  tone: NotificationTone;
  active: boolean;
  showOncePerSession: boolean;
  posterDataUrl: string;
  posterName: string;
}

const STORAGE_KEY = "diagnostic-admin-notification";

export const defaultAdminNotification: AdminNotification = {
  title: "Important Notice",
  message:
    "Stay updated with the latest announcements from Nidan Diagnostic.",
  buttonText: "",
  buttonLink: "/",
  tone: "info",
  active: false,
  showOncePerSession: true,
  posterDataUrl: "",
  posterName: "",
};

export function getAdminNotification(): AdminNotification {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return { ...defaultAdminNotification };
    }

    const parsed = JSON.parse(stored);

    return {
      ...defaultAdminNotification,
      ...parsed,
    } as AdminNotification;
  } catch {
    return { ...defaultAdminNotification };
  }
}

export function saveAdminNotification(
  notification: AdminNotification,
): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(notification),
  );

  // Refresh notification settings on the current page.
  window.dispatchEvent(
    new Event("admin-notification-updated"),
  );
}
