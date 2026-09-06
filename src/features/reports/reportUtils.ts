import type {
  DiagnosticReport,
} from "./reportTypes";

import {
  getBookings,
} from "../booking/bookingUtils";

export const REPORTS_STORAGE_KEY =
  "diagnostic-platform-reports";

function generateReportId(): string {
  const timestamp = Date.now()
    .toString()
    .slice(-8);

  const random = Math.floor(
    1000 + Math.random() * 9000,
  );

  return `RPT-${timestamp}-${random}`;
}

function generateReportInternalId(): string {
  return `report_${Date.now()}_${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

/**
 * Get all saved reports.
 */
export function getReports(): DiagnosticReport[] {
  try {
    const stored = localStorage.getItem(
      REPORTS_STORAGE_KEY,
    );

    if (!stored) {
      return [];
    }

    const parsed: unknown =
      JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed as DiagnosticReport[];
  } catch {
    return [];
  }
}

/**
 * Save a report.
 */
export function saveReport(
  report: DiagnosticReport,
): void {
  const reports = getReports();

  const existingIndex = reports.findIndex(
    (item) =>
      item.reportId === report.reportId,
  );

  if (existingIndex >= 0) {
    reports[existingIndex] = report;
  } else {
    reports.push(report);
  }

  localStorage.setItem(
    REPORTS_STORAGE_KEY,
    JSON.stringify(reports),
  );
}

/**
 * Get a single report.
 */
export function getReport(
  reportId: string,
): DiagnosticReport | null {
  const reports = getReports();

  return (
    reports.find(
      (report) =>
        report.reportId === reportId,
    ) || null
  );
}

/**
 * Create a demo READY report from a booking.
 *
 * This is temporary mock functionality until
 * the backend/LIS report API is connected.
 */
export function createReportFromBooking(
  bookingId: string,
): DiagnosticReport | null {
  const booking = getBookings().find(
    (item) =>
      item.bookingId === bookingId,
  );

  if (!booking) {
    return null;
  }

  const existingReport = getReports().find(
    (report) =>
      report.bookingId === bookingId,
  );

  if (existingReport) {
    return existingReport;
  }

  const patientName =
    `${booking.patient.firstName} ${booking.patient.lastName}`.trim();

  const report: DiagnosticReport = {
    id: generateReportInternalId(),

    reportId: generateReportId(),

    bookingId: booking.bookingId,

    patientName,

    items: booking.items.map((item) => ({
      id: item.id,
      name: item.name,
      type: item.type,
    })),

    collectionDate:
      booking.schedule.collectionDate,

    reportDate: new Date()
      .toISOString()
      .slice(0, 10),

    status: "READY",

    fileName: `diagnostic-report-${booking.bookingId}.pdf`,

    createdAt:
      new Date().toISOString(),
  };

  saveReport(report);

  return report;
}