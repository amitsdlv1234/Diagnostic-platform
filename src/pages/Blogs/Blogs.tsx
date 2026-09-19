import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  ArrowRight,
  BookOpen,
} from "lucide-react";

import type {
  Article,
} from "../../features/home/homeData";

import {
  ARTICLES_UPDATED_EVENT,
  getActiveArticles,
} from "../../features/articles/articleService";

export function Blogs() {
  const [
    articles,
    setArticles,
  ] = useState<Article[]>([]);

  /*
   * ============================================================
   * LOAD ACTIVE ARTICLES
   * ============================================================
   */

  useEffect(() => {
    const loadArticles = () => {
      setArticles(
        getActiveArticles(),
      );
    };

    loadArticles();

    window.addEventListener(
      ARTICLES_UPDATED_EVENT,
      loadArticles,
    );

    return () => {
      window.removeEventListener(
        ARTICLES_UPDATED_EVENT,
        loadArticles,
      );
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ======================================================
          HEADER
          ====================================================== */}

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <span
            className="
              inline-flex
              rounded-full
              bg-pink-100
              px-4
              py-1.5
              text-xs
              font-bold
              uppercase
              tracking-widest
              text-pink-700
            "
          >
            Health & Wellness
          </span>

          <h1
            className="
              mt-4
              text-3xl
              font-bold
              text-gray-900
              sm:text-4xl
            "
          >
            Health Articles
          </h1>

          <p
            className="
              mt-3
              max-w-2xl
              text-gray-600
            "
          >
            Explore useful information about
            diagnostics, preventive health,
            pregnancy care and wellness.
          </p>

        </div>

      </section>

      {/* ======================================================
          ARTICLES
          ====================================================== */}

      <section
        className="
          px-4
          py-12
          sm:px-6
          lg:px-8
        "
      >

        <div
          className="
            mx-auto
            max-w-7xl
          "
        >

          {articles.length > 0 ? (

            <div
              className="
                grid
                gap-6
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >

              {articles.map(
                (article) => (

                  <article
                    key={article.id}
                    className="
                      group
                      overflow-hidden
                      rounded-2xl
                      border
                      border-gray-200
                      bg-white
                      shadow-sm
                      transition
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-lg
                    "
                  >

                    {/* IMAGE */}

                    <Link
                      to={`/blogs/${article.slug}`}
                      className="
                        block
                        overflow-hidden
                      "
                    >

                      {article.image ? (

                        <img
                          src={
                            article.image
                          }
                          alt={
                            article.title
                          }
                          className="
                            h-56
                            w-full
                            object-cover
                            transition
                            duration-500
                            group-hover:scale-105
                          "
                        />

                      ) : (

                        <div
                          className="
                            flex
                            h-56
                            items-center
                            justify-center
                            bg-pink-50
                          "
                        >
                          <BookOpen
                            size={48}
                            className="text-pink-700"
                          />
                        </div>

                      )}

                    </Link>

                    {/* CONTENT */}

                    <div className="p-6">

                      {/* CATEGORY */}

                      <span
                        className="
                          text-xs
                          font-bold
                          uppercase
                          tracking-wide
                          text-pink-700
                        "
                      >
                        {
                          article.category
                        }
                      </span>

                      {/* TITLE */}

                      <Link
                        to={`/blogs/${article.slug}`}
                      >

                        <h2
                          className="
                            mt-3
                            line-clamp-2
                            text-xl
                            font-bold
                            text-gray-900
                          "
                        >
                          {
                            article.title
                          }
                        </h2>

                      </Link>

                      {/* EXCERPT */}

                      <p
                        className="
                          mt-3
                          line-clamp-3
                          text-sm
                          leading-6
                          text-gray-600
                        "
                      >
                        {
                          article.excerpt
                        }
                      </p>

                      {/* FOOTER */}

                      <div
                        className="
                          mt-6
                          flex
                          items-center
                          justify-between
                        "
                      >

                        <span
                          className="
                            text-xs
                            text-gray-500
                          "
                        >
                          {
                            article.readTime
                          }
                        </span>

                        <Link
                          to={`/blogs/${article.slug}`}
                          className="
                            inline-flex
                            items-center
                            gap-1
                            text-sm
                            font-semibold
                            text-pink-700
                          "
                        >
                          Read more

                          <ArrowRight
                            size={15}
                          />
                        </Link>

                      </div>

                    </div>

                  </article>

                ),
              )}

            </div>

          ) : (

            <div
              className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-12
                text-center
              "
            >

              <BookOpen
                size={42}
                className="
                  mx-auto
                  text-gray-300
                "
              />

              <p
                className="
                  mt-4
                  text-gray-500
                "
              >
                No articles are
                currently available.
              </p>

            </div>

          )}

        </div>

      </section>

    </main>
  );
}