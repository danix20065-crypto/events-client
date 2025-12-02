import { Category } from "@/app/shared/interfaces/category";
import { EventInterface } from "@/app/shared/interfaces/event.interface";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EventDetailContent({
  event,
  handleEditOpen,
  handleDeleteOpen,
}: {
  event: EventInterface;
  handleEditOpen: () => void;
  handleDeleteOpen: () => void;
}) {
  const router = useRouter();
  return (
    <CardContent sx={{ p: 4 }}>
      <Stack spacing={3}>
        <Box>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="h6" sx={{ fontSize: 24 }}>
              📅
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ fontWeight: 600 }}
            >
              Date & Time
            </Typography>
          </Stack>
          <Typography variant="body1" sx={{ ml: 5, fontSize: 16 }}>
            {new Date(event.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="h6" sx={{ fontSize: 24 }}>
              🏷️
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ fontWeight: 600 }}
            >
              Categories
            </Typography>
          </Stack>

          <Box sx={{ ml: 5 }}>
            {event.categories && event.categories.length > 0 ? (
              event.categories.map((c: Category) => {
                const label = c.title;
                const key = c.id;
                return (
                  <Chip
                    key={key}
                    label={label}
                    sx={{ mr: 1, mb: 1, background: "#f1f5ff" }}
                  />
                );
              })
            ) : (
              <Typography variant="body2" color="textSecondary">
                No categories assigned
              </Typography>
            )}
          </Box>
        </Box>

        <Divider />

        <Box>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="h6" sx={{ fontSize: 24 }}>
              📍
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ fontWeight: 600 }}
            >
              Location
            </Typography>
          </Stack>
          <Typography variant="body1" sx={{ ml: 5, fontSize: 16 }}>
            {event.location}
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Stack
            direction="row"
            spacing={2}
            alignItems="flex-start"
            sx={{ mb: 2 }}
          >
            <Typography variant="h6" sx={{ fontSize: 24 }}>
              📝
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ fontWeight: 600 }}
            >
              Description
            </Typography>
          </Stack>
          <Typography
            variant="body1"
            sx={{ ml: 5, fontSize: 16, lineHeight: 1.8 }}
          >
            {event.description}
          </Typography>
        </Box>

        <Divider />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ mt: 4 }}
        >
          <Link href="/events" style={{ textDecoration: "none", flex: 1 }}>
            <Button fullWidth variant="outlined" size="large">
              Back to Events
            </Button>
          </Link>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleEditOpen}
          >
            Edit Event
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="error"
            size="large"
            onClick={handleDeleteOpen}
          >
            Delete Event
          </Button>
        </Stack>
        {event.relatedEvents && event.relatedEvents.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
              Related Events
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ alignItems: "stretch", overflow: "scroll" }}
            >
              {event.relatedEvents.map((re: EventInterface) => (
                <Card
                  key={re.id}
                  sx={{
                    flex: 1,
                    minWidth: 200,
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: 6,
                    },
                  }}
                  onClick={() => router.push(`/events/${re.id}`)}
                >
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 700, mb: 0.5 }}
                    >
                      {re.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {re.date
                        ? new Date(re.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : ""}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        )}
      </Stack>
    </CardContent>
  );
}
