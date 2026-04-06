let currentState = "MENU";
let startButton, settingsButton, backButtonGame, backButtonSettings, escapeButton, debugButton;
let titlePage, settingsPage;
let selectedHotbarSlot = 0;
const hotbarSlots = 9;
let isSidebarOpen = false; 
let sidebarX = 20 - 80; // start hidden to the left
let sidebarWidth = 70; 

let iron = 0;
let copper = 0;
let helium = 0;

const hotbarItems = [
  { kind: "paint", color: [255, 80, 80], shape: "circle", name: "Red Paint" },
  { kind: "paint", color: [80, 200, 120], shape: "triangle", name: "Green Paint" },
  { kind: "paint", color: [80, 140, 255], shape: "square", name: "Blue Paint" },
  null,
  null,
  null,
  null,
  null,
  null
];

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

function setup() {
  createCanvas(500, 500);
  textAlign(CENTER, CENTER);
  startButton = new Button (65, 300, 150, 50, "Start", () => {
    currentState = "GAME";
  });
  debugButton = new Button (175, 25, 100, 50, "Debug", () => {
      iron += 1;
      copper += 1;
      helium += 1;
  });
  settingsButton = new Button(65, 350, 150, 50, "Settings", () => {
    currentState = "SETTINGS";
  });
  backButtonGame = new Button(30, 20, 100, 40, "<-- Back", () => {
    currentState = "MENU";
  });
  backButtonSettings = new Button(280, 390, 100, 40, "<- Return", () => {
    currentState = "MENU";
  });
  escapeButton = new Button(65, 400, 150, 50, "Quit", () => {
    window.close();
  });
  setupSettings();
}

function preload() {
  titlePage = loadImage('resources/Title.jpg');
  settingsPage = loadImage('resources/Settings.jpg');
  
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

  // Draw the background image
  if (titlePage) {
    image(titlePage, 0, 0, width, height);
  }

  push(); // Save current drawing style

  // Set style for button outlines
  noFill();
  stroke(0);
  strokeWeight(3);

  // Draw buttons
  startButton.draw();
  settingsButton.draw();
  escapeButton.draw();

  // Draw a rectangle around all buttons (from start to escape)
  rect(
    startButton.x,
    startButton.y,
    startButton.w,
    (escapeButton.y + escapeButton.h) - startButton.y,
    2
  );

  // Draw a separate rectangle around the settings button
  // -------- May want to change this later --------
  rect(
    settingsButton.x,
    settingsButton.y,
    settingsButton.w,
    50,
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
          item: null,
          colorOverride: null,
          entity: null
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

    // Optional resource patches for testing
    tiles[6][6].type = "iron";
    tiles[10][12].type = "copper";
    tiles[18][20].type = "helium3";

    // Placeholder until entities.js integration
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
      }
    };
  }

  const { config, map, player, feedback } = drawGame.state;
  const { tileSize, mapCols, mapRows, mapOriginX, mapOriginY, modificationRadiusTiles } = config;

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

  const cameraX = player.x - width / 2;
  const cameraY = player.y - height / 2;

  push();
  translate(-cameraX, -cameraY);


  push();
  stroke(200);
  strokeWeight(1);
  for (let y = 0; y < mapRows; y++) {
    for (let x = 0; x < mapCols; x++) {
      const tile = map.tiles[y][x];
      const tileColor = getTileRenderColor(tile);
      fill(tileColor[0], tileColor[1], tileColor[2]);
      rect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
  pop();

  pop();

  drawMiniMap(map, player, config, feedback);
  backButtonGame.draw();
  drawHotbar();
}

function drawEntities(entities, tileSize) {
  textAlign(CENTER, CENTER);
  textSize(10);

  for (const entity of entities) {
    const px = entity.tileX * tileSize;
    const py = entity.tileY * tileSize;

    stroke(50);

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

    rect(px + 4, py + 4, tileSize - 8, tileSize - 8, 4);

    // Broken overlay
    if (entity.state.isBroken) {
      stroke(255, 0, 0);
      strokeWeight(3);
      line(px + 6, py + 6, px + tileSize - 6, py + tileSize - 6);
      line(px + tileSize - 6, py + 6, px + 6, py + tileSize - 6);
      strokeWeight(1);
    }

    // Small on/off indicator
    noStroke();
    fill(entity.state.isOn ? color(0, 220, 0) : color(220, 0, 0));
    circle(px + tileSize - 8, py + 8, 8);

    fill(20);
    noStroke();
    text(getEntityShortLabel(entity.type), px + tileSize / 2, py + tileSize / 2);
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
  }
  push();
  fill("#445072");
  stroke(0);
  strokeWeight(2);
  rect(width/2 - 135, height/2 - 85, 270, 270);
  pop();
  backButtonSettings.draw();
  drawSettingsUI();
}

function drawSideBar() {
  // Ensure config is initialized before drawing sidebar
  if (!drawGame.state) return;

  // Get map dimensions and position from config
  const { tileSize, mapCols, mapRows, margin, topMargin } = drawGame.state.config;
  let mapX = margin;
  let mapY = topMargin;
  let mapW = mapCols * tileSize;
  let mapH = mapRows * tileSize;

  // Sidebar animation when opening/closing
  let target = isSidebarOpen ? mapX : mapX - sidebarWidth;
  sidebarX = lerp(sidebarX, target, 0.15);

  // Clip to map area so sidebar doesn't draw over hotbar or back button
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(mapX, mapY, mapW, mapH);
  drawingContext.clip();

  // Sidebar background
  fill (240, 240, 245, 240);
  stroke(180);
  strokeWeight(2);
  rect(sidebarX, mapY, sidebarWidth, 175);
  
  // Sidebar items
  fill(255, 200, 100);
  noStroke();
  let h = mapY + 20;
  let ironName = 0;
  let copperName = 1;
  let heliumName = 2;
  // Loop through 3 items and draw them in the sidebar
  for (let i = 0; i < 3; i++) {
    let rX = sidebarX + 17.5;
    let rY = h;
    let rSize = 37.5;
    if (ironName == i) {
      fill(67, 67, 65);
    } else if (copperName == i) {
      fill(255, 215, 0);
    } else if (heliumName == i) {
      fill(0, 200, 255);
    }

    rect(rX, rY, rSize, rSize, 4);

    fill(255);
    textAlign(RIGHT, BOTTOM);
    textSize(12);

    let centerX = rX + (rSize / 2) + 17;
    let centerY = rY + (rSize / 2) + 17;
    if (ironName == i) {
      text(iron + "x", centerX, centerY);
    } else if (copperName == i) {
      text(copper + "x", centerX, centerY);
    } else if (heliumName == i) {
      text(helium + "x", centerX, centerY);
    }

    fill(255, 200, 100);
    h += 50;
  }

  drawingContext.restore();
  textAlign(CENTER, CENTER);

  let tabW = 25;
  let tabH = 60;
  let tabX = sidebarX + sidebarWidth;
  let tabY = 175 / 2;
  let isTabHovered = mouseX > tabX && mouseX < tabX + tabW &&
                     mouseY > tabY && mouseY < tabY + tabH;

  if (isTabHovered) {
    fill(220, 220, 250);
    cursor('pointer');
  } else {
    fill(255);
    if (!backButtonGame.isHovered()) {
      cursor('default');
    }
  }

  // Draw the tab to open/close the sidebar
  stroke(180);
  strokeWeight(2);
  rect(tabX, tabY, tabW, tabH, 0, 10, 10, 0);

  // Draw the arrow on the tab
  fill(50);
  noStroke();
  textSize(18);
  if (isSidebarOpen) {
    text("<", tabX + tabW / 2, tabY + tabH / 2);
    debugButton.draw();
  } else {
    text(">", tabX + tabW / 2, tabY + tabH / 2);
  }
}

function getSelectedHotbarItem() {
  if (selectedHotbarSlot < 0 || selectedHotbarSlot >= hotbarItems.length) {
    return null;
  }
  return hotbarItems[selectedHotbarSlot];
}

function getTileBaseColor(tile) {
  if (tile.type === "dirt") {
    return [150, 120, 80];
  }
  return [240, 240, 245];
}

function getTileRenderColor(tile) {
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

function applyHotbarItemToTile(tile, hotbarItem) {
  if (!hotbarItem || !tile) {
    return;
  }

  if (hotbarItem.kind === "paint") {
    tile.colorOverride = hotbarItem.color.slice();
  }
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

    fill(30);
    noStroke();
    textSize(12);
    textStyle(NORMAL);
    text(i + 1, x + slotSize / 2, y + slotSize - 8);
  }
}

function mousePressed() {
  if (currentState == "MENU") {
    startButton.checkClick();
    settingsButton.checkClick();
  } else if (currentState == "GAME") {
    let tabW = 25;
    let tabH = 60;
    let tabX = sidebarX + sidebarWidth;
    let tabY = 175 / 2;
    if (mouseX > tabX && mouseX < tabX + tabW && mouseY > tabY && mouseY < tabY + tabH) {
      isSidebarOpen = !isSidebarOpen;
      return;
    }

    if (isSidebarOpen) {
      debugButton.checkClick();
    }
    backButtonGame.checkClick();
    if (backButtonGame.isHovered()) {
      backButtonGame.checkClick();
      return;
    }

    const selectedItem = getSelectedHotbarItem();
    if (!selectedItem) {
      return;
    }

    const hit = getTileAtScreenPosition(mouseX, mouseY);
    if (!hit) {
      return;
    }

    if (!isTileWithinModificationRange(hit.row, hit.col)) {
      triggerModificationRangeBlink();
      return;
    }

    applyHotbarItemToTile(hit.tile, selectedItem);
  } else if (currentState == "SETTINGS") {
    backButtonGame.checkClick();
    backButtonSettings.checkClick();
  }

  if (currentState == "SETTINGS") {
    backButtonGame.checkClick();
    return;
  }

  if (currentState != "GAME") return;

  // UI back button first
  if (backButtonGame.isHovered()) {
    backButtonGame.checkClick();
    return;
  }

  placeSelectedEntityAtMouse();
}

function placeSelectedEntityAtMouse() {
  if (!drawGame.state) return;
  if (selectedHotbarSlot < 0) return;

  const { config, map, entities, player } = drawGame.state;
  const { tileSize, mapCols, mapRows, mapOriginX, mapOriginY } = config;

  const cameraX = player.x - width / 2;
  const cameraY = player.y - height / 2;

  const worldMouseX = mouseX + cameraX;
  const worldMouseY = mouseY + cameraY;

  const tileX = floor((worldMouseX - mapOriginX) / tileSize);
  const tileY = floor((worldMouseY - mapOriginY) / tileSize);

  if (tileX < 0 || tileX >= mapCols || tileY < 0 || tileY >= mapRows) return;

  const tile = map.tiles[tileY][tileX];
  if (tile.entityId !== null) return;

  const type = HOTBAR_ENTITY_TYPES[selectedHotbarSlot];
  const options = getPlacementOptionsForTile(type, tile);

  const newEntity = createEntity(type, tileX, tileY, options);

  // Minimal testing behavior:
  // place most buildings broken first if you want to test repair flow,
  // but leave tubes on by default.
  if (
    type === ENTITY_TYPES.MINER ||
    type === ENTITY_TYPES.SMELTER ||
    type === ENTITY_TYPES.CONSTRUCTOR ||
    type === ENTITY_TYPES.EXTRACTOR
  ) {
    newEntity.state.isBroken = false;
    newEntity.state.isOn = true;
  }

  entities.push(newEntity);
  tile.entityId = newEntity.id;
  tile.item = type;

  refreshEntityConnectionStates(entities);

  console.log("Placed entity:", newEntity);
}

function getPlacementOptionsForTile(type, tile) {
  if (type === ENTITY_TYPES.MINER) {
    if (tile.type === "copper") {
      return { resourceType: "copperOre", tier: 1 };
    }
    return { resourceType: "ironOre", tier: 1 };
  }

  if (type === ENTITY_TYPES.EXTRACTOR) {
    return { resourceType: "helium3" };
  }

  if (type === ENTITY_TYPES.CONSTRUCTOR) {
    return { chosenOutput: "ironPlate" };
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
    repairEntityUnderMouse();
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

  entity.state.isOn = !entity.state.isOn;
  console.log("Toggled entity:", entity);
}

function inspectEntityUnderMouse() {
  const entity = getEntityUnderMouse();
  if (!entity) return;

  console.log("Inspect entity:", entity);
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
  if (tile.entityId === null) return null;

  return getEntityById(entities, tile.entityId);
}

class Button {
  constructor(x, y, w, h, label, onClick) {
    // Position and size
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    // Button text and click behavior
    this.label = label;
    this.onClick = onClick;
  }

  isHovered() {
    // Check if mouse is inside button area
    return mouseX > this.x && mouseX < this.x + this.w &&
           mouseY > this.y && mouseY < this.y + this.h;
  }

  draw() {
    push();

    // Change appearance when hovered
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

    // Draw button rectangle
    rect(this.x, this.y, this.w, this.h, 4);

    // Draw button label
    fill(30, 30, 30);
    noStroke();
    textSize(20);
    textStyle(NORMAL);
    textAlign(CENTER, CENTER);
    text(this.label, this.x + this.w / 2, this.y + this.h / 2);

    pop();
  }

  checkClick() {
    // Run the assigned function if button is clicked
    if (this.isHovered()) {
      this.onClick();
    }
  }
}
