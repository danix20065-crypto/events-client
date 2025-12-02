import { apiClient } from "@/app/shared/api/api";
import { Category } from "@/app/shared/interfaces/category";
import { EventForm } from "@/app/shared/interfaces/event.form";
import { EventInterface } from "@/app/shared/interfaces/event.interface";
import { AppDispatch } from "@/app/store/store";
import { fetchEventDetails } from "@/app/store/thunks/eventsThunks";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function EditDetailsModal({
  openEditModal,
  handleEditClose,
  catLoading,
  categories,
  event,
  eventId,
  editLoading,
  setEditLoading,
  setOpenEditModal,
}: {
  openEditModal: boolean;
  handleEditClose: () => void;
  catLoading: boolean;
  categories: { id: string; title: string }[];
  event: EventInterface | null;
  eventId: string;
  editLoading: boolean;
  setEditLoading: (loading: boolean) => void;
  setOpenEditModal: (open: boolean) => void;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<EventForm>({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  console.log(catLoading, "categories in edit modal");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        date: event.date ? new Date(event.date).toISOString().slice(0, 16) : "",
        location: event.location || "",
        description: event.description || "",
      });
      if (event.categories && Array.isArray(event.categories)) {
        const ids = event.categories.map((c: Category) => c.id);
        setSelectedCategories(ids);
      } else {
        setSelectedCategories([]);
      }
    }
  }, [event]);
  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditSubmit = async () => {
    setEditLoading(true);

    try {
      const submit = {
        ...formData,
        date: formData.date ? new Date(formData.date).toISOString() : undefined,
        categoryIds: selectedCategories,
      };
      await apiClient.patch(`/event/${eventId}`, submit);
      setOpenEditModal(false);
      dispatch(fetchEventDetails(eventId));
    } catch (err) {
      console.error("Failed to update event:", err);
      alert("Failed to update event. Please try again.");
    } finally {
      setEditLoading(false);
    }
  };
  return (
    <Modal open={openEditModal} onClose={handleEditClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Edit Event
        </Typography>

        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Event Title"
            value={formData.title}
            onChange={(e) => handleFormChange("title", e.target.value)}
            placeholder="Enter event title"
          />

          <TextField
            fullWidth
            label="Date"
            type="datetime-local"
            value={formData.date}
            onChange={(e) => handleFormChange("date", e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            label="Location"
            value={formData.location}
            onChange={(e) => handleFormChange("location", e.target.value)}
            placeholder="Enter location"
          />

          <TextField
            fullWidth
            label="Description"
            value={formData.description}
            onChange={(e) => handleFormChange("description", e.target.value)}
            placeholder="Enter description"
            multiline
            rows={4}
          />

          <FormControl fullWidth>
            <InputLabel id="edit-categories-label">Categories</InputLabel>
            <Select
              labelId="edit-categories-label"
              multiple
              value={selectedCategories}
              onChange={(e) =>
                setSelectedCategories(e.target.value as string[])
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {(selected as string[]).map((id) => {
                    const cat = categories.find((c) => c.id === id);
                    const label = cat ? cat.title : id;
                    return <Chip key={id} label={label} size="small" />;
                  })}
                </Box>
              )}
            >
              {catLoading ? (
                <MenuItem disabled>Loading...</MenuItem>
              ) : categories.length === 0 ? (
                <MenuItem disabled>No categories</MenuItem>
              ) : (
                categories.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    <Checkbox checked={selectedCategories.indexOf(c.id) > -1} />
                    <ListItemText primary={c.title} />
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleEditClose}
              disabled={editLoading}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={handleEditSubmit}
              disabled={editLoading}
            >
              {editLoading ? "Saving..." : "Save Changes"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
