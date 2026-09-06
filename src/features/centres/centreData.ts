export interface DiagnosticCentre {
  id: string;
  name: string;
  slug: string;

  city: string;
  locality: string;

  address: string;

  pincode: string;

  phone: string;

  email?: string;

  centreType:
    | "Diagnostic Centre"
    | "Collection Centre"
    | "Hospital";

  openingTime: string;
  closingTime: string;

  workingDays: string;

  homeCollection: boolean;

  parkingAvailable: boolean;

  wheelchairAccessible: boolean;

  services: string[];

  testsAvailable: string[];

  latitude?: number;
  longitude?: number;

  popular?: boolean;
  recommended?: boolean;
}

export const centreCities = [
  "All",
  "Lucknow",
  "Kanpur",
  "Prayagraj",
  "Varanasi",
] as const;

export const diagnosticCentres: DiagnosticCentre[] = [
  {
    id: "lucknow-hazratganj",
    name: "Apollo Diagnostic Centre - Hazratganj",
    slug: "apollo-diagnostic-centre-hazratganj",

    city: "Lucknow",
    locality: "Hazratganj",

    address:
      "12 Mahatma Gandhi Marg, Hazratganj, Lucknow, Uttar Pradesh",

    pincode: "226001",

    phone: "+91 90000 00001",

    email: "support@example.com",

    centreType: "Diagnostic Centre",

    openingTime: "07:00 AM",
    closingTime: "08:00 PM",

    workingDays: "Monday - Sunday",

    homeCollection: true,

    parkingAvailable: true,

    wheelchairAccessible: true,

    services: [
      "Blood Tests",
      "Health Packages",
      "Digital Reports",
      "Home Sample Collection",
    ],

    testsAvailable: [
      "Complete Blood Count",
      "Lipid Profile",
      "Thyroid Profile",
      "HbA1c",
      "Liver Function Test",
      "Kidney Function Test",
    ],

    latitude: 26.8508,
    longitude: 80.9496,

    popular: true,
    recommended: true,
  },

  {
    id: "lucknow-gomti-nagar",
    name: "Apollo Diagnostic Centre - Gomti Nagar",
    slug: "apollo-diagnostic-centre-gomti-nagar",

    city: "Lucknow",
    locality: "Gomti Nagar",

    address:
      "Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh",

    pincode: "226010",

    phone: "+91 90000 00002",

    centreType: "Diagnostic Centre",

    openingTime: "06:30 AM",
    closingTime: "09:00 PM",

    workingDays: "Monday - Sunday",

    homeCollection: true,

    parkingAvailable: true,

    wheelchairAccessible: true,

    services: [
      "Blood Tests",
      "Health Packages",
      "Digital Reports",
      "Home Sample Collection",
    ],

    testsAvailable: [
      "Complete Blood Count",
      "Vitamin D",
      "Vitamin B12",
      "Thyroid Profile",
      "Diabetes Tests",
      "Lipid Profile",
    ],

    latitude: 26.865,
    longitude: 81.002,

    popular: true,
  },

  {
    id: "lucknow-aliganj",
    name: "Apollo Collection Centre - Aliganj",
    slug: "apollo-collection-centre-aliganj",

    city: "Lucknow",
    locality: "Aliganj",

    address:
      "Sector K, Aliganj, Lucknow, Uttar Pradesh",

    pincode: "226024",

    phone: "+91 90000 00003",

    centreType: "Collection Centre",

    openingTime: "07:00 AM",
    closingTime: "07:00 PM",

    workingDays: "Monday - Saturday",

    homeCollection: true,

    parkingAvailable: false,

    wheelchairAccessible: true,

    services: [
      "Blood Tests",
      "Digital Reports",
      "Home Sample Collection",
    ],

    testsAvailable: [
      "CBC",
      "Blood Sugar",
      "HbA1c",
      "Thyroid Profile",
      "Lipid Profile",
    ],

    latitude: 26.888,
    longitude: 80.946,

    recommended: true,
  },

  {
    id: "kanpur-swaroop-nagar",
    name: "Apollo Diagnostic Centre - Swaroop Nagar",
    slug: "apollo-diagnostic-centre-swaroop-nagar",

    city: "Kanpur",
    locality: "Swaroop Nagar",

    address:
      "Swaroop Nagar, Kanpur, Uttar Pradesh",

    pincode: "208002",

    phone: "+91 90000 00004",

    centreType: "Diagnostic Centre",

    openingTime: "07:00 AM",
    closingTime: "08:00 PM",

    workingDays: "Monday - Sunday",

    homeCollection: true,

    parkingAvailable: true,

    wheelchairAccessible: true,

    services: [
      "Blood Tests",
      "Health Packages",
      "Digital Reports",
      "Home Sample Collection",
    ],

    testsAvailable: [
      "CBC",
      "Thyroid Profile",
      "Lipid Profile",
      "HbA1c",
      "Vitamin D",
    ],

    latitude: 26.4837,
    longitude: 80.3196,

    popular: true,
  },

  {
    id: "prayagraj-civil-lines",
    name: "Apollo Diagnostic Centre - Civil Lines",
    slug: "apollo-diagnostic-centre-civil-lines",

    city: "Prayagraj",
    locality: "Civil Lines",

    address:
      "Civil Lines, Prayagraj, Uttar Pradesh",

    pincode: "211001",

    phone: "+91 90000 00005",

    centreType: "Diagnostic Centre",

    openingTime: "07:00 AM",
    closingTime: "08:00 PM",

    workingDays: "Monday - Sunday",

    homeCollection: true,

    parkingAvailable: true,

    wheelchairAccessible: true,

    services: [
      "Blood Tests",
      "Health Packages",
      "Digital Reports",
      "Home Sample Collection",
    ],

    testsAvailable: [
      "CBC",
      "Liver Function Test",
      "Kidney Function Test",
      "Thyroid Profile",
      "Lipid Profile",
    ],

    latitude: 25.4484,
    longitude: 81.8333,

    recommended: true,
  },

  {
    id: "varanasi-lanka",
    name: "Apollo Diagnostic Centre - Lanka",
    slug: "apollo-diagnostic-centre-lanka",

    city: "Varanasi",
    locality: "Lanka",

    address:
      "Lanka, Varanasi, Uttar Pradesh",

    pincode: "221005",

    phone: "+91 90000 00006",

    centreType: "Diagnostic Centre",

    openingTime: "06:30 AM",
    closingTime: "08:30 PM",

    workingDays: "Monday - Sunday",

    homeCollection: true,

    parkingAvailable: true,

    wheelchairAccessible: true,

    services: [
      "Blood Tests",
      "Health Packages",
      "Digital Reports",
      "Home Sample Collection",
    ],

    testsAvailable: [
      "CBC",
      "Diabetes Tests",
      "Thyroid Profile",
      "Vitamin Tests",
      "Lipid Profile",
    ],

    latitude: 25.2677,
    longitude: 82.9913,

    popular: true,
  },
];