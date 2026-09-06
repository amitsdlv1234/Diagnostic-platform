export interface HealthPackage {
  id: string;
  name: string;
  slug: string;
  category: string;

  description: string;
  shortDescription: string;

  price: number;
  mrp: number;

  reportTime: string;

  sampleType: string;

  fastingRequired: boolean;
  fastingInstructions?: string;

  homeCollection: boolean;

  testsIncluded: string[];

  parametersIncluded: string[];

  preparation: string[];

  popular?: boolean;
  recommended?: boolean;
}

export const packageCategories = [
  "All",
  "Full Body",
  "Diabetes",
  "Heart Health",
  "Women Health",
  "Men Health",
  "Senior Citizen",
  "Thyroid",
  "Vitamin",
  "Liver",
  "Kidney",
] as const;

export const healthPackages: HealthPackage[] = [
  {
    id: "basic-full-body",
    name: "Basic Full Body Checkup",
    slug: "basic-full-body-checkup",
    category: "Full Body",

    description:
      "A basic health screening package designed to provide an overview of important health parameters including blood count, blood sugar, liver and kidney markers.",
    
    shortDescription:
      "Essential health screening covering major health parameters.",

    price: 999,
    mrp: 1500,

    reportTime: "24-48 Hours",

    sampleType: "Blood",

    fastingRequired: true,

    fastingInstructions:
      "Fast for 8-12 hours before sample collection. Water is generally permitted.",

    homeCollection: true,

    testsIncluded: [
      "Complete Blood Count (CBC)",
      "Fasting Blood Sugar",
      "Liver Function Test (LFT)",
      "Kidney Function Test (KFT)",
      "Lipid Profile",
    ],

    parametersIncluded: [
      "Haemoglobin",
      "RBC Count",
      "WBC Count",
      "Platelets",
      "Glucose",
      "Bilirubin",
      "SGOT",
      "SGPT",
      "Creatinine",
      "Urea",
      "Total Cholesterol",
      "HDL",
      "LDL",
      "Triglycerides",
    ],

    preparation: [
      "Fast for 8-12 hours before sample collection.",
      "Avoid heavy meals before the test.",
      "Drink sufficient water unless otherwise advised.",
    ],

    popular: true,
    recommended: true,
  },

  {
    id: "advanced-full-body",
    name: "Advanced Full Body Checkup",
    slug: "advanced-full-body-checkup",
    category: "Full Body",

    description:
      "A comprehensive health screening package covering blood count, diabetes, thyroid, liver, kidney, lipid and vitamin parameters.",

    shortDescription:
      "Comprehensive screening for a detailed view of your health.",

    price: 1999,
    mrp: 3000,

    reportTime: "48 Hours",

    sampleType: "Blood",

    fastingRequired: true,

    fastingInstructions:
      "Fast for 8-12 hours before sample collection.",

    homeCollection: true,

    testsIncluded: [
      "Complete Blood Count (CBC)",
      "HbA1c",
      "Thyroid Profile",
      "Liver Function Test (LFT)",
      "Kidney Function Test (KFT)",
      "Lipid Profile",
      "Vitamin B12",
      "Vitamin D",
    ],

    parametersIncluded: [
      "Haemoglobin",
      "RBC Count",
      "WBC Count",
      "Platelets",
      "HbA1c",
      "T3",
      "T4",
      "TSH",
      "Bilirubin",
      "SGOT",
      "SGPT",
      "Creatinine",
      "Urea",
      "Cholesterol",
      "Triglycerides",
      "Vitamin B12",
      "Vitamin D",
    ],

    preparation: [
      "Fast for 8-12 hours.",
      "Avoid alcohol before sample collection.",
      "Take regular medication only as advised by your healthcare provider.",
    ],

    popular: true,
    recommended: true,
  },

  {
    id: "diabetes-care",
    name: "Diabetes Care Package",
    slug: "diabetes-care-package",
    category: "Diabetes",

    description:
      "A focused package for monitoring important blood glucose and related metabolic parameters.",

    shortDescription:
      "Essential tests for regular diabetes monitoring.",

    price: 799,
    mrp: 1200,

    reportTime: "24 Hours",

    sampleType: "Blood",

    fastingRequired: true,

    fastingInstructions:
      "Fast for at least 8 hours before sample collection.",

    homeCollection: true,

    testsIncluded: [
      "Fasting Blood Sugar",
      "HbA1c",
      "Kidney Function Test (KFT)",
      "Lipid Profile",
    ],

    parametersIncluded: [
      "Fasting Blood Glucose",
      "HbA1c",
      "Creatinine",
      "Urea",
      "Total Cholesterol",
      "HDL",
      "LDL",
      "Triglycerides",
    ],

    preparation: [
      "Fast for at least 8 hours.",
      "Drink water during the fasting period.",
    ],

    popular: true,
  },

  {
    id: "heart-health",
    name: "Heart Health Package",
    slug: "heart-health-package",
    category: "Heart Health",

    description:
      "A cardiovascular screening package covering cholesterol, blood sugar and other commonly evaluated cardiac risk markers.",

    shortDescription:
      "Screening package focused on cardiovascular health.",

    price: 1299,
    mrp: 1900,

    reportTime: "24-48 Hours",

    sampleType: "Blood",

    fastingRequired: true,

    fastingInstructions:
      "Fast for 9-12 hours before sample collection.",

    homeCollection: true,

    testsIncluded: [
      "Lipid Profile",
      "HbA1c",
      "Complete Blood Count (CBC)",
      "C-Reactive Protein (CRP)",
    ],

    parametersIncluded: [
      "Total Cholesterol",
      "HDL",
      "LDL",
      "Triglycerides",
      "HbA1c",
      "Haemoglobin",
      "RBC Count",
      "WBC Count",
      "CRP",
    ],

    preparation: [
      "Fast for 9-12 hours.",
      "Avoid alcohol before sample collection.",
    ],

    recommended: true,
  },

  {
    id: "women-wellness",
    name: "Women Wellness Package",
    slug: "women-wellness-package",
    category: "Women Health",

    description:
      "A health screening package designed around commonly monitored health parameters for women.",

    shortDescription:
      "Comprehensive screening for women's general wellness.",

    price: 1599,
    mrp: 2300,

    reportTime: "48 Hours",

    sampleType: "Blood",

    fastingRequired: true,

    fastingInstructions:
      "Follow the fasting instructions provided during booking.",

    homeCollection: true,

    testsIncluded: [
      "Complete Blood Count (CBC)",
      "Thyroid Profile",
      "Vitamin D",
      "Vitamin B12",
      "Lipid Profile",
      "HbA1c",
    ],

    parametersIncluded: [
      "Haemoglobin",
      "T3",
      "T4",
      "TSH",
      "Vitamin D",
      "Vitamin B12",
      "Cholesterol",
      "Triglycerides",
      "HbA1c",
    ],

    preparation: [
      "Follow fasting instructions provided at booking.",
      "Inform the healthcare professional about regular medications.",
    ],

    popular: true,
  },

  {
    id: "men-wellness",
    name: "Men Wellness Package",
    slug: "men-wellness-package",
    category: "Men Health",

    description:
      "A general health screening package covering important metabolic, blood, thyroid and vitamin parameters for men.",

    shortDescription:
      "General wellness screening for men's health.",

    price: 1499,
    mrp: 2200,

    reportTime: "48 Hours",

    sampleType: "Blood",

    fastingRequired: true,

    homeCollection: true,

    testsIncluded: [
      "Complete Blood Count (CBC)",
      "Lipid Profile",
      "HbA1c",
      "Thyroid Profile",
      "Vitamin D",
      "Kidney Function Test (KFT)",
    ],

    parametersIncluded: [
      "Haemoglobin",
      "Cholesterol",
      "Triglycerides",
      "HbA1c",
      "T3",
      "T4",
      "TSH",
      "Vitamin D",
      "Creatinine",
      "Urea",
    ],

    preparation: [
      "Fast for 8-12 hours.",
      "Avoid alcohol before collection.",
    ],
  },

  {
    id: "senior-care",
    name: "Senior Citizen Health Package",
    slug: "senior-citizen-health-package",
    category: "Senior Citizen",

    description:
      "A broad health screening package covering parameters commonly monitored as part of routine senior health assessment.",

    shortDescription:
      "Comprehensive screening for senior citizens.",

    price: 2299,
    mrp: 3400,

    reportTime: "48 Hours",

    sampleType: "Blood",

    fastingRequired: true,

    fastingInstructions:
      "Fast for 8-12 hours unless otherwise instructed.",

    homeCollection: true,

    testsIncluded: [
      "Complete Blood Count (CBC)",
      "HbA1c",
      "Thyroid Profile",
      "Liver Function Test (LFT)",
      "Kidney Function Test (KFT)",
      "Lipid Profile",
      "Vitamin B12",
      "Vitamin D",
    ],

    parametersIncluded: [
      "Haemoglobin",
      "WBC Count",
      "Platelets",
      "HbA1c",
      "T3",
      "T4",
      "TSH",
      "Bilirubin",
      "SGOT",
      "SGPT",
      "Creatinine",
      "Urea",
      "Cholesterol",
      "Triglycerides",
      "Vitamin B12",
      "Vitamin D",
    ],

    preparation: [
      "Fast for 8-12 hours.",
      "Carry details of regular medication if required.",
    ],

    recommended: true,
  },

  {
    id: "thyroid-care",
    name: "Thyroid Care Package",
    slug: "thyroid-care-package",
    category: "Thyroid",

    description:
      "A focused package for thyroid monitoring combined with selected general health markers.",

    shortDescription:
      "Thyroid screening with supporting health parameters.",

    price: 899,
    mrp: 1300,

    reportTime: "24-48 Hours",

    sampleType: "Blood",

    fastingRequired: false,

    homeCollection: true,

    testsIncluded: [
      "Thyroid Profile",
      "Complete Blood Count (CBC)",
      "Vitamin D",
    ],

    parametersIncluded: [
      "T3",
      "T4",
      "TSH",
      "Haemoglobin",
      "RBC Count",
      "WBC Count",
      "Vitamin D",
    ],

    preparation: [
      "Fasting is generally not required.",
      "Inform the collection professional about thyroid medication.",
    ],
  },

  {
    id: "vitamin-screening",
    name: "Vitamin Screening Package",
    slug: "vitamin-screening-package",
    category: "Vitamin",

    description:
      "A vitamin-focused package measuring commonly tested vitamin levels.",

    shortDescription:
      "Screen important vitamin levels in one package.",

    price: 1199,
    mrp: 1700,

    reportTime: "48 Hours",

    sampleType: "Blood",

    fastingRequired: false,

    homeCollection: true,

    testsIncluded: [
      "Vitamin D",
      "Vitamin B12",
    ],

    parametersIncluded: [
      "25-OH Vitamin D",
      "Vitamin B12",
    ],

    preparation: [
      "Fasting is generally not required.",
    ],
  },
];