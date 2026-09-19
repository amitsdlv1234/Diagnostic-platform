import {
  articles as defaultArticles,
  type Article,
  type ArticleStatus,
} from "../home/homeData";

const STORAGE_KEY = "diagnostic_articles";

export const ARTICLES_UPDATED_EVENT =
  "diagnostic-articles-updated";

/*
 * ============================================================
 * GET ALL ARTICLES
 * ============================================================
 */

export function getArticles(): Article[] {
  try {
    const stored =
      localStorage.getItem(STORAGE_KEY);

    /*
     * First time application is opened.
     * Use articles from homeData.ts
     */
    if (!stored) {
      const initialArticles =
        structuredClone(defaultArticles);

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(initialArticles),
      );

      return initialArticles;
    }

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return structuredClone(defaultArticles);
    }

    return parsed as Article[];
  } catch {
    return structuredClone(defaultArticles);
  }
}

/*
 * ============================================================
 * GET ACTIVE ARTICLES
 * ============================================================
 */

export function getActiveArticles(): Article[] {
  return getArticles().filter(
    (article) =>
      article.status === "ACTIVE",
  );
}

/*
 * ============================================================
 * GET ARTICLE BY ID
 * ============================================================
 */

export function getArticleById(
  id: string,
): Article | undefined {
  return getArticles().find(
    (article) =>
      article.id === id,
  );
}

/*
 * ============================================================
 * GET ARTICLE BY SLUG
 * ============================================================
 */

export function getArticleBySlug(
  slug: string,
): Article | undefined {
  return getArticles().find(
    (article) =>
      article.slug === slug,
  );
}

/*
 * ============================================================
 * SAVE ALL ARTICLES
 * ============================================================
 */

function saveArticles(
  articles: Article[],
): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(articles),
  );

  window.dispatchEvent(
    new CustomEvent(
      ARTICLES_UPDATED_EVENT,
    ),
  );
}

/*
 * ============================================================
 * ADD ARTICLE
 * ============================================================
 */

export function addArticle(
  article: Omit<Article, "id">,
): Article {
  const articles =
    getArticles();

  const newArticle: Article = {
    ...article,
    id: crypto.randomUUID(),
  };

  articles.push(newArticle);

  saveArticles(articles);

  return newArticle;
}

/*
 * ============================================================
 * UPDATE ARTICLE
 * ============================================================
 */

export function updateArticle(
  id: string,
  updatedArticle: Omit<Article, "id">,
): Article | undefined {
  const articles =
    getArticles();

  const index =
    articles.findIndex(
      (article) =>
        article.id === id,
    );

  if (index === -1) {
    return undefined;
  }

  const updated: Article = {
    ...updatedArticle,
    id,
  };

  articles[index] = updated;

  saveArticles(articles);

  return updated;
}

/*
 * ============================================================
 * UPDATE ARTICLE STATUS
 * ============================================================
 */

export function updateArticleStatus(
  id: string,
  status: ArticleStatus,
): Article | undefined {
  const articles =
    getArticles();

  const index =
    articles.findIndex(
      (article) =>
        article.id === id,
    );

  if (index === -1) {
    return undefined;
  }

  articles[index] = {
    ...articles[index],
    status,
  };

  saveArticles(articles);

  return articles[index];
}

/*
 * ============================================================
 * DELETE ARTICLE
 * ============================================================
 */

export function deleteArticle(
  id: string,
): boolean {
  const articles =
    getArticles();

  const filtered =
    articles.filter(
      (article) =>
        article.id !== id,
    );

  if (
    filtered.length ===
    articles.length
  ) {
    return false;
  }

  saveArticles(filtered);

  return true;
}