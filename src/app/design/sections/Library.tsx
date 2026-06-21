"use client";

import { useState } from "react";
import { Section, VariantRow } from "@/app/design/showcase/ShowcaseLayout";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardEyebrow,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState, ErrorState } from "@/components/ui/States";
import { Switch } from "@/components/ui/Switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Textarea } from "@/components/ui/Textarea";
import { ToastProvider, useToast } from "@/components/ui/Toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";

function IndeterminateCheckbox() {
  const [checked, setChecked] = useState<boolean | "indeterminate">(
    "indeterminate",
  );
  return (
    <Checkbox
      checked={checked}
      onCheckedChange={(c) => setChecked(c)}
      aria-label="Indeterminate example"
    />
  );
}

function RadioDemo() {
  return (
    <RadioGroup defaultValue="road" aria-label="Surface">
      {["road", "trail", "mixed"].map((v) => (
        <div key={v} className="flex items-center gap-2">
          <RadioGroupItem value={v} id={`surface-${v}`} />
          <Label htmlFor={`surface-${v}`} className="normal-case">
            {v}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

function ToastButtons() {
  const { toast } = useToast();
  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        onClick={() =>
          toast({ title: "Saved", description: "Race added to your plans." })
        }
      >
        DEFAULT
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() =>
          toast({
            title: "Registered",
            description: "You're in for the Berlin Marathon.",
            tone: "success",
          })
        }
      >
        SUCCESS
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() =>
          toast({
            title: "Almost full",
            description: "Only 40 spots left.",
            tone: "warning",
          })
        }
      >
        WARNING
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() =>
          toast({
            title: "Failed",
            description: "Could not reach the server.",
            tone: "destructive",
          })
        }
      >
        DESTRUCTIVE
      </Button>
    </>
  );
}

export function Library() {
  return (
    <ToastProvider>
      <Section id="inputs" title="Inputs · Text">
        <div className="flex max-w-md flex-col gap-6">
          <Field
            label="Event name"
            htmlFor="ev-name"
            helper="Shown in the catalog."
          >
            <Input id="ev-name" placeholder="Berlin Marathon" />
          </Field>
          <Field
            label="Distance"
            htmlFor="ev-dist"
            error="Must be a positive number."
            required
          >
            <Input
              id="ev-dist"
              defaultValue="-5"
              invalid
              aria-describedby="ev-dist-desc"
            />
          </Field>
          <Field label="Disabled" htmlFor="ev-dis">
            <Input id="ev-dis" placeholder="Read-only" disabled />
          </Field>
        </div>
      </Section>

      <Section id="textarea" title="Inputs · Textarea & Select">
        <div className="flex max-w-md flex-col gap-6">
          <Field label="Notes" htmlFor="notes">
            <Textarea id="notes" placeholder="Course notes, logistics…" />
          </Field>
          <Field label="Type" htmlFor="type">
            <Select defaultValue="road">
              <SelectTrigger id="type" className="w-full">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="road">Road race</SelectItem>
                <SelectItem value="trail">Trail run</SelectItem>
                <SelectItem value="ultra">Ultra</SelectItem>
                <SelectItem value="fun" disabled>
                  Fun run (soon)
                </SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Placeholder + invalid" htmlFor="type2">
            <Select>
              <SelectTrigger id="type2" invalid className="w-full">
                <SelectValue placeholder="Nothing selected" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Option A</SelectItem>
                <SelectItem value="b">Option B</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Grouped" htmlFor="type3">
            <Select defaultValue="berlin">
              <SelectTrigger id="type3" className="w-full">
                <SelectValue placeholder="Select a race" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Road</SelectLabel>
                  <SelectItem value="berlin">Berlin Marathon</SelectItem>
                  <SelectItem value="valencia">Valencia Marathon</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Trail</SelectLabel>
                  <SelectItem value="utmb">UTMB</SelectItem>
                  <SelectItem value="western">Western States 100</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>
      </Section>

      <Section id="toggles" title="Inputs · Checkbox / Radio / Switch">
        <div className="flex flex-col gap-8">
          <VariantRow label="CHECKBOX · unchecked / checked / indeterminate / disabled">
            <Checkbox aria-label="Unchecked" />
            <Checkbox defaultChecked aria-label="Checked" />
            <IndeterminateCheckbox />
            <Checkbox disabled aria-label="Disabled" />
            <Checkbox disabled defaultChecked aria-label="Disabled checked" />
          </VariantRow>
          <VariantRow label="RADIO GROUP">
            <RadioDemo />
          </VariantRow>
          <VariantRow label="SWITCH · off / on / disabled">
            <Switch aria-label="Off" />
            <Switch defaultChecked aria-label="On" />
            <Switch disabled aria-label="Disabled" />
            <Switch disabled defaultChecked aria-label="Disabled on" />
          </VariantRow>
        </div>
      </Section>

      <Section id="card" title="Card">
        <div className="max-w-md">
          <Card>
            <CardHeader>
              <CardEyebrow>ROAD · BERLIN</CardEyebrow>
              <CardTitle>Berlin Marathon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-body text-body-sm text-muted-foreground">
                Flat, fast, six-star major. World-record course.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm">TRACK</Button>
              <Button size="sm" variant="outline">
                DETAILS
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Section>

      <Section id="alert" title="Alert · inline">
        <div className="flex max-w-xl flex-col gap-4">
          <Alert tone="info" title="Heads up" icon="ⓘ">
            The catalog is curated. Only editors can add events.
          </Alert>
          <Alert tone="success" title="Saved" icon="✓">
            Race added to your plans.
          </Alert>
          <Alert tone="warning" title="Almost full" icon="▲">
            This race is at 91% capacity.
          </Alert>
          <Alert tone="destructive" title="Irreversible" icon="✕">
            Deleting an event removes all its races and routes.
          </Alert>
        </div>
      </Section>

      <Section id="skeleton" title="Skeleton · loading">
        <div className="flex max-w-md flex-col gap-3">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="mt-2 flex gap-3">
            <Skeleton className="size-12" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        </div>
      </Section>

      <Section id="states" title="Empty & Error states">
        <div className="grid gap-6 md:grid-cols-2">
          <EmptyState
            title="No events match"
            description="Try widening your distance range or clearing filters."
            action={
              <Button size="sm" variant="outline">
                CLEAR FILTERS
              </Button>
            }
          />
          <ErrorState
            title="Map failed to load"
            description="The tile provider didn't respond. The list view still works."
            action={
              <Button size="sm" variant="ghost">
                TRY AGAIN ↻
              </Button>
            }
          />
        </div>
      </Section>

      <Section id="dialog" title="Dialog · modal">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">DELETE RACE</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete this race?</DialogTitle>
              <DialogDescription>
                This permanently removes the race, its route, and any plans
                referencing it. This can't be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <p className="font-body text-body-sm text-muted-foreground">
                Type the race name to confirm in the real flow.
              </p>
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">CANCEL</Button>
              </DialogClose>
              <Button variant="destructive">DELETE</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Section>

      <Section id="dropdown" title="Dropdown menu">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">ACCOUNT ▾</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>moritz@…</DropdownMenuLabel>
            <DropdownMenuItem>My plans</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem destructive>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Section>

      <Section id="tabs" title="Tabs · view switcher">
        <Tabs defaultValue="timeline" className="max-w-xl">
          <TabsList>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
          </TabsList>
          <TabsContent value="timeline">
            <p className="font-body text-body-sm text-muted-foreground">
              Chronological list of events.
            </p>
          </TabsContent>
          <TabsContent value="calendar">
            <p className="font-body text-body-sm text-muted-foreground">
              Month-grid view.
            </p>
          </TabsContent>
          <TabsContent value="map">
            <p className="font-body text-body-sm text-muted-foreground">
              Geographic view (map lib lazy-loaded).
            </p>
          </TabsContent>
        </Tabs>
      </Section>

      <Section id="tooltip" title="Tooltip">
        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">HOVER ME</Button>
            </TooltipTrigger>
            <TooltipContent>Authored distance, not GPS-derived</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Section>

      <Section id="toast" title="Toast">
        <VariantRow label="TRIGGER (bottom-right, auto-dismiss)">
          <ToastButtons />
        </VariantRow>
      </Section>
    </ToastProvider>
  );
}
