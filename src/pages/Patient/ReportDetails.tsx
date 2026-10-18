import { ArrowLeft, CalendarDays, Download, ExternalLink, FileText } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../store/authStore";
import { getBookings } from "../../features/booking/bookingUtils";
import { getReport } from "../../features/reports/reportUtils";
import { getDiagnosticReportDownloadUrl } from "../../utils/cloudinaryUpload";

export function ReportDetails() {
  const { reportId = "" } = useParams<{ reportId: string }>();
  const { patient } = useAuth();
  const report = getReport(reportId);
  const booking = report ? getBookings().find((item) => item.bookingId === report.bookingId) : undefined;
  const samePatient = Boolean(booking && patient && (
    (patient.mobile && booking.patient.mobile && patient.mobile.replace(/\D/g, "") === booking.patient.mobile.replace(/\D/g, "")) ||
    (patient.email && booking.patient.email && patient.email.trim().toLowerCase() === booking.patient.email.trim().toLowerCase())
  ));

  if (!report || !booking || !samePatient) {
    return <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8"><div className="py-16 text-center"><FileText size={42} className="mx-auto text-blue-600"/><h2 className="mt-5 text-2xl font-bold text-gray-900">Report not found</h2><p className="mt-2 text-sm text-gray-500">This report may not be available yet, or it is not linked to your account.</p><Link to="/patient/reports" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"><ArrowLeft size={17}/>Back to My Reports</Link></div></div>;
  }

  const ready = report.status === "READY" && Boolean(report.fileUrl);
  return <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"><div><Link to="/patient/reports" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600"><ArrowLeft size={17}/>Back to My Reports</Link><p className="mt-6 text-xs font-semibold uppercase tracking-wider text-gray-500">Report ID</p><h2 className="mt-1 break-all text-2xl font-bold text-blue-700">{report.reportId}</h2></div><span className={`inline-flex w-fit items-center rounded-full px-3 py-1.5 text-xs font-bold ${ready ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>{ready ? "FINAL" : report.status}</span></div>
    <section className="mt-8 rounded-2xl border border-gray-200 p-5"><h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">Report information</h3><div className="mt-5 grid gap-5 sm:grid-cols-2"><Detail label="Patient" value={report.patientName}/><Detail label="Tests / packages" value={report.items.map((item) => item.name).join(", ") || "Diagnostic report"}/><Detail label="Booking ID" value={report.bookingId}/><Detail label="Diagnostic centre" value={booking.centreName || booking.centreId || "Nidan Diagnostic Centre"}/></div></section>
    <section className="mt-5 grid gap-4 sm:grid-cols-2"><InfoCard icon={<CalendarDays size={19}/>} label="Report date" value={report.reportDate || "Not available"}/><InfoCard icon={<FileText size={19}/>} label="Report status" value={ready ? "Finalized" : report.status === "PROCESSING" ? "Processing" : "Awaiting report PDF"}/></section>
    <section className="mt-5 rounded-2xl border border-gray-200 p-5"><h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">Diagnostic report PDF</h3><div className="mt-5 rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center"><FileText size={42} className="mx-auto text-blue-600"/><h4 className="mt-4 text-lg font-bold text-gray-900">{report.fileName || "Diagnostic report"}</h4><p className="mt-2 text-sm text-gray-500">{ready ? "Your diagnostic report is available." : "The diagnostic centre has not uploaded the final PDF yet."}</p>{ready && report.fileUrl && <div className="mt-6 flex flex-wrap justify-center gap-3"><a href={report.fileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-100"><ExternalLink size={17}/>View PDF</a><a href={getDiagnosticReportDownloadUrl(report.fileUrl)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"><Download size={17}/>Download report</a></div>}</div></section>
    <div className="mt-6"><Link to="/patient/reports" className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50"><ArrowLeft size={17}/>Back to My Reports</Link></div>
  </div>;
}

function Detail({ label, value }: { label: string; value: string }) { return <div><p className="text-xs text-gray-500">{label}</p><p className="mt-1 break-words text-sm font-bold text-gray-900">{value}</p></div>; }
function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) { return <div className="rounded-2xl bg-gray-50 p-4"><div className="flex items-center gap-2 text-blue-600">{icon}<span className="text-xs font-semibold text-gray-500">{label}</span></div><p className="mt-2 text-sm font-bold text-gray-900">{value}</p></div>; }
