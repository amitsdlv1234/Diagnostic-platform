export interface AdminOffer {
  id: string;
  title: string;
  description: string;
  discount: number;
  active: boolean;
}

export interface AdminBanner {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  active: boolean;
}

export interface AdminHomeContent {
  heroTitle: string;
  heroSubtitle: string;
  primaryButtonText: string;
  secondaryButtonText: string;
}