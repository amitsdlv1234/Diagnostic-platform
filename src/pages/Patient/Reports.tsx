import {
  FileText,
} from "lucide-react";

export function Reports() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          My Reports
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Access your diagnostic reports securely.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
        <FileText
          size={35}
          className="mx-auto text-blue-600"
        />

        <h3 className="mt-4 text-lg font-bold text-gray-900">
          No reports available
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
          Your completed diagnostic reports will appear
          here.
        </p>
      </div>
    </div>
  );
}