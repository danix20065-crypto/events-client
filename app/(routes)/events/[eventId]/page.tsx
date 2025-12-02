import EventDetails from "@/app/pages/eventDetails";

export default async function Event({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const eventId = (await params).eventId;

  return <EventDetails eventId={eventId} />;
}
