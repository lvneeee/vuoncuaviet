import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/lvneeee",
      Instargram: "https://www.instagram.com/viet.tin.bank/",
      Kaggle: "https://www.kaggle.com/lvneeee",
      Email: "mailto: leviethocdata@gmail.com",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      sortFn: (a, b) => {
        // custom order của folder gốc
        const rootOrder = ["Knowledge_Garden", "Study_Materials", "Random_Things"]
        
        // custom order của folder con trong knowledge garden
        const kgOrder = ["SQL", "R", "Python", "Excel", "Visualization", "Statistic Basic"]

        // custom order của SQL (so sánh bằng displayName)
        const sqlOrder = [
          "My First SQL Concepts: SELECT and FROM",
          "WHERE Clauses: My Journey into Data Filtering",
          "GROUP BY: From Raw Data to Meaningful Statistics"
        ];

        // Nếu là folder/file con của SQL
        if (
          a.slug?.startsWith("Knowledge_Garden/SQL/") &&
          b.slug?.startsWith("Knowledge_Garden/SQL/")
        ) {
          const idxA = sqlOrder.indexOf(a.displayName);
          const idxB = sqlOrder.indexOf(b.displayName);
          if (idxA !== -1 || idxB !== -1) return idxA - idxB;
        }

        // Nếu là folder con trong knowledge garden thì sort theo thứ tự của kgOrder
        if (a.slug?.startsWith("Knowledge_Garden/") && b.slug?.startsWith("Knowledge_Garden/")) {
          const idxA = kgOrder.indexOf(a.displayName)
          const idxB = kgOrder.indexOf(b.displayName)
          if (idxA !== -1 || idxB !== -1) return idxA - idxB
        }

        // Nếu là folder gốc thì sort theo thứ tự của rootOrder
        const idxA = rootOrder.indexOf(a.displayName)
        const idxB = rootOrder.indexOf(b.displayName)
        if (idxA !== -1 || idxB !== -1) return idxA - idxB

        // Mặc định sort theo thứ tự alphabet
        return a.displayName.localeCompare(b.displayName)
      },
    }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(
      {
      sortFn: (a, b) => {
        // custom order của folder con trong knowledge garden (dùng displayName)
        const kgOrder = ["SQL", "R", "Python", "Excel", "Visualization", "Statistic Basic"];
        // custom order của SQL (dùng displayName)
        const sqlOrder = [
          "My First SQL Concepts: SELECT and FROM",
          "WHERE Clauses: My Journey into Data Filtering",
          "GROUP BY: From Raw Data to Meaningful Statistics"
        ];

        // Nếu là folder/file con của SQL
        if (
          a.slug?.startsWith("Knowledge_Garden/SQL/") &&
          b.slug?.startsWith("Knowledge_Garden/SQL/")
        ) {
          const idxA = sqlOrder.indexOf(a.displayName);
          const idxB = sqlOrder.indexOf(b.displayName);
          if (idxA !== -1 || idxB !== -1) return idxA - idxB;
        }

        // Nếu là folder con trong knowledge garden thì sort theo thứ tự của kgOrder (dùng displayName)
        const idxA = kgOrder.indexOf(a.displayName);
        const idxB = kgOrder.indexOf(b.displayName);
        if (idxA !== -1 || idxB !== -1) return idxA - idxB;

        // Mặc định sort theo thứ tự alphabet
        return a.displayName.localeCompare(b.displayName);
      },
    }
  ),
  ],
  right: [],
}
