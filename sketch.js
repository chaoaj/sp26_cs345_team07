let currentState = "MENU";
let startButton, settingsButton, backButton;
let selectedHotbarSlot = 0;
const hotbarSlots = 9;
let isSidebarOpen = false;
let sidebarX = 20 - 160;
let sidebarWidth = 160;

function setup() {
  createCanvas(500, 500);
  textAlign(CENTER, CENTER);
  startButton = new Button (width / 2 - 100, height / 2 - 20, 200, 50, "Start", () => {
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
  if (!drawGame.map) {
    drawGame.config = {
      tileSize: 32,
      mapCols: 14,
      mapRows: 10,
      margin: 20,
      topMargin: 80
    };

    const { mapCols, mapRows } = drawGame.config;
    const tiles = [];

    for (let y = 0; y < mapRows; y++) {
      const row = [];
      for (let x = 0; x < mapCols; x++) {
        row.push({ type: "empty", item: null });
      }
      tiles.push(row);
    }

    drawGame.map = { tiles };
  }

  const { tileSize, mapCols, mapRows, margin, topMargin } = drawGame.config;
  const startX = margin;
  const startY = topMargin;

  stroke(200);
  fill(240, 240, 245);
  for (let y = 0; y < mapRows; y++) {
    for (let x = 0; x < mapCols; x++) {
      const tileX = startX + x * tileSize;
      const tileY = startY + y * tileSize;
      rect(tileX, tileY, tileSize, tileSize);
    }
  }

  backButton.draw();
  drawHotbar();
  drawSideBar();
}

function drawSettings() {
  backButton.draw();
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
  let iron = 0;
  let copper = 1;
  let Helium = 2;
  let item = "";
  // Loop through 3 items and draw them in the sidebar
  for (let i = 0; i < 3; i++) {
    rect(sidebarX + 20, h, 32, 32, 4);

    fill(50);
    textSize(14);
    textAlign(LEFT, CENTER);
    textStyle(NORMAL);
    if (iron == i) {
      item = "Iron Ore";
    } else if (copper == i) {
      item = "Copper Ore";
    } else if (Helium == i) {
      item = "Helium-3";
    }
    text(item, sidebarX + 65, h + 16);

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
    if (!backButton.isHovered()) {
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

    backButton.checkClick();
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
