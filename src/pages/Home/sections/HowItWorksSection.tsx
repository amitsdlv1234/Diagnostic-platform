import {
  Search,
  CalendarCheck,
  TestTube2,
  FileCheck2,
} from "lucide-react";
import { Container } from "../../../components/common/Container";
import { SectionHeading } from "../../../components/common/SectionHeading";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Choose a test",
    description:
      "Search and select a diagnostic test or health package.",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Schedule",
    description:
      "Choose home collection or a nearby diagnostic centre.",
  },
  {
    number: "03",
    icon: TestTube2,
    title: "Give your sample",
    description:
      "Our team collects your sample or you visit the centre.",
  },
  {
    number: "04",
    icon: FileCheck2,
    title: "Get your report",
    description:
      "Receive and securely download your digital report.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-blue-50 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Simple Process"
          title="How it works"
          description="From booking to report, we've kept the process simple."
          align="center"
        />

        <div className="mt-12 grid gap-8 md:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                  <Icon size={28} />
                </div>

                <span className="mt-4 block text-xs font-bold tracking-widest text-blue-600">
                  STEP {step.number}
                </span>

                <h3 className="mt-2 font-bold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}