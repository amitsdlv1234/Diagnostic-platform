import { useEffect, useMemo, useRef, useState } from "react";
import {
  CheckCircle2, CirclePlay, Eye, EyeOff, ExternalLink, Link2,
  Plus, Save, Trash2, Video, X, RotateCcw, Info,
} from "lucide-react";
import {
  DEFAULT_VIDEOS,
  getManagedVideos,
  saveManagedVideos,
  youtubeEmbedUrl,
  type ManagedVideo,
} from "../../features/admin/videoStorage";

export function AdminVideos() {
  const [videos, setVideos] = useState<ManagedVideo[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [previewId, setPreviewId] = useState<string | null>(null);
  const newlyAddedVideoId = useRef<string | null>(null);

  useEffect(() => setVideos(getManagedVideos()), []);

  useEffect(() => {
    const id = newlyAddedVideoId.current;
    if (!id) return;
    newlyAddedVideoId.current = null;
    requestAnimationFrame(() => {
      const card = document.getElementById(`video-card-${id}`);
      card?.scrollIntoView({ behavior: "smooth", block: "start" });
      document.getElementById(`video-title-${id}`)?.focus({ preventScroll: true });
    });
  }, [videos]);

  const activeCount = useMemo(() => videos.filter((video) => video.active).length, [videos]);
  const update = (id: string, field: keyof ManagedVideo, value: string | boolean) => {
    setVideos((current) => current.map((video) => video.id === id ? { ...video, [field]: value } : video));
    setMessage("");
    setError("");
  };
  const add = () => {
    const id = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `video-${Date.now()}`;
    newlyAddedVideoId.current = id;
    setVideos((current) => [...current, { id, title: "", description: "", youtubeUrl: "", active: true }]);
    setMessage("");
    setError("");
  };
  const remove = (id: string) => {
    setVideos((current) => current.filter((video) => video.id !== id));
    if (previewId === id) setPreviewId(null);
    setMessage("");
  };
  const save = () => {
    for (const [index, video] of videos.entries()) {
      if (!video.title.trim()) {
        setError(`Please enter a title for Video ${index + 1}.`);
        return;
      }
      if (!youtubeEmbedUrl(video.youtubeUrl)) {
        setError(`Please enter a valid YouTube link for “${video.title}”.`);
        return;
      }
    }
    saveManagedVideos(videos);
    setError("");
    setMessage("Your video section has been saved successfully.");
  };
  const reset = () => {
    setVideos(DEFAULT_VIDEOS.map((video) => ({ ...video })));
    setMessage("");
    setError("");
    setPreviewId(null);
  };

  return (
    <div className="min-h-full bg-slate-50/70 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-pink-700">
              <Video size={17} /> Website content
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Video section management</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Manage the videos visitors see on the homepage. Add a YouTube link, preview it, and choose which videos should be visible.</p>
          </div>
          <button type="button" onClick={add} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-pink-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-200">
            <Plus size={18} /> Add a video
          </button>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Total videos</p><p className="mt-1 text-2xl font-bold text-slate-900">{videos.length}</p>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Visible on homepage</p><p className="mt-1 text-2xl font-bold text-emerald-700">{activeCount}</p>
          </div>
          <div className="col-span-2 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 sm:col-span-1">
            <div className="flex items-start gap-2 text-sm leading-5 text-blue-900"><Info size={18} className="mt-0.5 shrink-0"/><span>Use a standard YouTube video link, such as <strong>youtube.com/watch?v=…</strong> or <strong>youtu.be/…</strong>.</span></div>
          </div>
        </div>

        {videos.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-50 text-pink-700"><CirclePlay size={28}/></div>
            <h2 className="mt-4 text-lg font-semibold text-slate-900">No videos added yet</h2>
            <p className="mt-1 text-sm text-slate-500">Add your first YouTube video to display it on the homepage.</p>
            <button type="button" onClick={add} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-pink-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-pink-800"><Plus size={17}/> Add your first video</button>
          </div>
        ) : (
          <div className="space-y-5">
            {videos.map((video, index) => {
              const embedUrl = youtubeEmbedUrl(video.youtubeUrl);
              const isPreviewOpen = previewId === video.id;
              return (
                <section id={`video-card-${video.id}`} key={video.id} className="scroll-mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-white px-4 py-4 sm:px-6">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-50 text-pink-700"><CirclePlay size={21}/></div>
                      <div className="min-w-0"><h2 className="font-semibold text-slate-900">Video {index + 1}{video.title.trim() ? ` · ${video.title.trim()}` : " · Untitled video"}</h2><p className="mt-0.5 text-xs text-slate-500">{video.active ? "Shown on homepage" : "Hidden from homepage"}</p></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${video.active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{video.active ? "Published" : "Hidden"}</span>
                      <button type="button" onClick={() => remove(video.id)} aria-label={`Remove video ${index + 1}`} className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-rose-600 transition hover:bg-rose-50"><Trash2 size={16}/><span className="hidden sm:inline">Remove</span></button>
                    </div>
                  </div>

                  <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.85fr)]">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor={`video-title-${video.id}`} className="mb-1.5 block text-sm font-semibold text-slate-800">Video title <span className="text-rose-600">*</span></label>
                        <input id={`video-title-${video.id}`} value={video.title} onChange={(event) => update(video.id, "title", event.target.value)} maxLength={100} placeholder="e.g. Welcome to Nidan Diagnostic Centre" className="w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-pink-500 focus:ring-4 focus:ring-pink-100" />
                      </div>
                      <div>
                        <label htmlFor={`video-url-${video.id}`} className="mb-1.5 block text-sm font-semibold text-slate-800">YouTube video link <span className="text-rose-600">*</span></label>
                        <div className="flex items-center gap-2 rounded-xl border border-slate-300 px-3 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-100"><Link2 size={17} className="shrink-0 text-slate-400"/><input id={`video-url-${video.id}`} value={video.youtubeUrl} onChange={(event) => update(video.id, "youtubeUrl", event.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="min-w-0 flex-1 py-3 text-sm outline-none placeholder:text-slate-400"/><a href={video.youtubeUrl || "https://www.youtube.com"} target="_blank" rel="noreferrer" aria-label="Open YouTube link" className={`rounded-md p-1.5 ${embedUrl ? "text-pink-700 hover:bg-pink-50" : "pointer-events-none text-slate-300"}`}><ExternalLink size={17}/></a></div>
                        <p className={`mt-1.5 text-xs ${video.youtubeUrl && !embedUrl ? "text-rose-600" : "text-slate-500"}`}>{video.youtubeUrl && !embedUrl ? "This link doesn't look like a valid YouTube video URL." : "Paste the YouTube URL; the preview will appear on the right."}</p>
                      </div>
                      <div>
                        <label htmlFor={`video-description-${video.id}`} className="mb-1.5 block text-sm font-semibold text-slate-800">Short description <span className="font-normal text-slate-400">(optional)</span></label>
                        <textarea id={`video-description-${video.id}`} value={video.description} onChange={(event) => update(video.id, "description", event.target.value)} maxLength={300} rows={3} placeholder="Briefly tell visitors what this video covers..." className="w-full resize-y rounded-xl border border-slate-300 px-3.5 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-pink-500 focus:ring-4 focus:ring-pink-100"/><p className="mt-1 text-right text-xs text-slate-400">{video.description.length}/300</p>
                      </div>
                      <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200 p-3.5 transition hover:border-slate-300">
                        <span className="flex items-center gap-3"><span className={`flex h-9 w-9 items-center justify-center rounded-lg ${video.active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{video.active ? <Eye size={18}/> : <EyeOff size={18}/>}</span><span><span className="block text-sm font-semibold text-slate-800">Show on homepage</span><span className="mt-0.5 block text-xs text-slate-500">{video.active ? "Visitors can see this video." : "This video is hidden from visitors."}</span></span></span>
                        <input type="checkbox" checked={video.active} onChange={(event) => update(video.id, "active", event.target.checked)} className="h-5 w-5 shrink-0 accent-pink-700" aria-label="Show this video on homepage"/>
                      </label>
                    </div>

                    <div className="min-w-0">
                      <div className="mb-2 flex items-center justify-between gap-2"><h3 className="text-sm font-semibold text-slate-800">Video preview</h3>{embedUrl && <button type="button" onClick={() => setPreviewId(isPreviewOpen ? null : video.id)} className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-pink-700 hover:bg-pink-50">{isPreviewOpen ? "Hide preview" : "Preview video"}</button>}</div>
                      <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-950">
                        {embedUrl && isPreviewOpen ? <iframe title={video.title || `Video ${index + 1} preview`} src={embedUrl} className="aspect-video w-full" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/> : <button type="button" disabled={!embedUrl} onClick={() => setPreviewId(video.id)} className={`group flex aspect-video w-full flex-col items-center justify-center gap-3 p-5 text-center ${embedUrl ? "cursor-pointer text-white hover:bg-slate-900" : "cursor-not-allowed text-slate-500"}`}><span className={`flex h-14 w-14 items-center justify-center rounded-full ${embedUrl ? "bg-pink-700 text-white transition group-hover:scale-105 group-hover:bg-pink-600" : "bg-slate-800"}`}><CirclePlay size={30}/></span><span className="text-sm font-medium">{embedUrl ? "Click to preview video" : "Add a valid YouTube link to preview"}</span></button>}
                      </div>
                      <p className="mt-2 text-xs leading-5 text-slate-500">Preview is for checking the link. Remember to save your changes to update the homepage.</p>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        )}

        <div className="sticky bottom-0 z-10 mt-6 border-t border-slate-200 bg-slate-50/95 py-4 backdrop-blur-sm">
          {error && <div role="alert" className="mb-3 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"><X size={17} className="mt-0.5 shrink-0"/>{error}</div>}
          {message && <div role="status" className="mb-3 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"><CheckCircle2 size={17}/>{message}</div>}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" onClick={reset} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"><RotateCcw size={16}/> Reset to defaults</button>
            <button type="button" onClick={save} className="inline-flex items-center justify-center gap-2 rounded-xl bg-pink-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-200"><Save size={17}/> Save video section</button>
          </div>
        </div>
      </div>
    </div>
  );
}
