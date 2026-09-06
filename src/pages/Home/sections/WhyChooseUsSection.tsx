import {
  ShieldCheck,
  BadgeCheck,
  Clock3,
  FileText,
} from "lucide-react";
import { Container } from "../../../components/common/Container";
import { SectionHeading } from "../../../components/common/SectionHeading";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Trusted testing",
    description:
      "Diagnostic services designed around quality and patient safety.",
  },
  {
    icon: BadgeCheck,
    title: "Transparent pricing",
    description:
      "See test and package pricing clearly before booking.",
  },
  {
    icon: Clock3,
    title: "Convenient collection",
    description:
      "Choose a nearby centre or schedule home sample collection.",
  },
  {
    icon: FileText,
    title: "Digital reports",
    description:
      "Access finalized reports securely from your account.",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Healthcare designed around you"
          description="Everything you need to make diagnostic testing simpler and more convenient."
          align="center"
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Icon size={25} />
                </div>

                <h3 className="mt-5 font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}