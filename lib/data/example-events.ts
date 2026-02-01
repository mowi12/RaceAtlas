import type { Event } from "@/lib/types/event";

/**
 * Static example events used during development.
 */
export const exampleEvents: Event[] = [
  {
    id: "ulm-donauufer-road-race-2026",
    name: { en: "Ulm Donauufer Road Race", de: "Ulm Donauufer Straßenrennen" },
    description: {
      en: "Fast, flat out-and-back along the Danube with panoramic river views, ideal for PB attempts.",
      de: "Schneller, flacher Wendepunktkurs entlang der Donau mit Panoramablick auf den Fluss, ideal für Bestzeiten.",
    },
    location: { latitude: 48.3989, longitude: 9.9917 },
    date: "2026-05-10",
    type: "RoadRace",
    externalLink: "https://example.com/ulm-donauufer-road-race",
    races: [
      {
        id: "ulm-donauufer-5k-2026",
        name: { en: "Danube 5K Out-and-Back", de: "Donau 5K Wendepunkt" },
        distanceMeters: 5000,
        elevationGainMeters: 18,
        startTime: "2026-05-10T08:30:00+02:00",
        difficulty: "Easy",
        route: {
          start: { latitude: 48.3988, longitude: 9.9913 },
          finish: { latitude: 48.3988, longitude: 9.9913 },
          pointsOfInterest: [
            {
              id: "ulm-donauufer-5k-water-1",
              type: "water",
              name: { en: "Water Point - 2.5K", de: "Wasserstelle - 2,5K" },
              location: { latitude: 48.4016, longitude: 9.9792 },
              description: {
                en: "Single table with cups on the riverside path.",
                de: "Ein Tisch mit Bechern am Uferweg.",
              },
            },
            {
              id: "ulm-donauufer-5k-medical",
              type: "medical",
              name: { en: "Medical Tent", de: "Medizinisches Zelt" },
              location: { latitude: 48.3989, longitude: 9.9916 },
              description: {
                en: "Medical support next to the finish arch.",
                de: "Medizinische Unterstützung neben dem Zielbogen.",
              },
            },
          ],
        },
      },
      {
        id: "ulm-donauufer-10k-2026",
        name: { en: "Danube 10K Riverside Loop", de: "Donau 10K Ufer-Runde" },
        distanceMeters: 10000,
        elevationGainMeters: 32,
        startTime: "2026-05-10T09:15:00+02:00",
        difficulty: "Easy",
        route: {
          start: { latitude: 48.3988, longitude: 9.9913 },
          finish: { latitude: 48.3988, longitude: 9.9913 },
          pointsOfInterest: [
            {
              id: "ulm-donauufer-10k-water-1",
              type: "water",
              name: { en: "Water Point - 4K", de: "Wasserstelle - 4K" },
              location: { latitude: 48.4041, longitude: 9.9712 },
            },
            {
              id: "ulm-donauufer-10k-toilet",
              type: "toilet",
              name: {
                en: "Public Toilets - 6K",
                de: "Öffentliche Toiletten - 6K",
              },
              location: { latitude: 48.4034, longitude: 9.9776 },
            },
            {
              id: "ulm-donauufer-10k-checkpoint",
              type: "checkpoint",
              name: { en: "Turnaround Marshal", de: "Wendepunkt-Marshal" },
              location: { latitude: 48.4076, longitude: 9.9622 },
            },
          ],
        },
      },
      {
        id: "ulm-donauufer-half-2026",
        name: { en: "Danube Half Marathon", de: "Donau Halbmarathon" },
        distanceMeters: 21097,
        elevationGainMeters: 58,
        startTime: "2026-05-10T10:00:00+02:00",
        difficulty: "Medium",
        route: {
          start: { latitude: 48.3988, longitude: 9.9913 },
          finish: { latitude: 48.3988, longitude: 9.9913 },
          pointsOfInterest: [
            {
              id: "ulm-donauufer-half-nutrition-1",
              type: "nutrition",
              name: { en: "Gel Station - 9K", de: "Gel-Station - 9K" },
              location: { latitude: 48.4091, longitude: 9.9521 },
            },
            {
              id: "ulm-donauufer-half-water-1",
              type: "water",
              name: { en: "Water Point - 12K", de: "Wasserstelle - 12K" },
              location: { latitude: 48.3956, longitude: 9.9654 },
            },
            {
              id: "ulm-donauufer-half-medical-1",
              type: "medical",
              name: { en: "Medical Bike Team", de: "Medizinisches Bike-Team" },
              location: { latitude: 48.3924, longitude: 9.9828 },
              description: {
                en: "Mobile medical team near the riverside bridge.",
                de: "Mobiles Medical-Team nahe der Uferbrücke.",
              },
            },
            {
              id: "ulm-donauufer-half-checkpoint-1",
              type: "checkpoint",
              name: { en: "Split Mat - 15K", de: "Zwischenzeitmatte - 15K" },
              location: { latitude: 48.4017, longitude: 9.9726 },
            },
          ],
        },
      },
    ],
  },
  {
    id: "ulm-muenster-night-run-2026",
    name: { en: "Ulm Münster Night Run", de: "Ulm Münster Nachtlauf" },
    description: {
      en: "Evening city run weaving through the historic center with a Münsterplatz finish under floodlights.",
      de: "Abendlauf durch die Altstadt mit Ziel am Münsterplatz unter Flutlicht.",
    },
    location: { latitude: 48.3986, longitude: 9.9938 },
    date: "2026-06-20",
    type: "FunRun",
    externalLink: "https://example.com/ulm-muenster-night-run",
    races: [
      {
        id: "ulm-muenster-3k-2026",
        name: { en: "3K Old Town Dash", de: "3K Altstadt-Sprint" },
        distanceMeters: 3000,
        elevationGainMeters: 22,
        startTime: "2026-06-20T20:15:00+02:00",
        difficulty: "Easy",
        route: {
          start: { latitude: 48.3991, longitude: 9.9931 },
          finish: { latitude: 48.3991, longitude: 9.9931 },
          pointsOfInterest: [
            {
              id: "ulm-muenster-3k-checkpoint-1",
              type: "checkpoint",
              name: {
                en: "Old Town Gate Checkpoint",
                de: "Altstadt-Tor Checkpoint",
              },
              location: { latitude: 48.3976, longitude: 10.0004 },
            },
            {
              id: "ulm-muenster-3k-water-1",
              type: "water",
              name: {
                en: "Münsterplatz Water",
                de: "Münsterplatz Wasserstelle",
              },
              location: { latitude: 48.3991, longitude: 9.9931 },
            },
          ],
        },
      },
      {
        id: "ulm-muenster-7k-2026",
        name: { en: "7K City Lights Loop", de: "7K City-Lights-Runde" },
        distanceMeters: 7000,
        elevationGainMeters: 44,
        startTime: "2026-06-20T20:45:00+02:00",
        difficulty: "Easy",
        route: {
          start: { latitude: 48.3991, longitude: 9.9931 },
          finish: { latitude: 48.3991, longitude: 9.9931 },
          pointsOfInterest: [
            {
              id: "ulm-muenster-7k-water-1",
              type: "water",
              name: {
                en: "Riverside Water - 3.5K",
                de: "Ufer-Wasserstelle - 3,5K",
              },
              location: { latitude: 48.4043, longitude: 9.9846 },
            },
            {
              id: "ulm-muenster-7k-toilet-1",
              type: "toilet",
              name: {
                en: "Public Toilets - 4K",
                de: "Öffentliche Toiletten - 4K",
              },
              location: { latitude: 48.4014, longitude: 9.9972 },
            },
          ],
        },
      },
    ],
  },
  {
    id: "soeflingen-park-2026",
    name: {
      en: "Söflingen Park Spring Run",
      de: "Söflingen Park Frühlingslauf",
    },
    description: {
      en: "Community run through Söflingen's green corridors and park loops with a relaxed festival finish.",
      de: "Gemeindelauf durch Söflingens grüne Korridore und Parkrunden mit entspanntem Festivalziel.",
    },
    location: { latitude: 48.3952, longitude: 9.9538 },
    date: "2026-04-12",
    type: "FunRun",
    externalLink: "https://example.com/soeflingen-park-run",
    races: [
      {
        id: "soeflingen-5k-2026",
        name: { en: "Söflingen 5K Park Loop", de: "Söflingen 5K Parkrunde" },
        distanceMeters: 5000,
        elevationGainMeters: 26,
        startTime: "2026-04-12T09:30:00+02:00",
        difficulty: "Easy",
        route: {
          start: { latitude: 48.3948, longitude: 9.9532 },
          finish: { latitude: 48.3948, longitude: 9.9532 },
          pointsOfInterest: [
            {
              id: "soeflingen-5k-water-1",
              type: "water",
              name: { en: "Water Point - 2.5K", de: "Wasserstelle - 2,5K" },
              location: { latitude: 48.3924, longitude: 9.9479 },
            },
            {
              id: "soeflingen-5k-checkpoint-1",
              type: "checkpoint",
              name: { en: "Lap Split", de: "Rundenzeit" },
              location: { latitude: 48.3972, longitude: 9.9514 },
            },
          ],
        },
      },
      {
        id: "soeflingen-10k-2026",
        name: { en: "Söflingen 10K Greenway", de: "Söflingen 10K Grünweg" },
        distanceMeters: 10000,
        elevationGainMeters: 52,
        startTime: "2026-04-12T10:15:00+02:00",
        difficulty: "Medium",
        route: {
          start: { latitude: 48.3948, longitude: 9.9532 },
          finish: { latitude: 48.3948, longitude: 9.9532 },
          pointsOfInterest: [
            {
              id: "soeflingen-10k-water-1",
              type: "water",
              name: { en: "Water Point - 5K", de: "Wasserstelle - 5K" },
              location: { latitude: 48.3874, longitude: 9.9491 },
            },
            {
              id: "soeflingen-10k-toilet-1",
              type: "toilet",
              name: { en: "Park Toilets - 7K", de: "Parktoiletten - 7K" },
              location: { latitude: 48.3922, longitude: 9.9587 },
            },
            {
              id: "soeflingen-10k-medical-1",
              type: "medical",
              name: { en: "Medical Tent", de: "Medizinisches Zelt" },
              location: { latitude: 48.3949, longitude: 9.9532 },
            },
          ],
        },
      },
    ],
  },
  {
    id: "wiblingen-monastery-half-2026",
    name: {
      en: "Wiblingen Monastery Half Marathon",
      de: "Wiblingen Kloster-Halbmarathon",
    },
    description: {
      en: "Road race looping past the Wiblingen Monastery and Iller floodplains with gentle rolling terrain.",
      de: "Straßenlauf am Kloster Wiblingen und den Illerauen mit sanft welligem Terrain.",
    },
    location: { latitude: 48.3397, longitude: 9.9518 },
    date: "2026-07-05",
    type: "RoadRace",
    externalLink: "https://example.com/wiblingen-half",
    races: [
      {
        id: "wiblingen-10k-2026",
        name: {
          en: "Wiblingen 10K Monastery Loop",
          de: "Wiblingen 10K Klosterrunde",
        },
        distanceMeters: 10000,
        elevationGainMeters: 64,
        startTime: "2026-07-05T09:00:00+02:00",
        difficulty: "Medium",
        route: {
          start: { latitude: 48.3392, longitude: 9.9511 },
          finish: { latitude: 48.3392, longitude: 9.9511 },
          pointsOfInterest: [
            {
              id: "wiblingen-10k-checkpoint-1",
              type: "checkpoint",
              name: {
                en: "Monastery Gate Split",
                de: "Klostertor-Zwischenzeit",
              },
              location: { latitude: 48.3382, longitude: 9.9502 },
            },
            {
              id: "wiblingen-10k-water-1",
              type: "water",
              name: { en: "Water Point - 6K", de: "Wasserstelle - 6K" },
              location: { latitude: 48.3327, longitude: 9.9621 },
            },
          ],
        },
      },
      {
        id: "wiblingen-half-2026",
        name: { en: "Wiblingen Half Marathon", de: "Wiblingen Halbmarathon" },
        distanceMeters: 21097,
        elevationGainMeters: 118,
        startTime: "2026-07-05T10:00:00+02:00",
        difficulty: "Medium",
        route: {
          start: { latitude: 48.3392, longitude: 9.9511 },
          finish: { latitude: 48.3392, longitude: 9.9511 },
          pointsOfInterest: [
            {
              id: "wiblingen-half-nutrition-1",
              type: "nutrition",
              name: { en: "Gel Station - 11K", de: "Gel-Station - 11K" },
              location: { latitude: 48.3301, longitude: 9.9487 },
            },
            {
              id: "wiblingen-half-water-1",
              type: "water",
              name: { en: "Water Point - 15K", de: "Wasserstelle - 15K" },
              location: { latitude: 48.3464, longitude: 9.9701 },
            },
            {
              id: "wiblingen-half-medical-1",
              type: "medical",
              name: {
                en: "Medical Tent - Finish",
                de: "Medizinisches Zelt - Ziel",
              },
              location: { latitude: 48.3391, longitude: 9.951 },
            },
          ],
        },
      },
    ],
  },
  {
    id: "blaustein-trail-loop-2026",
    name: { en: "Blaustein Trail Loop", de: "Blaustein Trailrunde" },
    description: {
      en: "Technical forest and ridge trails above the Blautopf region with punchy climbs and fast descents.",
      de: "Technische Wald- und Gratwege oberhalb der Blautopf-Region mit knackigen Anstiegen und schnellen Abfahrten.",
    },
    location: { latitude: 48.4155, longitude: 9.9041 },
    date: "2026-09-12",
    type: "TrailRun",
    externalLink: "https://example.com/blaustein-trail-loop",
    races: [
      {
        id: "blaustein-15k-2026",
        name: { en: "15K Forest Ridge", de: "15K Waldgrat" },
        distanceMeters: 15000,
        elevationGainMeters: 420,
        startTime: "2026-09-12T09:00:00+02:00",
        difficulty: "Hard",
        route: {
          start: { latitude: 48.4153, longitude: 9.9034 },
          finish: { latitude: 48.4153, longitude: 9.9034 },
          pointsOfInterest: [
            {
              id: "blaustein-15k-checkpoint-1",
              type: "checkpoint",
              name: { en: "Ridge Checkpoint - 6K", de: "Grat-Checkpoint - 6K" },
              location: { latitude: 48.4206, longitude: 9.8882 },
            },
            {
              id: "blaustein-15k-water-1",
              type: "water",
              name: { en: "Water Point - 10K", de: "Wasserstelle - 10K" },
              location: { latitude: 48.4096, longitude: 9.8929 },
            },
            {
              id: "blaustein-15k-medical-1",
              type: "medical",
              name: {
                en: "Trail Medical Post",
                de: "Medizinischer Trail-Posten",
              },
              location: { latitude: 48.4164, longitude: 9.9002 },
            },
          ],
        },
      },
      {
        id: "blaustein-30k-2026",
        name: { en: "30K Blautopf Traverse", de: "30K Blautopf-Traverse" },
        distanceMeters: 30000,
        elevationGainMeters: 820,
        startTime: "2026-09-12T09:30:00+02:00",
        difficulty: "Hard",
        route: {
          start: { latitude: 48.4153, longitude: 9.9034 },
          finish: { latitude: 48.4153, longitude: 9.9034 },
          pointsOfInterest: [
            {
              id: "blaustein-30k-nutrition-1",
              type: "nutrition",
              name: {
                en: "Aid Station - 12K",
                de: "Verpflegungsstation - 12K",
              },
              location: { latitude: 48.4279, longitude: 9.8798 },
            },
            {
              id: "blaustein-30k-water-1",
              type: "water",
              name: { en: "Water Point - 18K", de: "Wasserstelle - 18K" },
              location: { latitude: 48.4068, longitude: 9.8756 },
            },
            {
              id: "blaustein-30k-checkpoint-1",
              type: "checkpoint",
              name: {
                en: "Forest Road Split - 24K",
                de: "Forstweg-Zwischenzeit - 24K",
              },
              location: { latitude: 48.4125, longitude: 9.8969 },
            },
          ],
        },
      },
    ],
  },
  {
    id: "elchingen-hill-climb-2026",
    name: { en: "Elchingen Hill Climb", de: "Elchingen Berglauf" },
    description: {
      en: "Short but steep hill race from the river plain to the monastery ridge, with sweeping views over Ulm.",
      de: "Kurzer, aber steiler Berglauf von der Flussebene zum Klosterrücken mit weitem Blick über Ulm.",
    },
    location: { latitude: 48.4518, longitude: 10.0794 },
    date: "2026-08-16",
    type: "TrailRun",
    externalLink: "https://example.com/elchingen-hill-climb",
    races: [
      {
        id: "elchingen-8k-2026",
        name: { en: "8K Ridge Ascent", de: "8K Gratanstieg" },
        distanceMeters: 8000,
        elevationGainMeters: 260,
        startTime: "2026-08-16T09:30:00+02:00",
        difficulty: "Hard",
        route: {
          start: { latitude: 48.4467, longitude: 10.0731 },
          finish: { latitude: 48.4532, longitude: 10.0839 },
          pointsOfInterest: [
            {
              id: "elchingen-8k-water-1",
              type: "water",
              name: { en: "Water Point - 4K", de: "Wasserstelle - 4K" },
              location: { latitude: 48.4501, longitude: 10.0782 },
            },
            {
              id: "elchingen-8k-checkpoint-1",
              type: "checkpoint",
              name: {
                en: "Steep Section Marshal",
                de: "Marshal an der steilen Passage",
              },
              location: { latitude: 48.4516, longitude: 10.0811 },
            },
            {
              id: "elchingen-8k-medical-1",
              type: "medical",
              name: {
                en: "Medical Post - Finish",
                de: "Medizinischer Posten - Ziel",
              },
              location: { latitude: 48.4533, longitude: 10.084 },
            },
          ],
        },
      },
      {
        id: "elchingen-vertical-2026",
        name: { en: "4K Vertical Sprint", de: "4K Vertikalsprint" },
        distanceMeters: 4000,
        elevationGainMeters: 210,
        startTime: "2026-08-16T11:00:00+02:00",
        difficulty: "Hard",
        route: {
          start: { latitude: 48.4478, longitude: 10.0744 },
          finish: { latitude: 48.4532, longitude: 10.0839 },
          pointsOfInterest: [
            {
              id: "elchingen-vertical-checkpoint-1",
              type: "checkpoint",
              name: { en: "Midway Split", de: "Zwischenzeit Halbweg" },
              location: { latitude: 48.4502, longitude: 10.0798 },
            },
            {
              id: "elchingen-vertical-water-1",
              type: "water",
              name: { en: "Finish Water", de: "Wasser im Ziel" },
              location: { latitude: 48.4533, longitude: 10.084 },
            },
          ],
        },
      },
    ],
  },
  {
    id: "illerauen-ultra-2026",
    name: { en: "Illerauen Ultra", de: "Illerauen-Ultra" },
    description: {
      en: "Long riverside ultra following the Iller floodplains south of Ulm with mixed gravel and forest tracks.",
      de: "Langer Ufer-Ultra entlang der Illerauen südlich von Ulm mit gemischten Schotter- und Waldwegen.",
    },
    location: { latitude: 48.3667, longitude: 9.9874 },
    date: "2026-10-03",
    type: "Ultra",
    externalLink: "https://example.com/illerauen-ultra",
    races: [
      {
        id: "illerauen-50k-2026",
        name: { en: "50K Iller Loop", de: "50K Iller-Runde" },
        distanceMeters: 50000,
        elevationGainMeters: 480,
        startTime: "2026-10-03T07:00:00+02:00",
        difficulty: "Hard",
        route: {
          start: { latitude: 48.3665, longitude: 9.9868 },
          finish: { latitude: 48.3665, longitude: 9.9868 },
          pointsOfInterest: [
            {
              id: "illerauen-50k-nutrition-1",
              type: "nutrition",
              name: {
                en: "Aid Station - 15K",
                de: "Verpflegungsstation - 15K",
              },
              location: { latitude: 48.3492, longitude: 9.9774 },
            },
            {
              id: "illerauen-50k-water-1",
              type: "water",
              name: { en: "Water Point - 28K", de: "Wasserstelle - 28K" },
              location: { latitude: 48.3238, longitude: 9.9697 },
            },
            {
              id: "illerauen-50k-checkpoint-1",
              type: "checkpoint",
              name: {
                en: "Bridge Checkpoint - 35K",
                de: "Brücken-Checkpoint - 35K",
              },
              location: { latitude: 48.3346, longitude: 9.9945 },
            },
            {
              id: "illerauen-50k-medical-1",
              type: "medical",
              name: {
                en: "Medical Tent - Finish",
                de: "Medizinisches Zelt - Ziel",
              },
              location: { latitude: 48.3665, longitude: 9.9868 },
            },
          ],
        },
      },
      {
        id: "illerauen-80k-2026",
        name: { en: "80K Iller Endurance", de: "80K Iller-Endurance" },
        distanceMeters: 80000,
        elevationGainMeters: 760,
        startTime: "2026-10-03T06:00:00+02:00",
        difficulty: "Extreme",
        route: {
          start: { latitude: 48.3665, longitude: 9.9868 },
          finish: { latitude: 48.3665, longitude: 9.9868 },
          pointsOfInterest: [
            {
              id: "illerauen-80k-nutrition-1",
              type: "nutrition",
              name: {
                en: "Aid Station - 20K",
                de: "Verpflegungsstation - 20K",
              },
              location: { latitude: 48.3408, longitude: 9.9726 },
            },
            {
              id: "illerauen-80k-water-1",
              type: "water",
              name: { en: "Water Point - 40K", de: "Wasserstelle - 40K" },
              location: { latitude: 48.3072, longitude: 9.9652 },
            },
            {
              id: "illerauen-80k-nutrition-2",
              type: "nutrition",
              name: {
                en: "Aid Station - 60K",
                de: "Verpflegungsstation - 60K",
              },
              location: { latitude: 48.3281, longitude: 10.0041 },
            },
            {
              id: "illerauen-80k-medical-1",
              type: "medical",
              name: {
                en: "Medical Tent - Finish",
                de: "Medizinisches Zelt - Ziel",
              },
              location: { latitude: 48.3665, longitude: 9.9868 },
            },
          ],
        },
      },
    ],
  },
  {
    id: "neu-ulm-riverside-morning-run-2026",
    name: {
      en: "Neu-Ulm Riverside Morning Run",
      de: "Neu-Ulm Donauufer Morgenlauf",
    },
    // description intentionally omitted
    location: { latitude: 48.3921, longitude: 10.0063 },
    date: "2026-03-22",
    type: "FunRun",
    externalLink: "https://example.com/neu-ulm-morning-run",
    races: [
      {
        id: "neu-ulm-5k-2026",
        name: { en: "5K Sunrise Loop", de: "5K Sonnenaufgangsrunde" },
        distanceMeters: 5000,
        elevationGainMeters: 12,
        startTime: "2026-03-22T08:00:00+01:00",
        difficulty: "Easy",
        route: {
          start: { latitude: 48.3921, longitude: 10.0063 },
          finish: { latitude: 48.3921, longitude: 10.0063 },
          pointsOfInterest: [
            {
              id: "neu-ulm-5k-water-1",
              type: "water",
              name: {
                en: "Riverside Water Point",
                de: "Ufer-Wasserstelle",
              },
              location: { latitude: 48.3947, longitude: 10.0019 },
            },
          ],
        },
      },
    ],
  },
];
