import {
  diagnosticTests,
} from "../tests/testData";

export interface PopularTestsConfig {
  enabled: boolean;

  badge: string;
  title: string;
  description: string;

  /*
   * Admin stores only test IDs.
   *
   * Example:
   * ["cbc", "hba1c", "thyroid", "vitamin-d"]
   *
   * Home page converts these IDs into
   * actual diagnostic test objects.
   */
  testIds: string[];

  viewAllText: string;
  viewAllLink: string;
}

export const POPULAR_TESTS_CONFIG_KEY =
  "diagnostic_popular_tests_config";

/* =========================================================
   DEFAULT CONFIGURATION
   ========================================================= */

export const defaultPopularTestsConfig: PopularTestsConfig = {
  enabled: true,

  badge: "Popular Tests",

  title: "Popular Diagnostic Tests",

  description:
    "Book commonly recommended diagnostic tests with convenient home sample collection.",

  /*
   * These are the default tests shown on Home page.
   *
   * You can change these from:
   *
   * Admin → Home Page → Popular Tests
   */
  testIds: [
    "cbc",
    "hba1c",
    "thyroid",
    "vitamin-d",
  ],

  viewAllText: "View All Tests",

  viewAllLink: "/tests",
};

/* =========================================================
   GET CONFIGURATION
   ========================================================= */

export function getPopularTestsConfig(): PopularTestsConfig {
  try {
    const stored = localStorage.getItem(
      POPULAR_TESTS_CONFIG_KEY,
    );

    /*
     * Nothing saved yet.
     * Use defaults.
     */
    if (!stored) {
      return {
        ...defaultPopularTestsConfig,
        testIds: [
          ...defaultPopularTestsConfig.testIds,
        ],
      };
    }

    const parsed: Partial<PopularTestsConfig> =
      JSON.parse(stored);

    /*
     * Make sure testIds is actually an array
     * containing strings.
     */
    const testIds =
      Array.isArray(parsed.testIds)
        ? parsed.testIds.filter(
            (id): id is string =>
              typeof id === "string",
          )
        : [
            ...defaultPopularTestsConfig.testIds,
          ];

    return {
      ...defaultPopularTestsConfig,
      ...parsed,

      testIds,
    };
  } catch {
    /*
     * Invalid localStorage data.
     * Fall back to defaults.
     */
    return {
      ...defaultPopularTestsConfig,
      testIds: [
        ...defaultPopularTestsConfig.testIds,
      ],
    };
  }
}

/* =========================================================
   SAVE CONFIGURATION
   ========================================================= */

export function savePopularTestsConfig(
  config: PopularTestsConfig,
) {
  localStorage.setItem(
    POPULAR_TESTS_CONFIG_KEY,
    JSON.stringify(config),
  );

  /*
   * IMPORTANT:
   *
   * This allows the Home page to immediately
   * refresh when Admin saves the configuration
   * in the SAME browser tab.
   */
  window.dispatchEvent(
    new Event("popular-tests-updated"),
  );
}

/* =========================================================
   GET CONFIGURED TEST OBJECTS
   ========================================================= */

/*
 * Admin stores only IDs.
 *
 * Example:
 *
 * testIds:
 * [
 *   "cbc",
 *   "hba1c",
 *   "thyroid"
 * ]
 *
 * This function converts them into actual
 * diagnostic test objects.
 *
 * The order selected by Admin is preserved.
 */

export function getConfiguredPopularTests() {
  const config =
    getPopularTestsConfig();

  return config.testIds
    .map((id) =>
      diagnosticTests.find(
        (test) => test.id === id,
      ),
    )
    .filter(
      (
        test,
      ): test is (typeof diagnosticTests)[number] =>
        Boolean(test),
    );
}