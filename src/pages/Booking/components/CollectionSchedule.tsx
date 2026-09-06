import {
  CalendarDays,
  Clock3,
} from "lucide-react";

interface CollectionScheduleProps {
  collectionDate: string;
  timeSlot: string;

  minDate: string;

  onDateChange: (
    value: string,
  ) => void;

  onTimeChange: (
    value: string,
  ) => void;
}

const TIME_SLOTS = [
  "07:00 AM - 08:00 AM",
  "08:00 AM - 09:00 AM",
  "09:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "04:00 PM - 05:00 PM",
  "05:00 PM - 06:00 PM",
  "06:00 PM - 07:00 PM",
];

export function CollectionSchedule({
  collectionDate,
  timeSlot,
  minDate,
  onDateChange,
  onTimeChange,
}: CollectionScheduleProps) {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
      <h2 className="text-xl font-bold text-gray-900">
        Collection schedule
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Select your preferred collection date
        and time.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-gray-700">
            Collection date
          </label>

          <div className="relative mt-2">
            <CalendarDays
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="date"
              min={minDate}
              value={collectionDate}
              onChange={(event) =>
                onDateChange(
                  event.target.value,
                )
              }
              className="h-11 w-full rounded-xl border border-gray-300 bg-white pl-10 pr-3 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700">
            Time slot
          </label>

          <div className="relative mt-2">
            <Clock3
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              value={timeSlot}
              onChange={(event) =>
                onTimeChange(
                  event.target.value,
                )
              }
              className="h-11 w-full rounded-xl border border-gray-300 bg-white pl-10 pr-3 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">
                Select time slot
              </option>

              {TIME_SLOTS.map((slot) => (
                <option
                  key={slot}
                  value={slot}
                >
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}