import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "../../../components/common/Container";
import { SectionHeading } from "../../../components/common/SectionHeading";
import { articles } from "../../../features/home/homeData";

export function ArticlesSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Health & Wellness"
            title="Latest health articles"
            description="Useful information to help you make informed health decisions."
          />

          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
          >
            View all articles
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
            >
              <div className="flex h-48 items-center justify-center bg-gradient-to-br from-blue-100 to-teal-100">
                <BookOpen
                  size={48}
                  className="text-blue-600"
                />
              </div>

              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  {article.category}
                </span>

                <h3 className="mt-3 text-lg font-bold text-gray-900">
                  {article.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {article.excerpt}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {article.readTime}
                  </span>

                  <Link
                    to={`/blogs/${article.id}`}
                    className="text-sm font-semibold text-blue-600"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}