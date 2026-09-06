export interface DiagnosticTest {
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

  parameters: string[];

  preparation: string[];

  popular?: boolean;
}

export const testCategories = [
  "All",
  "Haematology",
  "Diabetes",
  "Thyroid",
  "Liver",
  "Kidney",
  "Vitamins",
  "Hormones",
  "Cardiac",
  "Infection",
  "Lipid",
] as const;

export const diagnosticTests: DiagnosticTest[] = [
  {
    id: "cbc",
    name: "Complete Blood Count (CBC)",
    slug: "complete-blood-count-cbc",
    category: "Haematology",
    description:
      "Complete Blood Count is one of the most commonly prescribed blood tests. It helps evaluate red blood cells, white blood cells, haemoglobin and platelets.",
    shortDescription:
      "A comprehensive blood test used to evaluate overall health.",
    price: 399,
    mrp: 550,
    reportTime: "24 Hours",
    sampleType: "Blood",
    fastingRequired: false,
    homeCollection: true,
    popular: true,
    parameters: [
      "Haemoglobin",
      "RBC Count",
      "WBC Count",
      "Platelet Count",
      "Hematocrit",
      "MCV",
      "MCH",
      "MCHC",
    ],
    preparation: [
      "No fasting required.",
      "Drink sufficient water before sample collection.",
    ],
  },

  {
    id: "hba1c",
    name: "HbA1c - Glycated Haemoglobin",
    slug: "hba1c",
    category: "Diabetes",
    description:
      "HbA1c measures the average blood glucose level over approximately the previous two to three months.",
    shortDescription:
      "Helps monitor average blood sugar levels over time.",
    price: 399,
    mrp: 500,
    reportTime: "24 Hours",
    sampleType: "Blood",
    fastingRequired: false,
    homeCollection: true,
    popular: true,
    parameters: [
      "HbA1c",
      "Estimated Average Glucose",
    ],
    preparation: [
      "No fasting required.",
      "Continue normal routine unless advised otherwise by your doctor.",
    ],
  },

  {
    id: "thyroid-profile",
    name: "Thyroid Profile",
    slug: "thyroid-profile",
    category: "Thyroid",
    description:
      "Thyroid Profile evaluates thyroid hormone levels and helps assess thyroid gland function.",
    shortDescription:
      "Measures important thyroid hormones to assess thyroid function.",
    price: 599,
    mrp: 800,
    reportTime: "24 Hours",
    sampleType: "Blood",
    fastingRequired: false,
    homeCollection: true,
    popular: true,
    parameters: [
      "T3",
      "T4",
      "TSH",
    ],
    preparation: [
      "Fasting is generally not required.",
      "Inform the collection professional about medications being taken.",
    ],
  },

  {
    id: "vitamin-d",
    name: "Vitamin D - 25 Hydroxy",
    slug: "vitamin-d",
    category: "Vitamins",
    description:
      "Vitamin D testing helps determine whether the body has sufficient vitamin D levels.",
    shortDescription:
      "Measures vitamin D levels in your blood.",
    price: 799,
    mrp: 1100,
    reportTime: "48 Hours",
    sampleType: "Blood",
    fastingRequired: false,
    homeCollection: true,
    parameters: [
      "25-OH Vitamin D",
    ],
    preparation: [
      "No fasting is normally required.",
      "Follow your doctor's instructions if applicable.",
    ],
  },

  {
    id: "lipid-profile",
    name: "Lipid Profile",
    slug: "lipid-profile",
    category: "Lipid",
    description:
      "Lipid Profile measures cholesterol and triglyceride levels and is commonly used for cardiovascular risk assessment.",
    shortDescription:
      "Measures cholesterol and triglyceride levels.",
    price: 499,
    mrp: 700,
    reportTime: "24 Hours",
    sampleType: "Blood",
    fastingRequired: true,
    fastingInstructions:
      "Fast for 9-12 hours before sample collection. Water is generally permitted.",
    homeCollection: true,
    popular: true,
    parameters: [
      "Total Cholesterol",
      "HDL Cholesterol",
      "LDL Cholesterol",
      "Triglycerides",
      "VLDL",
      "Cholesterol/HDL Ratio",
    ],
    preparation: [
      "Fast for 9-12 hours before sample collection.",
      "Avoid alcohol before the test.",
      "Water may generally be consumed.",
    ],
  },

  {
    id: "liver-function-test",
    name: "Liver Function Test (LFT)",
    slug: "liver-function-test",
    category: "Liver",
    description:
      "Liver Function Test evaluates several markers associated with liver health and function.",
    shortDescription:
      "Evaluates important markers associated with liver health.",
    price: 699,
    mrp: 950,
    reportTime: "24 Hours",
    sampleType: "Blood",
    fastingRequired: true,
    fastingInstructions:
      "Fasting may be recommended depending on the individual test panel.",
    homeCollection: true,
    parameters: [
      "Bilirubin",
      "SGOT",
      "SGPT",
      "Alkaline Phosphatase",
      "Total Protein",
      "Albumin",
      "Globulin",
    ],
    preparation: [
      "Follow the fasting instructions provided at booking.",
      "Avoid heavy meals before sample collection.",
    ],
  },

  {
    id: "kidney-function-test",
    name: "Kidney Function Test (KFT)",
    slug: "kidney-function-test",
    category: "Kidney",
    description:
      "Kidney Function Test evaluates markers that help assess kidney function.",
    shortDescription:
      "Checks important markers related to kidney function.",
    price: 649,
    mrp: 900,
    reportTime: "24 Hours",
    sampleType: "Blood",
    fastingRequired: false,
    homeCollection: true,
    parameters: [
      "Creatinine",
      "Urea",
      "Uric Acid",
      "BUN",
      "Sodium",
      "Potassium",
    ],
    preparation: [
      "Fasting is generally not required.",
      "Stay adequately hydrated unless otherwise advised.",
    ],
  },

  {
    id: "fasting-blood-sugar",
    name: "Fasting Blood Sugar",
    slug: "fasting-blood-sugar",
    category: "Diabetes",
    description:
      "Fasting Blood Sugar measures blood glucose after a period of fasting.",
    shortDescription:
      "Measures blood glucose after overnight fasting.",
    price: 149,
    mrp: 220,
    reportTime: "Same Day",
    sampleType: "Blood",
    fastingRequired: true,
    fastingInstructions:
      "Fast for at least 8 hours before sample collection.",
    homeCollection: true,
    parameters: [
      "Fasting Blood Glucose",
    ],
    preparation: [
      "Fast for at least 8 hours.",
      "Only water should generally be consumed during the fasting period.",
    ],
  },

  {
    id: "vitamin-b12",
    name: "Vitamin B12",
    slug: "vitamin-b12",
    category: "Vitamins",
    description:
      "Vitamin B12 testing helps assess the body's vitamin B12 status.",
    shortDescription:
      "Measures vitamin B12 levels in the blood.",
    price: 699,
    mrp: 950,
    reportTime: "48 Hours",
    sampleType: "Blood",
    fastingRequired: false,
    homeCollection: true,
    parameters: [
      "Vitamin B12",
    ],
    preparation: [
      "Fasting is generally not required.",
    ],
  },

  {
    id: "testosterone",
    name: "Testosterone",
    slug: "testosterone",
    category: "Hormones",
    description:
      "Testosterone testing measures testosterone levels and may be used as part of hormonal evaluation.",
    shortDescription:
      "Measures testosterone hormone levels.",
    price: 799,
    mrp: 1100,
    reportTime: "48 Hours",
    sampleType: "Blood",
    fastingRequired: false,
    homeCollection: true,
    parameters: [
      "Total Testosterone",
    ],
    preparation: [
      "Follow your healthcare provider's instructions.",
      "Morning collection may be recommended depending on the clinical requirement.",
    ],
  },

  {
    id: "troponin-i",
    name: "Troponin I",
    slug: "troponin-i",
    category: "Cardiac",
    description:
      "Troponin testing may be used by healthcare professionals when evaluating possible heart muscle injury.",
    shortDescription:
      "A cardiac marker used in clinical evaluation.",
    price: 999,
    mrp: 1300,
    reportTime: "Same Day",
    sampleType: "Blood",
    fastingRequired: false,
    homeCollection: false,
    parameters: [
      "Troponin I",
    ],
    preparation: [
      "No fasting required unless specifically advised.",
    ],
  },

  {
    id: "crp",
    name: "C-Reactive Protein (CRP)",
    slug: "crp",
    category: "Infection",
    description:
      "CRP is a marker that may increase in response to inflammation in the body.",
    shortDescription:
      "Helps assess inflammation in the body.",
    price: 449,
    mrp: 600,
    reportTime: "24 Hours",
    sampleType: "Blood",
    fastingRequired: false,
    homeCollection: true,
    parameters: [
      "C-Reactive Protein",
    ],
    preparation: [
      "No fasting is generally required.",
    ],
  },
];