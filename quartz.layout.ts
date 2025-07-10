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
    // Custom Explorer: giữ thứ tự thư mục như hiện tại nhưng bỏ số thứ tự ở đầu tên
    Component.Explorer({
      // Custom sort: main folders và các folder con của Knowledge Garden
      sortFn: (a, b) => {
        // Thứ tự các folder chính
        const customMainFolderOrder = [
          "Knowledge Garden",
          "Study_Materials",
          "Random_Things"
        ];
        // Thứ tự các folder con của Knowledge Garden
        const knowledgeGardenSubOrder = [,
          "SQL",
          "R",
          "Python",
          "Excel",
          "Statistic Basic",
          "Visualization",
        ];
        // Nếu là folder con của Knowledge Garden
        // Giả sử các folder con của Knowledge Garden có tên dạng "Knowledge Garden/xxx"
        const isSubOfKnowledgeGarden = (node: any) =>
          node.path?.startsWith?.("Knowledge_Garden/") || false;
        if (isSubOfKnowledgeGarden(a) && isSubOfKnowledgeGarden(b)) {
          const aSub = a.displayName;
          const bSub = b.displayName;
          const idxA = knowledgeGardenSubOrder.indexOf(aSub);
          const idxB = knowledgeGardenSubOrder.indexOf(bSub);
          if (idxA === -1 && idxB === -1) return aSub.localeCompare(bSub);
          if (idxA === -1) return 1;
          if (idxB === -1) return -1;
          return idxA - idxB;
        }
        // Nếu là các folder chính
        const idxA = customMainFolderOrder.indexOf(a.displayName);
        const idxB = customMainFolderOrder.indexOf(b.displayName);
        if (idxA === -1 && idxB === -1) return a.displayName.localeCompare(b.displayName);
        if (idxA === -1) return 1;
        if (idxB === -1) return -1;
        return idxA - idxB;
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
    // Custom Explorer: giữ thứ tự thư mục như hiện tại nhưng bỏ số thứ tự ở đầu tên
    Component.Explorer({
      sortFn: (a, b) => {
        const customMainFolderOrder = [
          "Knowledge Garden",
          "Study_Materials",
          "Random_Things"
        ]
        const idxA = customMainFolderOrder.indexOf(a.displayName)
        const idxB = customMainFolderOrder.indexOf(b.displayName)
        if (idxA === -1 && idxB === -1) return a.displayName.localeCompare(b.displayName)
        if (idxA === -1) return 1
        if (idxB === -1) return -1
        return idxA - idxB
      },
      mapFn: (node) => {
        node.displayName = node.displayName.replace(/^\d+_/, "")
      },
    }),
  ],
  right: [],
}
