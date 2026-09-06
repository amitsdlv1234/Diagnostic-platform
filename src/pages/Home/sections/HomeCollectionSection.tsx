import {
  CalendarDays,
  Clock3,
  Home,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "../../../components/common/Container";

export function HomeCollectionSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 to-blue-600">
          <div className="grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
            <div className="text-white">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                <Home size={28} />
              </div>

              <h2 className="text-3xl font-bold sm:text-4xl">
                Get your samples collected at home
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-blue-50">
                No need to travel. Choose a convenient
                collection slot and our trained collection
                professional will visit your home.
              </p>

              <Link
                to="/home-collection"
                className="mt-7 inline-flex rounded-lg bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50"
              >
                Book Home Collection
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                {
                  icon: CalendarDays,
                  title: "Choose a date",
                  text: "Select a convenient collection date.",
                },
                {
                  icon: Clock3,
                  title: "Choose a slot",
                  text: "Pick an available time slot.",
                },
                {
                  icon: ShieldCheck,
                  title: "Safe collection",
                  text: "Samples collected by trained professionals.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex gap-4 rounded-2xl bg-white/10 p-5 text-white"
                  >
                    <Icon className="mt-1 shrink-0" size={22} />

                    <div>
                      <h3 className="font-bold">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-blue-50">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}