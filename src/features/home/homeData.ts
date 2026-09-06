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

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
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

export const articles: Article[] = [
  {
    id: "1",
    title: "Why regular health checkups matter",
    excerpt:
      "Understand how preventive testing can help identify health risks early.",
    category: "Preventive Health",
    readTime: "5 min read",
  },
  {
    id: "2",
    title: "Understanding your blood test report",
    excerpt:
      "A simple guide to some of the most common values in a blood report.",
    category: "Diagnostics",
    readTime: "6 min read",
  },
  {
    id: "3",
    title: "How to prepare for a blood test",
    excerpt:
      "Learn when fasting is required and what you should do before testing.",
    category: "Patient Guide",
    readTime: "4 min read",
  },
];

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