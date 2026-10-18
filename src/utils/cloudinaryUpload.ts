
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

async function uploadImage(file: File, folder: string): Promise<string> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error("Cloudinary configuration is missing.");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Please select an image file.");
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Only JPG, PNG and WebP images are allowed.");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image size must be 5 MB or less.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error?.message || "Image upload failed.");
  }

  return result.secure_url as string;
}


export async function uploadHeroImage(file: File): Promise<string> {
  return uploadImage(file, "hero-slider");
}

export async function uploadDoctorImage(file: File): Promise<string> {
  return uploadImage(file, "doctor-section");
}


export async function uploadArticleImage(file: File): Promise<string> {
  return uploadImage(file, "article-images");
}

export async function uploadArticleFile(file: File): Promise<string> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) throw new Error("Cloudinary configuration is missing.");
  const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
  if (!allowed.includes(file.type)) throw new Error("Please select a PDF, DOC, or DOCX file.");
  if (file.size > 10 * 1024 * 1024) throw new Error("Document size must be 10 MB or less.");
  const data = new FormData();
  data.append("file", file); data.append("upload_preset", UPLOAD_PRESET); data.append("folder", "article-files");
  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`, { method: "POST", body: data });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error?.message || "Document upload failed.");
  return result.secure_url as string;
}


/** Upload a diagnostic report PDF to Cloudinary raw storage. */
export async function uploadDiagnosticReport(file: File): Promise<string> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error("Cloudinary configuration is missing. Check VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET.");
  }
  if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
    throw new Error("Please select a PDF file.");
  }
  if (file.size > 15 * 1024 * 1024) throw new Error("Report PDF must be 15 MB or less.");

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", UPLOAD_PRESET);
  data.append("folder", "diagnostic-reports");
  // Unsigned presets reject use_filename and unique_filename. Supply a unique
  // public_id instead (allowed for unsigned uploads) and retain the PDF extension.
  const safeBaseName = file.name
    .replace(/\\.pdf$/i, "")
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "diagnostic-report";
  data.append("public_id", `${safeBaseName}-${Date.now()}.pdf`);
  data.append("filename_override", file.name);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`, {
    method: "POST",
    body: data,
  });
  const result = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(result?.error?.message || `Cloudinary report upload failed (HTTP ${response.status}).`);
  }
  if (result?.resource_type !== "raw" || typeof result?.secure_url !== "string" || !result.secure_url.toLowerCase().includes(".pdf")) {
    throw new Error("Cloudinary received the file but did not return a valid PDF delivery URL. Check the raw upload preset and PDF delivery settings.");
  }
  return result.secure_url;
}

/** Build a Cloudinary raw-file URL that asks the browser to download the PDF. */
export function getDiagnosticReportDownloadUrl(fileUrl: string): string {
  if (!fileUrl.includes("/raw/upload/")) return fileUrl;
  return fileUrl.replace("/raw/upload/", "/raw/upload/fl_attachment/");
}
