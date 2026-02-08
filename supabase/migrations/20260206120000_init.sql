create table if not exists events (
  id text primary key,
  name jsonb not null,
  description jsonb,
  location jsonb,
  date date,
  type text not null,
  external_link text,
  created_at timestamptz default now()
);

create table if not exists races (
  id text primary key,
  event_id text not null references events(id) on delete cascade,
  name jsonb not null,
  distance_meters integer not null,
  elevation_gain_meters integer,
  start_time timestamptz,
  difficulty text
);

create index if not exists races_event_id_idx on races(event_id);

alter table events enable row level security;
alter table races enable row level security;

drop policy if exists "Public read events" on events;
create policy "Public read events"
on events for select
using (true);

drop policy if exists "Public read races" on races;
create policy "Public read races"
on races for select
using (true);
