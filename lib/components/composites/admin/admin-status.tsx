"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

type AdminStatusProps = {
  status?: string;
  message?: string;
};

export function AdminStatus({ status, message }: AdminStatusProps) {
  const lastStatus = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!status || status === lastStatus.current) return;
    lastStatus.current = status;

    switch (status) {
      case "ok":
        toast.success("Event added.");
        break;
      case "deleted":
        toast.success("Deleted.");
        break;
      case "bad-password":
        toast.error("Wrong password.");
        break;
      case "unauthorized":
        toast.error("You are not authorized to perform this action.");
        break;
      case "missing-required":
        toast.error("Please fill out all required fields.");
        break;
      case "invalid-location":
        toast.error("Latitude/longitude must be valid numbers.");
        break;
      case "error":
        toast.error(message ? `Insert failed: ${message}` : "Insert failed.");
        break;
      default:
        break;
    }
  }, [status, message]);

  return null;
}
