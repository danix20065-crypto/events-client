"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventDetails } from "../../store/thunks/eventsThunks";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  Stack,
  Container,
  Chip,
  Button,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { RootState, AppDispatch } from "../../store/store";
import EditDetailsModal from "@/app/components/eventDetails/ui/editDetailsModal";
import DeleteEventModal from "@/app/components/eventDetails/ui/deleteEventModal";
import getCategories from "@/app/components/events/api/get-categories";
import { deleteEvent } from "@/app/components/events/api/delete-event";
import ErrorState from "@/app/components/eventDetails/ui/ErrorState";
import NotFoundEvent from "@/app/components/eventDetails/ui/NotFoundEvent";
import EventDetailContent from "@/app/components/eventDetails/ui/EventDetailContent";

export default function EventDetails({ eventId }: { eventId: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { event, loading, error } = useSelector(
    (state: RootState) => state.events
  );

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [categories, setCategories] = useState<
    Array<{ id: string; title: string }>
  >([]);

  const [catLoading, setCatLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchEventDetails(eventId));
  }, [eventId, dispatch]);

  useEffect(() => {
    let mounted = true;
    setCatLoading(true);
    async function fetchCategories() {
      const categories = await getCategories();
      if (categories.status === "success" && mounted) {
        setCategories(categories.categories);
      } else if (mounted) {
        setCategories([]);
      }
    }
    setCatLoading(false);
    fetchCategories();
    return () => {
      mounted = false;
    };
  }, []);

  const handleEditOpen = () => setOpenEditModal(true);
  const handleEditClose = () => setOpenEditModal(false);

  const handleDeleteOpen = () => setOpenDeleteDialog(true);
  const handleDeleteClose = () => setOpenDeleteDialog(false);

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await deleteEvent(eventId);
      setOpenDeleteDialog(false);
      router.push("/events");
    } catch (err) {
      console.error("Error handled in component:", err);
      alert("Failed to delete event. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "600px",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!event) {
    return <NotFoundEvent />;
  }

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
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            p: 4,
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: "bold" }}>
              {event.title}
            </Typography>
            <Chip
              label="Event"
              size="small"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                color: "white",
                width: "fit-content",
              }}
            />
          </Stack>
        </Box>
        <EventDetailContent
          event={event}
          handleEditOpen={handleEditOpen}
          handleDeleteOpen={handleDeleteOpen}
        />
      </Card>

      <EditDetailsModal
        handleEditClose={handleEditClose}
        openEditModal={openEditModal}
        catLoading={catLoading}
        categories={categories}
        event={event}
        editLoading={editLoading}
        setEditLoading={setEditLoading}
        eventId={eventId}
        setOpenEditModal={setOpenEditModal}
      />

      <DeleteEventModal
        openDeleteDialog={openDeleteDialog}
        handleDeleteClose={handleDeleteClose}
        handleDelete={handleDelete}
        deleteLoading={deleteLoading}
        event={event}
      />
    </Container>
  );
}
