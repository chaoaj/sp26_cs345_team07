// sketch.js
let currentState = "MENU";
let startButton, settingsButton, backButtonGame, backButtonSettings, escapeButton;
let titlePage, settingsPage;
let selectedHotbarSlot = 0;
const hotbarSlots = 9;
let canvas;
let isSidebarOpen = false; 
let sidebarX = -70; // start hidden to the left
let sidebarWidth = 70; 
let ironOreImg, ironBarImg, ironPlateImg;
let copperOreImg, copperBarImg, copperPlateImg, copperWireImg;
let heliumImg, modularComponentImg;
let sideBarFrameImg, sideBarTabOpen, sideBarTabClosed;

let ironOre = 0, ironBar = 0, ironPlate = 0;
let copperOre = 0, copperBar = 0, copperPlate = 0, copperWire = 0;
let helium = 0, rocketFuel = 0;
let modularComponent = 0, shipAlloy = 0, electronics = 0;

function getEntityFillRgb(entityType) {
  if (entityType === ENTITY_TYPES.MINER) return [90, 170, 90];
  if (entityType === ENTITY_TYPES.SMELTER) return [200, 120, 80];
  if (entityType === ENTITY_TYPES.CONSTRUCTOR) return [90, 140, 220];
  if (entityType === ENTITY_TYPES.TUBE) return [120, 120, 120];
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
  ENTITY_TYPES.SHUTTLE,
  ENTITY_TYPES.ROCKET_SITE,
  ENTITY_TYPES.SPLITTER,
  ENTITY_TYPES.MERGER,
  ENTITY_TYPES.EXTRACTOR
];

const HOTBAR_BUILDING_NAMES = [
  "Miner",
  "Smelter",
  "Constructor",
  "Tube",
  "Shuttle",
  "Rocket site",
  "Splitter",
  "Merger",
  "Extractor"
];

const hotbarItems = HOTBAR_ENTITY_TYPES.map((entityType, i) => ({
  kind: "building",
  entityType,
  name: HOTBAR_BUILDING_NAMES[i],
  color: getEntityFillRgb(entityType),
  shape: "square"
}));

function setup() {
  canvas = createCanvas(600, 600);
  centerCanvas();
  textAlign(CENTER, CENTER);
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
  sideBarFrameImg = loadImage('resources/UI/sideBarFrame.png');
  sideBarTabOpen = loadImage('resources/UI/sidebarTabOpen.png');
  sideBarTabClosed = loadImage('resources/UI/sidebarTabClosed.png');
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
  background(220);
  cursor('default');
  if (currentState == "MENU") {
    drawMenu();
    hideSettingsUI();
  } else if (currentState == "GAME") {
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
  if (!drawGame.state) {
    const tileSize = 32;
    const mapCols = 25;
    const mapRows = 25;
    const tiles = [];

    for (let y = 0; y < mapRows; y++) {
      const row = [];
      for (let x = 0; x < mapCols; x++) {
        row.push({
          type: "empty",
          resource: null,
          item: null,
          colorOverride: null,
          entityId: null,
          building: null
        });
      }
      tiles.push(row);
    }

    // Resource patches for testing
    tiles[6][6].type = "iron";
    tiles[6][7].type = "iron";
    tiles[10][12].type = "copper";
    tiles[11][12].type = "copper";
    tiles[18][17].type = "helium3";
    tiles[18][18].type = "helium3";
    tiles[19][17].type = "helium3";
    tiles[19][18].type = "helium3";
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

    setResourceNode(6, 6, "iron");
    setResourceNode(11, 7, "iron");
    setResourceNode(17, 18, "iron");
    setResourceNode(9, 19, "iron");
    setResourceNode(10, 12, "copper");
    setResourceNode(14, 10, "copper");
    setResourceNode(7, 20, "copper");
    setResourceNode(19, 14, "copper");
    setResourceNode(18, 20, "helium3");
    setResourceNode(5, 15, "helium3");
    setResourceNode(20, 8, "helium3");
    setResourceNode(13, 5, "helium3");

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
        size: 16,
        speed: 180
      },
      feedback: {
        rangeBlinkUntil: 0
      },
      placementFacing: "E",
      selectedBuilding: null
    };
  }

  const { config, map, player, feedback, entities } = drawGame.state;
  const { tileSize, mapCols, mapRows, mapOriginX, mapOriginY, modificationRadiusTiles } = config;

  if (drawGame.state.placementFacing == null) {
    drawGame.state.placementFacing = "E";
  }
  if (drawGame.state.selectedBuilding === undefined) {
    drawGame.state.selectedBuilding = null;
  }

  let moveX = 0;
  let moveY = 0;
  if (keyIsDown(65)) moveX -= 1;
  if (keyIsDown(68)) moveX += 1;
  if (keyIsDown(87)) moveY -= 1;
  if (keyIsDown(83)) moveY += 1;

  const dt = min(0.05, deltaTime / 1000);
  if (moveX !== 0 || moveY !== 0) {
    const len = Math.hypot(moveX, moveY);
    const speed = player.speed * dt;
    player.x += (moveX / len) * speed;
    player.y += (moveY / len) * speed;
  }

  const mapWidth = mapCols * tileSize;
  const mapHeight = mapRows * tileSize;
  const halfPlayer = player.size / 2;
  player.x = constrain(player.x, mapOriginX + halfPlayer, mapOriginX + mapWidth - halfPlayer);
  player.y = constrain(player.y, mapOriginY + halfPlayer, mapOriginY + mapHeight - halfPlayer);

  // --- Miner harvesting tick ---
  updateMinerHarvesting(entities, dt);

  const cameraX = player.x - width / 2;
  const cameraY = player.y - height / 2;

  push();
  translate(-cameraX, -cameraY);

  // Draw tiles
  push();
  stroke(200);
  strokeWeight(1);
  for (let y = 0; y < mapRows; y++) {
    for (let x = 0; x < mapCols; x++) {
      const tile = map.tiles[y][x];
      const tileColor = getTileRenderColor(tile);
      fill(tileColor[0], tileColor[1], tileColor[2]);
      rect(x * tileSize, y * tileSize, tileSize, tileSize);
      if (tile.building) {
        const px = x * tileSize;
        const py = y * tileSize;
        drawPlacedBuildingLetter(px, py, tileSize, tile.building);
      }
    }
  }
  pop();

  drawSelectedBuildingHighlight(map, tileSize);

  drawEntities(entities, tileSize);

  const item = selectedHotbarSlot >= 0 ? getSelectedHotbarItem() : null;
  if (item && !isMouseOverHotbarArea()) {
    const holoHit = getTileAtScreenPosition(mouseX, mouseY);
    if (holoHit && !isResourceNodeTile(holoHit.tile)) {
      const hpx = holoHit.col * tileSize;
      const hpy = holoHit.row * tileSize;
      drawBuildingPlacementHologram(
        hpx,
        hpy,
        tileSize,
        item.color,
        hotbarItemLabel(item),
        drawGame.state.placementFacing || "E"
      );
    }
  }

  pop();

  drawMiniMap(map, player, config, feedback);
  backButtonGame.draw();
  drawHotbar();
  drawResourceHoverTooltip();
}

/**
 * Draw a small colored dot in the top-left corner of resource tiles.
 * Green if a miner is placed on it, red otherwise.
 */
function drawResourceNodeIndicator(tileX, tileY, tile, tileSize) {
  const px = tileX * tileSize;
  const py = tileY * tileSize;

  const hasMiner = tile.entityId !== null && tile.entity !== null;

  noStroke();
  if (hasMiner) {
    fill(0, 220, 0); // green = miner placed, ON
  } else {
    fill(220, 0, 0); // red = no miner, available node
  }
  circle(px + 6, py + 6, 8);
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

    // Add to global resource counters
    switch (entity.state.outputType) {
      case RESOURCE_TYPES.IRON_ORE:
        ironOre += produced;
        break;
      case RESOURCE_TYPES.COPPER_ORE:
        copperOre += produced;
        break;
      case RESOURCE_TYPES.HELIUM3:
        helium += produced;
        break;
    }
  }
}

function drawEntities(entities, tileSize, map) {
  textAlign(CENTER, CENTER);
  textSize(10);

  for (const entity of entities) {
    const px = entity.tileX * tileSize;
    const py = entity.tileY * tileSize;

    stroke(50);
    strokeWeight(1);

    if (entity.type === ENTITY_TYPES.MINER) fill(90, 170, 90);
    else if (entity.type === ENTITY_TYPES.SMELTER) fill(200, 120, 80);
    else if (entity.type === ENTITY_TYPES.CONSTRUCTOR) fill(90, 140, 220);
    else if (entity.type === ENTITY_TYPES.TUBE) fill(120, 120, 120);
    else if (entity.type === ENTITY_TYPES.SHUTTLE) fill(230, 230, 120);
    else if (entity.type === ENTITY_TYPES.ROCKET_SITE) fill(180, 180, 255);
    else if (entity.type === ENTITY_TYPES.SPLITTER) fill(180, 120, 220);
    else if (entity.type === ENTITY_TYPES.MERGER) fill(120, 220, 180);
    else if (entity.type === ENTITY_TYPES.EXTRACTOR) fill(120, 255, 255);
    else fill(200);
    const rgb = getEntityFillRgb(entity.type);
    fill(rgb[0], rgb[1], rgb[2]);

    rect(px + 4, py + 4, tileSize - 8, tileSize - 8, 4);

    if (entity.state.isBroken) {
      stroke(255, 0, 0);
      strokeWeight(3);
      line(px + 6, py + 6, px + tileSize - 6, py + tileSize - 6);
      line(px + tileSize - 6, py + 6, px + 6, py + tileSize - 6);
      strokeWeight(1);
    }

    // Small on/off indicator (top-right corner)
    noStroke();
    const powerOn =
      entity.state.isOn != null ? entity.state.isOn : entity.state.isActive;
    fill(powerOn ? color(0, 220, 0) : color(220, 0, 0));
    circle(px + tileSize - 8, py + 8, 8);

    // Draw output port indicators (green circles at port positions)
    drawEntityPorts(entity, tileSize);

    // Draw label
    fill(20);
    noStroke();
    text(getEntityShortLabel(entity.type), px + tileSize / 2, py + tileSize / 2);
  }
}

/**
 * Draw port indicators for an entity.
 * Output ports are shown as green circles, input ports as orange circles.
 * These appear on the adjacent tile where a tube should connect.
 */
function drawEntityPorts(entity, tileSize) {
  const ports = getEntityConnectionPorts(entity);

  for (const port of ports) {
    const portPx = port.worldX * tileSize + tileSize / 2;
    const portPy = port.worldY * tileSize + tileSize / 2;

    noStroke();
    if (port.kind === "output") {
      // Green circle for output port
      fill(0, 200, 0, 180);
    } else {
      // Orange circle for input port
      fill(255, 165, 0, 180);
    }
    circle(portPx, portPy, 10);

    // Small direction arrow or letter
    fill(255);
    textSize(7);
    if (port.kind === "output") {
      text("O", portPx, portPy);
    } else {
      text("I", portPx, portPy);
    }
    textSize(10);
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

  stroke(210);
  strokeWeight(1);
  for (let y = 0; y < mapRows; y++) {
    for (let x = 0; x < mapCols; x++) {
      const tile = map.tiles[y][x];
      const tileColor = getTileRenderColor(tile);
      fill(tileColor[0], tileColor[1], tileColor[2]);
      rect(miniX + x * miniTile, miniY + y * miniTile, miniTile, miniTile);
    }
  }

  noStroke();
  
  const miniPlayerX = miniX + ((player.x - mapOriginX) / tileSize) * miniTile;
  const miniPlayerY = miniY + ((player.y - mapOriginY) / tileSize) * miniTile;

  noStroke();
  fill(255, 0, 0);
  rect(miniPlayerX - 2, miniPlayerY - 2, 4, 4);

  drawModificationRangeIndicator(config, feedback);

  noStroke();
  fill(255, 0, 0);
  rect(
    width / 2 - player.size / 2,
    height / 2 - player.size / 2,
    player.size,
    player.size
  );

  backButtonGame.draw();
  drawHotbar();
  drawSideBar();
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

function drawSideBar() {
  if (!drawGame.state) return;

  const { tileSize, mapCols, mapRows, margin, topMargin } = drawGame.state.config;
  let mapX = margin;
  let mapY = topMargin;
  let mapW = mapCols * tileSize;
  let mapH = mapRows * tileSize;

  let target = isSidebarOpen ? mapX : mapX - sidebarWidth;
  sidebarX = lerp(sidebarX, target, 0.15);

  image(sideBarFrameImg, sidebarX, mapY, sidebarWidth + 7, 435);

  // Clip to map area so sidebar doesn't draw over hotbar or back button
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(mapX, mapY, mapW, mapH);
  drawingContext.clip();

  // 1. Define our sidebar data dynamically each frame
  const sidebarItems = [
    { img: ironOreImg, count: ironOre },
    { img: ironBarImg, count: ironBar },
    { img: ironPlateImg, count: ironPlate },
    { img: copperOreImg, count: copperOre },
    { img: copperBarImg, count: copperBar },
    { img: copperPlateImg, count: copperPlate },
    { img: copperWireImg, count: copperWire },
    { img: heliumImg, count: helium },
    { img: electronicsImg, count: electronics },
    { img: modularComponentImg, count: modularComponent }
  ];

  fill(255, 200, 100);
  noStroke();
  let h = mapY + 20;

  // 2. Loop through the array directly, removing all the if/else chains
  for (let i = 0; i < sidebarItems.length; i++) {
    let item = sidebarItems[i];
    let rX = sidebarX + 17.5;
    let rY = h;
    let rSize = 35;
    
    // Draw Icon
    image(item.img, rX, rY, rSize, rSize);

    // Draw Text
    textAlign(RIGHT, BOTTOM);
    let centerX = rX + (rSize / 2) + 17;
    let centerY = rY + (rSize / 2) + 17;
    
    sideBarText(item.count);
    text(item.count, centerX, centerY);

    // Reset styles for next item
    noStroke();
    textStyle(NORMAL);
    fill(255, 200, 100);
    h += 40;
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
}

/**
function drawSideBar() {
  if (!drawGame.state) return;

  const { tileSize, mapCols, mapRows, margin, topMargin } = drawGame.state.config;
  let mapX = margin;
  let mapY = topMargin;
  let mapW = mapCols * tileSize;
  let mapH = mapRows * tileSize;

  let target = isSidebarOpen ? mapX : mapX - sidebarWidth;
  sidebarX = lerp(sidebarX, target, 0.15);

  image(sideBarFrameImg, sidebarX, mapY, sidebarWidth + 7, 435);

  // Clip to map area so sidebar doesn't draw over hotbar or back button
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(mapX, mapY, mapW, mapH);
  drawingContext.clip();

  // Sidebar items
  fill(255, 200, 100);
  noStroke();
  let h = mapY + 20;
  let ironOreName = 0;
  let ironBarName = 1;
  let ironPlateName = 2;
  let copperOreName = 3;
  let copperBarName = 4;
  let copperPlateName = 5;
  let copperWireName = 6;
  let heliumName = 7;
  let electronicsName = 8;
  let modularComponentName = 9;
  // Loop through 10 items and draw them in the sidebar
  for (let i = 0; i < 10; i++) {
    let rX = sidebarX + 17.5;
    let rY = h;
    let rSize = 35;
    if (ironOreName == i) {
      image(ironOreImg, rX, rY, rSize, rSize);
    } else if (ironBarName == i) {
      image(ironBarImg, rX, rY, rSize, rSize);
    } else if (ironPlateName == i) {
      image(ironPlateImg, rX, rY, rSize, rSize);
    } else if (copperOreName == i) {
      image(copperOreImg, rX, rY, rSize, rSize);
    } else if (copperBarName == i) {
      image(copperBarImg, rX, rY, rSize, rSize);
    } else if (copperPlateName == i) {
      image(copperPlateImg, rX, rY, rSize, rSize);
    } else if (copperWireName == i) {
      image(copperWireImg, rX, rY, rSize, rSize);
    } else if (heliumName == i) {
      image(heliumImg, rX, rY, rSize, rSize);
    } else if (electronicsName == i) {
      image(electronicsImg, rX, rY, rSize, rSize);
    } else if (modularComponentName == i) {
      image(modularComponentImg, rX, rY, rSize, rSize);
    }

    fill(0);
    textAlign(RIGHT, BOTTOM);

    let centerX = rX + (rSize / 2) + 17;
    let centerY = rY + (rSize / 2) + 17;

    if (ironOreName == i) {
      sideBarText(ironOre);
      text(ironOre, centerX, centerY);
    } else if (ironBarName == i) {
      sideBarText(ironBar);
      text(ironBar, centerX, centerY);
    } else if (ironPlateName == i) {
      sideBarText(ironPlate);
      text(ironPlate, centerX, centerY);
    } else if (copperOreName == i) {
      sideBarText(copperOre);
      text(copperOre, centerX, centerY);
    } else if (copperBarName == i) {
      sideBarText(copperBar);
      text(copperBar, centerX, centerY);
    } else if (copperPlateName == i) {
      sideBarText(copperPlate);
      text(copperPlate, centerX, centerY);
    } else if (copperWireName == i) {
      sideBarText(copperWire);
      text(copperWire, centerX, centerY);
    } else if (heliumName == i) {
      sideBarText(helium);
      text(helium, centerX, centerY);
    } else if (electronicsName == i) {
      sideBarText(electronics);
      text(electronics, centerX, centerY);
    } else if (modularComponentName == i) {
      sideBarText(modularComponent);
      text(modularComponent, centerX, centerY);
    }

    noStroke();
    textStyle(NORMAL);
    fill(255, 200, 100);
    h += 40;
  }

  drawingContext.restore();
  textAlign(CENTER, CENTER);

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
}
*/

function getSelectedHotbarItem() {
  if (selectedHotbarSlot < 0 || selectedHotbarSlot >= hotbarItems.length) {
    return null;
  }
  return hotbarItems[selectedHotbarSlot];
}

function isMouseOverHotbarArea() {
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

function drawBuildingPlacementHologram(px, py, tileSize, colorRgb, label, facing) {
  const cx = px + tileSize / 2;
  const cy = py + tileSize / 2;
  push();
  translate(cx, cy);
  rotate(facingToAngle(facing));
  stroke(colorRgb[0] * 0.45, colorRgb[1] * 0.45, colorRgb[2] * 0.45, 200);
  strokeWeight(2);
  fill(colorRgb[0], colorRgb[1], colorRgb[2], 100);
  rect(-tileSize / 2 + 3, -tileSize / 2 + 3, tileSize - 6, tileSize - 6, 4);
  fill(35, 35, 42, 200);
  noStroke();
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(label, 0, 0);
  pop();
  textStyle(NORMAL);
}

function placeBuildingFromHotbar(tile, hotbarItem, row, col) {
  if (!hotbarItem || !tile || hotbarItem.kind !== "building") {
    return;
  }
  if (isResourceNodeTile(tile)) {
    return;
  }
  tile.building = {
    color: hotbarItem.color.slice(),
    label: hotbarItemLabel(hotbarItem),
    name: hotbarItem.name,
    entityType: hotbarItem.entityType,
    facing: drawGame.state.placementFacing || "E"
  };
  tile.colorOverride = null;
  if (drawGame.state) {
    drawGame.state.selectedBuilding = { row, col };
  }
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
  const px = sel.col * tileSize;
  const py = sel.row * tileSize;
  noFill();
  stroke(255, 210, 60);
  strokeWeight(2.5);
  rect(px - 2, py - 2, tileSize + 4, tileSize + 4, 4);
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
  if (tile.type === "iron") {
    return [196, 198, 206];
  }
  if (tile.type === "copper") {
    return [201, 125, 55];
  }
  if (tile.type === "helium3") {
    return [130, 245, 255];
  }
  if (tile.type === "iron") {
    return [196, 198, 206];
  }
  if (tile.type === "copper") {
    return [201, 125, 55];
  }
  if (tile.type === "helium3") {
    return [130, 245, 255];
  }
  return [240, 240, 245];
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
  if (backButtonGame.isHovered() || isPointerOverMinimap()) {
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

function getTileRenderColor(tile) {
  if (tile.building) {
    return tile.building.color;
  }
  if (tile.colorOverride) {
    return tile.colorOverride;
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

function getPlayerTilePosition() {
  if (!drawGame.state) {
    return null;
  }

  const { config, player } = drawGame.state;
  const { tileSize, mapOriginX, mapOriginY } = config;

  return {
    col: floor((player.x - mapOriginX) / tileSize),
    row: floor((player.y - mapOriginY) / tileSize)
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
  let slotSize = 42;
  let gap = 8;
  let totalWidth = hotbarSlots * slotSize + (hotbarSlots - 1) * gap;
  let startX = width / 2 - totalWidth / 2;
  let y = height - 60;

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

      if (item.shape === "circle") {
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
    textStyle(NORMAL);
    text(i + 1, x + slotSize / 2, y + slotSize - 8);

    // Draw entity type label below slot number
    if (HOTBAR_ENTITY_TYPES[i]) {
      fill(80);
      textSize(7);
      text(getEntityShortLabel(HOTBAR_ENTITY_TYPES[i]), x + slotSize / 2, y - 6);
    }
  }
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

  // Check modification range
  if (!isTileWithinModificationRange(tileY, tileX)) {
    triggerModificationRangeBlink();
    return;
  }

  const tile = map.tiles[tileY][tileX];

  // Don't place on occupied tiles
  if (tile.entityId !== null) return;

  const type = HOTBAR_ENTITY_TYPES[selectedHotbarSlot];
  if (!type) return;

  // Build placement options based on entity type and tile
  const options = getPlacementOptionsForTile(type, tile);

  const newEntity = createEntity(type, tileX, tileY, options);

  entities.push(newEntity);
  tile.entityId = newEntity.id;
  tile.entity = newEntity;
  tile.item = type;

  refreshEntityConnectionStates(entities);

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

  if (type === ENTITY_TYPES.EXTRACTOR) {
    return { resourceType: "helium3" };
  }

  return {};
}

function keyPressed() {
  if (currentState != "GAME") {
    return;
  }

  if (key >= '1' && key <= '9') {
    let slot = int(key) - 1;

    if (selectedHotbarSlot === slot) {
      selectedHotbarSlot = -1;
    } else {
      selectedHotbarSlot = slot;
    }
  } else if (key === 'r' || key === 'R') {
    if (selectedHotbarSlot >= 0 && getSelectedHotbarItem()) {
      cyclePlacementFacing();
    } else {
      repairEntityUnderMouse();
    }
  } else if (key === 'i' || key === 'I') {
    inspectEntityUnderMouse();
  } else if (key === 'o' || key === 'O') {
    toggleEntityUnderMouse();
  }
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