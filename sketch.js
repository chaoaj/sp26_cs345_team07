let currentState = "MENU";
let startButton, settingsButton, backButtonGame, backButtonSettings, escapeButton;
let titlePage, settingsPage;
let selectedHotbarSlot = 0;
const hotbarSlots = 9;
let isSidebarOpen = false; 
let sidebarX = 20 - 80; // start hidden to the left
let sidebarWidth = 70; 

let iron = 0;
let copper = 0;
let helium = 0;

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


  push();
  stroke(200);
  strokeWeight(1);
  for (let y = 0; y < mapRows; y++) {
    for (let x = 0; x < mapCols; x++) {
      const tile = map.tiles[y][x];
      const tileX = x * tileSize;
      const tileY = y * tileSize;
      if (tile.type === "dirt") {
        fill(150, 120, 80);
      } else {
        fill(240, 240, 245);
      }
      rect(tileX, tileY, tileSize, tileSize);
    }
  }
  pop();

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

  noStroke();
  
  const miniPlayerX = miniX + ((player.x - mapOriginX) / tileSize) * miniTile;
  const miniPlayerY = miniY + ((player.y - mapOriginY) / tileSize) * miniTile;
  noStroke();
  fill(255, 0, 0);
  rect(miniPlayerX - 2, miniPlayerY - 2, 4, 4);
  
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
  if (!drawGame.config) return;

  // Get map dimensions and position from config
  const { tileSize, mapCols, mapRows, margin, topMargin } = drawGame.config;
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

function drawHotbar() {
  let slotSize = 42;
  let gap = 8;
  let totalWidth = hotbarSlots * slotSize + (hotbarSlots - 1) * gap;
  let startX = width / 2 - totalWidth / 2;
  let y = height - 60;

  for (let i = 0; i < hotbarSlots; i++) {
    let x = startX + i * (slotSize + gap);``
    push();
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
    pop();
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
    if (mouseX > tabX && mouseX < tabX + tabW && mouseY
      > tabY && mouseY < tabY + tabH) {
      isSidebarOpen = !isSidebarOpen;
      return;
    }

    backButtonGame.checkClick();
    debugButton.checkClick();
  } else if (currentState == "GAME" || currentState == "SETTINGS") {
    backButtonGame.checkClick();
    backButtonSettings.checkClick();
  }
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
  }
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
