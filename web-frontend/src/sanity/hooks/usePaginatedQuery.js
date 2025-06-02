import { useCallback, useState } from "react";
import { loadQuery } from "../lib/load-query";

const DEFAULT_PAGE_SIZE = 10;

export const usePaginatedQuery = (type, pageSize = DEFAULT_PAGE_SIZE) => {
  const [items, setItems] = useState([]);
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
    const query = `*[_type == "${type}"][${start}...${end}] | order(orderRank asc)`;
    const { data } = await loadQuery({ query });
    if (data.length === 0) {
      setHasReachedLastPage(true);
    }
    setItems((prev) => [...prev, ...data]);
    setPage((oldPage) => oldPage + 1);
    requestAnimationFrame(() => setIsLoading(false));
  }, [hasReachedLastPage, isLoading, page, pageSize, type]);

  return { items, fetchNextPage, isLoading };
};
