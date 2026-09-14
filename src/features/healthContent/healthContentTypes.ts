export type HealthContentType =
  | "ARTICLE"
  | "AWARENESS"
  | "HEALTH_GUIDE"
  | "PROMOTION"
  | "TEST_PREPARATION"
  | "ANNOUNCEMENT"
  | "BANNER";

export type HealthContentPlacement =
  | "HOME"
  | "TESTS"
  | "PACKAGES"
  | "CENTRES"
  | "PATIENT";

export type HealthContentAction =
  | "NONE"
  | "TEST"
  | "PACKAGE"
  | "CENTRE"
  | "ARTICLE";

export interface HealthContent {
  id: string;

  title: string;

  slug: string;

  shortDescription: string;

  content: string;

  imageUrl?: string;

  category: string;

  contentType: HealthContentType;

  relatedTestIds: string[];

  relatedPackageIds: string[];

  relatedCentreIds: string[];

  placements: HealthContentPlacement[];

  buttonText?: string;

  buttonAction?: HealthContentAction;

  isActive: boolean;

  sortOrder: number;

  createdAt: string;

  updatedAt?: string;
}