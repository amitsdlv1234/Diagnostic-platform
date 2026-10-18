import { useMemo, useState, type ChangeEvent, type ReactNode } from "react";
import { Search, FileText, Upload, ExternalLink, CheckCircle2, Clock3, Users, ClipboardList } from "lucide-react";
import { getBookings } from "../../features/booking/bookingUtils";
import { createReportFromBooking, getReports, saveReport } from "../../features/reports/reportUtils";
import type { DiagnosticReport } from "../../features/reports/reportTypes";
import { getDiagnosticReportDownloadUrl, uploadDiagnosticReport } from "../../utils/cloudinaryUpload";

export function AdminReports() {
  const [refresh, setRefresh] = useState(0);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const bookings = useMemo(() => getBookings(), [refresh]);
  const reports = useMemo(() => getReports(), [refresh]);
  const rows = useMemo(() => bookings.map(booking => {
    const report = reports.find(item => item.bookingId === booking.bookingId);
    return { booking, report };
  }).filter(({ booking, report }) => {
    const patient = `${booking.patient.firstName} ${booking.patient.lastName}`.trim();
    const matches = `${patient} ${booking.patient.mobile} ${booking.patient.email} ${booking.bookingId} ${report?.reportId ?? ""}`.toLowerCase().includes(query.toLowerCase());
    const status = report?.status ?? "NOT_CREATED";
    return matches && (statusFilter === "ALL" || status === statusFilter);
  }), [bookings, reports, query, statusFilter]);
  const readyCount = reports.filter(item => item.status === "READY").length;
  const processingCount = reports.filter(item => item.status === "PROCESSING").length;

  const ensureReport = (bookingId: string): DiagnosticReport | null => {
    const report = createReportFromBooking(bookingId);
    if (report) setRefresh(value => value + 1);
    return report;
  };

  const handleUpload = async (bookingId: string, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setMessage(""); setBusyId(bookingId);
    try {
      let report = getReports().find(item => item.bookingId === bookingId) ?? createReportFromBooking(bookingId);
      if (!report) throw new Error("Could not find this booking. Refresh and try again.");
      const fileUrl = await uploadDiagnosticReport(file);
      report = { ...report, fileUrl, fileName: file.name, status: "READY", reportDate: new Date().toISOString().slice(0, 10) };
      saveReport(report);
      setMessage(`Report uploaded successfully for ${report.patientName}.`);
      setRefresh(value => value + 1);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Report upload failed.");
    } finally { setBusyId(null); }
  };

  const setProcessing = (report: DiagnosticReport) => {
    // Keep the uploaded PDF attached to the report. Changing the workflow
    // status must not remove the admin's ability to review the existing file.
    saveReport({ ...report, status: "PROCESSING" });
    setRefresh(value => value + 1);
  };

  return <div className="space-y-6">
    <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div><p className="text-sm font-semibold text-blue-700">PATIENT SERVICES</p><h1 className="mt-1 text-2xl font-bold text-gray-950">Patient Report Management</h1><p className="mt-1 max-w-2xl text-sm text-gray-500">Find patient bookings, upload diagnostic report PDFs and track report availability.</p></div>
      <button onClick={() => setRefresh(value => value + 1)} className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">Refresh records</button>
    </header>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Stat icon={<Users size={20}/>} label="Patient bookings" value={bookings.length} detail="All saved bookings"/>
      <Stat icon={<ClipboardList size={20}/>} label="Reports created" value={reports.length} detail="Linked to patient bookings"/>
      <Stat icon={<CheckCircle2 size={20}/>} label="Ready for patients" value={readyCount} detail="Reports marked ready"/>
      <Stat icon={<Clock3 size={20}/>} label="Processing" value={processingCount} detail="Awaiting final report"/>
    </div>
    {message && <div role="status" className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-800">{message}</div>}
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="border-b border-gray-100 p-5"><h2 className="font-bold text-gray-900">All patients and reports</h2><p className="mt-1 text-sm text-gray-500">Search by patient name, mobile, email, booking ID or report ID.</p>
        <div className="mt-4 flex flex-col gap-3 md:flex-row">
          <label className="relative min-w-0 flex-1"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search patients or IDs..." className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"/></label>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500"><option value="ALL">All report statuses</option><option value="NOT_CREATED">Report not created</option><option value="PROCESSING">Processing</option><option value="READY">Ready</option></select>
        </div>
      </div>
      {rows.length === 0 ? <div className="p-12 text-center"><FileText size={34} className="mx-auto text-gray-300"/><h3 className="mt-3 font-bold text-gray-900">No matching patients</h3><p className="mt-1 text-sm text-gray-500">Try a different search or status filter.</p></div> : <div className="divide-y divide-gray-100">
        {rows.map(({ booking, report }) => {
          const patientName = `${booking.patient.firstName} ${booking.patient.lastName}`.trim() || "Unnamed patient";
          const status = report?.status ?? "NOT_CREATED";
          return <article key={booking.bookingId} className="p-5 transition hover:bg-gray-50/70"><div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex min-w-0 items-start gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-700">{patientName.charAt(0).toUpperCase()}</div><div className="min-w-0"><h3 className="font-bold text-gray-900">{patientName}</h3><p className="mt-0.5 text-sm text-gray-500">{booking.patient.mobile || "No mobile"}{booking.patient.email ? ` · ${booking.patient.email}` : ""}</p><div className="mt-2 flex flex-wrap gap-2 text-xs"><span className="rounded-lg bg-gray-100 px-2 py-1 text-gray-600">Booking: {booking.bookingId}</span><span className={`rounded-lg px-2 py-1 font-semibold ${status === "READY" ? "bg-green-50 text-green-700" : status === "PROCESSING" ? "bg-amber-50 text-amber-700" : "bg-gray-100 text-gray-600"}`}>{status === "NOT_CREATED" ? "Report not created" : status}</span>{report && <span className="rounded-lg bg-blue-50 px-2 py-1 text-blue-700">{report.reportId}</span>}</div><p className="mt-2 text-sm text-gray-600">{booking.items.map(item => item.name).join(", ") || "No tests listed"}</p></div></div>
            <div className="flex flex-wrap items-center gap-2 xl:justify-end">
              {report?.fileUrl && <>
                <a href={report.fileUrl} target="_blank" rel="noopener noreferrer" aria-label={`View report PDF for ${patientName}`} className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"><ExternalLink size={15}/> View PDF</a>
                <a href={getDiagnosticReportDownloadUrl(report.fileUrl)} target="_blank" rel="noopener noreferrer" aria-label={`Download report PDF for ${patientName}`} className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"><FileText size={15}/> Download PDF</a>
              </>}
              <label className={`inline-flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white ${busyId === booking.bookingId ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"}`}><Upload size={15}/>{busyId === booking.bookingId ? "Uploading..." : report ? "Replace PDF" : "Upload report PDF"}<input type="file" accept="application/pdf,.pdf" className="hidden" disabled={busyId === booking.bookingId} onChange={event => void handleUpload(booking.bookingId, event)}/></label>
              {!report ? <button onClick={() => ensureReport(booking.bookingId)} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100">Create report</button> : report.status === "READY" && <button onClick={() => setProcessing(report)} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100">Mark processing</button>}
            </div>
          </div></article>;
        })}
      </div>}
      <div className="border-t border-gray-100 bg-gray-50 px-5 py-3 text-xs text-gray-500">Showing {rows.length} of {bookings.length} patient bookings.</div>
    </section>
    <p className="text-xs leading-5 text-gray-500">Privacy note: this version stores report metadata in this browser and uploads PDFs to your configured Cloudinary account. If a PDF uploads but will not open, check Cloudinary Console → Settings → Security and enable PDF delivery for your account, then verify that the upload preset allows raw files. For real patient data, use authenticated backend APIs and role-based access controls before production deployment.</p>
  </div>;
}

function Stat({ icon, label, value, detail }: { icon: ReactNode; label: string; value: number; detail: string }) {
  return <div className="rounded-2xl border border-gray-200 bg-white p-5"><div className="flex items-center justify-between"><span className="text-sm font-medium text-gray-500">{label}</span><span className="rounded-xl bg-blue-50 p-2 text-blue-700">{icon}</span></div><p className="mt-3 text-3xl font-bold tracking-tight text-gray-950">{value}</p><p className="mt-1 text-xs text-gray-500">{detail}</p></div>;
}
