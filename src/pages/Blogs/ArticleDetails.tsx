import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
} from "lucide-react";

import type {
  Article,
} from "../../features/home/homeData";

import {
  getArticleBySlug,
} from "../../features/articles/articleService";

export function ArticleDetails() {
  const {
    slug,
  } = useParams();

  const [
    article,
    setArticle,
  ] = useState<Article | undefined>();

  /*
   * ============================================================
   * LOAD ARTICLE
   * ============================================================
   */

  useEffect(() => {
    if (!slug) {
      return;
    }

    const foundArticle =
      getArticleBySlug(slug);

    setArticle(
      foundArticle,
    );
  }, [slug]);

  /*
   * ============================================================
   * ARTICLE NOT FOUND
   * ============================================================
   */

  if (
    !article ||
    article.status !== "ACTIVE"
  ) {
    return (
      <main
        className="
          flex
          min-h-[60vh]
          items-center
          justify-center
          px-4
        "
      >

        <div className="text-center">

          <h1
            className="
              text-2xl
              font-bold
              text-gray-900
            "
          >
            Article not found
          </h1>

          <p
            className="
              mt-2
              text-gray-500
            "
          >
            This article is no longer
            available.
          </p>

          <Link
            to="/blogs"
            className="
              mt-5
              inline-flex
              rounded-lg
              bg-pink-700
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              hover:bg-pink-800
            "
          >
            View all articles
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main
      className="
        min-h-screen
        bg-white
      "
    >

      {/* ======================================================
          ARTICLE HEADER
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
            max-w-4xl
          "
        >

          {/* BACK */}

          <Link
            to="/blogs"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-pink-700
              hover:text-pink-800
            "
          >
            <ArrowLeft
              size={16}
            />

            All articles
          </Link>

          {/* ARTICLE INFORMATION */}

          <div className="mt-8">

            {/* CATEGORY */}

            <span
              className="
                text-xs
                font-bold
                uppercase
                tracking-widest
                text-pink-700
              "
            >
              {article.category}
            </span>

            {/* TITLE */}

            <h1
              className="
                mt-3
                text-3xl
                font-bold
                leading-tight
                text-gray-900
                sm:text-4xl
                lg:text-5xl
              "
            >
              {article.title}
            </h1>

            {/* READ TIME */}

            <div
              className="
                mt-4
                text-sm
                text-gray-500
              "
            >
              {article.readTime}
            </div>

          </div>

        </div>

      </section>

      {/* ======================================================
          FEATURE IMAGE
          ====================================================== */}

      {article.image && (

        <section
          className="
            px-4
            sm:px-6
            lg:px-8
          "
        >

          <div
            className="
              mx-auto
              max-w-5xl
              overflow-hidden
              rounded-2xl
              bg-gray-50
            "
          >

            <img
              src={article.image}
              alt={article.title}
              className="
                block
                h-auto
                w-full
                object-contain
              "
            />

          </div>

        </section>

      )}

      {/* ======================================================
          ARTICLE CONTENT
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
            max-w-3xl
          "
        >

          {/* EXCERPT */}

          <p
            className="
              text-lg
              font-medium
              leading-8
              text-gray-700
            "
          >
            {article.excerpt}
          </p>

          {/* CONTENT */}

          <div
            className="
              mt-8
              border-t
              border-gray-200
              pt-8
            "
          >

            {article.content ? (

              <div
                className="
                  whitespace-pre-line
                  text-base
                  leading-8
                  text-gray-700
                "
              >
                {article.content}
              </div>

            ) : (

              <p
                className="
                  leading-8
                  text-gray-700
                "
              >
                This article provides
                useful information to
                help you understand
                the topic and make
                informed healthcare
                decisions.
              </p>

            )}

          </div>

          {/* BACK TO ARTICLES */}

          <div
            className="
              mt-10
              border-t
              border-gray-200
              pt-6
            "
          >

            <Link
              to="/blogs"
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-pink-700
                hover:text-pink-800
              "
            >

              <ArrowLeft
                size={16}
              />

              Back to all articles

            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}