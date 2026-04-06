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
  // Only draw if sliders exist
  if (musicSlider && sfxSlider) {

    // Show and position music slider
    musicSlider.show();
    musicSlider.position(125, 200);
    musicSlider.style('width', '250px');
    musicSlider.style('height', '20px');

    // Show and position SFX slider
    sfxSlider.show();
    sfxSlider.position(125, 270);
    sfxSlider.style('width', '250px');
    sfxSlider.style('height', '20px');

    // Set text style
    fill(0);
    noStroke();
    textSize(16);

    // Label for music
    text("Music Volume", 200, 195);

    // Show music volume as percentage below slider
    text(
      `${(musicVolume * 100).toFixed(0)}%`,
      musicSlider.x + musicSlider.width / 2,
      musicSlider.y + 30
    );

    // Label for SFX
    text("SFX Volume", 200, 265);

    // Show SFX volume as percentage below slider
    text(
      `${(sfxVolume * 100).toFixed(0)}%`,
      sfxSlider.x + sfxSlider.width / 2,
      sfxSlider.y + 30
    );
  }
  
}

function hideSettingsUI() {
  // Hide sliders when leaving settings menu
  if (musicSlider) musicSlider.hide();
  if (sfxSlider) sfxSlider.hide();
}