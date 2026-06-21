import { Tabs as TabsPrimitive } from "radix-ui";
import type React from "react";
import { cn, focusRing } from "@/lib/utils";

export const Tabs = TabsPrimitive.Root;

export function TabsList({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn("flex items-center border-b border-border", className)}
      {...props}
    />
  );
}

export function TabsTrigger({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "relative -mb-px cursor-pointer border-b-2 border-transparent px-4 py-2.5 font-mono text-label font-bold uppercase tracking-[1.5px] text-muted-foreground transition-colors",
        "hover:text-foreground data-[state=active]:border-accent data-[state=active]:text-foreground",
        "disabled:cursor-not-allowed disabled:opacity-40",
        focusRing,
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn("pt-4", focusRing, className)}
      {...props}
    />
  );
}
