
import {
  BellRing,
  Eye,
  Save,
  Upload,
  FileImage,
  Trash2,
} from "lucide-react";

import { useEffect, useState } from "react";

import {
  defaultAdminNotification,
  getAdminNotification,
  saveAdminNotification,
  type AdminNotification,
  type NotificationTone,
} from "../../features/admin/notificationStorage";

export function AdminNotifications() {
  const [form, setForm] = useState<AdminNotification>(
    defaultAdminNotification,
  );

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(getAdminNotification());
  }, []);

  const update = <K extends keyof AdminNotification>(
    key: K,
    value: AdminNotification[K],
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));

    setSaved(false);
  };

  const handlePosterUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a JPG, PNG, WebP, or GIF image.");
      event.target.value = "";
      return;
    }

    // Limit image size to 1.5 MB.
    if (file.size > 1.5 * 1024 * 1024) {
      alert("Please choose an image smaller than 1.5 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setForm((current) => ({
          ...current,
          posterDataUrl: reader.result as string,
          posterName: file.name,
        }));

        setSaved(false);
      }
    };

    reader.onerror = () => {
      alert("Unable to read the selected image.");
    };

    reader.readAsDataURL(file);
  };

  const removePoster = () => {
    update("posterDataUrl", "");
    update("posterName", "");
  };

  const handleSave = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!form.title.trim() || !form.message.trim()) {
      alert("Please enter both notification title and message.");
      return;
    }

    try {
      saveAdminNotification({
        ...form,
        title: form.title.trim(),
        message: form.message.trim(),
        buttonText: form.buttonText.trim(),
      });

      setSaved(true);
    } catch {
      alert(
        "Unable to save notification. Please use a smaller image or remove the image and try again.",
      );
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-blue-100 p-3 text-blue-700">
          <BellRing size={24} />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Notification Popup
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage promotional posters and announcements
            displayed on the public website.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSave}
        className="space-y-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7"
      >
        {/* Enable / Disable */}
        <div className="flex items-center justify-between gap-4 rounded-xl bg-gray-50 p-4">
          <div>
            <p className="font-semibold text-gray-900">
              Enable notification popup
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Display the notification when visitors open the website.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-label="Enable notification popup"
            aria-checked={form.active}
            onClick={() => update("active", !form.active)}
            className={`relative h-7 w-12 shrink-0 rounded-full transition ${
              form.active ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
                form.active ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>

        {/* Poster Upload */}
        <div className="rounded-2xl border-2 border-dashed border-pink-200 bg-pink-50/60 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="flex items-center gap-2 font-semibold text-gray-900">
                <FileImage size={19} className="text-pink-600" />
                Poster image
              </p>

              <p className="mt-1 text-sm text-gray-600">
                Upload your diagnostic camp poster or promotional banner.
                JPG, PNG, WebP, or GIF; maximum 1.5 MB.
              </p>
            </div>

            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-pink-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-pink-700">
              <Upload size={17} />
              Choose image

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handlePosterUpload}
                className="sr-only"
              />
            </label>
          </div>

          {form.posterDataUrl && (
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start">
              <img
                src={form.posterDataUrl}
                alt="Notification poster preview"
                className="max-h-[420px] max-w-full rounded-xl border border-pink-200 bg-white object-contain shadow-sm"
              />

              <div className="min-w-0">
                <p className="max-w-xs break-all text-sm font-medium text-gray-700">
                  {form.posterName || "Uploaded poster"}
                </p>

                <button
                  type="button"
                  onClick={removePoster}
                  className="mt-3 inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={15} />
                  Remove image
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Title */}
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-gray-700">
            Popup title *
          </span>

          <input
            value={form.title}
            onChange={(event) =>
              update("title", event.target.value)
            }
            maxLength={100}
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="e.g. Free Breast Ultrasound Camp"
          />
        </label>

        {/* Message */}
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-gray-700">
            Message *
          </span>

          <textarea
            value={form.message}
            onChange={(event) =>
              update("message", event.target.value)
            }
            maxLength={600}
            rows={4}
            required
            className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Enter the announcement message..."
          />
        </label>

        {/* Style and Button */}
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-700">
              Popup style
            </span>

            <select
              value={form.tone}
              onChange={(event) =>
                update(
                  "tone",
                  event.target.value as NotificationTone,
                )
              }
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3"
            >
              <option value="info">Information (Blue)</option>
              <option value="success">Success (Green)</option>
              <option value="warning">Warning (Amber)</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-700">
              Button text (optional)
            </span>

            <input
              value={form.buttonText}
              onChange={(event) =>
                update("buttonText", event.target.value)
              }
              maxLength={40}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="e.g. Book an Appointment"
            />
          </label>

          {form.buttonText.trim() && (
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-gray-700">
                Button link
              </span>

              <input
                value={form.buttonLink}
                onChange={(event) =>
                  update("buttonLink", event.target.value)
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                placeholder="/packages"
              />
            </label>
          )}
        </div>

        {/* Session Option */}
        <label className="flex items-start gap-3 rounded-xl border border-gray-200 p-4">
          <input
            type="checkbox"
            checked={form.showOncePerSession}
            onChange={(event) =>
              update("showOncePerSession", event.target.checked)
            }
            className="mt-1 h-4 w-4 accent-blue-600"
          />

          <span>
            <span className="block text-sm font-semibold text-gray-800">
              Show only once per browser session
            </span>

            <span className="mt-1 block text-sm text-gray-500">
              Avoid displaying the same popup repeatedly during a session.
            </span>
          </span>
        </label>

        {/* Save / Reset */}
        <div className="flex flex-wrap items-center gap-3 border-t border-gray-100 pt-5">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Save size={17} />
            Save notification
          </button>

          <button
            type="button"
            onClick={() => {
              setForm({ ...defaultAdminNotification });
              setSaved(false);
            }}
            className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Reset form
          </button>

          {saved && (
            <span className="text-sm font-medium text-green-700">
              Notification settings saved.
            </span>
          )}
        </div>
      </form>

      {/* Preview */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
        <h2 className="mb-4 flex items-center gap-2 font-bold text-gray-900">
          <Eye size={18} />
          Preview
        </h2>

        <div
          className={`rounded-2xl border p-4 ${
            form.tone === "success"
              ? "border-green-200 bg-green-50"
              : form.tone === "warning"
                ? "border-amber-200 bg-amber-50"
                : "border-blue-200 bg-blue-50"
          }`}
        >
          {form.posterDataUrl && (
            <img
              src={form.posterDataUrl}
              alt="Poster preview"
              className="mb-4 max-h-[500px] w-full rounded-xl bg-white object-contain"
            />
          )}

          <h3 className="text-lg font-bold text-gray-900">
            {form.title || "Notification title"}
          </h3>

          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-700">
            {form.message || "Your notification message will appear here."}
          </p>

          {form.buttonText.trim() && (
            <span className="mt-4 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
              {form.buttonText}
            </span>
          )}
        </div>

        {!form.active && (
          <p className="mt-3 text-xs text-gray-500">
            Preview only — the popup is currently disabled.
          </p>
        )}
      </div>
    </div>
  );
}
