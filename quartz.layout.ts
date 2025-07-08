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
      Email: "mailto: leviethocdata@gmail.com"
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
      // Mảng customOrder chứa tên gốc các thư mục con trong content (có số thứ tự)
      sortFn: (a, b) => {
        const customOrder = [
          "Knowledge Garden",
          "Study_Materials",
          "Random_Things"
        ];
        const idxA = customOrder.indexOf(a.displayName);
        const idxB = customOrder.indexOf(b.displayName);
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
        const customOrder = [
          "1_Learning_Journey",
          "2_Study_Materials",
          "3_Random_Things"
        ];
        const idxA = customOrder.indexOf(a.displayName);
        const idxB = customOrder.indexOf(b.displayName);
        if (idxA === -1 && idxB === -1) return a.displayName.localeCompare(b.displayName);
        if (idxA === -1) return 1;
        if (idxB === -1) return -1;
        return idxA - idxB;
      },
      mapFn: (node) => {
        node.displayName = node.displayName.replace(/^\d+_/, "");
      },
    }),
  ],
  right: [],
}
