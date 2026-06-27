import { notFound } from "next/navigation";

export default function Boom() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  throw new Error("Simulated failure while drawing the sheet (boom route).");
}
