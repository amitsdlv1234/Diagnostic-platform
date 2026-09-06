import { Quote } from "lucide-react";
import { Container } from "../../../components/common/Container";
import { SectionHeading } from "../../../components/common/SectionHeading";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Lucknow",
    text: "The booking process was simple and the home collection was very convenient.",
  },
  {
    name: "Rahul Verma",
    location: "Lucknow",
    text: "I could easily find the test I needed and access the report online.",
  },
  {
    name: "Anita Singh",
    location: "Lucknow",
    text: "The package pricing was clear and booking for my parents was easy.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Patient Experience"
          title="What our patients say"
          description="Simple, convenient diagnostic care."
          align="center"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <Quote
                size={30}
                className="text-blue-600"
              />

              <p className="mt-4 text-sm leading-7 text-gray-600">
                "{testimonial.text}"
              </p>

              <div className="mt-6 border-t border-gray-100 pt-5">
                <p className="font-bold text-gray-900">
                  {testimonial.name}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}