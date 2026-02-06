-- Optional: wipe existing data to avoid duplicates.
-- Uncomment if you want a full reset before seeding.
truncate table races, events;

-- Events (upsert by id)
insert into events (id, name, description, location, date, type, external_link)
values
  ('ulm-donauufer-road-race-2026', '{"en":"Ulm Donauufer Road Race","de":"Ulm Donauufer Straßenrennen"}', '{"en":"Fast, flat out-and-back along the Danube with panoramic river views, ideal for PB attempts.","de":"Schneller, flacher Wendepunktkurs entlang der Donau mit Panoramablick auf den Fluss, ideal für Bestzeiten."}', '{"latitude":48.3989,"longitude":9.9917}', '2026-05-10', 'RoadRace', 'https://example.com/ulm-donauufer-road-race'),
  ('ulm-muenster-night-run-2026', '{"en":"Ulm Münster Night Run","de":"Ulm Münster Nachtlauf"}', '{"en":"Evening city run weaving through the historic center with a Münsterplatz finish under floodlights.","de":"Abendlauf durch die Altstadt mit Ziel am Münsterplatz unter Flutlicht."}', '{"latitude":48.3986,"longitude":9.9938}', '2026-06-20', 'FunRun', 'https://example.com/ulm-muenster-night-run'),
  ('soeflingen-park-2026', '{"en":"Söflingen Park Spring Run","de":"Söflingen Park Frühlingslauf"}', '{"en":"Community run through Söflingen''s green corridors and park loops with a relaxed festival finish.","de":"Gemeindelauf durch Söflingens grüne Korridore und Parkrunden mit entspanntem Festivalziel."}', '{"latitude":48.3952,"longitude":9.9538}', '2026-04-12', 'FunRun', 'https://example.com/soeflingen-park-run'),
  ('wiblingen-monastery-half-2026', '{"en":"Wiblingen Monastery Half Marathon","de":"Wiblingen Kloster-Halbmarathon"}', '{"en":"Road race looping past the Wiblingen Monastery and Iller floodplains with gentle rolling terrain.","de":"Straßenlauf am Kloster Wiblingen und den Illerauen mit sanft welligem Terrain."}', '{"latitude":48.3397,"longitude":9.9518}', '2026-07-05', 'RoadRace', 'https://example.com/wiblingen-half'),
  ('blaustein-trail-loop-2026', '{"en":"Blaustein Trail Loop","de":"Blaustein Trailrunde"}', '{"en":"Technical forest and ridge trails above the Blautopf region with punchy climbs and fast descents.","de":"Technische Wald- und Gratwege oberhalb der Blautopf-Region mit knackigen Anstiegen und schnellen Abfahrten."}', '{"latitude":48.4155,"longitude":9.9041}', '2026-09-12', 'TrailRun', 'https://example.com/blaustein-trail-loop'),
  ('elchingen-hill-climb-2026', '{"en":"Elchingen Hill Climb","de":"Elchingen Berglauf"}', '{"en":"Short but steep hill race from the river plain to the monastery ridge, with sweeping views over Ulm.","de":"Kurzer, aber steiler Berglauf von der Flussebene zum Klosterrücken mit weitem Blick über Ulm."}', '{"latitude":48.4518,"longitude":10.0794}', '2026-08-16', 'TrailRun', 'https://example.com/elchingen-hill-climb'),
  ('illerauen-ultra-2026', '{"en":"Illerauen Ultra","de":"Illerauen-Ultra"}', '{"en":"Long riverside ultra following the Iller floodplains south of Ulm with mixed gravel and forest tracks.","de":"Langer Ufer-Ultra entlang der Illerauen südlich von Ulm mit gemischten Schotter- und Waldwegen."}', '{"latitude":48.3667,"longitude":9.9874}', '2026-10-03', 'Ultra', 'https://example.com/illerauen-ultra'),
  ('neu-ulm-riverside-morning-run-2026', '{"en":"Neu-Ulm Riverside Morning Run","de":"Neu-Ulm Donauufer Morgenlauf"}', null, '{"latitude":48.3921,"longitude":10.0063}', '2026-03-22', 'FunRun', 'https://example.com/neu-ulm-morning-run')
on conflict (id) do update
set
  name = excluded.name,
  description = excluded.description,
  location = excluded.location,
  date = excluded.date,
  type = excluded.type,
  external_link = excluded.external_link;

-- Races (upsert by id)
insert into races (
  id,
  event_id,
  name,
  distance_meters,
  elevation_gain_meters,
  start_time,
  difficulty
)
values
  ('ulm-donauufer-5k-2026', 'ulm-donauufer-road-race-2026', '{"en":"Danube 5K Out-and-Back","de":"Donau 5K Wendepunkt"}', 5000, 18, '2026-05-10T08:30:00+02:00', 'Easy'),
  ('ulm-donauufer-10k-2026', 'ulm-donauufer-road-race-2026', '{"en":"Danube 10K Riverside Loop","de":"Donau 10K Ufer-Runde"}', 10000, 32, '2026-05-10T09:15:00+02:00', 'Easy'),
  ('ulm-donauufer-half-2026', 'ulm-donauufer-road-race-2026', '{"en":"Danube Half Marathon","de":"Donau Halbmarathon"}', 21097, 58, '2026-05-10T10:00:00+02:00', 'Medium'),
  ('ulm-muenster-3k-2026', 'ulm-muenster-night-run-2026', '{"en":"3K Old Town Dash","de":"3K Altstadt-Sprint"}', 3000, 22, '2026-06-20T20:15:00+02:00', 'Easy'),
  ('ulm-muenster-7k-2026', 'ulm-muenster-night-run-2026', '{"en":"7K City Lights Loop","de":"7K City-Lights-Runde"}', 7000, 44, '2026-06-20T20:45:00+02:00', 'Easy'),
  ('soeflingen-5k-2026', 'soeflingen-park-2026', '{"en":"Söflingen 5K Park Loop","de":"Söflingen 5K Parkrunde"}', 5000, 26, '2026-04-12T09:30:00+02:00', 'Easy'),
  ('soeflingen-10k-2026', 'soeflingen-park-2026', '{"en":"Söflingen 10K Greenway","de":"Söflingen 10K Grünweg"}', 10000, 52, '2026-04-12T10:15:00+02:00', 'Medium'),
  ('wiblingen-10k-2026', 'wiblingen-monastery-half-2026', '{"en":"Wiblingen 10K Monastery Loop","de":"Wiblingen 10K Klosterrunde"}', 10000, 64, '2026-07-05T09:00:00+02:00', 'Medium'),
  ('wiblingen-half-2026', 'wiblingen-monastery-half-2026', '{"en":"Wiblingen Half Marathon","de":"Wiblingen Halbmarathon"}', 21097, 118, '2026-07-05T10:00:00+02:00', 'Medium'),
  ('blaustein-15k-2026', 'blaustein-trail-loop-2026', '{"en":"15K Forest Ridge","de":"15K Waldgrat"}', 15000, 420, '2026-09-12T09:00:00+02:00', 'Hard'),
  ('blaustein-30k-2026', 'blaustein-trail-loop-2026', '{"en":"30K Blautopf Traverse","de":"30K Blautopf-Traverse"}', 30000, 820, '2026-09-12T09:30:00+02:00', 'Hard'),
  ('elchingen-8k-2026', 'elchingen-hill-climb-2026', '{"en":"8K Ridge Ascent","de":"8K Gratanstieg"}', 8000, 260, '2026-08-16T09:30:00+02:00', 'Hard'),
  ('elchingen-vertical-2026', 'elchingen-hill-climb-2026', '{"en":"4K Vertical Sprint","de":"4K Vertikalsprint"}', 4000, 210, '2026-08-16T11:00:00+02:00', 'Hard'),
  ('illerauen-50k-2026', 'illerauen-ultra-2026', '{"en":"50K Iller Loop","de":"50K Iller-Runde"}', 50000, 480, '2026-10-03T07:00:00+02:00', 'Hard'),
  ('illerauen-80k-2026', 'illerauen-ultra-2026', '{"en":"80K Iller Endurance","de":"80K Iller-Endurance"}', 80000, 760, '2026-10-03T06:00:00+02:00', 'Extreme'),
  ('neu-ulm-5k-2026', 'neu-ulm-riverside-morning-run-2026', '{"en":"5K Sunrise Loop","de":"5K Sonnenaufgangsrunde"}', 5000, 12, '2026-03-22T08:00:00+01:00', 'Easy')
on conflict (id) do update
set
  event_id = excluded.event_id,
  name = excluded.name,
  distance_meters = excluded.distance_meters,
  elevation_gain_meters = excluded.elevation_gain_meters,
  start_time = excluded.start_time,
  difficulty = excluded.difficulty;
