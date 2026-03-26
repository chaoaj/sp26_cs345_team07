let currentState = "MENU";
let startButton, settingsButton, backButton;

function setup() {
  createCanvas(500, 500);
  textAlign(CENTER, CENTER);
  startButton = new Button (width / 2 - 100, height / 2 - 20, 200, 50, "Start", () => {
    currentState = "GAME";
  });
  settingsButton = new Button(width / 2 - 100, height / 2 + 50, 200, 50, "Settings", () => {
    currentState = "GAME";
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
        row.push({ type: "empty", item: null });
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
        mapOriginY: 0
      },
      map: { tiles },
      player: {
        x: tileSize * 5,
        y: tileSize * 5,
        size: 16,
        speed: 180
      }
    };
  }

  const { config, map, player } = drawGame.state;
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
      } else {
        fill(240, 240, 245);
      }
      rect(tileX, tileY, tileSize, tileSize);
    }
  }

  pop();

  noStroke();
  fill(255, 0, 0);
  rect(
    width / 2 - player.size / 2,
    height / 2 - player.size / 2,
    player.size,
    player.size
  );

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
      if (tile.type === "dirt") {
        fill(150, 120, 80);
      } else {
        fill(230, 230, 235);
      }
      rect(miniX + x * miniTile, miniY + y * miniTile, miniTile, miniTile);
    }
  }

  const miniPlayerX = miniX + ((player.x - mapOriginX) / tileSize) * miniTile;
  const miniPlayerY = miniY + ((player.y - mapOriginY) / tileSize) * miniTile;
  noStroke();
  fill(255, 0, 0);
  rect(miniPlayerX - 2, miniPlayerY - 2, 4, 4);

  backButton.draw();
}

function drawSettings() {
  backButton.draw();
}

function mousePressed() {
  if (currentState == "MENU") {
    startButton.checkClick();
    settingsButton.checkClick();
  } else if (currentState == "GAME" || currentState == "SETTINGS") {
    backButton.checkClick();
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
           mouseY < this.y && mouseY < this.y + this.h;
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
