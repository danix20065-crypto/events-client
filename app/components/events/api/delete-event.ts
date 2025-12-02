import { apiClient } from "@/app/shared/api/api";

export async function deleteEvent(eventId: string | number): Promise<void> {
  try {
    await apiClient.delete(`/event/${eventId}`);
  } catch (err) {
    console.error("Failed to delete event:", err);

    throw new Error("API deletion failed.");
  }
}
