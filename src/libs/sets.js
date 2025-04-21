export const defaultSets = [
  {
    id: 1,
    name: "Day 1 - Warm-Up - Squat",
    numOfSets: 1,
    minPerSet: 10,
    movement: "Squat",
    section: "Warm-Up",
    setType: "Prep",
    exercises: [
      {
        sequence: 1,
        name: "World\u2019s Greatest Stretch",
        reps: 2,
        log: false
      },
      {
        sequence: 2,
        name: "Ankle Rockers",
        reps: 10,
        log: false
      },
      {
        sequence: 3,
        name: "Deep Squat Hold + T-Spine Rotations",
        reps: 5,
        log: false
      },
      {
        sequence: 4,
        name: "Glute Bridge",
        reps: 10,
        log: false
      }
    ],
    source: "D"
  },
  {
    id: 2,
    name: "Day 1 - Primary - Squat",
    numOfSets: 5,
    minPerSet: 3,
    movement: "Squat",
    section: "Primary",
    setType: "Standard",
    exercises: [
      {
        sequence: 1,
        name: "Front Squat",
        reps: 5,
        log: true
      }
    ],
    source: "D"
  },
  {
    id: 3,
    name: "Day 1 - Secondary - Squat",
    numOfSets: 3,
    minPerSet: 3,
    movement: "Squat",
    section: "Secondary",
    setType: "Standard",
    exercises: [
      {
        sequence: 1,
        name: "Split Squat",
        reps: 8,
        log: true
      },
      {
        sequence: 2,
        name: "Goblet Squat (tempo 3-1-1)",
        reps: 10,
        log: true
      }
    ],
    source: "D"
  },
  {
    id: 4,
    name: "Day 1 - Accessories - Squat",
    numOfSets: 3,
    minPerSet: 2,
    movement: "Squat",
    section: "Accessories",
    setType: "Core/Stability",
    exercises: [
      {
        sequence: 1,
        name: "Pallof Press",
        reps: 12,
        log: true
      },
      {
        sequence: 2,
        name: "RKC Plank",
        reps: 1,
        log: true
      }
    ],
    source: "D"
  },
  {
    id: 5,
    name: "Day 2 - Warm-Up - Bench Press",
    numOfSets: 1,
    minPerSet: 10,
    movement: "Bench Press",
    section: "Warm-Up",
    setType: "Prep",
    exercises: [
      {
        sequence: 1,
        name: "Foam Roll Thoracic Spine",
        reps: 1,
        log: false
      },
      {
        sequence: 2,
        name: "Band Pull-Aparts",
        reps: 15,
        log: false
      },
      {
        sequence: 3,
        name: "Scapular Push-Ups",
        reps: 10,
        log: false
      },
      {
        sequence: 4,
        name: "Deadbug w/ Arm Extension",
        reps: 6,
        log: false
      }
    ],
    source: "D"
  },
  {
    id: 6,
    name: "Day 2 - Primary - Bench Press",
    numOfSets: 5,
    minPerSet: 3,
    movement: "Bench Press",
    section: "Primary",
    setType: "Standard",
    exercises: [
      {
        sequence: 1,
        name: "Barbell Bench Press",
        reps: 5,
        log: true
      }
    ],
    source: "D"
  },
  {
    id: 7,
    name: "Day 2 - Secondary - Bench Press",
    numOfSets: 3,
    minPerSet: 3,
    movement: "Bench Press",
    section: "Secondary",
    setType: "Standard",
    exercises: [
      {
        sequence: 1,
        name: "Dumbbell Incline Press",
        reps: 10,
        log: true
      },
      {
        sequence: 2,
        name: "SA Cable Chest Press (split stance)",
        reps: 10,
        log: true
      }
    ],
    source: "D"
  },
  {
    id: 8,
    name: "Day 2 - Accessories - Bench Press",
    numOfSets: 2,
    minPerSet: 2,
    movement: "Bench Press",
    section: "Accessories",
    setType: "Stability",
    exercises: [
      {
        sequence: 1,
        name: "Stability Push-Up (hands on rings/BOSU)",
        reps: 10,
        log: true
      },
      {
        sequence: 2,
        name: "Overhead Band Pull-Apart (external rotation)",
        reps: 15,
        log: true
      }
    ],
    source: "D"
  },
  {
    id: 9,
    name: "Day 3 - Warm-Up - Deadlift",
    numOfSets: 1,
    minPerSet: 10,
    movement: "Deadlift",
    section: "Warm-Up",
    setType: "Prep",
    exercises: [
      {
        sequence: 1,
        name: "Hip Flexor Stretch",
        reps: 1,
        log: false
      },
      {
        sequence: 2,
        name: "Hamstring Scoops",
        reps: 10,
        log: false
      },
      {
        sequence: 3,
        name: "Glute Bridge",
        reps: 10,
        log: false
      },
      {
        sequence: 4,
        name: "Banded Good Mornings",
        reps: 10,
        log: false
      }
    ],
    source: "D"
  },
  {
    id: 10,
    name: "Day 3 - Primary - Deadlift",
    numOfSets: 5,
    minPerSet: 3,
    movement: "Deadlift",
    section: "Primary",
    setType: "Standard",
    exercises: [
      {
        sequence: 1,
        name: "Trap Bar Deadlift",
        reps: 5,
        log: true
      }
    ],
    source: "D"
  },
  {
    id: 11,
    name: "Day 3 - Secondary - Deadlift",
    numOfSets: 3,
    minPerSet: 3,
    movement: "Deadlift",
    section: "Secondary",
    setType: "Standard",
    exercises: [
      {
        sequence: 1,
        name: "Romanian Deadlift (DB or BB)",
        reps: 10,
        log: true
      },
      {
        sequence: 2,
        name: "Step-Up w/ Knee Drive",
        reps: 8,
        log: true
      }
    ],
    source: "D"
  },
  {
    id: 12,
    name: "Day 3 - Accessories - Deadlift",
    numOfSets: 3,
    minPerSet: 2,
    movement: "Deadlift",
    section: "Accessories",
    setType: "Core/Stability",
    exercises: [
      {
        sequence: 1,
        name: "Cable Pull-Through",
        reps: 12,
        log: true
      },
      {
        sequence: 2,
        name: "Bird Dog Hold",
        reps: 5,
        log: true
      }
    ],
    source: "D"
  },
  {
    id: 13,
    name: "Day 4 - Warm-Up - Pull-Up",
    numOfSets: 1,
    minPerSet: 10,
    movement: "Pull-Up",
    section: "Warm-Up",
    setType: "Prep",
    exercises: [
      {
        sequence: 1,
        name: "Shoulder Dislocates w/ Band",
        reps: 10,
        log: false
      },
      {
        sequence: 2,
        name: "Dead Hang",
        reps: 1,
        log: false
      },
      {
        sequence: 3,
        name: "Scapular Pull-Ups",
        reps: 8,
        log: false
      }
    ],
    source: "D"
  },
  {
    id: 14,
    name: "Day 4 - Primary - Pull-Up",
    numOfSets: 5,
    minPerSet: 3,
    movement: "Pull-Up",
    section: "Primary",
    setType: "Standard",
    exercises: [
      {
        sequence: 1,
        name: "Pull-Up (assisted or weighted)",
        reps: 5,
        log: true
      }
    ],
    source: "D"
  },
  {
    id: 15,
    name: "Day 4 - Secondary - Pull-Up",
    numOfSets: 3,
    minPerSet: 3,
    movement: "Pull-Up",
    section: "Secondary",
    setType: "Standard",
    exercises: [
      {
        sequence: 1,
        name: "1-Arm Dumbbell Row",
        reps: 10,
        log: true
      },
      {
        sequence: 2,
        name: "Inverted Row",
        reps: 8,
        log: true
      }
    ],
    source: "D"
  },
  {
    id: 16,
    name: "Day 4 - Accessories - Pull-Up",
    numOfSets: 3,
    minPerSet: 2,
    movement: "Pull-Up",
    section: "Accessories",
    setType: "Grip/Stability",
    exercises: [
      {
        sequence: 1,
        name: "Farmer Carry (single arm)",
        reps: 1,
        log: true
      },
      {
        sequence: 2,
        name: "Banded Face Pulls",
        reps: 15,
        log: true
      }
    ],
    source: "D"
  },
  {
    id: 17,
    name: "Hypertrophy Day 1 - Warm-Up - Push",
    numOfSets: 1,
    minPerSet: 10,
    movement: "Push",
    section: "Warm-Up",
    setType: "Prep",
    exercises: [
      {
        sequence: 1,
        name: "Arm Circles",
        reps: 10,
        log: false
      },
      {
        sequence: 2,
        name: "Band Pull-Aparts",
        reps: 15,
        log: false
      },
      {
        sequence: 3,
        name: "Resistance Band Chest Press",
        reps: 12,
        log: false
      }
    ],
    source: "D"
  },
  {
    id: 18,
    name: "Hypertrophy Day 1 - Primary - Push",
    numOfSets: 4,
    minPerSet: 2.5,
    movement: "Bench Press",
    section: "Primary",
    setType: "Standard",
    exercises: [
      {
        sequence: 1,
        name: "Barbell Bench Press",
        reps: 8,
        log: true
      }
    ],
    source: "D"
  },
  {
    id: 19,
    name: "Hypertrophy Day 1 - Secondary - Push",
    numOfSets: 3,
    minPerSet: 2.5,
    movement: "Push",
    section: "Secondary",
    setType: "Standard",
    exercises: [
      {
        sequence: 1,
        name: "Seated DB Shoulder Press",
        reps: 10,
        log: true
      },
      {
        sequence: 2,
        name: "Incline DB Press",
        reps: 12,
        log: true
      }
    ],
    source: "D"
  },
  {
    id: 20,
    name: "Hypertrophy Day 1 - Accessories - Push",
    numOfSets: 3,
    minPerSet: 2,
    movement: "Push",
    section: "Accessories",
    setType: "Isolation",
    exercises: [
      {
        sequence: 1,
        name: "Cable Lateral Raise",
        reps: 15,
        log: true
      },
      {
        sequence: 2,
        name: "Rope Triceps Pushdown",
        reps: 15,
        log: true
      }
    ],
    source: "D"
  },
  {
    id: 21,
    name: "Hypertrophy Day 2 - Warm-Up - Lower A",
    numOfSets: 1,
    minPerSet: 10,
    movement: "Squat",
    section: "Warm-Up",
    setType: "Prep",
    exercises: [
      {
        sequence: 1,
        name: "World\u2019s Greatest Stretch",
        reps: 2,
        log: false
      },
      {
        sequence: 2,
        name: "Deep Squat Hold",
        reps: 1,
        log: false
      },
      {
        sequence: 3,
        name: "Glute Bridge",
        reps: 10,
        log: false
      }
    ],
    source: "D"
  },
  {
    id: 22,
    name: "Hypertrophy Day 2 - Primary - Lower A",
    numOfSets: 4,
    minPerSet: 2.5,
    movement: "Leg Press",
    section: "Primary",
    setType: "Standard",
    exercises: [
      {
        sequence: 1,
        name: "Leg Press",
        reps: 12,
        log: true
      }
    ],
    source: "D"
  },
  {
    id: 23,
    name: "Hypertrophy Day 2 - Secondary - Lower A",
    numOfSets: 3,
    minPerSet: 2.5,
    movement: "Lunge",
    section: "Secondary",
    setType: "Standard",
    exercises: [
      {
        sequence: 1,
        name: "Walking Lunges",
        reps: 10,
        log: true
      },
      {
        sequence: 2,
        name: "Bulgarian Split Squat",
        reps: 10,
        log: true
      }
    ],
    source: "D"
  },
  {
    id: 24,
    name: "Hypertrophy Day 2 - Accessories - Lower A",
    numOfSets: 3,
    minPerSet: 2,
    movement: "Core",
    section: "Accessories",
    setType: "Core",
    exercises: [
      {
        sequence: 1,
        name: "Hanging Leg Raise",
        reps: 15,
        log: true
      },
      {
        sequence: 2,
        name: "Side Plank Reach Through",
        reps: 8,
        log: true
      }
    ],
    source: "D"
  },
  {
    id: 25,
    name: "Hypertrophy Day 3 - Warm-Up - Pull",
    numOfSets: 1,
    minPerSet: 10,
    movement: "Pull",
    section: "Warm-Up",
    setType: "Prep",
    exercises: [
      {
        sequence: 1,
        name: "Dead Hang",
        reps: 1,
        log: false
      },
      {
        sequence: 2,
        name: "Band Rows",
        reps: 12,
        log: false
      },
      {
        sequence: 3,
        name: "Scapular Pull-Ups",
        reps: 8,
        log: false
      }
    ],
    source: "D"
  },
  {
    id: 26,
    name: "Hypertrophy Day 3 - Primary - Pull",
    numOfSets: 4,
    minPerSet: 2.5,
    movement: "Pull-Up",
    section: "Primary",
    setType: "Standard",
    exercises: [
      {
        sequence: 1,
        name: "Pull-Up (weighted or bodyweight)",
        reps: 6,
        log: true
      }
    ],
    source: "D"
  },
  {
    id: 27,
    name: "Hypertrophy Day 3 - Secondary - Pull",
    numOfSets: 3,
    minPerSet: 2.5,
    movement: "Row",
    section: "Secondary",
    setType: "Standard",
    exercises: [
      {
        sequence: 1,
        name: "Barbell Row",
        reps: 10,
        log: true
      },
      {
        sequence: 2,
        name: "Cable Lat Pulldown",
        reps: 12,
        log: true
      }
    ],
    source: "D"
  },
  {
    id: 28,
    name: "Hypertrophy Day 3 - Accessories - Pull",
    numOfSets: 3,
    minPerSet: 2,
    movement: "Pull",
    section: "Accessories",
    setType: "Isolation",
    exercises: [
      {
        sequence: 1,
        name: "Incline DB Curl",
        reps: 15,
        log: true
      },
      {
        sequence: 2,
        name: "Rear Delt Fly",
        reps: 15,
        log: true
      }
    ],
    source: "D"
  },
  {
    id: 29,
    name: "Hypertrophy Day 4 - Warm-Up - Lower B",
    numOfSets: 1,
    minPerSet: 10,
    movement: "Deadlift",
    section: "Warm-Up",
    setType: "Prep",
    exercises: [
      {
        sequence: 1,
        name: "Hamstring Scoops",
        reps: 10,
        log: false
      },
      {
        sequence: 2,
        name: "Hip Flexor Stretch",
        reps: 1,
        log: false
      },
      {
        sequence: 3,
        name: "Good Mornings",
        reps: 10,
        log: false
      }
    ],
    source: "D"
  },
  {
    id: 30,
    name: "Hypertrophy Day 4 - Primary - Lower B",
    numOfSets: 4,
    minPerSet: 2.5,
    movement: "RDL",
    section: "Primary",
    setType: "Standard",
    exercises: [
      {
        sequence: 1,
        name: "RDL (BB or DB)",
        reps: 10,
        log: true
      }
    ],
    source: "D"
  },
  {
    id: 31,
    name: "Hypertrophy Day 4 - Secondary - Lower B",
    numOfSets: 3,
    minPerSet: 2.5,
    movement: "Hip Thrust",
    section: "Secondary",
    setType: "Standard",
    exercises: [
      {
        sequence: 1,
        name: "Hip Thrust",
        reps: 12,
        log: true
      },
      {
        sequence: 2,
        name: "Seated Hamstring Curl",
        reps: 15,
        log: true
      }
    ],
    source: "D"
  },
  {
    id: 32,
    name: "Hypertrophy Day 4 - Accessories - Lower B",
    numOfSets: 4,
    minPerSet: 2,
    movement: "Core/Calves",
    section: "Accessories",
    setType: "Core/Isolation",
    exercises: [
      {
        sequence: 1,
        name: "Calf Raise",
        reps: 15,
        log: true
      },
      {
        sequence: 2,
        name: "Cable Woodchopper",
        reps: 12,
        log: true
      }
    ],
    source: "D"
  }
];
