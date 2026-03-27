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
