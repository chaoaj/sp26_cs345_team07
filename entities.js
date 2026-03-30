// entities.js
// Global entity/state definitions for experimentation in p5.js

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

let nextEntityId = 1;

class EntityState {
  constructor() {
    // Ticket-required common fields
    this.isOn = false;          // on/off
    this.isConnected = false;   // connected or not
    this.chosenOutput = null;   // constructor output, otherwise null
    this.inputRate = null;      // items/sec or null
    this.outputRate = null;     // items/sec or null

    // Optional shared fields for future expansion
    this.isBroken = false;
    this.powered = null;
    this.progress = 0;
    this.inputBuffer = [];
    this.outputBuffer = [];
  }
}

class MinerState extends EntityState {
  constructor(resourceType = "ironOre", tier = 1) {
    super();
    this.isOn = true;
    this.resourceType = resourceType;
    this.tier = tier;
    this.inputRate = null;
    this.outputRate = tier === 1 ? 1 : 2;
    this.chosenOutput = null;
  }
}

class SmelterState extends EntityState {
  constructor() {
    super();
    this.isOn = true;
    this.acceptedInput = ["ironOre", "copperOre"];
    this.currentRecipe = null;
    this.inputRate = 1;
    this.outputRate = 1;
    this.chosenOutput = null;
  }
}

class ConstructorState extends EntityState {
  constructor(chosenOutput = null) {
    super();
    this.isOn = true;
    this.availableOutputs = [
      "ironPlate",
      "copperPlate",
      "copperWire",
      "gear",
      "modularComponent",
      "electronics",
      "shipAlloy",
      "rocketFuel"
    ];
    this.chosenOutput = chosenOutput;
    this.inputRate = 1;
    this.outputRate = 1;
  }
}

class TubeState extends EntityState {
  constructor(fromEntityId = null, toEntityId = null) {
    super();
    this.isOn = true;
    this.fromEntityId = fromEntityId;
    this.toEntityId = toEntityId;
    this.carriedItem = null;
    this.travelProgress = 0;
    this.inputRate = 1;
    this.outputRate = 1;
    this.chosenOutput = null;
    this.isConnected = fromEntityId !== null && toEntityId !== null;
  }
}

class ShuttleState extends EntityState {
  constructor() {
    super();
    this.isOn = true;
    this.isPowerSource = true;
    this.inventory = {
      ironPlate: 10,
      copperPlate: 6,
      gear: 4
    };

    this.isConnected = false;
    this.chosenOutput = null;
    this.inputRate = null;
    this.outputRate = null;
  }
}

class RocketConstructionSiteState extends EntityState {
  constructor() {
    super();
    this.isOn = false;
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
    this.outputRate = null;
  }
}

class SplitterState extends EntityState {
  constructor(outputTargets = []) {
    super();
    this.isOn = true;
    this.outputTargets = outputTargets;
    this.activeOutputIndex = 0;
    this.splitMode = "roundRobin";

    this.chosenOutput = null;
    this.inputRate = 1;
    this.outputRate = 1;
  }
}

class MergerState extends EntityState {
  constructor(inputSources = []) {
    super();
    this.isOn = true;
    this.inputSources = inputSources;
    this.lastAcceptedInputIndex = -1;

    this.chosenOutput = null;
    this.inputRate = 2;
    this.outputRate = 1;
  }
}

class ExtractorState extends EntityState {
  constructor(resourceType = "helium3") {
    super();
    this.isOn = true;
    this.resourceType = resourceType;

    this.chosenOutput = null;
    this.inputRate = null;
    this.outputRate = 0.5;
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

function createEntityState(type, options = {}) {
  switch (type) {
    case ENTITY_TYPES.MINER:
      return new MinerState(options.resourceType, options.tier);

    case ENTITY_TYPES.SMELTER:
      return new SmelterState();

    case ENTITY_TYPES.CONSTRUCTOR:
      return new ConstructorState(options.chosenOutput);

    case ENTITY_TYPES.TUBE:
      return new TubeState(options.fromEntityId, options.toEntityId);

    case ENTITY_TYPES.SHUTTLE:
      return new ShuttleState();

    case ENTITY_TYPES.ROCKET_SITE:
      return new RocketConstructionSiteState();

    case ENTITY_TYPES.SPLITTER:
      return new SplitterState(options.outputTargets || []);

    case ENTITY_TYPES.MERGER:
      return new MergerState(options.inputSources || []);

    case ENTITY_TYPES.EXTRACTOR:
      return new ExtractorState(options.resourceType);

    default:
      return new EntityState();
  }
}

function createEntity(type, tileX, tileY, options = {}) {
  return new Entity(type, tileX, tileY, createEntityState(type, options));
}

function createStarterEntities() {
  const entities = [];

  const shuttle = createEntity(ENTITY_TYPES.SHUTTLE, 5, 5);

  const minerIron = createEntity(ENTITY_TYPES.MINER, 6, 6, {
    resourceType: "ironOre",
    tier: 1
  });

  const minerCopper = createEntity(ENTITY_TYPES.MINER, 12, 10, {
    resourceType: "copperOre",
    tier: 1
  });
  minerCopper.state.isBroken = true;
  minerCopper.state.isOn = false;

  const smelter = createEntity(ENTITY_TYPES.SMELTER, 8, 8);
  smelter.state.isBroken = true;
  smelter.state.isOn = false;

  const constructorEntity = createEntity(ENTITY_TYPES.CONSTRUCTOR, 10, 8, {
    chosenOutput: "ironPlate"
  });

  const splitter = createEntity(ENTITY_TYPES.SPLITTER, 11, 9, {
    outputTargets: []
  });

  const merger = createEntity(ENTITY_TYPES.MERGER, 13, 9, {
    inputSources: []
  });

  const extractor = createEntity(ENTITY_TYPES.EXTRACTOR, 20, 18, {
    resourceType: "helium3"
  });
  extractor.state.isBroken = true;
  extractor.state.isOn = false;

  const rocketSite = createEntity(ENTITY_TYPES.ROCKET_SITE, 18, 18);

  const tube1 = createEntity(ENTITY_TYPES.TUBE, 7, 7, {
    fromEntityId: minerIron.id,
    toEntityId: smelter.id
  });

  const tube2 = createEntity(ENTITY_TYPES.TUBE, 9, 8, {
    fromEntityId: smelter.id,
    toEntityId: constructorEntity.id
  });

  entities.push(
    shuttle,
    minerIron,
    minerCopper,
    smelter,
    constructorEntity,
    splitter,
    merger,
    extractor,
    rocketSite,
    tube1,
    tube2
  );

  refreshEntityConnectionStates(entities);
  return entities;
}

function refreshEntityConnectionStates(entities) {
  const entityMap = new Map();
  const connectedIds = new Set();

  for (const entity of entities) {
    entityMap.set(entity.id, entity);
  }

  for (const entity of entities) {
    if (entity.type !== ENTITY_TYPES.TUBE) continue;

    const fromEntity = entityMap.get(entity.state.fromEntityId);
    const toEntity = entityMap.get(entity.state.toEntityId);
    const valid = !!fromEntity && !!toEntity;

    entity.state.isConnected = valid;

    if (valid) {
      connectedIds.add(fromEntity.id);
      connectedIds.add(toEntity.id);
    }
  }

  for (const entity of entities) {
    if (entity.type === ENTITY_TYPES.TUBE) continue;
    entity.state.isConnected = connectedIds.has(entity.id);
  }
}

function getEntityById(entities, id) {
  return entities.find(entity => entity.id === id) || null;
}