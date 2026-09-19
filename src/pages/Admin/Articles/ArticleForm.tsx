import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  Save,
} from "lucide-react";

import type {
  ArticleStatus,
} from "../../../features/home/homeData";

import {
  addArticle,
  getArticleById,
  updateArticle,
} from "../../../features/articles/articleService";

export function ArticleForm() {
  const navigate = useNavigate();

  const { id } = useParams();

  const isEdit = Boolean(id);

  const [title, setTitle] =
    useState("");

  const [slug, setSlug] =
    useState("");

  const [excerpt, setExcerpt] =
    useState("");

  const [content, setContent] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [readTime, setReadTime] =
    useState("5 min read");

  const [image, setImage] =
    useState("");

  const [status, setStatus] =
    useState<ArticleStatus>("DRAFT");

  /*
   * ============================================================
   * LOAD ARTICLE
   * ============================================================
   */

  useEffect(() => {
    if (!id) {
      return;
    }

    const article =
      getArticleById(id);

    if (!article) {
      navigate("/admin/articles");
      return;
    }

    setTitle(article.title);
    setSlug(article.slug);
    setExcerpt(article.excerpt);

    /*
     * Load complete article content
     */
    setContent(article.content || "");

    setCategory(article.category);
    setReadTime(article.readTime);
    setImage(article.image);
    setStatus(article.status);
  }, [id, navigate]);

  /*
   * ============================================================
   * GENERATE SLUG
   * ============================================================
   */

  const generateSlug = (
    value: string,
  ) => {
    return value
      .toLowerCase()
      .trim()
      .replace(
        /[^a-z0-9]+/g,
        "-",
      )
      .replace(
        /^-+|-+$/g,
        "");
  };

  /*
   * ============================================================
   * SAVE ARTICLE
   * ============================================================
   */

  const handleSubmit = (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    if (!title.trim()) {
      alert(
        "Please enter article title.",
      );
      return;
    }

    if (!slug.trim()) {
      alert(
        "Please enter article slug.",
      );
      return;
    }

    if (!category.trim()) {
      alert(
        "Please enter category.",
      );
      return;
    }

    if (!excerpt.trim()) {
      alert(
        "Please enter article description.",
      );
      return;
    }

    if (!content.trim()) {
      alert(
        "Please enter article content.",
      );
      return;
    }

    /*
     * ==========================================================
     * ARTICLE DATA
     * ==========================================================
     */

    const articleData = {
      title: title.trim(),

      slug: slug.trim(),

      excerpt: excerpt.trim(),

      /*
       * Full article content
       */
      content: content.trim(),

      category: category.trim(),

      readTime: readTime.trim(),

      /*
       * Keep existing image path format
       *
       * Example:
       * /images/articles/ultrasound-myths-facts.jpeg
       */
      image: image.trim(),

      status,
    };

    /*
     * ==========================================================
     * UPDATE
     * ==========================================================
     */

    if (isEdit && id) {
      updateArticle(
        id,
        articleData,
      );
    }

    /*
     * ==========================================================
     * ADD
     * ==========================================================
     */

    else {
      addArticle(articleData);
    }

    navigate(
      "/admin/articles",
    );
  };

  return (
    <div className="p-6">

      {/* ========================================================
          HEADER
          ======================================================== */}

      <div className="mb-6 flex items-center gap-4">

        <button
          type="button"
          onClick={() =>
            navigate(
              "/admin/articles",
            )
          }
          className="
            rounded-lg
            border
            border-gray-200
            p-2
            hover:bg-gray-50
          "
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit
              ? "Edit Article"
              : "Add Article"}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {isEdit
              ? "Update article information"
              : "Create a new health article"}
          </p>
        </div>

      </div>

      {/* ========================================================
          FORM
          ======================================================== */}

      <form
        onSubmit={handleSubmit}
        className="
          max-w-4xl
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-6
          shadow-sm
        "
      >

        {/* ======================================================
            TITLE
            ====================================================== */}

        <div className="mb-5">

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Article Title
          </label>

          <input
            value={title}
            onChange={(event) => {

              const value =
                event.target.value;

              setTitle(value);

              /*
               * Automatically generate slug
               * only while creating article.
               */
              if (!isEdit) {
                setSlug(
                  generateSlug(value),
                );
              }
            }}
            placeholder="Enter article title"
            className="
              w-full
              rounded-lg
              border
              border-gray-300
              px-4
              py-3
              outline-none
              focus:border-pink-600
              focus:ring-1
              focus:ring-pink-600
            "
          />

        </div>

        {/* ======================================================
            SLUG
            ====================================================== */}

        <div className="mb-5">

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Slug
          </label>

          <input
            value={slug}
            onChange={(event) =>
              setSlug(
                generateSlug(
                  event.target.value,
                ),
              )
            }
            placeholder="article-slug"
            className="
              w-full
              rounded-lg
              border
              border-gray-300
              px-4
              py-3
              outline-none
              focus:border-pink-600
              focus:ring-1
              focus:ring-pink-600
            "
          />

          <p className="mt-1 text-xs text-gray-500">
            Example:
            ultrasound-myths-vs-facts
          </p>

        </div>

        {/* ======================================================
            CATEGORY
            ====================================================== */}

        <div className="mb-5">

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Category
          </label>

          <input
            value={category}
            onChange={(event) =>
              setCategory(
                event.target.value,
              )
            }
            placeholder="Ultrasound"
            className="
              w-full
              rounded-lg
              border
              border-gray-300
              px-4
              py-3
              outline-none
              focus:border-pink-600
              focus:ring-1
              focus:ring-pink-600
            "
          />

        </div>

        {/* ======================================================
            READ TIME
            ====================================================== */}

        <div className="mb-5">

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Read Time
          </label>

          <input
            value={readTime}
            onChange={(event) =>
              setReadTime(
                event.target.value,
              )
            }
            placeholder="5 min read"
            className="
              w-full
              rounded-lg
              border
              border-gray-300
              px-4
              py-3
              outline-none
              focus:border-pink-600
              focus:ring-1
              focus:ring-pink-600
            "
          />

        </div>

        {/* ======================================================
            IMAGE
            ====================================================== */}

        <div className="mb-5">

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Image Path
          </label>

          <input
            value={image}
            onChange={(event) =>
              setImage(
                event.target.value,
              )
            }
            placeholder="/images/articles/article.jpeg"
            className="
              w-full
              rounded-lg
              border
              border-gray-300
              px-4
              py-3
              outline-none
              focus:border-pink-600
              focus:ring-1
              focus:ring-pink-600
            "
          />

          <p className="mt-1 text-xs text-gray-500">
            Example:
            /images/articles/ultrasound-myths-facts.jpeg
          </p>

          {/* IMAGE PREVIEW */}

          {image.trim() && (
            <div className="mt-4">

              <p className="mb-2 text-xs font-semibold text-gray-500">
                Image Preview
              </p>

              <img
                src={image}
                alt={title || "Article preview"}
                className="
                  h-48
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  object-cover
                "
                onError={(event) => {
                  event.currentTarget.style.display =
                    "none";
                }}
              />

            </div>
          )}

        </div>

        {/* ======================================================
            EXCERPT
            ====================================================== */}

        <div className="mb-5">

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Article Description
          </label>

          <textarea
            value={excerpt}
            onChange={(event) =>
              setExcerpt(
                event.target.value,
              )
            }
            rows={4}
            placeholder="
Write a short description that will appear
on article cards and article listings...
"
            className="
              w-full
              rounded-lg
              border
              border-gray-300
              px-4
              py-3
              outline-none
              focus:border-pink-600
              focus:ring-1
              focus:ring-pink-600
            "
          />

        </div>

        {/* ======================================================
            ARTICLE CONTENT
            ====================================================== */}

        <div className="mb-5">

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Article Content
          </label>

          <textarea
            value={content}
            onChange={(event) =>
              setContent(
                event.target.value,
              )
            }
            rows={14}
            placeholder="
Write the complete article here...

Example:

Ultrasound is a commonly used diagnostic
imaging technique that uses high-frequency
sound waves to create images of structures
inside the body.

Unlike X-rays and CT scans, ultrasound
does not use ionizing radiation.

You can write multiple paragraphs here.
"
            className="
              w-full
              rounded-lg
              border
              border-gray-300
              px-4
              py-3
              leading-7
              outline-none
              focus:border-pink-600
              focus:ring-1
              focus:ring-pink-600
            "
          />

          <p className="mt-1 text-xs text-gray-500">
            Write the complete article content.
            Separate paragraphs with blank lines.
          </p>

        </div>

        {/* ======================================================
            STATUS
            ====================================================== */}

        <div className="mb-6">

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Status
          </label>

          <select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value as ArticleStatus,
              )
            }
            className="
              w-full
              rounded-lg
              border
              border-gray-300
              px-4
              py-3
              outline-none
              focus:border-pink-600
              focus:ring-1
              focus:ring-pink-600
            "
          >

            <option value="DRAFT">
              Draft
            </option>

            <option value="ACTIVE">
              Active
            </option>

            <option value="DISABLED">
              Disabled
            </option>

          </select>

        </div>

        {/* ======================================================
            ACTIONS
            ====================================================== */}

        <div className="flex items-center gap-3">

          <button
            type="button"
            onClick={() =>
              navigate(
                "/admin/articles",
              )
            }
            className="
              rounded-lg
              border
              border-gray-300
              px-6
              py-3
              text-sm
              font-semibold
              text-gray-700
              hover:bg-gray-50
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            className="
              inline-flex
              items-center
              gap-2
              rounded-lg
              bg-pink-700
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              hover:bg-pink-800
            "
          >

            <Save size={18} />

            {isEdit
              ? "Update Article"
              : "Save Article"}

          </button>

        </div>

      </form>
    </div>
  );
}