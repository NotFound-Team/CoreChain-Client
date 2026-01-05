import { TNavigationItem } from "@/configs/layout";

export const getFlattenedPages = (items: TNavigationItem[]): TNavigationItem[] => {
  let pages: TNavigationItem[] = [];
  items.forEach((item) => {
    if (item.href && item.href !== "#") {
      pages.push(item);
    }
    if (item.childrens && item.childrens.length > 0) {
      pages = [...pages, ...getFlattenedPages(item.childrens)];
    }
  });
  return pages;
};
