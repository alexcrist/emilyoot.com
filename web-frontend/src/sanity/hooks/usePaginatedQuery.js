import { useCallback, useMemo, useState } from "react";
import { loadQuery } from "../lib/load-query";

const DEFAULT_PAGE_SIZE = 10;

export const usePaginatedQuery = (type, pageSize = DEFAULT_PAGE_SIZE) => {
  const [pages, setPages] = useState({});
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasReachedLastPage, setHasReachedLastPage] = useState(false);

  const fetchNextPage = useCallback(async () => {
    if (isLoading) {
      return;
    }
    if (hasReachedLastPage) {
      return;
    }
    setIsLoading(true);
    const start = page * pageSize;
    const end = start + pageSize;
    const { data } = await loadQuery({
      query: `*[_type == $type]|order(orderRank asc)[${start}...${end}]`,
      params: { type },
    });
    if (data.length === 0) {
      setHasReachedLastPage(true);
    }
    setPages((oldPages) => {
      return {
        ...oldPages,
        [page]: data,
      };
    });
    setPage((oldPage) => oldPage + 1);
    requestAnimationFrame(() => setIsLoading(false));
  }, [hasReachedLastPage, isLoading, page, pageSize, type]);

  const items = useMemo(() => {
    const items = [];
    for (const page in pages) {
      const pageItems = pages[page];
      for (let i = 0; i < pageItems.length; i++) {
        const item = pageItems[i];
        const itemIndex = i + page * pageSize;
        items[itemIndex] = item;
      }
    }
    return items;
  }, [pageSize, pages]);

  return { items, fetchNextPage, isLoading };
};
