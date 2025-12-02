import EventsPage from "@/app/pages/events";

import { apiClient } from "@/app/shared/api/api";

interface Props {
  searchParams?: {
    page?: string;
    limit?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
  };
}

export default async function Events({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 10;
  const search = params?.search || "";
  const sortBy = params?.sortBy || "created_at";
  const sortOrder = params?.sortOrder || "desc";

  const queryParams = new URLSearchParams();
  queryParams.set("page", String(page));
  queryParams.set("limit", String(limit));
  if (search) queryParams.set("search", search);
  if (sortBy) queryParams.set("sortBy", sortBy);
  if (sortOrder) queryParams.set("sortOrder", sortOrder);

  const response = await apiClient.get(`/event?${queryParams.toString()}`);

  const { events, totalPages } = response;

  return (
    <EventsPage
      events={events}
      currentPage={page}
      totalPages={totalPages}
      limit={limit}
      search={search}
      sortBy={sortBy}
      sortOrder={sortOrder}
    />
  );
}
