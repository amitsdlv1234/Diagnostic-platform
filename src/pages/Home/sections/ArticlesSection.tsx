import {
  ArrowRight,
  BookOpen,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  Container,
} from "../../../components/common/Container";

import {
  useTheme,
} from "../../../components/theme/ThemeProvider";

import type {
  Article,
} from "../../../features/home/homeData";

import {
  ARTICLES_UPDATED_EVENT,
  getActiveArticles,
} from "../../../features/articles/articleService";

export function ArticlesSection() {
  const {
    getSectionColors,
  } = useTheme();

  const colors =
    getSectionColors(
      "articles",
    );

  const [
    articles,
    setArticles,
  ] = useState<Article[]>(
    [],
  );

  /*
   * ============================================================
   * LOAD ACTIVE ARTICLES
   * ============================================================
   */

  const loadArticles = () => {
    const activeArticles =
      getActiveArticles();

    /*
     * HOME ONLY SHOWS FIRST 3
     */

    setArticles(
      activeArticles.slice(
        0,
        3,
      ),
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

  return (
    <section
      className="py-16 sm:py-20"
      style={{
        backgroundColor:
          colors.background,
      }}
    >
      <Container>

        {/* HEADER */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <span
              className="inline-flex rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest"
              style={{
                backgroundColor:
                  `${colors.accent}15`,
                color:
                  colors.accent,
              }}
            >
              Health & Wellness
            </span>

            <h2
              className="mt-3 text-2xl font-bold sm:text-3xl"
              style={{
                color:
                  colors.heading,
              }}
            >
              Latest health articles
            </h2>

            <p
              className="mt-2 max-w-xl text-sm leading-6"
              style={{
                color:
                  colors.text,
              }}
            >
              Useful information to help
              you make informed health
              decisions.
            </p>

          </div>

          {/* VIEW ALL */}

          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 self-start rounded-lg border px-4 py-2 text-sm font-semibold transition sm:self-auto"
            style={{
              color:
                colors.accent,
              borderColor:
                colors.accent,
            }}
          >
            View all articles

            <ArrowRight
              size={17}
            />
          </Link>

        </div>

        {/* ARTICLES */}

        {articles.length >
          0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-3">

            {articles.map(
              (article) => (
                <article
                  key={
                    article.id
                  }
                  className="group overflow-hidden rounded-2xl border transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    backgroundColor:
                      colors.cardBackground,
                    borderColor:
                      colors.border,
                  }}
                >

                  {/* IMAGE */}

                  <Link
                    to={`/blogs/${article.slug}`}
                    className="block overflow-hidden"
                  >

                    {article.image ? (
                      <img
                        src={
                          article.image
                        }
                        alt={
                          article.title
                        }
                        className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className="flex h-52 items-center justify-center"
                        style={{
                          background:
                            `linear-gradient(135deg, ${colors.accent}18, ${colors.accent}35)`,
                        }}
                      >
                        <BookOpen
                          size={
                            48
                          }
                          style={{
                            color:
                              colors.accent,
                          }}
                        />
                      </div>
                    )}

                  </Link>

                  {/* CONTENT */}

                  <div className="p-6">

                    <span
                      className="text-xs font-bold uppercase tracking-wide"
                      style={{
                        color:
                          colors.accent,
                      }}
                    >
                      {
                        article.category
                      }
                    </span>

                    <Link
                      to={`/blogs/${article.slug}`}
                    >
                      <h3
                        className="mt-3 line-clamp-2 text-lg font-bold"
                        style={{
                          color:
                            colors.heading,
                        }}
                      >
                        {
                          article.title
                        }
                      </h3>
                    </Link>

                    <p
                      className="mt-2 line-clamp-2 text-sm leading-6"
                      style={{
                        color:
                          colors.text,
                      }}
                    >
                      {
                        article.excerpt
                      }
                    </p>

                    <div className="mt-5 flex items-center justify-between">

                      <span
                        className="text-xs"
                        style={{
                          color:
                            colors.text,
                        }}
                      >
                        {
                          article.readTime
                        }
                      </span>

                      <Link
                        to={`/blogs/${article.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold"
                        style={{
                          color:
                            colors.accent,
                        }}
                      >
                        Read more

                        <ArrowRight
                          size={
                            15
                          }
                        />
                      </Link>

                    </div>

                  </div>

                </article>
              ),
            )}

          </div>
        ) : (
          <div className="mt-10 rounded-2xl border p-10 text-center">
            <p
              className="text-sm"
              style={{
                color:
                  colors.text,
              }}
            >
              No health articles are
              currently available.
            </p>
          </div>
        )}

      </Container>
    </section>
  );
}

// import {
//   ArrowRight,
//   BookOpen,
// } from "lucide-react";

// import { Link } from "react-router-dom";

// import { Container } from "../../../components/common/Container";
// import { useTheme } from "../../../components/theme/ThemeProvider";

// import { articles } from "../../../features/home/homeData";

// export function ArticlesSection() {
//   const { getSectionColors } = useTheme();

//   const colors = getSectionColors("articles");

//   /*
//    * Only show active articles on the public website.
//    *
//    * Show maximum 3 articles on Home page.
//    */
//   const activeArticles = articles
//     .filter((article) => article.status === "ACTIVE")
//     .slice(0, 6);

//   return (
//     <section
//       className="py-16 sm:py-20"
//       style={{
//         backgroundColor: colors.background,
//       }}
//     >
//       <Container>

//         {/* =====================================================
//             HEADER
//             ===================================================== */}

//         <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

//           <div>

//             {/* Eyebrow */}

//             <span
//               className="
//                 inline-flex
//                 rounded-full
//                 px-4
//                 py-1.5
//                 text-[10px]
//                 font-bold
//                 uppercase
//                 tracking-widest
//               "
//               style={{
//                 backgroundColor: `${colors.accent}15`,
//                 color: colors.accent,
//               }}
//             >
//               Health & Wellness
//             </span>

//             {/* Heading */}

//             <h2
//               className="
//                 mt-3
//                 text-2xl
//                 font-bold
//                 sm:text-3xl
//               "
//               style={{
//                 color: colors.heading,
//               }}
//             >
//               Latest health articles
//             </h2>

//             {/* Description */}

//             <p
//               className="
//                 mt-2
//                 max-w-xl
//                 text-sm
//                 leading-6
//               "
//               style={{
//                 color: colors.text,
//               }}
//             >
//               Helpful information about diagnostics,
//               ultrasound, pregnancy care and preventive health.
//             </p>

//           </div>

//           {/* =====================================================
//               VIEW ALL
//               ===================================================== */}

//           <Link
//             to="/blogs"
//             className="
//               inline-flex
//               items-center
//               gap-2
//               self-start
//               rounded-lg
//               border
//               px-4
//               py-2
//               text-sm
//               font-semibold
//               transition
//               sm:self-auto
//             "
//             style={{
//               color: colors.accent,
//               borderColor: colors.accent,
//             }}
//             onMouseEnter={(event) => {
//               event.currentTarget.style.backgroundColor =
//                 colors.accent;

//               event.currentTarget.style.color =
//                 colors.buttonText;
//             }}
//             onMouseLeave={(event) => {
//               event.currentTarget.style.backgroundColor =
//                 "transparent";

//               event.currentTarget.style.color =
//                 colors.accent;
//             }}
//           >
//             View all articles

//             <ArrowRight size={17} />
//           </Link>

//         </div>

//         {/* =====================================================
//             ARTICLE CARDS
//             ===================================================== */}

//         {activeArticles.length > 0 ? (

//           <div className="mt-10 grid gap-6 md:grid-cols-3">

//             {activeArticles.map((article) => (

//               <article
//                 key={article.id}
//                 className="
//                   group
//                   overflow-hidden
//                   rounded-2xl
//                   border
//                   transition
//                   duration-300
//                   hover:-translate-y-1
//                   hover:shadow-lg
//                 "
//                 style={{
//                   backgroundColor:
//                     colors.cardBackground,

//                   borderColor:
//                     colors.border,
//                 }}
//               >

//                 {/* =================================================
//                     ARTICLE IMAGE
//                     ================================================= */}

//                 <Link
//                   to={`/blogs/${article.slug}`}
//                   className="block overflow-hidden"
//                 >

//                   {article.image ? (

//                     <img
//                       src={article.image}
//                       alt={article.title}
//                       loading="lazy"
//                       className="
//                         h-52
//                         w-full
//                         object-cover
//                         transition
//                         duration-500
//                         group-hover:scale-105
//                       "
//                     />

//                   ) : (

//                     <div
//                       className="
//                         flex
//                         h-52
//                         items-center
//                         justify-center
//                       "
//                       style={{
//                         background:
//                           `linear-gradient(
//                             135deg,
//                             ${colors.accent}18,
//                             ${colors.accent}35
//                           )`,
//                       }}
//                     >
//                       <BookOpen
//                         size={48}
//                         style={{
//                           color: colors.accent,
//                         }}
//                       />
//                     </div>

//                   )}

//                 </Link>

//                 {/* =================================================
//                     ARTICLE CONTENT
//                     ================================================= */}

//                 <div className="p-6">

//                   {/* Category */}

//                   <span
//                     className="
//                       text-xs
//                       font-bold
//                       uppercase
//                       tracking-wide
//                     "
//                     style={{
//                       color: colors.accent,
//                     }}
//                   >
//                     {article.category}
//                   </span>

//                   {/* Title */}

//                   <Link
//                     to={`/blogs/${article.slug}`}
//                   >
//                     <h3
//                       className="
//                         mt-3
//                         line-clamp-2
//                         text-lg
//                         font-bold
//                         transition
//                         hover:opacity-80
//                       "
//                       style={{
//                         color: colors.heading,
//                       }}
//                     >
//                       {article.title}
//                     </h3>
//                   </Link>

//                   {/* Excerpt */}

//                   <p
//                     className="
//                       mt-2
//                       line-clamp-2
//                       text-sm
//                       leading-6
//                     "
//                     style={{
//                       color: colors.text,
//                     }}
//                   >
//                     {article.excerpt}
//                   </p>

//                   {/* =================================================
//                       FOOTER
//                       ================================================= */}

//                   <div
//                     className="
//                       mt-5
//                       flex
//                       items-center
//                       justify-between
//                     "
//                   >

//                     {/* Read Time */}

//                     <span
//                       className="text-xs"
//                       style={{
//                         color: colors.text,
//                       }}
//                     >
//                       {article.readTime}
//                     </span>

//                     {/* Read More */}

//                     <Link
//                       to={`/blogs/${article.slug}`}
//                       className="
//                         inline-flex
//                         items-center
//                         gap-1
//                         text-sm
//                         font-semibold
//                       "
//                       style={{
//                         color: colors.accent,
//                       }}
//                     >
//                       Read more

//                       <ArrowRight
//                         size={15}
//                       />
//                     </Link>

//                   </div>

//                 </div>

//               </article>

//             ))}

//           </div>

//         ) : (

//           /* =====================================================
//              NO ACTIVE ARTICLES
//              ===================================================== */

//           <div
//             className="
//               mt-10
//               rounded-2xl
//               border
//               p-10
//               text-center
//             "
//             style={{
//               backgroundColor:
//                 colors.cardBackground,

//               borderColor:
//                 colors.border,
//             }}
//           >

//             <BookOpen
//               size={40}
//               className="mx-auto"
//               style={{
//                 color: colors.accent,
//               }}
//             />

//             <p
//               className="mt-4 text-sm"
//               style={{
//                 color: colors.text,
//               }}
//             >
//               No health articles are currently available.
//             </p>

//           </div>

//         )}

//       </Container>
//     </section>
//   );
// }