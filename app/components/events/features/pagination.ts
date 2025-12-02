export function pagination({
  newPage,
  selectedLimit,
  searchQuery,
  selectedSortBy,
  selectedSortOrder,
}: {
  newPage: number;
  selectedLimit: number;
  searchQuery: string;
  selectedSortBy: string;
  selectedSortOrder: string;
}) {
  const params = new URLSearchParams();
  params.set("page", String(newPage));
  params.set("limit", String(selectedLimit));
  if (searchQuery.trim()) params.set("search", searchQuery);
  if (selectedSortBy) params.set("sortBy", selectedSortBy);
  if (selectedSortOrder) params.set("sortOrder", selectedSortOrder);
  window.location.href = `?${params.toString()}`;
}
