import { Alert, Button, Container, Typography } from "@mui/material";
import Link from "next/link";

export default function NotFoundEvent() {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Alert severity="info" sx={{ py: 3 }}>
        <Typography variant="body1">Event not found</Typography>
      </Alert>
      <Link href="/events" style={{ textDecoration: "none" }}>
        <Button variant="contained" sx={{ mt: 3 }}>
          Back to Events
        </Button>
      </Link>
    </Container>
  );
}
