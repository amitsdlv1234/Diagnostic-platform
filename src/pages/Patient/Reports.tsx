import { useCallback, useEffect, useState } from "react";
import { CalendarDays, CheckCircle2, ChevronRight, Download, ExternalLink, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/authStore";
import { getBookings } from "../../features/booking/bookingUtils";
import { getReports } from "../../features/reports/reportUtils";
import type { DiagnosticReport } from "../../features/reports/reportTypes";
import { getDiagnosticReportDownloadUrl } from "../../utils/cloudinaryUpload";

export function Reports() {
  const { patient } = useAuth();
  const [reports, setReports] = useState<DiagnosticReport[]>([]);
  const refreshReports = useCallback(() => {
    const bookings = getBookings();
    const savedReports = getReports();
    const mobile = patient?.mobile?.replace(/\D/g, "") ?? "";
    const email = patient?.email?.trim().toLowerCase() ?? "";
    const fullName = `${patient?.firstName ?? ""} ${patient?.lastName ?? ""}`.trim().toLowerCase();

    // Only show reports linked to bookings belonging to the signed-in patient.
    const ownBookingIds = new Set(bookings.filter((booking) => {
      const bookingMobile = booking.patient.mobile?.replace(/\D/g, "") ?? "";
      const bookingEmail = booking.patient.email?.trim().toLowerCase() ?? "";
      const bookingName = `${booking.patient.firstName} ${booking.patient.lastName}`.trim().toLowerCase();
      return (mobile && bookingMobile === mobile) || (email && bookingEmail === email) || (!mobile && !email && fullName && bookingName === fullName);
    }).map((booking) => booking.bookingId));

    setReports(savedReports.filter((report) => ownBookingIds.has(report.bookingId)).sort((a, b) => b.reportDate.localeCompare(a.reportDate)));
  }, [patient?.mobile, patient?.email, patient?.firstName, patient?.lastName]);

  useEffect(() => {
    refreshReports();
    window.addEventListener("storage", refreshReports);
    window.addEventListener("diagnostic-reports-updated", refreshReports);
    return () => {
      window.removeEventListener("storage", refreshReports);
      window.removeEventListener("diagnostic-reports-updated", refreshReports);
    };
  }, [refreshReports]);

  if (reports.length === 0) {
    return <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
      <h2 className="text-xl font-bold text-gray-900">My Reports</h2>
      <p className="mt-1 text-sm text-gray-500">View and download finalized diagnostic reports uploaded by Nidan Diagnostic Centre.</p>
      <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
        <FileText size={35} className="mx-auto text-blue-600" />
        <h3 className="mt-4 text-lg font-bold text-gray-900">No reports available yet</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">When the diagnostic centre uploads a report for one of your bookings, it will appear here.</p>
      </div>
    </div>;
  }

  return <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div><h2 className="text-xl font-bold text-gray-900">My Reports</h2><p className="mt-1 text-sm text-gray-500">Reports published by the diagnostic centre for your bookings.</p></div>
      <span className="w-fit rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700">{reports.length} report{reports.length === 1 ? "" : "s"}</span>
    </div>
    <div className="mt-7 space-y-4">
      {reports.map((report) => <article key={report.reportId} className="rounded-2xl border border-gray-200 p-5 transition hover:border-blue-200 hover:shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><FileText size={21}/></div><div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Report ID</p><p className="mt-1 break-all text-lg font-bold text-blue-700">{report.reportId}</p><p className="mt-1 text-sm font-semibold text-gray-900">{report.items.map((item) => item.name).join(", ") || "Diagnostic report"}</p></div></div>
          <span className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${report.status === "READY" && report.fileUrl ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}><CheckCircle2 size={14}/>{report.status === "READY" && report.fileUrl ? "FINAL / READY" : report.status === "PROCESSING" ? "PROCESSING" : "AWAITING PDF"}</span>
        </div>
        <div className="mt-5 grid gap-3 border-t border-gray-100 pt-5 sm:grid-cols-2"><InfoItem icon={<CalendarDays size={16}/>} label="Report date" value={report.reportDate || "Not available"}/><InfoItem icon={<FileText size={16}/>} label="Booking ID" value={report.bookingId}/></div>
        <div className="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs text-gray-500">Patient</p><p className="mt-1 text-sm font-bold text-gray-900">{report.patientName}</p></div><div className="flex flex-wrap gap-2">{report.fileUrl ? <><a href={report.fileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"><ExternalLink size={16}/> View PDF</a><a href={getDiagnosticReportDownloadUrl(report.fileUrl)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700"><Download size={16}/> Download PDF</a></> : <span className="self-center text-sm text-gray-500">Your report PDF is not available yet.</span>}<Link to={`/patient/reports/${report.reportId}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">Details <ChevronRight size={16}/></Link></div></div>
      </article>)}
    </div>
  </div>;
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="rounded-xl bg-gray-50 p-3"><div className="flex items-center gap-2 text-blue-600">{icon}<span className="text-xs font-semibold text-gray-500">{label}</span></div><p className="mt-2 break-all text-sm font-bold text-gray-900">{value}</p></div>;
}
