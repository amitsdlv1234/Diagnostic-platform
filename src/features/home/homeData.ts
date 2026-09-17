export interface DiagnosticTest {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  mrp: number;
  reportTime: string;
  sampleType: string;
  homeCollection: boolean;
}

export interface HealthPackage {
  id: string;
  name: string;
  description: string;
  testsCount: number;
  price: number;
  mrp: number;
  popular?: boolean;
  homeCollection: boolean;
}

export interface DiagnosticCentre {
  id: string;
  name: string;
  address: string;
  city: string;
  distance: string;
  timing: string;
}

/*
 * ============================================================
 * HEALTH ARTICLE
 * ============================================================
 */

export type ArticleStatus =
  | "ACTIVE"
  | "DRAFT"
  | "DISABLED";

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  status: ArticleStatus;
}

export const popularTests: DiagnosticTest[] = [
  {
    id: "cbc",
    name: "Complete Blood Count (CBC)",
    category: "Haematology",
    description:
      "A comprehensive blood test used to evaluate overall health.",
    price: 399,
    mrp: 550,
    reportTime: "24 Hours",
    sampleType: "Blood",
    homeCollection: true,
  },

  {
    id: "thyroid",
    name: "Thyroid Profile",
    category: "Hormones",
    description:
      "Measures thyroid hormones to assess thyroid function.",
    price: 599,
    mrp: 800,
    reportTime: "24 Hours",
    sampleType: "Blood",
    homeCollection: true,
  },

  {
    id: "hba1c",
    name: "HbA1c",
    category: "Diabetes",
    description:
      "Helps monitor average blood sugar levels over time.",
    price: 399,
    mrp: 500,
    reportTime: "24 Hours",
    sampleType: "Blood",
    homeCollection: true,
  },

  {
    id: "vitamin-d",
    name: "Vitamin D",
    category: "Vitamins",
    description:
      "Measures vitamin D levels in your blood.",
    price: 799,
    mrp: 1100,
    reportTime: "48 Hours",
    sampleType: "Blood",
    homeCollection: true,
  },
];

export const healthPackages: HealthPackage[] = [
  {
    id: "basic-health",
    name: "Basic Health Checkup",
    description:
      "Essential tests for a quick overview of your health.",
    testsCount: 35,
    price: 999,
    mrp: 1500,
    homeCollection: true,
  },

  {
    id: "full-body",
    name: "Full Body Health Checkup",
    description:
      "Comprehensive health screening for preventive care.",
    testsCount: 75,
    price: 1499,
    mrp: 2500,
    popular: true,
    homeCollection: true,
  },

  {
    id: "senior-care",
    name: "Senior Citizen Health Package",
    description:
      "A curated package for routine senior health screening.",
    testsCount: 60,
    price: 1799,
    mrp: 2800,
    homeCollection: true,
  },
];

export const diagnosticCentres: DiagnosticCentre[] = [
  {
    id: "centre-1",
    name: "Diagnostic Platform - Gomti Nagar",
    address: "Vibhuti Khand, Gomti Nagar",
    city: "Lucknow",
    distance: "2.4 km",
    timing: "7:00 AM - 8:00 PM",
  },

  {
    id: "centre-2",
    name: "Diagnostic Platform - Aliganj",
    address: "Sector K, Aliganj",
    city: "Lucknow",
    distance: "4.1 km",
    timing: "7:00 AM - 8:00 PM",
  },

  {
    id: "centre-3",
    name: "Diagnostic Platform - Hazratganj",
    address: "Mahatma Gandhi Marg",
    city: "Lucknow",
    distance: "5.6 km",
    timing: "7:00 AM - 9:00 PM",
  },
];

/*
 * ============================================================
 * HEALTH ARTICLES
 * ============================================================
 */

export const articles: Article[] = [
  {
    id: "1",
    slug: "ultrasound-myths-vs-facts",
    title: "Ultrasound: Myths vs Facts",
    excerpt:
      "Learn the facts about ultrasound, including how it uses sound waves, why it does not use radiation, and its common diagnostic applications.",
    category: "Ultrasound",
    readTime: "5 min read",
    image: "/images/articles/ultrasound-myths-facts.jpeg",
    status: "ACTIVE",
  },

  {
    id: "2",
    slug: "what-is-elastography",
    title: "What is Elastography?",
    excerpt:
      "Understand how elastography uses ultrasound technology to assess tissue stiffness and support the evaluation of suspicious lumps and conditions.",
    category: "Diagnostics",
    readTime: "5 min read",
    image: "/images/articles/elastography.jpeg",
    status: "ACTIVE",
  },

  {
    id: "3",
    slug: "neurosonogram-newborn-brain",
    title: "Neurosonogram: Ultrasound of a Newborn's Brain",
    excerpt:
      "Learn how neurosonography provides a safe, painless ultrasound examination of a newborn baby's brain, particularly in premature babies.",
    category: "Neonatal Imaging",
    readTime: "6 min read",
    image: "/images/articles/neurosonogram.jpeg",
    status: "ACTIVE",
  },

  {
    id: "4",
    slug: "pregnancy-guide-important-ultrasound-scans",
    title: "Pregnancy Guide: Important Ultrasound Scans",
    excerpt:
      "A practical pregnancy guide covering important stages, routine antenatal scans, early dating scans, anomaly scans, growth scans and Doppler assessment.",
    category: "Pregnancy Care",
    readTime: "7 min read",
    image: "/images/articles/pregnancy-guide.jpeg",
    status: "ACTIVE",
  },

  {
    id: "5",
    slug: "transvaginal-ultrasound-what-you-should-know",
    title: "Transvaginal Ultrasound: What You Should Know",
    excerpt:
      "Understand what a transvaginal ultrasound is, why doctors recommend it, how the examination is performed, and what patients can expect.",
    category: "Women's Health",
    readTime: "6 min read",
    image: "/images/articles/transvaginal-ultrasound.jpeg",
    status: "ACTIVE",
  },

  {
    id: "6",
    slug: "specialized-pregnancy-womens-imaging-services",
    title: "Specialized Pregnancy & Women's Imaging Services",
    excerpt:
      "Explore specialized ultrasound services including routine antenatal scans, early dating scans, NT-NB scans, TIFFA, anomaly scans, growth scans and Doppler studies.",
    category: "Women's Imaging",
    readTime: "5 min read",
    image: "/images/articles/our-services.jpeg",
    status: "ACTIVE",
  },
];

/*
 * ============================================================
 * FAQ
 * ============================================================
 */

export const faqs = [
  {
    question: "Can I book a diagnostic test from home?",

    answer:
      "Yes. You can select home sample collection during booking and choose an available date and time slot.",
  },

  {
    question: "How will I receive my report?",

    answer:
      "Once your report is finalized, you can access it through your account and download the digital report.",
  },

  {
    question: "Can I book tests for my family members?",

    answer:
      "Yes. The patient portal will allow you to maintain profiles for family members and book tests for them.",
  },

  {
    question: "Do all tests require fasting?",

    answer:
      "No. Fasting requirements depend on the specific test or package. The test details page will clearly indicate preparation requirements.",
  },
];