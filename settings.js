let musicSlider, modeToggleTrack, modeToggleKnob;
let musicVolume = 0.5; // Default music volume (50%)
let restrictedModeEnabled = false; // false = Creative, true = Restricted

function isRestrictedModeEnabled() {
  return restrictedModeEnabled;
}

function toggleRestrictedMode() {
  restrictedModeEnabled = !restrictedModeEnabled;
  updateModeToggleVisual();
}

function updateModeToggleVisual() {
  if (!modeToggleTrack || !modeToggleKnob) {
    return;
  }

  modeToggleTrack.style("background", restrictedModeEnabled ? "#7a4db3" : "#d9d9df");
  modeToggleKnob.style("left", restrictedModeEnabled ? "27px" : "3px");
}

function setupSettings() {
  // Create music volume slider (range 0-1)
  musicSlider = createSlider(0, 1, 0.5, 0.01);
  musicSlider.hide(); // Hide until settings menu is shown

  // Update music volume when slider changes
  musicSlider.input(() => {
    musicVolume = musicSlider.value();
  });

  // Game mode toggle switch (track + dot)
  modeToggleTrack = createDiv("");
  modeToggleTrack.hide();
  modeToggleTrack.style("position", "absolute");
  modeToggleTrack.style("width", "48px");
  modeToggleTrack.style("height", "24px");
  modeToggleTrack.style("border-radius", "999px");
  modeToggleTrack.style("cursor", "pointer");
  modeToggleTrack.style("box-shadow", "inset 0 0 0 2px rgba(0,0,0,0.18)");

  modeToggleKnob = createDiv("");
  modeToggleKnob.parent(modeToggleTrack);
  modeToggleKnob.style("position", "absolute");
  modeToggleKnob.style("top", "3px");
  modeToggleKnob.style("width", "18px");
  modeToggleKnob.style("height", "18px");
  modeToggleKnob.style("border-radius", "50%");
  modeToggleKnob.style("background", "#ffffff");
  modeToggleKnob.style("box-shadow", "0 1px 4px rgba(0,0,0,0.35)");
  modeToggleKnob.style("transition", "left 0.12s ease");
  modeToggleKnob.style("pointer-events", "none");

  modeToggleTrack.mousePressed(toggleRestrictedMode);
  updateModeToggleVisual();
}

function drawSettingsUI() {
  if (musicSlider && modeToggleTrack && modeToggleKnob) {
    const panelX = width / 4;
    const panelY = 190;
    const panelW = width / 2;
    const panelH = height / 2;
    const centerX = panelX + panelW / 2;
    const canvasPos = canvas.position();

    const modeRowY = panelY + 56;

    // Game mode section
    push();
    fill(10);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(19);
    text("Game Mode", centerX, modeRowY);
    pop();

    // Binary mode toggle aligned with game mode section
    const modeToggleX = centerX - 24;
    const modeToggleY = modeRowY + 24;
    modeToggleTrack.show();
    modeToggleTrack.position(canvasPos.x + modeToggleX, canvasPos.y + modeToggleY);
    updateModeToggleVisual();

    push();
    fill(10);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(14);
    text("Creative", modeToggleX - 74, modeToggleY + 12);
    textAlign(RIGHT, CENTER);
    text("Restricted", modeToggleX + 48 + 74, modeToggleY + 12);
    pop();

    // MUSIC slider moved slightly up
    const sliderWidth = panelW - 80;
    const sliderX = panelX + (panelW - sliderWidth) / 2;
    const sliderY = panelY + panelH - 105;

    musicSlider.show();
    musicSlider.style('width', sliderWidth + 'px');
    musicSlider.position(canvasPos.x + sliderX, canvasPos.y + sliderY);

    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    text("Music Volume", centerX, sliderY - 20);
    text(`${(musicVolume * 100).toFixed(0)}%`, centerX, sliderY + 26);
  }
}

function hideSettingsUI() {
  // Hide controls when leaving settings menu
  if (musicSlider) musicSlider.hide();
  if (modeToggleTrack) modeToggleTrack.hide();
}
