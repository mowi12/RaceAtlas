import type { Event } from "@/lib/types/event";

/**
 * Static example events used during development.
 */
export const exampleEvents: Event[] = [
  {
    id: "ulm-donauufer-road-race-2026",
    name: "Ulm Donauufer Road Race",
    description:
      "Fast, flat out-and-back along the Danube with panoramic river views, ideal for PB attempts.",
    location: { latitude: 48.3989, longitude: 9.9917 },
    date: "2026-05-10",
    type: "RoadRace",
    externalLink: "https://example.com/ulm-donauufer-road-race",
    races: [
      {
        id: "ulm-donauufer-5k-2026",
        name: "Danube 5K Out-and-Back",
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
              name: "Water Point - 2.5K",
              location: { latitude: 48.4016, longitude: 9.9792 },
              description: "Single table with cups on the riverside path.",
            },
            {
              id: "ulm-donauufer-5k-medical",
              type: "medical",
              name: "Medical Tent",
              location: { latitude: 48.3989, longitude: 9.9916 },
              description: "Medical support next to the finish arch.",
            },
          ],
        },
      },
      {
        id: "ulm-donauufer-10k-2026",
        name: "Danube 10K Riverside Loop",
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
              name: "Water Point - 4K",
              location: { latitude: 48.4041, longitude: 9.9712 },
            },
            {
              id: "ulm-donauufer-10k-toilet",
              type: "toilet",
              name: "Public Toilets - 6K",
              location: { latitude: 48.4034, longitude: 9.9776 },
            },
            {
              id: "ulm-donauufer-10k-checkpoint",
              type: "checkpoint",
              name: "Turnaround Marshal",
              location: { latitude: 48.4076, longitude: 9.9622 },
            },
          ],
        },
      },
      {
        id: "ulm-donauufer-half-2026",
        name: "Danube Half Marathon",
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
              name: "Gel Station - 9K",
              location: { latitude: 48.4091, longitude: 9.9521 },
            },
            {
              id: "ulm-donauufer-half-water-1",
              type: "water",
              name: "Water Point - 12K",
              location: { latitude: 48.3956, longitude: 9.9654 },
            },
            {
              id: "ulm-donauufer-half-medical-1",
              type: "medical",
              name: "Medical Bike Team",
              location: { latitude: 48.3924, longitude: 9.9828 },
              description: "Mobile medical team near the riverside bridge.",
            },
            {
              id: "ulm-donauufer-half-checkpoint-1",
              type: "checkpoint",
              name: "Split Mat - 15K",
              location: { latitude: 48.4017, longitude: 9.9726 },
            },
          ],
        },
      },
    ],
  },
  {
    id: "ulm-muenster-night-run-2026",
    name: "Ulm Münster Night Run",
    description:
      "Evening city run weaving through the historic center with a Münsterplatz finish under floodlights.",
    location: { latitude: 48.3986, longitude: 9.9938 },
    date: "2026-06-20",
    type: "FunRun",
    externalLink: "https://example.com/ulm-muenster-night-run",
    races: [
      {
        id: "ulm-muenster-3k-2026",
        name: "3K Old Town Dash",
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
              name: "Old Town Gate Checkpoint",
              location: { latitude: 48.3976, longitude: 10.0004 },
            },
            {
              id: "ulm-muenster-3k-water-1",
              type: "water",
              name: "Münsterplatz Water",
              location: { latitude: 48.3991, longitude: 9.9931 },
            },
          ],
        },
      },
      {
        id: "ulm-muenster-7k-2026",
        name: "7K City Lights Loop",
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
              name: "Riverside Water - 3.5K",
              location: { latitude: 48.4043, longitude: 9.9846 },
            },
            {
              id: "ulm-muenster-7k-toilet-1",
              type: "toilet",
              name: "Public Toilets - 4K",
              location: { latitude: 48.4014, longitude: 9.9972 },
            },
          ],
        },
      },
    ],
  },
  {
    id: "soeflingen-park-2026",
    name: "Söflingen Park Spring Run",
    description:
      "Community run through Söflingen's green corridors and park loops with a relaxed festival finish.",
    location: { latitude: 48.3952, longitude: 9.9538 },
    date: "2026-04-12",
    type: "FunRun",
    externalLink: "https://example.com/soeflingen-park-run",
    races: [
      {
        id: "soeflingen-5k-2026",
        name: "Söflingen 5K Park Loop",
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
              name: "Water Point - 2.5K",
              location: { latitude: 48.3924, longitude: 9.9479 },
            },
            {
              id: "soeflingen-5k-checkpoint-1",
              type: "checkpoint",
              name: "Lap Split",
              location: { latitude: 48.3972, longitude: 9.9514 },
            },
          ],
        },
      },
      {
        id: "soeflingen-10k-2026",
        name: "Söflingen 10K Greenway",
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
              name: "Water Point - 5K",
              location: { latitude: 48.3874, longitude: 9.9491 },
            },
            {
              id: "soeflingen-10k-toilet-1",
              type: "toilet",
              name: "Park Toilets - 7K",
              location: { latitude: 48.3922, longitude: 9.9587 },
            },
            {
              id: "soeflingen-10k-medical-1",
              type: "medical",
              name: "Medical Tent",
              location: { latitude: 48.3949, longitude: 9.9532 },
            },
          ],
        },
      },
    ],
  },
  {
    id: "wiblingen-monastery-half-2026",
    name: "Wiblingen Monastery Half Marathon",
    description:
      "Road race looping past the Wiblingen Monastery and Iller floodplains with gentle rolling terrain.",
    location: { latitude: 48.3397, longitude: 9.9518 },
    date: "2026-07-05",
    type: "RoadRace",
    externalLink: "https://example.com/wiblingen-half",
    races: [
      {
        id: "wiblingen-10k-2026",
        name: "Wiblingen 10K Monastery Loop",
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
              name: "Monastery Gate Split",
              location: { latitude: 48.3382, longitude: 9.9502 },
            },
            {
              id: "wiblingen-10k-water-1",
              type: "water",
              name: "Water Point - 6K",
              location: { latitude: 48.3327, longitude: 9.9621 },
            },
          ],
        },
      },
      {
        id: "wiblingen-half-2026",
        name: "Wiblingen Half Marathon",
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
              name: "Gel Station - 11K",
              location: { latitude: 48.3301, longitude: 9.9487 },
            },
            {
              id: "wiblingen-half-water-1",
              type: "water",
              name: "Water Point - 15K",
              location: { latitude: 48.3464, longitude: 9.9701 },
            },
            {
              id: "wiblingen-half-medical-1",
              type: "medical",
              name: "Medical Tent - Finish",
              location: { latitude: 48.3391, longitude: 9.951 },
            },
          ],
        },
      },
    ],
  },
  {
    id: "blaustein-trail-loop-2026",
    name: "Blaustein Trail Loop",
    description:
      "Technical forest and ridge trails above the Blautopf region with punchy climbs and fast descents.",
    location: { latitude: 48.4155, longitude: 9.9041 },
    date: "2026-09-12",
    type: "TrailRun",
    externalLink: "https://example.com/blaustein-trail-loop",
    races: [
      {
        id: "blaustein-15k-2026",
        name: "15K Forest Ridge",
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
              name: "Ridge Checkpoint - 6K",
              location: { latitude: 48.4206, longitude: 9.8882 },
            },
            {
              id: "blaustein-15k-water-1",
              type: "water",
              name: "Water Point - 10K",
              location: { latitude: 48.4096, longitude: 9.8929 },
            },
            {
              id: "blaustein-15k-medical-1",
              type: "medical",
              name: "Trail Medical Post",
              location: { latitude: 48.4164, longitude: 9.9002 },
            },
          ],
        },
      },
      {
        id: "blaustein-30k-2026",
        name: "30K Blautopf Traverse",
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
              name: "Aid Station - 12K",
              location: { latitude: 48.4279, longitude: 9.8798 },
            },
            {
              id: "blaustein-30k-water-1",
              type: "water",
              name: "Water Point - 18K",
              location: { latitude: 48.4068, longitude: 9.8756 },
            },
            {
              id: "blaustein-30k-checkpoint-1",
              type: "checkpoint",
              name: "Forest Road Split - 24K",
              location: { latitude: 48.4125, longitude: 9.8969 },
            },
          ],
        },
      },
    ],
  },
  {
    id: "elchingen-hill-climb-2026",
    name: "Elchingen Hill Climb",
    description:
      "Short but steep hill race from the river plain to the monastery ridge, with sweeping views over Ulm.",
    location: { latitude: 48.4518, longitude: 10.0794 },
    date: "2026-08-16",
    type: "TrailRun",
    externalLink: "https://example.com/elchingen-hill-climb",
    races: [
      {
        id: "elchingen-8k-2026",
        name: "8K Ridge Ascent",
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
              name: "Water Point - 4K",
              location: { latitude: 48.4501, longitude: 10.0782 },
            },
            {
              id: "elchingen-8k-checkpoint-1",
              type: "checkpoint",
              name: "Steep Section Marshal",
              location: { latitude: 48.4516, longitude: 10.0811 },
            },
            {
              id: "elchingen-8k-medical-1",
              type: "medical",
              name: "Medical Post - Finish",
              location: { latitude: 48.4533, longitude: 10.084 },
            },
          ],
        },
      },
      {
        id: "elchingen-vertical-2026",
        name: "4K Vertical Sprint",
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
              name: "Midway Split",
              location: { latitude: 48.4502, longitude: 10.0798 },
            },
            {
              id: "elchingen-vertical-water-1",
              type: "water",
              name: "Finish Water",
              location: { latitude: 48.4533, longitude: 10.084 },
            },
          ],
        },
      },
    ],
  },
  {
    id: "illerauen-ultra-2026",
    name: "Illerauen Ultra",
    description:
      "Long riverside ultra following the Iller floodplains south of Ulm with mixed gravel and forest tracks.",
    location: { latitude: 48.3667, longitude: 9.9874 },
    date: "2026-10-03",
    type: "Ultra",
    externalLink: "https://example.com/illerauen-ultra",
    races: [
      {
        id: "illerauen-50k-2026",
        name: "50K Iller Loop",
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
              name: "Aid Station - 15K",
              location: { latitude: 48.3492, longitude: 9.9774 },
            },
            {
              id: "illerauen-50k-water-1",
              type: "water",
              name: "Water Point - 28K",
              location: { latitude: 48.3238, longitude: 9.9697 },
            },
            {
              id: "illerauen-50k-checkpoint-1",
              type: "checkpoint",
              name: "Bridge Checkpoint - 35K",
              location: { latitude: 48.3346, longitude: 9.9945 },
            },
            {
              id: "illerauen-50k-medical-1",
              type: "medical",
              name: "Medical Tent - Finish",
              location: { latitude: 48.3665, longitude: 9.9868 },
            },
          ],
        },
      },
      {
        id: "illerauen-80k-2026",
        name: "80K Iller Endurance",
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
              name: "Aid Station - 20K",
              location: { latitude: 48.3408, longitude: 9.9726 },
            },
            {
              id: "illerauen-80k-water-1",
              type: "water",
              name: "Water Point - 40K",
              location: { latitude: 48.3072, longitude: 9.9652 },
            },
            {
              id: "illerauen-80k-nutrition-2",
              type: "nutrition",
              name: "Aid Station - 60K",
              location: { latitude: 48.3281, longitude: 10.0041 },
            },
            {
              id: "illerauen-80k-medical-1",
              type: "medical",
              name: "Medical Tent - Finish",
              location: { latitude: 48.3665, longitude: 9.9868 },
            },
          ],
        },
      },
    ],
  },
];
