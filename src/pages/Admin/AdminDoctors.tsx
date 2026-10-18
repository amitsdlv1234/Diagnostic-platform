import { Eye, EyeOff, Save, RotateCcw, Upload, Image as ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { uploadDoctorImage } from "../../utils/cloudinaryUpload";
import {
  defaultDoctorContent,
  getDoctorContent,
  saveDoctorContent,
  type DoctorContent,
} from "../../features/admin/doctorConfig";

const inputClass = "mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
const labelClass = "block text-sm font-semibold text-gray-700";

function ListEditor({ title, values, onChange }: { title: string; values: string[]; onChange: (values: string[]) => void }) {
  return <section className="rounded-2xl border border-gray-200 bg-white p-5">
    <div className="mb-3 flex items-center justify-between gap-3"><h3 className="font-bold text-gray-900">{title}</h3><button type="button" onClick={() => onChange([...values, ""])} className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100">+ Add item</button></div>
    <div className="space-y-2">{values.map((value, index) => <div key={`${title}-${index}`} className="flex gap-2"><input aria-label={`${title} ${index + 1}`} className={inputClass} value={value} onChange={(e) => onChange(values.map((item, i) => i === index ? e.target.value : item))} placeholder={`Enter ${title.toLowerCase()}`} /><button type="button" onClick={() => onChange(values.filter((_, i) => i !== index))} className="shrink-0 rounded-lg px-3 text-sm font-semibold text-red-600 hover:bg-red-50">Remove</button></div>)}</div>
  </section>;
}

export function AdminDoctors() {
  const [doctor, setDoctor] = useState<DoctorContent>(() => getDoctorContent());
  const [saved, setSaved] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadError, setUploadError] = useState("");
  useEffect(() => setDoctor(getDoctorContent()), []);
  const update = <K extends keyof DoctorContent>(key: K, value: DoctorContent[K]) => setDoctor((old) => ({ ...old, [key]: value }));
  const save = () => { saveDoctorContent(doctor); setSaved(true); window.setTimeout(() => setSaved(false), 2500); };
  const handlePhotoUpload = async (file?: File) => {
    if (!file) return;
    setUploadError("");
    setUploadingPhoto(true);
    try {
      const imageUrl = await uploadDoctorImage(file);
      update("imageUrl", imageUrl);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Photo upload failed. Please try again.");
    } finally {
      setUploadingPhoto(false);
    }
  };
  const reset = () => { if (window.confirm("Reset doctor details to the original defaults?")) { setDoctor({ ...defaultDoctorContent }); saveDoctorContent({ ...defaultDoctorContent }); } };

  return <div className="mx-auto max-w-5xl space-y-6">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Website content</p><h1 className="mt-1 text-3xl font-bold text-gray-950">Doctor Section</h1><p className="mt-2 text-sm text-gray-500">Manage the doctor section on the homepage and the full doctor profile page.</p></div><div className="flex flex-wrap gap-2"><button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700"><RotateCcw size={16}/> Reset</button><button type="button" onClick={save} className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"><Save size={16}/> {saved ? "Saved" : "Save changes"}</button></div></div>
    <section className="flex items-center justify-between gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-5"><div className="flex items-center gap-3"><div className="rounded-xl bg-white p-3 text-blue-700">{doctor.enabled ? <Eye size={21}/> : <EyeOff size={21}/>}</div><div><p className="font-bold text-gray-900">Show doctor section</p><p className="mt-1 text-sm text-gray-600">{doctor.enabled ? "Doctor content is visible on the public website." : "Doctor content is hidden from the public website."}</p></div></div><button type="button" role="switch" aria-checked={doctor.enabled} onClick={() => update("enabled", !doctor.enabled)} className={`relative h-7 w-12 rounded-full transition ${doctor.enabled ? "bg-blue-700" : "bg-gray-300"}`}><span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${doctor.enabled ? "left-6" : "left-1"}`}/></button></section>
    <section className="grid gap-5 rounded-2xl border border-gray-200 bg-white p-5 md:grid-cols-2"><div className="md:col-span-2"><h2 className="text-lg font-bold text-gray-900">Doctor details</h2></div>
      <label className={labelClass}>Doctor name<input className={inputClass} value={doctor.name} onChange={e => update("name", e.target.value)} /></label>
      <label className={labelClass}>Designation<input className={inputClass} value={doctor.title} onChange={e => update("title", e.target.value)} /></label>
      <label className={labelClass}>Qualifications summary<input className={inputClass} value={doctor.qualificationsSummary} onChange={e => update("qualificationsSummary", e.target.value)} /></label>
      <label className={labelClass}>Speciality<input className={inputClass} value={doctor.specialty} onChange={e => update("specialty", e.target.value)} /></label>
      <div className="md:col-span-2 space-y-3">
        <label className={labelClass}>Doctor photo</label>
        <div className="flex flex-col gap-4 rounded-xl border border-dashed border-gray-300 p-4 sm:flex-row sm:items-center">
          {doctor.imageUrl ? <img src={doctor.imageUrl} alt="Doctor preview" className="h-36 w-28 rounded-xl border border-gray-100 object-cover" onError={e => { e.currentTarget.style.display = "none"; }} /> : <div className="flex h-36 w-28 items-center justify-center rounded-xl bg-gray-100 text-gray-400"><ImageIcon size={28}/></div>}
          <div className="space-y-2">
            <label className={`inline-flex cursor-pointer items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 ${uploadingPhoto ? "pointer-events-none opacity-60" : ""}`}>
              <Upload size={16}/>{uploadingPhoto ? "Uploading photo..." : "Upload photo to Cloudinary"}
              <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" disabled={uploadingPhoto} onChange={e => { void handlePhotoUpload(e.target.files?.[0]); e.currentTarget.value = ""; }} />
            </label>
            <p className="text-xs text-gray-500">JPG, PNG or WebP · Maximum 5 MB. The uploaded image URL is saved with the doctor details.</p>
            {uploadError && <p role="alert" className="text-sm font-medium text-red-600">{uploadError}</p>}
          </div>
        </div>
        <label className={labelClass}>Or enter a photo URL<input className={inputClass} value={doctor.imageUrl} onChange={e => update("imageUrl", e.target.value)} placeholder="Paste a publicly accessible image URL" /></label>
      </div>
      <label className={`${labelClass} md:col-span-2`}>Homepage introduction<textarea className={inputClass} rows={4} value={doctor.shortBio} onChange={e => update("shortBio", e.target.value)} /></label>
      <label className={`${labelClass} md:col-span-2`}>Full profile introduction<textarea className={inputClass} rows={3} value={doctor.profileBio} onChange={e => update("profileBio", e.target.value)} /></label>
      <label className={labelClass}>Address<input className={inputClass} value={doctor.address} onChange={e => update("address", e.target.value)} /></label>
      <label className={labelClass}>Contact phone<input className={inputClass} value={doctor.phone} onChange={e => update("phone", e.target.value)} /></label>
    </section>
    <ListEditor title="Areas of expertise" values={doctor.expertise} onChange={v => update("expertise", v)} />
    <ListEditor title="Qualifications" values={doctor.qualifications} onChange={v => update("qualifications", v)} />
    <ListEditor title="Training" values={doctor.training} onChange={v => update("training", v)} />
    <ListEditor title="Memberships" values={doctor.memberships} onChange={v => update("memberships", v)} />
    <div className="flex justify-end"><button type="button" onClick={save} className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"><Save size={17}/>{saved ? "Changes saved" : "Save doctor section"}</button></div>
  </div>;
}
