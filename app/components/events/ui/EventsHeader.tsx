import { Box, Container, Typography } from "@mui/material";

export default function EventsHeader() {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        py: 6,
        mb: 6,
        boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h1"
          sx={{ fontWeight: "800", mb: 1, letterSpacing: "-0.5px" }}
        >
          🎉 Discover Events
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "300", opacity: 0.9 }}>
          Explore and manage your upcoming events
        </Typography>
      </Container>
    </Box>
  );
}
