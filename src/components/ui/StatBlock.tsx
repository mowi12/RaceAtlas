import { cn } from "@/lib/utils";

interface StatBlockProps {
  value: string | number;
  label: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const valueSize = {
  sm: "text-[22px]",
  md: "text-[32px]",
  lg: "text-[48px]",
};

export function StatBlock({
  value,
  label,
  size = "md",
  className,
}: StatBlockProps) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <div
        className={cn(
          "font-display font-black leading-none tracking-tight text-foreground",
          valueSize[size],
        )}
      >
        {value}
      </div>
      <div className="font-mono text-micro tracking-[2px] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
