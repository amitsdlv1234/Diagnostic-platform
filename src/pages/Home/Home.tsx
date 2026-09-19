import { HeroSliderSection } from "./sections/HeroSliderSection";
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
import { NeedHelpSection } from "./sections/NeedHelpSection";
import { FloatingContactButtons } from "../../components/common/FloatingContactButtons";

export function Home() {
    return (
        <main>

            {/* =====================================================
                HERO SLIDER
                Controlled from Admin → Home Page Management
                ===================================================== */}
            <HeroSliderSection />

            {/* =====================================================
                NEED HELP
                ===================================================== */}
            <NeedHelpSection />

            {/* =====================================================
                POPULAR TESTS
                Controlled from Admin → Home Page Management
                ===================================================== */}
            <PopularTestsSection />

            {/* =====================================================
                PACKAGES
                ===================================================== */}
            <PackagesSection />

            {/* =====================================================
                HOME SAMPLE COLLECTION
                ===================================================== */}
            <HomeCollectionSection />

            {/* =====================================================
                CENTRES
                ===================================================== */}
            <CentresSection />

            {/* =====================================================
                WHY CHOOSE US
                ===================================================== */}
            <WhyChooseUsSection />

            {/* =====================================================
                HOW IT WORKS
                ===================================================== */}
            <HowItWorksSection />

            {/* =====================================================
                ARTICLES
                ===================================================== */}
            <ArticlesSection />

            {/* =====================================================
                TESTIMONIALS
                ===================================================== */}
            <TestimonialsSection />

            {/* =====================================================
                FAQ
                ===================================================== */}
            <FaqSection />

            {/* =====================================================
                CTA
                ===================================================== */}
            <CtaSection />

            {/* =====================================================
                FLOATING CONTACT BUTTONS
                Apollo-style:
                - Prescription
                - Call
                ===================================================== */}
            <FloatingContactButtons />

        </main>
    );
}