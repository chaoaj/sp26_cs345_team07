let currentState = "MENU";
let startButton, settingsButton, backButton;
let selectedHotbarSlot = 0;
const hotbarSlots = 9;

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
          colorOverride: null,
          entity: null
        });
      }
      tiles.push(row);
    }

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

    drawGame.state = {
      config: {
        tileSize,
        mapCols,
        mapRows,
        mapOriginX: 0,
        mapOriginY: 0,
        modificationRadiusTiles: 5
      },
      map: { tiles },
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
      const tileColor = getTileRenderColor(tile);
      fill(tileColor[0], tileColor[1], tileColor[2]);
      rect(tileX, tileY, tileSize, tileSize);
    }
  }

  pop();

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

  backButton.draw();
  drawHotbar();
}

function drawSettings() {
  backButton.draw();
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
    if (backButton.isHovered()) {
      backButton.checkClick();
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
    backButton.checkClick();
  }
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
    if (this.isHovered()) {
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

    if (!this.isHovered() && currentState != "MENU" && !backButton.isHovered()) {
      cursor('default');
    } else if (!this.isHovered() && currentState == "MENU" && !startButton.isHovered() && !settingsButton.isHovered()) {
      cursor('default');
    }
  }

  checkClick() {
    if (this.isHovered()) {
      this.onClick();
    }
  }
}