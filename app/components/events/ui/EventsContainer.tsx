import { Box, Container, Grid } from "@mui/material";

import { EventsClientProps } from "@/app/pages/events";
import EmtpyState from "./EmtpyState";
import EventCard from "./EventCard";
import EventsFilters from "./EventsFilters";

export default function EventsContainer({
  events,
  currentPage,
  totalPages,
  limit,
  search,
  sortBy,
  sortOrder,
}: EventsClientProps) {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <EventsFilters
          currentPage={currentPage}
          totalPages={totalPages}
          limit={limit}
          search={search}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />
      </Box>

      {events.length === 0 ? (
        <EmtpyState />
      ) : (
        <>
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {events.map((event) => {
              return <EventCard key={event.id} event={event} />;
            })}
          </Grid>
        </>
      )}
    </Container>
  );
}
