import type React from "react";
import { cn, focusRing } from "@/lib/utils";
import { controlBase, controlBorder } from "./Input";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export function Textarea({ invalid, className, ...props }: TextareaProps) {
  return (
    <textarea
      aria-invalid={invalid || undefined}
      className={cn(
        controlBase,
        focusRing,
        controlBorder(invalid),
        "min-h-24 resize-y leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}
