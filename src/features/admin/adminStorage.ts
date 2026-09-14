import type {
  AdminBanner,
  AdminHomeContent,
  AdminOffer,
} from "./adminTypes";

const HOME_CONTENT_KEY =
  "diagnostic-admin-home-content";

const BANNERS_KEY =
  "diagnostic-admin-banners";

const OFFERS_KEY =
  "diagnostic-admin-offers";

const defaultHomeContent: AdminHomeContent = {
  heroTitle:
    "Quality Diagnostic Tests, Made Simple",

  heroSubtitle:
    "Book diagnostic tests and health packages from trusted diagnostic centres.",

  primaryButtonText:
    "Book a Test",

  secondaryButtonText:
    "Explore Packages",
};

const defaultBanners: AdminBanner[] = [
  {
    id: "banner-1",
    title: "Complete Health Checkup",
    subtitle:
      "Book your complete health checkup today.",
    buttonText: "View Packages",
    buttonLink: "/packages",
    active: true,
  },
];

const defaultOffers: AdminOffer[] = [
  {
    id: "offer-1",
    title: "Health Checkup Offer",
    description:
      "Get special discounts on selected health packages.",
    discount: 20,
    active: true,
  },
];

export function getAdminHomeContent(): AdminHomeContent {
  try {
    const stored =
      localStorage.getItem(HOME_CONTENT_KEY);

    if (!stored) {
      return defaultHomeContent;
    }

    return JSON.parse(stored);
  } catch {
    return defaultHomeContent;
  }
}

export function saveAdminHomeContent(
  content: AdminHomeContent,
): void {
  localStorage.setItem(
    HOME_CONTENT_KEY,
    JSON.stringify(content),
  );
}

export function getAdminBanners(): AdminBanner[] {
  try {
    const stored =
      localStorage.getItem(BANNERS_KEY);

    if (!stored) {
      return defaultBanners;
    }

    return JSON.parse(stored);
  } catch {
    return defaultBanners;
  }
}

export function saveAdminBanners(
  banners: AdminBanner[],
): void {
  localStorage.setItem(
    BANNERS_KEY,
    JSON.stringify(banners),
  );
}

export function getAdminOffers(): AdminOffer[] {
  try {
    const stored =
      localStorage.getItem(OFFERS_KEY);

    if (!stored) {
      return defaultOffers;
    }

    return JSON.parse(stored);
  } catch {
    return defaultOffers;
  }
}

export function saveAdminOffers(
  offers: AdminOffer[],
): void {
  localStorage.setItem(
    OFFERS_KEY,
    JSON.stringify(offers),
  );
}