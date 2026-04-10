// entities.js
// Global entity/state definitions for experimentation in p5.js

// Possible entity type identifiers used across state and rendering.
const ENTITY_TYPES = {
  MINER: "miner",
  SMELTER: "smelter",
  CONSTRUCTOR: "constructor",
  TUBE: "tube",
  SHUTTLE: "shuttle",
  ROCKET_SITE: "rocketConstructionSite",
  SPLITTER: "splitter",
  MERGER: "merger",
  EXTRACTOR: "extractor"
};

// Resource identifiers used in recipes, miners, and buffers.
const RESOURCE_TYPES = {
  COPPER_ORE: "copperOre",
  COPPER_BAR: "copperBar",
  COPPER_PLATE: "copperPlate",
  COPPER_WIRE: "copperWire",
  IRON_ORE: "ironOre",
  IRON_BAR: "ironBar",
  IRON_PLATE: "ironPlate",
  MODULAR_COMPONENT: "modularComponent",
  GEAR: "gear",
  SHIP_ALLOY: "shipAlloy",
  ELECTRONICS: "electronics",
  HELIUM3: "helium3",
  ROCKET_FUEL: "rocketFuel",
};

// Tile types that count as mineable resource nodes
const MINEABLE_TILE_TYPES = new Set(["iron", "copper", "helium3"]);

// Map tile type -> resource output type for miners
const TILE_TO_RESOURCE = {
  iron: RESOURCE_TYPES.IRON_ORE,
  copper: RESOURCE_TYPES.COPPER_ORE,
  helium3: RESOURCE_TYPES.HELIUM3
};

// Tube geometry options for straight and corner placement.
const TUBE_SHAPES = {
  STRAIGHT: "straight",
  CORNER: "corner"
};

// Tube port offsets for each shape (defined for east-facing rotation).
const TUBE_PORT_DEFS = {
  [TUBE_SHAPES.STRAIGHT]: {
    input: { x: -1, y: 0 },
    output: { x: 1, y: 0 }
  },
  [TUBE_SHAPES.CORNER]: {
    input: { x: -1, y: 0 },
    output: { x: 0, y: 1 }
  }
};

/**
 * Build a stable, order-insensitive key from input slots (type+count).
 * @param {Array<{type: string|null, count: number}>} inputs - Slot list to normalize.
 * @returns {string} Normalized key or empty string when no valid inputs exist.
 */
function normalizeRecipeInputs(inputs) {
  return inputs
    .filter((input) => input && input.type && input.count > 0)
    .map((input) => `${input.type}:${input.count}`)
    .sort()
    .join("+");
}

/**
 * Find the recipe that matches the provided input slots (type+count).
 * @param {Array<{type: string|null, count: number}>} inputSlots - Current input slots.
 * @returns {object|null} Matching recipe object or null if none match.
 */
function getConstructorRecipeForInputs(inputSlots) {
  const recipes = typeof CONSTRUCTOR_RECIPES === "undefined"
    ? []
    : CONSTRUCTOR_RECIPES;
  const key = normalizeRecipeInputs(inputSlots);

  if (!key) return null;

  for (const recipe of recipes) {
    if (normalizeRecipeInputs(recipe.inputs) === key) {
      return recipe;
    }
  }

  return null;
}

// Port offsets are defined for facing East (right); rotation handles other facings.
const ENTITY_PORT_DEFS = {
  [ENTITY_TYPES.MINER]: [
    { name: "output", kind: "output", offset: { x: 1, y: 0 } }
  ],
  [ENTITY_TYPES.SMELTER]: [
    { name: "input", kind: "input", offset: { x: -1, y: 0 } },
    { name: "output", kind: "output", offset: { x: 1, y: 0 } }
  ],
  [ENTITY_TYPES.CONSTRUCTOR]: [
    { name: "input", kind: "input", offset: { x: 0, y: -1 } },
    { name: "input", kind: "input", offset: { x: 0, y: 1 } },
    { name: "output", kind: "output", offset: { x: 1, y: 0 } }
  ],
  [ENTITY_TYPES.MERGER]: [
    { name: "input", kind: "input", offset: { x: 0, y: -1 } },
    { name: "input", kind: "input", offset: { x: 0, y: 1 } },
    { name: "output", kind: "output", offset: { x: 1, y: 0 } }
  ],
  [ENTITY_TYPES.SPLITTER]: [
    { name: "input", kind: "input", offset: { x: -1, y: 0 } },
    { name: "output", kind: "output", offset: { x: 0, y: -1 } },
    { name: "output", kind: "output", offset: { x: 0, y: 1 } }
  ],
  [ENTITY_TYPES.SHUTTLE]: [
    { name: "input", kind: "input", offset: { x: -1, y: 0 } },
    { name: "output", kind: "output", offset: { x: 1, y: 0 } }
  ],
  [ENTITY_TYPES.ROCKET_SITE]: [
    { name: "input", kind: "input", offset: { x: -1, y: 0 } }
  ],
  [ENTITY_TYPES.EXTRACTOR]: [
    { name: "output", kind: "output", offset: { x: 1, y: 0 } }
  ]
};

// Rotation helpers for offsets defined in east-facing orientation.
const ROTATE_FROM_EAST = {
  E: (offset) => ({ x: offset.x, y: offset.y }),
  N: (offset) => ({ x: offset.y, y: -offset.x }),
  W: (offset) => ({ x: -offset.x, y: -offset.y }),
  S: (offset) => ({ x: -offset.y, y: offset.x })
};

// Monotonic ID counter for newly created entities.
let nextEntityId = 1;

class EntityState {
  constructor() {
    this.isOn = false;
    this.isActive = false;
    this.isBroken = false;
    this.facing = "E";
    this.inputType = null;
    this.outputType = null;
    this.inputRate = 0;
    this.outputRate = 0;
    this.isConnected = false;
  }
}

// produce 2 ore/sec
class MinerState extends EntityState {
  /**
   * Initialize miner output type/activity and compute initial rates.
   * @param {string|null} outputType - Resource type to emit or null.
   * @param {boolean} isOnResourceNode - Whether the miner is placed on a resource node.
   * @returns {void}
   */
  constructor(outputType = null, isOnResourceNode = false) {
    super();

    // Miner is ON only when placed on a valid resource node
    this.isOn = !!isOnResourceNode;
    this.isActive = this.isOn;

    // valid OUTPUTS
    const validOutputs = new Set([
      RESOURCE_TYPES.IRON_ORE,
      RESOURCE_TYPES.COPPER_ORE,
      RESOURCE_TYPES.HELIUM3
    ]);

    // if not a valid output, default to null to do nothing.
    this.outputType = validOutputs.has(outputType)
      ? outputType
      : null;

    // If not on a resource node, force outputType to null
    if (!this.isOn) {
      this.outputType = null;
    }

    this.outputRate = 0;
    this.harvestAccumulator = 0; // accumulates fractional harvest ticks
    this.updateOutputRate();
  }

  /**
   * Recompute outputRate from isOn, isActive and outputType.
   * @returns {void}
   */
  updateOutputRate() {
    this.outputRate = (this.isOn && this.isActive && this.outputType) ? 2 : 0;
  }

  /**
   * Called each frame with deltaTime to accumulate harvested resources.
   * Returns the number of whole items harvested this tick.
   * @param {number} dt - Delta time in seconds.
   * @returns {number} Number of items produced this tick.
   */
  harvest(dt) {
    if (!this.isOn || !this.isActive || !this.outputType) return 0;

    this.harvestAccumulator += this.outputRate * dt;
    const produced = Math.floor(this.harvestAccumulator);
    this.harvestAccumulator -= produced;
    return produced;
  }
}

class SmelterState extends EntityState {
  constructor(inputType = null) {
    super();
    this.acceptedInputs = [
      RESOURCE_TYPES.IRON_ORE,
      RESOURCE_TYPES.COPPER_ORE
    ];
    const validInputs = new Set(this.acceptedInputs);

    this.recipes = new Map([
      [RESOURCE_TYPES.IRON_ORE, RESOURCE_TYPES.IRON_BAR],
      [RESOURCE_TYPES.COPPER_ORE, RESOURCE_TYPES.COPPER_BAR]
    ]);

    this.inputType = validInputs.has(inputType)
      ? inputType
      : null;
    this.inputRate = this.inputType ? 1 : 0;
    this.storedInput = 0;
    this.currentRecipe = this.inputType ? this.inputType : null;

    this.outputType = this.recipes.get(this.inputType);
    this.outputRate = this.outputType ? 1 : 0;
    this.outputBuffer = 0;
  }

  canCraft() {
    return this.isActive &&
      this.currentRecipe &&
      this.storedInput >= 2;
  }

  craftOnce() {
    if (!this.canCraft()) return false;

    const outputType = this.recipes.get(this.currentRecipe);
    if (!outputType) return false;

    this.storedInput -= 2;
    this.outputType = outputType;
    this.outputBuffer += 1;
    return true;
  }
}

class ConstructorState extends EntityState {
  constructor() {
    super();
    this.isActive = true;
    this.isOn = true;
    this.inputSlots = [
      { type: null, count: 0 },
      { type: null, count: 0 }
    ];
    this.inputBuffer = [];
    this.outputType = null;
    this.outputCount = 0;
    this.outputBuffer = 0;
    this.inputRate = 0;
    this.outputRate = 0;
  }

  updateOutputFromInputs() {
    const recipe = getConstructorRecipeForInputs(this.inputSlots);

    this.outputType = recipe ? recipe.output.type : null;
    this.outputCount = recipe ? recipe.output.count : 0;
    this.inputRate = recipe
      ? recipe.inputs.reduce((sum, input) => sum + input.count, 0)
      : 0;
    this.outputRate = recipe ? recipe.output.count : 0;

    return recipe;
  }

  canCraft() {
    const recipe = getConstructorRecipeForInputs(this.inputSlots);
    if (!recipe || !this.isActive) return false;

    return recipe.inputs.every((input) => {
      const slot = this.inputSlots.find((entry) => entry.type === input.type);
      return slot && slot.count >= input.count;
    });
  }

  consumeInputs() {
    const recipe = getConstructorRecipeForInputs(this.inputSlots);
    if (!recipe || !this.isActive) return false;

    for (const input of recipe.inputs) {
      const slot = this.inputSlots.find((entry) => entry.type === input.type);
      if (!slot || slot.count < input.count) {
        return false;
      }
    }

    for (const input of recipe.inputs) {
      const slot = this.inputSlots.find((entry) => entry.type === input.type);
      slot.count -= input.count;
      if (slot.count <= 0) {
        slot.count = 0;
        slot.type = null;
      }
    }

    this.outputType = recipe.output.type;
    this.outputCount = recipe.output.count;
    this.outputBuffer += recipe.output.count;
    return true;
  }
}

class TubeState extends EntityState {
  constructor(shape = TUBE_SHAPES.STRAIGHT) {
    super();
    this.isOn = true;
    this.isActive = true;
    this.shape = shape === TUBE_SHAPES.CORNER ? shape : TUBE_SHAPES.STRAIGHT;
    this.facing = "E";
    this.carriedItem = null;
    this.isConnected = false;
  }
}

class ShuttleState extends EntityState {
  constructor() {
    super();
    this.isOn = true;
    this.isActive = true;
    this.inventory = {
      ironPlate: 10,
      copperPlate: 6,
      gear: 4
    };

    this.isConnected = false;
    this.inputType = null;
    this.outputType = null;
    this.inputRate = 0;
    this.outputRate = 0;
    this.storedInput = 0;
    this.outputBuffer = 0;
  }
}

class RocketConstructionSiteState extends EntityState {
  constructor() {
    super();
    this.isOn = false;
    this.isActive = false;
    this.required = {
      rocketFuel: 20,
      shipAlloy: 30,
      electronics: 15
    };
    this.delivered = {
      rocketFuel: 0,
      shipAlloy: 0,
      electronics: 0
    };
    this.buildProgress = 0;
    this.completed = false;

    this.chosenOutput = null;
    this.inputRate = 1;
    this.outputRate = 0;
    this.inputType = null;
    this.outputType = null;
    this.storedInput = 0;
    this.outputBuffer = 0;
  }
}

class SplitterState extends EntityState {
  constructor() {
    super();
    this.isOn = true;
    this.isActive = true;
    this.chosenOutput = null;
    this.inputRate = 1;
    this.outputRate = 1;
  }
}

class MergerState extends EntityState {
  constructor() {
    super();
    this.isOn = true;
    this.isActive = true;
    this.chosenOutput = null;
    this.inputRate = 2;
    this.outputRate = 1;
  }
}

class ExtractorState extends EntityState {
  constructor(resourceType = null) {
    super();
    this.isOn = true;
    this.isActive = true;
    this.outputType = resourceType || RESOURCE_TYPES.HELIUM3;
    this.outputRate = 1;
  }
}

class Entity {
  constructor(type, tileX, tileY, state) {
    this.id = nextEntityId++;
    this.type = type;
    this.tileX = tileX;
    this.tileY = tileY;
    this.state = state;
  }
}

/**
 * Rotate a tile offset from east-facing orientation to the given facing.
 */
function rotateOffsetFromEast(offset, facing) {
  const rotate = ROTATE_FROM_EAST[facing] || ROTATE_FROM_EAST.E;
  return rotate(offset);
}

/**
 * Check if a tile type is a mineable resource node.
 * @param {string} tileType - The tile type string.
 * @returns {boolean} True if the tile is a resource node.
 */
function isMineableTile(tileType) {
  return MINEABLE_TILE_TYPES.has(tileType);
}

/**
 * Get the resource type produced by mining a given tile type.
 * @param {string} tileType - The tile type string.
 * @returns {string|null} Resource type or null if not mineable.
 */
function getResourceForTileType(tileType) {
  return TILE_TO_RESOURCE[tileType] || null;
}

function getTubePortOffsets(tube) {
  const shape = tube.state?.shape || TUBE_SHAPES.STRAIGHT;
  const facing = tube.state?.facing || "E";
  const def = TUBE_PORT_DEFS[shape] || TUBE_PORT_DEFS[TUBE_SHAPES.STRAIGHT];

  return {
    input: rotateOffsetFromEast(def.input, facing),
    output: rotateOffsetFromEast(def.output, facing)
  };
}

function getTubePortTiles(tube) {
  const offsets = getTubePortOffsets(tube);
  const isCorner = tube.state?.shape === TUBE_SHAPES.CORNER;
  const inputKind = isCorner ? "both" : "input";
  const outputKind = isCorner ? "both" : "output";

  return [
    {
      kind: inputKind,
      worldX: tube.tileX + offsets.input.x,
      worldY: tube.tileY + offsets.input.y
    },
    {
      kind: outputKind,
      worldX: tube.tileX + offsets.output.x,
      worldY: tube.tileY + offsets.output.y
    }
  ];
}

function getTubeConnectionOffsets(tube) {
  const offsets = getTubePortOffsets(tube);
  return [offsets.input, offsets.output];
}

function getTubePortConnections(entities, tube) {
  const offsets = getTubeConnectionOffsets(tube);
  const offsetKeys = new Set(offsets.map((offset) => `${offset.x},${offset.y}`));
  const portMatches = getPortsAtTile(entities, tube.tileX, tube.tileY);
  const connections = [];

  for (const match of portMatches) {
    const dx = match.entity.tileX - tube.tileX;
    const dy = match.entity.tileY - tube.tileY;
    if (offsetKeys.has(`${dx},${dy}`)) {
      connections.push({ kind: match.port.kind, entityId: match.entity.id });
    }
  }

  return connections;
}

function getTubeEntityOffsetConnections(entities, tube) {
  const portMatches = getPortsAtTile(entities, tube.tileX, tube.tileY);
  const offsets = new Set();

  for (const match of portMatches) {
    const dx = match.entity.tileX - tube.tileX;
    const dy = match.entity.tileY - tube.tileY;
    offsets.add(`${dx},${dy}`);
  }

  return offsets;
}

function getEntityConnectionPorts(entity) {
  const portDefs = ENTITY_PORT_DEFS[entity.type];
  if (!portDefs) return [];

  const facing = entity.state?.facing || "E";

  return portDefs.map((port) => {
    const rotated = rotateOffsetFromEast(port.offset, facing);
    return {
      ...port,
      worldX: entity.tileX + rotated.x,
      worldY: entity.tileY + rotated.y
    };
  });
}

function getPortsAtTile(entities, tileX, tileY) {
  const matches = [];

  for (const entity of entities) {
    const ports = getEntityConnectionPorts(entity);
    for (const port of ports) {
      if (port.worldX === tileX && port.worldY === tileY) {
        matches.push({ entity, port });
      }
    }
  }

  return matches;
}

function getEntityById(entities, id) {
  return entities.find((entity) => entity.id === id) || null;
}

function createEntityState(type, options = {}) {
  switch (type) {
    case ENTITY_TYPES.MINER:
      return new MinerState(options.resourceType, options.isOnResourceNode);

    case ENTITY_TYPES.SMELTER:
      return new SmelterState();

    case ENTITY_TYPES.CONSTRUCTOR:
      return new ConstructorState();

    case ENTITY_TYPES.TUBE:
      return new TubeState(options.shape);

    case ENTITY_TYPES.SHUTTLE:
      return new ShuttleState();

    case ENTITY_TYPES.ROCKET_SITE:
      return new RocketConstructionSiteState();

    case ENTITY_TYPES.SPLITTER:
      return new SplitterState();

    case ENTITY_TYPES.MERGER:
      return new MergerState();

    case ENTITY_TYPES.EXTRACTOR:
      return new ExtractorState(options.resourceType);

    default:
      return new EntityState();
  }
}

function createEntity(type, tileX, tileY, options = {}) {
  return new Entity(type, tileX, tileY, createEntityState(type, options));
}

function refreshEntityConnectionStates(entities) {
  const attachedIds = new Set();
  const tubeById = new Map();
  const tubeByTile = new Map();
  const tubes = [];
  const tubeConnections = new Map();
  const adjacency = new Map();

  for (const entity of entities) {
    if (entity.type === ENTITY_TYPES.TUBE) {
      tubes.push(entity);
      tubeById.set(entity.id, entity);
      tubeByTile.set(`${entity.tileX},${entity.tileY}`, entity);
      adjacency.set(entity.id, new Set());
    }
  }

  for (const tube of tubes) {
    const offsets = getTubeConnectionOffsets(tube);
    const connectionTiles = offsets.map((offset) => ({
      x: tube.tileX + offset.x,
      y: tube.tileY + offset.y
    }));
    const entityOffsetConnections = getTubeEntityOffsetConnections(entities, tube);
    const connectionKeys = new Set(
      connectionTiles.map((tile) => `${tile.x},${tile.y}`)
    );
    tubeConnections.set(tube.id, {
      offsets,
      connectionTiles,
      connectionKeys,
      entityOffsetConnections
    });
  }

  for (const tube of tubes) {
    const connections = tubeConnections.get(tube.id);
    for (const tile of connections.connectionTiles) {
      const neighbor = tubeByTile.get(`${tile.x},${tile.y}`);
      if (!neighbor) continue;

      const neighborConnections = tubeConnections.get(neighbor.id);
      if (neighborConnections.connectionKeys.has(`${tube.tileX},${tube.tileY}`)) {
        adjacency.get(tube.id).add(neighbor.id);
        adjacency.get(neighbor.id).add(tube.id);
      }
    }
  }

  const visited = new Set();
  for (const tube of tubes) {
    if (visited.has(tube.id)) continue;

    const stack = [tube];
    const component = [];
    visited.add(tube.id);

    while (stack.length) {
      const current = stack.pop();
      component.push(current);

      for (const neighborId of adjacency.get(current.id)) {
        if (visited.has(neighborId)) continue;
        visited.add(neighborId);
        stack.push(tubeById.get(neighborId));
      }
    }

    const outputs = new Set();
    const inputs = new Set();
    const attachedInComponent = new Set();

    for (const member of component) {
      const portConnections = getTubePortConnections(entities, member);
      for (const connection of portConnections) {
        attachedInComponent.add(connection.entityId);
        if (connection.kind === "output") {
          outputs.add(connection.entityId);
        } else if (connection.kind === "input") {
          inputs.add(connection.entityId);
        }
      }
    }

    const fromEntityId = outputs.size === 1 ? [...outputs][0] : null;
    const toEntityId = inputs.size === 1 ? [...inputs][0] : null;
    const connected = !!fromEntityId && !!toEntityId;
    const fromEntity = entities.find((entity) => entity.id === fromEntityId) || null;
    const toEntity = entities.find((entity) => entity.id === toEntityId) || null;
    const sourceRate = fromEntity?.state?.outputRate ?? null;
    const sinkRate = toEntity?.state?.inputRate ?? null;
    const sinkReady = !!toEntity &&
      toEntity.state?.isActive &&
      toEntity.state?.inputType;
    const sourceItem = fromEntity?.state?.isActive
      ? fromEntity.state.outputType
      : null;
    let baseRate = 0;

    if (typeof sourceRate === "number") {
      baseRate = sourceRate;
    }

    if (sinkReady && typeof sinkRate === "number") {
      baseRate = Math.min(baseRate, sinkRate);
    }

    for (const member of component) {
      const connections = tubeConnections.get(member.id);
      const entityOffsets = connections.entityOffsetConnections;
      let hasOpenPort = false;

      for (const tile of connections.connectionTiles) {
        const key = `${tile.x},${tile.y}`;
        const neighbor = tubeByTile.get(key);
        const hasNeighbor = neighbor && adjacency.get(member.id).has(neighbor.id);
        const dx = tile.x - member.tileX;
        const dy = tile.y - member.tileY;
        const hasEntityPort = entityOffsets.has(`${dx},${dy}`);

        if (!hasNeighbor && !hasEntityPort) {
          hasOpenPort = true;
          break;
        }
      }

      member.state.fromEntityId = fromEntityId;
      member.state.toEntityId = toEntityId;
      member.state.isConnected = connected;
      const tubeRate = hasOpenPort ? 0 : baseRate;
      member.state.inputRate = tubeRate;
      member.state.outputRate = tubeRate;
      member.state.carriedItem = hasOpenPort ? null : sourceItem;
    }

    for (const entityId of attachedInComponent) {
      attachedIds.add(entityId);
    }
  }

  for (const entity of entities) {
    if (entity.type === ENTITY_TYPES.TUBE) continue;
    entity.state.isConnected = attachedIds.has(entity.id);
  }
}