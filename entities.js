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
  MERGER: "merger"
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
  // helium3 -> rocketFuel through constructor
  HELIUM3: "helium3",
  ROCKET_FUEL: "rocketFuel",
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
  /**
   * Initialize base fields for directional, rate-based entities.
   * @returns {void}
   */
  constructor() {
    this.isActive = false;          // on/off (actively processing things)
    this.facing = "E";    // for buildings with directionality, default east (right)  
    this.inputType = null;       // current input item or null
    this.outputType = null;   // output type
    this.inputRate = 0;      // items/sec or null
    this.outputRate = 0;     // items/sec or null
  }
}

// produce 2 ore/sec
// integration requirements: 
// * pass outputType to constructor based on placement
// * pass isActive to constructor based on placement.
class MinerState extends EntityState {
  /**
   * Initialize miner output type/activity and compute initial rates.
   * @param {string|null} outputType - Resource type to emit or null.
   * @param {boolean} isActive - Whether the miner starts active.
   * @returns {void}
   */
  constructor(outputType = null, isActive = false) {
    super();
    this.isActive = !!isActive;
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

    this.outputRate = 0; // item/sec
    this.updateOutputRate();
  }

  /**
   * Recompute outputRate from isActive and outputType.
   * @returns {void}
   */
  updateOutputRate() {
    this.outputRate = this.isActive && this.outputType ? 2 : 0;
  }
}

// produce 1 bar/sec and consume 1 ore/sec
// integration requirements: 
// * updateSmelterInputs() exist to update inputType for smelters
class SmelterState extends EntityState {
  /**
   * Initialize smelter inputs, recipe mapping, and buffers.
   * @param {string|null} inputType - Initial ore input type or null.
   * @returns {void}
   */
  constructor(inputType = null) {
    super();
    // valid inputs
    this.acceptedInputs = [
      RESOURCE_TYPES.IRON_ORE,
      RESOURCE_TYPES.COPPER_ORE
    ];
    const validInputs = new Set(this.acceptedInputs);

    // map inputs to outputs
    this.recipes = new Map([
      [RESOURCE_TYPES.IRON_ORE, RESOURCE_TYPES.IRON_BAR],
      [RESOURCE_TYPES.COPPER_ORE, RESOURCE_TYPES.COPPER_BAR]
    ]);

    // must be a valid inputType
    this.inputType = validInputs.has(inputType)
      ? inputType
      : null;
    this.inputRate = this.inputType ? 1 : 0; // ore/sec
    this.storedInput = 0;
    this.currentRecipe = this.inputType ? this.inputType : null;

    this.outputType = this.recipes.get(this.inputType);
    this.outputRate = this.outputType ? 1 : 0; // bar/sec
    this.outputBuffer = 0;
  }

  /**
   * Returns true if there is enough stored input to craft once.
   * @returns {boolean} True when a craft can occur.
   */
  canCraft() {
    return this.isActive &&
      this.currentRecipe &&
      this.storedInput >= 2;
  }

  /**
   * Consumes 2 ore and adds 1 bar to the output buffer.
   * @returns {boolean} True when a craft was performed.
   */
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

// produce RECIPE outputs/sec based on inputs (see recipes.js)
// integration requirements:
// * updateConstructorInputs() exist to update constructor states
class ConstructorState extends EntityState {
  /**
   * Initialize constructor slots, buffers, and rate fields.
   * @returns {void}
   */
  constructor() {
    super();
    this.isActive = true;
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

  /**
   * Update output fields and rates based on inputSlots.
   * @returns {object|null} Matching recipe or null if none match.
   */
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

  /**
   * Returns true if inputSlots satisfy a recipe.
   * @returns {boolean} True when a recipe can be crafted.
   */
  canCraft() {
    const recipe = getConstructorRecipeForInputs(this.inputSlots);
    if (!recipe || !this.isActive) return false;

    return recipe.inputs.every((input) => {
      const slot = this.inputSlots.find((entry) => entry.type === input.type);
      return slot && slot.count >= input.count;
    });
  }

  /**
   * Consume recipe inputs and add outputs to the buffer.
   * @returns {boolean} True when inputs were consumed.
   */
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

// move materials around
// integration requirements:
// * some logic to allow rotating tubes
// * some logic to allow corner tubes to be placed.
class TubeState extends EntityState {
  /**
   * Initialize tube geometry, facing, and carried item display.
   * @param {string} shape - Tube shape identifier.
   * @returns {void}
   */
  constructor(
    shape = TUBE_SHAPES.STRAIGHT
  ) {
    super();
    this.isActive = true;
    // shape/facing define geometry; carriedItem is for display.
    this.shape = shape === TUBE_SHAPES.CORNER ? shape : TUBE_SHAPES.STRAIGHT;
    const facingValue = typeof facing === "string" ? facing : "E";
    this.facing = ROTATE_FROM_EAST[facingValue] ? facingValue : "E";
    this.carriedItem = null;
    this.isConnected = false;
  }
}

class ShuttleState extends EntityState {
  /**
   * Initialize shuttle inventory and input defaults.
   * @returns {void}
   */
  // integration requirements:
  // * updateShuttleInputs() to assign inputType/outputType from connected tubes.
  // * updateShuttleActivity() to set isActive based on connectivity or task state.
  // * consumeInputs()/produceOutputs() to move items into/out of buffers.
  constructor() {
    super();
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
  /**
   * Initialize construction requirements and progress state.
   * @returns {void}
   */
  // integration requirements:
  // * updateRocketSiteInputs() to assign inputType from connected tubes.
  // * updateRocketSiteActivity() to set isActive when receiving valid inputs.
  // * consumeInputs() to increment delivered counts and drive buildProgress.
  constructor() {
    super();
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

// split input tube into to tubes (divided by two)
// integration requirements:
// * updateSplitterMergerRates() to update rates based on tube connections
class SplitterState extends EntityState {
  /**
   * Initialize splitter rates and output selection.
   * @returns {void}
   */
  constructor() {
    super();
    this.isActive = true;

    this.chosenOutput = null;
    this.inputRate = 1;
    this.outputRate = 1;
  }
}

// combine two input tubes into one output tube (sum the tubes)
// integration requirements:
// * updateSplitterMergerRates() to update rates based on tube connections
class MergerState extends EntityState {
  /**
   * Initialize merger rates and output selection.
   * @returns {void}
   */
  constructor() {
    super();
    this.isActive = true;

    this.chosenOutput = null;
    this.inputRate = 2;
    this.outputRate = 1;
  }
}
class Entity {
  /**
   * Create a world entity with unique ID, location, and state.
   * @param {string} type - Entity type identifier.
   * @param {number} tileX - Tile X position.
   * @param {number} tileY - Tile Y position.
   * @param {EntityState} state - State instance for this entity.
   * @returns {void}
   */
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
 * @param {{x: number, y: number}} offset - Offset in east-facing space.
 * @param {string} facing - Cardinal direction (E/N/W/S).
 * @returns {{x: number, y: number}} Rotated offset.
 */
function rotateOffsetFromEast(offset, facing) {
  const rotate = ROTATE_FROM_EAST[facing] || ROTATE_FROM_EAST.E;
  return rotate(offset);
}

/**
 * Get tube input/output offsets based on shape and facing.
 * @param {Entity} tube - Tube entity.
 * @returns {{input: {x: number, y: number}, output: {x: number, y: number}}} Port offsets.
 */
function getTubePortOffsets(tube) {
  const shape = tube.state?.shape || TUBE_SHAPES.STRAIGHT;
  const facing = tube.state?.facing || "E";
  const def = TUBE_PORT_DEFS[shape] || TUBE_PORT_DEFS[TUBE_SHAPES.STRAIGHT];

  return {
    input: rotateOffsetFromEast(def.input, facing),
    output: rotateOffsetFromEast(def.output, facing)
  };
}

/**
 * Get world coordinates for tube ports (input/output or both for corners).
 * @param {Entity} tube - Tube entity.
 * @returns {Array<{kind: string, worldX: number, worldY: number}>} Port tiles.
 */
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

/**
 * Get offsets used for tube adjacency checks.
 * @param {Entity} tube - Tube entity.
 * @returns {Array<{x: number, y: number}>} Offsets for neighbor checks.
 */
function getTubeConnectionOffsets(tube) {
  const offsets = getTubePortOffsets(tube);
  return [offsets.input, offsets.output];
}

/**
 * Find entity ports that connect to this tube based on offsets.
 * @param {Array<Entity>} entities - All entities in the world.
 * @param {Entity} tube - Tube entity to test.
 * @returns {Array<{kind: string, entityId: number}>} Matching port connections.
 */
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

/**
 * Return a set of offset keys where the tube touches entity ports.
 * @param {Array<Entity>} entities - All entities in the world.
 * @param {Entity} tube - Tube entity to test.
 * @returns {Set<string>} Set of offset keys ("dx,dy") for entity port contacts.
 */
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

/**
 * Return world-space ports for an entity, rotated by facing.
 * @param {Entity} entity - Entity to compute ports for.
 * @returns {Array<{name: string, kind: string, offset: {x: number, y: number}, worldX: number, worldY: number}>} Ports.
 */
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

/**
 * Find all entity ports located on a specific tile.
 * @param {Array<Entity>} entities - All entities in the world.
 * @param {number} tileX - Tile X coordinate to query.
 * @param {number} tileY - Tile Y coordinate to query.
 * @returns {Array<{entity: Entity, port: object}>} Entities/ports on that tile.
 */
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

/**
 * Find a single entity by ID.
 * @param {Array<Entity>} entities - All entities in the world.
 * @param {number} id - Entity ID to search for.
 * @returns {Entity|null} Matching entity or null when not found.
 */
function getEntityById(entities, id) {
  return entities.find((entity) => entity.id === id) || null;
}

/**
 * Factory: create a state object for a given entity type.
 * @param {string} type - Entity type identifier.
 * @param {object} options - Optional creation options.
 * @returns {EntityState} New state instance.
 */
function createEntityState(type, options = {}) {
  switch (type) {
    case ENTITY_TYPES.MINER:
      return new MinerState(options.resourceType, options.isActive);

    case ENTITY_TYPES.SMELTER:
      return new SmelterState();

    case ENTITY_TYPES.CONSTRUCTOR:
      return new ConstructorState();

    case ENTITY_TYPES.TUBE:
      return new TubeState(
        options.fromEntityId,
        options.toEntityId,
        options.shape,
        options.facing
      );

    case ENTITY_TYPES.SHUTTLE:
      return new ShuttleState();

    case ENTITY_TYPES.ROCKET_SITE:
      return new RocketConstructionSiteState();

    case ENTITY_TYPES.SPLITTER:
      return new SplitterState();

    case ENTITY_TYPES.MERGER:
      return new MergerState();

    default:
      return new EntityState();
  }
}

/**
 * Factory: create an entity with an ID and state.
 * @param {string} type - Entity type identifier.
 * @param {number} tileX - Tile X position.
 * @param {number} tileY - Tile Y position.
 * @param {object} options - Optional creation options.
 * @returns {Entity} New entity instance.
 */
function createEntity(type, tileX, tileY, options = {}) {
  return new Entity(type, tileX, tileY, createEntityState(type, options));
}


/**
 * Recompute tube networks, rates, carried items, and attached entity flags.
 * @param {Array<Entity>} entities - All entities in the world.
 * @returns {void}
 */
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
