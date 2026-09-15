import {
  diagnosticTests,
  type DiagnosticTest,
} from "../tests/testData";

/* =========================================================
   HOME CONTENT
   ========================================================= */

export interface HeroSlide {
  id: string;
  enabled: boolean;

  image: string;

  badge: string;

  title: string;

  highlight: string;

  description: string;

  primaryButtonText: string;

  primaryButtonLink: string;

  secondaryButtonText: string;

  secondaryButtonLink: string;
}

export interface HomeContent {
  heroTitle: string;

  heroHighlight: string;

  heroDescription: string;

  primaryButtonText: string;

  primaryButtonLink: string;

  secondaryButtonText: string;

  secondaryButtonLink: string;

  heroSlides: HeroSlide[];
}

export const HOME_CONTENT_KEY =
  "diagnostic_home_content";

export const HOME_CONTENT_UPDATED_EVENT =
  "home-content-updated";

/* =========================================================
   DEFAULT HOME CONTENT
   ========================================================= */

export const defaultHomeContent: HomeContent = {
  heroTitle:
    "Better health starts with the right",

  heroHighlight:
    "diagnosis.",

  heroDescription:
    "Book diagnostic tests and health packages online with convenient home sample collection and digital reports.",

  primaryButtonText:
    "Book a Test",

  primaryButtonLink:
    "/booking",

  secondaryButtonText:
    "Explore Packages",

  secondaryButtonLink:
    "/packages",

  heroSlides: [
    {
      id: "hero-1",

      enabled: true,

      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=85",

      badge:
        "Trusted diagnostic testing",

      title:
        "Better health starts with the right",

      highlight:
        "diagnosis.",

      description:
        "Book diagnostic tests and health packages online with convenient home sample collection and digital reports.",

      primaryButtonText:
        "Book a Test",

      primaryButtonLink:
        "/booking",

      secondaryButtonText:
        "Explore Packages",

      secondaryButtonLink:
        "/packages",
    },

    {
      id: "hero-2",

      enabled: true,

      image:
        "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1600&q=85",

      badge:
        "Advanced diagnostic care",

      title:
        "Accurate testing for",

      highlight:
        "better health.",

      description:
        "Get reliable diagnostic tests from trusted centres with convenient sample collection and digital reports.",

      primaryButtonText:
        "Find a Test",

      primaryButtonLink:
        "/tests",

      secondaryButtonText:
        "Find a Centre",

      secondaryButtonLink:
        "/centres",
    },

    {
      id: "hero-3",

      enabled: true,

      image:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=85",

      badge:
        "Health packages",

      title:
        "Take control of your",

      highlight:
        "health today.",

      description:
        "Choose personalized health packages designed around your age, lifestyle and wellness needs.",

      primaryButtonText:
        "Explore Packages",

      primaryButtonLink:
        "/packages",

      secondaryButtonText:
        "Book a Test",

      secondaryButtonLink:
        "/booking",
    },
  ],
};

/* =========================================================
   HOME CONTENT HELPERS
   ========================================================= */

export function getHomeContent(): HomeContent {
  try {
    const stored =
      localStorage.getItem(
        HOME_CONTENT_KEY,
      );

    if (!stored) {
      return {
        ...defaultHomeContent,

        heroSlides: [
          ...defaultHomeContent.heroSlides,
        ],
      };
    }

    const parsed: unknown =
      JSON.parse(stored);

    if (
      !parsed ||
      typeof parsed !== "object"
    ) {
      return {
        ...defaultHomeContent,

        heroSlides: [
          ...defaultHomeContent.heroSlides,
        ],
      };
    }

    const value =
      parsed as Partial<HomeContent>;

    return {
      ...defaultHomeContent,

      ...value,

      heroSlides:
        Array.isArray(value.heroSlides)
          ? value.heroSlides
          : [
              ...defaultHomeContent.heroSlides,
            ],
    };
  } catch {
    return {
      ...defaultHomeContent,

      heroSlides: [
        ...defaultHomeContent.heroSlides,
      ],
    };
  }
}

export function saveHomeContent(
  content: HomeContent,
): void {
  localStorage.setItem(
    HOME_CONTENT_KEY,
    JSON.stringify(content),
  );

  window.dispatchEvent(
    new Event(
      HOME_CONTENT_UPDATED_EVENT,
    ),
  );
}

export function resetHomeContent(): void {
  localStorage.setItem(
    HOME_CONTENT_KEY,
    JSON.stringify({
      ...defaultHomeContent,

      heroSlides: [
        ...defaultHomeContent.heroSlides,
      ],
    }),
  );

  window.dispatchEvent(
    new Event(
      HOME_CONTENT_UPDATED_EVENT,
    ),
  );
}

/* =========================================================
   POPULAR TESTS CONFIGURATION
   ========================================================= */

export interface PopularTestsContent {
  enabled: boolean;

  badge: string;

  title: string;

  description: string;

  /**
   * IDs selected by Admin.
   *
   * IMPORTANT:
   * The order of these IDs is the order in which
   * tests are displayed on the Home page.
   */
  testIds: string[];

  viewAllText: string;

  viewAllLink: string;
}

export const POPULAR_TESTS_CONTENT_KEY =
  "diagnostic_popular_tests_content";

export const POPULAR_TESTS_UPDATED_EVENT =
  "popular-tests-updated";

/* =========================================================
   DEFAULT POPULAR TESTS
   ========================================================= */

export const defaultPopularTestsContent: PopularTestsContent = {
  enabled: true,

  badge:
    "Popular Tests",

  title:
    "Popular Diagnostic Tests",

  description:
    "Book commonly recommended diagnostic tests with convenient home sample collection.",

  /*
   * Default 4 tests.
   *
   * Admin can change this to 6, 8, 10 or 12.
   */
  testIds: [
    "cbc",
    "hba1c",
    "thyroid-profile",
    "vitamin-d",
  ],

  viewAllText:
    "View All Tests",

  viewAllLink:
    "/tests",
};

/* =========================================================
   NORMALIZE POPULAR TESTS
   ========================================================= */

function normalizePopularTestsContent(
  value:
    | Partial<PopularTestsContent>
    | null
    | undefined,
): PopularTestsContent {
  const rawIds =
    Array.isArray(value?.testIds)
      ? value.testIds
      : defaultPopularTestsContent.testIds;

  /*
   * Keep only valid string IDs.
   */
  const validIds =
    rawIds.filter(
      (
        id,
      ): id is string =>
        typeof id === "string" &&
        id.trim().length > 0,
    );

  /*
   * Remove duplicates while preserving
   * Admin's selected order.
   */
  const uniqueIds = Array.from(
    new Set(validIds),
  );

  return {
    ...defaultPopularTestsContent,

    ...(value ?? {}),

    enabled:
      typeof value?.enabled ===
      "boolean"
        ? value.enabled
        : defaultPopularTestsContent.enabled,

    badge:
      typeof value?.badge ===
      "string"
        ? value.badge
        : defaultPopularTestsContent.badge,

    title:
      typeof value?.title ===
      "string"
        ? value.title
        : defaultPopularTestsContent.title,

    description:
      typeof value?.description ===
      "string"
        ? value.description
        : defaultPopularTestsContent.description,

    testIds:
      uniqueIds,

    viewAllText:
      typeof value?.viewAllText ===
      "string"
        ? value.viewAllText
        : defaultPopularTestsContent.viewAllText,

    viewAllLink:
      typeof value?.viewAllLink ===
      "string"
        ? value.viewAllLink
        : defaultPopularTestsContent.viewAllLink,
  };
}

/* =========================================================
   GET POPULAR TESTS CONTENT
   ========================================================= */

export function getPopularTestsContent(): PopularTestsContent {
  try {
    const stored =
      localStorage.getItem(
        POPULAR_TESTS_CONTENT_KEY,
      );

    if (!stored) {
      return {
        ...defaultPopularTestsContent,

        testIds: [
          ...defaultPopularTestsContent.testIds,
        ],
      };
    }

    const parsed: unknown =
      JSON.parse(stored);

    if (
      !parsed ||
      typeof parsed !== "object"
    ) {
      return {
        ...defaultPopularTestsContent,

        testIds: [
          ...defaultPopularTestsContent.testIds,
        ],
      };
    }

    return normalizePopularTestsContent(
      parsed as Partial<PopularTestsContent>,
    );
  } catch {
    return {
      ...defaultPopularTestsContent,

      testIds: [
        ...defaultPopularTestsContent.testIds,
      ],
    };
  }
}

/* =========================================================
   SAVE POPULAR TESTS CONTENT
   ========================================================= */

export function savePopularTestsContent(
  content: PopularTestsContent,
): void {
  const normalized =
    normalizePopularTestsContent(
      content,
    );

  localStorage.setItem(
    POPULAR_TESTS_CONTENT_KEY,
    JSON.stringify(normalized),
  );

  /*
   * Same-tab update.
   */
  window.dispatchEvent(
    new Event(
      POPULAR_TESTS_UPDATED_EVENT,
    ),
  );
}

/* =========================================================
   RESET POPULAR TESTS
   ========================================================= */

export function resetPopularTestsContent(): void {
  const defaults: PopularTestsContent = {
    ...defaultPopularTestsContent,

    testIds: [
      ...defaultPopularTestsContent.testIds,
    ],
  };

  localStorage.setItem(
    POPULAR_TESTS_CONTENT_KEY,
    JSON.stringify(defaults),
  );

  window.dispatchEvent(
    new Event(
      POPULAR_TESTS_UPDATED_EVENT,
    ),
  );
}

/* =========================================================
   GET CONFIGURED POPULAR TESTS
   ========================================================= */

export function getConfiguredPopularTests(): DiagnosticTest[] {
  const content =
    getPopularTestsContent();

  /*
   * IMPORTANT:
   *
   * Do NOT use:
   *
   * diagnosticTests.filter(
   *   test => test.popular
   * )
   *
   * Admin configuration is the source of truth.
   */
  return content.testIds
    .map(
      (testId: string) =>
        diagnosticTests.find(
          (
            test: DiagnosticTest,
          ) =>
            test.id === testId,
        ),
    )
    .filter(
      (
        test:
          | DiagnosticTest
          | undefined,
      ): test is DiagnosticTest =>
        Boolean(test),
    );
}

/* =========================================================
   GET POPULAR TESTS DATA
   ========================================================= */

export function getPopularTestsData(): {
  content: PopularTestsContent;

  tests: DiagnosticTest[];
} {
  const content =
    getPopularTestsContent();

  const tests =
    content.testIds
      .map(
        (testId: string) =>
          diagnosticTests.find(
            (
              test: DiagnosticTest,
            ) =>
              test.id === testId,
          ),
      )
      .filter(
        (
          test:
            | DiagnosticTest
            | undefined,
        ): test is DiagnosticTest =>
          Boolean(test),
      );

  return {
    content,

    tests,
  };
}

/* =========================================================
   PACKAGES SECTION CONFIGURATION
   ========================================================= */

export interface HomePackageItem {
  id: string;
  enabled: boolean;
}

export interface PackagesContent {
  enabled: boolean;

  badge: string;
  title: string;
  description: string;

  packageIds: string[];

  viewAllText: string;
  viewAllLink: string;
}

export const PACKAGES_CONTENT_KEY =
  "diagnostic_packages_content";

export const PACKAGES_UPDATED_EVENT =
  "packages-content-updated";

export const defaultPackagesContent: PackagesContent = {
  enabled: true,

  badge: "Packages",

  title: "Personalized Health Checkup",

  description:
    "Choose a health package designed around your age, lifestyle and wellness needs.",

  packageIds: [
    "men-under-30",
    "men-30-45",
    "men-45-60",
    "men-above-60",

    "women-under-30",
    "women-30-45",
    "women-45-60",
    "women-above-60",

    "diabetes",
    "heart",
    "thyroid",
    "vitamin",
  ],

  viewAllText: "View All Packages",

  viewAllLink: "/packages",
};

/* =========================================================
   GET PACKAGES CONTENT
   ========================================================= */

export function getPackagesContent(): PackagesContent {
  try {
    const stored = localStorage.getItem(
      PACKAGES_CONTENT_KEY,
    );

    if (!stored) {
      return {
        ...defaultPackagesContent,
        packageIds: [
          ...defaultPackagesContent.packageIds,
        ],
      };
    }

    const parsed: unknown = JSON.parse(stored);

    if (
      !parsed ||
      typeof parsed !== "object"
    ) {
      return {
        ...defaultPackagesContent,
        packageIds: [
          ...defaultPackagesContent.packageIds,
        ],
      };
    }

    const value =
      parsed as Partial<PackagesContent>;

    const packageIds =
      Array.isArray(value.packageIds)
        ? value.packageIds.filter(
            (id): id is string =>
              typeof id === "string" &&
              id.trim().length > 0,
          )
        : [
            ...defaultPackagesContent.packageIds,
          ];

    return {
      ...defaultPackagesContent,

      ...value,

      enabled:
        typeof value.enabled === "boolean"
          ? value.enabled
          : defaultPackagesContent.enabled,

      badge:
        typeof value.badge === "string"
          ? value.badge
          : defaultPackagesContent.badge,

      title:
        typeof value.title === "string"
          ? value.title
          : defaultPackagesContent.title,

      description:
        typeof value.description === "string"
          ? value.description
          : defaultPackagesContent.description,

      packageIds: Array.from(
        new Set(packageIds),
      ),

      viewAllText:
        typeof value.viewAllText === "string"
          ? value.viewAllText
          : defaultPackagesContent.viewAllText,

      viewAllLink:
        typeof value.viewAllLink === "string"
          ? value.viewAllLink
          : defaultPackagesContent.viewAllLink,
    };
  } catch {
    return {
      ...defaultPackagesContent,
      packageIds: [
        ...defaultPackagesContent.packageIds,
      ],
    };
  }
}

/* =========================================================
   SAVE PACKAGES CONTENT
   ========================================================= */

export function savePackagesContent(
  content: PackagesContent,
): void {
  localStorage.setItem(
    PACKAGES_CONTENT_KEY,
    JSON.stringify(content),
  );

  window.dispatchEvent(
    new Event(
      PACKAGES_UPDATED_EVENT,
    ),
  );
}

/* =========================================================
   RESET PACKAGES CONTENT
   ========================================================= */

export function resetPackagesContent(): void {
  const defaults: PackagesContent = {
    ...defaultPackagesContent,

    packageIds: [
      ...defaultPackagesContent.packageIds,
    ],
  };

  localStorage.setItem(
    PACKAGES_CONTENT_KEY,
    JSON.stringify(defaults),
  );

  window.dispatchEvent(
    new Event(
      PACKAGES_UPDATED_EVENT,
    ),
  );
}