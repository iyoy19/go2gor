import { dummyFields } from "@/data/lapangan";
import BookingClient from "./BookingClient";
import { notFound } from "next/navigation";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // Check if field exists
  const fieldExists = dummyFields.some(
    (field) => field.id.toString() === id
  );

  if (!fieldExists) {
    notFound();
  }

  return <BookingClient fieldId={id} />;
}
