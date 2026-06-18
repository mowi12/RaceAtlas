import type React from "react";
import { Colors } from "@/app/design/sections/Colors";
import { Components } from "@/app/design/sections/Components";
import { ContrastCheck } from "@/app/design/sections/ConstrastCheck";
import { TypeScale } from "@/app/design/sections/TypeScale";

export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-border pt-12 pb-16">
      <h2 className="font-mono text-[10px] tracking-[4px] text-muted-foreground mb-8 uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function VariantRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="font-mono text-[9px] tracking-[2px] text-muted-foreground">
        {label}
      </div>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </div>
  );
}

export function DesignShowcase() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="sticky top-0 z-50 bg-background border-b border-foreground flex items-center justify-between px-8 py-4">
        <div>
          <div className="font-display font-black text-[20px] leading-none tracking-tight text-foreground">
            RaceAtlas
          </div>
          <div className="font-mono text-[9px] tracking-[3px] text-muted-foreground mt-0.5">
            DESIGN SYSTEM · DEV ONLY
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-12">
        <Colors />
        <ContrastCheck />
        <TypeScale />
        <Components />
      </div>
    </div>
  );
}
