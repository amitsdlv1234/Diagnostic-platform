import { MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "../common/Container";
import { footerNavigation } from "../../constants/navigation";

import nidanLogo from "../../assets/nidan-logo.jpeg";

const PHONE_DISPLAY = "7489446503";
const PHONE_LINK = "tel:+917489446503";
const WHATSAPP_LINK = "https://wa.me/917489446503";
const ADDRESS = "Rishi Tola, Kasabbara, near GIC, Ayodhya 224001";
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `Nidan Diagnostic Centre, ${ADDRESS}`
)}`;

const quickLinks = [
  { label: "Book an appointment", href: "/booking" },
  { label: "Tests", href: "/tests" },
  { label: "Health packages", href: "/packages" },
  { label: "Meet our doctor", href: "/doctor" },
];

const services = [
  "Obstetric & fetal imaging",
  "Doppler studies",
  "Ultrasound",
  "Digital X-ray",
  "Pathology lab",
  "Full body health checkups",
];

const linkClass =
  "text-sm text-gray-400 transition hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline";

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <Container>
        {/* Quick contact strip */}
        <div className="flex flex-col gap-5 border-b border-gray-800 py-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-lg font-semibold text-white">
              Need help booking a test?
            </p>
            <p className="mt-1 text-sm text-gray-400">
              Call or message us and we will guide you.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={PHONE_LINK}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-pink-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
            >
              <Phone size={18} />
              Call {PHONE_DISPLAY}
            </a>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-500"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>

            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-900"
            >
              <Navigation size={18} />
              Get directions
            </a>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-3">
              <img
                src={nidanLogo}
                alt="Nidan Diagnostic Centre logo"
                className="h-14 w-14 rounded-full bg-white object-contain p-0.5"
              />

              <div>
                <p className="font-bold text-white">Nidan Diagnostic Centre</p>
                <p className="text-xs text-gray-400">
                  निदान डायग्नोस्टिक सेंटर &middot; Estd. 2000
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
              Ultrasound, fetal and women&rsquo;s imaging, digital X-ray and
              pathology under one roof in Ayodhya.
            </p>

            <address className="mt-5 space-y-3 text-sm not-italic text-gray-400">
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-white"
              >
                <MapPin size={16} className="mt-1 shrink-0 text-pink-400" />
                {ADDRESS}
              </a>

              <a
                href={PHONE_LINK}
                className="flex items-center gap-2 hover:text-white"
              >
                <Phone size={16} className="shrink-0 text-pink-400" />
                {PHONE_DISPLAY}
              </a>
            </address>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links" className="lg:col-span-2">
            <h3 className="mb-4 font-semibold text-white">Quick links</h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="mb-4 font-semibold text-white">Our services</h3>
            <ul className="flex flex-col gap-3">
              {services.map((item) => (
                <li key={item} className="text-sm text-gray-400">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Company + support */}
          <nav aria-label="Company and support" className="lg:col-span-3">
            <h3 className="mb-4 font-semibold text-white">Help &amp; company</h3>
            <ul className="flex flex-col gap-3">
              {[...footerNavigation.company, ...footerNavigation.support].map(
                (item) => (
                  <li key={item.href}>
                    <Link to={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-800 py-5 text-sm text-gray-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Nidan Diagnostic Centre. All rights
            reserved.
          </p>

          <div className="flex gap-5">
            {footerNavigation.legal.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="hover:text-gray-300"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}