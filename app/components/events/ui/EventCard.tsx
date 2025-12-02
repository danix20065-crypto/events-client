import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { EventInterface } from "@/app/shared/interfaces/event.interface";

export default function EventCard({ event }: { event: EventInterface }) {
  const eventDate = new Date(event.date);
  const isUpcoming = eventDate > new Date();
  const createdAt = new Date(event.created_at);

  const formattedCreatedAt = createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Grid item xs={12} sm={6} md={4} key={event.id}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          overflow: "visible",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 20px 40px rgba(102, 126, 234, 0.2)",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -12,
            right: 16,
            zIndex: 1,
          }}
        >
          <Chip
            label={isUpcoming ? "Upcoming" : "Past"}
            size="small"
            sx={{
              background: isUpcoming
                ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                : "#ccc",
              color: "white",
              fontWeight: "600",
              boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
            }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1, pt: 3 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            sx={{
              fontWeight: "700",
              mb: 2,
              color: "#333",
              lineHeight: 1.3,
            }}
          >
            {event.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 1.5,
              padding: "8px 12px",
              background: "#f5f7fa",
              borderRadius: 1.5,
            }}
          >
            <Typography variant="body2" sx={{ fontSize: 18 }}>
              📅
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "600",
                color: "#667eea",
              }}
            >
              {eventDate.toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 2,
              padding: "8px 12px",
              background: "#f5f7fa",
              borderRadius: 1.5,
            }}
          >
            <Typography variant="body2" sx={{ fontSize: 18 }}>
              📍
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "600",
                color: "#666",
              }}
            >
              {event.location}
            </Typography>
          </Box>

          <Box
            sx={{
              padding: "12px",
              background: "#f9fafb",
              borderLeft: "3px solid #667eea",
              borderRadius: "0 4px 4px 0",
              mb: 2,
            }}
          >
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                lineHeight: 1.5,
                color: "#555",
              }}
            >
              {event.description}
            </Typography>
          </Box>

          <Typography
            variant="caption"
            display="block"
            sx={{
              textAlign: "right",
              mt: 2,
              color: "#999",
              fontStyle: "italic",
            }}
          >
            Created on: {formattedCreatedAt}
          </Typography>
        </CardContent>

        <CardActions sx={{ pt: 0 }}>
          <Link
            href={`/events/${event.id}`}
            style={{ textDecoration: "none", width: "100%" }}
          >
            <Button
              fullWidth
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                textTransform: "none",
                fontWeight: "600",
                fontSize: "0.95rem",
                py: 1,
                "&:hover": {
                  boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
                },
              }}
            >
              View Details →
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
}
