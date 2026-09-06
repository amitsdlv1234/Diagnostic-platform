import { HeroSection } from "./sections/HeroSection";
import { PopularTestsSection } from "./sections/PopularTestsSection";
import { PackagesSection } from "./sections/PackagesSection";
import { HomeCollectionSection } from "./sections/HomeCollectionSection";
import { CentresSection } from "./sections/CentresSection";
import { WhyChooseUsSection } from "./sections/WhyChooseUsSection";
import { HowItWorksSection } from "./sections/HowItWorksSection";
import { ArticlesSection } from "./sections/ArticlesSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { FaqSection } from "./sections/FaqSection";
import { CtaSection } from "./sections/CtaSection";

export function Home() {
  return (
    <>
      <HeroSection />

      <PopularTestsSection />

      <PackagesSection />

      <HomeCollectionSection />

      <CentresSection />

      <WhyChooseUsSection />

      <HowItWorksSection />

      <ArticlesSection />

      <TestimonialsSection />

      <FaqSection />

      <CtaSection />
    </>
  );
}