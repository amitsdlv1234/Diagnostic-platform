export type ReportStatus =
  | "PROCESSING"
  | "READY";

export interface DiagnosticReportItem {
  id: string;
  name: string;
  type: "TEST" | "PACKAGE";
}

export interface DiagnosticReport {
  id: string;
  reportId: string;

  bookingId: string;

  patientName: string;

  items: DiagnosticReportItem[];

  collectionDate: string;

  reportDate: string;

  status: ReportStatus;

  fileName?: string;

  createdAt: string;
}