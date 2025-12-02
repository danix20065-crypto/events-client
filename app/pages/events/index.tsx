import { EventInterface } from "../../shared/interfaces/event.interface";
import { Box } from "@mui/material";

import EventsHeader from "../../components/events/ui/EventsHeader";
import EventsContainer from "@/app/components/events/ui/EventsContainer";

export interface EventsClientProps {
  events: EventInterface[];
  currentPage: number;
  totalPages: number;
  limit: number;
  search: string;
  sortBy?: string;
  sortOrder?: string;
}

export default function EventsPage({
  events,
  currentPage,
  totalPages,
  limit,
  search,
  sortBy,
  sortOrder,
}: EventsClientProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <EventsHeader />

      <EventsContainer
        events={events}
        currentPage={currentPage}
        totalPages={totalPages}
        limit={limit}
        search={search}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
    </Box>
  );
}
