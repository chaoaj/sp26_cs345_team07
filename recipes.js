// recipes.js
// Recipe data for construction/crafting/assembling.

const CONSTRUCTOR_RECIPES = [
  {
    inputs: [{ type: "ironBar", count: 3 }],
    output: { type: "ironPlate", count: 1 }
  },
  {
    inputs: [{ type: "copperOre", count: 2 }],
    output: { type: "copperBar", count: 1 }
  },
  {
    inputs: [{ type: "copperBar", count: 3 }],
    output: { type: "copperPlate", count: 1 }
  },
  {
    inputs: [
      { type: "copperPlate", count: 2 },
      { type: "copperBar", count: 1}],
    output: { type: "copperWire", count: 3 }
  },
  {
    inputs: [
      { type: "ironBar", count: 1 },
      { type: "ironPlate", count: 2 }
    ],
    output: { type: "modularComponent", count: 1 }
  },
  {
    inputs: [
      { type: "copperWire", count: 6 },
      { type: "modularComponent", count: 2 }
    ],
    output: { type: "electronics", count: 1 }
  },
  {
    inputs: [
      { type: "copperPlate", count: 2 },
      { type: "ironPlate", count: 4 }
    ],
    output: { type: "shipAlloy", count: 1 }
  },
  {
    inputs: [{ type: "helium3", count: 4 }],
    output: { type: "rocketFuel", count: 1 }
  }
];

// Sidebar hover tooltip recipe hints by output resource type.
// Each entry may provide one or more production routes.
const RESOURCE_TOOLTIP_RECIPES = Object.freeze({
  ironBar: [
    { building: "smelter", ingredients: [{ type: "ironOre", count: 1 }] }
  ],
  ironPlate: [
    { building: "constructor", ingredients: [{ type: "ironBar", count: 3 }] }
  ],
  copperBar: [
    { building: "smelter", ingredients: [{ type: "copperOre", count: 1 }] }
  ],
  copperPlate: [
    { building: "constructor", ingredients: [{ type: "copperBar", count: 3 }] }
  ],
  copperWire: [
    { building: "constructor", ingredients: [{ type: "copperPlate", count: 0.33 }] }
  ],
  electronics: [
    {
      building: "constructor",
      ingredients: [
        { type: "copperWire", count: 6 },
        { type: "modularComponent", count: 2 }
      ]
    }
  ],
  modularComponent: [
    {
      building: "constructor",
      ingredients: [
        { type: "copperPlate", count: 2 },
        { type: "ironPlate", count: 1 }
      ]
    }
  ]
});
