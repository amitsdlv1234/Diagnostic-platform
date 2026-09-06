interface BookingProgressProps {
  currentStep: number;
}

const steps = [
  "Patient Details",
  "Collection",
  "Schedule",
  "Review",
];

export function BookingProgress({
  currentStep,
}: BookingProgressProps) {
  return (
    <div className="mb-8">
      <div className="hidden items-center sm:flex">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const active =
            stepNumber <= currentStep;

          return (
            <div
              key={step}
              className="flex flex-1 items-center"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                    active
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {stepNumber}
                </div>

                <span
                  className={`text-sm font-semibold ${
                    active
                      ? "text-gray-900"
                      : "text-gray-400"
                  }`}
                >
                  {step}
                </span>
              </div>

              {index <
                steps.length - 1 && (
                <div
                  className={`mx-4 h-px flex-1 ${
                    stepNumber <
                    currentStep
                      ? "bg-blue-600"
                      : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="sm:hidden">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          Step {currentStep} of {steps.length}
        </p>

        <p className="mt-1 text-lg font-bold text-gray-900">
          {steps[currentStep - 1]}
        </p>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-blue-600 transition-all"
            style={{
              width: `${
                (currentStep /
                  steps.length) *
                100
              }%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}