import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  Edit,
  Eye,
  EyeOff,
  Plus,
  Trash2,
} from "lucide-react";

import type {
  Article,
} from "../../../features/home/homeData";

import {
  ARTICLES_UPDATED_EVENT,
  deleteArticle,
  getArticles,
  updateArticleStatus,
} from "../../../features/articles/articleService";

export function AdminArticles() {
  const [
    articles,
    setArticles,
  ] = useState<Article[]>(
    [],
  );

  /*
   * ============================================================
   * LOAD ARTICLES
   * ============================================================
   */

  const loadArticles = () => {
    setArticles(
      getArticles(),
    );
  };

  useEffect(() => {
    loadArticles();

    const handleUpdate =
      () => {
        loadArticles();
      };

    window.addEventListener(
      ARTICLES_UPDATED_EVENT,
      handleUpdate,
    );

    return () => {
      window.removeEventListener(
        ARTICLES_UPDATED_EVENT,
        handleUpdate,
      );
    };
  }, []);

  /*
   * ============================================================
   * ENABLE / DISABLE
   * ============================================================
   */

  const handleToggleStatus = (
    article: Article,
  ) => {
    const newStatus =
      article.status ===
      "ACTIVE"
        ? "DISABLED"
        : "ACTIVE";

    updateArticleStatus(
      article.id,
      newStatus,
    );

    loadArticles();
  };

  /*
   * ============================================================
   * DELETE
   * ============================================================
   */

  const handleDelete = (
    article: Article,
  ) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${article.title}"?`,
      );

    if (!confirmed) {
      return;
    }

    deleteArticle(
      article.id,
    );

    loadArticles();
  };

  return (
    <div className="p-6">

      {/* HEADER */}

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Articles
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage health articles displayed on your website.
          </p>
        </div>

        <Link
          to="/admin/articles/new"
          className="inline-flex items-center gap-2 rounded-lg bg-pink-700 px-5 py-3 text-sm font-semibold text-white hover:bg-pink-800"
        >
          <Plus
            size={18}
          />

          Add Article
        </Link>

      </div>

      {/* TABLE */}

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase text-gray-500">
                  Article
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase text-gray-500">
                  Category
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase text-gray-500">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-bold uppercase text-gray-500">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y">

              {articles.map(
                (article) => (
                  <tr
                    key={
                      article.id
                    }
                    className="hover:bg-gray-50"
                  >

                    {/* ARTICLE */}

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-4">

                        {article.image ? (
                          <img
                            src={
                              article.image
                            }
                            alt={
                              article.title
                            }
                            className="h-16 w-24 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="h-16 w-24 rounded-lg bg-gray-100" />
                        )}

                        <div>

                          <p className="font-semibold text-gray-900">
                            {
                              article.title
                            }
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            /
                            {
                              article.slug
                            }
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* CATEGORY */}

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {
                        article.category
                      }
                    </td>

                    {/* STATUS */}

                    <td className="px-5 py-4">

                      <span
                        className={`
                          inline-flex
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-bold
                          ${
                            article.status ===
                            "ACTIVE"
                              ? "bg-green-100 text-green-700"
                              : article.status ===
                                "DRAFT"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-600"
                          }
                        `}
                      >
                        {
                          article.status
                        }
                      </span>

                    </td>

                    {/* ACTIONS */}

                    <td className="px-5 py-4">

                      <div className="flex justify-end gap-2">

                        <Link
                          to={`/admin/articles/edit/${article.id}`}
                          className="rounded-lg border p-2 text-gray-600 hover:bg-gray-50"
                          title="Edit"
                        >
                          <Edit
                            size={17}
                          />
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            handleToggleStatus(
                              article,
                            )
                          }
                          className="rounded-lg border p-2 text-gray-600 hover:bg-gray-50"
                          title={
                            article.status ===
                            "ACTIVE"
                              ? "Disable"
                              : "Enable"
                          }
                        >
                          {article.status ===
                          "ACTIVE" ? (
                            <EyeOff
                              size={17}
                            />
                          ) : (
                            <Eye
                              size={17}
                            />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              article,
                            )
                          }
                          className="rounded-lg border p-2 text-red-600 hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2
                            size={17}
                          />
                        </button>

                      </div>

                    </td>

                  </tr>
                ),
              )}

            </tbody>

          </table>

        </div>

        {articles.length ===
          0 && (
          <div className="p-12 text-center text-sm text-gray-500">
            No articles found.
          </div>
        )}

      </div>
    </div>
  );
}