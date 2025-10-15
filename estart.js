const { app, BrowserWindow, globalShortcut } = require('electron');

const createWindow = () => {
	const win = new BrowserWindow({
		width: 910,
		height: 485,
		frame: false,
		resizable: false,
		webPreferences: { nodeIntegration: true },
	});
	win.setResizable(true);
	win.loadFile('start.html');
	win.setMenuBarVisibility(false); //partially
};

app.whenReady().then(() => {
	createWindow();
});

app.on('ready', () => {
	// Register a shortcut listener for Ctrl + Shift + I
	globalShortcut.register('Control+Shift+I', () => {
		// When the user presses Ctrl + Shift + I, this function will get called
		// You can modify this function to do other things, but if you just want
		// to disable the shortcut, you can just return false
		return false;
	});
});

/*
https://jonathan-so.itch.io/creatorpack/download/eyJleHBpcmVzIjoxNjQ1NzE4Nzc1LCJpZCI6MTM5OTY1fQ%3d%3d%2elygJM1t0pq0hSYvTz9sumiSOmVk%3d
KIIRA from open game art for stone wall background
Thanks to DEEP FOLD from itch io for the planet art
BloodPixelHero FRom free sound for the "magma.wav"
LittleRobotSoundFactory free sound.org the gold collection sound
Trops from free sound for the sad ambient start music
https://freesound.org/people/tyops/sounds/440524/ tyops for music in start story themess
https://freesound.org/people/Prof.Mudkip/sounds/386862/ for the explosion sound
https://freesound.org/people/n_audioman/sounds/273568/ for hurt sound
https://freesound.org/people/n_audioman/sounds/276342/ for boom
https://freesound.org/people/Deathbygeko/sounds/190843/for die sound
https://vectorpixelstar.itch.io/textures for textures
https://opengameart.org/content/dungeon-crawl-32x32-tiles-supplemental
https://freesound.org/people/ryusa/sounds/531176/ for health sound
https://freesound.org/people/ProjectsU012/sounds/341022/ for water sound
*/
