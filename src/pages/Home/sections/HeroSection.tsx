import {
  ArrowRight,
  Search,
  ShieldCheck,
  Home,
  Building2,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "../../../components/common/Container";

export function HeroSection() {
  const [search, setSearch] = useState("");

  return (
    <section className="overflow-hidden bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Container>
        <div className="grid min-h-[560px] items-center gap-12 py-16 lg:grid-cols-2 lg:py-20">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
              <ShieldCheck size={17} />
              Trusted diagnostic testing
            </div>

            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              Better health starts with the right
              <span className="text-blue-600">
                {" "}
                diagnosis.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Book diagnostic tests and health packages
              online with convenient home sample collection
              and digital reports.
            </p>

            <div className="mt-8 max-w-xl rounded-2xl bg-white p-2 shadow-xl ring-1 ring-gray-100">
              <div className="flex items-center gap-3">
                <Search
                  size={22}
                  className="ml-3 shrink-0 text-gray-400"
                />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search tests, packages or health checkups"
                  className="min-w-0 flex-1 bg-transparent py-3 text-sm text-gray-900 outline-none sm:text-base"
                />

                <Link
                  to={`/tests?search=${encodeURIComponent(search)}`}
                  className="hidden shrink-0 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 sm:block"
                >
                  Search
                </Link>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Book a Test
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/home-collection"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                <Home size={17} />
                Home Collection
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-blue-200/50 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-72 w-72 rounded-full bg-teal-200/50 blur-3xl" />

            <div className="relative rounded-[2rem] bg-white p-6 shadow-2xl ring-1 ring-gray-100">
              <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-teal-600 p-8 text-white">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                  <Building2 size={28} />
                </div>

                <p className="mt-8 text-sm font-medium text-blue-100">
                  Diagnostic care made simple
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  Tests from trusted laboratories
                </h2>

                <p className="mt-4 text-sm leading-6 text-blue-50">
                  Choose a nearby centre or let our trained
                  collection team visit your home.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-2xl font-bold">
                      100+
                    </p>
                    <p className="mt-1 text-xs text-blue-100">
                      Tests
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-2xl font-bold">
                      20+
                    </p>
                    <p className="mt-1 text-xs text-blue-100">
                      Centres
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}