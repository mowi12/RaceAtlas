"use client";

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
} from "@/lib/components/primitives/dialog";
import { Input } from "@/lib/components/primitives/input";
import { Label } from "@/lib/components/primitives/label";

type AdminAuthDialogProps = {
  locale: string;
};

export function AdminAuthDialog({ locale }: AdminAuthDialogProps) {
  const t = useTranslations("Admin");
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("auth.title")}</DialogTitle>
          <DialogDescription>{t("auth.description")}</DialogDescription>
        </DialogHeader>
        <form action={adminLoginAction} className="space-y-4">
          <input type="hidden" name="locale" value={locale} />
          <div className="space-y-2">
            <Label htmlFor="admin-password-page">
              {t("auth.passwordLabel")}
            </Label>
            <Input
              id="admin-password-page"
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
