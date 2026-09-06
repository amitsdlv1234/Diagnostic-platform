import {
  ArrowLeft,
  CalendarDays,
  Download,
  FileText,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";

export interface DiagnosticReport {
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

const demoReports: DiagnosticReport[] = [
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

export function ReportDetails() {
  const { reportId } = useParams<{
    reportId: string;
  }>();

  const report = demoReports.find(
    (item) => item.reportId === reportId,
  );

  if (!report) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <div className="py-16 text-center">
          <FileText
            size={42}
            className="mx-auto text-blue-600"
          />

          <h2 className="mt-5 text-2xl font-bold text-gray-900">
            Report not found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            We could not find the requested diagnostic report.
          </p>

          <Link
            to="/patient/reports"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            <ArrowLeft size={17} />
            Back to My Reports
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            to="/patient/reports"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back to My Reports
          </Link>

          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Report ID
          </p>

          <h2 className="mt-1 text-2xl font-bold text-blue-600">
            {report.reportId}
          </h2>
        </div>

        <span className="inline-flex w-fit items-center rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
          FINAL
        </span>
      </div>

      {/* Report Information */}
      <section className="mt-8 rounded-2xl border border-gray-200 p-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
          Report Information
        </h3>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Detail
            label="Patient"
            value={report.patientName}
          />

          <Detail
            label="Test"
            value={report.testName}
          />

          <Detail
            label="Booking ID"
            value={report.bookingId}
          />

          <Detail
            label="Diagnostic Centre"
            value={report.centreName}
          />
        </div>
      </section>

      {/* Report Date */}
      <section className="mt-5 grid gap-4 sm:grid-cols-2">
        <InfoCard
          icon={<CalendarDays size={19} />}
          label="Report Date"
          value={report.reportDate}
        />

        <InfoCard
          icon={<FileText size={19} />}
          label="Report Status"
          value="Finalized"
        />
      </section>

      {/* Report Preview */}
      <section className="mt-5 rounded-2xl border border-gray-200 p-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
          Diagnostic Report
        </h3>

        <div className="mt-5 rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
          <FileText
            size={42}
            className="mx-auto text-blue-600"
          />

          <h4 className="mt-4 text-lg font-bold text-gray-900">
            {report.testName}
          </h4>

          <p className="mt-2 text-sm text-gray-500">
            Your finalized diagnostic report is ready.
          </p>

          <button
            type="button"
            onClick={() => {
              if (report.fileUrl) {
                window.open(
                  report.fileUrl,
                  "_blank",
                  "noopener,noreferrer",
                );
              } else {
                alert(
                  "Report PDF is not available yet.",
                );
              }
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            <Download size={17} />
            Download Report
          </button>
        </div>
      </section>

      {/* Bottom */}
      <div className="mt-6">
        <Link
          to="/patient/reports"
          className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
        >
          <ArrowLeft size={17} />
          Back to My Reports
        </Link>
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-gray-50 p-4">
      <div className="flex items-center gap-2 text-blue-600">
        {icon}

        <span className="text-xs font-semibold text-gray-500">
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}