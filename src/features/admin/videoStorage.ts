export interface ManagedVideo { id: string; title: string; description: string; youtubeUrl: string; poster?: string; active: boolean; }
const KEY = "diagnostic_managed_videos";
export const VIDEOS_UPDATED_EVENT = "diagnostic-videos-updated";
export const DEFAULT_VIDEOS: ManagedVideo[] = [
 { id: "video-1", title: "Welcome to Nidan Diagnostic Centre", description: "Know more about Nidan Diagnostic Centre, our specialists and diagnostic services.", youtubeUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4", active: true },
 { id: "video-2", title: "Our Diagnostic Services", description: "Explore our advanced diagnostic services and patient-focused healthcare facilities.", youtubeUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4", active: true },
 { id: "video-3", title: "Why Choose Nidan?", description: "Learn why patients trust Nidan for accurate, reliable and timely diagnostic services.", youtubeUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4", active: true },
];
export function getManagedVideos(): ManagedVideo[] { try { const raw = localStorage.getItem(KEY); if (!raw) { localStorage.setItem(KEY, JSON.stringify(DEFAULT_VIDEOS)); return DEFAULT_VIDEOS; } const value = JSON.parse(raw); return Array.isArray(value) ? value : DEFAULT_VIDEOS; } catch { return DEFAULT_VIDEOS; } }
export function saveManagedVideos(videos: ManagedVideo[]) { localStorage.setItem(KEY, JSON.stringify(videos)); window.dispatchEvent(new Event(VIDEOS_UPDATED_EVENT)); }
export function youtubeEmbedUrl(url: string): string { try { const parsed = new URL(url); let id = ""; if (parsed.hostname.includes("youtu.be")) id = parsed.pathname.slice(1); else if (parsed.pathname.startsWith("/embed/")) id = parsed.pathname.split("/")[2] || ""; else id = parsed.searchParams.get("v") || ""; return /^[A-Za-z0-9_-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : ""; } catch { return ""; } }
