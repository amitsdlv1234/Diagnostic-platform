import doctorPhoto from "../../assets/doctorimg.jpeg";

export interface DoctorContent {
  enabled: boolean;
  name: string;
  title: string;
  qualificationsSummary: string;
  specialty: string;
  imageUrl: string;
  shortBio: string;
  profileBio: string;
  address: string;
  phone: string;
  expertise: string[];
  qualifications: string[];
  training: string[];
  memberships: string[];
}

export const DOCTOR_CONTENT_KEY = "diagnostic_doctor_content";
export const DOCTOR_CONTENT_UPDATED_EVENT = "doctor-content-updated";

export const defaultDoctorContent: DoctorContent = {
  enabled: true,
  name: "Dr. Sarita Yadav",
  title: "Consultant Radiologist",
  qualificationsSummary: "MBBS, MD (Radiodiagnosis), CCFRG",
  specialty: "Fetal & Women's Imaging Specialist",
  imageUrl: doctorPhoto,
  shortBio: "Nidan Diagnostic Centre has served Ayodhya since 2000 and is Dr. Sarita Yadav’s own centre. Obstetric and fetal imaging, Doppler studies, digital X-ray and a full pathology laboratory sit under one roof.",
  profileBio: "Dr. Sarita Yadav is a fetal and women’s imaging specialist of Nidan Diagnostic Centre in Ayodhya, which has served patients since 2000.",
  address: "Rishi Tola, Kasabbara, near GIC, Ayodhya 224001",
  phone: "7489446503",
  expertise: [
    "Fetal and obstetric ultrasound (NT scan, anomaly scan, growth scan)",
    "Fetal Doppler and other Doppler studies",
    "3D/4D imaging and follicular studies",
    "Women's imaging",
    "Paediatric and small parts ultrasound",
    "Ultrasound-guided FNAC and biopsy",
  ],
  qualifications: [
    "MBBS",
    "MD (Radiodiagnosis)",
    "CCFRG, Certificate Course in Fetal Radiology & Genetics (ICRI, IRIA), 2025",
    "Fellowship in fetal ultrasound, Bangalore Fetal Medicine Centre (FGI)",
  ],
  training: [
    "Scholarship awardee, American Society of Pediatric Neuroradiology (ASPNR), 2024-25",
    "Observership in pediatric radiology, Bharati Vidyapeeth, Pune, 2024",
  ],
  memberships: [
    "Life member, IRIA and ISPR (since 2021)",
    "Member, European Society of Radiology (since 2023)",
    "Member, Fetal Medicine Foundation, UK (FMF ID 302305)",
    "Member, ISUOG",
  ],
};

export function getDoctorContent(): DoctorContent {
  try {
    const raw = localStorage.getItem(DOCTOR_CONTENT_KEY);
    if (!raw) return { ...defaultDoctorContent };
    const parsed = JSON.parse(raw) as Partial<DoctorContent>;
    return {
      ...defaultDoctorContent,
      ...parsed,
      expertise: Array.isArray(parsed.expertise) ? parsed.expertise : [...defaultDoctorContent.expertise],
      qualifications: Array.isArray(parsed.qualifications) ? parsed.qualifications : [...defaultDoctorContent.qualifications],
      training: Array.isArray(parsed.training) ? parsed.training : [...defaultDoctorContent.training],
      memberships: Array.isArray(parsed.memberships) ? parsed.memberships : [...defaultDoctorContent.memberships],
    };
  } catch {
    return { ...defaultDoctorContent };
  }
}

export function saveDoctorContent(content: DoctorContent): void {
  localStorage.setItem(DOCTOR_CONTENT_KEY, JSON.stringify(content));
  window.dispatchEvent(new Event(DOCTOR_CONTENT_UPDATED_EVENT));
}
