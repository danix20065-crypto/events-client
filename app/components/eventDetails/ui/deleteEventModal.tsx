import { EventInterface } from "@/app/shared/interfaces/event.interface";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function DeleteEventModal({
  openDeleteDialog,
  handleDeleteClose,
  handleDelete,
  deleteLoading,
  event,
}: {
  openDeleteDialog: boolean;
  handleDeleteClose: () => void;
  handleDelete: () => void;
  deleteLoading: boolean;
  event: EventInterface | null;
}) {
  return (
    <Dialog open={openDeleteDialog} onClose={handleDeleteClose}>
      <DialogTitle sx={{ fontWeight: "bold" }}>Delete Event?</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mt: 2 }}>
          Are you sure you want to delete the event{" "}
          <strong>{event?.title}</strong>? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleDeleteClose} disabled={deleteLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          disabled={deleteLoading}
        >
          {deleteLoading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
