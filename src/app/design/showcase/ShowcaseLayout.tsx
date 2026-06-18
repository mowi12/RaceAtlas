import type React from "react";

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
