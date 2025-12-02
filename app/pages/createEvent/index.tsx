import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import { Box as MuiBox } from "@mui/material";
import Link from "next/link";
import { apiClient } from "@/app/shared/api/api";
import { EventForm } from "@/app/shared/interfaces/event.form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { fetchCategories } from "@/app/store/thunks/categoriesThunks";
export default function CreateEvent() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { categories } = useSelector((state: RootState) => state.categories);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<EventForm>({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.title.trim() || !formData.date) {
      setError("Please fill in title and date");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        categoryIds: (selectedCategoryIds || []).map((id) => {
          return id;
        }),
      };
      await apiClient.post("/event", payload);
      router.push("/events");
    } catch (err: unknown) {
      console.error("Failed to create event:", err);
      if (err instanceof Error || err?.data) {
        setError(
          err.data?.message || "Failed to create event. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    async function fetchCategoriesLocal() {
      try {
        await dispatch(fetchCategories());
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    }

    if (!categories) {
      fetchCategoriesLocal();
    }
  }, []);
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Link href="/events" style={{ textDecoration: "none" }}>
        <Button variant="text" sx={{ mb: 3 }}>
          ← Back to Events
        </Button>
      </Link>

      <Card
        sx={{
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            p: 4,
          }}
        >
          <Typography variant="h3" component="h1" sx={{ fontWeight: "bold" }}>
            Create New Event
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }}>
            Add a new event to the platform
          </Typography>
        </Box>

        <CardContent sx={{ p: 4 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Event Title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter event title"
                required
                disabled={loading}
              />

              <TextField
                fullWidth
                label="Date & Time"
                type="datetime-local"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
                disabled={loading}
              />

              <TextField
                fullWidth
                label="Location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="Enter event location"
                disabled={loading}
              />

              <TextField
                fullWidth
                label="Description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Enter event description"
                multiline
                rows={5}
                disabled={loading}
              />

              <FormControl fullWidth>
                <InputLabel id="create-categories-label">Categories</InputLabel>
                <Select
                  labelId="create-categories-label"
                  multiple
                  value={selectedCategoryIds}
                  onChange={(e) =>
                    setSelectedCategoryIds(e.target.value as string[])
                  }
                  renderValue={(selected) => (
                    <MuiBox sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      {(selected as string[]).map((id) => {
                        const cat = categories?.find((c: any) => c.id === id);
                        const label = cat ? cat.title : id;
                        return <Chip key={id} label={label} size="small" />;
                      })}
                    </MuiBox>
                  )}
                >
                  {categories && categories.length > 0 ? (
                    categories.map((c: any) => (
                      <MenuItem key={c.id} value={c.id}>
                        <Checkbox
                          checked={selectedCategoryIds.indexOf(c.id) > -1}
                        />
                        <ListItemText primary={c.title} />
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No categories</MenuItem>
                  )}
                </Select>
              </FormControl>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ mt: 4 }}
              >
                <Link
                  href="/events"
                  style={{ textDecoration: "none", flex: 1 }}
                >
                  <Button
                    fullWidth
                    variant="outlined"
                    size="large"
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </Link>
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  size="large"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Event"}
                </Button>
              </Stack>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
