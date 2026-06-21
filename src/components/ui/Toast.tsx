"use client";

import { Toast as ToastPrimitive } from "radix-ui";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { cn, focusRing } from "@/lib/utils";
import { CloseIcon } from "./icons";

type ToastTone = "default" | "success" | "warning" | "destructive";

interface ToastOptions {
  title: string;
  description?: string;
  tone?: ToastTone;
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: string;
}

const ToastContext = createContext<{ toast: (o: ToastOptions) => void } | null>(
  null,
);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

const toneBar: Record<ToastTone, string> = {
  default: "border-l-foreground",
  success: "border-l-success",
  warning: "border-l-warning",
  destructive: "border-l-destructive",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((o: ToastOptions) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts((prev) => [...prev, { tone: "default", id, ...o }]);
  }, []);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}
        {toasts.map((t) => {
          const tone = t.tone ?? "default";
          return (
            <ToastPrimitive.Root
              key={t.id}
              duration={t.duration ?? 5000}
              onOpenChange={(open) => {
                if (!open) remove(t.id);
              }}
              className={cn(
                "flex items-start gap-3 border border-l-4 border-border bg-card p-4 shadow-lg",
                toneBar[tone],
              )}
            >
              <div className="flex flex-1 flex-col gap-1">
                <ToastPrimitive.Title className="font-mono text-label font-bold uppercase tracking-[1.5px] text-foreground">
                  {t.title}
                </ToastPrimitive.Title>
                {t.description && (
                  <ToastPrimitive.Description className="font-body text-body-sm text-foreground">
                    {t.description}
                  </ToastPrimitive.Description>
                )}
              </div>
              <ToastPrimitive.Close
                aria-label="Dismiss"
                className={cn(
                  "shrink-0 text-muted-foreground transition-colors hover:text-foreground",
                  focusRing,
                )}
              >
                <CloseIcon className="size-3.5" />
              </ToastPrimitive.Close>
            </ToastPrimitive.Root>
          );
        })}
        <ToastPrimitive.Viewport className="fixed bottom-0 right-0 z-50 m-0 flex w-[calc(100vw-1rem)] max-w-96 list-none flex-col gap-2 p-4 outline-none sm:w-96" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}
