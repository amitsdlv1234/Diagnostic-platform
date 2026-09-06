import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  FileText,
} from "lucide-react";

import { Link } from "react-router-dom";

interface DiagnosticReport {
  id: string;
  reportId: string;
  bookingId: string;
  patientName: string;
  testName: string;
  reportDate: string;
  status: "FINAL";
  centreName: string;
  fileUrl?: string;
}

/*
 * Temporary report data.
 *
 * Later this will come from the backend/API.
 */
const reports: DiagnosticReport[] = [
  {
    id: "report-001",
    reportId: "RPT-20260906-001",
    bookingId: "DGP-84354222-5325",
    patientName: "Amit Kumar",
    testName: "Complete Blood Count (CBC)",
    reportDate: "2026-09-06",
    status: "FINAL",
    centreName: "Diagnostic Centre - Lucknow",
  },
];

export function Reports() {
  if (reports.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            My Reports
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Access your diagnostic reports securely.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
          <FileText
            size={35}
            className="mx-auto text-blue-600"
          />

          <h3 className="mt-4 text-lg font-bold text-gray-900">
            No reports available
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            Your completed diagnostic reports will appear
            here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          My Reports
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Access your diagnostic reports securely.
        </p>
      </div>

      {/* Reports */}
      <div className="mt-8 space-y-4">
        {reports.map((report) => (
          <ReportCard
            key={report.reportId}
            report={report}
          />
        ))}
      </div>
    </div>
  );
}

interface ReportCardProps {
  report: DiagnosticReport;
}

function ReportCard({
  report,
}: ReportCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* Top */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FileText size={21} />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Report ID
            </p>

            <p className="mt-1 text-lg font-bold text-blue-600">
              {report.reportId}
            </p>

            <p className="mt-1 text-sm font-semibold text-gray-900">
              {report.testName}
            </p>
          </div>
        </div>

        {/* Status */}
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
          <CheckCircle2 size={14} />
          {report.status}
        </span>
      </div>

      {/* Information */}
      <div className="mt-5 grid gap-3 border-t border-gray-100 pt-5 sm:grid-cols-3">
        <InfoItem
          icon={<CalendarDays size={17} />}
          label="Report Date"
          value={report.reportDate}
        />

        <InfoItem
          icon={<FileText size={17} />}
          label="Booking ID"
          value={report.bookingId}
        />

        <InfoItem
          icon={<FileText size={17} />}
          label="Centre"
          value={report.centreName}
        />
      </div>

      {/* Bottom */}
      <div className="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-gray-500">
            Patient
          </p>

          <p className="mt-1 text-sm font-bold text-gray-900">
            {report.patientName}
          </p>
        </div>

        <Link
          to={`/patient/reports/${report.reportId}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          View Report
          <ChevronRight size={17} />
        </Link>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <div className="flex items-center gap-2 text-blue-600">
        {icon}

        <span className="text-xs font-semibold text-gray-500">
          {label}
        </span>
      </div>

      <p className="mt-2 truncate text-sm font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}