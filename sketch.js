let currentState = "MENU";
let startButton, settingsButton, backButton;

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
      mapRows: 12,
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
