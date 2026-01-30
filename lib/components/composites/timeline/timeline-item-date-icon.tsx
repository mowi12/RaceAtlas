type TimelineItemDateIconProps = {
  month?: string;
  day?: string;
  weekDay?: string;
};

export function TimelineItemDateIcon({
  month,
  day = "TBD",
  weekDay,
}: TimelineItemDateIconProps) {
  return (
    <div className="bg-secondary rounded-md w-20 h-20 border-2 border-border flex-col flex justify-center items-center">
      {month ? <span className="text-xs uppercase">{month}</span> : null}
      <span className="text-3xl">{day}</span>
      {weekDay ? <span className="text-xs uppercase">{weekDay}</span> : null}
    </div>
  );
}
