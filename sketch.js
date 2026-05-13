// sketch.js
let currentState = "MENU";
let startButton, settingsButton, backButtonGame, backButtonSettings, escapeButton;
let titlePage, settingsPage;
let selectedHotbarSlot = 0;
const hotbarSlots = 6;
let canvas;
let isSidebarOpen = false; 
let sidebarX = -70; // start hidden to the left
let sidebarWidth = 70; 
let ironOreImg, ironBarImg, ironPlateImg;
let copperOreImg, copperBarImg, copperPlateImg, copperWireImg;
let heliumImg, modularComponentImg, rocketFuelImg, electronicsImg, shipAlloyImg;
let sideBarFrameImg, sideBarTabOpen, sideBarTabClosed;
let endScreenImg;
let creditsEndScreenStartedAt = null;
const CREDITS_END_SCREEN_MS = 5000;
const CREDITS_END_TRIGGER_Y = -950;

let creditsButtonSettings, backButtonCredits;
let creditsScrollY = 600;

let shuttleSpriteSheetImg;

let helpButton, helpButtonSettings;
let showHelpMenu = false;

let ironOre = 0, ironBar = 0, ironPlate = 0;
let copperOre = 0, copperBar = 0, copperPlate = 0, copperWire = 0;
let helium = 0, rocketFuel = 0;
let modularComponent = 0, shipAlloy = 0, electronics = 0;

let playerSpriteSheetFrontIdle, playerSpriteSheetFrontMove;
let playerSpriteSheetBackIdle, playerSpriteSheetBackMove;
let playerSpriteSheetSideIdle, playerSpriteSheetSideMove;
let reactivePlayerIdleSheetImg, reactivePlayerPlaceImg;

let pipeFrontOffImg, pipeFrontOnImg, pipeCurve1OffImg, pipeCurve1OnImg, pipeCurve2OffImg, pipeCurve2OnImg, pipeSideOffImg, pipeSideOnImg, pipeSideOnMiniImg, minerSpriteSheetImg, smelterFrontImg, smelterSideImg, smelterBackImg, constructorFrontImg, constructorSideImg, constructorBackImg, splitterFrontImg, splitterBackImg, splitterSideImg, mergerFrontImg, mergerBackImg, mergerSideImg, rocketPlatformImg, rocketPlatformBuiltImg;
let ironDepositImg, copperDepositImg, heliumDepositImg;

let placeSound, hoverSound, clickSound, movementSound;

let isMoving = false;

let bgTiles = [];
let stars = [];

let currentDirection = "front";
let currentAnimation = "idle";
let currentFrame = 0;
let facingLeft = false;
const animationFPS = 10;
const REACTIVE_PLAYER_IDLE_FRAME_WIDTH = 63;
const REACTIVE_PLAYER_IDLE_FRAME_HEIGHT = 70;
const REACTIVE_PLAYER_IDLE_FRAMES = 60;
const REACTIVE_PLAYER_IDLE_FPS = 12;
const REACTIVE_PLAYER_PLACE_DURATION_MS = 500;
let reactivePlayerPlacePoseUntilMs = 0;

const ROCKET_HALF_WIDTH_TILES = 1;   // 3 tiles wide
const ROCKET_HALF_HEIGHT_TILES = 1;  // 3 tiles tall

const spriteDimensions = {
  front: {
    idle: { width: 294, height: 31, frames: 14 },
    move: { width: 210, height: 31, frames: 10 }
  },
  back: {
    idle: { width: 294, height: 31, frames: 14 },
    move: { width: 210, height: 31, frames: 10 }
  },
  side: {
    idle: { width: 252, height: 32, frames: 14 },
    move: { width: 162, height: 32, frames: 9 }
  }
};

/**
 * Get entity fill rgb.
 * @param {*} entityType - Entity type identifier.
 * @returns {*} Computed value for the requested operation.
 */
function getEntityFillRgb(entityType) {
  if (entityType === ENTITY_TYPES.MINER) return [90, 170, 90];
  if (entityType === ENTITY_TYPES.SMELTER) return [200, 120, 80];
  if (entityType === ENTITY_TYPES.CONSTRUCTOR) return [90, 140, 220];
  //if (entityType === ENTITY_TYPES.TUBE) return [120, 120, 120];
  if (entityType === ENTITY_TYPES.SHUTTLE) return [230, 230, 120];
  if (entityType === ENTITY_TYPES.ROCKET_SITE) return [180, 180, 255];
  if (entityType === ENTITY_TYPES.SPLITTER) return [180, 120, 220];
  if (entityType === ENTITY_TYPES.MERGER) return [120, 220, 180];
  if (entityType === ENTITY_TYPES.EXTRACTOR) return [120, 255, 255];
  return [200, 200, 200];
}

// Slot -> entity type mapping for quick experimentation
const HOTBAR_ENTITY_TYPES = [
  ENTITY_TYPES.MINER,
  ENTITY_TYPES.SMELTER,
  ENTITY_TYPES.CONSTRUCTOR,
  ENTITY_TYPES.TUBE,
  ENTITY_TYPES.SPLITTER,
  ENTITY_TYPES.MERGER,
];

const HOTBAR_BUILDING_NAMES = [
  "Miner",
  "Smelter",
  "Constructor",
  "Tube",
  "Splitter",
  "Merger",
];

const hotbarItems = HOTBAR_ENTITY_TYPES.map((entityType, i) => ({
  kind: "building",
  entityType,
  name: HOTBAR_BUILDING_NAMES[i],
  color: getEntityFillRgb(entityType),
  shape: "square"
}));

const SIDEBAR_RESOURCE_TYPES = [
  RESOURCE_TYPES.IRON_ORE,
  RESOURCE_TYPES.IRON_BAR,
  RESOURCE_TYPES.IRON_PLATE,
  RESOURCE_TYPES.COPPER_ORE,
  RESOURCE_TYPES.COPPER_BAR,
  RESOURCE_TYPES.COPPER_PLATE,
  RESOURCE_TYPES.COPPER_WIRE,
  RESOURCE_TYPES.HELIUM3,
  RESOURCE_TYPES.ELECTRONICS,
  RESOURCE_TYPES.MODULAR_COMPONENT,
  RESOURCE_TYPES.SHIP_ALLOY,
  RESOURCE_TYPES.ROCKET_FUEL
];

let sidebarScrollOffset = 0;
let sidebarMaxVisibleItems = 12;

const RESTRICTED_SHUTTLE_COL = 25;
const RESTRICTED_SHUTTLE_ROW = 6;

// Manual per-facing pixel offsets for corner tube sprites.
// Adjust x/y here as needed; defaults are intentionally zero.
const CORNER_TUBE_MANUAL_PIXEL_OFFSETS = {
  E: { x: 1, y: 0 },
  S: { x: 1, y: 0 },
  W: { x: 0, y: 0 },
  N: { x: 0, y: 0 }
};

// Manual per-facing pixel offsets for smelter sprites.
// Shift left by 1px by default for all facings.
const SMELTER_MANUAL_PIXEL_OFFSETS = {
  E: { x: -3, y: 0 },
  S: { x: 0, y: -1 },
  W: { x: -3, y: 0 },
  N: { x: 0, y: -1 }
};

// Base orientation transform for corner tube facings.
const CORNER_TUBE_BASE_VISUAL_TRANSFORMS = Object.freeze({
  E: Object.freeze({ angle: 0, mirrorX: false }),
  S: Object.freeze({ angle: 0, mirrorX: true }),
  W: Object.freeze({ angle: 0, mirrorX: false }),
  N: Object.freeze({ angle: 0, mirrorX: true })
});

const BACKGROUND_MUSIC_SEQUENCE = Object.freeze([
  Object.freeze({
    title: "Dance of the Moon Rocks",
    file: "resources/music/Dance of the Moon Rocks.m4a",
    postDelayMs: 2 * 60 * 1000
  }),
  Object.freeze({
    title: "Lunar Blues",
    file: "resources/music/Lunar Blues.m4a",
    postDelayMs: () => randomIntInRange(2 * 60 * 1000, 4 * 60 * 1000)
  })
]);

let backgroundMusicPlayers = [];
let backgroundMusicBootstrapped = false;
let backgroundMusicStarted = false;
let backgroundMusicCurrentIndex = -1;
let backgroundMusicTimerId = null;
let backgroundMusicScheduleToken = 0;
let backgroundMusicLastVolume = null;
let backgroundMusicWarnedMissing = false;

const OPTIMIZATION_WINDOW_SECONDS = 30;
const OPTIMIZATION_FLOW_WINDOW_SECONDS = 6;
const OPTIMIZATION_BUILD_GRACE_MS = 2500;
const OPTIMIZATION_WEIGHT_THROUGHPUT = 0.4;
const OPTIMIZATION_WEIGHT_UTILIZATION = 0.2;
const OPTIMIZATION_WEIGHT_FLOW = 0.2;
const OPTIMIZATION_WEIGHT_RECIPE = 0.1;
const OPTIMIZATION_WEIGHT_COST = 0.1;
const OPTIMIZATION_COST_TARGET_RATE_PER_ENTITY = 0.35;
const OPTIMIZATION_COST_PREBUILD_FLOOR = 0.08;
const OPTIMIZATION_PANEL_WIDTH = 220;
const OPTIMIZATION_PANEL_COLLAPSED_H = 48;
const OPTIMIZATION_PANEL_EXPANDED_H = 262;
const OPTIMIZATION_MAX_WEAKPOINT_LINES = 5;

/**
 * Random Int In Range.
 * @param {*} minInclusive - Input value used by this operation.
 * @param {*} maxInclusive - Input value used by this operation.
 * @returns {*} Computed result value.
 */
function randomIntInRange(minInclusive, maxInclusive) {
  const min = Number(minInclusive) || 0;
  const max = Number(maxInclusive) || min;
  if (max <= min) return Math.floor(min);
  const delta = max - min;
  return Math.floor(min + Math.random() * (delta + 1));
}

/**
 * Get music slider volume.
 * @returns {*} Computed value for the requested operation.
 */
function getMusicSliderVolume() {
  const raw = Number(typeof musicVolume === "number" ? musicVolume : 0.5);
  if (!Number.isFinite(raw)) return 0.5;
  return Math.max(0, Math.min(1, raw));
}

/**
 * Apply background music volume.
 * @returns {void} No return value.
 */
function applyBackgroundMusicVolume() {
  const volume = getMusicSliderVolume();
  if (backgroundMusicLastVolume === volume) {
    return;
  }
  backgroundMusicLastVolume = volume;
  for (const track of backgroundMusicPlayers) {
    if (track?.audio) {
      track.audio.volume = volume;
    }
  }
}

/**
 * Bootstrap Background Music.
 * @returns {object} Computed object result.
 */
function bootstrapBackgroundMusic() {
  if (backgroundMusicBootstrapped) {
    return;
  }
  backgroundMusicBootstrapped = true;
  backgroundMusicPlayers = BACKGROUND_MUSIC_SEQUENCE.map((entry, index) => {
    const audio = new Audio(entry.file);
    audio.preload = "auto";
    audio.loop = false;
    audio.volume = getMusicSliderVolume();
    audio.addEventListener("ended", () => {
      onBackgroundMusicTrackEnded(index);
    });
    audio.addEventListener("error", () => {
      if (!backgroundMusicWarnedMissing) {
        console.warn(
          "Background music file missing/unloadable. " +
          "Add .m4a files under resources/music/."
        );
        backgroundMusicWarnedMissing = true;
      }
    });
    return { ...entry, audio };
  });
}

/**
 * Resolve track post delay ms.
 * @param {*} track - Background music track descriptor.
 * @returns {*} Computed value for the requested operation.
 */
function resolveTrackPostDelayMs(track) {
  if (!track) return 0;
  if (typeof track.postDelayMs === "function") {
    const v = Number(track.postDelayMs());
    return Number.isFinite(v) ? Math.max(0, Math.floor(v)) : 0;
  }
  const fixed = Number(track.postDelayMs);
  return Number.isFinite(fixed) ? Math.max(0, Math.floor(fixed)) : 0;
}

/**
 * Clear background music timer.
 * @returns {void} No return value.
 */
function clearBackgroundMusicTimer() {
  if (backgroundMusicTimerId != null) {
    clearTimeout(backgroundMusicTimerId);
    backgroundMusicTimerId = null;
  }
}

/**
 * Schedule background music track.
 * @param {*} index - Zero-based index value.
 * @param {*} delayMs - Delay duration in milliseconds.
 * @returns {void} No return value.
 */
function scheduleBackgroundMusicTrack(index, delayMs) {
  clearBackgroundMusicTimer();
  const safeDelay = Math.max(0, Number(delayMs) || 0);
  const token = ++backgroundMusicScheduleToken;
  backgroundMusicTimerId = setTimeout(() => {
    if (token !== backgroundMusicScheduleToken) {
      return;
    }
    playBackgroundMusicTrack(index);
  }, safeDelay);
}

/**
 * On Background Music Track Ended.
 * @param {*} endedIndex - Index of the track that finished playing.
 * @returns {void} No return value.
 */
function onBackgroundMusicTrackEnded(endedIndex) {
  if (!backgroundMusicStarted || endedIndex !== backgroundMusicCurrentIndex) {
    return;
  }
  const track = backgroundMusicPlayers[endedIndex];
  const waitMs = resolveTrackPostDelayMs(track);
  const nextIndex = (endedIndex + 1) % backgroundMusicPlayers.length;
  scheduleBackgroundMusicTrack(nextIndex, waitMs);
}

/**
 * Play background music track.
 * @param {*} index - Zero-based index value.
 * @returns {void} No return value.
 */
function playBackgroundMusicTrack(index) {
  if (!backgroundMusicPlayers.length) {
    return;
  }

  const safeIndex = ((index % backgroundMusicPlayers.length) + backgroundMusicPlayers.length) % backgroundMusicPlayers.length;
  backgroundMusicCurrentIndex = safeIndex;
  applyBackgroundMusicVolume();

  for (let i = 0; i < backgroundMusicPlayers.length; i++) {
    const other = backgroundMusicPlayers[i]?.audio;
    if (!other || i === safeIndex) {
      continue;
    }
    if (!other.paused) {
      other.pause();
    }
    if (other.currentTime !== 0) {
      other.currentTime = 0;
    }
  }

  const activeTrack = backgroundMusicPlayers[safeIndex];
  const activeAudio = activeTrack?.audio;
  if (!activeAudio) {
    return;
  }

  activeAudio.currentTime = 0;
  const playPromise = activeAudio.play();
  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(() => {
      const waitMs = resolveTrackPostDelayMs(activeTrack);
      const nextIndex = (safeIndex + 1) % backgroundMusicPlayers.length;
      scheduleBackgroundMusicTrack(nextIndex, waitMs);
    });
  }
}

/**
 * Request background music start.
 * @returns {void} No return value.
 */
function requestBackgroundMusicStart() {
  bootstrapBackgroundMusic();
  if (backgroundMusicStarted || backgroundMusicPlayers.length === 0) {
    return;
  }
  backgroundMusicStarted = true;
  if (typeof userStartAudio === "function") {
    userStartAudio();
  }
  // Start immediately inside the user gesture call stack (click/key),
  // otherwise browsers may block playback if it runs in a timeout.
  clearBackgroundMusicTimer();
  playBackgroundMusicTrack(0);
}

/**
 * Clamp a numeric value into [0, 1].
 * @param {*} value - Value to clamp.
 * @returns {number} Clamped value between 0 and 1.
 */
function clampZeroToOne(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return 0;
  }
  if (numeric <= 0) return 0;
  if (numeric >= 1) return 1;
  return numeric;
}

/**
 * Build the initial optimization-metric state object.
 * @returns {object} Fresh optimization state with rolling-window accumulators.
 */
function createOptimizationState() {
  return {
    windowSeconds: OPTIMIZATION_WINDOW_SECONDS,
    sampleDurationTotal: 0,
    sampleQueue: [],
    weightedSums: {
      throughput: 0,
      utilization: 0,
      flow: 0,
      recipe: 0,
      cost: 0
    },
    graceUntilMs: 0,
    isInGraceWindow: false,
    isPanelExpanded: false,
    liveScore: 100,
    displayScore: 100,
    grade: "A+",
    breakdown: {
      throughput: 1,
      utilization: 1,
      flow: 1,
      recipe: 1,
      cost: 1
    },
    latest: null,
    bottlenecks: []
  };
}

/**
 * Ensure optimization state exists on the active run state.
 * @param {*} runtimeState - Active drawGame.state object.
 * @returns {object|null} Optimization state or null when runtime state is unavailable.
 */
function ensureOptimizationState(runtimeState) {
  if (!runtimeState) {
    return null;
  }
  if (!runtimeState.optimization) {
    runtimeState.optimization = createOptimizationState();
  }
  return runtimeState.optimization;
}

/**
 * Convert a score (0-100) into a grade label.
 * @param {*} score - Numeric score.
 * @returns {string} Grade text label.
 */
function getOptimizationGradeLabel(score) {
  const s = Number(score) || 0;
  if (s >= 95) return "S";
  if (s >= 90) return "A";
  if (s >= 80) return "B";
  if (s >= 70) return "C";
  if (s >= 60) return "D";
  if (s >= 50) return "F";
  return "F-";
}

/**
 * Get a display color for a score tier.
 * @param {*} score - Numeric score.
 * @returns {number[]} RGB tuple for score tier coloring.
 */
function getOptimizationScoreColor(score) {
  const s = Number(score) || 0;
  if (s < 50) return [214, 84, 78];
  if (s < 75) return [236, 185, 67];
  return [95, 212, 120];
}

/**
 * Estimate installed factory output capacity for a producer entity.
 * @param {*} entity - Target entity instance.
 * @returns {number} Estimated nominal output rate for this entity.
 */
function getFactoryNominalOutputRate(entity) {
  const type = entity?.type;
  const state = entity?.state;
  if (!type || !state) {
    return 0;
  }

  if (type === ENTITY_TYPES.MINER) {
    if (!state.outputType) return 0;
    // Miner implementation currently uses 2/sec for ore and helium in state logic.
    return 2;
  }

  if (type === ENTITY_TYPES.SMELTER) {
    const hasRecipeContext = !!state.inputType || !!state.outputType || !!state.currentRecipe;
    return hasRecipeContext ? 1 : 0;
  }

  if (type === ENTITY_TYPES.CONSTRUCTOR) {
    if (state.outputType && Number(state.outputCount) > 0) {
      return Math.max(0, Number(state.outputCount) || 0);
    }
    const hasInputContext =
      Array.isArray(state.inputSlots) &&
      state.inputSlots.some((slot) => !!slot?.type);
    return hasInputContext ? 1 : 0;
  }

  if (type === ENTITY_TYPES.EXTRACTOR) {
    if (!state.outputType) return 0;
    const rate = Number(state.outputRate);
    return Number.isFinite(rate) && rate > 0 ? rate : 1;
  }

  return 0;
}

/**
 * Add a sample to the rolling optimization window and trim overflow.
 * @param {*} optimizationState - Optimization state object.
 * @param {*} sample - Subscore sample object.
 * @param {*} dt - Sample duration in seconds.
 * @returns {void} No return value.
 */
function pushOptimizationRollingSample(optimizationState, sample, dt) {
  if (!optimizationState || !sample) {
    return;
  }
  const duration = Number(dt);
  if (!Number.isFinite(duration) || duration <= 0) {
    return;
  }

  const normalizedSample = {
    dt: duration,
    throughput: clampZeroToOne(sample.throughput),
    utilization: clampZeroToOne(sample.utilization),
    flow: clampZeroToOne(sample.flow),
    recipe: clampZeroToOne(sample.recipe),
    cost: clampZeroToOne(sample.cost)
  };

  optimizationState.sampleQueue.push(normalizedSample);
  optimizationState.sampleDurationTotal += normalizedSample.dt;
  optimizationState.weightedSums.throughput += normalizedSample.throughput * normalizedSample.dt;
  optimizationState.weightedSums.utilization += normalizedSample.utilization * normalizedSample.dt;
  optimizationState.weightedSums.flow += normalizedSample.flow * normalizedSample.dt;
  optimizationState.weightedSums.recipe += normalizedSample.recipe * normalizedSample.dt;
  optimizationState.weightedSums.cost += normalizedSample.cost * normalizedSample.dt;

  const maxDuration = Math.max(1, Number(optimizationState.windowSeconds) || OPTIMIZATION_WINDOW_SECONDS);
  while (optimizationState.sampleDurationTotal - maxDuration > 1e-6 && optimizationState.sampleQueue.length > 0) {
    const overflow = optimizationState.sampleDurationTotal - maxDuration;
    const head = optimizationState.sampleQueue[0];
    if (!head) {
      break;
    }

    const consume = Math.min(head.dt, overflow);
    optimizationState.sampleDurationTotal -= consume;
    optimizationState.weightedSums.throughput -= head.throughput * consume;
    optimizationState.weightedSums.utilization -= head.utilization * consume;
    optimizationState.weightedSums.flow -= head.flow * consume;
    optimizationState.weightedSums.recipe -= head.recipe * consume;
    optimizationState.weightedSums.cost -= head.cost * consume;
    head.dt -= consume;

    if (head.dt <= 1e-6) {
      optimizationState.sampleQueue.shift();
    }
  }

  optimizationState.weightedSums.throughput = Math.max(0, optimizationState.weightedSums.throughput);
  optimizationState.weightedSums.utilization = Math.max(0, optimizationState.weightedSums.utilization);
  optimizationState.weightedSums.flow = Math.max(0, optimizationState.weightedSums.flow);
  optimizationState.weightedSums.recipe = Math.max(0, optimizationState.weightedSums.recipe);
  optimizationState.weightedSums.cost = Math.max(0, optimizationState.weightedSums.cost);
}

/**
 * Compute rolling-average subscores from the optimization sample window.
 * @param {*} optimizationState - Optimization state object.
 * @param {*} fallbackSample - Instant subscores used when the rolling window is empty.
 * @returns {object} Rolling-average subscores in [0, 1].
 */
function getOptimizationRollingBreakdown(optimizationState, fallbackSample) {
  const fallback = fallbackSample || {};
  const totalDuration = Number(optimizationState?.sampleDurationTotal) || 0;
  if (totalDuration <= 1e-6) {
    return {
      throughput: clampZeroToOne(fallback.throughput),
      utilization: clampZeroToOne(fallback.utilization),
      flow: clampZeroToOne(fallback.flow),
      recipe: clampZeroToOne(fallback.recipe),
      cost: clampZeroToOne(fallback.cost)
    };
  }

  return {
    throughput: clampZeroToOne(optimizationState.weightedSums.throughput / totalDuration),
    utilization: clampZeroToOne(optimizationState.weightedSums.utilization / totalDuration),
    flow: getRecentOptimizationMetricAverage(
      optimizationState,
      "flow",
      OPTIMIZATION_FLOW_WINDOW_SECONDS,
      fallback.flow
    ),
    recipe: clampZeroToOne(optimizationState.weightedSums.recipe / totalDuration),
    cost: clampZeroToOne(optimizationState.weightedSums.cost / totalDuration)
  };
}

/**
 * Compute a trailing-window average for a specific optimization metric.
 * @param {*} optimizationState - Optimization state object.
 * @param {*} metricKey - Sample field name (for example: "flow").
 * @param {*} windowSeconds - Trailing window duration in seconds.
 * @param {*} fallbackValue - Value used when no recent samples exist.
 * @returns {number} Clamped trailing average in [0, 1].
 */
function getRecentOptimizationMetricAverage(
  optimizationState,
  metricKey,
  windowSeconds,
  fallbackValue
) {
  const queue = Array.isArray(optimizationState?.sampleQueue)
    ? optimizationState.sampleQueue
    : [];
  const targetWindow = Math.max(0, Number(windowSeconds) || 0);
  if (queue.length === 0 || targetWindow <= 1e-6) {
    return clampZeroToOne(fallbackValue);
  }

  let remaining = targetWindow;
  let weightedTotal = 0;
  let usedDuration = 0;

  for (let i = queue.length - 1; i >= 0 && remaining > 1e-6; i--) {
    const sample = queue[i];
    const sampleDt = Math.max(0, Number(sample?.dt) || 0);
    if (sampleDt <= 1e-6) {
      continue;
    }
    const useDt = Math.min(sampleDt, remaining);
    const metricValue = clampZeroToOne(sample?.[metricKey]);
    weightedTotal += metricValue * useDt;
    usedDuration += useDt;
    remaining -= useDt;
  }

  if (usedDuration <= 1e-6) {
    return clampZeroToOne(fallbackValue);
  }
  return clampZeroToOne(weightedTotal / usedDuration);
}

/**
 * Compute instantaneous optimization subscores and bottleneck diagnostics.
 * @param {*} entities - Collection of active entities in the world.
 * @param {*} rocketProgress - Rocket progress summary from this frame.
 * @returns {object} Instant metric snapshot.
 */
function computeInstantOptimizationSnapshot(entities, rocketProgress) {
  const list = Array.isArray(entities) ? entities : [];
  let tubeCount = 0;
  let flowingTubeCount = 0;
  let blockedTubeCount = 0;
  let openPortTubeCount = 0;
  let machineCount = 0;
  let activeMachineCount = 0;
  let relevantRecipeMachineCount = 0;
  let validRecipeMachineCount = 0;
  let placeableEntityCount = 0;
  let factoryProducerCount = 0;
  let throughputPotentialRate = 0;
  let throughputActualRate = 0;

  for (const entity of list) {
    const type = entity?.type;
    const state = entity?.state || null;
    if (!type || !state) {
      continue;
    }

    const isSpecialFixedEntity =
      type === ENTITY_TYPES.ROCKET_SITE || type === ENTITY_TYPES.SHUTTLE;
    if (!isSpecialFixedEntity) {
      placeableEntityCount += 1;
    }

    if (type === ENTITY_TYPES.TUBE) {
      tubeCount += 1;
      if (state.flowState === "flowing") {
        flowingTubeCount += 1;
      } else if (state.flowState === "blocked") {
        blockedTubeCount += 1;
      }
      if (state.hasOpenPort) {
        openPortTubeCount += 1;
      }
      continue;
    }

    if (isSpecialFixedEntity) {
      continue;
    }

    machineCount += 1;
    if (state.isActive) {
      activeMachineCount += 1;
    }

    // Total capacity is based on raw miner harvesting only.
    const nominalFactoryRate = getFactoryNominalOutputRate(entity);
    if (nominalFactoryRate > 0) {
      factoryProducerCount += 1;
      if (type === ENTITY_TYPES.MINER) {
        throughputPotentialRate += nominalFactoryRate;
      }
    }

    if (type !== ENTITY_TYPES.SMELTER && type !== ENTITY_TYPES.CONSTRUCTOR) {
      continue;
    }

    const hasInputSignal = type === ENTITY_TYPES.SMELTER
      ? (Number(state.inputRate) > 0 || !!state.inputType)
      : (
          Number(state.inputRate) > 0 ||
          (Array.isArray(state.inputSlots) &&
            state.inputSlots.some((slot) => !!slot?.type))
        );

    if (!hasInputSignal) {
      continue;
    }

    relevantRecipeMachineCount += 1;
    const validRecipe =
      !!state.isActive &&
      !!state.outputType &&
      Number(state.outputRate) > 0;
    if (validRecipe) {
      validRecipeMachineCount += 1;
    }
  }

  throughputPotentialRate = Math.max(0, throughputPotentialRate);
  const rocketRequiredTypes = new Set();
  const rocketRequired = rocketProgress?.rocket?.state?.required;
  if (rocketRequired && typeof rocketRequired === "object") {
    for (const resourceType of Object.keys(rocketRequired)) {
      if (resourceType) {
        rocketRequiredTypes.add(resourceType);
      }
    }
  }

  const entitiesById = new Map(list.map((entity) => [entity.id, entity]));
  const tubeSourcesByTarget = getTubeSourcesByTarget(list);
  const sinkSourceIds = new Set();
  const countedSinkComponents = new Set();

  for (const entity of list) {
    if (!entity || entity.type !== ENTITY_TYPES.TUBE) {
      continue;
    }
    const tubeState = entity.state || null;
    if (!tubeState?.isConnected) {
      continue;
    }
    const sourceId = tubeState.fromEntityId;
    const targetId = tubeState.toEntityId;
    if (!sourceId || !targetId) {
      continue;
    }
    const outputType = tubeState.carriedItem || null;
    const flowRate = Math.max(0, Number(tubeState.outputRate) || 0);
    if (!outputType || flowRate <= 0) {
      continue;
    }
    const targetEntity = entitiesById.get(targetId);
    const targetType = targetEntity?.type || null;
    if (
      targetType !== ENTITY_TYPES.SHUTTLE &&
      targetType !== ENTITY_TYPES.ROCKET_SITE
    ) {
      continue;
    }

    // Rocket-required outputs only count when delivered to the rocket.
    if (
      targetType === ENTITY_TYPES.SHUTTLE &&
      rocketRequiredTypes.has(outputType)
    ) {
      continue;
    }
    // Rocket intake only counts required output types.
    if (
      targetType === ENTITY_TYPES.ROCKET_SITE &&
      rocketRequiredTypes.size > 0 &&
      !rocketRequiredTypes.has(outputType)
    ) {
      continue;
    }

    const componentKey = tubeState.componentId != null
      ? `c:${tubeState.componentId}`
      : `t:${entity.id}`;
    if (countedSinkComponents.has(componentKey)) {
      continue;
    }
    countedSinkComponents.add(componentKey);
    sinkSourceIds.add(sourceId);
  }

  const contributingMinerIds = new Set();
  const visitedEntities = new Set();
  const upstreamQueue = Array.from(sinkSourceIds);
  while (upstreamQueue.length > 0) {
    const entityId = upstreamQueue.pop();
    if (!entityId || visitedEntities.has(entityId)) {
      continue;
    }
    visitedEntities.add(entityId);

    const sourceEntity = entitiesById.get(entityId);
    if (!sourceEntity) {
      continue;
    }
    if (sourceEntity.type === ENTITY_TYPES.MINER) {
      contributingMinerIds.add(sourceEntity.id);
      continue;
    }

    const upstreamSources = tubeSourcesByTarget.get(entityId);
    if (!upstreamSources) {
      continue;
    }
    for (const upstreamId of upstreamSources) {
      if (!visitedEntities.has(upstreamId)) {
        upstreamQueue.push(upstreamId);
      }
    }
  }

  let sinkThroughputRate = 0;
  for (const minerId of contributingMinerIds) {
    const miner = entitiesById.get(minerId);
    if (!miner || miner.type !== ENTITY_TYPES.MINER) {
      continue;
    }
    const minerState = miner.state || null;
    if (!minerState?.isActive || !minerState.outputType) {
      continue;
    }
    sinkThroughputRate += Math.max(0, Number(minerState.outputRate) || 0);
  }

  throughputActualRate = Math.max(0, sinkThroughputRate);
  if (throughputPotentialRate > 0) {
    throughputActualRate = Math.min(throughputActualRate, throughputPotentialRate);
  }
  const rocketCompleted = !!rocketProgress?.completed;

  let throughputScore = 1;
  if (throughputPotentialRate > 0) {
    throughputScore = clampZeroToOne(throughputActualRate / throughputPotentialRate);
  } else if (factoryProducerCount > 0 || placeableEntityCount > 0) {
    throughputScore = 0;
  }

  const utilizationScore = machineCount > 0
    ? clampZeroToOne(activeMachineCount / machineCount)
    : 1;

  let flowScore = 1;
  if (tubeCount > 0) {
    const flowRatio = flowingTubeCount / tubeCount;
    const blockedPenalty = blockedTubeCount / tubeCount;
    const openPenalty = openPortTubeCount / (tubeCount * 2);
    flowScore = clampZeroToOne(flowRatio - blockedPenalty * 0.35 - openPenalty * 0.5);
  }

  const recipeScore = relevantRecipeMachineCount > 0
    ? clampZeroToOne(validRecipeMachineCount / relevantRecipeMachineCount)
    : 1;

  const expectedRate = Math.max(
    0.1,
    placeableEntityCount * OPTIMIZATION_COST_TARGET_RATE_PER_ENTITY
  );
  const costBaseScore = placeableEntityCount > 0
    ? clampZeroToOne(throughputActualRate / expectedRate)
    : 1;
  const costScore = (!rocketCompleted && placeableEntityCount > 0)
    ? Math.max(OPTIMIZATION_COST_PREBUILD_FLOOR, costBaseScore)
    : costBaseScore;

  const idleMachineCount = Math.max(0, machineCount - activeMachineCount);
  const invalidRecipeMachineCount = Math.max(
    0,
    relevantRecipeMachineCount - validRecipeMachineCount
  );

  const bottlenecks = [];
  if (factoryProducerCount === 0 && placeableEntityCount > 0) {
    bottlenecks.push({
      severity: 1,
      text: "No factory producers are configured."
    });
  }
  if (factoryProducerCount > 0 && throughputActualRate <= 0.001) {
    bottlenecks.push({
      severity: 0.95,
      text: "Factory output is near zero."
    });
  }
  if (blockedTubeCount > 0 && tubeCount > 0) {
    bottlenecks.push({
      severity: blockedTubeCount / tubeCount,
      text: `${blockedTubeCount} blocked tube${blockedTubeCount === 1 ? "" : "s"}.`
    });
  }
  if (openPortTubeCount > 0 && tubeCount > 0) {
    bottlenecks.push({
      severity: openPortTubeCount / tubeCount,
      text: `${openPortTubeCount} tube${openPortTubeCount === 1 ? "" : "s"} with open ports.`
    });
  }
  if (idleMachineCount > 0 && machineCount > 0) {
    bottlenecks.push({
      severity: idleMachineCount / machineCount,
      text: `${idleMachineCount} idle machine${idleMachineCount === 1 ? "" : "s"}.`
    });
  }
  if (invalidRecipeMachineCount > 0 && relevantRecipeMachineCount > 0) {
    bottlenecks.push({
      severity: invalidRecipeMachineCount / relevantRecipeMachineCount,
      text: `${invalidRecipeMachineCount} machine${invalidRecipeMachineCount === 1 ? "" : "s"} with invalid recipe ratios.`
    });
  }
  bottlenecks.sort((a, b) => (b.severity || 0) - (a.severity || 0));

  return {
    throughputScore,
    utilizationScore,
    flowScore,
    recipeScore,
    costScore,
    rocketCompleted,
    throughputActualRate,
    throughputPotentialRate,
    counts: {
      placeableEntityCount,
      machineCount,
      activeMachineCount,
      factoryProducerCount,
      tubeCount,
      flowingTubeCount,
      blockedTubeCount,
      openPortTubeCount,
      relevantRecipeMachineCount,
      validRecipeMachineCount
    },
    bottlenecks: bottlenecks.slice(0, 3)
  };
}

/**
 * Activate the score grace window after build/edit operations.
 * @param {*} durationMs - Grace duration in milliseconds.
 * @returns {void} No return value.
 */
function triggerOptimizationBuildGraceWindow(durationMs = OPTIMIZATION_BUILD_GRACE_MS) {
  if (!drawGame.state) {
    return;
  }
  const optimization = ensureOptimizationState(drawGame.state);
  if (!optimization) {
    return;
  }
  const duration = Math.max(0, Number(durationMs) || 0);
  optimization.graceUntilMs = Math.max(
    Number(optimization.graceUntilMs) || 0,
    millis() + duration
  );
}

/**
 * Update rolling optimization metrics and maintain display state.
 * @param {*} runtimeState - Active drawGame.state object.
 * @param {*} entities - Collection of active entities in the world.
 * @param {*} dt - Frame delta time in seconds.
 * @param {*} rocketProgress - Rocket progress summary from this frame.
 * @returns {void} No return value.
 */
function updateOptimizationMetrics(runtimeState, entities, dt, rocketProgress) {
  const optimization = ensureOptimizationState(runtimeState);
  if (!optimization) {
    return;
  }

  const instant = computeInstantOptimizationSnapshot(entities, rocketProgress);
  optimization.latest = instant;

  pushOptimizationRollingSample(
    optimization,
    {
      throughput: instant.throughputScore,
      utilization: instant.utilizationScore,
      flow: instant.flowScore,
      recipe: instant.recipeScore,
      cost: instant.costScore
    },
    dt
  );

  const rolling = getOptimizationRollingBreakdown(optimization, {
    throughput: instant.throughputScore,
    utilization: instant.utilizationScore,
    flow: instant.flowScore,
    recipe: instant.recipeScore,
    cost: instant.costScore
  });

  const weightedScore =
    rolling.throughput * OPTIMIZATION_WEIGHT_THROUGHPUT +
    rolling.utilization * OPTIMIZATION_WEIGHT_UTILIZATION +
    rolling.flow * OPTIMIZATION_WEIGHT_FLOW +
    rolling.recipe * OPTIMIZATION_WEIGHT_RECIPE +
    rolling.cost * OPTIMIZATION_WEIGHT_COST;
  const liveScore = clampZeroToOne(weightedScore) * 100;

  optimization.liveScore = liveScore;
  const previousDisplay = Number(optimization.displayScore);
  if (!Number.isFinite(previousDisplay)) {
    optimization.displayScore = liveScore;
  }

  const now = millis();
  optimization.isInGraceWindow = now < (Number(optimization.graceUntilMs) || 0);
  if (optimization.isInGraceWindow) {
    // During edits, keep the score from dropping abruptly while still allowing improvements.
    optimization.displayScore = Math.max(Number(optimization.displayScore) || liveScore, liveScore);
  } else {
    optimization.displayScore = liveScore;
  }

  optimization.breakdown = rolling;
  optimization.grade = getOptimizationGradeLabel(optimization.displayScore);
  optimization.bottlenecks = instant.bottlenecks || [];
}

// FIXED: Moved Credits button initialization to the Settings menu layout and restored Quit button position
/**
 * Initialize global UI, audio, and menu button state for the sketch runtime.
 * @returns {void} No return value.
 */
function setup() {
  canvas = createCanvas(600, 600);
  noSmooth();
  drawingContext.imageSmoothingEnabled = false;

  centerCanvas();
  textAlign(CENTER, CENTER);

  if (typeof ENTITY_PORT_DEFS !== "undefined" && typeof ENTITY_TYPES !== "undefined") {
    ENTITY_PORT_DEFS[ENTITY_TYPES.SHUTTLE] = [
      { kind: "input", offset: { x: 0, y: -1 } }, // Top
      { kind: "input", offset: { x: 0, y: 1 } },  // Bottom
      { kind: "input", offset: { x: -1, y: 0 } }, // Left
      { kind: "input", offset: { x: 1, y: 0 } }   // Right
    ];
  }

  stars = [];
  for (let i = 0; i < 400; i++) {
    stars.push({
      x: random(0, 2000), 
      y: random(0, 2000),
      r: random(1, 3),
      alpha: random(100, 255)
    });
  }

  helpButton = new Button(width - 255, 10, 80, 32, "Keybinds", () => {
    showHelpMenu = !showHelpMenu;
  });
  helpButton.fontSize = 14;
  startButton = new Button (90, 350, 150, 55, "Start", () => {
    currentState = "GAME";
  });
  settingsButton = new Button(90, 405, 150, 55, "Settings", () => {
    currentState = "SETTINGS";
  });
  escapeButton = new Button(90, 460, 150, 55, "Quit", () => {
    window.close();
  });

  backButtonGame = new Button(10, 10, 100, 40, "<-- Back", () => {
    currentState = "MENU";
  });
  testEndGameButton = new Button(140, 20, 120, 40, "Test End", () => {
    currentState = "CREDITS";
    creditsScrollY = height;
    creditsEndScreenStartedAt = null;
  });
  
  // Positioned side-by-side at the bottom of the settings panel
  backButtonSettings = new Button(180, 430, 110, 40, "<- Return", () => {
    currentState = "MENU";
  });
  creditsButtonSettings = new Button(310, 430, 110, 40, "Credits", () => {
    currentState = "CREDITS";
    creditsScrollY = height;
    creditsEndScreenStartedAt = null;
  });
  helpButtonSettings = new Button(250, 310, 100, 40, "Keybinds", () => {
    showHelpMenu = !showHelpMenu;
  });
  helpMenuCloseButton = new Button(260, 405, 80, 30, "Close", () => {
    showHelpMenu = false;
  });
  backButtonCredits = new Button(30, 20, 100, 40, "<-- Back", () => {
    currentState = "MENU";
  });
  
  setupSettings();
  bootstrapBackgroundMusic();
}

/**
 * Load image and audio assets required by menus, entities, and UI overlays.
 * @returns {void} No return value.
 */
function preload() {
  bgTiles[0] = loadImage('resources/tiles/tile1.png');
  bgTiles[1] = loadImage('resources/tiles/tile2.png');
  bgTiles[2] = loadImage('resources/tiles/tile3.png');
  bgTiles[3] = loadImage('resources/tiles/tile4.png');

  pipeFrontOffImg = loadImage('resources/pipes/pipeFrontOff.png');
  pipeFrontOnImg = loadImage('resources/pipes/pipeFrontOn.png');
  pipeCurve1OffImg = loadImage('resources/pipes/pipeCurve1Off.png');
  pipeCurve1OnImg = loadImage('resources/pipes/pipeCurve1On.png');
  pipeCurve2OffImg = loadImage('resources/pipes/pipeCurve2Off.png');
  pipeCurve2OnImg = loadImage('resources/pipes/pipeCurve2On.png');
  pipeSideOffImg = loadImage('resources/pipes/pipeSideOff.png');
  pipeSideOnImg = loadImage('resources/pipes/pipeSideOn.png');
  pipeSideOnMiniImg = pipeSideOnImg;
  shuttleSpriteSheetImg = loadImage('resources/shuttle/shuttle.png');
  endScreenImg = loadImage('resources/endScreen.png');
  minerSpriteSheetImg = loadImage('resources/miner/miner.png');
  smelterFrontImg = loadImage('resources/smelter/smelterFront.png');
  smelterSideImg = loadImage('resources/smelter/smelterSide.png');
  smelterBackImg = loadImage('resources/smelter/smelterBack.png');
  constructorFrontImg = loadImage('resources/constructor/constructorFront.png');
  constructorSideImg = loadImage('resources/constructor/constructorSide.png');
  constructorBackImg = loadImage('resources/constructor/constructorBack.png');
  splitterFrontImg = loadImage('resources/splitter/merger/splitterFront.png');
  splitterBackImg = loadImage('resources/splitter/merger/splitterBack.png');
  splitterSideImg = loadImage('resources/splitter/merger/splitterSide.png');
  mergerFrontImg = loadImage('resources/splitter/merger/mergerFront.png');
  mergerBackImg = loadImage('resources/splitter/merger/mergerBack.png');
  mergerSideImg = loadImage('resources/splitter/merger/mergerSide.png');
  rocketPlatformImg = loadImage('resources/rocket/rocketPlatform(unbuilt).png');
  rocketPlatformBuiltImg = loadImage('resources/rocket/rocketPlatform(built).png');

  titlePage = loadImage('resources/Title.jpg');
  settingsPage = loadImage('resources/Settings.jpg');
  settingsBG = loadImage('resources/settingsBG.png');
  ironOreImg = loadImage('resources/resourceIcons/ironOreIcon.png');
  ironBarImg = loadImage('resources/resourceIcons/ironBarIcon.png');
  ironPlateImg = loadImage('resources/resourceIcons/ironPlateIcon.png');
  copperOreImg = loadImage('resources/resourceIcons/copperOreIcon.png');
  copperBarImg = loadImage('resources/resourceIcons/copperBarIcon.png');
  copperPlateImg = loadImage('resources/resourceIcons/copperPlateIcon.png');
  copperWireImg = loadImage('resources/resourceIcons/wireIcon.png');
  heliumImg = loadImage('resources/resourceIcons/heliumThreeIcon.png');
  modularComponentImg = loadImage('resources/resourceIcons/modularComponentIcon.png');
  electronicsImg = loadImage('resources/resourceIcons/electronicsIcon.png');
  shipAlloyImg = loadImage('resources/resourceIcons/shipAlloyIcon.png');
  rocketFuelImg = loadImage('resources/resourceIcons/rocketFuelIcon.png');
  sideBarFrameImg = loadImage('resources/UI/sidebarFrame.png');
  sideBarTabOpen = loadImage('resources/UI/sidebarTabOpen.png');
  sideBarTabClosed = loadImage('resources/UI/sidebarTabClosed.png');
  playerSpriteSheetBackIdle = loadImage('resources/player/pBackIdle.png');
  playerSpriteSheetBackMove = loadImage('resources/player/pBackMove.png');
  playerSpriteSheetFrontIdle = loadImage('resources/player/pFrontIdle.png');
  playerSpriteSheetFrontMove = loadImage('resources/player/pFrontMove.png');
  playerSpriteSheetSideIdle = loadImage('resources/player/pSideIdle.png');
  playerSpriteSheetSideMove = loadImage('resources/player/pSideMove.png');
  reactivePlayerIdleSheetImg = loadImage('resources/reactivePlayer/reactivePlayerIdle.png');
  reactivePlayerPlaceImg = loadImage('resources/reactivePlayer/ReactivePlayerPlace.png');
  hotbarOutlineImg = loadImage('resources/UI/hotbarFrame.png');
  copperDepositImg = loadImage('resources/resourceNodes/copperDeposit.png');
  ironDepositImg = loadImage('resources/resourceNodes/ironDeposit.png');
  heliumDepositImg = loadImage('resources/resourceNodes/helium3Deposit.png');
  placeSound = loadSound('resources/sounds/Place.wav');
  hoverSound = loadSound('resources/sounds/hover_button.wav');
  clickSound = loadSound('resources/sounds/Click_button.wav');
  movementSound = loadSound('resources/sounds/Movement.wav');
}

/**
 * Center canvas.
 * @returns {void} No return value.
 */
function centerCanvas() {
  if (!canvas) {
    return;
  }
  const x = max(0, (windowWidth - width) / 2);
  const y = max(0, (windowHeight - height) / 2);
  canvas.position(x, y);
}

/**
 * Window Resized.
 * @returns {void} No return value.
 */
function windowResized() {
  centerCanvas();
}

/**
 * Render the current top-level game state and route to the active screen renderer.
 * @returns {void} No return value.
 */
function draw() {
  applyBackgroundMusicVolume();
  cursor('default');
  if (currentState == "MENU") {
    drawMenu();
    hideSettingsUI();
    if (!isMoving && movementSound && movementSound.isPlaying()) {
      movementSound.stop();
    }
  } else if (currentState == "GAME") {
    background(0);
    drawGame();
    hideSettingsUI();
  } else if (currentState == "CREDITS") {
    drawCredits();
    hideSettingsUI();
  } else if (currentState == "SETTINGS") {
    drawSettings();
  }
}

// FIXED: Removed the Credits button from the main menu rendering
/**
 * Draw menu.
 * @returns {void} No return value.
 */
function drawMenu() {
  if (titlePage) {
    image(titlePage, 0, 0, width, height);
  }

  push();
  noFill();
  stroke(0);
  strokeWeight(3);

  if (startButton) startButton.draw();
  if (settingsButton) settingsButton.draw();
  if (escapeButton) escapeButton.draw();

  if (startButton && escapeButton) {
    rect(
      startButton.x,
      startButton.y,
      startButton.w,
      (escapeButton.y + escapeButton.h) - startButton.y,
      2
    );
  }

  if (settingsButton) {
    rect(settingsButton.x, settingsButton.y, settingsButton.w, 55, 2);
  }

  pop();
}

/**
 * Draw credits.
 * @returns {void} No return value.
 */
function drawCredits() {
  background(10, 10, 15);
  if (creditsEndScreenStartedAt != null) {
    if (endScreenImg) {
      image(endScreenImg, 0, 0, width, height);
    }

    if (millis() - creditsEndScreenStartedAt >= CREDITS_END_SCREEN_MS) {
      creditsEndScreenStartedAt = null;
      currentState = "MENU";
    }

    return;
  }
  
  creditsScrollY -= 1; 
  
  push();
  noStroke();
  for (let star of stars) {
    let sx = star.x % width;
    let sy = (star.y + (height - creditsScrollY) * 0.2) % height; 
    if (sy < 0) sy += height;
    fill(255, star.alpha);
    ellipse(sx, sy, star.r, star.r);
  }

  pop();
  push();
  textAlign(CENTER, TOP);
  
  let y = creditsScrollY;
  
  textSize(36);
  textStyle(BOLD);
  fill(235, 242, 255);
  text("ROCKET LAUNCH SUCCESSFUL", width/2, y);
  y += 100;
  
  textSize(28);
  fill(200, 214, 245);
  text("CREDITS", width/2, y);
  y += 80;
  
  textSize(20);
  fill(150, 180, 240);
  text("Developers", width/2, y);
  y += 50;
  textSize(24);
  fill(255);
  text("Danial Abbasi", width/2, y);
  y += 45;
  text("John Rosario Cruz", width/2, y);
  y += 45;
  text("Samuel Bohdan", width/2, y);
  y += 45;
  text("Steven Lorence", width/2, y);
  y += 45;
  text("Will Vinson", width/2, y);
  y += 80;

  textSize(20);
  fill(150, 180, 240);
  text("Music", width/2, y);
  y += 50;
  textSize(24);
  fill(255);
  text("Jack Devitt", width/2, y);
  y += 45;
  text("John Rosario Cruz", width/2, y);
  y += 80;

  textSize(20);
  fill(150, 180, 240);
  text("Graphics", width/2, y);
  y += 50;
  textSize(24);
  fill(255);
  text("Will Vinson", width/2, y);
  y += 80;

  textSize(16);
  fill(200, 214, 245);
  text("Thank you for playing!", width/2, y);

  pop();
  
  if (creditsScrollY < CREDITS_END_TRIGGER_Y) {
    creditsEndScreenStartedAt = millis();
  }
  
  if (backButtonCredits) backButtonCredits.draw();
}

/**
 * Get rocket footprint tiles.
 * @param {*} centerTileX - Input value used by this operation.
 * @param {*} centerTileY - Input value used by this operation.
 * @returns {*} Computed value for the requested operation.
 */
function getRocketFootprintTiles(centerTileX, centerTileY) {
  const tiles = [];
  for (let dy = -ROCKET_HALF_HEIGHT_TILES; dy <= ROCKET_HALF_HEIGHT_TILES; dy++) {
    for (let dx = -ROCKET_HALF_WIDTH_TILES; dx <= ROCKET_HALF_WIDTH_TILES; dx++) {
      tiles.push({
        x: centerTileX + dx,
        y: centerTileY + dy,
        isCenter: dx === 0 && dy === 0
      });
    }
  }
  return tiles;
}

/**
 * Reset Runtime Game State For New Run.
 * @returns {void} No return value.
 */
function resetRuntimeGameStateForNewRun() {
  drawGame.state = null;
  selectedHotbarSlot = 0;
  isSidebarOpen = false;
  sidebarX = -sidebarWidth;
  sidebarScrollOffset = 0;

  ironOre = 0;
  ironBar = 0;
  ironPlate = 0;
  copperOre = 0;
  copperBar = 0;
  copperPlate = 0;
  copperWire = 0;
  helium = 0;
  rocketFuel = 0;
  modularComponent = 0;
  shipAlloy = 0;
  electronics = 0;
  reactivePlayerPlacePoseUntilMs = 0;
}

/**
 * Draw end game.
 * @returns {void} No return value.
 */
function drawEndGame() {
  background(20, 28, 44);

  push();
  fill(235, 242, 255);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(44);
  text("Rocket Completed!", width / 2, height / 2 - 40);
  textStyle(NORMAL);
  textSize(18);
  text("End-game screen stub", width / 2, height / 2 + 6);
  textSize(14);
  fill(200, 214, 245);
  text("Press Enter, Space, or Esc to return to menu", width / 2, height / 2 + 44);
  pop();
}

/**
 * Run one gameplay frame including simulation updates, camera, world rendering, and UI.
 * @returns {boolean} Whether the check or operation succeeds.
 */
function drawGame() {
  const restrictedMode = (typeof isRestrictedModeEnabled === "function")
    ? isRestrictedModeEnabled()
    : false;

  // Rebuild the cached run state whenever the mode flag changes between frames.
  if (
    drawGame.state &&
    drawGame.state.isRestrictedMode !== restrictedMode
  ) {
    drawGame.state = null;
  }

  // One-time world bootstrap for the active run.
  if (!drawGame.state) {
    const tileSize = 32;
    const mapCols = 75;
    const mapRows = 75;
    const tiles = [];

    for (let y = 0; y < mapRows; y++) {
      const row = [];
      for (let x = 0; x < mapCols; x++) {
        const rand = Math.random();
        let chosenBgIndex = 0; 
        
        if (rand < 0.65) {
          chosenBgIndex = 2; // 65% chance for the plain base tile (tile1.png)
        } else if (rand < 0.76) {
          chosenBgIndex = 1; // ~11.6% chance for tile2
        } else if (rand < 0.88) {
          chosenBgIndex = 0; // ~11.6% chance for tile3
        } else {
          chosenBgIndex = 3; // ~11.6% chance for tile4
        }

        row.push({
          type: "empty",
          resource: null,
          resourceNodeId: null,
          resourceNodeOriginX: null,
          resourceNodeOriginY: null,
          item: null,
          colorOverride: null,
          entity: null,
          entityId: null,
          building: null,
          bgIndex: chosenBgIndex
        });
      }
      tiles.push(row);
    }

    // Existing terrain
    for (let x = 4; x < 11; x++) {
      tiles[6][x].type = "dirt";
    }
    for (let y = 8; y < 15; y++) {
      tiles[y][12].type = "dirt";
    }
    for (let y = 16; y < 22; y++) {
      for (let x = 15; x < 21; x++) {
        tiles[y][x].type = "dirt";
      }
    }

    const getNodeResourceType = (nodeKey) => {
      if (nodeKey === "iron") return RESOURCE_TYPES.IRON_ORE;
      if (nodeKey === "copper") return RESOURCE_TYPES.COPPER_ORE;
      if (nodeKey === "helium3") return RESOURCE_TYPES.HELIUM3;
      return null;
    };
    const setResourceNodeTile = (col, row, nodeKey, nodeId, originX, originY) => {
      if (row < 0 || row >= mapRows || col < 0 || col >= mapCols) {
        return;
      }
      const t = tiles[row][col];
      t.type = nodeKey;
      t.resource = getNodeResourceType(nodeKey);
      t.resourceNodeId = nodeId || null;
      t.resourceNodeOriginX = Number.isFinite(originX) ? originX : null;
      t.resourceNodeOriginY = Number.isFinite(originY) ? originY : null;
    };
    const placeResourceNodeBlock2x2 = (topLeftCol, topLeftRow, nodeKey) => {
      if (
        topLeftCol < 0 ||
        topLeftCol + 1 >= mapCols ||
        topLeftRow < 0 ||
        topLeftRow + 1 >= mapRows
      ) {
        return false;
      }
      const nodeId = `${nodeKey}:${topLeftCol},${topLeftRow}`;
      for (let dy = 0; dy < 2; dy++) {
        for (let dx = 0; dx < 2; dx++) {
          setResourceNodeTile(
            topLeftCol + dx,
            topLeftRow + dy,
            nodeKey,
            nodeId,
            topLeftCol,
            topLeftRow
          );
        }
      }
      return true;
    };

    const placeScatteredResourceBlocks = (nodeKey, count, maxAttempts = 1200) => {
      let placed = 0;
      let attempts = 0;
      while (placed < count && attempts < maxAttempts) {
        attempts++;
        const x = Math.floor(Math.random() * (mapCols - 1));
        const y = Math.floor(Math.random() * (mapRows - 1));

        let canPlace = true;
        for (let oy = 0; oy < 2 && canPlace; oy++) {
          for (let ox = 0; ox < 2; ox++) {
            const tx = x + ox;
            const ty = y + oy;
            const tile = tiles[ty] && tiles[ty][tx];
            if (
              !tile ||
              tile.entityId != null ||
              tile.type !== "empty"
            ) {
              canPlace = false;
              break;
            }
          }
        }
        if (!canPlace) {
          continue;
        }
        if (!placeResourceNodeBlock2x2(x, y, nodeKey)) {
          continue;
        }
        placed++;
      }
    };

    // Apply mode-specific resource seeding after helper placement utilities are prepared.
    if (restrictedMode) {
      applyRestrictedModeResourceLayout(
        tiles,
        mapCols,
        mapRows,
        placeResourceNodeBlock2x2
      );
    } else {
      // Resource patches for testing in creative mode
      placeResourceNodeBlock2x2(6, 6, "iron");
      placeResourceNodeBlock2x2(8, 6, "iron");
      placeResourceNodeBlock2x2(10, 6, "iron");

      placeResourceNodeBlock2x2(12, 10, "copper");
      placeResourceNodeBlock2x2(14, 10, "copper");
      placeResourceNodeBlock2x2(12, 12, "copper");
      placeResourceNodeBlock2x2(14, 12, "copper");

      placeResourceNodeBlock2x2(17, 18, "helium3");

      // Additional random scatter so the map has more distributed ore nodes.
      placeScatteredResourceBlocks("iron", 12);
      placeScatteredResourceBlocks("copper", 12);
    }

    const entities = [];
    const rocketMinCenterX = ROCKET_HALF_WIDTH_TILES;
    const rocketMaxCenterX = mapCols - 1 - ROCKET_HALF_WIDTH_TILES;
    const rocketMinCenterY = ROCKET_HALF_HEIGHT_TILES;
    const rocketMaxCenterY = mapRows - 1 - ROCKET_HALF_HEIGHT_TILES;
    const rocketTileX = constrain(
      floor(mapCols / 2) - 10,
      rocketMinCenterX,
      rocketMaxCenterX
    );
    const rocketTileY = constrain(
      mapRows - 1 - ROCKET_HALF_HEIGHT_TILES - 3,
      rocketMinCenterY,
      rocketMaxCenterY
    );

    if (restrictedMode) {
      // Guaranteed copper node in the open area to the right of the crashed rocket.
      const rocketRightCopperX = constrain(
        rocketTileX + ROCKET_HALF_WIDTH_TILES + 3,
        0,
        mapCols - 2
      );
      const rocketRightCopperY = constrain(
        rocketTileY - 1,
        0,
        mapRows - 2
      );
      placeResourceNodeBlock2x2(rocketRightCopperX, rocketRightCopperY, "copper");
    }

    // Spawn and stamp the fixed rocket platform while preserving its input-port tiles for tube placement.
    const rocketEntity = createEntity(
      ENTITY_TYPES.ROCKET_SITE,
      rocketTileX,
      rocketTileY,
      {}
    );
    rocketEntity.state.facing = "E";
    rocketEntity.state.isOn = true;

    entities.push(rocketEntity);

    const rocketInputPortSet = new Set(
      getEntityConnectionPorts(rocketEntity)
        .filter((port) => port.kind === "input")
        .map((port) => `${port.worldX},${port.worldY}`)
    );

    // Occupy a 3x3 footprint centered on the rocket tile.
    // Leave input-port tiles placeable so tubes can connect on-port.
    for (const fp of getRocketFootprintTiles(rocketTileX, rocketTileY)) {
      const row = tiles[fp.y];
      const tile = row ? row[fp.x] : null;
      if (!tile) continue;
      const isRocketInputPort = rocketInputPortSet.has(`${fp.x},${fp.y}`);
      if (!isRocketInputPort) {
        tile.entityId = rocketEntity.id;
        tile.entity = rocketEntity;
        tile.item = ENTITY_TYPES.ROCKET_SITE;
      }
      tile.building = {
        color: getEntityFillRgb(ENTITY_TYPES.ROCKET_SITE),
        label: fp.isCenter ? "RO" : "",
        name: "Rocket Ship",
        entityType: ENTITY_TYPES.ROCKET_SITE,
        facing: "E",
        entityId: rocketEntity.id
      };
    }

    drawGame.state = {
      config: {
        tileSize,
        mapCols,
        mapRows,
        mapOriginX: 0,
        mapOriginY: 0,
        margin: 0,
        topMargin: 80,
        modificationRadiusTiles: 5
      },
      map: { tiles },
      entities,
      player: {
        x: tileSize * 5,
        y: tileSize * 5,
        size: 54.4,
        speed: 180
      },
      feedback: {
        rangeBlinkUntil: 0,
        buildCostBlinkUntil: 0,
        buildCostMessageUntil: 0,
        buildCostEntityType: null,
        buildCostMessageText: "",
        rocketCompletionModalUntil: 0,
        rocketCompletionModalText: ""
      },
      placementFacing: "E",
      placementTubeShape: TUBE_SHAPES.STRAIGHT,
      selectedBuilding: null,
      renderCache: {
        worldLayer: null,
        minimapLayer: null,
        minimapTileSize: null,
        minimapCols: null,
        minimapRows: null
      },
      optimization: createOptimizationState(),
      animationTimer: 0,
      restrictedBuildRestrictionsDisabled: false
    };

    drawGame.state.isRestrictedMode = restrictedMode;
    drawGame.state.shuttleEntityId = null;

    spawnRestrictedModeShuttle(drawGame.state);
    updateConnections(entities);
  }

  const { config, map, player, feedback, entities } = drawGame.state;
  const { tileSize, mapCols, mapRows, mapOriginX, mapOriginY, modificationRadiusTiles } = config;

  if (drawGame.state.placementFacing == null) {
    drawGame.state.placementFacing = "E";
  }
  if (drawGame.state.placementTubeShape == null) {
    drawGame.state.placementTubeShape = TUBE_SHAPES.STRAIGHT;
  }
  if (drawGame.state.selectedBuilding === undefined) {
    drawGame.state.selectedBuilding = null;
  }
  if (feedback.buildCostBlinkUntil == null) {
    feedback.buildCostBlinkUntil = 0;
  }
  if (feedback.buildCostMessageUntil == null) {
    feedback.buildCostMessageUntil = 0;
  }
  if (feedback.buildCostEntityType === undefined) {
    feedback.buildCostEntityType = null;
  }
  if (feedback.buildCostMessageText == null) {
    feedback.buildCostMessageText = "";
  }
  if (feedback.rocketCompletionModalUntil == null) {
    feedback.rocketCompletionModalUntil = 0;
  }
  if (feedback.rocketCompletionModalText == null) {
    feedback.rocketCompletionModalText = "";
  }
  ensureOptimizationState(drawGame.state);

  if (drawGame.state.player.facing === undefined) {
    drawGame.state.player.facing = "N";
  }

  // Resolve movement intent from input, then update motion and animation state.
  let moveX = 0;
  let moveY = 0;
  if (keyIsDown(65)) moveX -= 1;
  if (keyIsDown(68)) moveX += 1;
  if (keyIsDown(87)) moveY -= 1;
  if (keyIsDown(83)) moveY += 1;

  const dt = min(0.05, deltaTime / 1000);
  const isMoving = (moveX !== 0 || moveY !== 0);

  if (isMoving) {
    if (movementSound && !movementSound.isPlaying()) {
      movementSound.loop();
    }
    const len = Math.hypot(moveX, moveY);
    const speed = player.speed * dt;
    player.x += (moveX / len) * speed;
    player.y += (moveY / len) * speed;
  } else {
    if (movementSound && movementSound.isPlaying()) {
      movementSound.stop();
    }
    else {}
  }

  const prevDirection = currentDirection;
  const prevAnimation = currentAnimation;
  if (isMoving) {
    if (moveY < 0) {
      currentDirection = "back";
    } else if (moveY > 0) {
      currentDirection = "front";
    } else if (moveX !== 0) {
      currentDirection = "side";
      facingLeft = moveX < 0;
    }
    currentAnimation = "move";
  } else {
    currentAnimation = "idle";
  }
  if (prevDirection !== currentDirection || prevAnimation !== currentAnimation) {
    currentFrame = 0;
    if (drawGame.state) drawGame.state.animationTimer = 0;
  }

  const mapWidth = mapCols * tileSize;
  const mapHeight = mapRows * tileSize;
  const halfPlayer = player.size / 2;
  player.x = constrain(player.x, mapOriginX + halfPlayer, mapOriginX + mapWidth - halfPlayer);
  player.y = constrain(player.y, mapOriginY + halfPlayer, mapOriginY + mapHeight - halfPlayer);

  // Advance simulation systems in dependency order before rendering.
  // Mining/factory rates update first, then shuttle intake and rocket completion checks.
  updateMinerHarvesting(entities, dt);
  updateFactoryProduction(entities, dt);
  updateRestrictedModeShuttleIntake(entities, dt);
  const rocketProgress = updateRocketConstructionProgress(entities, dt);
  updateOptimizationMetrics(drawGame.state, entities, dt, rocketProgress);
  if (rocketProgress.justCompleted) {
    feedback.rocketCompletionModalUntil = millis() + 12000;
    feedback.rocketCompletionModalText = "Rocket ship complete. Walk to it to launch.";
  }
  if (
    rocketProgress.completed &&
    rocketProgress.rocket &&
    isPlayerNearRocketForLaunch(player, rocketProgress.rocket, config)
  ) {
    currentState = "CREDITS";
    creditsScrollY = height;
    creditsEndScreenStartedAt = null;
    return;
  }

  // Build camera and visibility bounds used by terrain, overlays, and hover interactions.
  const cameraX = player.x - width / 2;
  const cameraY = player.y - height / 2;
  const visibleMinCol = max(0, floor((cameraX - mapOriginX) / tileSize) - 1);
  const visibleMaxCol = min(
    mapCols - 1,
    floor((cameraX + width - mapOriginX) / tileSize) + 1
  );
  const visibleMinRow = max(0, floor((cameraY - mapOriginY) / tileSize) - 1);
  const visibleMaxRow = min(
    mapRows - 1,
    floor((cameraY + height - mapOriginY) / tileSize) + 1
  );

  // Draw parallax starfield in screen space before entering world-space camera transforms.
  push();
  noStroke();
  let wrapW = width + 200;
  let wrapH = height + 200;
  for (let star of stars) {
    let sx = (star.x - cameraX * 0.2) % wrapW;
    if (sx < 0) sx += wrapW;
    sx -= 100;
    let sy = (star.y - cameraY * 0.2) % wrapH;
    if (sy < 0) sy += wrapH;
    sy -= 100;
    fill(255, star.alpha);
    ellipse(sx, sy, star.r, star.r);
  }
  pop();

  push();
  // FIXED: Round camera translations to prevent sub-pixel anti-aliasing gaps between tiles
  translate(-Math.round(cameraX), -Math.round(cameraY));

  const worldLayer = getOrBuildWorldLayer(drawGame.state);
  image(worldLayer, 0, 0);

  // Draw tiles
  push();
  stroke(200);
  strokeWeight(1);
  // Aggregate all exposed port tiles into a fast lookup so the visible-window highlight pass is cheap.
  const portOverlay = new Map();
  const rocketPortOverlay = new Set();
  const markPort = (x, y, kind) => {
    const key = `${x},${y}`;
    const existing = portOverlay.get(key);
    const next = kind === "both" || (existing && existing !== kind)
      ? "both"
      : kind;
    portOverlay.set(key, next);
  };

  for (const entity of entities) {
    const ports = entity.type === ENTITY_TYPES.TUBE
      ? getTubePortTiles(entity)
      : getEntityConnectionPorts(entity);
    for (const port of ports) {
      markPort(port.worldX, port.worldY, port.kind);
      if (entity.type === ENTITY_TYPES.ROCKET_SITE && port.kind === "input") {
        rocketPortOverlay.add(`${port.worldX},${port.worldY}`);
      }
    }
  }

  for (let y = visibleMinRow; y <= visibleMaxRow; y++) {
    for (let x = visibleMinCol; x <= visibleMaxCol; x++) {
      const portType = portOverlay.get(`${x},${y}`);
      
      // FIXED: Only draw the port connection highlights, and make them semi-transparent so the ground shows through!
      // We removed the solid box that used to hide the tiles behind buildings.
      if (portType) {
        const isRocketInputPort = rocketPortOverlay.has(`${x},${y}`);
        if (portType === "output") {
          fill(70, 200, 90, 120);
        } else if (portType === "input") {
          fill(80, 130, 230, isRocketInputPort ? 48 : 120);
        } else if (portType === "both") {
          fill(60, 190, 190, 120);
        }
        noStroke();
        rect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
  }
  pop();

  drawSelectedBuildingHighlight(map, tileSize);

  drawEntities(entities, tileSize, map);

  drawPlayerSprite(player, config.tileSize);

  const item = selectedHotbarSlot >= 0 ? getSelectedHotbarItem() : null;
  let hologramTooltipItem = null;
  if (item && !isMouseOverHotbarArea()) {
    const holoHit = getTileAtScreenPosition(mouseX, mouseY);
    if (holoHit) {
      const isNode = isResourceNodeTile(holoHit.tile);
      const canHoverOnNode =
        item.entityType === ENTITY_TYPES.MINER ||
        item.entityType === ENTITY_TYPES.EXTRACTOR;
      if (!isNode || canHoverOnNode) {
        const hpx = holoHit.col * tileSize;
        const hpy = holoHit.row * tileSize;
        const previewOptions = getPlacementOptionsForEntity(
          item.entityType,
          holoHit.tile
        );
        try {
          const hologramColor = shouldBlinkBuildHologram(item.entityType)
            ? [240, 70, 70]
            : item.color;
          drawBuildingPlacementHologram(
            hpx,
            hpy,
            tileSize,
            hologramColor,
            hotbarItemLabel(item),
            drawGame.state.placementFacing || "E",
            item.entityType,
            previewOptions,
            holoHit.col,
            holoHit.row
          );
          hologramTooltipItem = item;
        } catch (error) {
          console.error("Placement hologram draw failed:", error);
        }
      }
    }
  }

  pop();

  drawMiniMap(map, player, config, feedback, entities);
  drawOptimizationHud(drawGame.state);
  backButtonGame.draw();
  drawHotbar();
  drawReactivePlayerCompanion();
  drawSideBar();
  if (drawGame.state.isRestrictedMode) {
    drawHotbarCostTooltip();
    const drewHologramCostTooltip = drawHologramBuildCostTooltip(hologramTooltipItem);
    if (!drewHologramCostTooltip) {
      drawResourceHoverTooltip();
    }
  }
  drawBuildCostFeedbackMessage();
  drawActiveTubeFlowTooltip();
  drawRocketHoverTooltip();
  drawRocketCompletionModal();
  updatePlayerAnimation();
  if (helpButton) helpButton.draw();
  if (showHelpMenu) drawHelpMenu();
}

/**
 * Draw help menu.
 * @returns {void} No return value.
 */
function drawHelpMenu() {
  push();
  fill(25, 25, 30, 220);
  noStroke();
  rect(0, 0, width, height);

  // Draw the menu box
  fill(40, 40, 50, 240);
  stroke(80, 80, 100);
  strokeWeight(2);
  let boxW = 380; 
  let boxH = 290; 
  rect(width / 2 - boxW / 2, height / 2 - boxH / 2, boxW, boxH, 8);

  // Menu Title
  fill(240, 240, 255);
  noStroke();
  textSize(22);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Controls & Keybinds", width / 2, height / 2 - boxH / 2 + 20);

  // Keybind List
  textSize(14);
  textStyle(NORMAL);
  textAlign(LEFT, TOP);
  let startX = width / 2 - 125;
  let startY = height / 2 - boxH / 2 + 70;
  let lh = 26;

  fill(200, 210, 230);
  text("W, A, S, D", startX, startY);
  text("1 - 6", startX, startY + lh);
  text("Click", startX, startY + lh * 2);
  text("R", startX, startY + lh * 3);
  text("C", startX, startY + lh * 4);
  text("X", startX, startY + lh * 5);
  //text("O", startX, startY + lh * 6);
  text("Ctrl+Shift+P", startX, startY + lh * 6); 

  fill(255);
  startX += 100; 
  text("-  Move Player", startX, startY);
  text("-  Select Hotbar Item", startX, startY + lh);
  text("-  Place Selected Item", startX, startY + lh * 2);
  text("-  Rotate Building", startX, startY + lh * 3);
  text("-  Toggle Corner/Straight Tube", startX, startY + lh * 4);
  text("-  Delete Building", startX, startY + lh * 5);
  //text("-  Turn Building On / Off", startX, startY + lh * 6);
  text("-  Shortcut (Dev)", startX, startY + lh * 6); 

  if (helpMenuCloseButton) helpMenuCloseButton.draw();

  // Footer instruction - simplified since we now have a dedicated close button
  textAlign(CENTER, BOTTOM);
  textSize(12);
  fill(150, 160, 180);
  pop();
}

/**
 * Generate the restricted-mode resource distribution and reserved zones.
 * @param {*} tiles - Input value used by this operation.
 * @param {*} mapCols - Total number of map columns.
 * @param {*} mapRows - Total number of map rows.
 * @param {*} placeResourceNodeBlock2x2 - Input value used by this operation.
 * @returns {void} No return value.
 */
function applyRestrictedModeResourceLayout(tiles, mapCols, mapRows, placeResourceNodeBlock2x2) {
  if (!Array.isArray(tiles) || typeof placeResourceNodeBlock2x2 !== "function") {
    return;
  }

  const reserved = new Set();
  const reserve = (x, y) => reserved.add(`${x},${y}`);
  const isReserved = (x, y) => reserved.has(`${x},${y}`);
  const isInside = (x, y) => x >= 0 && x < mapCols && y >= 0 && y < mapRows;

  const clearResourceNode = (tile) => {
    if (!tile) return;
    if (tile.type === "iron" || tile.type === "copper" || tile.type === "helium3") {
      tile.type = "empty";
    }
    if (
      tile.resource === RESOURCE_TYPES.IRON_ORE ||
      tile.resource === RESOURCE_TYPES.COPPER_ORE ||
      tile.resource === RESOURCE_TYPES.HELIUM3
    ) {
      tile.resource = null;
    }
    tile.resourceNodeId = null;
    tile.resourceNodeOriginX = null;
    tile.resourceNodeOriginY = null;
  };

  for (let y = 0; y < mapRows; y++) {
    for (let x = 0; x < mapCols; x++) {
      clearResourceNode(tiles[y][x]);
    }
  }

  // Reserve shuttle footprint so random scatter stays clear of it.
  for (let y = 0; y < mapRows; y++) {
    for (let x = 0; x < mapCols; x++) {
      clearResourceNode(tiles[y][x]);
    }
  }

  if (isInside(RESTRICTED_SHUTTLE_COL, RESTRICTED_SHUTTLE_ROW)) {
    reserve(RESTRICTED_SHUTTLE_COL, RESTRICTED_SHUTTLE_ROW);
  }

  const placeDepositPatch = (centerX, centerY, radiusX, radiusY, type) => {
    const anchorX = centerX - 1;
    const anchorY = centerY - 1;
    for (let by = -radiusY; by <= radiusY; by++) {
      for (let bx = -radiusX; bx <= radiusX; bx++) {
        const topLeftX = anchorX + bx * 2;
        const topLeftY = anchorY + by * 2;
        let canPlace = true;
        for (let oy = 0; oy < 2 && canPlace; oy++) {
          for (let ox = 0; ox < 2; ox++) {
            const x = topLeftX + ox;
            const y = topLeftY + oy;
            if (!isInside(x, y) || isReserved(x, y)) {
              canPlace = false;
              break;
            }
          }
        }
        if (!canPlace) {
          continue;
        }
        if (!placeResourceNodeBlock2x2(topLeftX, topLeftY, type)) {
          continue;
        }
        for (let oy = 0; oy < 2; oy++) {
          for (let ox = 0; ox < 2; ox++) {
            reserve(topLeftX + ox, topLeftY + oy);
          }
        }
      }
    }
  };

  // Small starter patches near the shuttle.
  const nearShuttleRow = RESTRICTED_SHUTTLE_ROW + 4;
  placeDepositPatch(RESTRICTED_SHUTTLE_COL - 6, nearShuttleRow, 1, 0, "iron");
  placeDepositPatch(RESTRICTED_SHUTTLE_COL + 6, nearShuttleRow, 1, 0, "copper");

  // Large center-left and center-right deposits.
  const centerRow = Math.floor(mapRows / 2);
  const leftCenterCol = Math.floor(mapCols * 0.3);
  const rightCenterCol = Math.floor(mapCols * 0.7);
  placeDepositPatch(leftCenterCol, centerRow, 2, 2, "iron");
  placeDepositPatch(rightCenterCol, centerRow, 2, 2, "copper");

  // Helium-3 near center-bottom.
  const heliumRow = mapRows - 8;
  const heliumCenterCol = Math.floor(mapCols / 2);
  placeDepositPatch(heliumCenterCol, heliumRow, 1, 1, "helium3");

  // Sparse scatter across the map to keep exploration useful.
  const sparseScatterPlan = [
    { type: "iron", count: 10 },
    { type: "copper", count: 10 },
    { type: "helium3", count: 2 }
  ];

  for (const group of sparseScatterPlan) {
    let placed = 0;
    let attempts = 0;
    const maxAttempts = 500;

    while (placed < group.count && attempts < maxAttempts) {
      attempts++;
      const x = Math.floor(Math.random() * (mapCols - 1));
      const y = Math.floor(Math.random() * (mapRows - 1));
      let canPlace = true;
      for (let oy = 0; oy < 2 && canPlace; oy++) {
        for (let ox = 0; ox < 2; ox++) {
          const tx = x + ox;
          const ty = y + oy;
          if (!isInside(tx, ty) || isReserved(tx, ty)) {
            canPlace = false;
            break;
          }
          const tile = tiles[ty] && tiles[ty][tx];
          if (!tile || tile.entityId != null || tile.type !== "empty") {
            canPlace = false;
            break;
          }
        }
      }
      if (!canPlace) {
        continue;
      }
      if (!placeResourceNodeBlock2x2(x, y, group.type)) {
        continue;
      }
      for (let oy = 0; oy < 2; oy++) {
        for (let ox = 0; ox < 2; ox++) {
          reserve(x + ox, y + oy);
        }
      }
      placed++;
    }
  }

  // Ensure specific checkpoint miner tiles are always on iron nodes.
  // This is applied last so random scatter cannot override it.
  const forcedIronBlocks = [
    { x: 10, y: 26 }, // covers (10,26) and (10,27)
    { x: 10, y: 27 }, // covers (10,28)
    { x: 12, y: 28 }, // covers (12,29)
    { x: 14, y: 27 }, // covers (14,28)
    { x: 17, y: 26 }  // covers (17,26)
  ];
  for (const block of forcedIronBlocks) {
    placeResourceNodeBlock2x2(block.x, block.y, "iron");
  }

  // Ensure checkpoint miner tiles for IDs 8, 9, 10 are copper nodes.
  // Snapshot coords: (38,29), (37,29), (39,29).
  const forcedCopperBlocks = [
    { x: 37, y: 29 }, // covers (37,29) and (38,29)
    { x: 39, y: 29 }, // covers (39,29)
    // Two larger copper patches around (62,61) to guarantee:
    // (62,61), (61,61), and (62,60) are copper tiles.
    { x: 61, y: 60 },
    { x: 63, y: 60 }
  ];
  for (const block of forcedCopperBlocks) {
    placeResourceNodeBlock2x2(block.x, block.y, "copper");
  }
}

/**
 * Spawn the restricted-mode shuttle and stamp its footprint onto the map.
 * @param {*} state - Input value used by this operation.
 * @returns {void} No return value.
 */
function spawnRestrictedModeShuttle(state) {
  if (!state || !state.map || !state.entities) {
    return;
  }

  // Keep shuttle close to spawn and off current resource nodes.
  const shuttleCol = RESTRICTED_SHUTTLE_COL;
  const shuttleRow = RESTRICTED_SHUTTLE_ROW;
  const footprintTiles = getSafeFootprintTilesAt(
    ENTITY_TYPES.SHUTTLE,
    shuttleCol,
    shuttleRow
  );

  for (const entry of footprintTiles) {
    const tile = state.map.tiles[entry.y] && state.map.tiles[entry.y][entry.x];
    if (!tile || tile.entityId != null) {
      return;
    }
  }

  const centerTile = state.map.tiles[shuttleRow] && state.map.tiles[shuttleRow][shuttleCol];
  if (!centerTile) {
    return;
  }

  const shuttle = createEntity(ENTITY_TYPES.SHUTTLE, shuttleCol, shuttleRow, {});
  shuttle.state.facing = "E";

  state.entities.push(shuttle);

  for (const entry of footprintTiles) {
    const tile = state.map.tiles[entry.y][entry.x];
    tile.entityId = shuttle.id;
    tile.entity = shuttle;
    tile.item = ENTITY_TYPES.SHUTTLE;
    tile.colorOverride = null;
  }

  centerTile.building = {
    color: getEntityFillRgb(ENTITY_TYPES.SHUTTLE),
    label: getEntityShortLabel(ENTITY_TYPES.SHUTTLE),
    name: "Crashed Shuttle",
    entityType: ENTITY_TYPES.SHUTTLE,
    facing: shuttle.state.facing,
    entityId: shuttle.id
  };
  state.shuttleEntityId = shuttle.id;

  updateConnections(state.entities);
}

/**
 * Update all miners: accumulate harvested resources into global counters.
 */
function updateMinerHarvesting(entities, dt) {
  for (const entity of entities) {
    if (entity.type !== ENTITY_TYPES.MINER) continue;
    if (!entity.state.isOn) continue;

    const produced = entity.state.harvest(dt);
    if (produced <= 0) continue;

    addProducedResource(entity.state.outputType, produced);
  }
}

/**
 * Get restricted mode shuttle entity.
 * @returns {*} Computed value for the requested operation.
 */
function getRestrictedModeShuttleEntity() {
  if (!drawGame.state || !drawGame.state.isRestrictedMode) {
    return null;
  }

  const { entities, shuttleEntityId } = drawGame.state;
  let shuttle = shuttleEntityId != null
    ? getEntityById(entities, shuttleEntityId)
    : null;

  if (!shuttle || shuttle.type !== ENTITY_TYPES.SHUTTLE) {
    shuttle = entities.find((entity) => entity.type === ENTITY_TYPES.SHUTTLE) || null;
  }

  return shuttle && shuttle.type === ENTITY_TYPES.SHUTTLE ? shuttle : null;
}

/**
 * Get restricted mode shuttle inventory.
 * @returns {*} Computed value for the requested operation.
 */
function getRestrictedModeShuttleInventory() {
  const shuttle = getRestrictedModeShuttleEntity();
  const inventory = shuttle?.state?.inventory;
  if (!inventory || typeof inventory !== "object") {
    return null;
  }

  return inventory;
}

/**
 * Get build cost for entity.
 * @param {*} entityType - Entity type identifier.
 * @returns {*} Computed value for the requested operation.
 */
function getBuildCostForEntity(entityType) {
  if (typeof ENTITY_BUILD_COSTS === "undefined" || !entityType) {
    return null;
  }
  return ENTITY_BUILD_COSTS[entityType] || null;
}

/**
 * Get resource type label.
 * @param {*} resourceType - Resource type identifier.
 * @returns {*} Computed value for the requested operation.
 */
function getResourceTypeLabel(resourceType) {
  switch (resourceType) {
    case RESOURCE_TYPES.IRON_ORE:
      return "Iron Ore";
    case RESOURCE_TYPES.IRON_BAR:
      return "Iron Bar";
    case RESOURCE_TYPES.IRON_PLATE:
      return "Iron Plate";
    case RESOURCE_TYPES.COPPER_ORE:
      return "Copper Ore";
    case RESOURCE_TYPES.COPPER_BAR:
      return "Copper Bar";
    case RESOURCE_TYPES.COPPER_PLATE:
      return "Copper Plate";
    case RESOURCE_TYPES.COPPER_WIRE:
      return "Copper Wire";
    case RESOURCE_TYPES.MODULAR_COMPONENT:
      return "Modular Component";
    case RESOURCE_TYPES.ELECTRONICS:
      return "Electronics";
    case RESOURCE_TYPES.SHIP_ALLOY:
      return "Ship Alloy";
    case RESOURCE_TYPES.ROCKET_FUEL:
      return "Rocket Fuel";
    case RESOURCE_TYPES.HELIUM3:
      return "Helium-3";
    default:
      return String(resourceType || "Resource");
  }
}

/**
 * Get resource icon for type.
 * @param {*} resourceType - Resource type identifier.
 * @returns {*} Computed value for the requested operation.
 */
function getResourceIconForType(resourceType) {
  switch (resourceType) {
    case RESOURCE_TYPES.IRON_ORE:
      return ironOreImg;
    case RESOURCE_TYPES.IRON_BAR:
      return ironBarImg;
    case RESOURCE_TYPES.IRON_PLATE:
      return ironPlateImg;
    case RESOURCE_TYPES.COPPER_ORE:
      return copperOreImg;
    case RESOURCE_TYPES.COPPER_BAR:
      return copperBarImg;
    case RESOURCE_TYPES.COPPER_PLATE:
      return copperPlateImg;
    case RESOURCE_TYPES.COPPER_WIRE:
      return copperWireImg;
    case RESOURCE_TYPES.MODULAR_COMPONENT:
      return modularComponentImg;
    case RESOURCE_TYPES.ELECTRONICS:
      return electronicsImg;
    case RESOURCE_TYPES.HELIUM3:
      return heliumImg;
    case RESOURCE_TYPES.SHIP_ALLOY:
      return shipAlloyImg;
    case RESOURCE_TYPES.ROCKET_FUEL:
      return rocketFuelImg;
    default:
      return null;
  }
}

/**
 * Get global resource count.
 * @param {*} resourceType - Resource type identifier.
 * @returns {*} Computed value for the requested operation.
 */
function getGlobalResourceCount(resourceType) {
  switch (resourceType) {
    case RESOURCE_TYPES.IRON_ORE:
      return ironOre;
    case RESOURCE_TYPES.IRON_BAR:
      return ironBar;
    case RESOURCE_TYPES.IRON_PLATE:
      return ironPlate;
    case RESOURCE_TYPES.COPPER_ORE:
      return copperOre;
    case RESOURCE_TYPES.COPPER_BAR:
      return copperBar;
    case RESOURCE_TYPES.COPPER_PLATE:
      return copperPlate;
    case RESOURCE_TYPES.COPPER_WIRE:
      return copperWire;
    case RESOURCE_TYPES.HELIUM3:
      return helium;
    case RESOURCE_TYPES.ELECTRONICS:
      return electronics;
    case RESOURCE_TYPES.MODULAR_COMPONENT:
      return modularComponent;
    case RESOURCE_TYPES.SHIP_ALLOY:
      return shipAlloy;
    case RESOURCE_TYPES.ROCKET_FUEL:
      return rocketFuel;
    default:
      return 0;
  }
}

/**
 * Get missing build resources.
 * @param {*} entityType - Entity type identifier.
 * @param {*} inventory - Input value used by this operation.
 * @returns {*} Computed value for the requested operation.
 */
function getMissingBuildResources(entityType, inventory) {
  const cost = getBuildCostForEntity(entityType);
  if (!cost) {
    return [];
  }

  const missing = [];
  const source = inventory || {};
  for (const [resourceType, required] of Object.entries(cost)) {
    const have = Number(source[resourceType]) || 0;
    if (have < required) {
      missing.push({
        resourceType,
        needed: required - have
      });
    }
  }
  return missing;
}

/**
 * Spend Build Resources.
 * @param {*} inventory - Input value used by this operation.
 * @param {*} entityType - Entity type identifier.
 * @returns {void} No return value.
 */
function spendBuildResources(inventory, entityType) {
  const cost = getBuildCostForEntity(entityType);
  if (!cost || !inventory) {
    return;
  }

  for (const [resourceType, required] of Object.entries(cost)) {
    const have = Number(inventory[resourceType]) || 0;
    inventory[resourceType] = Math.max(0, have - required);
  }
}

/**
 * Refund Build Resources.
 * @param {*} inventory - Input value used by this operation.
 * @param {*} entityType - Entity type identifier.
 * @returns {void} No return value.
 */
function refundBuildResources(inventory, entityType) {
  const cost = getBuildCostForEntity(entityType);
  if (!cost || !inventory) {
    return;
  }

  for (const [resourceType, required] of Object.entries(cost)) {
    const have = Number(inventory[resourceType]) || 0;
    inventory[resourceType] = have + required;
  }
}

/**
 * Trigger build cost feedback.
 * @param {*} entityType - Entity type identifier.
 * @param {*} missingResources - Input value used by this operation.
 * @returns {void} No return value.
 */
function triggerBuildCostFeedback(entityType, missingResources) {
  if (!drawGame.state || !drawGame.state.feedback) {
    return;
  }

  const feedback = drawGame.state.feedback;
  feedback.buildCostEntityType = entityType || null;
  feedback.buildCostBlinkUntil = millis() + 900;

  if (!Array.isArray(missingResources) || missingResources.length === 0) {
    feedback.buildCostMessageText = "Insufficient resources.";
  } else {
    const details = missingResources
      .map((entry) => `${entry.needed} ${getResourceTypeLabel(entry.resourceType)}`)
      .join(", ");
    feedback.buildCostMessageText = `Missing: ${details}`;
  }

  feedback.buildCostMessageUntil = millis() + 1600;
}

/**
 * Determine whether blink build hologram.
 * @param {*} entityType - Entity type identifier.
 * @returns {boolean} Whether the check or operation succeeds.
 */
function shouldBlinkBuildHologram(entityType) {
  if (!drawGame.state || !drawGame.state.feedback || !entityType) {
    return false;
  }

  const feedback = drawGame.state.feedback;
  if (feedback.buildCostEntityType !== entityType) {
    return false;
  }

  const remaining = feedback.buildCostBlinkUntil - millis();
  if (remaining <= 0) {
    return false;
  }

  const phase = Math.floor((900 - remaining) / 120);
  return phase % 2 === 0;
}

/**
 * Draw build cost feedback message.
 * @returns {void} No return value.
 */
function drawBuildCostFeedbackMessage() {
  if (!drawGame.state || !drawGame.state.feedback) {
    return;
  }

  const feedback = drawGame.state.feedback;
  const remaining = feedback.buildCostMessageUntil - millis();
  if (remaining <= 0 || !feedback.buildCostMessageText) {
    return;
  }

  push();
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(12);
  const padX = 10;
  const boxH = 24;
  const contentW = textWidth(feedback.buildCostMessageText) + padX * 2;
  const boxW = constrain(contentW, 160, width - 20);
  const boxX = width / 2;
  const boxY = 20;

  rectMode(CENTER);
  fill(255, 235, 235, 245);
  stroke(210, 70, 70);
  strokeWeight(1.5);
  rect(boxX, boxY, boxW, boxH, 5);

  noStroke();
  fill(120, 25, 25);
  text(feedback.buildCostMessageText, boxX, boxY + 0.5);
  pop();
}

/**
 * Draw rocket completion modal.
 * @returns {void} No return value.
 */
function drawRocketCompletionModal() {
  if (!drawGame.state || !drawGame.state.feedback) {
    return;
  }

  const feedback = drawGame.state.feedback;
  const remaining = feedback.rocketCompletionModalUntil - millis();
  if (remaining <= 0) {
    return;
  }

  const message = feedback.rocketCompletionModalText || "Rocket ship complete. Walk to it to launch.";

  push();
  fill(10, 16, 28, 110);
  noStroke();
  rect(0, 0, width, height);

  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(20);
  const title = "Rocket Ready";
  const titleW = textWidth(title);
  textSize(14);
  const bodyW = textWidth(message);
  const padX = 18;
  const boxW = max(280, max(titleW, bodyW) + padX * 2);
  const boxH = 96;
  const boxX = (width - boxW) / 2;
  const boxY = height * 0.18;

  fill(245, 250, 255, 245);
  stroke(70, 90, 130, 220);
  strokeWeight(2);
  rect(boxX, boxY, boxW, boxH, 10);

  noStroke();
  fill(24, 34, 56);
  textStyle(BOLD);
  textSize(20);
  text(title, boxX + boxW / 2, boxY + 30);

  fill(35, 45, 68);
  textStyle(NORMAL);
  textSize(14);
  text(message, boxX + boxW / 2, boxY + 62);
  pop();
}

/**
 * Update restricted mode shuttle intake.
 * @param {*} entities - Collection of active entities in the world.
 * @param {*} dt - Frame delta time in seconds.
 * @returns {void} No return value.
 */
function updateRestrictedModeShuttleIntake(entities, dt) {
  const shuttle = getRestrictedModeShuttleEntity();
  if (!shuttle || !Number.isFinite(dt) || dt <= 0) {
    return;
  }

  const shuttleState = shuttle.state;
  const inventory = shuttleState?.inventory;
  if (!inventory || typeof inventory !== "object") {
    return;
  }

  if (!shuttleState.pipeIntakeAccumulators || typeof shuttleState.pipeIntakeAccumulators !== "object") {
    shuttleState.pipeIntakeAccumulators = {};
  }

  const inputs = getIncomingTubeInputs(entities, shuttle.id);
  for (const input of inputs) {
    const resourceType = input.outputType;
    const rate = Number(input.rate) || 0;
    if (!resourceType || rate <= 0) {
      continue;
    }

    const accumulators = shuttleState.pipeIntakeAccumulators;
    const previous = Number(accumulators[resourceType]) || 0;
    const total = previous + rate * dt;
    const wholeUnits = Math.floor(total);
    accumulators[resourceType] = total - wholeUnits;

    if (wholeUnits <= 0) {
      continue;
    }

    const current = Number(inventory[resourceType]) || 0;
    inventory[resourceType] = current + wholeUnits;
  }
}

/**
 * Add Produced Resource.
 * @param {*} resourceType - Resource type identifier.
 * @param {*} count - Quantity value.
 * @returns {void} No return value.
 */
function addProducedResource(resourceType, count) {
  if (!resourceType || count <= 0) return;

  switch (resourceType) {
    case RESOURCE_TYPES.IRON_ORE:
      ironOre += count;
      break;
    case RESOURCE_TYPES.COPPER_ORE:
      copperOre += count;
      break;
    case RESOURCE_TYPES.IRON_BAR:
      ironBar += count;
      break;
    case RESOURCE_TYPES.COPPER_BAR:
      copperBar += count;
      break;
    case RESOURCE_TYPES.IRON_PLATE:
      ironPlate += count;
      break;
    case RESOURCE_TYPES.COPPER_PLATE:
      copperPlate += count;
      break;
    case RESOURCE_TYPES.COPPER_WIRE:
      copperWire += count;
      break;
    case RESOURCE_TYPES.MODULAR_COMPONENT:
      modularComponent += count;
      break;
    case RESOURCE_TYPES.ELECTRONICS:
      electronics += count;
      break;
    case RESOURCE_TYPES.SHIP_ALLOY:
      shipAlloy += count;
      break;
    case RESOURCE_TYPES.ROCKET_FUEL:
      rocketFuel += count;
      break;
    case RESOURCE_TYPES.HELIUM3:
      helium += count;
      break;
    default:
      break;
  }
}

/**
 * Get safe footprint offsets.
 * @param {*} entityType - Entity type identifier.
 * @param {*} facing - Cardinal facing direction.
 * @param {*} options - Optional configuration object.
 * @returns {*} Computed value for the requested operation.
 */
function getSafeFootprintOffsets(entityType, facing = "E", options = null) {
  const fallback = [{ x: 0, y: 0 }];
  
  if (entityType === ENTITY_TYPES.SHUTTLE) {
    return fallback;
  }

  if (typeof getEntityFootprintOffsets !== "function") {
    return fallback;
  }

  let offsets = null;
  if (
    entityType === ENTITY_TYPES.TUBE &&
    typeof getTubeFootprintOffsets === "function"
  ) {
    const tubeShape = (typeof options === "string"
      ? options
      : options?.shape) || TUBE_SHAPES.STRAIGHT;
    offsets = getTubeFootprintOffsets(tubeShape);
  } else {
    offsets = getEntityFootprintOffsets(entityType);
  }
  if (!Array.isArray(offsets) || offsets.length === 0) {
    return fallback;
  }

  const normalized = offsets.filter(
    (offset) =>
      offset &&
      Number.isFinite(offset.x) &&
      Number.isFinite(offset.y)
  );

  const baseOffsets = normalized.length > 0 ? normalized : fallback;
  if (facing !== "E" && typeof rotateOffsetFromEast === "function") {
    return baseOffsets.map((offset) => rotateOffsetFromEast(offset, facing));
  }
  return baseOffsets;
}

/**
 * Get safe footprint tiles at.
 * @param {*} entityType - Entity type identifier.
 * @param {*} tileX - Tile X coordinate.
 * @param {*} tileY - Tile Y coordinate.
 * @param {*} facing - Cardinal facing direction.
 * @param {*} options - Optional configuration object.
 * @returns {void} No return value.
 */
function getSafeFootprintTilesAt(entityType, tileX, tileY, facing = "E", options = null) {
  const offsets = getSafeFootprintOffsets(entityType, facing, options);
  return offsets.map((offset) => ({
    x: tileX + offset.x,
    y: tileY + offset.y
  }));
}

/**
 * Accumulate and publish factory throughput from active smelters and constructors.
 * @param {*} entities - Collection of active entities in the world.
 * @param {*} dt - Frame delta time in seconds.
 * @returns {void} No return value.
 */
function updateFactoryProduction(entities, dt) {
  for (const entity of entities) {
    if (
      entity.type !== ENTITY_TYPES.SMELTER &&
      entity.type !== ENTITY_TYPES.CONSTRUCTOR
    ) {
      continue;
    }

    const state = entity.state;
    if (!state || !state.isActive || !state.outputType) {
      continue;
    }

    const outputRate = Number(state.outputRate) || 0;
    if (outputRate <= 0) {
      continue;
    }

    if (typeof state.productionAccumulator !== "number") {
      state.productionAccumulator = 0;
    }

    state.productionAccumulator += outputRate * dt;
    const produced = Math.floor(state.productionAccumulator);
    if (produced <= 0) {
      continue;
    }

    state.productionAccumulator -= produced;
    addProducedResource(state.outputType, produced);
  }
}

/**
 * Determine whether player near rocket for launch.
 * @param {*} player - Player runtime state.
 * @param {*} rocketEntity - Input value used by this operation.
 * @param {*} config - Runtime configuration values for map/camera/UI.
 * @returns {boolean} Whether the check or operation succeeds.
 */
function isPlayerNearRocketForLaunch(player, rocketEntity, config) {
  if (!player || !rocketEntity || !config) {
    return false;
  }
  const tileSize = Number(config.tileSize) || 32;
  const mapOriginX = Number(config.mapOriginX) || 0;
  const mapOriginY = Number(config.mapOriginY) || 0;
  const rocketCenterX = mapOriginX + (rocketEntity.tileX + 0.5) * tileSize;
  const rocketCenterY = mapOriginY + (rocketEntity.tileY + 0.5) * tileSize;
  const dx = player.x - rocketCenterX;
  const dy = player.y - rocketCenterY;
  const launchRadius = tileSize * 2.25;
  return dx * dx + dy * dy <= launchRadius * launchRadius;
}

/**
 * Advance rocket delivery progress from connected input lines and detect completion.
 * @param {*} entities - Collection of active entities in the world.
 * @param {*} dt - Frame delta time in seconds.
 * @returns {object} Progress summary with completion and throughput-rate details.
 */
function updateRocketConstructionProgress(entities, dt) {
  const rocket = entities.find((entity) => entity.type === ENTITY_TYPES.ROCKET_SITE);
  if (!rocket || !rocket.state) {
    return {
      completed: false,
      justCompleted: false,
      rocket: null,
      throughputActualRate: 0,
      throughputPotentialRate: 0
    };
  }

  const rocketState = rocket.state;
  if (rocketState.completed) {
    return {
      completed: true,
      justCompleted: false,
      rocket,
      throughputActualRate: 0,
      throughputPotentialRate: 0
    };
  }

  const wasCompleted = !!rocketState.completed;
  const required = rocketState.required || {};
  const delivered = rocketState.delivered || {};
  const entitiesById = new Map(entities.map((entity) => [entity.id, entity]));
  const increments = {
    [RESOURCE_TYPES.ELECTRONICS]: 0,
    [RESOURCE_TYPES.SHIP_ALLOY]: 0,
    [RESOURCE_TYPES.ROCKET_FUEL]: 0
  };
  const processedRocketComponentIds = new Set();

  for (const tube of entities) {
    if (tube.type !== ENTITY_TYPES.TUBE) continue;
    if (tube.state?.toEntityId !== rocket.id) continue;
    if (!(tube.state?.isConnected)) continue;

    const componentId = tube.state?.componentId ?? tube.id;
    if (processedRocketComponentIds.has(componentId)) {
      continue;
    }
    processedRocketComponentIds.add(componentId);

    const sourceEntity = entitiesById.get(tube.state.fromEntityId);
    const outputType = sourceEntity?.state?.outputType || tube.state.carriedItem || null;
    const outputRate = Number(tube.state.outputRate) || 0;
    if (!outputType || outputRate <= 0) continue;
    if (increments[outputType] == null) continue;
    increments[outputType] += outputRate * dt;
  }

  let potentialDeliveredAmount = 0;
  let actualDeliveredAmount = 0;
  for (const [resourceType, amount] of Object.entries(increments)) {
    if (amount <= 0 || required[resourceType] == null) continue;
    potentialDeliveredAmount += amount;
    const current = Number(delivered[resourceType]) || 0;
    const next = min(required[resourceType], current + amount);
    delivered[resourceType] = next;
    actualDeliveredAmount += Math.max(0, next - current);
  }

  const requiredTotal = Object.values(required).reduce((sum, value) => sum + Number(value || 0), 0);
  const deliveredTotal = Object.entries(required).reduce((sum, [type, value]) => {
    return sum + min(Number(value || 0), Number(delivered[type] || 0));
  }, 0);
  rocketState.buildProgress = requiredTotal > 0 ? deliveredTotal / requiredTotal : 0;

  const complete = Object.entries(required).every(([type, value]) => {
    return Number(delivered[type] || 0) >= Number(value || 0);
  });
  rocketState.completed = complete;
  rocketState.isActive = !complete && deliveredTotal > 0;
  rocketState.isOn = complete;

  const safeDt = Number(dt);
  const throughputActualRate =
    Number.isFinite(safeDt) && safeDt > 0
      ? actualDeliveredAmount / safeDt
      : 0;
  const throughputPotentialRate =
    Number.isFinite(safeDt) && safeDt > 0
      ? potentialDeliveredAmount / safeDt
      : 0;

  return {
    completed: complete,
    justCompleted: complete && !wasCompleted,
    rocket,
    throughputActualRate,
    throughputPotentialRate
  };
}

/**
 * Draw player sprite.
 * @param {*} player - Player runtime state.
 * @param {*} tileSize - Tile size in pixels.
 * @returns {void} No return value.
 */
function drawPlayerSprite(player, tileSize) {
  const dims = spriteDimensions[currentDirection] &&
               spriteDimensions[currentDirection][currentAnimation];
  if (!dims) return;

  let spriteSheet;
  if (currentDirection === "front") {
    spriteSheet = (currentAnimation === "idle")
      ? playerSpriteSheetFrontIdle : playerSpriteSheetFrontMove;
  } else if (currentDirection === "back") {
    spriteSheet = (currentAnimation === "idle")
      ? playerSpriteSheetBackIdle : playerSpriteSheetBackMove;
  } else {
    spriteSheet = (currentAnimation === "idle")
      ? playerSpriteSheetSideIdle : playerSpriteSheetSideMove;
  }
  if (!spriteSheet) return;

  const frameWidth = dims.width / dims.frames;
  const frameHeight = dims.height;
  const targetHeight = player.size || tileSize;
  const s = targetHeight / frameHeight;
  const drawWidth = frameWidth * s;
  const drawHeight = frameHeight * s;
  const frameIndex = currentFrame % dims.frames;
  const sx = frameIndex * frameWidth;

  push();
  
  // THIS IS THE FIX: Draw at the player's actual world coordinates!
  translate(player.x, player.y);
  
  if (currentDirection === "side" && facingLeft) {
    scale(-1, 1);
  }
  imageMode(CORNER);
  image(
    spriteSheet,
    -drawWidth / 2, -drawHeight / 2,
    drawWidth, drawHeight,
    sx, 0, frameWidth, frameHeight
  );
  pop();
}

/**
 * Update player animation.
 * @returns {void} No return value.
 */
function updatePlayerAnimation() {
  if (!drawGame.state) return;
  const dims = spriteDimensions[currentDirection] &&
               spriteDimensions[currentDirection][currentAnimation];
  if (!dims) return;

  const now = millis();
  if (!drawGame.state.animationTimer) {
    drawGame.state.animationTimer = now;
    return;
  }
  const frameDuration = 1000 / animationFPS;
  if (now - drawGame.state.animationTimer >= frameDuration) {
    currentFrame = (currentFrame + 1) % dims.frames;
    drawGame.state.animationTimer = now;
  }   
}

/**
 * Get tube render path data.
 * @param {*} entity - Target entity instance.
 * @param {*} tileSize - Tile size in pixels.
 * @returns {object|null} Computed object result, or null when unavailable.
 */
function getTubeRenderPathData(entity, tileSize) {
  if (!entity || entity.type !== ENTITY_TYPES.TUBE) {
    return null;
  }

  const offsets = getTubePortOffsets(entity);
  const centerX = entity.tileX * tileSize + tileSize / 2;
  const centerY = entity.tileY * tileSize + tileSize / 2;
  const endpointDistance = tileSize * 0.42;
  const inputPoint = {
    x: centerX + offsets.input.x * endpointDistance,
    y: centerY + offsets.input.y * endpointDistance
  };
  const outputPoint = {
    x: centerX + offsets.output.x * endpointDistance,
    y: centerY + offsets.output.y * endpointDistance
  };

  const segments = [
    {
      x1: inputPoint.x,
      y1: inputPoint.y,
      x2: centerX,
      y2: centerY
    },
    {
      x1: centerX,
      y1: centerY,
      x2: outputPoint.x,
      y2: outputPoint.y
    }
  ].map((segment) => ({
    ...segment,
    len: Math.hypot(segment.x2 - segment.x1, segment.y2 - segment.y1)
  }));

  const totalLength = segments.reduce((sum, segment) => sum + segment.len, 0);
  return { segments, totalLength, centerX, centerY };
}

/**
 * Get point along tube path.
 * @param {*} pathData - Input value used by this operation.
 * @param {*} t - Input value used by this operation.
 * @returns {*} Computed value for the requested operation.
 */
function getPointAlongTubePath(pathData, t) {
  if (!pathData || !Array.isArray(pathData.segments) || pathData.totalLength <= 0) {
    return { x: 0, y: 0 };
  }

  let normalized = Number.isFinite(t) ? t : 0;
  normalized = normalized % 1;
  if (normalized < 0) normalized += 1;
  let distance = normalized * pathData.totalLength;

  for (const segment of pathData.segments) {
    if (segment.len <= 0) {
      continue;
    }

    if (distance <= segment.len) {
      const ratio = distance / segment.len;
      return {
        x: lerp(segment.x1, segment.x2, ratio),
        y: lerp(segment.y1, segment.y2, ratio)
      };
    }

    distance -= segment.len;
  }

  const last = pathData.segments[pathData.segments.length - 1];
  return { x: last.x2, y: last.y2 };
}

/**
 * Get tube item glow color.
 * @param {*} resourceType - Resource type identifier.
 * @returns {*} Computed value for the requested operation.
 */
function getTubeItemGlowColor(resourceType) {
  switch (resourceType) {
    case RESOURCE_TYPES.IRON_ORE: return [120, 120, 125];
    case RESOURCE_TYPES.IRON_BAR: return [180, 180, 190];
    case RESOURCE_TYPES.IRON_PLATE: return [210, 210, 220];
    case RESOURCE_TYPES.COPPER_ORE: return [190, 120, 70];
    case RESOURCE_TYPES.COPPER_BAR: return [210, 130, 60];
    case RESOURCE_TYPES.COPPER_PLATE: return [232, 160, 82];
    case RESOURCE_TYPES.COPPER_WIRE: return [244, 186, 90];
    case RESOURCE_TYPES.HELIUM3: return [95, 220, 255];
    case RESOURCE_TYPES.MODULAR_COMPONENT: return [165, 215, 255];
    case RESOURCE_TYPES.ELECTRONICS: return [120, 255, 180];
    default: return [235, 235, 235];
  }
}

/**
 * Draw tube flow effects.
 * @param {*} entity - Target entity instance.
 * @param {*} tileSize - Tile size in pixels.
 * @returns {void} No return value.
 */
function drawTubeFlowEffects(entity, tileSize) {
  if (!entity || entity.type !== ENTITY_TYPES.TUBE) {
    return;
  }

  const pathData = getTubeRenderPathData(entity, tileSize);
  if (!pathData) {
    return;
  }

  const state = entity.state || {};
  const flowState = state.flowState || "off";
  const flowDistance = Number.isFinite(state.flowDistance) ? state.flowDistance : 0;
  const phaseOffset = Number(state.flowPhaseOffset) || 0;
  const now = millis() / 1000;

  noFill();
  stroke(40, 40, 48, 220);
  strokeWeight(tileSize * 0.22);
  strokeCap(ROUND);
  for (const segment of pathData.segments) {
    line(segment.x1, segment.y1, segment.x2, segment.y2);
  }

  let signalRgb = [190, 70, 70];
  if (flowState === "flowing") {
    signalRgb = [60, 235, 110];
  }

  const staticSlots = [0.2, 0.5, 0.8];
  for (let i = 0; i < staticSlots.length; i++) {
    let t = staticSlots[i];
    if (flowState === "flowing") {
      t = (now * 0.85 - flowDistance * 0.07 - i * 0.22 - phaseOffset * 0.04) % 1;
      if (t < 0) t += 1;
    }

    const point = getPointAlongTubePath(pathData, t);
    const pulse = flowState === "flowing"
      ? 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(now * 7 - flowDistance * 0.8 - phaseOffset - i * 1.6))
      : 1;
    const alpha = flowState === "flowing"
      ? Math.floor(90 + 120 * pulse)
      : 170;
    const radius = tileSize * (flowState === "flowing" ? 0.19 : 0.16);
    noStroke();
    fill(signalRgb[0], signalRgb[1], signalRgb[2], alpha);
    circle(point.x, point.y, radius);
  }

  if (flowState === "flowing") {
    const progress = Number.isFinite(state.flowProgress)
      ? state.flowProgress
      : ((now * 1.35 - flowDistance * 0.08 - phaseOffset * 0.03) % 1 + 1) % 1;
    const itemPoint = getPointAlongTubePath(pathData, progress);
    const itemRgb = getTubeItemGlowColor(state.carriedItem || null);

    noStroke();
    fill(itemRgb[0], itemRgb[1], itemRgb[2], 180);
    circle(itemPoint.x, itemPoint.y, tileSize * 0.24);
    fill(itemRgb[0], itemRgb[1], itemRgb[2], 245);
    circle(itemPoint.x, itemPoint.y, tileSize * 0.12);
  }
}

/**
 * Determine whether tube flow indicator lit.
 * @param {*} tubeState - Input value used by this operation.
 * @param {*} nowSeconds - Current time in seconds.
 * @returns {boolean} Whether the check or operation succeeds.
 */
function isTubeFlowIndicatorLit(tubeState, nowSeconds) {
  if (!tubeState || tubeState.flowState !== "flowing") {
    return false;
  }

  const flowSpeed = Number(tubeState.flowSpeed) || 1;
  const flowDistance = Number.isFinite(tubeState.flowDistance)
    ? tubeState.flowDistance
    : 0;
  const phaseOffset = Number(tubeState.flowPhaseOffset) || 0;
  let wave = (nowSeconds * (1.7 * flowSpeed) - flowDistance * 0.18 - phaseOffset) % 1;
  if (wave < 0) {
    wave += 1;
  }

  // Short duty cycle gives a clear source-to-sink propagation.
  return wave < 0.34;
}

function drawPlacedShuttleSprite(px, py, drawWidth, drawHeight, tileSize, shuttleState, nowSeconds) {
  if (!shuttleSpriteSheetImg || shuttleSpriteSheetImg.width <= 0) {
    return false;
  }

  const frameCount = 10;

  const frameW = floor(shuttleSpriteSheetImg.width / frameCount);
  const frameH = shuttleSpriteSheetImg.height;

  const animationFps = 10;
  const frameIndex = floor(nowSeconds * animationFps) % frameCount;

  const targetHeight = round(max(drawHeight + 12, tileSize * 3.0));
  const targetWidth = round(targetHeight * (frameW / frameH));

  const visualAlignmentOffset = 4;
  const spriteX = round(px + (drawWidth - targetWidth) / 2 + visualAlignmentOffset);
  const spriteY = round(py + drawHeight - targetHeight);

  imageMode(CORNER);
  noTint();

  const canToggleSmoothing =
    typeof drawingContext !== "undefined" &&
    drawingContext &&
    "imageSmoothingEnabled" in drawingContext;

  const previousImageSmoothing = canToggleSmoothing
    ? drawingContext.imageSmoothingEnabled
    : undefined;

  if (canToggleSmoothing) {
    drawingContext.imageSmoothingEnabled = false;
  }

  // Asymmetric source crop:
  // Keep the left side intact because cropping it removes visible shuttle pixels.
  // Trim only the right edge where the horizontal bleed line is showing.
  const sourceInsetLeft = 0;
  const sourceInsetRight = 1;

  const sourceX = frameIndex * frameW + sourceInsetLeft;
  const sourceY = 0;
  const sourceWidth = frameW - sourceInsetLeft - sourceInsetRight;
  const sourceHeight = frameH;

  image(
    shuttleSpriteSheetImg,
    spriteX,
    spriteY,
    targetWidth,
    targetHeight,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight
  );

  if (canToggleSmoothing) {
    drawingContext.imageSmoothingEnabled = previousImageSmoothing;
  }

  return true;
}

function drawPlacedMinerSprite(px, py, drawWidth, drawHeight, tileSize, minerState, nowSeconds) {
  if (!minerSpriteSheetImg || minerSpriteSheetImg.width <= 0) {
    return false;
  }

  // resources/miner/info.txt: 28 frames, each frame 18x32.
  const frameW = 18;
  const frameH = 32;
  const totalFrames = max(1, floor(minerSpriteSheetImg.width / frameW));
  const offFrameIndex = min(7, totalFrames - 1); // "frame 8" in 1-based indexing
  const isOn = minerState?.isOn !== false;
  const animationFps = 10;
  const frameIndex = isOn
    ? floor(nowSeconds * animationFps) % totalFrames
    : offFrameIndex;
  const targetHeight = max(drawHeight + 8, tileSize * 1.35);
  const targetWidth = targetHeight * (frameW / frameH);
  const spriteX = px + (drawWidth - targetWidth) / 2;
  const spriteBottomY = py + drawHeight - 1;
  const spriteY = spriteBottomY - targetHeight - 6;

  imageMode(CORNER);
  noTint();
  image(
    minerSpriteSheetImg,
    spriteX,
    spriteY,
    targetWidth,
    targetHeight,
    frameIndex * frameW,
    0,
    frameW,
    frameH
  );
  return true;
}

/**
 * Get smelter sprite for facing.
 * @param {*} facing - Cardinal facing direction.
 * @returns {*} Computed value for the requested operation.
 */
function getSmelterSpriteForFacing(facing) {
  const dir = facing || "E";
  if (dir === "E" || dir === "W") {
    return smelterSideImg || smelterFrontImg || null;
  }
  if (dir === "S") {
    return smelterBackImg || smelterFrontImg || smelterSideImg || null;
  }
  return smelterFrontImg || smelterBackImg || smelterSideImg || null;
}

/**
 * Get smelter manual pixel offset.
 * @param {*} facing - Cardinal facing direction.
 * @returns {void} No return value.
 */
function getSmelterManualPixelOffset(facing) {
  const dir = facing || "E";
  const key = SMELTER_MANUAL_PIXEL_OFFSETS[dir] ? dir : "E";
  const manual = SMELTER_MANUAL_PIXEL_OFFSETS[key] || {};
  const manualX = Number(manual.x);
  const manualY = Number(manual.y);
  return {
    xOffsetPx: Number.isFinite(manualX) ? manualX : 0,
    yOffsetPx: Number.isFinite(manualY) ? manualY : 0
  };
}

/**
 * Draw placed smelter sprite.
 * @param {*} px - X pixel position.
 * @param {*} py - Y pixel position.
 * @param {*} drawWidth - Input value used by this operation.
 * @param {*} drawHeight - Input value used by this operation.
 * @param {*} facing - Cardinal facing direction.
 * @param {*} smelterState - Input value used by this operation.
 * @param {*} nowSeconds - Current time in seconds.
 * @param {*} alpha - Input value used by this operation.
 * @returns {boolean} Whether the check or operation succeeds.
 */
function drawPlacedSmelterSprite(px, py, drawWidth, drawHeight, facing, smelterState, nowSeconds, alpha = 255) {
  const sprite = getSmelterSpriteForFacing(facing);
  if (!sprite || sprite.width <= 0 || sprite.height <= 0) {
    return false;
  }

  const frameCount = 6;
  // Use integer frame slices to avoid texture bleeding between animation frames.
  const frameW = floor(sprite.width / frameCount);
  const frameH = sprite.height;
  if (frameW <= 0 || frameH <= 0) {
    return false;
  }
  const isOn = smelterState?.isOn != null
    ? smelterState.isOn
    : !!smelterState?.isActive;
  const animationFps = 8;
  const frameIndex = isOn
    ? floor(nowSeconds * animationFps) % frameCount
    : 0;

  const visualScale = 2;
  const targetWidth = round(frameW * visualScale);
  const targetHeight = round(frameH * visualScale);
  const manualOffset = getSmelterManualPixelOffset(facing);
  const spriteX = round(px + (drawWidth - targetWidth) / 2 + manualOffset.xOffsetPx);
  const spriteY = round(py + drawHeight - targetHeight + manualOffset.yOffsetPx);
  const shouldMirrorWest = false;
  const srcX = min(frameIndex * frameW, max(0, sprite.width - frameW));

  imageMode(CORNER);
  if (alpha < 255) {
    tint(255, constrain(alpha, 0, 255));
  } else {
    noTint();
  }
  const previousSmoothing = drawingContext.imageSmoothingEnabled;
  drawingContext.imageSmoothingEnabled = false;
  if (shouldMirrorWest) {
    push();
    translate(spriteX + targetWidth / 2, 0);
    scale(-1, 1);
    image(
      sprite,
      -targetWidth / 2,
      spriteY,
      targetWidth,
      targetHeight,
      srcX,
      0,
      frameW,
      frameH
    );
    pop();
  } else {
    image(
      sprite,
      spriteX,
      spriteY,
      targetWidth,
      targetHeight,
      srcX,
      0,
      frameW,
      frameH
    );
  }
  drawingContext.imageSmoothingEnabled = previousSmoothing;
  noTint();
  return true;
}

/**
 * Get constructor sprite for facing.
 * @param {*} facing - Cardinal facing direction.
 * @returns {*} Computed value for the requested operation.
 */
function getConstructorSpriteForFacing(facing) {
  const dir = facing || "E";
  if (dir === "E") {
    return constructorSideImg || constructorFrontImg || constructorBackImg || null;
  }
  if (dir === "W") {
    return constructorSideImg || constructorBackImg || constructorFrontImg || null;
  }
  if (dir === "N") {
    return constructorFrontImg || constructorBackImg || constructorSideImg || null;
  }
  if (dir === "S") {
    return constructorBackImg || constructorFrontImg || constructorSideImg || null;
  }
  return constructorSideImg || constructorFrontImg || constructorBackImg || null;
}

/**
 * Draw placed constructor sprite.
 * @param {*} px - X pixel position.
 * @param {*} py - Y pixel position.
 * @param {*} drawWidth - Input value used by this operation.
 * @param {*} drawHeight - Input value used by this operation.
 * @param {*} facing - Cardinal facing direction.
 * @param {*} alpha - Input value used by this operation.
 * @param {*} options - Optional configuration object.
 * @returns {boolean} Whether the check or operation succeeds.
 */
function drawPlacedConstructorSprite(px, py, drawWidth, drawHeight, facing, alpha = 255, options = {}) {
  const sprite = getConstructorSpriteForFacing(facing);
  if (!sprite || sprite.width <= 0 || sprite.height <= 0) {
    return false;
  }

  const visualScale = 2;
  const dir = facing || "E";
  const targetWidth = round(sprite.width * visualScale);
  const targetHeight = round(sprite.height * visualScale);
  const manualX = dir === "E" ? -3 : dir === "W" ? 3 : 0;
  const spriteX = round(px + (drawWidth - targetWidth) / 2 + manualX);
  const spriteY = round(py + drawHeight - targetHeight);
  const shouldMirrorWest = !!options.mirrorWest && dir === "W";

  imageMode(CORNER);
  if (alpha < 255) {
    tint(255, constrain(alpha, 0, 255));
  } else {
    noTint();
  }
  if (shouldMirrorWest) {
    push();
    translate(spriteX + targetWidth / 2, 0);
    scale(-1, 1);
    image(sprite, -targetWidth / 2, spriteY, targetWidth, targetHeight);
    pop();
  } else {
    image(sprite, spriteX, spriteY, targetWidth, targetHeight);
  }
  noTint();
  return true;
}

/**
 * Get splitter sprite for facing.
 * @param {*} facing - Cardinal facing direction.
 * @param {*} options - Optional configuration object.
 * @returns {*} Computed value for the requested operation.
 */
function getSplitterSpriteForFacing(facing, options = {}) {
  const preferSideForEast = !!options.preferSideForEast;
  const dir = facing || "E";
  if (dir === "E") {
    if (preferSideForEast) {
      return splitterSideImg || splitterFrontImg || splitterBackImg || null;
    }
    return splitterFrontImg || splitterBackImg || splitterSideImg || null;
  }
  if (dir === "W") {
    return splitterSideImg || splitterBackImg || splitterFrontImg || null;
  }
  if (dir === "N") {
    return splitterFrontImg || splitterBackImg || splitterSideImg || null;
  }
  if (dir === "S") {
    return splitterBackImg || splitterFrontImg || splitterSideImg || null;
  }
  return splitterSideImg || splitterFrontImg || splitterBackImg || null;
}

/**
 * Draw placed splitter sprite.
 * @param {*} px - X pixel position.
 * @param {*} py - Y pixel position.
 * @param {*} drawWidth - Input value used by this operation.
 * @param {*} drawHeight - Input value used by this operation.
 * @param {*} facing - Cardinal facing direction.
 * @param {*} alpha - Input value used by this operation.
 * @param {*} options - Optional configuration object.
 * @returns {boolean} Whether the check or operation succeeds.
 */
function drawPlacedSplitterSprite(px, py, drawWidth, drawHeight, facing, alpha = 255, options = {}) {
  const sprite = getSplitterSpriteForFacing(facing, options);
  if (!sprite || sprite.width <= 0 || sprite.height <= 0) {
    return false;
  }

  const visualScale = 2;
  const targetWidth = round(sprite.width * visualScale);
  const targetHeight = round(sprite.height * visualScale);
  // Render exact PNG pixels (no scaling). Anchor to footprint base so any
  // excess height naturally overhangs upward.
  const spriteX = round(px + (drawWidth - targetWidth) / 2);
  const spriteY = round(py + drawHeight - targetHeight);
  const shouldMirrorWest = !!options.mirrorWest && (facing || "E") === "W";

  imageMode(CORNER);
  if (alpha < 255) {
    tint(255, alpha);
  } else {
    noTint();
  }

  if (shouldMirrorWest) {
    push();
    translate(spriteX + targetWidth / 2, 0);
    scale(-1, 1);
    image(sprite, -targetWidth / 2, spriteY, targetWidth, targetHeight);
    pop();
  } else {
    image(sprite, spriteX, spriteY, targetWidth, targetHeight);
  }
  noTint();
  return true;
}

/**
 * Get merger sprite for facing.
 * @param {*} facing - Cardinal facing direction.
 * @param {*} options - Optional configuration object.
 * @returns {*} Computed value for the requested operation.
 */
function getMergerSpriteForFacing(facing, options = {}) {
  const preferSideForEast = !!options.preferSideForEast;
  const dir = facing || "E";
  if (dir === "E") {
    if (preferSideForEast) {
      return mergerSideImg || mergerFrontImg || mergerBackImg || null;
    }
    return mergerFrontImg || mergerBackImg || mergerSideImg || null;
  }
  if (dir === "W") {
    return mergerSideImg || mergerBackImg || mergerFrontImg || null;
  }
  if (dir === "N") {
    return mergerFrontImg || mergerBackImg || mergerSideImg || null;
  }
  if (dir === "S") {
    return mergerBackImg || mergerFrontImg || mergerSideImg || null;
  }
  return mergerSideImg || mergerFrontImg || mergerBackImg || null;
}

/**
 * Draw placed merger sprite.
 * @param {*} px - X pixel position.
 * @param {*} py - Y pixel position.
 * @param {*} drawWidth - Input value used by this operation.
 * @param {*} drawHeight - Input value used by this operation.
 * @param {*} facing - Cardinal facing direction.
 * @param {*} alpha - Input value used by this operation.
 * @param {*} options - Optional configuration object.
 * @returns {boolean} Whether the check or operation succeeds.
 */
function drawPlacedMergerSprite(px, py, drawWidth, drawHeight, facing, alpha = 255, options = {}) {
  const sprite = getMergerSpriteForFacing(facing, options);
  if (!sprite || sprite.width <= 0 || sprite.height <= 0) {
    return false;
  }

  const visualScale = 2;
  const targetWidth = round(sprite.width * visualScale);
  const targetHeight = round(sprite.height * visualScale);
  const spriteX = round(px + (drawWidth - targetWidth) / 2);
  const spriteY = round(py + drawHeight - targetHeight);
  const shouldMirrorWest = !!options.mirrorWest && (facing || "E") === "W";

  imageMode(CORNER);
  if (alpha < 255) {
    tint(255, alpha);
  } else {
    noTint();
  }

  if (shouldMirrorWest) {
    push();
    translate(spriteX + targetWidth / 2, 0);
    scale(-1, 1);
    image(sprite, -targetWidth / 2, spriteY, targetWidth, targetHeight);
    pop();
  } else {
    image(sprite, spriteX, spriteY, targetWidth, targetHeight);
  }
  noTint();
  return true;
}

/**
 * Draw placed rocket platform sprite.
 * @param {*} px - X pixel position.
 * @param {*} py - Y pixel position.
 * @param {*} drawWidth - Input value used by this operation.
 * @param {*} drawHeight - Input value used by this operation.
 * @param {*} alpha - Input value used by this operation.
 * @param {*} completed - Input value used by this operation.
 * @returns {boolean} Whether the check or operation succeeds.
 */
function drawPlacedRocketPlatformSprite(px, py, drawWidth, drawHeight, alpha = 255, completed = false) {
  const sprite = completed
    ? (rocketPlatformBuiltImg || rocketPlatformImg)
    : (rocketPlatformImg || rocketPlatformBuiltImg);
  if (!sprite || sprite.width <= 0 || sprite.height <= 0) {
    return false;
  }

  const targetWidth = round(drawWidth);
  let targetHeight = round(drawHeight);
  let spriteY;
  if (completed) {
    // Keep the completed rocket's original aspect ratio so it can extend above
    // the 3x3 footprint instead of being vertically squashed into it.
    targetHeight = round((sprite.height / sprite.width) * targetWidth);
    spriteY = round(py - 10 + drawHeight - targetHeight);
  } else {
    spriteY = round(py + drawHeight - targetHeight);
  }
  const spriteX = round(px + (drawWidth - targetWidth) / 2);

  imageMode(CORNER);
  if (alpha < 255) {
    tint(255, constrain(alpha, 0, 255));
  } else {
    noTint();
  }
  image(sprite, spriteX, spriteY, targetWidth, targetHeight);
  noTint();
  return true;
}

/**
 * Get corner tube display frame size.
 * @param {*} facing - Cardinal facing direction.
 * @returns {*} Computed value for the requested operation.
 */
function getCornerTubeDisplayFrameSize(facing) {
  const useCurve2Family = facing === "N" || facing === "W";
  const offImg = useCurve2Family
    ? (pipeCurve2OffImg || pipeCurve1OffImg)
    : (pipeCurve1OffImg || pipeCurve2OffImg);
  const onImg = useCurve2Family
    ? (pipeCurve2OnImg || pipeCurve1OnImg)
    : (pipeCurve1OnImg || pipeCurve2OnImg);

  const offFrameW = offImg && offImg.width > 0 ? offImg.width / 8 : 0;
  const offFrameH = offImg && offImg.height > 0 ? offImg.height : 0;
  const onFrameW = onImg && onImg.width > 0 ? onImg.width : 0;
  const onFrameH = onImg && onImg.height > 0 ? onImg.height : 0;

  const frameW = max(1, round(max(offFrameW, onFrameW)));
  const frameH = max(1, round(max(offFrameH, onFrameH)));
  return { frameW, frameH };
}

/**
 * Draw the hologram sprite preview for tube placement, including orientation handling.
 * @param {*} footprintLeft - Left pixel of the preview footprint.
 * @param {*} footprintTop - Top pixel of the preview footprint.
 * @param {*} footprintWidth - Width of the preview footprint in pixels.
 * @param {*} footprintHeight - Height of the preview footprint in pixels.
 * @param {*} previewOptions - Tube preview configuration (shape and facing).
 * @param {*} alpha - Preview transparency (0-255).
 * @param {*} baseCol - Optional world tile column anchor.
 * @param {*} baseRow - Optional world tile row anchor.
 * @returns {boolean} True when a sprite frame is drawn; false when assets are unavailable.
 */
function drawTubePlacementHologramSprite(
  footprintLeft,
  footprintTop,
  footprintWidth,
  footprintHeight,
  previewOptions,
  alpha = 225,
  baseCol = null,
  baseRow = null
) {
  const tubeVisualScale = 2;
  const facing = previewOptions?.facing || "E";
  const shape = previewOptions?.shape || TUBE_SHAPES.STRAIGHT;
  const previewTube = {
    tileX: baseCol != null ? baseCol : 0,
    tileY: baseRow != null ? baseRow : 0,
    state: { facing, shape }
  };

  const offsets = getTubePortOffsets(previewTube);
  const isCorner = shape === TUBE_SHAPES.CORNER;
  let isHorizontalStraight = false;
  let img = null;
  let numFrames = 1;
  let frameIndex = 0;

  // Pick the same sprite family/frame logic used by placed tubes so previews match runtime visuals.
  if (isCorner) {
    const useCurve2Family = facing === "N" || facing === "W";
    img = useCurve2Family
      ? (pipeCurve2OffImg || pipeCurve1OffImg)
      : (pipeCurve1OffImg || pipeCurve2OffImg);
    numFrames = 8;
  } else {
    isHorizontalStraight = offsets.input.y === offsets.output.y;
    img = isHorizontalStraight
      ? (pipeSideOffImg || pipeFrontOffImg)
      : pipeFrontOffImg;
    if (img === pipeSideOffImg) {
      numFrames = 8;
    } else if (img === pipeFrontOffImg) {
      numFrames = 8;
    }
  }

  if (!img || img.width <= 0 || img.height <= 0) {
    return false;
  }

  const frameW = img.width / max(1, numFrames);
  const frameH = img.height;
  const cornerDisplaySize = isCorner
    ? getCornerTubeDisplayFrameSize(facing)
    : null;
  const targetW = round(
    (cornerDisplaySize ? cornerDisplaySize.frameW : frameW) * tubeVisualScale
  );
  const targetH = round(
    (cornerDisplaySize ? cornerDisplaySize.frameH : frameH) * tubeVisualScale
  );
  imageMode(CORNER);
  tint(255, alpha);
  if (isCorner) {
    const cornerVisual = getCornerTubeVisualTransform(facing);
    push();
    translate(
      footprintLeft + footprintWidth / 2,
      footprintTop + footprintHeight / 2
    );
    rotate(cornerVisual.angle);
    if (cornerVisual.mirrorX) {
      scale(-1, 1);
    }
    image(
      img,
      -targetW / 2 + (cornerVisual.xOffsetPx || 0),
      footprintHeight / 2 - targetH + (cornerVisual.yOffsetPx || 0),
      targetW,
      targetH,
      frameIndex * frameW,
      0,
      frameW,
      frameH
    );
    pop();
  } else {
    const spriteX = round(footprintLeft + (footprintWidth - targetW) / 2);
    const spriteY = round(footprintTop + footprintHeight - targetH);
    image(
      img,
      spriteX,
      spriteY,
      targetW,
      targetH,
      frameIndex * frameW,
      0,
      frameW,
      frameH
    );
  }
  noTint();
  return true;
}

const TUBE_LAYER_BANDS = Object.freeze({
  under: Object.freeze({ start: 0.68, end: 1.0 }),
  body: Object.freeze({ start: 0.26, end: 0.78 }),
  over: Object.freeze({ start: 0.0, end: 0.36 })
});

/**
 * Get entity draw bounds.
 * @param {*} entity - Target entity instance.
 * @param {*} tileSize - Tile size in pixels.
 * @returns {void} No return value.
 */
function getEntityDrawBounds(entity, tileSize) {
  const footprintFacing = entity.state?.facing || "E";
  const footprintOffsets = getSafeFootprintOffsets(
    entity.type,
    footprintFacing,
    entity.state
  );
  let minOffsetX = Infinity;
  let maxOffsetX = -Infinity;
  let minOffsetY = Infinity;
  let maxOffsetY = -Infinity;
  for (const offset of footprintOffsets) {
    minOffsetX = min(minOffsetX, offset.x);
    maxOffsetX = max(maxOffsetX, offset.x);
    minOffsetY = min(minOffsetY, offset.y);
    maxOffsetY = max(maxOffsetY, offset.y);
  }
  const footprintWidthTiles = maxOffsetX - minOffsetX + 1;
  const footprintHeightTiles = maxOffsetY - minOffsetY + 1;
  const px = (entity.tileX + minOffsetX) * tileSize;
  const py = (entity.tileY + minOffsetY) * tileSize;
  const drawWidth = footprintWidthTiles * tileSize;
  const drawHeight = footprintHeightTiles * tileSize;
  return {
    px,
    py,
    drawWidth,
    drawHeight,
    tileX: entity.tileX,
    tileY: entity.tileY
  };
}

/**
 * To Cardinal Direction Key.
 * @param {*} offset - Input value used by this operation.
 * @returns {string} Computed text result.
 */
function toCardinalDirectionKey(offset) {
  if (!offset) return null;
  if (offset.x === 1 && offset.y === 0) return "E";
  if (offset.x === -1 && offset.y === 0) return "W";
  if (offset.x === 0 && offset.y === 1) return "S";
  if (offset.x === 0 && offset.y === -1) return "N";
  return null;
}

/**
 * Compare tube descriptors for render.
 * @param {*} a - Input value used by this operation.
 * @param {*} b - Input value used by this operation.
 * @returns {*} Computed value for the requested operation.
 */
function compareTubeDescriptorsForRender(a, b) {
  if (a.zLane !== b.zLane) {
    return a.zLane - b.zLane;
  }
  if (a.tileY !== b.tileY) {
    return a.tileY - b.tileY;
  }
  if (a.tileX !== b.tileX) {
    return a.tileX - b.tileX;
  }
  return (a.entity?.id || 0) - (b.entity?.id || 0);
}

/**
 * Build tube render descriptor.
 * @param {*} entity - Target entity instance.
 * @param {*} tileSize - Tile size in pixels.
 * @param {*} nowMs - Current time in milliseconds.
 * @returns {void} No return value.
 */
function buildTubeRenderDescriptor(entity, tileSize, nowMs) {
  const bounds = getEntityDrawBounds(entity, tileSize);
  const state = entity.state || {};
  const offsets = getTubePortOffsets(entity);
  const isCorner = state.shape === TUBE_SHAPES.CORNER;
  const cornerFacing = state.facing || "E";
  const cornerVisual = getCornerTubeVisualTransform(cornerFacing);
  const isFlowing = state.flowState === "flowing";
  const zLaneRaw = Number(state.zLane);
  const zLane = Number.isFinite(zLaneRaw) ? zLaneRaw : 0;
  let img = null;
  let frontOverlayImg = null;
  let numFrames = 1;
  let frameIndex = 0;
  const connectionMask = { N: false, E: false, S: false, W: false };
  const inputDir = toCardinalDirectionKey(offsets.input);
  const outputDir = toCardinalDirectionKey(offsets.output);
  if (inputDir) connectionMask[inputDir] = true;
  if (outputDir) connectionMask[outputDir] = true;

  if (isCorner) {
    const useCurve2Family = cornerFacing === "N" || cornerFacing === "W";
    const offImg = useCurve2Family
      ? (pipeCurve2OffImg || pipeCurve1OffImg)
      : (pipeCurve1OffImg || pipeCurve2OffImg);
    const onImg = useCurve2Family
      ? (pipeCurve2OnImg || pipeCurve1OnImg)
      : (pipeCurve1OnImg || pipeCurve2OnImg);
    const hasValidIo = state.hasOpenPort === false;
    const hasSupplySignal = isFlowing || (Number(state.outputRate) || 0) > 0;
    const cornerIsOn = hasValidIo && hasSupplySignal;
    img = cornerIsOn ? (onImg || offImg) : (offImg || onImg);
    if (cornerIsOn) {
      numFrames = 1;
    } else {
      // Follow side-pipe light propagation form: static base shape, light-only flash frames.
      numFrames = 8;
      const flashPattern = [0, 0, 0, 2, 0, 0, 0, 5, 0, 0, 0, 7];
      const flashTick = Math.floor(nowMs / 220);
      const primaryDir = offsets.output.y !== 0 ? offsets.output.y : offsets.output.x;
      const directionSign = primaryDir < 0 ? 1 : -1;
      const patternLen = flashPattern.length;
      const phaseRaw = entity.tileX + entity.tileY;
      const phase = ((phaseRaw % patternLen) + patternLen) % patternLen;
      const tickDirected = directionSign * flashTick;
      const patternIndex = ((tickDirected + phase) % patternLen + patternLen) % patternLen;
      frameIndex = flashPattern[patternIndex] % numFrames;
    }
  } else {
    const isHorizontalStraight = offsets.input.y === offsets.output.y;
    const horizontalFlowDirection = isHorizontalStraight
      ? Math.sign(offsets.output.x - offsets.input.x)
      : 0;
    const verticalFlowDirection = !isHorizontalStraight
      ? Math.sign(offsets.output.y - offsets.input.y)
      : 0;
    const reverseSideOffLight = horizontalFlowDirection < 0;
    const reverseFrontOffLight = verticalFlowDirection < 0;
    const hasValidIo = state.hasOpenPort === false;
    const hasSupplySignal = isFlowing || (Number(state.outputRate) || 0) > 0;
    const sideIsOn = hasValidIo && hasSupplySignal;
    const verticalIsOn = !isHorizontalStraight && hasValidIo && hasSupplySignal;
    img = isHorizontalStraight
      ? (sideIsOn
          ? (pipeSideOnImg || pipeSideOnMiniImg || pipeFrontOffImg)
          : (pipeSideOffImg || pipeFrontOffImg))
      : (verticalIsOn
          ? (pipeFrontOnImg || pipeFrontOffImg)
          : (pipeFrontOffImg || pipeFrontOnImg));

    if (img === pipeFrontOffImg) {
      numFrames = 8;
    } else if (img === pipeSideOffImg) {
      // pipeSideOff is an 8-frame horizontal strip (144x16 => 8 * 18x16).
      numFrames = 8;
    } else if (img === pipeFrontOnImg) {
      numFrames = 1;
    }

    const animateOffSideTube = img === pipeSideOffImg;
    const animateOffFrontTube =
      img === pipeFrontOffImg &&
      !isHorizontalStraight &&
      !isFlowing &&
      !hasValidIo;
    if (numFrames > 1 && animateOffSideTube) {
      // Flashing pattern (not scrolling): mostly hold base frame with periodic
      // alternate light sets so the tube feels stationary while lights pulse.
      const flashPattern = [0, 0, 0, 2, 0, 0, 0, 5, 0, 0, 0, 7];
      const flashTick = Math.floor(nowMs / 220);
      const directionSign = reverseSideOffLight ? 1 : -1;
      const patternLen = flashPattern.length;
      const phaseRaw = isHorizontalStraight ? entity.tileX : entity.tileY;
      const phase = ((phaseRaw % patternLen) + patternLen) % patternLen;
      const tickDirected = directionSign * flashTick;
      const patternIndex = ((tickDirected + phase) % patternLen + patternLen) % patternLen;
      const frameFromPattern = flashPattern[patternIndex];
      frameIndex = frameFromPattern % numFrames;
    } else if (numFrames > 1 && animateOffFrontTube) {
      const flashPattern = [0, 0, 0, 2, 0, 0, 0, 5, 0, 0, 0, 7];
      const flashTick = Math.floor(nowMs / 220);
      const directionSign = reverseFrontOffLight ? 1 : -1;
      const patternLen = flashPattern.length;
      const phaseRaw = entity.tileY;
      const phase = ((phaseRaw % patternLen) + patternLen) % patternLen;
      const tickDirected = directionSign * flashTick;
      const patternIndex = ((tickDirected + phase) % patternLen + patternLen) % patternLen;
      const frameFromPattern = flashPattern[patternIndex];
      frameIndex = frameFromPattern % numFrames;
    } else if (numFrames > 1 && hasValidIo && hasSupplySignal && !isFlowing && isHorizontalStraight) {
      frameIndex = Math.floor(nowMs / 150) % numFrames;
    }
  }

  const hasSprite = !!(img && img.width > 0 && img.height > 0);
  const frameW = hasSprite ? (img.width / max(1, numFrames)) : tileSize;
  const frameH = hasSprite ? img.height : tileSize;
  return {
    entity,
    tileX: bounds.tileX,
    tileY: bounds.tileY,
    px: bounds.px,
    py: bounds.py,
    drawWidth: bounds.drawWidth,
    drawHeight: bounds.drawHeight,
    zLane,
    isCorner,
    rotationAngle: facingToAngle(state.facing || "E"),
    cornerRotationAngle: cornerVisual.angle,
    cornerMirrorX: cornerVisual.mirrorX,
    cornerXOffsetPx: cornerVisual.xOffsetPx || 0,
    cornerYOffsetPx: cornerVisual.yOffsetPx || 0,
    connectionMask,
    neighborMask: { N: false, E: false, S: false, W: false },
    img,
    frontOverlayImg,
    hasSprite,
    numFrames,
    frameW,
    frameH,
    frameIndex
  };
}

/**
 * Annotate Tube Descriptor Neighbors.
 * @param {*} descriptors - Input value used by this operation.
 * @returns {void} No return value.
 */
function annotateTubeDescriptorNeighbors(descriptors) {
  const lookup = new Map();
  for (const descriptor of descriptors) {
    lookup.set(
      `${descriptor.zLane}|${descriptor.tileX},${descriptor.tileY}`,
      descriptor
    );
  }

  const offsets = {
    N: { x: 0, y: -1 },
    E: { x: 1, y: 0 },
    S: { x: 0, y: 1 },
    W: { x: -1, y: 0 }
  };
  const opposite = { N: "S", E: "W", S: "N", W: "E" };

  for (const descriptor of descriptors) {
    for (const key of ["N", "E", "S", "W"]) {
      const offset = offsets[key];
      const neighborKey =
        `${descriptor.zLane}|${descriptor.tileX + offset.x},${descriptor.tileY + offset.y}`;
      const neighbor = lookup.get(neighborKey);
      if (!neighbor) {
        descriptor.neighborMask[key] = false;
        continue;
      }
      if (!descriptor.connectionMask[key]) {
        descriptor.neighborMask[key] = false;
        continue;
      }
      const reciprocalKey = opposite[key];
      descriptor.neighborMask[key] = !!neighbor.connectionMask[reciprocalKey];
    }
  }
}

/**
 * Draw connected vertical front tube layer.
 * @param {*} descriptor - Input value used by this operation.
 * @param {*} layerName - Input value used by this operation.
 * @returns {void} No return value.
 */
function drawConnectedVerticalFrontTubeLayer(descriptor, layerName) {
  const band = TUBE_LAYER_BANDS[layerName] || TUBE_LAYER_BANDS.body;
  const frameH = descriptor.frameH;
  const frameW = descriptor.frameW;
  const srcX = descriptor.frameIndex * frameW;
  const hasNorthJoin = !!descriptor.neighborMask.N;
  const hasSouthJoin = !!descriptor.neighborMask.S;

  // Remove rounded caps at joined edges so stacked N/S segments read as one run.
  // Keep top seam pixels on the "over" layer so south tiles can visually
  // sit on top of north neighbors at the join.
  const capPx = max(3, round(frameH * 0.22));
  const isOverLayer = layerName === "over";
  const trimTop = hasNorthJoin && !isOverLayer ? capPx : 0;
  // Preserve standalone bottom cap so the circular entrance stays visible
  // in the placed tile; joined segments trim their south cap.
  const trimBottom = hasSouthJoin ? capPx : 0;
  let srcStart = trimTop;
  let srcEnd = frameH - trimBottom;
  if (srcEnd <= srcStart + 1) {
    srcStart = 0;
    srcEnd = frameH;
  }

  // Small overlap into connected neighbors to hide seams.
  // Depth rule: south tiles should visually sit on top of north tiles.
  // So only extend upward into the north neighbor; do not extend downward
  // into the south neighbor (the south tile will own that seam).
  const defaultTopOverhang = max(2, round(descriptor.drawHeight * 0.20));
  const scaleY = descriptor.drawHeight / frameH;
  const capPxScaled = ceil(capPx * scaleY);
  const joinPx = max(defaultTopOverhang, round(capPxScaled * 1.35));
  // Keep anchor connection-invariant so adding/removing neighbors never shifts
  // a tube vertically. Increase fixed north bleed to strengthen overlap.
  const extraNorthBleedPx = max(3, round(descriptor.drawHeight * 0.14) + 10);
  const topLiftPx = max(joinPx, capPxScaled) + extraNorthBleedPx;
  const dstBaseTop = descriptor.py - topLiftPx;
  const bottomOverhangPx = 0;
  const dstBaseBottom = descriptor.py + descriptor.drawHeight + bottomOverhangPx;
  const dstBaseH = max(1, dstBaseBottom - dstBaseTop);

  // Keep tube proportions stable across connection states by mapping with
  // full-frame scale. Trims remove geometry instead of re-stretching it.
  const srcLayerStart = floor(frameH * band.start);
  const srcLayerEnd = ceil(frameH * band.end);
  const clampedStart = constrain(srcLayerStart, srcStart, srcEnd - 1);
  const clampedEnd = constrain(srcLayerEnd, clampedStart + 1, srcEnd);
  const srcH = max(1, clampedEnd - clampedStart);
  const pixelsPerSourceY = dstBaseH / frameH;
  const dstY = round(dstBaseTop + clampedStart * pixelsPerSourceY);
  const dstH = max(1, round(srcH * pixelsPerSourceY));

  image(
    descriptor.img,
    descriptor.px,
    dstY,
    descriptor.drawWidth,
    dstH,
    srcX,
    clampedStart,
    frameW,
    srcH
  );

  if (isOverLayer && hasNorthJoin) {
    const seamCapPx = capPx;
    const seamSrcStart = 0;
    const seamSrcEnd = min(seamCapPx, frameH);
    const seamSrcH = max(1, seamSrcEnd - seamSrcStart);
    const seamDstH = max(1, round((seamSrcH / frameH) * descriptor.drawHeight));
    const seamDstY = round(descriptor.py - seamDstH);
    image(
      descriptor.img,
      descriptor.px,
      seamDstY,
      descriptor.drawWidth,
      seamDstH,
      srcX,
      seamSrcStart,
      frameW,
      seamSrcH
    );
  }
}

/**
 * Draw front tube overlay.
 * @param {*} descriptor - Input value used by this operation.
 * @returns {void} No return value.
 */
function drawFrontTubeOverlay(descriptor) {
  if (!descriptor || !descriptor.frontOverlayImg) {
    return;
  }
  const overlay = descriptor.frontOverlayImg;
  if (!overlay || overlay.width <= 0 || overlay.height <= 0) {
    return;
  }
  const baseFrameW = max(1, descriptor.frameW);
  const baseFrameH = max(1, descriptor.frameH);
  const targetW = descriptor.drawWidth * (overlay.width / baseFrameW);
  const targetH = descriptor.drawHeight * (overlay.height / baseFrameH);
  const x = round(descriptor.px + (descriptor.drawWidth - targetW) / 2);
  const y = round(descriptor.py + (descriptor.drawHeight - targetH) / 2);
  imageMode(CORNER);
  image(overlay, x, y, targetW, targetH);
}

/**
 * Draw tube descriptor layer.
 * @param {*} descriptor - Input value used by this operation.
 * @param {*} layerName - Input value used by this operation.
 * @returns {void} No return value.
 */
function drawTubeDescriptorLayer(descriptor, layerName) {
  if (!descriptor) {
    return;
  }

  if (layerName !== "body") {
    return;
  }

  if (!descriptor.hasSprite) {
    stroke(50);
    fill(120);
    rect(
      descriptor.px + 4,
      descriptor.py + 4,
      descriptor.drawWidth - 8,
      descriptor.drawHeight - 8,
      4
    );
    return;
  }

  const tubeVisualScale = 2;
  const srcX = descriptor.frameIndex * descriptor.frameW;
  const frameW = descriptor.frameW;
  const frameH = descriptor.frameH;
  const cornerFacing = descriptor.entity?.state?.facing || "E";
  const cornerDisplaySize = descriptor.isCorner
    ? getCornerTubeDisplayFrameSize(cornerFacing)
    : null;
  const targetW = round(
    (cornerDisplaySize ? cornerDisplaySize.frameW : frameW) * tubeVisualScale
  );
  const targetH = round(
    (cornerDisplaySize ? cornerDisplaySize.frameH : frameH) * tubeVisualScale
  );
  const spriteX = round(descriptor.px + (descriptor.drawWidth - targetW) / 2);
  const spriteY = round(descriptor.py + descriptor.drawHeight - targetH);

  imageMode(CORNER);
  if (descriptor.isCorner) {
    push();
    translate(
      descriptor.px + descriptor.drawWidth / 2,
      descriptor.py + descriptor.drawHeight / 2
    );
    rotate(
      Number.isFinite(descriptor.cornerRotationAngle)
        ? descriptor.cornerRotationAngle
        : descriptor.rotationAngle
    );
    if (descriptor.cornerMirrorX) {
      scale(-1, 1);
    }
    image(
      descriptor.img,
      -targetW / 2 + (descriptor.cornerXOffsetPx || 0),
      descriptor.drawHeight / 2 - targetH + (descriptor.cornerYOffsetPx || 0),
      targetW,
      targetH,
      srcX,
      0,
      frameW,
      frameH
    );
    pop();
  } else {
    image(
      descriptor.img,
      spriteX,
      spriteY,
      targetW,
      targetH,
      srcX,
      0,
      frameW,
      frameH
    );
  }
}

/**
 * Draw tube descriptors in layered passes.
 * @param {*} descriptors - Input value used by this operation.
 * @returns {void} No return value.
 */
function drawTubeDescriptorsInLayeredPasses(descriptors) {
  if (!Array.isArray(descriptors) || descriptors.length === 0) {
    return;
  }

  const sorted = [...descriptors].sort(compareTubeDescriptorsForRender);
  for (const descriptor of sorted) {
    drawTubeDescriptorLayer(descriptor, "body");
  }
}

/**
 * Get entity southmost render tile y.
 * @param {*} entity - Target entity instance.
 * @returns {*} Computed value for the requested operation.
 */
function getEntitySouthmostRenderTileY(entity) {
  if (!entity) {
    return 0;
  }
  const facing = entity.state?.facing || "E";
  const offsets = getSafeFootprintOffsets(entity.type, facing, entity.state);
  let maxOffsetY = -Infinity;
  for (const offset of offsets) {
    maxOffsetY = max(maxOffsetY, offset.y);
  }
  if (!Number.isFinite(maxOffsetY)) {
    maxOffsetY = 0;
  }
  return entity.tileY + maxOffsetY;
}

/**
 * Get rocket pulse overlay for entity.
 * @param {*} entity - Target entity instance.
 * @param {*} nowSeconds - Current time in seconds.
 * @returns {object|null} Computed object result, or null when unavailable.
 */
function getRocketPulseOverlayForEntity(entity, nowSeconds) {
  if (
    !entity ||
    entity.type !== ENTITY_TYPES.ROCKET_SITE
  ) {
    return null;
  }

  const rocketState = entity.state || null;

  if (!rocketState) {
    return null;
  }

  const completed = !!rocketState.completed;
  const buildProgress = Number(rocketState.buildProgress) || 0;
  const loading = !completed && buildProgress > 0;
  if (!loading && !completed) {
    return null;
  }

  const pulse = 0.5 + 0.5 * Math.sin(nowSeconds * 3.2);
  if (completed) {
    return { r: 176, g: 184, b: 194, a: 58 + pulse * 72 };
  }
  return { r: 84, g: 244, b: 124, a: 62 + pulse * 78 };
}

/**
 * Draw non tube entity.
 * @param {*} entity - Target entity instance.
 * @param {*} tileSize - Tile size in pixels.
 * @param {*} nowSeconds - Current time in seconds.
 * @returns {void} No return value.
 */
function drawNonTubeEntity(entity, tileSize, nowSeconds) {
  const bounds = getEntityDrawBounds(entity, tileSize);
  const px = bounds.px;
  const py = bounds.py;
  const drawWidth = bounds.drawWidth;
  const drawHeight = bounds.drawHeight;
  const rotatePlacedConstructorContext = (drawFn) => {
    drawFn();
  };

  const drewMinerSprite =
    entity.type === ENTITY_TYPES.MINER &&
    drawPlacedMinerSprite(px, py, drawWidth, drawHeight, tileSize, entity.state, nowSeconds);
  const drewSmelterSprite =
    entity.type === ENTITY_TYPES.SMELTER &&
    drawPlacedSmelterSprite(
      px,
      py,
      drawWidth,
      drawHeight,
      entity.state?.facing || "E",
      entity.state,
      nowSeconds
    );
  const drewConstructorSprite =
    entity.type === ENTITY_TYPES.CONSTRUCTOR &&
    drawPlacedConstructorSprite(
      px,
      py,
      drawWidth,
      drawHeight,
      entity.state?.facing || "E",
      255,
      { mirrorWest: true }
    );
  const drewSplitterSprite =
    entity.type === ENTITY_TYPES.SPLITTER &&
    drawPlacedSplitterSprite(
      px,
      py,
      drawWidth,
      drawHeight,
      entity.state?.facing || "E",
      255,
      { preferSideForEast: true, mirrorWest: true }
    );
  const drewMergerSprite =
    entity.type === ENTITY_TYPES.MERGER &&
    drawPlacedMergerSprite(
      px,
      py,
      drawWidth,
      drawHeight,
      entity.state?.facing || "E",
      255,
      { preferSideForEast: true, mirrorWest: true }
    );
    
  const drewShuttleSprite = 
    entity.type === ENTITY_TYPES.SHUTTLE &&
    drawPlacedShuttleSprite(px, py, drawWidth, drawHeight, tileSize, entity.state, nowSeconds);
  const drewRocketSprite =
    entity.type === ENTITY_TYPES.ROCKET_SITE &&
    drawPlacedRocketPlatformSprite(
      px,
      py,
      drawWidth,
      drawHeight,
      255,
      !!entity.state?.completed
    );
  const drewCustomSprite =
    drewMinerSprite ||
    drewSmelterSprite ||
    drewConstructorSprite ||
    drewSplitterSprite ||
    drewMergerSprite ||
    drewShuttleSprite ||
    drewRocketSprite;

  if (!drewCustomSprite) {
    // Regular building fallback rendering when no custom sprite is used.
    rotatePlacedConstructorContext(() => {
      stroke(50);
      const rgb = getEntityFillRgb(entity.type);
      fill(rgb[0], rgb[1], rgb[2]);
      rect(px + 4, py + 4, drawWidth - 8, drawHeight - 8, 4);
    });
  }

  if (entity.state.isBroken) {
    rotatePlacedConstructorContext(() => {
      stroke(255, 0, 0);
      strokeWeight(3);
      line(px + 6, py + 6, px + drawWidth - 6, py + drawHeight - 6);
      line(px + drawWidth - 6, py + 6, px + 6, py + drawHeight - 6);
      strokeWeight(1);
    });
  }

  if (!drewCustomSprite) {
    rotatePlacedConstructorContext(() => {
      noStroke();
      const powerOn = entity.state.isOn != null ? entity.state.isOn : entity.state.isActive;
      fill(powerOn ? color(0, 220, 0) : color(220, 0, 0));
      circle(px + drawWidth - 8, py + 8, 8);
    });
  }

  if (!drewCustomSprite) {
    rotatePlacedConstructorContext(() => {
      fill(20);
      noStroke();
      text(getEntityShortLabel(entity.type), px + drawWidth / 2, py + drawHeight / 2);
    });
  }

  const rocketPulseOverlay = getRocketPulseOverlayForEntity(entity, nowSeconds);
  if (rocketPulseOverlay) {
    rotatePlacedConstructorContext(() => {
      noStroke();
      fill(
        rocketPulseOverlay.r,
        rocketPulseOverlay.g,
        rocketPulseOverlay.b,
        rocketPulseOverlay.a
      );
      rect(px + 2, py + 2, max(1, drawWidth - 4), max(1, drawHeight - 4), 8);
    });
  }
}

/**
 * Render all entities in depth order with layered tube passes and port overlays.
 * @param {*} entities - Collection of active entities in the world.
 * @param {*} tileSize - Tile size in pixels.
 * @param {*} map - Map wrapper containing tile data.
 * @returns {void} No return value.
 */
function drawEntities(entities, tileSize, map) {
  textAlign(CENTER, CENTER);
  textSize(10);

  const nowSeconds = millis() / 1000;
  const nowMs = millis();

  const tubeDescriptors = [];
  const renderQueue = [];
  const shuttleQueue = [];

  // Build render queues.
  // Shuttle is split into two layers:
  // south/lower part below tubes, north/top part above tubes.
  for (const entity of entities) {
    const sortY = getEntitySouthmostRenderTileY(entity);
    const sortX = entity?.tileX || 0;
    const sortId = entity?.id || 0;

    if (entity.type === ENTITY_TYPES.SHUTTLE) {
      shuttleQueue.push({
        sortY,
        sortX,
        sortId,
        entity
      });
      continue;
    }

    if (entity.type === ENTITY_TYPES.TUBE) {
      const descriptor = buildTubeRenderDescriptor(entity, tileSize, nowMs);
      tubeDescriptors.push(descriptor);
      renderQueue.push({
        kind: "tube",
        sortY,
        sortX,
        sortId,
        descriptor
      });
    } else {
      renderQueue.push({
        kind: "entity",
        sortY,
        sortX,
        sortId,
        entity
      });
    }
  }

  annotateTubeDescriptorNeighbors(tubeDescriptors);

  const sortRenderItems = (a, b) => {
    if (a.sortY !== b.sortY) return a.sortY - b.sortY;
    if (a.sortX !== b.sortX) return a.sortX - b.sortX;
    return a.sortId - b.sortId;
  };

  shuttleQueue.sort(sortRenderItems);
  renderQueue.sort(sortRenderItems);

  for (const entity of entities) {
    drawEntityPorts(entity, tileSize);
  }

  // 1. Draw lower/south shuttle below tubes.
  for (const item of shuttleQueue) {
    drawShuttleEntityLayer(item.entity, tileSize, nowSeconds, "south");
  }

  // 2. Draw tubes and normal buildings.
  for (const item of renderQueue) {
    if (item.kind === "tube") {
      drawTubeDescriptorLayer(item.descriptor, "body");
    } else {
      drawNonTubeEntity(item.entity, tileSize, nowSeconds);
    }
  }

  // 3. Draw upper/north shuttle above tubes.
  for (const item of shuttleQueue) {
    drawShuttleEntityLayer(item.entity, tileSize, nowSeconds, "north");
  }
}

function drawPlacedShuttleSpriteLayer(
  px,
  py,
  drawWidth,
  drawHeight,
  tileSize,
  shuttleState,
  nowSeconds,
  layerName
) {
  if (!shuttleSpriteSheetImg || shuttleSpriteSheetImg.width <= 0) {
    return false;
  }

  const frameCount = 10;
  const frameW = floor(shuttleSpriteSheetImg.width / frameCount);
  const frameH = shuttleSpriteSheetImg.height;

  const animationFps = 10;
  const frameIndex = floor(nowSeconds * animationFps) % frameCount;

  const targetHeight = round(max(drawHeight + 12, tileSize * 3.0));
  const targetWidth = round(targetHeight * (frameW / frameH));

  const visualAlignmentOffset = 3.5;
  const spriteX = round(px + (drawWidth - targetWidth) / 2 + visualAlignmentOffset);
  const spriteY = round(py + drawHeight - targetHeight);

  // Bigger top overlay:
  // This makes the shuttle body redraw over tubes above/behind it.
  // Increase to 0.78 if the tube still bleeds through.
  const northLayerRatio = 0.65;

  // Small overlap prevents a visible horizontal seam where the two slices meet.
  const layerOverlapSourcePx = 2;

  const splitSourceY = round(frameH * northLayerRatio);

  let sourceY;
  let sourceHeight;

  if (layerName === "north") {
    sourceY = 0;
    sourceHeight = min(frameH, splitSourceY + layerOverlapSourcePx);
  } else if (layerName === "south") {
    sourceY = max(0, splitSourceY - layerOverlapSourcePx);
    sourceHeight = frameH - sourceY;
  } else {
    return false;
  }

  const scaleY = targetHeight / frameH;
  const destY = round(spriteY + sourceY * scaleY);
  const destHeight = round(sourceHeight * scaleY);

  imageMode(CORNER);
  noTint();

  const canToggleSmoothing =
    typeof drawingContext !== "undefined" &&
    drawingContext &&
    "imageSmoothingEnabled" in drawingContext;

  const previousImageSmoothing = canToggleSmoothing
    ? drawingContext.imageSmoothingEnabled
    : undefined;

  if (canToggleSmoothing) {
    drawingContext.imageSmoothingEnabled = false;
  }

  // Keep left edge intact. Trim only the right edge for sprite-sheet bleed.
  const sourceInsetLeft = 0;
  const sourceInsetRight = 1;

  const sourceX = frameIndex * frameW + sourceInsetLeft;
  const sourceWidth = frameW - sourceInsetLeft - sourceInsetRight;

  image(
    shuttleSpriteSheetImg,
    spriteX,
    destY,
    targetWidth,
    destHeight,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight
  );

  if (canToggleSmoothing) {
    drawingContext.imageSmoothingEnabled = previousImageSmoothing;
  }

  return true;
}

function drawShuttleEntityLayer(entity, tileSize, nowSeconds, layerName) {
  const bounds = getEntityDrawBounds(entity, tileSize);

  return drawPlacedShuttleSpriteLayer(
    bounds.px,
    bounds.py,
    bounds.drawWidth,
    bounds.drawHeight,
    tileSize,
    entity.state,
    nowSeconds,
    layerName
  );
}
/**
 * Draw port indicators for an entity.
 * Output ports are shown as green circles, input ports as orange circles.
 * These appear on the adjacent tile where a tube should connect.
 */
function drawDirectionalArrow(cx, cy, dirX, dirY, rgb, arrowLen) {
  const length = arrowLen || 14;
  const headLen = 6;
  const headWidth = 6;
  const half = length / 2;
  const startX = cx - dirX * half;
  const startY = cy - dirY * half;
  const endX = cx + dirX * half;
  const endY = cy + dirY * half;

  stroke(rgb[0], rgb[1], rgb[2], 200);
  strokeWeight(2);
  line(startX, startY, endX, endY);

  const leftX = -dirY;
  const leftY = dirX;
  const baseX = endX - dirX * headLen;
  const baseY = endY - dirY * headLen;

  noStroke();
  fill(rgb[0], rgb[1], rgb[2], 220);
  triangle(
    endX,
    endY,
    baseX + leftX * headWidth * 0.5,
    baseY + leftY * headWidth * 0.5,
    baseX - leftX * headWidth * 0.5,
    baseY - leftY * headWidth * 0.5
  );
}

/**
 * Collapse direction to cardinal.
 * @param {*} dirX - Input value used by this operation.
 * @param {*} dirY - Input value used by this operation.
 * @param {*} preferAxis - Input value used by this operation.
 * @returns {*} Computed value for the requested operation.
 */
function collapseDirectionToCardinal(dirX, dirY, preferAxis = "x") {
  const absX = Math.abs(dirX);
  const absY = Math.abs(dirY);

  if (absX === 0 && absY === 0) {
    return { x: 1, y: 0 };
  }

  if (absX > absY) {
    return { x: Math.sign(dirX) || 1, y: 0 };
  }
  if (absY > absX) {
    return { x: 0, y: Math.sign(dirY) || 1 };
  }

  if (preferAxis === "y") {
    return { x: 0, y: Math.sign(dirY) || 1 };
  }
  return { x: Math.sign(dirX) || 1, y: 0 };
}

/**
 * Get preferred arrow axis for facing.
 * @param {*} facing - Cardinal facing direction.
 * @returns {*} Computed value for the requested operation.
 */
function getPreferredArrowAxisForFacing(facing) {
  const dir = facing || "E";
  return dir === "N" || dir === "S" ? "y" : "x";
}

/**
 * Determine whether port tile blocked by building.
 * @param {*} tileX - Tile X coordinate.
 * @param {*} tileY - Tile Y coordinate.
 * @param {*} ignoreEntityId - Input value used by this operation.
 * @returns {boolean} Whether the check or operation succeeds.
 */
function isPortTileBlockedByBuilding(tileX, tileY, ignoreEntityId = null) {
  if (!drawGame.state) return false;
  const map = drawGame.state.map;
  const row = map.tiles[tileY];
  const tile = row ? row[tileX] : null;
  if (!tile) return false;
  if (tile.entityId == null) return false;
  return tile.entityId !== ignoreEntityId;
}

/**
 * Determine whether expose constructor output port.
 * @param {*} entity - Target entity instance.
 * @param {*} port - Input value used by this operation.
 * @returns {boolean} Whether the check or operation succeeds.
 */
function shouldExposeConstructorOutputPort(entity, port = null) {
  if (!entity || entity.type !== ENTITY_TYPES.CONSTRUCTOR) {
    return false;
  }

  const outputType = entity.state?.outputType || null;
  const isLateStageOutput =
    outputType === RESOURCE_TYPES.ELECTRONICS ||
    outputType === RESOURCE_TYPES.SHIP_ALLOY;
  if (!isLateStageOutput) {
    return false;
  }

  if (port && port.kind !== "output") {
    return false;
  }
  return true;
}

/**
 * Draw constructor output item badge.
 * @param {*} portPx - Input value used by this operation.
 * @param {*} portPy - Input value used by this operation.
 * @param {*} tileSize - Tile size in pixels.
 * @param {*} outputType - Output resource type identifier.
 * @returns {void} No return value.
 */
function drawConstructorOutputItemBadge(portPx, portPy, tileSize, outputType) {
  if (!outputType) {
    return;
  }

  const badgeSize = max(14, tileSize * 0.46);
  const icon = getResourceIconForType(outputType);

  noStroke();
  fill(252, 252, 255, 238);
  circle(portPx, portPy, badgeSize);

  if (icon) {
    const iconSize = badgeSize * 0.72;
    imageMode(CENTER);
    image(icon, portPx, portPy, iconSize, iconSize);
    imageMode(CORNER);
    return;
  }

  const fallback =
    outputType === RESOURCE_TYPES.SHIP_ALLOY
      ? "SA"
      : outputType === RESOURCE_TYPES.ELECTRONICS
        ? "E"
        : "?";
  const fontSize = fallback.length > 1 ? 7 : 9;
  fill(30, 30, 36);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(fontSize);
  text(fallback, portPx, portPy + 0.3);
  textStyle(NORMAL);
}

/**
 * Draw entity ports.
 * @param {*} entity - Target entity instance.
 * @param {*} tileSize - Tile size in pixels.
 * @returns {void} No return value.
 */
function drawEntityPorts(entity, tileSize) {
  const hideConnectedNonTube =
    entity.type !== ENTITY_TYPES.TUBE &&
    entity.state &&
    entity.state.isConnected;
  const ports = entity.type === ENTITY_TYPES.TUBE
    ? getTubePortTiles(entity)
    : getEntityConnectionPorts(entity);
  const centerX = entity.tileX * tileSize + tileSize / 2;
  const centerY = entity.tileY * tileSize + tileSize / 2;
  const arrowLen = tileSize * 0.45;
  const splitterForward = entity.type === ENTITY_TYPES.SPLITTER
    ? rotateOffsetFromEast({ x: 1, y: 0 }, entity.state?.facing || "E")
    : null;
  const mergerForward = entity.type === ENTITY_TYPES.MERGER
    ? rotateOffsetFromEast({ x: 1, y: 0 }, entity.state?.facing || "E")
    : null;

  for (const port of ports) {
    const forceExposeOutput = shouldExposeConstructorOutputPort(entity, port);
    if (hideConnectedNonTube && !forceExposeOutput) {
      continue;
    }
    if (
      !forceExposeOutput &&
      isPortTileBlockedByBuilding(port.worldX, port.worldY, entity.id)
    ) {
      continue;
    }
    const portPx = port.worldX * tileSize + tileSize / 2;
    const portPy = port.worldY * tileSize + tileSize / 2;
    const dx = portPx - centerX;
    const dy = portPy - centerY;
    const len = Math.hypot(dx, dy) || 1;
    let dirX = dx / len;
    let dirY = dy / len;

    if (port.kind === "input") {
      if (mergerForward) {
        dirX = mergerForward.x;
        dirY = mergerForward.y;
      } else {
        dirX = -dirX;
        dirY = -dirY;
      }
      drawDirectionalArrow(portPx, portPy, dirX, dirY, [255, 210, 0], arrowLen);
    } else if (port.kind === "output") {
      if (splitterForward) {
        dirX = splitterForward.x;
        dirY = splitterForward.y;
      }
      const preferAxis = getPreferredArrowAxisForFacing(entity.state?.facing || "E");
      const collapsed = collapseDirectionToCardinal(dirX, dirY, preferAxis);
      dirX = collapsed.x;
      dirY = collapsed.y;
      drawDirectionalArrow(portPx, portPy, dirX, dirY, [230, 60, 60], arrowLen);
      if (forceExposeOutput) {
        drawConstructorOutputItemBadge(
          portPx,
          portPy,
          tileSize,
          entity.state?.outputType || null
        );
      }
    } else {
      drawDirectionalArrow(portPx, portPy, dirX, dirY, [80, 180, 200], arrowLen);
      drawDirectionalArrow(portPx, portPy, -dirX, -dirY, [80, 180, 200], arrowLen);
    }
  }
}

/**
 * Get entity short label.
 * @param {*} type - Input value used by this operation.
 * @returns {*} Computed value for the requested operation.
 */
function getEntityShortLabel(type) {
  switch (type) {
    case ENTITY_TYPES.MINER: return "M";
    case ENTITY_TYPES.SMELTER: return "S";
    case ENTITY_TYPES.CONSTRUCTOR: return "C";
    case ENTITY_TYPES.TUBE: return "T";
    case ENTITY_TYPES.SHUTTLE: return "SH";
    case ENTITY_TYPES.ROCKET_SITE: return "R";
    case ENTITY_TYPES.SPLITTER: return "SP";
    case ENTITY_TYPES.MERGER: return "MG";
    case ENTITY_TYPES.EXTRACTOR: return "EX";
    default: return "?";
  }
}

/**
 * Draw mini map.
 * @param {*} map - Map wrapper containing tile data.
 * @param {*} player - Player runtime state.
 * @param {*} config - Runtime configuration values for map/camera/UI.
 * @param {*} feedback - Transient UI feedback state.
 * @param {*} entities - Collection of active entities in the world.
 * @returns {void} No return value.
 */
function drawMiniMap(map, player, config, feedback, entities) {
  const { tileSize, mapCols, mapRows, mapOriginX, mapOriginY } = config;

  const miniMaxSize = 165; 
  const miniTile = max(1, floor(miniMaxSize / mapCols));
  const miniWidth = mapCols * miniTile;
  const miniHeight = mapRows * miniTile;
  const miniX = width - miniWidth - 10;
  const miniY = 10;

  noStroke();
  fill(245);
  rect(miniX - 4, miniY - 4, miniWidth + 8, miniHeight + 8, 6);

  const minimapLayer = getOrBuildMinimapLayer(
    drawGame.state,
    mapCols,
    mapRows,
    miniTile
  );
  image(minimapLayer, miniX, miniY);

  // Overlay dynamic placed items / buildings using the more accurate color function
  noStroke();
  for (let y = 0; y < mapRows; y++) {
    for (let x = 0; x < mapCols; x++) {
      const tile = map.tiles[y][x];
      // Check if there is ANY entity or building here
      if (tile && (tile.building || tile.entityId != null)) {
        const c = getMiniMapTileColor(tile);
        fill(c[0], c[1], c[2]);
        rect(miniX + x * miniTile, miniY + y * miniTile, miniTile, miniTile);
      }
    }
  }

  // Keep rocket readable on minimap
  if (entities && entities.length) {
    for (const entity of entities) {
      if (entity.type !== ENTITY_TYPES.ROCKET_SITE) continue;
      fill(180, 180, 255, 180);
      const footprint = getRocketFootprintTiles(entity.tileX, entity.tileY);
      for (const fp of footprint) {
        rect(
          miniX + fp.x * miniTile,
          miniY + fp.y * miniTile,
          miniTile,
          miniTile
        );
      }
    }
  }

  // NEW: Draw a Camera Viewport Box so you know exactly where you are looking
  const mapWidthTotal = mapCols * tileSize;
  const mapHeightTotal = mapRows * tileSize;
  const cameraX = constrain(player.x - width / 2, mapOriginX, mapOriginX + mapWidthTotal - width);
  const cameraY = constrain(player.y - height / 2, mapOriginY, mapOriginY + mapHeightTotal - height);

  const viewX = miniX + ((cameraX - mapOriginX) / mapWidthTotal) * miniWidth;
  const viewY = miniY + ((cameraY - mapOriginY) / mapHeightTotal) * miniHeight;
  const viewW = (width / mapWidthTotal) * miniWidth;
  const viewH = (height / mapHeightTotal) * miniHeight;

  noFill();
  stroke(255, 255, 255, 180);
  strokeWeight(1.5);
  rect(viewX, viewY, viewW, viewH);

  // Draw Player Dot
  noStroke();
  const miniPlayerX = miniX + ((player.x - mapOriginX) / tileSize) * miniTile;
  const miniPlayerY = miniY + ((player.y - mapOriginY) / tileSize) * miniTile;

  fill(255, 0, 0);
  rect(miniPlayerX - 2, miniPlayerY - 2, 4, 4);

  drawModificationRangeIndicator(config, feedback);
}

/**
 * Draw the optimization HUD with a compact score and hover-expanded breakdown.
 * @param {*} runtimeState - Active drawGame.state object.
 * @returns {void} No return value.
 */
function getOptimizationHudPanelPlacement() {
  const panelW = OPTIMIZATION_PANEL_WIDTH;
  const collapsedH = OPTIMIZATION_PANEL_COLLAPSED_H;
  const expandedH = OPTIMIZATION_PANEL_EXPANDED_H;

  // Anchor to the right of top-left controls instead of under the minimap.
  let anchorX = 8;
  let anchorY = 8;
  const controls = [];
  if (backButtonGame) {
    controls.push(backButtonGame);
  }
  if (typeof testEndGameButton !== "undefined" && testEndGameButton) {
    controls.push(testEndGameButton);
  }
  if (controls.length > 0) {
    let rightMost = 8;
    let topMost = controls[0].y;
    for (const control of controls) {
      rightMost = Math.max(rightMost, control.x + control.w);
      topMost = Math.min(topMost, control.y);
    }
    anchorX = rightMost + 10 - 150;
    anchorY = topMost;
  }

  const panelX = constrain(anchorX, 8, width - panelW - 8);
  const panelY = constrain(anchorY, 8, height - expandedH - 8);

  return { panelW, collapsedH, expandedH, panelX, panelY };
}

/**
 * Draw the optimization HUD with a compact score and hover-expanded breakdown.
 * @param {*} runtimeState - Active drawGame.state object.
 * @returns {void} No return value.
 */
function drawOptimizationHud(runtimeState) {
  if (!runtimeState || !runtimeState.config) {
    return;
  }
  const optimization = runtimeState.optimization;
  if (!optimization) {
    return;
  }

  const { panelW, collapsedH, expandedH, panelX, panelY } =
    getOptimizationHudPanelPlacement();
  const inCollapsedBounds =
    mouseX >= panelX &&
    mouseX <= panelX + panelW &&
    mouseY >= panelY &&
    mouseY <= panelY + collapsedH;
  const inExpandedBounds =
    mouseX >= panelX &&
    mouseX <= panelX + panelW &&
    mouseY >= panelY &&
    mouseY <= panelY + expandedH;
  if (inCollapsedBounds) {
    optimization.isPanelExpanded = true;
  } else if (!inExpandedBounds) {
    optimization.isPanelExpanded = false;
  }
  const expanded = !!optimization.isPanelExpanded;

  const score = Number(optimization.displayScore) || 0;
  const grade = optimization.grade || getOptimizationGradeLabel(score);
  const scoreColor = getOptimizationScoreColor(score);
  const boxH = expanded ? expandedH : collapsedH;

  const formatRate = (value) => {
    const n = Number(value);
    if (!Number.isFinite(n)) return "0";
    if (Math.abs(n - Math.round(n)) < 0.01) return String(Math.round(n));
    return n.toFixed(2);
  };

  push();
  rectMode(CORNER);
  textAlign(LEFT, TOP);

  fill(16, 20, 28, 225);
  stroke(scoreColor[0], scoreColor[1], scoreColor[2], 230);
  strokeWeight(2);
  rect(panelX, panelY, panelW, boxH, 8);

  noStroke();
  fill(232, 238, 248);
  textStyle(BOLD);
  textSize(12);
  text("Factory Efficiency", panelX + 10, panelY + 8);

  fill(scoreColor[0], scoreColor[1], scoreColor[2]);
  textAlign(RIGHT, TOP);
  text(`${score.toFixed(0)} (${grade})`, panelX + panelW - 10, panelY + 8);

  textAlign(LEFT, TOP);
  textStyle(NORMAL);
  textSize(10);
  fill(188, 198, 214);
  const throughputActualRate = Number(optimization.latest?.throughputActualRate) || 0;
  const throughputPotentialRate = Number(optimization.latest?.throughputPotentialRate) || 0;
  text(
    `Factory Throughput: ${formatRate(throughputActualRate)}/${formatRate(throughputPotentialRate)} per sec`,
    panelX + 10,
    panelY + 24
  );

  // no room for this message in the hud
  // if (optimization.isInGraceWindow) {
  //   fill(248, 214, 124);
  //   text("Editing grace active", panelX + panelW - 105, panelY + 24);
  // }

  if (!expanded) {
    fill(154, 166, 186);
    textAlign(RIGHT, TOP);
    text("Hover for breakdown", panelX + panelW - 10, panelY + 36);
    pop();
    return;
  }

  const breakdown = optimization.breakdown || {};
  const bars = [
    {
      key: "throughput",
      label: "Throughput (stored/harvested)",
      value: Number(breakdown.throughput) || 0
    },
    {
      key: "utilization",
      label: "Utilization (active/total)",
      value: Number(breakdown.utilization) || 0
    },
    {
      key: "flow",
      label: "Flow Health (flow - penalties)",
      value: Number(breakdown.flow) || 0
    },
    {
      key: "recipe",
      label: "Recipe Validity (valid - invalid)",
      value: Number(breakdown.recipe) || 0
    }
  ];

  let barY = panelY + 44;
  const barX = panelX + 10;
  const barW = panelW - 20;
  const barH = 10;
  for (const entry of bars) {
    const value = clampZeroToOne(entry.value);
    fill(154, 166, 186);
    textSize(9);
    textAlign(LEFT, TOP);
    text(entry.label, barX, barY - 1);
    textAlign(RIGHT, TOP);
    text(`${Math.round(value * 100)}%`, barX + barW, barY - 1);

    fill(45, 54, 70, 235);
    noStroke();
    rect(barX, barY + 10, barW, barH, 3);
    fill(scoreColor[0], scoreColor[1], scoreColor[2], 220);
    rect(barX, barY + 10, barW * value, barH, 3);
    barY += 24;
  }

  fill(220, 228, 240);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(10);
  text("Top Bottlenecks", barX, barY + 2);
  textStyle(NORMAL);
  fill(174, 186, 204);
  const bottlenecks = Array.isArray(optimization.bottlenecks)
    ? optimization.bottlenecks
    : [];
  if (bottlenecks.length === 0) {
    text("- No major bottlenecks detected.", barX, barY + 16);
  } else {
    let lineY = barY + 16;
    for (const entry of bottlenecks.slice(0, OPTIMIZATION_MAX_WEAKPOINT_LINES)) {
      const textLine = String(entry?.text || "").trim();
      if (!textLine) continue;
      text(`- ${textLine}`, barX, lineY);
      lineY += 12;
    }
  }

  pop();
}

/**
 * Build and cache the static world terrain layer used by the camera render pass.
 * @param {*} state - Input value used by this operation.
 * @returns {*} Computed value for the requested operation.
 */
function getOrBuildWorldLayer(state) {
  const cache = state.renderCache;
  if (cache.worldLayer) {
    return cache.worldLayer;
  }

  const { config, map } = state;
  const { tileSize, mapCols, mapRows } = config;
  const layer = createGraphics(mapCols * tileSize, mapRows * tileSize);

  // Important for cached/offscreen rendering.
  layer.noSmooth();

  if (layer.drawingContext) {
    layer.drawingContext.imageSmoothingEnabled = false;
  }

  layer.noStroke();
  const depositDrawCalls = [];

  // Pass 1: draw base terrain only.
  for (let y = 0; y < mapRows; y++) {
    for (let x = 0; x < mapCols; x++) {
      const tile = map.tiles[y][x];
      const px = x * tileSize;
      const py = y * tileSize;

      const bgIndex = Number.isInteger(tile.bgIndex) ? tile.bgIndex : 0;
      const baseTileImg = bgTiles[bgIndex] || bgTiles[0] || null;
      if (baseTileImg && baseTileImg.width > 0) {
        layer.image(baseTileImg, px, py, tileSize, tileSize);
      } else {
        const fallbackColor = getTileBaseColor(tile);
        layer.fill(fallbackColor[0], fallbackColor[1], fallbackColor[2]);
        layer.rect(px, py, tileSize, tileSize);
      }
    }
  }

  // Pass 2: draw resource node overlays.
  for (let y = 0; y < mapRows; y++) {
    for (let x = 0; x < mapCols; x++) {
      const tile = map.tiles[y][x];
      const px = x * tileSize;
      const py = y * tileSize;
      let depositImg = null; // Reset depositImg for each tile
      if (tile.type === "iron") depositImg = ironDepositImg;
      else if (tile.type === "copper") depositImg = copperDepositImg;
      else if (tile.type === "helium3") depositImg = heliumDepositImg;

      if (depositImg) {
        const originX = Number.isFinite(tile.resourceNodeOriginX)
          ? tile.resourceNodeOriginX
          : x;
        const originY = Number.isFinite(tile.resourceNodeOriginY)
          ? tile.resourceNodeOriginY
          : y;
        const isNodeRoot = originX === x && originY === y;
        if (isNodeRoot) {
          // Draw one icon across the full 2x2 resource node footprint.
          depositDrawCalls.push({
            img: depositImg,
            x: px,
            y: py,
            w: tileSize * 2,
            h: tileSize * 2
          });
        } else if (!Number.isFinite(tile.resourceNodeOriginX) || !Number.isFinite(tile.resourceNodeOriginY)) {
          // Backward-compat fallback for older single-tile nodes.
          depositDrawCalls.push({
            img: depositImg,
            x: px,
            y: py,
            w: tileSize,
            h: tileSize
          });
        }
      }
    }
  }

  for (const drawCall of depositDrawCalls) {
    layer.image(drawCall.img, drawCall.x, drawCall.y, drawCall.w, drawCall.h);
  }

  cache.worldLayer = layer;
  return layer;
}

/**
 * Build and cache the static minimap terrain layer.
 * @param {*} state - Input value used by this operation.
 * @param {*} mapCols - Total number of map columns.
 * @param {*} mapRows - Total number of map rows.
 * @param {*} miniTile - Input value used by this operation.
 * @returns {*} Computed value for the requested operation.
 */
function getOrBuildMinimapLayer(state, mapCols, mapRows, miniTile) {
  const cache = state.renderCache;
  const unchanged =
    cache.minimapLayer &&
    cache.minimapTileSize === miniTile &&
    cache.minimapCols === mapCols &&
    cache.minimapRows === mapRows;

  if (unchanged) {
    return cache.minimapLayer;
  }

  const layer = createGraphics(mapCols * miniTile, mapRows * miniTile);
  const map = state.map;
  layer.stroke(210);
  layer.strokeWeight(1);

  for (let y = 0; y < mapRows; y++) {
    for (let x = 0; x < mapCols; x++) {
      const tile = map.tiles[y][x];
      const tileColor = getMinimapBaseTerrainColor(tile);
      layer.fill(tileColor[0], tileColor[1], tileColor[2]);
      layer.rect(x * miniTile, y * miniTile, miniTile, miniTile);
    }
  }

  cache.minimapLayer = layer;
  cache.minimapTileSize = miniTile;
  cache.minimapCols = mapCols;
  cache.minimapRows = mapRows;
  return layer;
}

/**
 * Draw settings.
 * @returns {void} No return value.
 */
function drawSettings() {
  if (settingsPage) {
    image(settingsPage, 0, 0, width, height);
    image(settingsBG, width / 4, 190, width / 2, height / 2);
  }
  push();
  fill("#445072");
  stroke(0);
  strokeWeight(2);
  pop();
  if (backButtonSettings) backButtonSettings.draw();
  if (creditsButtonSettings) creditsButtonSettings.draw();
  if (typeof drawSettingsUI === "function") drawSettingsUI();

  if (helpButtonSettings) helpButtonSettings.draw();
  if (showHelpMenu) drawHelpMenu();
}

/**
 * Side Bar Text.
 * @param {*} resource - Resource value or amount.
 * @returns {void} No return value.
 */
function sideBarText(resource) {
  let digits = Math.floor(resource).toString().length;
    // Make the UI numbers pop and readable over ANY background icon
  fill(255);
  stroke(30, 30, 35);
  strokeWeight(2.5);
  textStyle(BOLD);
  if (digits >= 5) {
    let newSize = 12 - ((digits - 4) * 1.35);
    textSize(Math.max(4, newSize)); 
  } else {
    textSize(12);
  }
}

/**
 * Get entity display name.
 * @param {*} entityType - Entity type identifier.
 * @returns {*} Computed value for the requested operation.
 */
function getEntityDisplayName(entityType) {
  const idx = HOTBAR_ENTITY_TYPES.indexOf(entityType);
  if (idx >= 0) {
    return HOTBAR_BUILDING_NAMES[idx];
  }
  return entityType ? String(entityType) : "Building";
}

/**
 * Get sidebar resource build uses.
 * @param {*} resourceType - Resource type identifier.
 * @returns {*} Computed value for the requested operation.
 */
function getSidebarResourceBuildUses(resourceType) {
  if (!resourceType) {
    return [];
  }

  if (typeof RESOURCE_TOOLTIP_RECIPES !== "undefined") {
    const customRoutes = RESOURCE_TOOLTIP_RECIPES[resourceType];
    if (Array.isArray(customRoutes) && customRoutes.length > 0) {
      const routes = [];
      for (const route of customRoutes) {
        const ingredientsRaw = Array.isArray(route?.ingredients)
          ? route.ingredients
          : [];
        const ingredients = ingredientsRaw
          .map((ingredient) => ({
            resourceType: ingredient?.type || null,
            amount: Number(ingredient?.count) || 0
          }))
          .filter((ingredient) => ingredient.resourceType && ingredient.amount > 0);
        if (ingredients.length === 0) {
          continue;
        }
        routes.push({
          buildingName: String(route?.building || "constructor").toLowerCase(),
          ingredients
        });
      }
      if (routes.length > 0) {
        return routes;
      }
    }
  }

  if (typeof ENTITY_BUILD_COSTS === "undefined") {
    return [];
  }

  const uses = [];
  for (const [entityType, cost] of Object.entries(ENTITY_BUILD_COSTS)) {
    const required = Number(cost?.[resourceType]) || 0;
    if (required > 0) {
      const ingredients = Object.entries(cost)
        .map(([type, amount]) => ({
          resourceType: type,
          amount: Number(amount) || 0
        }))
        .filter((ingredient) => ingredient.amount > 0);
      uses.push({
        buildingName: getEntityDisplayName(entityType).toLowerCase(),
        ingredients
      });
    }
  }
  return uses;
}

/**
 * Get hovered sidebar resource item.
 * @returns {object|null} Computed object result, or null when unavailable.
 */
function getHoveredSidebarResourceItem() {
  if (
    currentState !== "GAME" ||
    !drawGame.state ||
    !isSidebarOpen
  ) {
    return null;
  }

  const mapY = drawGame.state.config.topMargin;
  const rX = sidebarX + 17.5;
  const contentStartY = mapY + 5;
  const visibleHeight = 490;
  const itemSpacing = Math.floor(visibleHeight / SIDEBAR_RESOURCE_TYPES.length);
  const rSize = Math.min(35, itemSpacing - 5);

  for (let i = 0; i < SIDEBAR_RESOURCE_TYPES.length; i++) {
    let rY = contentStartY + i * itemSpacing;

    if (
      mouseX >= rX &&
      mouseX <= rX + rSize &&
      mouseY >= rY &&
      mouseY <= rY + rSize
    ) {
      return {
        resourceType: SIDEBAR_RESOURCE_TYPES[i],
        icon: getResourceIconForType(SIDEBAR_RESOURCE_TYPES[i])
      };
    }
  }

  return null;
}

/**
 * Determine whether mouse over sidebar resource icon.
 * @returns {boolean} Whether the check or operation succeeds.
 */
function isMouseOverSidebarResourceIcon() {
  return !!getHoveredSidebarResourceItem();
}

// FIXED: Added a custom override just for Helium-3 to display text instead of a recipe!
/**
 * Draw sidebar resource hover tooltip.
 * @param {*} hoveredItem - Input value used by this operation.
 * @returns {boolean} Whether the check or operation succeeds.
 */
function drawSidebarResourceHoverTooltip(hoveredItem) {
  if (!hoveredItem || !hoveredItem.resourceType) {
    return false;
  }

  //for helium3, instead of showing recipes (since there are none)
  if (hoveredItem.resourceType === RESOURCE_TYPES.HELIUM3) {
    const msg = "Used in rocket fuel.";
    push();
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    
    const pad = 8;
    const textH = textAscent() + textDescent();
    const boxW = textWidth(msg) + pad * 2;
    const boxH = textH + pad * 2;

    let bx = mouseX + 14;
    let by = mouseY + 14;
    if (bx + boxW > width - 6) {
      bx = mouseX - boxW - 14;
    }
    if (by + boxH > height - 6) {
      by = mouseY - boxH - 14;
    }
    bx = constrain(bx, 6, width - boxW - 6);
    by = constrain(by, 6, height - boxH - 6);

    fill(252, 252, 255, 248);
    stroke(55, 55, 68);
    strokeWeight(1);
    rect(bx, by, boxW, boxH, 5);

    noStroke();
    fill(28, 28, 36);
    text(msg, bx + pad, by + pad);
    pop();
    
    return true;
  }

  const uses = getSidebarResourceBuildUses(hoveredItem.resourceType);
  if (uses.length === 0) {
    return false;
  }

  const pad = 8;
  const lineGap = 4;
  const ingredientGap = 6;
  const iconSize = 22;

  push();
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(NORMAL);
  const textH = textAscent() + textDescent();
  const lineH = max(textH, iconSize);

  let maxLineW = 0;
  for (const use of uses) {
    let lineW = 0;
    for (let i = 0; i < use.ingredients.length; i++) {
      const ingredient = use.ingredients[i];
      if (i > 0) {
        lineW += textWidth(", ");
      }
      const amountText = `${ingredient.amount}x`;
      lineW += textWidth(amountText);
      const icon = getResourceIconForType(ingredient.resourceType);
      if (icon) {
        lineW += 4 + iconSize;
      } else {
        lineW += 4 + textWidth(getResourceTypeLabel(ingredient.resourceType).toLowerCase());
      }
      if (i < use.ingredients.length - 1) {
        lineW += ingredientGap;
      }
    }
    lineW += textWidth(" in ");
    lineW += textWidth(use.buildingName || "constructor");
    maxLineW = max(maxLineW, lineW);
  }

  const boxW = maxLineW + pad * 2;
  const boxH = pad * 2 + uses.length * lineH + (uses.length - 1) * lineGap;

  let bx = mouseX + 14;
  let by = mouseY + 14;
  if (bx + boxW > width - 6) {
    bx = mouseX - boxW - 14;
  }
  if (by + boxH > height - 6) {
    by = mouseY - boxH - 14;
  }
  bx = constrain(bx, 6, width - boxW - 6);
  by = constrain(by, 6, height - boxH - 6);

  fill(252, 252, 255, 248);
  stroke(55, 55, 68);
  strokeWeight(1);
  rect(bx, by, boxW, boxH, 5);

  let lineY = by + pad;
  for (const use of uses) {
    textStyle(NORMAL);
    fill(28, 28, 36);
    let x = bx + pad;
    for (let i = 0; i < use.ingredients.length; i++) {
      const ingredient = use.ingredients[i];
      if (i > 0) {
        text(", ", x, lineY + (lineH - textH) / 2);
        x += textWidth(", ");
      }

      const amountText = `${ingredient.amount}x`;
      text(amountText, x, lineY + (lineH - textH) / 2);
      x += textWidth(amountText);

      const icon = getResourceIconForType(ingredient.resourceType);
      if (icon) {
        imageMode(CORNER);
        image(icon, x + 4, lineY + (lineH - iconSize) / 2, iconSize, iconSize);
        x += 4 + iconSize;
      } else {
        const label = getResourceTypeLabel(ingredient.resourceType).toLowerCase();
        text(" " + label, x + 4, lineY + (lineH - textH) / 2);
        x += 4 + textWidth(label) + textWidth(" ");
      }

      if (i < use.ingredients.length - 1) {
        x += ingredientGap;
      }
    }

    text(" in ", x, lineY + (lineH - textH) / 2);
    x += textWidth(" in ");
    text(use.buildingName || "constructor", x, lineY + (lineH - textH) / 2);
    lineY += lineH + lineGap;
  }

  pop();
  return true;
}

/**
 * Draw side bar.
 * @returns {void} No return value.
 */
function drawSideBar() {
  if (!drawGame.state) return;

  const { tileSize, mapCols, mapRows, margin, topMargin } = drawGame.state.config;
  let mapX = margin;
  let mapY = topMargin;
  let mapW = mapCols * tileSize;
  let mapH = mapRows * tileSize;

  let target = isSidebarOpen ? mapX : mapX - sidebarWidth - 7;
  sidebarX = lerp(sidebarX, target, 0.15);

  image(sideBarFrameImg, sidebarX, mapY - 15, sidebarWidth + 7, 510);

  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(mapX, mapY, mapW, mapH);
  drawingContext.clip();

  // Restricted mode inventory
  const restrictedInventory = getRestrictedModeShuttleInventory();
  const restrictedMode = !!(drawGame.state && drawGame.state.isRestrictedMode);
  const getCount = (resourceType, fallback) => {
    if (!restrictedMode) return fallback;
    if (!restrictedInventory) return 0;
    const value = Number(restrictedInventory[resourceType]);
    return Number.isFinite(value) ? value : 0;
  };

  const sidebarItems = SIDEBAR_RESOURCE_TYPES.map((resourceType) => ({
    resourceType,
    img: getResourceIconForType(resourceType),
    count: getCount(resourceType, getGlobalResourceCount(resourceType))
  }));

  // Fit all items by calculating spacing from available height
  const contentStartY = mapY + 5;
  const visibleHeight = 490;
  const itemSpacing = Math.floor(visibleHeight / sidebarItems.length);
  const rSize = Math.min(35, itemSpacing - 5);

  fill(255, 200, 100);
  noStroke();
  
  for (let i = 0; i < sidebarItems.length; i++) {
    let item = sidebarItems[i];
    let rX = sidebarX + 17.5;
    let rY = contentStartY + i * itemSpacing;

    // Draw Icon
    if (item.img) {
      image(item.img, rX, rY, rSize, rSize);
    }

    // Draw Text
    textAlign(RIGHT, BOTTOM);
    let centerX = rX + (rSize / 2) + 17;
    let centerY = rY + (rSize / 2) + 17;

    sideBarText(item.count);
    text(item.count, centerX, centerY);

    // Reset styles
    noStroke();
    textStyle(NORMAL);
    fill(255, 200, 100);
  }

  drawingContext.restore();
  textAlign(CENTER, CENTER);

  // Draw the Interactive Tab
  let tabW = 25;
  let tabH = 60;
  // FIXED: Clamp the tab to mapX so it hits a "wall" and stays visible when the frame completely hides
  let tabX = Math.max(mapX, sidebarX + sidebarWidth); 
  let tabY = 425 / 2 - tabH / 2 + mapY;
  let isTabHovered = mouseX > tabX && mouseX < tabX + tabW &&
                     mouseY > tabY && mouseY < tabY + tabH;

  fill(50);
  noStroke();
  textSize(18);
  if (isSidebarOpen) {
    image(sideBarTabOpen, tabX + tabW / 2 - 13, tabY + tabH / 2 - 29, tabW, tabH);
  } else {
    image(sideBarTabClosed, tabX + tabW / 2 - 13, tabY + tabH / 2 - 30, tabW, tabH);
  }

  if (isTabHovered) {
    fill('rgba(200, 200, 200, 0.2)');
    rect(tabX, tabY, tabW, tabH, 0, 10, 10, 0);
    cursor('pointer');
  } else {
    if (!backButtonGame.isHovered()) {
      cursor('default');
    }
  }

  const hoveredSidebarItem = getHoveredSidebarResourceItem();
  drawSidebarResourceHoverTooltip(hoveredSidebarItem);
}

/**
 * Get selected hotbar item.
 * @returns {*} Computed value for the requested operation.
 */
function getSelectedHotbarItem() {
  if (selectedHotbarSlot < 0 || selectedHotbarSlot >= hotbarItems.length) {
    return null;
  }
  return hotbarItems[selectedHotbarSlot];
}

/**
 * Get hotbar layout.
 * @returns {*} Computed value for the requested operation.
 */
function getHotbarLayout() {
  const slotSize = 42;
  const gap = 8;
  const totalWidth = hotbarSlots * slotSize + (hotbarSlots - 1) * gap;
  const startX = width / 2 - totalWidth / 2;
  const y = height - 60;
  return { slotSize, gap, totalWidth, startX, y };
}

/**
 * Determine whether mouse over hotbar area.
 * @returns {void} No return value.
 */
function isMouseOverHotbarArea() {
  const { slotSize, totalWidth, startX, y } = getHotbarLayout();
  return (
    mouseY >= y - 4 &&
    mouseY <= y + slotSize + 8 &&
    mouseX >= startX - 8 &&
    mouseX <= startX + totalWidth + 8
  );
}

/**
 * Get hovered hotbar slot.
 * @returns {*} Computed value for the requested operation.
 */
function getHoveredHotbarSlot() {
  if (currentState !== "GAME") {
    return -1;
  }

  const { slotSize, gap, startX, y } = getHotbarLayout();
  for (let i = 0; i < hotbarSlots; i++) {
    const x = startX + i * (slotSize + gap);
    if (
      mouseX >= x &&
      mouseX <= x + slotSize &&
      mouseY >= y &&
      mouseY <= y + slotSize
    ) {
      return i;
    }
  }

  return -1;
}

/**
 * Get hotbar cost tooltip lines.
 * @param {*} entityType - Entity type identifier.
 * @returns {*} Computed value for the requested operation.
 */
function getHotbarCostTooltipLines(entityType) {
  const cost = getBuildCostForEntity(entityType);
  if (!cost) {
    return [];
  }

  return Object.entries(cost).map(([resourceType, amount]) => ({
    resourceType,
    amount,
    icon: getResourceIconForType(resourceType),
    label: getResourceTypeLabel(resourceType)
  }));
}

/**
 * Get hotbar tooltip description.
 * @param {*} entityType - Entity type identifier.
 * @returns {*} Computed value for the requested operation.
 */
function getHotbarTooltipDescription(entityType) {
  if (typeof ENTITY_HOTBAR_DESCRIPTIONS === "undefined" || !entityType) {
    return "";
  }
  const description = ENTITY_HOTBAR_DESCRIPTIONS[entityType];
  return typeof description === "string" ? description : "";
}

/**
 * Draw hotbar cost tooltip.
 * @returns {void} No return value.
 */
function drawHotbarCostTooltip() {
  if (currentState !== "GAME") {
    return;
  }
  if (!drawGame.state || !drawGame.state.isRestrictedMode) {
    return;
  }

  const hoveredSlot = getHoveredHotbarSlot();
  if (hoveredSlot < 0) {
    return;
  }

  const item = hotbarItems[hoveredSlot];
  if (!item || !item.entityType) {
    return;
  }

  const lines = getHotbarCostTooltipLines(item.entityType);
  if (lines.length === 0) {
    return;
  }
  const description = getHotbarTooltipDescription(item.entityType);
  const hasDescription = description.length > 0;

  const { slotSize, y } = getHotbarLayout();
  const title = item.name;

  push();
  textAlign(CENTER, TOP);

  textStyle(BOLD);
  textSize(12);
  const titleW = textWidth(title);
  const titleH = textAscent() + textDescent();

  textStyle(NORMAL);
  textSize(11);
  let iconSize = 24; // Keep current size for 3+ requirements
  if (lines.length === 2) {
    iconSize = 28; // Slightly bigger for 2 requirements
  } else if (lines.length === 1) {
    iconSize = 34; // Bigger for 1 requirement
  }
  const iconGap = 4;
  const textGap = 6;
  const requirementGap = 12;
  const requirementBlocks = [];
  let requirementsW = 0;
  for (const line of lines) {
    const amountText = `${line.amount}x`;
    const amountW = textWidth(amountText);
    const labelW = line.icon ? 0 : textWidth(line.label);
    const detailW = line.icon
      ? iconGap + iconSize
      : textGap + labelW;
    const blockW = amountW + detailW;
    requirementBlocks.push({
      ...line,
      amountText,
      amountW,
      blockW
    });
    requirementsW += blockW;
  }
  if (requirementBlocks.length > 1) {
    requirementsW += requirementGap * (requirementBlocks.length - 1);
  }
  const requirementTextH = textAscent() + textDescent();
  textSize(10);
  const descriptionW = hasDescription ? textWidth(description) : 0;
  const descriptionH = hasDescription ? (textAscent() + textDescent()) : 0;

  const pad = 8;
  const requirementsH = Math.max(iconSize, requirementTextH);
  const contentW = max(titleW, requirementsW, descriptionW);
  const boxW = contentW + pad * 2;
  const descriptionBlockH = hasDescription ? (4 + descriptionH) : 0;
  const boxH = pad * 2 + titleH + descriptionBlockH + 6 + requirementsH;
  let bx = width / 2 - boxW / 2;
  bx = constrain(bx, 6, width - boxW - 6);
  let by = y - boxH - 10;
  if (by < 6) {
    by = y + slotSize + 10;
  }

  fill(252, 252, 255, 248);
  stroke(55, 55, 68);
  strokeWeight(1);
  rect(bx, by, boxW, boxH, 5);

  noStroke();
  fill(28, 28, 36);
  textStyle(BOLD);
  textSize(12);
  text(title, bx + boxW / 2, by + pad);

  let cursorY = by + pad + titleH;
  if (hasDescription) {
    cursorY += 4;
    fill(55, 55, 68);
    textStyle(NORMAL);
    textSize(10);
    text(description, bx + boxW / 2, cursorY);
    cursorY += descriptionH;
  }

  cursorY += 6;
  textStyle(NORMAL);
  textSize(11);
  fill(28, 28, 36);
  let reqX = bx + (boxW - requirementsW) / 2;
  for (const block of requirementBlocks) {
    const amountY = cursorY + (requirementsH - requirementTextH) / 2;
    text(block.amountText, reqX + block.amountW / 2, amountY);
    if (block.icon) {
      imageMode(CORNER);
      image(
        block.icon,
        reqX + block.amountW + iconGap,
        cursorY + (requirementsH - iconSize) / 2,
        iconSize,
        iconSize
      );
    } else {
      textAlign(LEFT, TOP);
      text(
        block.label,
        reqX + block.amountW + textGap,
        amountY
      );
      textAlign(CENTER, TOP);
    }
    reqX += block.blockW + requirementGap;
  }

  pop();
}

/**
 * Draw hologram build cost tooltip.
 * @param {*} item - Input value used by this operation.
 * @returns {boolean} Whether the check or operation succeeds.
 */
function drawHologramBuildCostTooltip(item) {
  if (currentState !== "GAME") {
    return false;
  }
  if (!drawGame.state || !drawGame.state.isRestrictedMode) {
    return false;
  }
  if (!item || !item.entityType) {
    return false;
  }

  const lines = getHotbarCostTooltipLines(item.entityType);
  if (lines.length === 0) {
    return false;
  }

  const title = item.name;

  push();
  textAlign(LEFT, TOP);

  textStyle(BOLD);
  textSize(12);
  const titleW = textWidth(title);
  const titleH = textAscent() + textDescent();

  textStyle(NORMAL);
  textSize(11);
  const iconSize = 24;
  const iconGap = 4;
  const textGap = 6;
  let maxLineW = 0;
  for (const line of lines) {
    const amountText = `${line.amount}x`;
    const amountW = textWidth(amountText);
    const detailW = line.icon
      ? iconGap + iconSize
      : textGap + textWidth(line.label);
    maxLineW = max(maxLineW, amountW + detailW);
  }

  const pad = 8;
  const lineH = Math.max(15, iconSize + 2);
  const contentW = max(titleW, maxLineW);
  const boxW = contentW + pad * 2;
  const boxH = pad * 2 + titleH + 4 + lines.length * lineH;

  let bx = mouseX + 14;
  let by = mouseY + 14;
  if (bx + boxW > width - 6) {
    bx = mouseX - boxW - 14;
  }
  if (by + boxH > height - 6) {
    by = mouseY - boxH - 14;
  }
  bx = constrain(bx, 6, width - boxW - 6);
  by = constrain(by, 6, height - boxH - 6);

  fill(252, 252, 255, 248);
  stroke(55, 55, 68);
  strokeWeight(1);
  rect(bx, by, boxW, boxH, 5);

  noStroke();
  fill(28, 28, 36);
  textStyle(BOLD);
  textSize(12);
  text(title, bx + pad, by + pad);

  textStyle(NORMAL);
  textSize(11);
  let lineY = by + pad + titleH + 4;
  const lineTextOffsetY = 4;
  for (const line of lines) {
    const amountText = `${line.amount}x`;
    const amountX = bx + pad;
    const amountW = textWidth(amountText);
    text(amountText, amountX, lineY + lineTextOffsetY);
    if (line.icon) {
      imageMode(CORNER);
      image(
        line.icon,
        amountX + amountW + iconGap,
        lineY + (lineH - iconSize) / 2,
        iconSize,
        iconSize
      );
    } else {
      text(line.label, amountX + amountW + textGap, lineY + lineTextOffsetY);
    }
    lineY += lineH;
  }

  pop();
  return true;
}

/**
 * Facing To Angle.
 * @param {*} facing - Cardinal facing direction.
 * @returns {number} Computed numeric result.
 */
function facingToAngle(facing) {
  switch (facing) {
    case "E":
      return 0;
    case "S":
      return HALF_PI;
    case "W":
      return PI;
    case "N":
      return -HALF_PI;
    default:
      return 0;
  }
}

/**
 * Cycle placement facing.
 * @returns {void} No return value.
 */
function cyclePlacementFacing() {
  if (!drawGame.state) {
    return;
  }
  const order = ["E", "S", "W", "N"];
  const cur = drawGame.state.placementFacing || "E";
  const i = order.indexOf(cur);
  drawGame.state.placementFacing = order[(i + 1) % order.length];
}

/**
 * Hotbar Item Label.
 * @param {*} item - Input value used by this operation.
 * @returns {string} Computed text result.
 */
function hotbarItemLabel(item) {
  if (!item || !item.name) {
    return "??";
  }
  const t = item.name.trim();
  if (t.length === 0) {
    return "??";
  }
  if (t.length === 1) {
    return (t + t).toUpperCase();
  }
  return t.substring(0, 2).toUpperCase();
}

/**
 * Pick contrasting text color.
 * @param {*} rgb - Input value used by this operation.
 * @returns {*} Computed value for the requested operation.
 */
function pickContrastingTextColor(rgb) {
  const lum = 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2];
  return lum > 140 ? [24, 24, 32] : [255, 255, 255];
}

/**
 * Draw placed building letter.
 * @param {*} px - X pixel position.
 * @param {*} py - Y pixel position.
 * @param {*} tileSize - Tile size in pixels.
 * @param {*} building - Input value used by this operation.
 * @returns {void} No return value.
 */
function drawPlacedBuildingLetter(px, py, tileSize, building) {
  const label = building.label || building.letter || "";
  if (!label) {
    return;
  }
  const rgb = building.color;
  const tc = pickContrastingTextColor(rgb);
  const cx = px + tileSize / 2;
  const cy = py + tileSize / 2;
  push();
  translate(cx, cy);
  rotate(facingToAngle(building.facing));
  fill(tc[0], tc[1], tc[2]);
  noStroke();
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(label, 0, 0);
  pop();
  textStyle(NORMAL);
}

/**
 * Get placement preview ports.
 * @param {*} entityType - Entity type identifier.
 * @param {*} options - Optional configuration object.
 * @returns {*} Computed value for the requested operation.
 */
function getPlacementPreviewPorts(entityType, options = {}) {
  if (!entityType) {
    return [];
  }
  const facing = options.facing || "E";
  const rotateOffset = (offset) => rotateOffsetFromEast(offset, facing);

  if (entityType === ENTITY_TYPES.TUBE) {
    const shape = options.shape || TUBE_SHAPES.STRAIGHT;
    const def = TUBE_PORT_DEFS[shape] || TUBE_PORT_DEFS[TUBE_SHAPES.STRAIGHT];
    const isCorner = shape === TUBE_SHAPES.CORNER;
    const inputKind = isCorner ? "both" : "input";
    const outputKind = isCorner ? "both" : "output";
    return [
      { kind: inputKind, offset: rotateOffset(def.input) },
      { kind: outputKind, offset: rotateOffset(def.output) }
    ];
  }
  const defs = ENTITY_PORT_DEFS[entityType];
  if (!defs) {
    return [];
  }
  return defs.map((port) => ({
    kind: port.kind,
    offset: rotateOffset(port.offset)
  }));
}

/**
 * Draw directional port arrows for a placement preview.
 * @param {*} ports - Preview port descriptors containing kind and rotated offsets.
 * @param {*} tileSize - Tile size in pixels.
 * @param {*} originX - Center X pixel for the preview anchor.
 * @param {*} originY - Center Y pixel for the preview anchor.
 * @param {*} baseCol - Optional world tile column anchor.
 * @param {*} baseRow - Optional world tile row anchor.
 * @param {*} entityType - Entity type being previewed.
 * @param {*} facing - Cardinal facing direction used to orient arrows.
 * @param {*} blockedOffsetKeys - Optional set of blocked offset keys to skip.
 * @returns {void} No return value.
 */
function drawPlacementPorts(
  ports,
  tileSize,
  originX = 0,
  originY = 0,
  baseCol = null,
  baseRow = null,
  entityType = null,
  facing = "E",
  blockedOffsetKeys = null
) {
  const arrowLen = tileSize * 0.45;
  const headLen = 6;
  const headWidth = 6;
  const splitterForward = entityType === ENTITY_TYPES.SPLITTER
    ? rotateOffsetFromEast({ x: 1, y: 0 }, facing || "E")
    : null;
  const mergerForward = entityType === ENTITY_TYPES.MERGER
    ? rotateOffsetFromEast({ x: 1, y: 0 }, facing || "E")
    : null;

  const drawArrow = (cx, cy, dirX, dirY, rgb) => {
    const half = arrowLen / 2;
    const startX = cx - dirX * half;
    const startY = cy - dirY * half;
    const endX = cx + dirX * half;
    const endY = cy + dirY * half;

    stroke(rgb[0], rgb[1], rgb[2], 200);
    strokeWeight(2);
    line(startX, startY, endX, endY);

    const leftX = -dirY;
    const leftY = dirX;
    const baseX = endX - dirX * headLen;
    const baseY = endY - dirY * headLen;

    noStroke();
    fill(rgb[0], rgb[1], rgb[2], 220);
    triangle(
      endX,
      endY,
      baseX + leftX * headWidth * 0.5,
      baseY + leftY * headWidth * 0.5,
      baseX - leftX * headWidth * 0.5,
      baseY - leftY * headWidth * 0.5
    );
  };

  for (const port of ports) {
    if (blockedOffsetKeys && blockedOffsetKeys.has(`${port.offset.x},${port.offset.y}`)) {
      continue;
    }
    if (baseCol != null && baseRow != null) {
      const tileX = baseCol + port.offset.x;
      const tileY = baseRow + port.offset.y;
      if (isPortTileBlockedByBuilding(tileX, tileY, null)) {
        continue;
      }
    }

    const portPx = originX + port.offset.x * tileSize;
    const portPy = originY + port.offset.y * tileSize;

    const len = Math.hypot(port.offset.x, port.offset.y) || 1;
    let dirX = port.offset.x / len;
    let dirY = port.offset.y / len;

    // Port directions are intentionally normalized per building type so splitters/mergers read correctly.
    if (port.kind === "input") {
      if (mergerForward) {
        dirX = mergerForward.x;
        dirY = mergerForward.y;
      } else {
        dirX = -dirX;
        dirY = -dirY;
      }
      drawArrow(portPx, portPy, dirX, dirY, [255, 165, 0]);
    } else if (port.kind === "output") {
      if (splitterForward) {
        dirX = splitterForward.x;
        dirY = splitterForward.y;
      }
      const preferAxis = getPreferredArrowAxisForFacing(facing || "E");
      const collapsed = collapseDirectionToCardinal(dirX, dirY, preferAxis);
      dirX = collapsed.x;
      dirY = collapsed.y;
      drawArrow(portPx, portPy, dirX, dirY, [0, 200, 0]);
    } else if (port.kind === "both") {
      drawArrow(portPx, portPy, dirX, dirY, [60, 190, 190]);
      drawArrow(portPx, portPy, -dirX, -dirY, [60, 190, 190]);
    }
  }
}

/**
 * Draw faint tile highlights under placement-preview ports.
 * @param {*} ports - Preview port descriptors containing kind and rotated offsets.
 * @param {*} tileSize - Tile size in pixels.
 * @param {*} originX - Center X pixel for the preview anchor.
 * @param {*} originY - Center Y pixel for the preview anchor.
 * @param {*} baseCol - Optional world tile column anchor.
 * @param {*} baseRow - Optional world tile row anchor.
 * @param {*} blockedOffsetKeys - Optional set of blocked offset keys to skip.
 * @returns {void} No return value.
 */
function drawPlacementPortTileHighlights(
  ports,
  tileSize,
  originX = 0,
  originY = 0,
  baseCol = null,
  baseRow = null,
  blockedOffsetKeys = null
) {
  const colorForKind = (kind) => {
    if (kind === "input") return [255, 170, 0];
    if (kind === "output") return [60, 210, 90];
    return [60, 190, 190];
  };

  noStroke();
  for (const port of ports) {
    if (blockedOffsetKeys && blockedOffsetKeys.has(`${port.offset.x},${port.offset.y}`)) {
      continue;
    }
    if (baseCol != null && baseRow != null) {
      const tileX = baseCol + port.offset.x;
      const tileY = baseRow + port.offset.y;
      if (isPortTileBlockedByBuilding(tileX, tileY, null)) {
        continue;
      }
    }

    const rgb = colorForKind(port.kind);
    const centerX = originX + port.offset.x * tileSize;
    const centerY = originY + port.offset.y * tileSize;
    fill(rgb[0], rgb[1], rgb[2], 55);
    rect(
      centerX - tileSize / 2 + 1,
      centerY - tileSize / 2 + 1,
      tileSize - 2,
      tileSize - 2,
      3
    );
  }
}

// FIXED: Unified the fade for all sprites to 150, and restored the pulsing border for generic buildings!
/**
 * Draw a full building placement hologram including footprint, sprite preview, and port overlays.
 * @param {*} px - Tile-aligned X pixel position.
 * @param {*} py - Tile-aligned Y pixel position.
 * @param {*} tileSize - Tile size in pixels.
 * @param {*} colorRgb - Base hologram RGB color.
 * @param {*} label - Short fallback text label.
 * @param {*} facing - Placement facing direction.
 * @param {*} entityType - Entity type being previewed.
 * @param {*} options - Placement options used for preview (shape/resource state).
 * @param {*} baseCol - Optional world tile column anchor.
 * @param {*} baseRow - Optional world tile row anchor.
 * @returns {void} No return value.
 */
function drawBuildingPlacementHologram(
  px, py, tileSize, colorRgb, label, facing, entityType, options, baseCol = null, baseRow = null
) {
  const cx = px + tileSize / 2;
  const cy = py + tileSize / 2;
  const previewOptions = {
    ...(options || {}),
    facing: facing || ((options && options.facing) || "E")
  };
  const previewFacing = previewOptions.facing || "E";
  const footprintOffsets = getSafeFootprintOffsets(entityType, "E", previewOptions).map((offset) =>
    rotateOffsetFromEast(offset, previewFacing)
  );
  let minOffsetX = Infinity;
  let maxOffsetX = -Infinity;
  let minOffsetY = Infinity;
  let maxOffsetY = -Infinity;
  for (const offset of footprintOffsets) {
    minOffsetX = min(minOffsetX, offset.x);
    maxOffsetX = max(maxOffsetX, offset.x);
    minOffsetY = min(minOffsetY, offset.y);
    maxOffsetY = max(maxOffsetY, offset.y);
  }
  const footprintWidthTiles = maxOffsetX - minOffsetX + 1;
  const footprintHeightTiles = maxOffsetY - minOffsetY + 1;
  const footprintLeft = (minOffsetX - 0.5) * tileSize;
  const footprintTop = (minOffsetY - 0.5) * tileSize;
  const footprintWidth = footprintWidthTiles * tileSize;
  const footprintHeight = footprintHeightTiles * tileSize;
  const ports = getPlacementPreviewPorts(entityType, previewOptions);
  const footprintOffsetKeySet = new Set(
    footprintOffsets.map((offset) => `${offset.x},${offset.y}`)
  );

  // Shade candidate port tiles first so blocked/invalid offsets are visible before sprite drawing.
  if (ports.length) {
    drawPlacementPortTileHighlights(
      ports,
      tileSize,
      cx,
      cy,
      baseCol,
      baseRow,
      footprintOffsetKeySet
    );
  }

  push();
  translate(cx, cy);
  const useMinerOffHologram =
    entityType === ENTITY_TYPES.MINER &&
    minerSpriteSheetImg &&
    minerSpriteSheetImg.width > 0;
  const useSmelterHologram = 
    entityType === ENTITY_TYPES.SMELTER &&
    getSmelterSpriteForFacing(previewFacing);
  const useSplitterHologram =
    entityType === ENTITY_TYPES.SPLITTER &&
    getSplitterSpriteForFacing(previewFacing, { preferSideForEast: true });
  const useMergerHologram =
    entityType === ENTITY_TYPES.MERGER &&
    getMergerSpriteForFacing(previewFacing, { preferSideForEast: true });
  const useConstructorHologram =
    entityType === ENTITY_TYPES.CONSTRUCTOR &&
    getConstructorSpriteForFacing(previewFacing);
  const useTubeHologram =
    entityType === ENTITY_TYPES.TUBE &&
    (pipeSideOffImg || pipeFrontOffImg || pipeCurve1OffImg || pipeCurve2OffImg);

  const previewAlpha = 150;

  if (
    !useMinerOffHologram &&
    !useSmelterHologram &&
    !useSplitterHologram &&
    !useMergerHologram &&
    !useConstructorHologram &&
    !useTubeHologram
  ) {
    stroke(colorRgb[0] * 0.45, colorRgb[1] * 0.45, colorRgb[2] * 0.45, 200);
    strokeWeight(2);
    fill(colorRgb[0], colorRgb[1], colorRgb[2], 100);
    rect(
      footprintLeft + 3,
      footprintTop + 3,
      footprintWidth - 6,
      footprintHeight - 6,
      4
    );
  }

  if (useMinerOffHologram) {
    const frameW = 18;
    const frameH = 32;
    const totalFrames = max(1, floor(minerSpriteSheetImg.width / frameW));
    const offFrameIndex = min(7, totalFrames - 1);
    const spriteHeight = max(footprintHeight + 8, tileSize * 1.35);
    const spriteWidth = spriteHeight * (frameW / frameH);
    const spriteX = footprintLeft + (footprintWidth - spriteWidth) / 2;
    const spriteBottomY = footprintTop + footprintHeight - 1;
    const spriteY = spriteBottomY - spriteHeight - 6;
    imageMode(CORNER);
    tint(255, previewAlpha);
    image(
      minerSpriteSheetImg,
      spriteX,
      spriteY,
      spriteWidth,
      spriteHeight,
      offFrameIndex * frameW,
      0,
      frameW,
      frameH
    );
    noTint();
  } else if (useSmelterHologram) {
    tint(255, previewAlpha);
    drawPlacedSmelterSprite(
      footprintLeft,
      footprintTop,
      footprintWidth,
      footprintHeight,
      previewFacing,
      { isOn: false, isActive: false },
      millis() / 1000,
      225
    );
  } else if (useSplitterHologram) {
    drawPlacedSplitterSprite(
      footprintLeft,
      footprintTop,
      footprintWidth,
      footprintHeight,
      previewFacing,
      previewAlpha,
      { preferSideForEast: true, mirrorWest: true }
    );
  } else if (useMergerHologram) {
    drawPlacedMergerSprite(
      footprintLeft,
      footprintTop,
      footprintWidth,
      footprintHeight,
      previewFacing,
      previewAlpha,
      { preferSideForEast: true, mirrorWest: true }
    );
  } else if (useConstructorHologram) {
    drawPlacedConstructorSprite(
      footprintLeft,
      footprintTop,
      footprintWidth,
      footprintHeight,
      previewFacing,
      225,
      { mirrorWest: true }
    );
  } else if (useTubeHologram) {
    drawTubePlacementHologramSprite(
      footprintLeft,
      footprintTop,
      footprintWidth,
      footprintHeight,
      previewOptions,
      previewAlpha,
      baseCol,
      baseRow
    );
  } else {
    fill(35, 35, 42, 240);
    noStroke();
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(label, 0, 0);
  }
  pop();

  if (ports.length) {
    drawPlacementPorts(
      ports,
      tileSize,
      cx,
      cy,
      baseCol,
      baseRow,
      entityType,
      previewOptions.facing,
      footprintOffsetKeySet
    );
  }
  textStyle(NORMAL);
}

/**
 * Get resource type for tile.
 * @param {*} tile - Tile data object.
 * @returns {*} Computed value for the requested operation.
 */
function getResourceTypeForTile(tile) {
  if (!tile) {
    return null;
  }
  if (tile.resource) {
    return tile.resource;
  }
  if (tile.type === "iron") {
    return RESOURCE_TYPES.IRON_ORE;
  }
  if (tile.type === "copper") {
    return RESOURCE_TYPES.COPPER_ORE;
  }
  if (tile.type === "helium3") {
    return RESOURCE_TYPES.HELIUM3;
  }
  return null;
}

/**
 * Get placement options for entity.
 * @param {*} entityType - Entity type identifier.
 * @param {*} tile - Tile data object.
 * @returns {*} Computed value for the requested operation.
 */
function getPlacementOptionsForEntity(entityType, tile) {
  if (entityType === ENTITY_TYPES.TUBE) {
    return {
      shape: (drawGame.state && drawGame.state.placementTubeShape) || TUBE_SHAPES.STRAIGHT,
      facing: (drawGame.state && drawGame.state.placementFacing) || "E"
    };
  }

  if (entityType === ENTITY_TYPES.MINER || entityType === ENTITY_TYPES.EXTRACTOR) {
    let resourceType = getResourceTypeForTile(tile);
    if (entityType === ENTITY_TYPES.EXTRACTOR && resourceType !== RESOURCE_TYPES.HELIUM3) {
      resourceType = null;
    }
    return {
      resourceType,
      isActive: !!resourceType
    };
  }

  return {};
}

/**
 * Draw selected building highlight.
 * @param {*} map - Map wrapper containing tile data.
 * @param {*} tileSize - Tile size in pixels.
 * @returns {void} No return value.
 */
function drawSelectedBuildingHighlight(map, tileSize) {
  const sel = drawGame.state && drawGame.state.selectedBuilding;
  if (!sel) {
    return;
  }
  const tile = map.tiles[sel.row] && map.tiles[sel.row][sel.col];
  if (!tile || !tile.building) {
    drawGame.state.selectedBuilding = null;
    return;
  }
  const facing = tile.building.facing || "E";
  const selectedEntity = tile.entityId != null
    ? getEntityById(drawGame.state.entities, tile.entityId)
    : null;
  const footprintShapeSource = selectedEntity?.state || tile.building || null;
  const footprintOffsets = getSafeFootprintOffsets(
    tile.building.entityType,
    facing,
    footprintShapeSource
  );
  const selectedShape =
    selectedEntity?.state?.shape ||
    tile.building.shape ||
    null;
  const isCornerTubeSelection =
    tile.building.entityType === ENTITY_TYPES.TUBE &&
    selectedShape === TUBE_SHAPES.CORNER;
  let minOffsetX = Infinity;
  let maxOffsetX = -Infinity;
  let minOffsetY = Infinity;
  let maxOffsetY = -Infinity;
  for (const offset of footprintOffsets) {
    minOffsetX = min(minOffsetX, offset.x);
    maxOffsetX = max(maxOffsetX, offset.x);
    minOffsetY = min(minOffsetY, offset.y);
    maxOffsetY = max(maxOffsetY, offset.y);
  }
  const left = (sel.col + minOffsetX) * tileSize;
  const top = (sel.row + minOffsetY) * tileSize;
  const widthTiles = maxOffsetX - minOffsetX + 1;
  const heightTiles = maxOffsetY - minOffsetY + 1;
  noFill();
  stroke(255, 210, 60);
  strokeWeight(2.5);
  if (isCornerTubeSelection) {
    for (const offset of footprintOffsets) {
      const tileLeft = (sel.col + offset.x) * tileSize;
      const tileTop = (sel.row + offset.y) * tileSize;
      rect(tileLeft - 2, tileTop - 2, tileSize + 4, tileSize + 4, 4);
    }
  } else {
    rect(left - 2, top - 2, widthTiles * tileSize + 4, heightTiles * tileSize + 4, 4);
  }
}

/**
 * Get corner tube visual transform.
 * @param {*} facing - Cardinal facing direction.
 * @returns {void} No return value.
 */
function getCornerTubeVisualTransform(facing) {
  const dir = facing || "E";
  const key = CORNER_TUBE_BASE_VISUAL_TRANSFORMS[dir] ? dir : "E";
  const base = CORNER_TUBE_BASE_VISUAL_TRANSFORMS[key];
  const manual = CORNER_TUBE_MANUAL_PIXEL_OFFSETS[key] || {};
  const manualX = Number(manual.x);
  const manualY = Number(manual.y);

  return {
    angle: Number.isFinite(base.angle) ? base.angle : 0,
    mirrorX: !!base.mirrorX,
    xOffsetPx: Number.isFinite(manualX) ? manualX : 0,
    yOffsetPx: Number.isFinite(manualY) ? manualY : 0
  };
}

/**
 * Get tile base color.
 * @param {*} tile - Tile data object.
 * @returns {*} Computed value for the requested operation.
 */
function getTileBaseColor(tile) {
  switch (tile.type) {
    case "dirt":
      return [150, 120, 80];
    case "iron":
      return [67, 67, 65];
    case "copper":
      return [184, 135, 60];
    case "helium3":
      return [0, 180, 220];
    default:
      return [240, 240, 245];
  }
}

// World rendering uses grass bg tiles for every cell; "dirt" type is not drawn as brown terrain.
// Minimap base must match what the player sees, not the internal dirt marker.
/**
 * Get minimap base terrain color.
 * @param {*} tile - Tile data object.
 * @returns {*} Computed value for the requested operation.
 */
function getMinimapBaseTerrainColor(tile) {
  if (!tile) {
    return [240, 240, 245];
  }
  if (tile.type === "dirt") {
    return [240, 240, 245];
  }
  return getTileBaseColor(tile);
}

/**
 * Get placed building display name.
 * @param {*} tile - Tile data object.
 * @returns {*} Computed value for the requested operation.
 */
function getPlacedBuildingDisplayName(tile) {
  if (!tile || !tile.building) {
    return null;
  }
  const b = tile.building;
  if (b.name) {
    return b.name;
  }
  const et = b.entityType;
  const idx = HOTBAR_ENTITY_TYPES.indexOf(et);
  if (idx >= 0) {
    return HOTBAR_BUILDING_NAMES[idx];
  }
  return et != null ? String(et) : null;
}

/**
 * Get rocket port hover label at tile.
 * @param {*} col - Tile column index.
 * @param {*} row - Tile row index.
 * @returns {*} Computed value for the requested operation.
 */
function getRocketPortHoverLabelAtTile(col, row) {
  if (!drawGame.state) {
    return null;
  }
  const entities = drawGame.state.entities || [];
  const rocket = entities.find((entity) => entity.type === ENTITY_TYPES.ROCKET_SITE);
  if (!rocket) {
    return null;
  }
  const ports = getEntityConnectionPorts(rocket).filter((port) => port.kind === "input");
  const matched = ports.find((port) => port.worldX === col && port.worldY === row);
  if (!matched) {
    return null;
  }
  return "Rocket Input Port";
}

/**
 * Get map hover tooltip label.
 * @param {*} hit - Input value used by this operation.
 * @returns {*} Computed value for the requested operation.
 */
function getMapHoverTooltipLabel(hit) {
  if (!hit) {
    return null;
  }
  const portLabel = getRocketPortHoverLabelAtTile(hit.col, hit.row);
  if (portLabel) {
    return portLabel;
  }

  const buildingName = getPlacedBuildingDisplayName(hit.tile);
  if (buildingName) {
    return buildingName;
  }
  return getResourceDisplayName(hit.tile);
}

/**
 * Get resource display name.
 * @param {*} tile - Tile data object.
 * @returns {*} Computed value for the requested operation.
 */
function getResourceDisplayName(tile) {
  if (!tile) {
    return null;
  }
  if (tile.type === "iron" || tile.resource === RESOURCE_TYPES.IRON_ORE) {
    return "Iron";
  }
  if (tile.type === "copper" || tile.resource === RESOURCE_TYPES.COPPER_ORE) {
    return "Copper";
  }
  if (tile.type === "helium3" || tile.resource === RESOURCE_TYPES.HELIUM3) {
    return "Helium-3";
  }
  return null;
}

/**
 * Determine whether resource node tile.
 * @param {*} tile - Tile data object.
 * @returns {boolean} Whether the check or operation succeeds.
 */
function isResourceNodeTile(tile) {
  if (!tile) {
    return false;
  }
  if (tile.type === "iron" || tile.type === "copper" || tile.type === "helium3") {
    return true;
  }
  return (
    tile.resource === RESOURCE_TYPES.IRON_ORE ||
    tile.resource === RESOURCE_TYPES.COPPER_ORE ||
    tile.resource === RESOURCE_TYPES.HELIUM3
  );
}

/**
 * Determine whether pointer over minimap.
 * @returns {boolean} Whether the check or operation succeeds.
 */
function isPointerOverMinimap() {
  if (!drawGame.state) {
    return false;
  }
  const { mapCols, mapRows } = drawGame.state.config;
  const miniMaxSize = 165; // INCREASED to match drawMiniMap
  const miniTile = max(1, floor(miniMaxSize / mapCols));
  const miniWidth = mapCols * miniTile;
  const miniHeight = mapRows * miniTile;
  const miniX = width - miniWidth - 10;
  const miniY = 10;
  return (
    mouseX >= miniX - 4 &&
    mouseX <= miniX + miniWidth + 8 &&
    mouseY >= miniY - 4 &&
    mouseY <= miniY + miniHeight + 8
  );
}

/**
 * Determine whether pointer is over the optimization HUD panel.
 * @returns {boolean} Whether the check or operation succeeds.
 */
function isPointerOverOptimizationHud() {
  if (!drawGame.state || !drawGame.state.config) {
    return false;
  }
  const { panelW, collapsedH, expandedH, panelX, panelY } =
    getOptimizationHudPanelPlacement();

  const inCollapsedBounds =
    mouseX >= panelX &&
    mouseX <= panelX + panelW &&
    mouseY >= panelY &&
    mouseY <= panelY + collapsedH;
  const inExpandedBounds =
    mouseX >= panelX &&
    mouseX <= panelX + panelW &&
    mouseY >= panelY &&
    mouseY <= panelY + expandedH;

  const panelExpanded = !!drawGame.state?.optimization?.isPanelExpanded;
  return inCollapsedBounds || (panelExpanded && inExpandedBounds);
}

/**
 * Determine whether mouse over resource tooltip blockers.
 * @returns {boolean} Whether the check or operation succeeds.
 */
function isMouseOverResourceTooltipBlockers() {
  if (
    backButtonGame.isHovered() ||
    isPointerOverMinimap() ||
    isPointerOverOptimizationHud() ||
    isMouseOverSidebarResourceIcon()
  ) {
    return true;
  }
  const slotSize = 42;
  const gap = 8;
  const totalWidth = hotbarSlots * slotSize + (hotbarSlots - 1) * gap;
  const startX = width / 2 - totalWidth / 2;
  const y = height - 60;
  return (
    mouseY >= y - 4 &&
    mouseY <= y + slotSize + 8 &&
    mouseX >= startX - 8 &&
    mouseX <= startX + totalWidth + 8
  );
}

/**
 * Draw resource hover tooltip.
 * @returns {void} No return value.
 */
function drawResourceHoverTooltip() {
  if (currentState !== "GAME" || !drawGame.state) {
    return;
  }
  if (!drawGame.state.isRestrictedMode) {
    return;
  }
  if (isMouseOverResourceTooltipBlockers()) {
    return;
  }

  if (getHoveredRocketTooltipData()) {
    return;
  }

  const hit = getTileAtScreenPosition(mouseX, mouseY);
  const label = getMapHoverTooltipLabel(hit);
  if (!label) {
    return;
  }

  push();
  textSize(14);
  textStyle(NORMAL);
  const pad = 8;
  textAlign(LEFT, TOP);
  const tw = textWidth(label);
  const th = textAscent() + textDescent();
  const boxW = tw + pad * 2;
  const boxH = th + pad * 2;
  let bx = mouseX + 14;
  let by = mouseY + 14;
  if (bx + boxW > width - 6) {
    bx = mouseX - boxW - 14;
  }
  if (by + boxH > height - 6) {
    by = mouseY - boxH - 14;
  }

  fill(252, 252, 255, 248);
  stroke(55, 55, 68);
  strokeWeight(1);
  rect(bx, by, boxW, boxH, 5);

  fill(28, 28, 36);
  noStroke();
  text(label, bx + pad, by + pad);
  pop();

  textAlign(CENTER, CENTER);
}

/**
 * Format tooltip resource amount.
 * @param {*} value - Input value used by this operation.
 * @returns {*} Computed value for the requested operation.
 */
function formatTooltipResourceAmount(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount)) {
    return "0";
  }
  const rounded = Math.round(amount);
  if (Math.abs(amount - rounded) < 0.001) {
    return String(rounded);
  }
  return amount.toFixed(2).replace(/\.?0+$/, "");
}

/**
 * Get hovered active tube tooltip data.
 * @returns {object|null} Computed object result, or null when unavailable.
 */
function getHoveredActiveTubeTooltipData() {
  if (currentState !== "GAME" || !drawGame.state) {
    return null;
  }

  const entity = getEntityUnderMouse();
  if (!entity || entity.type !== ENTITY_TYPES.TUBE || !entity.state) {
    return null;
  }

  const state = entity.state;
  const resourceType = state.carriedItem;
  const outputRate = Number(state.outputRate) || 0;
  const isFlowing = state.flowState === "flowing" && !!state.isActive;

  if (!isFlowing || !resourceType || outputRate <= 0) {
    return null;
  }

  return {
    title: "Tube",
    amountText: `${formatTooltipResourceAmount(outputRate)}x`,
    icon: getResourceIconForType(resourceType),
    label: getResourceTypeLabel(resourceType),
    resourceType
  };
}

/**
 * Draw active tube flow tooltip.
 * @returns {boolean} Whether the check or operation succeeds.
 */
function drawActiveTubeFlowTooltip() {
  if (currentState !== "GAME" || !drawGame.state) {
    return false;
  }
  if (isMouseOverResourceTooltipBlockers()) {
    return false;
  }

  const tooltip = getHoveredActiveTubeTooltipData();
  if (!tooltip) {
    return false;
  }

  push();
  textAlign(LEFT, TOP);

  textStyle(BOLD);
  textSize(12);
  const titleW = textWidth(tooltip.title);
  const titleH = textAscent() + textDescent();

  textStyle(NORMAL);
  textSize(11);
  const iconSize = 24;
  const iconGap = 4;
  const textGap = 6;
  const amountW = textWidth(tooltip.amountText);
  const detailW = tooltip.icon
    ? iconGap + iconSize
    : textGap + textWidth(tooltip.label);
  const lineW = amountW + detailW;

  const pad = 8;
  const lineH = Math.max(15, iconSize + 2);
  const contentW = max(titleW, lineW);
  const boxW = contentW + pad * 2;
  const boxH = pad * 2 + titleH + 4 + lineH;

  let bx = mouseX + 14;
  let by = mouseY + 14;
  if (bx + boxW > width - 6) {
    bx = mouseX - boxW - 14;
  }
  if (by + boxH > height - 6) {
    by = mouseY - boxH - 14;
  }
  bx = constrain(bx, 6, width - boxW - 6);
  by = constrain(by, 6, height - boxH - 6);

  fill(252, 252, 255, 248);
  stroke(55, 55, 68);
  strokeWeight(1);
  rect(bx, by, boxW, boxH, 5);

  noStroke();
  fill(28, 28, 36);
  textStyle(BOLD);
  textSize(12);
  text(tooltip.title, bx + pad, by + pad);

  textStyle(NORMAL);
  textSize(11);
  const lineY = by + pad + titleH + 4;
  const lineTextOffsetY = 4;
  const amountX = bx + pad;
  text(tooltip.amountText, amountX, lineY + lineTextOffsetY);
  if (tooltip.icon) {
    imageMode(CORNER);
    image(
      tooltip.icon,
      amountX + amountW + iconGap,
      lineY + (lineH - iconSize) / 2,
      iconSize,
      iconSize
    );
  } else {
    text(tooltip.label, amountX + amountW + textGap, lineY + lineTextOffsetY);
  }

  pop();
  return true;
}

/**
 * Get hovered rocket tooltip data.
 * @returns {object|null} Computed object result, or null when unavailable.
 */
function getHoveredRocketTooltipData() {
  if (currentState !== "GAME" || !drawGame.state) {
    return null;
  }
  if (isMouseOverResourceTooltipBlockers()) {
    return null;
  }

  const hit = getTileAtScreenPosition(mouseX, mouseY);
  if (!hit) {
    return null;
  }

  const { entities } = drawGame.state;
  const rocketPortMatch = getPortsAtTile(entities, hit.col, hit.row).find(
    (match) =>
      match.entity?.type === ENTITY_TYPES.ROCKET_SITE &&
      match.port?.kind === "input"
  );
  if (rocketPortMatch) {
    return {
      title: "Rocket Port",
      label: "Any: Electronics, Ship Alloy, Rocket Fuel"
    };
  }

  let rocketEntity = null;
  if (hit.tile?.entityId != null) {
    rocketEntity = getEntityById(entities, hit.tile.entityId);
  }
  if (!rocketEntity && hit.tile?.building?.entityType === ENTITY_TYPES.ROCKET_SITE) {
    const buildingEntityId = hit.tile.building.entityId;
    if (buildingEntityId != null) {
      rocketEntity = getEntityById(entities, buildingEntityId);
    }
  }

  if (rocketEntity?.type !== ENTITY_TYPES.ROCKET_SITE) {
    return null;
  }

  return {
    title: "Rocket Ship",
    label: ""
  };
}

/**
 * Draw rocket hover tooltip.
 * @returns {boolean} Whether the check or operation succeeds.
 */
function drawRocketHoverTooltip() {
  const tooltip = getHoveredRocketTooltipData();
  if (!tooltip) {
    return false;
  }

  push();
  textAlign(LEFT, TOP);

  textStyle(BOLD);
  textSize(12);
  const titleW = textWidth(tooltip.title);
  const titleH = textAscent() + textDescent();

  const showLabel = tooltip.label && String(tooltip.label).trim() !== "";
  let labelW = 0;
  let labelH = 0;
  if (showLabel) {
    textStyle(NORMAL);
    textSize(11);
    labelW = textWidth(tooltip.label);
    labelH = textAscent() + textDescent();
  }

  const pad = 8;
  const boxW = max(titleW, labelW) + pad * 2;
  const boxH = pad * 2 + titleH + (showLabel ? 4 + labelH : 0);

  let bx = mouseX + 14;
  let by = mouseY + 14;
  if (bx + boxW > width - 6) {
    bx = mouseX - boxW - 14;
  }
  if (by + boxH > height - 6) {
    by = mouseY - boxH - 14;
  }
  bx = constrain(bx, 6, width - boxW - 6);
  by = constrain(by, 6, height - boxH - 6);

  fill(252, 252, 255, 248);
  stroke(55, 55, 68);
  strokeWeight(1);
  rect(bx, by, boxW, boxH, 5);

  noStroke();
  fill(28, 28, 36);
  textStyle(BOLD);
  textSize(12);
  text(tooltip.title, bx + pad, by + pad);

  if (showLabel) {
    textStyle(NORMAL);
    textSize(11);
    text(tooltip.label, bx + pad, by + pad + titleH + 4);
  }
  pop();
  return true;
}

/**
 * Get mini map tile color.
 * @param {*} tile - Tile data object.
 * @returns {*} Computed value for the requested operation.
 */
function getMiniMapTileColor(tile) {
  if (!tile) {
    return [240, 240, 245];
  }
  if (tile.building && tile.building.color) {
    return tile.building.color;
  }
  if (tile.entity && tile.entity.type) {
    return getEntityFillRgb(tile.entity.type);
  }
  if (tile.resource === RESOURCE_TYPES.IRON_ORE) {
    return [67, 67, 65];
  }
  if (tile.resource === RESOURCE_TYPES.COPPER_ORE) {
    return [184, 135, 60];
  }
  if (tile.resource === RESOURCE_TYPES.HELIUM3) {
    return [0, 180, 220];
  }
  return getMinimapBaseTerrainColor(tile);
}

/**
 * Get tile at screen position.
 * @param {*} screenX - Screen-space X position in pixels.
 * @param {*} screenY - Screen-space Y position in pixels.
 * @returns {object|null} Computed object result, or null when unavailable.
 */
function getTileAtScreenPosition(screenX, screenY) {
  if (!drawGame.state) {
    return null;
  }

  const { config, map, player } = drawGame.state;
  const { tileSize, mapCols, mapRows, mapOriginX, mapOriginY } = config;

  const cameraX = player.x - width / 2;
  const cameraY = player.y - height / 2;

  const worldX = screenX + cameraX;
  const worldY = screenY + cameraY;

  const tileCol = floor((worldX - mapOriginX) / tileSize);
  const tileRow = floor((worldY - mapOriginY) / tileSize);

  if (tileCol < 0 || tileCol >= mapCols || tileRow < 0 || tileRow >= mapRows) {
    return null;
  }

  return {
    tile: map.tiles[tileRow][tileCol],
    row: tileRow,
    col: tileCol
  };
}

/**
 * Determine whether tile within modification range.
 * @param {*} tileRow - Input value used by this operation.
 * @param {*} tileCol - Input value used by this operation.
 * @returns {boolean} Whether the check or operation succeeds.
 */
function isTileWithinModificationRange(tileRow, tileCol) {
  if (!drawGame.state) {
    return false;
  }

  const { config, player } = drawGame.state;
  const { tileSize, mapOriginX, mapOriginY, modificationRadiusTiles } = config;

  const circleX = player.x;
  const circleY = player.y;
  const radius = tileSize * (modificationRadiusTiles * 2 + 1) / 2;

  const tileLeft = mapOriginX + tileCol * tileSize;
  const tileTop = mapOriginY + tileRow * tileSize;
  const tileRight = tileLeft + tileSize;
  const tileBottom = tileTop + tileSize;

  const closestX = constrain(circleX, tileLeft, tileRight);
  const closestY = constrain(circleY, tileTop, tileBottom);

  const dx = circleX - closestX;
  const dy = circleY - closestY;

  return dx * dx + dy * dy <= radius * radius;
}

/**
 * Trigger modification range blink.
 * @returns {void} No return value.
 */
function triggerModificationRangeBlink() {
  if (!drawGame.state) {
    return;
  }

  drawGame.state.feedback.rangeBlinkUntil = millis() + 600;
}

/**
 * Draw modification range indicator.
 * @param {*} config - Runtime configuration values for map/camera/UI.
 * @param {*} feedback - Transient UI feedback state.
 * @returns {void} No return value.
 */
function drawModificationRangeIndicator(config, feedback) {
  const remaining = feedback.rangeBlinkUntil - millis();
  if (remaining <= 0) {
    return;
  }

  const blinkIndex = floor((600 - remaining) / 150);
  if (blinkIndex % 2 !== 0) {
    return;
  }

  const radius = config.tileSize * (config.modificationRadiusTiles * 2 + 1) / 2;

  noFill();
  stroke(255, 255, 210, 120);
  strokeWeight(5);
  ellipse(width / 2, height / 2, radius * 2, radius * 2);
}

/**
 * Draw hotbar.
 * @returns {void} No return value.
 */
function drawHotbar() {
  push();
  const { slotSize, gap, startX, y } = getHotbarLayout();

  if (hotbarOutlineImg) {
    const framePadding = 14;
    const frameW = 320;
    const frameH = 80;
    image(
      hotbarOutlineImg,
      startX - framePadding,
      y - 27,
      frameW,
      frameH
    );
  }

  for (let i = 0; i < hotbarSlots; i++) {
    let x = startX + i * (slotSize + gap);
    let item = hotbarItems[i];

    if (i === selectedHotbarSlot) {
      fill(255, 230, 120);
      stroke(255, 180, 0);
      strokeWeight(3);
    } else {
      fill(245);
      stroke(100);
      strokeWeight(1);
    }

    rect(x, y, slotSize, slotSize, 6);

    if (item) {
      noStroke();
      fill(item.color[0], item.color[1], item.color[2]);

      let cx = x + slotSize / 2;
      let cy = y + slotSize / 2;
      let iconSize = 18;
      const useMinerSpriteIcon = (
        i === 0 &&
        item.entityType === ENTITY_TYPES.MINER &&
        minerSpriteSheetImg &&
        minerSpriteSheetImg.width > 0
      );
      const usePipeMiniIcon = (
        i === 3 &&
        item.entityType === ENTITY_TYPES.TUBE &&
        pipeSideOnMiniImg &&
        pipeSideOnMiniImg.width > 0
      );
      const useSmelterFrontIcon = (
        i === 1 &&
        item.entityType === ENTITY_TYPES.SMELTER &&
        smelterFrontImg &&
        smelterFrontImg.width > 0
      );
      const useConstructorFrontIcon = (
        i === 2 &&
        item.entityType === ENTITY_TYPES.CONSTRUCTOR &&
        constructorFrontImg &&
        constructorFrontImg.width > 0
      );
      const useSplitterFrontIcon = (
        i === 4 &&
        item.entityType === ENTITY_TYPES.SPLITTER &&
        splitterFrontImg &&
        splitterFrontImg.width > 0
      );
      const useMergerFrontIcon = (
        i === 5 &&
        item.entityType === ENTITY_TYPES.MERGER &&
        mergerFrontImg &&
        mergerFrontImg.width > 0
      );

      if (useMinerSpriteIcon) {
        // resources/miner/info.txt: 28 frames, each frame 18x32. Frame 4 => index 3.
        const frameIndex = 3;
        const frameW = 18;
        const frameH = 32;
        const minerIconHeight = iconSize + 20;
        const minerIconWidth = minerIconHeight * (frameW / frameH);
        imageMode(CENTER);
        noTint();
        image(
          minerSpriteSheetImg,
          cx + 1,
          cy + 2,
          minerIconWidth,
          minerIconHeight,
          frameIndex * frameW,
          0,
          frameW,
          frameH
        );
        imageMode(CORNER);
      } else if (usePipeMiniIcon) {
        imageMode(CENTER);
        const iconAspect = pipeSideOnMiniImg.height / pipeSideOnMiniImg.width;
        const iconWidth = iconSize + 4;
        image(pipeSideOnMiniImg, cx, cy, iconWidth, iconWidth * iconAspect);
        imageMode(CORNER);
      } else if (useSmelterFrontIcon) {
        // Smelter front sheet is 192x38; use a single 32x38 frame for the icon.
        const frameCount = 6;
        const frameIndex = 0;
        const frameW = smelterFrontImg.width / frameCount;
        const frameH = smelterFrontImg.height;
        imageMode(CENTER);
        const iconWidth = iconSize + 8;
        const iconHeight = iconWidth * (frameH / frameW);
        image(
          smelterFrontImg,
          cx,
          cy - 3,
          iconWidth,
          iconHeight,
          frameIndex * frameW,
          0,
          frameW,
          frameH
        );
        imageMode(CORNER);
      } else if (useConstructorFrontIcon) {
        imageMode(CENTER);
        const iconWidth = iconSize + 8;
        const iconHeight = iconWidth * (constructorFrontImg.height / constructorFrontImg.width);
        image(constructorFrontImg, cx, cy + 1, iconWidth, iconHeight);
        imageMode(CORNER);
      } else if (useSplitterFrontIcon) {
        imageMode(CENTER);
        const iconWidth = iconSize + 8;
        const iconHeight = iconWidth * (splitterFrontImg.height / splitterFrontImg.width);
        image(splitterFrontImg, cx, cy + 1, iconWidth, iconHeight);
        imageMode(CORNER);
      } else if (useMergerFrontIcon) {
        imageMode(CENTER);
        const iconWidth = iconSize + 8;
        const iconHeight = iconWidth * (mergerFrontImg.height / mergerFrontImg.width);
        image(mergerFrontImg, cx, cy + 1, iconWidth, iconHeight);
        imageMode(CORNER);
      } else if (item.shape === "circle") {
        ellipse(cx, cy, iconSize, iconSize);
      } else if (item.shape === "triangle") {
        triangle(
          cx, cy - iconSize / 2,
          cx - iconSize / 2, cy + iconSize / 2,
          cx + iconSize / 2, cy + iconSize / 2
        );
      } else if (item.shape === "square") {
        rect(cx - iconSize / 2, cy - iconSize / 2, iconSize, iconSize, 3);
      }
    }

    // Draw hotbar slot number
    fill(30);
    noStroke();
    textSize(12);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text(i + 1, x + 4, y + 3);
    textAlign(CENTER, CENTER);

  }
  pop();
}

/**
 * Activate the reactive-player place pose for a short duration.
 * @param {*} durationMs - Place-pose duration in milliseconds.
 * @returns {void} No return value.
 */
function triggerReactivePlayerPlacePose(durationMs = REACTIVE_PLAYER_PLACE_DURATION_MS) {
  const duration = Math.max(0, Number(durationMs) || 0);
  reactivePlayerPlacePoseUntilMs = millis() + duration;
}

/**
 * Draw the reactive-player companion near the hotbar.
 * @returns {void} No return value.
 */
function drawReactivePlayerCompanion() {
  const hasIdleSheet =
    reactivePlayerIdleSheetImg &&
    reactivePlayerIdleSheetImg.width > 0 &&
    reactivePlayerIdleSheetImg.height > 0;
  const hasPlaceFrame =
    reactivePlayerPlaceImg &&
    reactivePlayerPlaceImg.width > 0 &&
    reactivePlayerPlaceImg.height > 0;

  if (!hasIdleSheet && !hasPlaceFrame) {
    return;
  }

  const idleFrameWidth = REACTIVE_PLAYER_IDLE_FRAME_WIDTH;
  const idleFrameHeight = REACTIVE_PLAYER_IDLE_FRAME_HEIGHT;
  const reactiveScale = 2;

  const drawWidth = round(idleFrameWidth * reactiveScale);
  const drawHeight = round(idleFrameHeight * reactiveScale);

  const { totalWidth, startX } = getHotbarLayout();
  const hotbarRight = startX + totalWidth;
  const desiredX = hotbarRight + 22;
  const x = constrain(desiredX, 0, width - drawWidth);
  const yTop = max(0, height - drawHeight);

  const nowMs = millis();
  const showPlaceFrame = hasPlaceFrame && nowMs < reactivePlayerPlacePoseUntilMs;

  push();
  imageMode(CORNER);
  noTint();

  const canToggleSmoothing =
    typeof drawingContext !== "undefined" &&
    drawingContext &&
    "imageSmoothingEnabled" in drawingContext;

  const previousImageSmoothing = canToggleSmoothing
    ? drawingContext.imageSmoothingEnabled
    : undefined;

  if (canToggleSmoothing) {
    drawingContext.imageSmoothingEnabled = false;
  }

  const finishDraw = () => {
    if (canToggleSmoothing) {
      drawingContext.imageSmoothingEnabled = previousImageSmoothing;
    }
    pop();
  };

  if (showPlaceFrame) {
    // Place/smiling frame uses its real image size and bottom-aligns.
    const placeWidth = reactivePlayerPlaceImg.width;
    const placeHeight = reactivePlayerPlaceImg.height;
    const placeDrawWidth = round(placeWidth * reactiveScale);
    const placeDrawHeight = round(placeHeight * reactiveScale);
    const placeX = round(x + (drawWidth - placeDrawWidth) / 2);
    const placeY = round(height - placeDrawHeight);

    image(
      reactivePlayerPlaceImg,
      placeX,
      placeY,
      placeDrawWidth,
      placeDrawHeight
    );

    finishDraw();
    return;
  }

  if (!hasIdleSheet) {
    finishDraw();
    return;
  }

  const availableFrameCount = Math.max(
    1,
    floor(reactivePlayerIdleSheetImg.width / idleFrameWidth)
  );

  const frameCount = Math.max(
    1,
    Math.min(REACTIVE_PLAYER_IDLE_FRAMES, availableFrameCount)
  );

  const frameIndex =
    floor((nowMs / 1000) * REACTIVE_PLAYER_IDLE_FPS) % frameCount;

  // Do NOT crop the source frame. Cropping source pixels was removing
  // visible edge pixels from the idle sprite.
  const sourceX = frameIndex * idleFrameWidth;
  const sourceY = 0;
  const sourceWidth = idleFrameWidth;
  const sourceHeight = idleFrameHeight;

  // Slightly fit idle inside the same visual box, similar to the smiling/place pose.
  // Increase to 3 or 4 if idle still feels too large.
  const idleFitPaddingPx = 1;

  const idleDrawX = round(x) + idleFitPaddingPx;
  const idleDrawY = round(yTop) + idleFitPaddingPx + 1;
  const idleDrawWidth = drawWidth - idleFitPaddingPx * 2;
  const idleDrawHeight = drawHeight - idleFitPaddingPx * 2;

  image(
    reactivePlayerIdleSheetImg,
    idleDrawX,
    idleDrawY,
    idleDrawWidth,
    idleDrawHeight,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight
  );

  finishDraw();
}

/**
 * Handle click interactions for menus, overlays, and in-game placement.
 * @returns {void} No return value.
 */
function mousePressed() {
  requestBackgroundMusicStart();

  // Check for help button click first based on current state
  if (currentState === "GAME" && helpButton && helpButton.isHovered()) {
    helpButton.checkClick();
    return;
  }
  if (currentState === "SETTINGS" && helpButtonSettings && helpButtonSettings.isHovered()) {
    helpButtonSettings.checkClick();
    return;
  }
  if (showHelpMenu && helpMenuCloseButton && helpMenuCloseButton.isHovered()) {
    helpMenuCloseButton.checkClick();
    return;
  }
  // Block all other clicks if the help menu is open
  if (showHelpMenu) {
    return;
  }

  if (currentState == "MENU") {
    if (startButton) startButton.checkClick();
    if (settingsButton) settingsButton.checkClick();
    if (escapeButton) escapeButton.checkClick();
    return;
  } else if (currentState == "SETTINGS") {
    if (backButtonSettings) backButtonSettings.checkClick();
    if (creditsButtonSettings) creditsButtonSettings.checkClick();
    return;
  } else if (currentState == "CREDITS") {
    if (backButtonCredits) backButtonCredits.checkClick();
    return;
  }

  if (currentState != "GAME") return;

if (currentState != "GAME") return;

  let tabW = 25;
  let tabH = 60;
  let mapX = drawGame.state ? drawGame.state.config.margin : 0;
  let tabX = Math.max(mapX, sidebarX + sidebarWidth);
  let mapY = drawGame.state ? drawGame.state.config.topMargin : 80;
  let tabY = 425 / 2 - tabH / 2 + mapY;
  
  if (mouseX > tabX && mouseX < tabX + tabW && mouseY > tabY && mouseY < tabY + tabH) {
    isSidebarOpen = !isSidebarOpen;
    return;
  }

  if (backButtonGame && backButtonGame.isHovered()) {
    backButtonGame.checkClick();
    return;
  }

  if (
    isMouseOverHotbarArea() ||
    isPointerOverMinimap() ||
    isPointerOverOptimizationHud()
  ) {
    return;
  }

  placeSelectedEntityAtMouse();
}

/**
 * Attempt to place the selected building at the hovered world tile.
 * @returns {boolean} Whether the check or operation succeeds.
 */
function placeSelectedEntityAtMouse() {
  if (!drawGame.state) return;
  if (selectedHotbarSlot < 0 || selectedHotbarSlot >= HOTBAR_ENTITY_TYPES.length) return;

  const { config, map, entities, player } = drawGame.state;
  const { tileSize, mapCols, mapRows, mapOriginX, mapOriginY } = config;

  const cameraX = player.x - width / 2;
  const cameraY = player.y - height / 2;

  const worldMouseX = mouseX + cameraX;
  const worldMouseY = mouseY + cameraY;

  const tileX = floor((worldMouseX - mapOriginX) / tileSize);
  const tileY = floor((worldMouseY - mapOriginY) / tileSize);

  if (tileX < 0 || tileX >= mapCols || tileY < 0 || tileY >= mapRows) return;

  const type = HOTBAR_ENTITY_TYPES[selectedHotbarSlot];
  if (!type) return;
  const tile = map.tiles[tileY][tileX];
  const options = getPlacementOptionsForTile(type, tile);
  const placementFacing = drawGame.state.placementFacing || options?.facing || "E";
  const isRestrictedMode = !!drawGame.state.isRestrictedMode;
  const bypassRestrictedBuildRules =
    isRestrictedMode &&
    !!drawGame.state.restrictedBuildRestrictionsDisabled;
  const footprintTiles = getSafeFootprintTilesAt(
    type,
    tileX,
    tileY,
    placementFacing,
    options
  );

  const canPlaceTubeOnConstructorOutputPort = (targetX, targetY, occupiedEntityId) => {
    if (type !== ENTITY_TYPES.TUBE || occupiedEntityId == null) {
      return false;
    }
    const occupiedEntity = getEntityById(entities, occupiedEntityId);
    if (!occupiedEntity || occupiedEntity.type !== ENTITY_TYPES.CONSTRUCTOR) {
      return false;
    }
    const ports = getEntityConnectionPorts(occupiedEntity);
    return ports.some(
      (port) =>
        port.kind === "output" &&
        port.worldX === targetX &&
        port.worldY === targetY
    );
  };

  // Validate the full rotated footprint before placement:
  // bounds, restricted-range rules, and occupancy exceptions.
  for (const entry of footprintTiles) {
    if (
      entry.x < 0 ||
      entry.x >= mapCols ||
      entry.y < 0 ||
      entry.y >= mapRows
    ) {
      return;
    }
    if (!bypassRestrictedBuildRules && !isTileWithinModificationRange(entry.y, entry.x)) {
      triggerModificationRangeBlink();
      return;
    }
    const occupiedTile = map.tiles[entry.y][entry.x];
    if (
      occupiedTile.entityId !== null &&
      !canPlaceTubeOnConstructorOutputPort(entry.x, entry.y, occupiedTile.entityId)
    ) {
      return;
    }
  }

  // Build placement options based on entity type and tile
  if (isRestrictedMode && !bypassRestrictedBuildRules) {
    const restrictedInventory = getRestrictedModeShuttleInventory();
    const missingResources = getMissingBuildResources(type, restrictedInventory);
    if (missingResources.length > 0) {
      triggerBuildCostFeedback(type, missingResources);
      return;
    }
    spendBuildResources(restrictedInventory, type);
  }

  const newEntity = createEntity(type, tileX, tileY, options);
  newEntity.state.facing = placementFacing;

  // Stamp entity occupancy across the full footprint, then update the anchor tile metadata used by UI.
  entities.push(newEntity);
  if (placeSound) placeSound.play();
  triggerReactivePlayerPlacePose(REACTIVE_PLAYER_PLACE_DURATION_MS);
  triggerOptimizationBuildGraceWindow();

  for (const entry of footprintTiles) {
    const occupiedTile = map.tiles[entry.y][entry.x];
    occupiedTile.entityId = newEntity.id;
    occupiedTile.entity = newEntity;
    occupiedTile.item = type;
    occupiedTile.colorOverride = null;
  }

  const hotbarItem = getSelectedHotbarItem();
  if (hotbarItem) {
    tile.building = {
      color: hotbarItem.color.slice(),
      label: hotbarItemLabel(hotbarItem),
      name: hotbarItem.name,
      entityType: hotbarItem.entityType,
      facing: newEntity.state.facing,
      shape: newEntity.state?.shape || null,
      entityId: newEntity.id
    };
    if (drawGame.state) {
      drawGame.state.selectedBuilding = { row: tileY, col: tileX };
    }
  }

  updateConnections(entities);

  console.log("Placed entity:", newEntity);
  if (type === ENTITY_TYPES.MINER) {
    console.log(
      `Miner state: isOn=${newEntity.state.isOn}, ` +
      `outputType=${newEntity.state.outputType}, ` +
      `outputRate=${newEntity.state.outputRate}, ` +
      `onResourceNode=${isMineableTile(tile.type)}`
    );
  }
}

/**
 * Get placement options for tile.
 * @param {*} type - Input value used by this operation.
 * @param {*} tile - Tile data object.
 * @returns {*} Computed value for the requested operation.
 */
function getPlacementOptionsForTile(type, tile) {
  if (type === ENTITY_TYPES.MINER) {
    const onNode = isMineableTile(tile.type);
    const resource = getResourceForTileType(tile.type);
    return {
      resourceType: resource,
      isOnResourceNode: onNode
    };
  }

  return getPlacementOptionsForEntity(type, tile);
}

/**
 * Try Apply Tube Geometry.
 * @param {*} entity - Target entity instance.
 * @param {*} nextFacing - Input value used by this operation.
 * @param {*} nextShape - Input value used by this operation.
 * @returns {boolean} Whether the check or operation succeeds.
 */
function tryApplyTubeGeometry(entity, nextFacing, nextShape) {
  if (!drawGame.state || !entity || entity.type !== ENTITY_TYPES.TUBE) {
    return false;
  }

  const { map, config } = drawGame.state;
  const mapCols = config.mapCols;
  const mapRows = config.mapRows;
  const currentFacing = entity.state?.facing || "E";
  const currentShape = entity.state?.shape || TUBE_SHAPES.STRAIGHT;
  const resolvedFacing = nextFacing || currentFacing;
  const resolvedShape = nextShape || currentShape;
  const currentTiles = getSafeFootprintTilesAt(
    entity.type,
    entity.tileX,
    entity.tileY,
    currentFacing,
    { shape: currentShape }
  );
  const nextTiles = getSafeFootprintTilesAt(
    entity.type,
    entity.tileX,
    entity.tileY,
    resolvedFacing,
    { shape: resolvedShape }
  );

  for (const entry of nextTiles) {
    if (
      entry.x < 0 || entry.x >= mapCols ||
      entry.y < 0 || entry.y >= mapRows
    ) {
      return false;
    }
    const tile = map.tiles[entry.y]?.[entry.x];
    if (!tile) {
      return false;
    }
    if (tile.entityId != null && tile.entityId !== entity.id) {
      return false;
    }
  }

  const nextSet = new Set(nextTiles.map((entry) => `${entry.x},${entry.y}`));
  for (const entry of currentTiles) {
    if (nextSet.has(`${entry.x},${entry.y}`)) {
      continue;
    }
    const tile = map.tiles[entry.y]?.[entry.x];
    if (!tile || tile.entityId !== entity.id) {
      continue;
    }
    tile.entityId = null;
    tile.entity = null;
    tile.item = null;
    tile.colorOverride = null;
    if (tile.building && tile.building.entityId === entity.id) {
      tile.building = null;
    }
  }

  entity.state.facing = resolvedFacing;
  entity.state.shape = resolvedShape;
  syncTileBuildingFacing(entity);

  for (const entry of nextTiles) {
    const tile = map.tiles[entry.y]?.[entry.x];
    if (!tile) {
      continue;
    }
    tile.entityId = entity.id;
    tile.entity = entity;
    tile.item = entity.type;
    tile.colorOverride = null;
  }

  triggerOptimizationBuildGraceWindow();
  return true;
}

/**
 * Try Apply Non Tube Facing.
 * @param {*} entity - Target entity instance.
 * @param {*} nextFacing - Input value used by this operation.
 * @returns {boolean} Whether the check or operation succeeds.
 */
function tryApplyNonTubeFacing(entity, nextFacing) {
  if (!drawGame.state || !entity || entity.type === ENTITY_TYPES.TUBE) {
    return false;
  }

  const { map, config } = drawGame.state;
  const mapCols = config.mapCols;
  const mapRows = config.mapRows;
  const currentFacing = entity.state?.facing || "E";
  const resolvedFacing = nextFacing || currentFacing;
  const currentTiles = getSafeFootprintTilesAt(
    entity.type,
    entity.tileX,
    entity.tileY,
    currentFacing,
    entity.state
  );
  const nextTiles = getSafeFootprintTilesAt(
    entity.type,
    entity.tileX,
    entity.tileY,
    resolvedFacing,
    entity.state
  );

  for (const entry of nextTiles) {
    if (
      entry.x < 0 || entry.x >= mapCols ||
      entry.y < 0 || entry.y >= mapRows
    ) {
      return false;
    }
    const tile = map.tiles[entry.y]?.[entry.x];
    if (!tile) {
      return false;
    }
    if (tile.entityId != null && tile.entityId !== entity.id) {
      return false;
    }
  }

  const nextSet = new Set(nextTiles.map((entry) => `${entry.x},${entry.y}`));
  for (const entry of currentTiles) {
    if (nextSet.has(`${entry.x},${entry.y}`)) {
      continue;
    }
    const tile = map.tiles[entry.y]?.[entry.x];
    if (!tile || tile.entityId !== entity.id) {
      continue;
    }
    tile.entityId = null;
    tile.entity = null;
    tile.item = null;
    tile.colorOverride = null;
    if (tile.building && tile.building.entityId === entity.id) {
      tile.building = null;
    }
  }

  entity.state.facing = resolvedFacing;
  syncTileBuildingFacing(entity);

  for (const entry of nextTiles) {
    const tile = map.tiles[entry.y]?.[entry.x];
    if (!tile) {
      continue;
    }
    tile.entityId = entity.id;
    tile.entity = entity;
    tile.item = entity.type;
    tile.colorOverride = null;
  }

  triggerOptimizationBuildGraceWindow();
  return true;
}


/**
 * Handle keyboard shortcuts for selection, editing, debug shortcuts, and navigation.
 * @returns {boolean} Whether the check or operation succeeds.
 */
function keyPressed() {
  requestBackgroundMusicStart();
  if (currentState === "CREDITS" || currentState === "ENDGAME") {
    if (keyCode === ENTER || key === " " || keyCode === ESCAPE) {
      resetRuntimeGameStateForNewRun();
      currentState = "MENU";
    }
    return;
  }

  if (currentState != "GAME") {
    return;
  }

  if (
    (key === "p" || key === "P") &&
    keyIsDown(CONTROL) &&
    keyIsDown(SHIFT)
  ) {
    if (drawGame.state && drawGame.state.isRestrictedMode) {
      drawGame.state.restrictedBuildRestrictionsDisabled = true;
      console.log("Restricted mode build restrictions disabled (range + cost checks bypassed).");
      if (
        typeof DevCheckpoint !== "undefined" &&
        typeof DevCheckpoint.applyRestrictedLateGameSkip === "function"
      ) {
        const applied = DevCheckpoint.applyRestrictedLateGameSkip();
        if (applied && Array.isArray(drawGame.state.entities)) {
          // One extra pass ensures derived constructor/splitter rates settle immediately.
          updateConnections(drawGame.state.entities);
        }
      } else {
        console.error("DevCheckpoint module is unavailable.");
      }
    }
    return false;
  }

  const hoveredEntity = getEntityUnderMouse();

  if (key >= '1' && key <= '9') {
    let slot = int(key) - 1;

    if (selectedHotbarSlot === slot) {
      selectedHotbarSlot = -1;
    } else {
      selectedHotbarSlot = slot;
    }
  } else if (key === 'x' || key === 'X') {
    deleteEntityUnderMouse();
  } else if (key === 'c' || key === 'C') {
    if (
      selectedHotbarSlot >= 0 &&
      getSelectedHotbarItem() &&
      getSelectedHotbarItem().entityType === ENTITY_TYPES.TUBE
    ) {
      drawGame.state.placementTubeShape =
        drawGame.state.placementTubeShape === TUBE_SHAPES.CORNER
          ? TUBE_SHAPES.STRAIGHT
          : TUBE_SHAPES.CORNER;
    } else if (hoveredEntity && hoveredEntity.type === ENTITY_TYPES.TUBE) {
      const nextShape = hoveredEntity.state.shape === TUBE_SHAPES.CORNER
        ? TUBE_SHAPES.STRAIGHT
        : TUBE_SHAPES.CORNER;
      const applied = tryApplyTubeGeometry(
        hoveredEntity,
        hoveredEntity.state.facing || "E",
        nextShape
      );
      if (applied) {
        updateConnections(drawGame.state.entities);
      }
    }
  } else if (key === 'r' || key === 'R') {
    if (selectedHotbarSlot >= 0 && getSelectedHotbarItem()) {
      cyclePlacementFacing();
    } else if (hoveredEntity && hoveredEntity.type === ENTITY_TYPES.TUBE) {
      const order = ["E", "S", "W", "N"];
      const current = hoveredEntity.state.facing || "E";
      const index = order.indexOf(current);
      const next = index === -1 ? "E" : order[(index + 1) % order.length];
      const applied = tryApplyTubeGeometry(
        hoveredEntity,
        next,
        hoveredEntity.state.shape || TUBE_SHAPES.STRAIGHT
      );
      if (applied) {
        updateConnections(drawGame.state.entities);
      }
    } else if (
      hoveredEntity &&
      (hoveredEntity.type === ENTITY_TYPES.MINER ||
        hoveredEntity.type === ENTITY_TYPES.SMELTER ||
        hoveredEntity.type === ENTITY_TYPES.CONSTRUCTOR ||
        hoveredEntity.type === ENTITY_TYPES.MERGER ||
        hoveredEntity.type === ENTITY_TYPES.SPLITTER)
    ) {
      const order = ["E", "S", "W", "N"];
      const current = hoveredEntity.state.facing || "E";
      const index = order.indexOf(current);
      const next = index === -1 ? "E" : order[(index + 1) % order.length];
      const applied = tryApplyNonTubeFacing(hoveredEntity, next);
      if (applied) {
        updateConnections(drawGame.state.entities);
      }
    } else {
      repairEntityUnderMouse();
    }
  } else if (key === 'i' || key === 'I') {
    inspectEntityUnderMouse();
  } else if (key === 'o' || key === 'O') {
    toggleEntityUnderMouse();
  } else if (key === 'p' || key === 'P') {
    if (drawGame.state) {
      logConnectionDebug(drawGame.state.entities);
    }
  }
}

/**
 * Delete entity under mouse.
 * @returns {void} No return value.
 */
function deleteEntityUnderMouse() {
  if (!drawGame.state) {
    return;
  }

  const hit = getTileAtScreenPosition(mouseX, mouseY);
  if (!hit) {
    return;
  }

  const { entities, map } = drawGame.state;
  const targetId = hit.tile.entityId;
  const targetEntity = targetId != null ? getEntityById(entities, targetId) : null;
  let didModifyLayout = false;

  if (targetId == null && !hit.tile.building) {
    return;
  }

  if (
    drawGame.state.isRestrictedMode &&
    targetEntity &&
    targetEntity.type === ENTITY_TYPES.SHUTTLE
  ) {
    console.log("Cannot delete crashed shuttle in restricted mode.");
    return;
  }

  if (targetId != null) {
    // Rocket is pre-placed and should not be removable.
    if (targetEntity && targetEntity.type === ENTITY_TYPES.ROCKET_SITE) {
      return;
    }

    const index = entities.findIndex((entry) => entry.id === targetId);
    if (index !== -1) {
      if (drawGame.state.isRestrictedMode && targetEntity) {
        const restrictedInventory = getRestrictedModeShuttleInventory();
        refundBuildResources(restrictedInventory, targetEntity.type);
      }
      entities.splice(index, 1);
      didModifyLayout = true;
    }
    
    if (targetEntity) {
      // FIXED: Pass facing and state here so the correct footprint is cleared!
      const footprintTiles = getSafeFootprintTilesAt(
        targetEntity.type,
        targetEntity.tileX,
        targetEntity.tileY,
        targetEntity.state?.facing || "E",
        targetEntity.state
      );
      
      for (const entry of footprintTiles) {
        const tile = map.tiles[entry.y]?.[entry.x];
        if (!tile || tile.entityId !== targetId) continue;
        tile.entityId = null;
        tile.entity = null;
        tile.item = null;
        tile.colorOverride = null;
        if (tile.building && tile.building.entityId === targetId) {
          tile.building = null;
        }
      }
      didModifyLayout = true;
    } else {
      hit.tile.entityId = null;
      hit.tile.entity = null;
      hit.tile.item = null;
      hit.tile.colorOverride = null;
      if (hit.tile.building && hit.tile.building.entityId === targetId) {
        hit.tile.building = null;
      }
      didModifyLayout = true;
    }
  } else if (hit.tile.building) {
    hit.tile.building = null;
    didModifyLayout = true;
  }

  if (drawGame.state.selectedBuilding) {
    const sel = drawGame.state.selectedBuilding;
    const selectedTile = map.tiles[sel.row]?.[sel.col];
    const selectedEntityId = selectedTile?.building?.entityId ?? selectedTile?.entityId;
    if (!selectedTile || selectedEntityId === targetId || selectedTile === hit.tile) {
      drawGame.state.selectedBuilding = null;
    }
  }

  updateConnections(entities);
  if (didModifyLayout) {
    triggerOptimizationBuildGraceWindow();
  }
}

/**
 * Sync tile building facing.
 * @param {*} entity - Target entity instance.
 * @returns {void} No return value.
 */
function syncTileBuildingFacing(entity) {
  if (!drawGame.state || !entity) {
    return;
  }
  const tile = drawGame.state.map.tiles[entity.tileY]?.[entity.tileX];
  if (!tile || !tile.building) {
    return;
  }
  if (tile.entityId !== entity.id) {
    return;
  }
  tile.building.facing = entity.state.facing || "E";
}

/**
 * Repair entity under mouse.
 * @returns {void} No return value.
 */
function repairEntityUnderMouse() {
  const entity = getEntityUnderMouse();
  if (!entity) return;

  entity.state.isBroken = false;
  entity.state.isOn = true;
  console.log("Repaired entity:", entity);
}

/**
 * Toggle entity under mouse.
 * @returns {void} No return value.
 */
function toggleEntityUnderMouse() {
  const entity = getEntityUnderMouse();
  if (!entity) return;

  if (entity.type === ENTITY_TYPES.TUBE) {
    console.log("Tube state is flow-driven and cannot be manually toggled.");
    return;
  }

  // Miners can only be ON when on a resource node
  if (entity.type === ENTITY_TYPES.MINER) {
    if (!entity.state.isOn) {
      // Check if the tile is a resource node before allowing ON
      const tile = drawGame.state.map.tiles[entity.tileY][entity.tileX];
      if (!isMineableTile(tile.type)) {
        console.log("Cannot turn on miner: not on a resource node.");
        return;
      }
    }
  }

  entity.state.isOn = !entity.state.isOn;
  entity.state.isActive = entity.state.isOn;

  // Update miner output rate
  if (entity.type === ENTITY_TYPES.MINER) {
    entity.state.updateOutputRate();
  }

  if (drawGame.state) {
    updateConnections(drawGame.state.entities);
  }

  console.log("Toggled entity:", entity);
}

/**
 * Inspect entity under mouse.
 * @returns {void} No return value.
 */
function inspectEntityUnderMouse() {
  const entity = getEntityUnderMouse();
  if (!entity) return;

  console.log("Inspect entity:", JSON.parse(JSON.stringify(entity)));
}

/**
 * Get entity under mouse.
 * @returns {*} Computed value for the requested operation.
 */
function getEntityUnderMouse() {
  if (!drawGame.state) return null;

  const { config, map, player, entities } = drawGame.state;
  const { tileSize, mapCols, mapRows, mapOriginX, mapOriginY } = config;

  const cameraX = player.x - width / 2;
  const cameraY = player.y - height / 2;

  const worldMouseX = mouseX + cameraX;
  const worldMouseY = mouseY + cameraY;

  const tileX = floor((worldMouseX - mapOriginX) / tileSize);
  const tileY = floor((worldMouseY - mapOriginY) / tileSize);

  if (tileX < 0 || tileX >= mapCols || tileY < 0 || tileY >= mapRows) return null;

  const tile = map.tiles[tileY][tileX];
  if (tile.entityId == null) return null;

  return getEntityById(entities, tile.entityId);
}

/**
 * Get tube sources by target.
 * @param {*} entities - Collection of active entities in the world.
 * @returns {*} Computed value for the requested operation.
 */
function getTubeSourcesByTarget(entities) {
  const tubeSources = new Map();

  for (const entity of entities) {
    if (entity.type !== ENTITY_TYPES.TUBE) continue;
    if (!entity.state.fromEntityId || !entity.state.toEntityId) continue;

    if (!tubeSources.has(entity.state.toEntityId)) {
      tubeSources.set(entity.state.toEntityId, new Set());
    }
    tubeSources.get(entity.state.toEntityId).add(entity.state.fromEntityId);
  }

  return tubeSources;
}

/**
 * Recompute network connectivity and derived production rates across all entities.
 * @param {*} entities - Collection of active entities in the world.
 * @returns {void} No return value.
 */
function updateConnections(entities) {
  // Multi-pass recompute:
  // 1) baseline topology
  // 2) splitter/merger rate derivation
  // 3) topology refresh with derived rates
  // 4) smelter/constructor recipe intake resolution
  // 5) final topology/materialized carried-item state
  refreshEntityConnectionStates(entities);
  updateSplitterMergerRates(entities);
  refreshEntityConnectionStates(entities);
  updateSmelterInputs(entities);
  updateConstructorInputs(entities);
  refreshEntityConnectionStates(entities);
}

/**
 * Log connection debug.
 * @param {*} entities - Collection of active entities in the world.
 * @returns {void} No return value.
 */
function logConnectionDebug(entities) {
  const miners = [];
  const tubes = [];
  const splitters = [];
  const mergers = [];
  const smelters = [];
  const constructors = [];

  for (const entity of entities) {
    if (entity.type === ENTITY_TYPES.MINER) {
      miners.push({
        id: entity.id,
        at: `${entity.tileX},${entity.tileY}`,
        facing: entity.state?.facing || "E",
        inputRate: entity.state.inputRate ?? 0,
        outputRate: entity.state.outputRate ?? 0,
        outputType: entity.state.outputType || null,
        isOn: !!entity.state.isOn,
        isActive: !!entity.state.isActive,
        isConnected: !!entity.state.isConnected
      });
    } else if (entity.type === ENTITY_TYPES.TUBE) {
      tubes.push({
        id: entity.id,
        at: `${entity.tileX},${entity.tileY}`,
        facing: entity.state?.facing || "E",
        shape: entity.state?.shape || TUBE_SHAPES.STRAIGHT,
        from: entity.state.fromEntityId || null,
        to: entity.state.toEntityId || null,
        component: entity.state.componentId ?? null,
        rate: entity.state.outputRate ?? 0,
        item: entity.state.carriedItem || null
      });
    } else if (entity.type === ENTITY_TYPES.SPLITTER) {
      splitters.push({
        id: entity.id,
        at: `${entity.tileX},${entity.tileY}`,
        facing: entity.state?.facing || "E",
        inputRate: entity.state.inputRate ?? 0,
        outputRate: entity.state.outputRate ?? 0,
        inputType: entity.state.inputType || null,
        outputType: entity.state.outputType || null,
        isOn: !!entity.state.isOn,
        isActive: !!entity.state.isActive,
        isConnected: !!entity.state.isConnected
      });
    } else if (entity.type === ENTITY_TYPES.MERGER) {
      mergers.push({
        id: entity.id,
        at: `${entity.tileX},${entity.tileY}`,
        facing: entity.state?.facing || "E",
        inputRate: entity.state.inputRate ?? 0,
        outputRate: entity.state.outputRate ?? 0,
        inputType: entity.state.inputType || null,
        outputType: entity.state.outputType || null,
        isOn: !!entity.state.isOn,
        isActive: !!entity.state.isActive,
        isConnected: !!entity.state.isConnected
      });
    } else if (entity.type === ENTITY_TYPES.SMELTER) {
      smelters.push({
        id: entity.id,
        at: `${entity.tileX},${entity.tileY}`,
        facing: entity.state?.facing || "E",
        inputRate: entity.state.inputRate ?? 0,
        outputRate: entity.state.outputRate ?? 0,
        inputType: entity.state.inputType || null,
        outputType: entity.state.outputType || null,
        isOn: !!entity.state.isOn,
        isActive: !!entity.state.isActive,
        isConnected: !!entity.state.isConnected
      });
    } else if (entity.type === ENTITY_TYPES.CONSTRUCTOR) {
      constructors.push({
        id: entity.id,
        at: `${entity.tileX},${entity.tileY}`,
        facing: entity.state?.facing || "E",
        inputRate: entity.state.inputRate ?? 0,
        outputRate: entity.state.outputRate ?? 0,
        inputSlots: Array.isArray(entity.state.inputSlots)
          ? entity.state.inputSlots.map((slot) => ({
              type: slot?.type || null,
              count: slot?.count ?? 0
            }))
          : [],
        outputType: entity.state.outputType || null,
        outputCount: entity.state.outputCount ?? 0,
        outputBuffer: entity.state.outputBuffer ?? 0,
        isOn: !!entity.state.isOn,
        isActive: !!entity.state.isActive,
        isConnected: !!entity.state.isConnected
      });
    }
  }

  const snapshot = {
    miners,
    tubes,
    splitters,
    mergers,
    smelters,
    constructors
  };

  console.log("Connection debug:", snapshot);

  try {
    globalThis.__lastConnectionDebug = JSON.parse(JSON.stringify(snapshot));
  } catch (_error) {
    globalThis.__lastConnectionDebug = snapshot;
  }
}

/**
 * Get incoming tube inputs.
 * @param {*} entities - Collection of active entities in the world.
 * @param {*} targetId - Input value used by this operation.
 * @returns {*} Computed value for the requested operation.
 */
function getIncomingTubeInputs(entities, targetId) {
  const inputs = [];
  const incomingKeys = new Set();

  for (const entity of entities) {
    if (entity.type !== ENTITY_TYPES.TUBE) continue;
    if (entity.state.toEntityId !== targetId) continue;

    const componentId = entity.state.componentId;
    const key = componentId != null ? `c:${componentId}` : `t:${entity.id}`;
    if (incomingKeys.has(key)) continue;
    incomingKeys.add(key);

    inputs.push({
      rate: entity.state.outputRate || 0,
      outputType: entity.state.carriedItem || null
    });
  }

  // Allow direct smelter/merger -> constructor intake when ports overlap or touch, even with no tube.
  const targetEntity = getEntityById(entities, targetId);
  if (targetEntity && targetEntity.type === ENTITY_TYPES.CONSTRUCTOR) {
    const targetInputPorts = getEntityConnectionPorts(targetEntity).filter(
      (port) => port.kind === "input"
    );
    const targetInputPortKeys = new Set(
      targetInputPorts.map((port) => `${port.worldX},${port.worldY}`)
    );

    for (const entity of entities) {
      if (
        entity.id === targetId ||
        (
          entity.type !== ENTITY_TYPES.MERGER &&
          entity.type !== ENTITY_TYPES.SMELTER
        )
      ) {
        continue;
      }

      const outputType = entity.state?.outputType || null;
      const outputRate = Number(entity.state?.outputRate) || 0;
      if (!outputType || outputRate <= 0) {
        continue;
      }

      const outputPorts = getEntityConnectionPorts(entity).filter(
        (port) => port.kind === "output"
      );
      for (const port of outputPorts) {
        if (!matchesDirectConstructorInputPort(port.worldX, port.worldY, targetInputPortKeys)) {
          continue;
        }
        const sourceKeyPrefix =
          entity.type === ENTITY_TYPES.MERGER ? "m" : "s";
        const incomingKey = `${sourceKeyPrefix}:${entity.id}:${port.name || "output"}`;
        if (incomingKeys.has(incomingKey)) {
          continue;
        }
        incomingKeys.add(incomingKey);
        inputs.push({
          rate: outputRate,
          outputType
        });
      }
    }
  }

  return inputs;
}

/**
 * Matches Direct Constructor Input Port.
 * @param {*} portX - Input value used by this operation.
 * @param {*} portY - Input value used by this operation.
 * @param {*} constructorInputPortKeys - Input value used by this operation.
 * @returns {boolean} Whether the check or operation succeeds.
 */
function matchesDirectConstructorInputPort(portX, portY, constructorInputPortKeys) {
  const DIRECT_NEIGHBORS = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 }
  ];
  const key = `${portX},${portY}`;
  if (constructorInputPortKeys.has(key)) return true;

  for (const neighbor of DIRECT_NEIGHBORS) {
    const neighborKey = `${portX + neighbor.x},${portY + neighbor.y}`;
    if (constructorInputPortKeys.has(neighborKey)) {
      return true;
    }
  }

  return false;
}

/**
 * Resolve smelter intake validity and derive active recipe/output rates.
 * @param {*} entities - Collection of active entities in the world.
 * @returns {void} No return value.
 */
function updateSmelterInputs(entities) {
  const EPSILON = 1e-6;
  const SMELTER_VALID_INPUT_RATES = [1, 2];

  for (const entity of entities) {
    if (entity.type !== ENTITY_TYPES.SMELTER) continue;
    const smelterState = entity.state;
    const inputs = getIncomingTubeInputs(entities, entity.id);
    const types = inputs.map((entry) => entry.outputType).filter(Boolean);
    const sharedType = types.length > 0 && types.every((type) => type === types[0])
      ? types[0]
      : null;
    const inputType = smelterState.acceptedInputs?.includes(sharedType)
      ? sharedType
      : null;
    const totalRate = inputType
      ? inputs.reduce(
          (sum, entry) => sum + (entry.outputType === inputType ? entry.rate : 0),
          0
        )
      : 0;
    const matchedInputRate = !!inputType
      ? SMELTER_VALID_INPUT_RATES.find(
          (allowedRate) => Math.abs(totalRate - allowedRate) <= EPSILON
        )
      : null;
    const hasSupportedIntake = matchedInputRate != null;
    const outputType = smelterState.recipes?.get(inputType) || null;

    smelterState.inputType = inputType;
    smelterState.currentRecipe = inputType;
    smelterState.isActive = hasSupportedIntake && !!outputType;
    smelterState.isOn = smelterState.isActive;
    smelterState.outputType = outputType;
    // Expose observed intake (1 or 2 ore/sec), while output remains fixed at 1 bar/sec.
    smelterState.inputRate = hasSupportedIntake ? matchedInputRate : 0;
    smelterState.outputRate = hasSupportedIntake && outputType ? 1 : 0;

    if (!inputType) {
      smelterState.storedInput = 0;
      smelterState.outputBuffer = 0;
    }
  }
}

/**
 * Find constructor recipe by types.
 * @param {*} types - Input value used by this operation.
 * @returns {*} Computed value for the requested operation.
 */
function findConstructorRecipeByTypes(types) {
  if (typeof CONSTRUCTOR_RECIPES === "undefined") return null;

  const normalized = [...types].sort().join("+");

  for (const recipe of CONSTRUCTOR_RECIPES) {
    const recipeTypes = recipe.inputs.map((input) => input.type).sort().join("+");
    if (recipeTypes === normalized) {
      return recipe;
    }
  }

  return null;
}

/**
 * Resolve constructor recipes from incoming network rates and configure outputs.
 * @param {*} entities - Collection of active entities in the world.
 * @returns {void} No return value.
 */
function updateConstructorInputs(entities) {
  const EPSILON = 1e-6;

  for (const entity of entities) {
    if (entity.type !== ENTITY_TYPES.CONSTRUCTOR) continue;
    const constructorState = entity.state;
    const incoming = getIncomingTubeInputs(entities, entity.id);
    const incomingRatesByType = new Map();

    for (const input of incoming) {
      const type = input?.outputType || null;
      const rate = Number(input?.rate) || 0;
      if (!type || rate <= 0) {
        continue;
      }
      incomingRatesByType.set(type, (incomingRatesByType.get(type) || 0) + rate);
    }

    const uniqueTypes = [...incomingRatesByType.keys()];
    const recipe = uniqueTypes.length
      ? findConstructorRecipeByTypes(uniqueTypes)
      : null;

    // Keep slots in sync with inferred/active recipe so UI and downstream logic show expected inputs.
    constructorState.inputSlots = [
      { type: null, count: 0 },
      { type: null, count: 0 }
    ];

    if (recipe) {
      recipe.inputs.forEach((input, index) => {
        if (index >= constructorState.inputSlots.length) return;
        constructorState.inputSlots[index] = {
          type: input.type,
          count: input.count
        };
      });
    } else {
      uniqueTypes.forEach((type, index) => {
        if (index >= constructorState.inputSlots.length) return;
        constructorState.inputSlots[index] = { type, count: 1 };
      });
    }

    if (!recipe) {
      constructorState.outputType = null;
      constructorState.outputCount = 0;
      constructorState.inputRate = 0;
      constructorState.outputRate = 0;
      constructorState.isActive = false;
      continue;
    }

    let hasExactRecipeInputs = true;
    // Constructor throughput is intentionally strict: every required input rate
    // must match the recipe count exactly (within epsilon) for production to run.
    for (const input of recipe.inputs) {
      const requiredCount = Number(input.count) || 0;
      const availableRate = incomingRatesByType.get(input.type) || 0;
      if (
        requiredCount <= 0 ||
        Math.abs(availableRate - requiredCount) > EPSILON
      ) {
        hasExactRecipeInputs = false;
        break;
      }
    }

    const recipeOutputCount = Number(recipe.output?.count) || 0;
    const totalRequiredPerCraft = recipe.inputs.reduce(
      (sum, input) => sum + (Number(input.count) || 0),
      0
    );
    const outputRate = hasExactRecipeInputs ? recipeOutputCount : 0;

    constructorState.outputType = recipe.output?.type || null;
    constructorState.outputCount = recipeOutputCount;
    constructorState.inputRate = hasExactRecipeInputs
      ? totalRequiredPerCraft
      : 0;
    constructorState.outputRate = outputRate;
    constructorState.isActive =
      !!constructorState.outputType &&
      hasExactRecipeInputs &&
      outputRate > 0;
  }
}

/**
 * Recalculate splitter and merger throughput from network topology.
 * @param {*} entities - Collection of active entities in the world.
 * @returns {void} No return value.
 */
function updateSplitterMergerRates(entities) {
  const incoming = new Map();
  const outgoingCount = new Map();
  const incomingKeys = new Set();
  const outgoingKeys = new Set();
  const constructorInputPortKeys = new Set();

  for (const entity of entities) {
    if (entity.type !== ENTITY_TYPES.CONSTRUCTOR) continue;
    const inputPorts = getEntityConnectionPorts(entity).filter(
      (port) => port.kind === "input"
    );
    for (const port of inputPorts) {
      constructorInputPortKeys.add(`${port.worldX},${port.worldY}`);
    }
  }

  // Collect unique incoming/outgoing component links so rates are not double-counted
  // when multiple tube entities belong to one connected component.
  for (const entity of entities) {
    if (entity.type !== ENTITY_TYPES.TUBE) continue;
    const fromId = entity.state.fromEntityId;
    const toId = entity.state.toEntityId;
    const componentId = entity.state.componentId;
    const componentKey = componentId != null ? `c:${componentId}` : `t:${entity.id}`;

    if (fromId) {
      const outKey = `${fromId}|${componentKey}`;
      if (!outgoingKeys.has(outKey)) {
        outgoingKeys.add(outKey);
        outgoingCount.set(fromId, (outgoingCount.get(fromId) || 0) + 1);
      }
    }

    if (!fromId || !toId) continue;
    const inKey = `${toId}|${componentKey}`;
    if (incomingKeys.has(inKey)) continue;
    incomingKeys.add(inKey);

    if (!incoming.has(toId)) {
      incoming.set(toId, []);
    }
    incoming.get(toId).push({
      rate: entity.state.outputRate || 0,
      outputType: entity.state.carriedItem || null
    });
  }

  // Treat direct merger -> constructor overlap/touch as a valid outgoing connection,
  // so mergers can drive constructors without requiring an intermediate tube.
  for (const entity of entities) {
    if (entity.type !== ENTITY_TYPES.MERGER) continue;
    const outputPorts = getEntityConnectionPorts(entity).filter(
      (port) => port.kind === "output"
    );
    for (const port of outputPorts) {
      if (!matchesDirectConstructorInputPort(port.worldX, port.worldY, constructorInputPortKeys)) {
        continue;
      }
      const directOutKey = `m:${entity.id}:${port.name || "output"}:direct`;
      if (outgoingKeys.has(directOutKey)) continue;
      outgoingKeys.add(directOutKey);
      outgoingCount.set(entity.id, (outgoingCount.get(entity.id) || 0) + 1);
    }
  }

  for (const entity of entities) {
    if (
      entity.type !== ENTITY_TYPES.SPLITTER &&
      entity.type !== ENTITY_TYPES.MERGER
    ) {
      continue;
    }

    const inputs = incoming.get(entity.id) || [];
    const inputConnectionCount = inputs.length;
    const outputConnectionCount = outgoingCount.get(entity.id) || 0;
    const hasValidIoConnection =
      inputConnectionCount > 0 && outputConnectionCount > 0;
    const totalRate = inputs.reduce((sum, entry) => sum + entry.rate, 0);
    const types = inputs.map((entry) => entry.outputType).filter(Boolean);
    const sharedType = types.length > 0 && types.every((type) => type === types[0])
      ? types[0]
      : null;

    // Splitters divide one stream across all active outputs; mergers sum compatible inputs.
    if (entity.type === ENTITY_TYPES.SPLITTER) {
      const perOutputRate = outputConnectionCount > 0
        ? totalRate / outputConnectionCount
        : 0;
      entity.state.inputRate = hasValidIoConnection ? totalRate : 0;
      entity.state.outputRate =
        hasValidIoConnection && sharedType ? perOutputRate : 0;
      entity.state.outputType = hasValidIoConnection ? sharedType : null;
      entity.state.isOn = hasValidIoConnection;
      entity.state.isActive =
        hasValidIoConnection && !!sharedType && totalRate > 0;
    } else {
      entity.state.inputRate = hasValidIoConnection ? totalRate : 0;
      entity.state.outputRate =
        hasValidIoConnection && sharedType ? totalRate : 0;
      entity.state.outputType = hasValidIoConnection ? sharedType : null;
      entity.state.isOn = hasValidIoConnection;
      entity.state.isActive =
        hasValidIoConnection && !!sharedType && totalRate > 0;
    }
  }
}

class Button {
  /**
   * Create a clickable UI button.
   * @param {*} x - Left pixel coordinate.
   * @param {*} y - Top pixel coordinate.
   * @param {*} w - Button width in pixels.
   * @param {*} h - Button height in pixels.
   * @param {*} label - Text label shown inside the button.
   * @param {*} onClick - Click handler invoked when the button is pressed.
   * @returns {void} No return value.
   */
  constructor(x, y, w, h, label, onClick) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.label = label;
    this.onClick = onClick;
    this.fontSize = 20;
  }

  /**
   * Determine whether the pointer is currently inside the button bounds.
   * @returns {boolean} True when the pointer is hovering this button.
   */
  isHovered() {
    return mouseX > this.x && mouseX < this.x + this.w &&
           mouseY > this.y && mouseY < this.y + this.h;
  }

  /**
   * Render the button and hover visuals, including hover sound on state entry.
   * @returns {void} No return value.
   */
  draw() {
    push();

    if (this.isHovered()) {
      fill(170, 170, 175); 
      stroke(80, 80, 85);
      strokeWeight(2);
      cursor('pointer');
    } else {
      fill(200, 200, 215);
      stroke(100);
      strokeWeight(1);
    }

    const isNowHovered = this.isHovered();
    if (isNowHovered && !this.wasHovered && hoverSound) {
      hoverSound.play();
    }
    this.wasHovered = isNowHovered; // Update the state for the next frame

    if (isNowHovered) {
      fill(170, 170, 175);
      stroke(80, 80, 85);
      strokeWeight(2);
      cursor('pointer');
    } else {
      fill(200, 200, 215);
      stroke(100);
      strokeWeight(1);
    }

    rect(this.x, this.y, this.w, this.h, 4);

    fill(30, 30, 30);
    noStroke();
    textSize(this.fontSize || 20);
    textStyle(NORMAL);
    textAlign(CENTER, CENTER);
    text(this.label, this.x + this.w / 2, this.y + this.h / 2);

    pop();
  }

  /**
   * Invoke the click handler if the pointer is currently hovering the button.
   * @returns {void} No return value.
   */
  checkClick() {
    if (this.isHovered()) {
      if (clickSound) clickSound.play();
      this.onClick();
    }
  }
}
