import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "../../../components/common/Container";
import { SectionHeading } from "../../../components/common/SectionHeading";
import { faqs } from "../../../features/home/homeData";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(
    0,
  );

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="FAQs"
          title="Frequently asked questions"
          description="Quick answers to common questions about diagnostic testing."
          align="center"
        />

        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {faqs.map((faq, index) => {
            const open = openIndex === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-xl border border-gray-200"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(open ? null : index)
                  }
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-semibold text-gray-900">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={20}
                    className={`shrink-0 transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {open && (
                  <div className="border-t border-gray-100 px-5 pb-5 pt-4 text-sm leading-6 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}