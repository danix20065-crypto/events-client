import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

export default function EmtpyState() {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 8,
        background: "white",
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      }}
    >
      <Typography
        variant="h5"
        sx={{ mb: 1, fontWeight: "600", color: "#667eea" }}
      >
        No events found
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
        Try adjusting your search or filters
      </Typography>
      <Link href="/events/create" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          Create an Event
        </Button>
      </Link>
    </Box>
  );
}
