import type { HealthContent } from "./healthContentTypes";
import { saveHealthContent } from "./healthContentUtils";

const initialHealthContents: HealthContent[] = [
  {
    id: "health-ultrasound-guide",
    title: "Understanding Ultrasound",
    slug: "understanding-ultrasound",
    shortDescription:
      "Learn about ultrasound scans, preparation and what to expect.",
    content:
      "Ultrasound is a commonly used diagnostic imaging procedure. Follow the preparation instructions provided for your examination.",
    imageUrl:
      "/images/health-guides/ultrasound.jpg",
    category: "Diagnostic Imaging",
    contentType: "HEALTH_GUIDE",
    relatedTestIds: [],
    relatedPackageIds: [],
    relatedCentreIds: [],
    placements: [
      "HOME",
      "TESTS",
    ],
    buttonText: "Learn More",
    buttonAction: "ARTICLE",
    isActive: true,
    sortOrder: 1,
    createdAt: new Date().toISOString(),
  },

  {
    id: "health-breast-ultrasound",
    title: "Breast Ultrasound Guide",
    slug: "breast-ultrasound-guide",
    shortDescription:
      "Important information about breast ultrasound examinations.",
    content:
      "Breast ultrasound uses sound waves to create images of breast tissue and may be recommended as part of diagnostic evaluation.",
    imageUrl:
      "/images/health-guides/breast-ultrasound.jpg",
    category: "Women's Health",
    contentType: "HEALTH_GUIDE",
    relatedTestIds: [],
    relatedPackageIds: [],
    relatedCentreIds: [],
    placements: [
      "HOME",
      "TESTS",
      "PATIENT",
    ],
    buttonText: "Read Guide",
    buttonAction: "ARTICLE",
    isActive: true,
    sortOrder: 2,
    createdAt: new Date().toISOString(),
  },

  {
    id: "health-pregnancy-guide",
    title: "Pregnancy Ultrasound Guide",
    slug: "pregnancy-ultrasound-guide",
    shortDescription:
      "Helpful information about pregnancy ultrasound examinations.",
    content:
      "Pregnancy ultrasound examinations provide diagnostic imaging during pregnancy. Follow the instructions provided by your diagnostic centre.",
    imageUrl:
      "/images/health-guides/pregnancy.jpg",
    category: "Pregnancy",
    contentType: "HEALTH_GUIDE",
    relatedTestIds: [],
    relatedPackageIds: [],
    relatedCentreIds: [],
    placements: [
      "HOME",
      "TESTS",
    ],
    buttonText: "Read Guide",
    buttonAction: "ARTICLE",
    isActive: true,
    sortOrder: 3,
    createdAt: new Date().toISOString(),
  },
];

export function seedHealthContents(): void {
  const existing =
    localStorage.getItem(
      "diagnostic-health-content",
    );

  if (existing) {
    return;
  }

  initialHealthContents.forEach(
    (content) => {
      saveHealthContent(content);
    },
  );
}