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

let ironOre = 0, ironBar = 0, ironPlate = 0;
let copperOre = 0, copperBar = 0, copperPlate = 0, copperWire = 0;
let helium = 0, rocketFuel = 0;
let modularComponent = 0, shipAlloy = 0, electronics = 0;

let playerSpriteSheetFrontIdle, playerSpriteSheetFrontMove;
let playerSpriteSheetBackIdle, playerSpriteSheetBackMove;
let playerSpriteSheetSideIdle, playerSpriteSheetSideMove;

let pipeFrontOffImg, pipeCurve1OffImg, pipeCurve1OnImg, pipeCurve2OffImg, pipeCurve2OnImg, pipeSideOnMiniImg, minerSpriteSheetImg;

let bgTiles = [];
let stars = [];

let currentDirection = "front";
let currentAnimation = "idle";
let currentFrame = 0;
let facingLeft = false;
const animationFPS = 10;

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


function setup() {
  canvas = createCanvas(600, 600);
  centerCanvas();
  textAlign(CENTER, CENTER);

  stars = [];
  for (let i = 0; i < 1200; i++) {
    stars.push({
      x: random(0, 2000), // Random starting seed pool
      y: random(0, 2000),
      r: random(1, 3),
      alpha: random(100, 255)
    });
  }

  startButton = new Button (90, 350, 150, 55, "Start", () => {
    currentState = "GAME";
  });
  settingsButton = new Button(90, 405, 150, 55, "Settings", () => {
    currentState = "SETTINGS";
  });
  escapeButton = new Button(90, 460, 150, 55, "Quit", () => {
    window.close();
  });

  backButtonGame = new Button(30, 20, 100, 40, "<-- Back", () => {
    currentState = "MENU";
  });
  backButtonSettings = new Button(250, 430, 100, 40, "<- Return", () => {
    currentState = "MENU";
  });
  setupSettings();
};

function preload() {
  bgTiles[0] = loadImage('resources/tiles/tile1.png');
  bgTiles[1] = loadImage('resources/tiles/tile2.png');
  bgTiles[2] = loadImage('resources/tiles/tile3.png');
  bgTiles[3] = loadImage('resources/tiles/tile4.png');

  pipeFrontOffImg = loadImage('resources/pipes/pipeFrontOff.png');
  pipeCurve1OffImg = loadImage('resources/pipes/pipeCurve1Off.png');
  pipeCurve1OnImg = loadImage('resources/pipes/pipeCurve1On.png');
  pipeCurve2OffImg = loadImage('resources/pipes/pipeCurve1Off.png');
  pipeCurve2OnImg = loadImage('resources/pipes/pipeCurve1On.png');
  pipeSideOnMiniImg = loadImage('resources/pipes/pipeSideOn.png');
  minerSpriteSheetImg = loadImage('resources/miner/miner.png');

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
  hotbarOutlineImg = loadImage('resources/UI/hotbarFrame.png');
  copperDepositImg = loadImage('resources/resourceNodes/copperDeposit.png');
  ironDepositImg = loadImage('resources/resourceNodes/ironDeposit.png');
  // heliumDepositImg = loadImage();
}

function centerCanvas() {
  if (!canvas) {
    return;
  }
  const x = max(0, (windowWidth - width) / 2);
  const y = max(0, (windowHeight - height) / 2);
  canvas.position(x, y);
}

function windowResized() {
  centerCanvas();
}

function draw() {
  cursor('default');
  if (currentState == "MENU") {
    drawMenu();
    hideSettingsUI();
  } else if (currentState == "GAME") {
    background(0);
    drawGame();
    hideSettingsUI();
  } else if (currentState == "SETTINGS") {
    drawSettings();
  }
}

function drawMenu() {
  if (titlePage) {
    image(titlePage, 0, 0, width, height);
  }

  push();
  noFill();
  stroke(0);
  strokeWeight(3);

  startButton.draw();
  settingsButton.draw();
  escapeButton.draw();

  rect(
    startButton.x,
    startButton.y,
    startButton.w,
    (escapeButton.y + escapeButton.h) - startButton.y,
    2
  );

  rect(
    settingsButton.x,
    settingsButton.y,
    settingsButton.w,
    55,
    2
  );

  pop();
}

function drawGame() {
  const restrictedMode = (typeof isRestrictedModeEnabled === "function")
    ? isRestrictedModeEnabled()
    : false;

  if (
    drawGame.state &&
    drawGame.state.isRestrictedMode !== restrictedMode
  ) {
    drawGame.state = null;
  }

  if (!drawGame.state) {
    const tileSize = 32;
    const mapCols = 50;
    const mapRows = 50;
    const tiles = [];

    for (let y = 0; y < mapRows; y++) {
      const row = [];
      for (let x = 0; x < mapCols; x++) {
        row.push({
          type: "empty",
          resource: null,
          item: null,
          colorOverride: null,
          entity: null,
          entityId: null,
          building: null,
          bgIndex: Math.floor(Math.random() * 4)
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

    const setResourceNode = (col, row, nodeKey) => {
      const t = tiles[row][col];
      t.type = nodeKey;
      if (nodeKey === "iron") {
        t.resource = RESOURCE_TYPES.IRON_ORE;
      } else if (nodeKey === "copper") {
        t.resource = RESOURCE_TYPES.COPPER_ORE;
      } else if (nodeKey === "helium3") {
        t.resource = RESOURCE_TYPES.HELIUM3;
      }
    };

    if (restrictedMode) {
      applyRestrictedModeResourceLayout(tiles, mapCols, mapRows, setResourceNode);
    } else {
      // Resource patches for testing in creative mode
      for (let y = 6; y <= 7; y++) {
        for (let x = 6; x <= 10; x++) {
          setResourceNode(x, y, "iron");
        }
      }

      for (let y = 10; y <= 12; y++) {
        for (let x = 12; x <= 16; x++) {
          setResourceNode(x, y, "copper");
        }
      }

      setResourceNode(17, 18, "helium3");
      setResourceNode(18, 18, "helium3");
      setResourceNode(17, 19, "helium3");
      setResourceNode(18, 19, "helium3");
    }

    const entities = [];

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
        buildCostMessageText: ""
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
      animationTimer: 0
    };

    drawGame.state.isRestrictedMode = restrictedMode;
    drawGame.state.shuttleEntityId = null;

    if (restrictedMode) {
      spawnRestrictedModeShuttle(drawGame.state);
    }
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

  if (drawGame.state.player.facing === undefined) {
    drawGame.state.player.facing = "N";
  }

  let moveX = 0;
  let moveY = 0;
  if (keyIsDown(65)) moveX -= 1;
  if (keyIsDown(68)) moveX += 1;
  if (keyIsDown(87)) moveY -= 1;
  if (keyIsDown(83)) moveY += 1;

  const dt = min(0.05, deltaTime / 1000);
  const isMoving = (moveX !== 0 || moveY !== 0);

  if (isMoving) {
    const len = Math.hypot(moveX, moveY);
    const speed = player.speed * dt;
    player.x += (moveX / len) * speed;
    player.y += (moveY / len) * speed;
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

  // --- Miner harvesting tick ---
  updateMinerHarvesting(entities, dt);
  updateFactoryProduction(entities, dt);
  updateRestrictedModeShuttleIntake(entities, dt);

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
  const portOverlay = new Map();
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
    }
  }

  for (let y = visibleMinRow; y <= visibleMaxRow; y++) {
    for (let x = visibleMinCol; x <= visibleMaxCol; x++) {
      const portType = portOverlay.get(`${x},${y}`);
      
      // FIXED: Only draw the port connection highlights, and make them semi-transparent so the ground shows through!
      // We removed the solid box that used to hide the tiles behind buildings.
      if (portType) {
        if (portType === "output") {
          fill(70, 200, 90, 120);
        } else if (portType === "input") {
          fill(80, 130, 230, 120);
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

  drawEntities(entities, tileSize);

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

  drawMiniMap(map, player, config, feedback);
  backButtonGame.draw();
  drawHotbar();
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
  updatePlayerAnimation();
}

function applyRestrictedModeResourceLayout(tiles, mapCols, mapRows, setResourceNode) {
  if (!Array.isArray(tiles) || typeof setResourceNode !== "function") {
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
  };

  for (let y = 0; y < mapRows; y++) {
    for (let x = 0; x < mapCols; x++) {
      clearResourceNode(tiles[y][x]);
    }
  }

  // Reserve shuttle footprint so random scatter stays clear of it.
  for (let y = RESTRICTED_SHUTTLE_ROW - 1; y <= RESTRICTED_SHUTTLE_ROW + 1; y++) {
    for (let x = RESTRICTED_SHUTTLE_COL - 1; x <= RESTRICTED_SHUTTLE_COL + 1; x++) {
      if (isInside(x, y)) {
        reserve(x, y);
      }
    }
  }

  const placeDepositPatch = (centerX, centerY, radiusX, radiusY, type) => {
    for (let dy = -radiusY; dy <= radiusY; dy++) {
      for (let dx = -radiusX; dx <= radiusX; dx++) {
        const x = centerX + dx;
        const y = centerY + dy;
        if (!isInside(x, y) || isReserved(x, y)) {
          continue;
        }
        setResourceNode(x, y, type);
        reserve(x, y);
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
    { type: "iron", count: 3 },
    { type: "copper", count: 3 },
    { type: "helium3", count: 2 }
  ];

  for (const group of sparseScatterPlan) {
    let placed = 0;
    let attempts = 0;
    const maxAttempts = 500;

    while (placed < group.count && attempts < maxAttempts) {
      attempts++;
      const x = Math.floor(Math.random() * mapCols);
      const y = Math.floor(Math.random() * mapRows);
      if (!isInside(x, y) || isReserved(x, y)) {
        continue;
      }

      const tile = tiles[y] && tiles[y][x];
      if (!tile || tile.entityId != null || tile.type !== "empty") {
        continue;
      }

      setResourceNode(x, y, group.type);
      reserve(x, y);
      placed++;
    }
  }
}

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

function getRestrictedModeShuttleInventory() {
  const shuttle = getRestrictedModeShuttleEntity();
  const inventory = shuttle?.state?.inventory;
  if (!inventory || typeof inventory !== "object") {
    return null;
  }

  return inventory;
}

function getBuildCostForEntity(entityType) {
  if (typeof ENTITY_BUILD_COSTS === "undefined" || !entityType) {
    return null;
  }
  return ENTITY_BUILD_COSTS[entityType] || null;
}

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

function getSafeFootprintOffsets(entityType) {
  const fallback = [{ x: 0, y: 0 }];
  if (typeof getEntityFootprintOffsets !== "function") {
    return fallback;
  }

  const offsets = getEntityFootprintOffsets(entityType);
  if (!Array.isArray(offsets) || offsets.length === 0) {
    return fallback;
  }

  const normalized = offsets.filter(
    (offset) =>
      offset &&
      Number.isFinite(offset.x) &&
      Number.isFinite(offset.y)
  );

  return normalized.length > 0 ? normalized : fallback;
}

function getSafeFootprintTilesAt(entityType, tileX, tileY) {
  const offsets = getSafeFootprintOffsets(entityType);
  return offsets.map((offset) => ({
    x: tileX + offset.x,
    y: tileY + offset.y
  }));
}

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
  translate(width / 2, height / 2);
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

function drawEntities(entities, tileSize, map) {
  textAlign(CENTER, CENTER);
  textSize(10);
  const nowSeconds = millis() / 1000;

  for (const entity of entities) {
    const footprintOffsets = getSafeFootprintOffsets(entity.type);
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

    if (entity.type === ENTITY_TYPES.TUBE) {
      push();
      translate(px + tileSize / 2, py + tileSize / 2);
      rotate(facingToAngle(entity.state.facing));

      let imgToDraw = null;
      let isCorner = entity.state.shape === TUBE_SHAPES.CORNER;
      let isFlowing = !!entity.state.carriedItem;

      if (isCorner) {
        let useCurve2 = (entity.tileX + entity.tileY) % 2 === 0;
        if (isFlowing) imgToDraw = useCurve2 ? (pipeCurve2OnImg || pipeCurve1OnImg) : pipeCurve1OnImg;
        else imgToDraw = useCurve2 ? (pipeCurve2OffImg || pipeCurve1OffImg) : pipeCurve1OffImg;
      } else {
        imgToDraw = pipeFrontOffImg; 
      }

      if (imgToDraw && imgToDraw.width > 0) {
        // FIXED: Explicitly define the number of frames based on the sprite sheet!
        // pipeFrontOff is 8 frames, the curves are 16 frames. 
        // This calculates the exact width of a single frame and stops the "2 tubes at a time" bug!
        let numFrames = (imgToDraw === pipeFrontOffImg) ? 8 : 16;
        let frameW = imgToDraw.width / numFrames;
        let frameH = imgToDraw.height;
        let currentFrame = 0;
        
        if (numFrames > 1 && entity.state.isConnected) {
            currentFrame = Math.floor(millis() / 150) % numFrames;
        }

        imageMode(CORNER);
        image(imgToDraw, -tileSize / 2, -tileSize / 2, tileSize, tileSize, currentFrame * frameW, 0, frameW, frameH);
      } else {
        stroke(50);
        fill(120);
        rect(-tileSize / 2 + 4, -tileSize / 2 + 4, tileSize - 8, tileSize - 8, 4);
      }
      pop();
    } else {
      const drewMinerSprite =
        entity.type === ENTITY_TYPES.MINER &&
        drawPlacedMinerSprite(px, py, drawWidth, drawHeight, tileSize, entity.state, nowSeconds);

      if (!drewMinerSprite) {
        // Regular building fallback rendering when no custom sprite is used.
        stroke(50);
        const rgb = getEntityFillRgb(entity.type);
        fill(rgb[0], rgb[1], rgb[2]);
        rect(px + 4, py + 4, drawWidth - 8, drawHeight - 8, 4);
      }

      if (entity.state.isBroken) {
        stroke(255, 0, 0);
        strokeWeight(3);
        line(px + 6, py + 6, px + drawWidth - 6, py + drawHeight - 6);
        line(px + drawWidth - 6, py + 6, px + 6, py + drawHeight - 6);
        strokeWeight(1);
      }

      if (!drewMinerSprite) {
        noStroke();
        const powerOn = entity.state.isOn != null ? entity.state.isOn : entity.state.isActive;
        fill(powerOn ? color(0, 220, 0) : color(220, 0, 0));
        circle(px + drawWidth - 8, py + 8, 8);
      }

      if (!drewMinerSprite) {
        fill(20);
        noStroke();
        text(getEntityShortLabel(entity.type), px + drawWidth / 2, py + drawHeight / 2);
      }
    }
    
    drawEntityPorts(entity, tileSize);
  }
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

function isPortTileBlockedByBuilding(tileX, tileY, ignoreEntityId = null) {
  if (!drawGame.state) return false;
  const map = drawGame.state.map;
  const row = map.tiles[tileY];
  const tile = row ? row[tileX] : null;
  if (!tile) return false;
  if (tile.entityId == null) return false;
  return tile.entityId !== ignoreEntityId;
}

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
      dirX = -dirX;
      dirY = -dirY;
      drawDirectionalArrow(portPx, portPy, dirX, dirY, [255, 210, 0], arrowLen);
    } else if (port.kind === "output") {
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

function drawMiniMap(map, player, config, feedback) {
  const { tileSize, mapCols, mapRows, mapOriginX, mapOriginY } = config;

  const miniMaxSize = 140;
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

  noStroke();
  
  const miniPlayerX = miniX + ((player.x - mapOriginX) / tileSize) * miniTile;
  const miniPlayerY = miniY + ((player.y - mapOriginY) / tileSize) * miniTile;

  noStroke();
  fill(255, 0, 0);
  rect(miniPlayerX - 2, miniPlayerY - 2, 4, 4);

  drawModificationRangeIndicator(config, feedback);

  noStroke();
  fill(255, 0, 0);
  
  drawPlayerSprite(player, config.tileSize);
}

function getOrBuildWorldLayer(state) {
  const cache = state.renderCache;
  if (cache.worldLayer) {
    return cache.worldLayer;
  }

  const { config, map } = state;
  const { tileSize, mapCols, mapRows } = config;
  const layer = createGraphics(mapCols * tileSize, mapRows * tileSize);
  layer.noStroke();

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

      // Then draw specific resource node deposit images on top if they exist
      let depositImg = null; // Reset depositImg for each tile
      if (tile.type === "iron") depositImg = ironDepositImg;
      else if (tile.type === "copper") depositImg = copperDepositImg;
      // else if (tile.type === "helium3") depositImg = heliumDepositImg;

      if (depositImg) {
        // Draw deposit overlay on top of the base terrain tile.
        layer.image(depositImg, px, py, tileSize, tileSize);
      }
    }
  }

  cache.worldLayer = layer;
  return layer;
}

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
      const tileColor = getTileBaseColor(tile);
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
  backButtonSettings.draw();
  drawSettingsUI();
}

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

function getEntityDisplayName(entityType) {
  const idx = HOTBAR_ENTITY_TYPES.indexOf(entityType);
  if (idx >= 0) {
    return HOTBAR_BUILDING_NAMES[idx];
  }
  return entityType ? String(entityType) : "Building";
}

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

function isMouseOverSidebarResourceIcon() {
  return !!getHoveredSidebarResourceItem();
}

function drawSidebarResourceHoverTooltip(hoveredItem) {
  if (!hoveredItem || !hoveredItem.resourceType) {
    return false;
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

function drawSideBar() {
  if (!drawGame.state) return;

  const { tileSize, mapCols, mapRows, margin, topMargin } = drawGame.state.config;
  let mapX = margin;
  let mapY = topMargin;
  let mapW = mapCols * tileSize;
  let mapH = mapRows * tileSize;

  let target = isSidebarOpen ? mapX : mapX - sidebarWidth;
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
  let tabX = sidebarX + sidebarWidth;
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

function getSelectedHotbarItem() {
  if (selectedHotbarSlot < 0 || selectedHotbarSlot >= hotbarItems.length) {
    return null;
  }
  return hotbarItems[selectedHotbarSlot];
}

function getHotbarLayout() {
  const slotSize = 42;
  const gap = 8;
  const totalWidth = hotbarSlots * slotSize + (hotbarSlots - 1) * gap;
  const startX = width / 2 - totalWidth / 2;
  const y = height - 60;
  return { slotSize, gap, totalWidth, startX, y };
}

function isMouseOverHotbarArea() {
  const { slotSize, totalWidth, startX, y } = getHotbarLayout();
  return (
    mouseY >= y - 4 &&
    mouseY <= y + slotSize + 8 &&
    mouseX >= startX - 8 &&
    mouseX <= startX + totalWidth + 8
  );
}

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

function getHotbarTooltipDescription(entityType) {
  if (typeof ENTITY_HOTBAR_DESCRIPTIONS === "undefined" || !entityType) {
    return "";
  }
  const description = ENTITY_HOTBAR_DESCRIPTIONS[entityType];
  return typeof description === "string" ? description : "";
}

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

function cyclePlacementFacing() {
  if (!drawGame.state) {
    return;
  }
  const order = ["E", "S", "W", "N"];
  const cur = drawGame.state.placementFacing || "E";
  const i = order.indexOf(cur);
  drawGame.state.placementFacing = order[(i + 1) % order.length];
}

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

function pickContrastingTextColor(rgb) {
  const lum = 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2];
  return lum > 140 ? [24, 24, 32] : [255, 255, 255];
}

function drawPlacedBuildingLetter(px, py, tileSize, building) {
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
  text(building.label || building.letter || "??", 0, 0);
  pop();
  textStyle(NORMAL);
}

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

function drawPlacementPorts(
  ports,
  tileSize,
  originX = 0,
  originY = 0,
  baseCol = null,
  baseRow = null
) {
  const arrowLen = tileSize * 0.45;
  const headLen = 6;
  const headWidth = 6;

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

    if (port.kind === "input") {
      dirX = -dirX;
      dirY = -dirY;
      drawArrow(portPx, portPy, dirX, dirY, [255, 165, 0]);
    } else if (port.kind === "output") {
      drawArrow(portPx, portPy, dirX, dirY, [0, 200, 0]);
    } else if (port.kind === "both") {
      drawArrow(portPx, portPy, dirX, dirY, [60, 190, 190]);
      drawArrow(portPx, portPy, -dirX, -dirY, [60, 190, 190]);
    }
  }
}

function drawPlacementPortTileHighlights(
  ports,
  tileSize,
  originX = 0,
  originY = 0,
  baseCol = null,
  baseRow = null
) {
  const colorForKind = (kind) => {
    if (kind === "input") return [255, 170, 0];
    if (kind === "output") return [60, 210, 90];
    return [60, 190, 190];
  };

  noStroke();
  for (const port of ports) {
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

function drawBuildingPlacementHologram(
  px,
  py,
  tileSize,
  colorRgb,
  label,
  facing,
  entityType,
  options,
  baseCol = null,
  baseRow = null
) {
  const cx = px + tileSize / 2;
  const cy = py + tileSize / 2;
  const footprintOffsets = getSafeFootprintOffsets(entityType);
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
  // Offsets are in tile-center coordinates; convert to local rect top-left.
  const footprintLeft = (minOffsetX - 0.5) * tileSize;
  const footprintTop = (minOffsetY - 0.5) * tileSize;
  const footprintWidth = footprintWidthTiles * tileSize;
  const footprintHeight = footprintHeightTiles * tileSize;
  const previewOptions = {
    ...(options || {}),
    facing: facing || ((options && options.facing) || "E")
  };
  const ports = getPlacementPreviewPorts(entityType, previewOptions);

  if (ports.length) {
    drawPlacementPortTileHighlights(ports, tileSize, cx, cy, baseCol, baseRow);
  }

  push();
  translate(cx, cy);
  rotate(facingToAngle(facing));
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
  fill(35, 35, 42, 200);
  noStroke();
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(label, 0, 0);
  pop();

  if (ports.length) {
    drawPlacementPorts(ports, tileSize, cx, cy, baseCol, baseRow);
  }
  textStyle(NORMAL);
}

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
  const footprintOffsets = getSafeFootprintOffsets(tile.building.entityType);
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
  rect(left - 2, top - 2, widthTiles * tileSize + 4, heightTiles * tileSize + 4, 4);
}

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

function getMapHoverTooltipLabel(tile) {
  const buildingName = getPlacedBuildingDisplayName(tile);
  if (buildingName) {
    return buildingName;
  }
  return getResourceDisplayName(tile);
}

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

function isPointerOverMinimap() {
  if (!drawGame.state) {
    return false;
  }
  const { mapCols, mapRows } = drawGame.state.config;
  const miniMaxSize = 140;
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

function isMouseOverResourceTooltipBlockers() {
  if (backButtonGame.isHovered() || isPointerOverMinimap() || isMouseOverSidebarResourceIcon()) {
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

  const hit = getTileAtScreenPosition(mouseX, mouseY);
  const label = hit ? getMapHoverTooltipLabel(hit.tile) : null;
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
  return getTileBaseColor(tile);
}

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

function triggerModificationRangeBlink() {
  if (!drawGame.state) {
    return;
  }

  drawGame.state.feedback.rangeBlinkUntil = millis() + 600;
}

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

function mousePressed() {
  if (currentState == "MENU") {
    startButton.checkClick();
    settingsButton.checkClick();
    escapeButton.checkClick();
    return;
  } else if (currentState == "SETTINGS") {
    backButtonSettings.checkClick();
    return;
  }

  if (currentState != "GAME") return;

  // Sidebar tab
  let tabW = 25;
  let tabH = 60;
  let tabX = sidebarX + sidebarWidth;
  
  // Sidebar fix
  let mapY = drawGame.state ? drawGame.state.config.topMargin : 80;
  let tabY = 425 / 2 - tabH / 2 + mapY;
  
  if (mouseX > tabX && mouseX < tabX + tabW && mouseY > tabY && mouseY < tabY + tabH) {
    isSidebarOpen = !isSidebarOpen;
    return;
  }

  // UI back button
  if (backButtonGame.isHovered()) {
    backButtonGame.checkClick();
    return;
  }

  // Prevent accidentally placing buildings when clicking the hotbar/minimap
  if (isMouseOverHotbarArea() || isPointerOverMinimap()) {
    return;
  }

  // Try to place an entity
  placeSelectedEntityAtMouse();
}

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
  const footprintTiles = getSafeFootprintTilesAt(type, tileX, tileY);

  for (const entry of footprintTiles) {
    if (
      entry.x < 0 ||
      entry.x >= mapCols ||
      entry.y < 0 ||
      entry.y >= mapRows
    ) {
      return;
    }
    if (!isTileWithinModificationRange(entry.y, entry.x)) {
      triggerModificationRangeBlink();
      return;
    }
    const occupiedTile = map.tiles[entry.y][entry.x];
    if (occupiedTile.entityId !== null) {
      return;
    }
  }

  const tile = map.tiles[tileY][tileX];

  // Build placement options based on entity type and tile
  const options = getPlacementOptionsForTile(type, tile);
  const isRestrictedMode = !!drawGame.state.isRestrictedMode;
  if (isRestrictedMode) {
    const restrictedInventory = getRestrictedModeShuttleInventory();
    const missingResources = getMissingBuildResources(type, restrictedInventory);
    if (missingResources.length > 0) {
      triggerBuildCostFeedback(type, missingResources);
      return;
    }
    spendBuildResources(restrictedInventory, type);
  }

  const newEntity = createEntity(type, tileX, tileY, options);
  newEntity.state.facing = drawGame.state.placementFacing || "E";

  entities.push(newEntity);

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


function keyPressed() {
  if (currentState != "GAME") {
    return;
  }

  if (
    (key === "p" || key === "P") &&
    keyIsDown(CONTROL) &&
    keyIsDown(SHIFT)
  ) {
    if (drawGame.state && drawGame.state.isRestrictedMode) {
      if (
        typeof DevCheckpoint !== "undefined" &&
        typeof DevCheckpoint.applyRestrictedLateGameSkip === "function"
      ) {
        DevCheckpoint.applyRestrictedLateGameSkip();
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
      hoveredEntity.state.shape = hoveredEntity.state.shape === TUBE_SHAPES.CORNER
        ? TUBE_SHAPES.STRAIGHT
        : TUBE_SHAPES.CORNER;
      updateConnections(drawGame.state.entities);
    }
  } else if (key === 'r' || key === 'R') {
    if (selectedHotbarSlot >= 0 && getSelectedHotbarItem()) {
      cyclePlacementFacing();
    } else if (hoveredEntity && hoveredEntity.type === ENTITY_TYPES.TUBE) {
      const order = ["E", "S", "W", "N"];
      const current = hoveredEntity.state.facing || "E";
      const index = order.indexOf(current);
      const next = index === -1 ? "E" : order[(index + 1) % order.length];
      hoveredEntity.state.facing = next;
      syncTileBuildingFacing(hoveredEntity);
      updateConnections(drawGame.state.entities);
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
      hoveredEntity.state.facing = next;
      syncTileBuildingFacing(hoveredEntity);
      updateConnections(drawGame.state.entities);
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
    const index = entities.findIndex((entry) => entry.id === targetId);
    if (index !== -1) {
      if (drawGame.state.isRestrictedMode && targetEntity) {
        const restrictedInventory = getRestrictedModeShuttleInventory();
        refundBuildResources(restrictedInventory, targetEntity.type);
      }
      entities.splice(index, 1);
    }
    if (targetEntity) {
      const footprintTiles = getSafeFootprintTilesAt(
        targetEntity.type,
        targetEntity.tileX,
        targetEntity.tileY
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
    } else {
      hit.tile.entityId = null;
      hit.tile.entity = null;
      hit.tile.item = null;
      hit.tile.colorOverride = null;
      if (hit.tile.building && hit.tile.building.entityId === targetId) {
        hit.tile.building = null;
      }
    }
  } else if (hit.tile.building) {
    hit.tile.building = null;
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
}

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

function repairEntityUnderMouse() {
  const entity = getEntityUnderMouse();
  if (!entity) return;

  entity.state.isBroken = false;
  entity.state.isOn = true;
  console.log("Repaired entity:", entity);
}

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

function inspectEntityUnderMouse() {
  const entity = getEntityUnderMouse();
  if (!entity) return;

  console.log("Inspect entity:", JSON.parse(JSON.stringify(entity)));
}

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

function updateConnections(entities) {
  refreshEntityConnectionStates(entities);
  updateSplitterMergerRates(entities);
  refreshEntityConnectionStates(entities);
  updateSmelterInputs(entities);
  updateConstructorInputs(entities);
  refreshEntityConnectionStates(entities);
}

function logConnectionDebug(entities) {
  const tubes = [];
  const splitters = [];
  const smelters = [];

  for (const entity of entities) {
    if (entity.type === ENTITY_TYPES.TUBE) {
      tubes.push({
        id: entity.id,
        at: `${entity.tileX},${entity.tileY}`,
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
        inputRate: entity.state.inputRate ?? 0,
        outputRate: entity.state.outputRate ?? 0,
        outputType: entity.state.outputType || null,
        isActive: !!entity.state.isActive
      });
    } else if (entity.type === ENTITY_TYPES.SMELTER) {
      smelters.push({
        id: entity.id,
        at: `${entity.tileX},${entity.tileY}`,
        inputRate: entity.state.inputRate ?? 0,
        outputRate: entity.state.outputRate ?? 0,
        inputType: entity.state.inputType || null,
        outputType: entity.state.outputType || null,
        isOn: !!entity.state.isOn
      });
    }
  }

  console.log("Connection debug:", {
    tubes,
    splitters,
    smelters
  });
}

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

  return inputs;
}

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

function updateSplitterMergerRates(entities) {
  const incoming = new Map();
  const outgoingCount = new Map();
  const incomingKeys = new Set();
  const outgoingKeys = new Set();

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

  for (const entity of entities) {
    if (
      entity.type !== ENTITY_TYPES.SPLITTER &&
      entity.type !== ENTITY_TYPES.MERGER
    ) {
      continue;
    }

    const inputs = incoming.get(entity.id) || [];
    const totalRate = inputs.reduce((sum, entry) => sum + entry.rate, 0);
    const types = inputs.map((entry) => entry.outputType).filter(Boolean);
    const sharedType = types.length > 0 && types.every((type) => type === types[0])
      ? types[0]
      : null;

    if (entity.type === ENTITY_TYPES.SPLITTER) {
      const outputCount = outgoingCount.get(entity.id) || 0;
      const perOutputRate = outputCount > 0 ? totalRate / outputCount : 0;
      entity.state.inputRate = totalRate;
      entity.state.outputRate = sharedType ? perOutputRate : 0;
      entity.state.outputType = sharedType;
      entity.state.isActive = !!sharedType && totalRate > 0;
    } else {
      entity.state.inputRate = totalRate;
      entity.state.outputRate = sharedType ? totalRate : 0;
      entity.state.outputType = sharedType;
      entity.state.isActive = !!sharedType && totalRate > 0;
    }
  }
}

class Button {
  constructor(x, y, w, h, label, onClick) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.label = label;
    this.onClick = onClick;
  }

  isHovered() {
    return mouseX > this.x && mouseX < this.x + this.w &&
           mouseY > this.y && mouseY < this.y + this.h;
  }

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

    rect(this.x, this.y, this.w, this.h, 4);

    fill(30, 30, 30);
    noStroke();
    textSize(20);
    textStyle(NORMAL);
    textAlign(CENTER, CENTER);
    text(this.label, this.x + this.w / 2, this.y + this.h / 2);

    pop();
  }

  checkClick() {
    if (this.isHovered()) {
      this.onClick();
    }
  }
}
