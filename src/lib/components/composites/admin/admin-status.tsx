"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

type AdminStatusProps = {
  status?: string;
  message?: string;
};

export function AdminStatus({ status, message }: AdminStatusProps) {
  const t = useTranslations("Admin");
  const lastStatus = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!status || status === lastStatus.current) return;
    lastStatus.current = status;

    switch (status) {
      case "ok":
        toast.success(t("status.ok"));
        break;
      case "deleted":
        toast.success(t("status.deleted"));
        break;
      case "bad-password":
        toast.error(t("status.badPassword"));
        break;
      case "unauthorized":
        toast.error(t("status.unauthorized"));
        break;
      case "missing-required":
        toast.error(t("status.missingRequired"));
        break;
      case "invalid-location":
        toast.error(t("status.invalidLocation"));
        break;
      case "invalid-type":
        toast.error(t("status.invalidType"));
        break;
      case "invalid-difficulty":
        toast.error(t("status.invalidDifficulty"));
        break;
      case "invalid-elevation":
        toast.error(t("status.invalidElevation"));
        break;
      case "error":
        toast.error(
          message
            ? t("status.errorWithMessage", { message })
            : t("status.error"),
        );
        break;
      default:
        break;
    }
  }, [status, message, t]);

  return null;
}
