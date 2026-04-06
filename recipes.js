// recipes.js
// Recipe data for construction/crafting/assembling.

const CONSTRUCTOR_RECIPES = [
  {
    inputs: [{ type: "ironBar", count: 3 }],
    output: { type: "ironPlate", count: 1 }
  },
  {
    inputs: [{ type: "ironPlate", count: 2 }],
    output: { type: "gear", count: 1 }
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
    inputs: [{ type: "copperPlate", count: 1 }],
    output: { type: "copperWire", count: 2 }
  },
  {
    inputs: [
      { type: "copperPlate", count: 2 },
      { type: "ironPlate", count: 1 }
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
