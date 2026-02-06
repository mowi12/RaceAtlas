"use client";

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
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Admin access</DialogTitle>
          <DialogDescription>
            Enter the admin password to continue.
          </DialogDescription>
        </DialogHeader>
        <form action={adminLoginAction} className="space-y-4">
          <input type="hidden" name="locale" value={locale} />
          <div className="space-y-2">
            <Label htmlFor="admin-password-page">Password</Label>
            <Input
              id="admin-password-page"
              name="password"
              type="password"
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit">Continue</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
