export interface HomeSlide {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  active: boolean;
}

export const HOME_SLIDER_STORAGE_KEY =
  "diagnostic-admin-home-slides";

export const defaultHomeSlides: HomeSlide[] = [
  {
    id: "slide-001",
    title: "Better health starts with the right diagnosis.",
    subtitle:
      "Book diagnostic tests and health packages online with convenient home sample collection and digital reports.",
    buttonText: "Book a Test",
    buttonLink: "/tests",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    active: true,
  },

  {
    id: "slide-002",
    title: "Complete Health Checkups",
    subtitle:
      "Take control of your health with preventive health packages from trusted diagnostic centres.",
    buttonText: "Explore Packages",
    buttonLink: "/packages",
    imageUrl:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    active: true,
  },

  {
    id: "slide-003",
    title: "Diagnostic Tests From Home",
    subtitle:
      "Book convenient home sample collection and get your reports digitally.",
    buttonText: "Home Collection",
    buttonLink: "/home-collection",
    imageUrl:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=80",
    active: true,
  },
];
