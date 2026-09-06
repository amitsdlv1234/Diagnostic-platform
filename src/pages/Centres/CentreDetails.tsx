import {
  ArrowLeft,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  Home,
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import { Container } from "../../components/common/Container";

import { EmptyState } from "../../components/common/EmptyState";

import {
  diagnosticCentres,
} from "../../features/centres/centreData";

export function CentreDetails() {
  const { centreId } =
    useParams<{
      centreId: string;
    }>();

  const centre =
    diagnosticCentres.find(
      (item) => item.id === centreId,
    );

  if (!centre) {
    return (
      <div className="bg-gray-50 py-16">
        <Container>
          <EmptyState
            title="Centre not found"
            description="The diagnostic centre you are looking for could not be found."
            action={
              <Link
                to="/centres"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <ArrowLeft size={16} />
                Back to Centres
              </Link>
            }
          />
        </Container>
      </div>
    );
  }

  const mapUrl =
    centre.latitude &&
    centre.longitude
      ? `https://www.google.com/maps/search/?api=1&query=${centre.latitude},${centre.longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          centre.address,
        )}`;

  return (
    <div className="bg-gray-50">
      <Container>
        <div className="py-8">
          <Link
            to="/centres"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={17} />
            Back to Centres
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_380px]">
            {/* Main */}
            <div>
              <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {centre.centreType}
                  </span>

                  {centre.recommended && (
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                      Recommended
                    </span>
                  )}
                </div>

                <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                  {centre.name}
                </h1>

                <div className="mt-5 flex items-start gap-3">
                  <MapPin
                    size={20}
                    className="mt-1 shrink-0 text-blue-600"
                  />

                  <div>
                    <p className="font-semibold text-gray-900">
                      {centre.locality},{" "}
                      {centre.city}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      {centre.address}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      PIN: {centre.pincode}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <InfoItem
                    icon={Clock3}
                    label="Opening Hours"
                    value={`${centre.openingTime} - ${centre.closingTime}`}
                    secondary={
                      centre.workingDays
                    }
                  />

                  <InfoItem
                    icon={Phone}
                    label="Phone"
                    value={centre.phone}
                  />

                  <InfoItem
                    icon={Home}
                    label="Home Collection"
                    value={
                      centre.homeCollection
                        ? "Available"
                        : "Not Available"
                    }
                  />

                  <InfoItem
                    icon={ShieldCheck}
                    label="Accessibility"
                    value={
                      centre.wheelchairAccessible
                        ? "Wheelchair accessible"
                        : "Contact centre"
                    }
                  />
                </div>
              </div>

              {/* Services */}
              <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
                <h2 className="text-xl font-bold text-gray-900">
                  Services available
                </h2>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {centre.services.map(
                    (service) => (
                      <div
                        key={service}
                        className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3"
                      >
                        <CheckCircle2
                          size={18}
                          className="text-green-600"
                        />

                        <span className="text-sm font-semibold text-gray-700">
                          {service}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Tests */}
              <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
                <h2 className="text-xl font-bold text-gray-900">
                  Tests available
                </h2>

                <div className="mt-5 flex flex-wrap gap-2">
                  {centre.testsAvailable.map(
                    (test) => (
                      <span
                        key={test}
                        className="rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700"
                      >
                        {test}
                      </span>
                    ),
                  )}
                </div>
              </div>

              {/* Map */}
              <div className="mt-6 overflow-hidden rounded-3xl border border-gray-200 bg-white">
                <div className="flex min-h-[280px] items-center justify-center bg-gray-100 p-8">
                  <div className="text-center">
                    <MapPin
                      size={35}
                      className="mx-auto text-blue-600"
                    />

                    <h2 className="mt-4 text-lg font-bold text-gray-900">
                      {centre.locality}
                    </h2>

                    <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                      {centre.address}
                    </p>

                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-blue-600 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50"
                    >
                      <Navigation size={16} />
                      Open in Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking */}
            <aside>
              <div className="sticky top-24 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                  <span className="text-sm font-semibold text-green-700">
                    Centre available
                  </span>
                </div>

                <h2 className="mt-4 text-xl font-bold text-gray-900">
                  Book your diagnostic test
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Select this centre while booking your
                  test or health package.
                </p>

                <Link
                  to={`/booking?centre=${centre.id}`}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  <CalendarCheck size={18} />
                  Book a Test
                </Link>

                <a
                  href={`tel:${centre.phone}`}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <Phone size={17} />
                  Call Centre
                </a>

                <div className="my-6 border-t border-gray-100" />

                <div className="space-y-4">
                  <Feature
                    icon={Clock3}
                    text={`${centre.openingTime} - ${centre.closingTime}`}
                  />

                  <Feature
                    icon={MapPin}
                    text={`${centre.locality}, ${centre.city}`}
                  />

                  {centre.homeCollection && (
                    <Feature
                      icon={Home}
                      text="Home sample collection available"
                    />
                  )}

                  {centre.parkingAvailable && (
                    <Feature
                      icon={CheckCircle2}
                      text="Parking available"
                    />
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </div>
  );
}

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
  secondary?: string;
}

function InfoItem({
  icon: Icon,
  label,
  value,
  secondary,
}: InfoItemProps) {
  return (
    <div className="rounded-2xl bg-gray-50 p-4">
      <Icon
        size={20}
        className="text-blue-600"
      />

      <p className="mt-3 text-xs font-medium text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-gray-900">
        {value}
      </p>

      {secondary && (
        <p className="mt-1 text-xs text-gray-500">
          {secondary}
        </p>
      )}
    </div>
  );
}

interface FeatureProps {
  icon: React.ElementType;
  text: string;
}

function Feature({
  icon: Icon,
  text,
}: FeatureProps) {
  return (
    <div className="flex items-center gap-3">
      <Icon
        size={18}
        className="shrink-0 text-blue-600"
      />

      <span className="text-sm text-gray-700">
        {text}
      </span>
    </div>
  );
}