import { Alert, Button, Container, Typography } from "@mui/material";
import Link from "next/link";

export default function ErrorState({ error }: { error: string }) {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Alert severity="error" sx={{ py: 3 }}>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {error}
        </Typography>
      </Alert>
      <Link href="/events" style={{ textDecoration: "none" }}>
        <Button variant="contained" sx={{ mt: 3 }}>
          Back to Events
        </Button>
      </Link>
    </Container>
  );
}
