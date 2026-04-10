let musicSlider, sfxSlider;
let musicVolume = 0.5; // Default music volume (50%)
let sfxVolume = 0.5;   // Default sound effects volume (50%)

function setupSettings() {
  // Create music volume slider (range 0–1)
  musicSlider = createSlider(0, 1, 0.5, 0.01);
  musicSlider.hide(); // Hide until settings menu is shown

  // Update music volume when slider changes
  musicSlider.input(() => { 
    musicVolume = musicSlider.value(); 
  });

  // Create SFX volume slider (range 0–1)
  sfxSlider = createSlider(0, 1, 0.5, 0.01);
  sfxSlider.hide();

  // Update SFX volume when slider changes
  sfxSlider.input(() => {
    sfxVolume = sfxSlider.value();
  });

}

function drawSettingsUI() {

  if (musicSlider && sfxSlider) {
    let sliderWidth = 240;
    let centerX = width / 2;

    // Get canvas position on the page so sliders align correctly
    let canvasPos = canvas.position();

    // MUSIC slider
    musicSlider.show();
    musicSlider.style('width', sliderWidth + 'px');
    musicSlider.position(canvasPos.x + centerX - sliderWidth / 2, canvasPos.y + 260);

    // SFX slider
    sfxSlider.show();
    sfxSlider.style('width', sliderWidth + 'px');
    sfxSlider.position(canvasPos.x + centerX - sliderWidth / 2, canvasPos.y + 360);

    fill(0);
    noStroke();
    textSize(18);
    textAlign(CENTER);

    text("Music Volume", centerX, 245);
    text(`${(musicVolume * 100).toFixed(0)}%`, centerX, 295);

    text("SFX Volume", centerX, 345);
    text(`${(sfxVolume * 100).toFixed(0)}%`, centerX, 395);
  }
  
}

function hideSettingsUI() {
  // Hide sliders when leaving settings menu
  if (musicSlider) musicSlider.hide();
  if (sfxSlider) sfxSlider.hide();
}