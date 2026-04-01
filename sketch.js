let currentState = "MENU";
let startButton, settingsButton, backButton;
let selectedHotbarSlot = 0;
const hotbarSlots = 9;

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

  startButton = new Button(width / 2 - 100, height / 2 - 20, 200, 50, "Start", () => {
    currentState = "GAME";
  });

  settingsButton = new Button(width / 2 - 100, height / 2 + 50, 200, 50, "Settings", () => {
    currentState = "SETTINGS";
  });

  backButton = new Button(30, 30, 100, 40, "<-- Back", () => {
    currentState = "MENU";
  });
}

function draw() {
  background(220);

  if (currentState == "MENU") {
    drawMenu();
  } else if (currentState == "GAME") {
    drawGame();
  } else if (currentState == "SETTINGS") {
    drawSettings();
  }
}

function drawMenu() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(24);
  textStyle(BOLD);
  text("Helium-3", width / 2, 150);

  startButton.draw();
  settingsButton.draw();
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
          entityId: null
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

    const entities = createStarterEntities();

    // Stamp starter entities onto tiles
    for (const entity of entities) {
      if (
        entity.tileY >= 0 && entity.tileY < mapRows &&
        entity.tileX >= 0 && entity.tileX < mapCols
      ) {
        tiles[entity.tileY][entity.tileX].entityId = entity.id;
        tiles[entity.tileY][entity.tileX].item = entity.type;
      }
    }

    drawGame.state = {
      config: {
        tileSize,
        mapCols,
        mapRows,
        mapOriginX: 0,
        mapOriginY: 0
      },
      map: { tiles },
      entities,
      player: {
        x: tileSize * 5,
        y: tileSize * 5,
        size: 16,
        speed: 180
      }
    };
  }

  const { config, map, player, entities } = drawGame.state;
  const { tileSize, mapCols, mapRows, mapOriginX, mapOriginY } = config;

  let moveX = 0;
  let moveY = 0;
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) moveX -= 1;
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) moveX += 1;
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) moveY -= 1;
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) moveY += 1;

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

  const viewLeft = cameraX;
  const viewTop = cameraY;
  const viewRight = cameraX + width;
  const viewBottom = cameraY + height;
  const startCol = max(0, floor((viewLeft - mapOriginX) / tileSize));
  const endCol = min(mapCols - 1, ceil((viewRight - mapOriginX) / tileSize) - 1);
  const startRow = max(0, floor((viewTop - mapOriginY) / tileSize));
  const endRow = min(mapRows - 1, ceil((viewBottom - mapOriginY) / tileSize) - 1);

  stroke(200);

  for (let y = startRow; y <= endRow; y++) {
    for (let x = startCol; x <= endCol; x++) {
      const tileX = mapOriginX + x * tileSize;
      const tileY = mapOriginY + y * tileSize;
      const tile = map.tiles[y][x];

      if (tile.type === "dirt") {
        fill(150, 120, 80);
      } else if (tile.type === "iron") {
        fill(130, 130, 145);
      } else if (tile.type === "copper") {
        fill(184, 115, 51);
      } else if (tile.type === "helium3") {
        fill(170, 220, 255);
      } else {
        fill(240, 240, 245);
      }

      rect(tileX, tileY, tileSize, tileSize);
    }
  }

  drawEntities(entities, tileSize);

  // placement preview
  drawPlacementPreview(cameraX, cameraY);

  pop();

  // Player stays centered on screen
  noStroke();
  fill(255, 0, 0);
  rect(
    width / 2 - player.size / 2,
    height / 2 - player.size / 2,
    player.size,
    player.size
  );

  drawMiniMap(map, player, config);
  backButton.draw();
  drawHotbar();
  drawSelectedBlockLabel();
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

function drawMiniMap(map, player, config) {
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
      if (tile.type === "dirt") fill(150, 120, 80);
      else if (tile.type === "iron") fill(130, 130, 145);
      else if (tile.type === "copper") fill(184, 115, 51);
      else if (tile.type === "helium3") fill(170, 220, 255);
      else fill(230, 230, 235);

      rect(miniX + x * miniTile, miniY + y * miniTile, miniTile, miniTile);
    }
  }

  const miniPlayerX = miniX + ((player.x - mapOriginX) / tileSize) * miniTile;
  const miniPlayerY = miniY + ((player.y - mapOriginY) / tileSize) * miniTile;

  noStroke();
  fill(255, 0, 0);
  rect(miniPlayerX - 2, miniPlayerY - 2, 4, 4);
}

function drawPlacementPreview(cameraX, cameraY) {
  if (selectedHotbarSlot < 0) return;
  if (!drawGame.state) return;

  const { config, map } = drawGame.state;
  const { tileSize, mapCols, mapRows, mapOriginX, mapOriginY } = config;

  const worldMouseX = mouseX + cameraX;
  const worldMouseY = mouseY + cameraY;
  const tileX = floor((worldMouseX - mapOriginX) / tileSize);
  const tileY = floor((worldMouseY - mapOriginY) / tileSize);

  if (tileX < 0 || tileX >= mapCols || tileY < 0 || tileY >= mapRows) return;

  const tile = map.tiles[tileY][tileX];
  const canPlace = tile.entityId === null;

  noFill();
  stroke(canPlace ? color(0, 255, 0) : color(255, 0, 0));
  strokeWeight(2);
  rect(tileX * tileSize, tileY * tileSize, tileSize, tileSize);
  strokeWeight(1);
}

function drawSelectedBlockLabel() {
  fill(20);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);

  const label = selectedHotbarSlot >= 0
    ? `Selected: ${HOTBAR_ENTITY_TYPES[selectedHotbarSlot]}`
    : "Selected: none";

  text(label, 12, height - 90);
}

function drawSettings() {
  backButton.draw();
}

function drawHotbar() {
  let slotSize = 42;
  let gap = 8;
  let totalWidth = hotbarSlots * slotSize + (hotbarSlots - 1) * gap;
  let startX = width / 2 - totalWidth / 2;
  let y = height - 60;

  for (let i = 0; i < hotbarSlots; i++) {
    let x = startX + i * (slotSize + gap);

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

    fill(30);
    noStroke();
    textSize(16);
    textStyle(NORMAL);
    text(i + 1, x + slotSize / 2, y + slotSize / 2);
  }
}

function mousePressed() {
  if (currentState == "MENU") {
    startButton.checkClick();
    settingsButton.checkClick();
    return;
  }

  if (currentState == "SETTINGS") {
    backButton.checkClick();
    return;
  }

  if (currentState != "GAME") return;

  // UI back button first
  if (backButton.isHovered()) {
    backButton.checkClick();
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
      selectedHotbarSlot = -1; // deselect
    } else {
      selectedHotbarSlot = slot; // select new slot
    }
  } else if (keyCode === LEFT_ARROW) {
    selectedHotbarSlot--;
    if (selectedHotbarSlot < 0) {
      selectedHotbarSlot = hotbarSlots - 1;
    }
  } else if (keyCode === RIGHT_ARROW) {
    selectedHotbarSlot++;
    if (selectedHotbarSlot >= hotbarSlots) {
      selectedHotbarSlot = 0;
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
    const hovered = this.isHovered();

    push();
    rectMode(CORNER);
    textAlign(CENTER, CENTER);

    if (hovered) {
      fill(220, 220, 250);
      cursor('pointer');
    } else {
      fill(255);
    }

    rect(this.x, this.y, this.w, this.h, 10);

    fill(30, 30, 50);
    textSize(24);
    textStyle(NORMAL);
    text(this.label, this.x + this.w / 2, this.y + this.h / 2);
    pop();

    if (!hovered && currentState != "MENU" && !backButton.isHovered()) {
      cursor('default');
    } else if (!hovered && currentState == "MENU" && !startButton.isHovered() && !settingsButton.isHovered()) {
      cursor('default');
    }
  }

  checkClick() {
    if (this.isHovered()) {
      this.onClick();
    }
  }
}
