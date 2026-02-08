"use client";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { adminLoginAction } from "@/lib/actions/admin";
import { Button } from "@/lib/components/primitives/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/components/primitives/dialog";
import { Input } from "@/lib/components/primitives/input";
import { Label } from "@/lib/components/primitives/label";
import { Link, usePathname } from "@/lib/i18n/navigation";

type AdminTriggerProps = {
  locale: string;
  isAuthenticated: boolean;
};

export function AdminTrigger({ locale, isAuthenticated }: AdminTriggerProps) {
  const t = useTranslations("Admin");
  const pathname = usePathname() ?? "";
  const normalized = pathname.replace(/\/$/, "");
  const isOnAdmin =
    normalized === "/admin" ||
    normalized === `/${locale}/admin` ||
    /\/admin$/.test(normalized);

  if (isOnAdmin) {
    return (
      <Button
        variant="outline"
        size="icon"
        aria-label={t("trigger.aria.admin")}
        disabled
      >
        <Plus className="h-4 w-4" />
      </Button>
    );
  }

  if (isAuthenticated) {
    return (
      <Button
        variant="outline"
        size="icon"
        aria-label={t("trigger.aria.admin")}
        asChild
      >
        <Link href="/admin">
          <Plus className="h-4 w-4" />
        </Link>
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label={t("trigger.aria.login")}
          disabled={isOnAdmin}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("auth.title")}</DialogTitle>
          <DialogDescription>{t("auth.description")}</DialogDescription>
        </DialogHeader>
        <form action={adminLoginAction} className="space-y-4">
          <input type="hidden" name="locale" value={locale} />
          <div className="space-y-2">
            <Label htmlFor="admin-password">{t("auth.passwordLabel")}</Label>
            <Input
              id="admin-password"
              name="password"
              type="password"
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit">{t("auth.continue")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
