import { Link } from "react-router-dom";
import { Container } from "../common/Container";
import { footerNavigation } from "../../constants/navigation";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-950 text-gray-300">
      <Container>
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <span className="font-bold">D</span>
              </div>

              <div>
                <p className="font-bold text-white">
                  Diagnostic
                </p>
                <p className="text-xs text-blue-400">
                  Platform
                </p>
              </div>
            </div>

            <p className="max-w-xs text-sm leading-6 text-gray-400">
              Convenient diagnostic testing with trusted
              laboratory services and digital reports.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">
              Company
            </h3>

            <div className="flex flex-col gap-3">
              {footerNavigation.company.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-sm text-gray-400 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">
              Support
            </h3>

            <div className="flex flex-col gap-3">
              {footerNavigation.support.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-sm text-gray-400 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">
              Legal
            </h3>

            <div className="flex flex-col gap-3">
              {footerNavigation.legal.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-sm text-gray-400 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 py-5 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Diagnostic Platform.
          All rights reserved.
        </div>
      </Container>
    </footer>
  );
}