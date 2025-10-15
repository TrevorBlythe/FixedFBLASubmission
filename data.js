var items = [
	{
		name: "nothing",
		image: 9,
		toolNum: 0, // we need this for reasons
		unlocked: 1000,
		price: 0,
		use: function () {},
	},
	{
		//pickaxe
		image: 4,
		name: "pickaxe",
		toolNum: 1, // we need this for reasons
		unlocked: 0,
		price: 50,
		rarity: 10, //higher the rarity the harder it is to spawn, the higher the level, the more rare things spawn
		timeout: false,
		use: function () {
			if (!items[0].timeout) {
				items[0].timeout = true;
				toolCooldown = 10;
				let h = Math.floor(entities[0].x + entities[0].width - 1);
				if (entities[0].flipped) {
					h = Math.floor(entities[0].x);
				}
				let start = Math.floor(entities[0].y - 1);
				let end = Math.floor(entities[0].y + entities[0].height);

				for (var j = 0; j < 5; j++) {
					for (var i = 0; i < end - start + 1; i++) {
						if (particles.length > start + i && particles[0].length > h) {
							if (particles[start + i][h + j * (entities[0].flipped ? -1 : 1)] >= 2) {
								particles[start + i][h + j * (entities[0].flipped ? -1 : 1)] = Math.random() > 0.5 ? 1.5 : 15.5;
								renderPix(start + i, h + j * (entities[0].flipped ? -1 : 1));
							}
						}
					}
				}
				entities.push({
					name: "pick",
					image: 4,
					x: entities[0].x + (entities[0].flipped ? -2 : entities[0].width + 2),
					render: true,
					y: entities[0].y,
					width: 5,
					height: 5,
					yVel: 0,
					xVel: 0,
					gravityOff: true,
					physicsOff: true,
				});
				setTimeout(function () {
					items[0].timeout = false;
					for (var i = 0; i < entities.length; i++) {
						if (entities[i].name === "pick") {
							entities.splice(i, 1);
						}
					}
				}, 150);
			}
		},
	},

	{
		//water rod
		image: 21,
		price: 25,
		unlocked: 0,
		name: "water rod",
		toolNum: 2, // we need this for reasons
		currentLoop: null,
		timeout: 0,
		currentBullet: null, //set to the current index of bullet only one bullet will be out at a time
		use: function () {
			if (!items[2].timeout) {
				items[2].timeout = 1;
				waterNoise.play();
				var i = entities.push({
					name: "water spawner",
					image: 9,
					x: entities[0].x + entities[0].width,
					render: true,
					y: entities[0].y,
					width: 4,
					flipped: 0,
					height: 2,
					yVel: 0,
					xVel: entities[0].flipped ? -5 : 5,
					touchingGround: true,
				});
				items[2].currentBullet = entities[i - 1];
				items[2].currentLoop = setInterval(function () {
					particles[Math.floor(items[2].currentBullet.y)][Math.floor(items[2].currentBullet.x)] = 3.5;
				}, 30);
				setTimeout(function () {
					items[2].timeout = 0;
					clearInterval(items[2].currentLoop);
					items[2].currentBullet = null;
				}, 300);
			}
		},
	},
	{
		//boom stafff
		image: 22,
		price: 75,
		unlocked: 0,
		toolNum: 3, // we need this for reasons

		timeout: 0,
		currentBullet: null, //set to the current index of bullet only one bullet will be out at a time
		tinyBullets: [],

		use: function () {
			if (!items[3].timeout) {
				items[3].timeout = 1;
				var i = entities.push({
					name: "boom staff bullet",
					image: 27,
					x: entities[0].x + entities[0].width,
					render: true,
					y: entities[0].y,
					width: 4,
					flipped: 0,
					height: 2,
					yVel: 0,
					xVel: entities[0].flipped ? -5 : 5,
					touchingGround: true,
				});
				items[3].currentBullet = entities[i - 1];
				setTimeout(function () {
					if (particles[Math.floor(items[3].currentBullet.y)][Math.floor(items[3].currentBullet.x)] >= 1) {
						particles[Math.floor(items[3].currentBullet.y)][Math.floor(items[3].currentBullet.x)] = 16;
					}
					for (let a = 0; a < 3; a++) {
						var e = {
							name: "boom staff bullet two",
							image: 27,
							x: items[3].currentBullet.x + items[3].currentBullet.width / 2,
							render: true,
							y: items[3].currentBullet.y,
							width: 3,
							flipped: 0,
							height: 3,
							yVel: -2 + a,
							xVel: entities[0].flipped ? -3 : 3,
						};
						entities.push(e);
						items[3].tinyBullets.push(e);
					}

					setTimeout(function () {
						for (var h = 0; h < items[3].tinyBullets.length; h++) {
							if (particles[Math.floor(items[3].tinyBullets[h].y)][Math.floor(items[3].tinyBullets[h].x)] >= 1) {
								particles[Math.floor(items[3].tinyBullets[h].y)][Math.floor(items[3].tinyBullets[h].x)] = 16;
							}
							for (var j = entities.length - 1; j >= 3; j--) {
								// if (Math.abs(entities[j].x - items[2].currentBullet.x) < ) {
								// 	if (Math.abs(entities[j].y - items[2].currentBullet.y) < 8) {
								if (
									entities[j].x < items[3].tinyBullets[h].x + items[3].tinyBullets[h].width &&
									entities[j].x + entities[j].width > items[3].tinyBullets[h].x &&
									entities[j].y < items[3].tinyBullets[h].y + items[3].tinyBullets[h].height &&
									entities[j].height + entities[j].y > items[3].tinyBullets[h].y &&
									entities[j] !== items[3].tinyBullets[h]
								) {
									if (entities[j].takeDamage !== undefined) {
										entities[j].takeDamage();
									} else {
										// entities.splice(j, 1);
									}
								}
							}
							entities.splice(entities.indexOf(items[3].tinyBullets[h]), 1);
						}
						items[3].tinyBullets = [];
						items[3].timeout = 0;
					}, 100);

					// for (var j = entities.length - 1; j >= 3; j--) {
					// 	// if (Math.abs(entities[j].x - items[2].currentBullet.x) < ) {
					// 	// 	if (Math.abs(entities[j].y - items[2].currentBullet.y) < 8) {
					// 	if (
					// 		entities[j].x <
					// 			items[3].currentBullet.x + items[3].currentBullet.width &&
					// 		entities[j].x + entities[j].width > items[3].currentBullet.x &&
					// 		entities[j].y <
					// 			items[3].currentBullet.y + items[3].currentBullet.height &&
					// 		entities[j].height + entities[j].y > items[3].currentBullet.y &&
					// 		entities[j] !== items[3].currentBullet
					// 	) {
					// 		if (entities[j].takeDamage !== undefined) {
					// 			entities[j].takeDamage();
					// 		} else {
					// 			// entities.splice(j, 1);
					// 		}
					// 	}
					// }
					entities.splice(entities.indexOf(items[3].currentBullet), 1);
					items[3].currentBullet = null;
					boom.play();
				}, 300);
				cannon.play();
			}
		},
	},
	{
		//vine staff
		name: "vine staff",
		image: 23,
		price: 75,
		timeout: 0,
		unlocked: 0,
		toolNum: 4, // we need this for reasons

		currentGrower: null,
		currentLoop: null,
		use: function () {
			if (!items[3].timeout) {
				entities[0].yVel += -3;
				items[3].timeout = true;
				let i = entities.push({
					name: "vine grower",
					image: 9,
					x: entities[0].x + entities[0].width / 2,
					render: false,
					y: entities[0].y + entities[0].height,
					width: 4,
					flipped: 0,
					height: 2,
					yVel: 0,
					xVel: 0,
					lifeSpan: Math.random() * 10 + 5,
					ticker: 0, //alternates from 0 - 1
					gravityOff: true,
				});
				items[3].currentGrower = entities[i - 1];
				items[3].currentLoop = setInterval(function () {
					entities[0].yVel = Math.max(-3, entities[0].yVel);
					let g = items[3].currentGrower;
					g.ticker = !g.ticker;
					let y = Math.floor(g.y);
					let x = Math.floor(g.x);
					if (Math.floor(particles[y][x]) == 1) {
						if (g.ticker) {
							particles[y][x] = 9.51;
							particles[y][x + 1] = 9.51;
						} else {
							particles[y][x] = 9.51;
							particles[y][x - 1] = 9.51;
						}
					}
					g.y--;
					g.lifeSpan--;
					if (g.lifeSpan < 0) {
						for (var j = entities.length - 1; j >= 3; j--) {
							if (entities[j].name == "vine grower") {
								entities.splice(j, 1);
								clearInterval(items[3].currentLoop);
								setTimeout(function () {
									items[3].timeout = false;
								}, 150);
							}
						}
					}
				}, 10);
				grow.play();
			}
		},
	},
	{
		//health potion : 4
		toolNum: 5, // we need this for reasons
		unlocked: 0,
		price: 50,
		name: "health potion",
		image: 24,
		use: function () {
			entities[0].health++;
			document.getElementById("health").innerHTML = player.health;
			entities[0].inventory[entities[0].iSelected] = items[0];
			setInvImages();

			healthSound.play();
		},
	},
	{
		//sus book : 5
		toolNum: 6, // we need this for reasons
		unlocked: 4,
		price: 50,
		name: "suspicious book....",
		image: 37,
		use: function () {
			let r = Math.floor(Math.random() * (3 - 1 + 1) + 1);
			// r = 5;
			if (r == 1) {
				entities[0].health++;
				healthSound.play();
				document.getElementById("health").innerHTML = player.health;
				chat("The books magic heals you", 2000);
			} else if (r == 2) {
				chat("The books magic hurts you", 2000);
				entities[0].takeDamage();
			} else {
				chat("The books magic turns water into gold", 2000);
				for (var i = Math.floor(Math.max(entities[0].y - 50, 5)); i < Math.min(465, entities[0].y + 50); i++) {
					for (var j = Math.floor(Math.max(entities[0].x - 50, 5)); j < Math.min(395, entities[0].x + 50); j++) {
						if (Math.floor(particles[i][j]) == 3) {
							particles[i][j] = 2;
							renderPix(i, j);
						}
					}
				}
			}

			entities[0].inventory[entities[0].iSelected] = items[0];
			setInvImages();
		},
	},
	{
		//blink : 7
		toolNum: 7, // we need this for reasons
		unlocked: 4,
		price: 100,
		name: "blink spell",
		image: 38,
		uses: 10,
		use: function () {
			this.uses--;
			if (!entities[0].flipped) {
				for (var i = 0; i < 100; i++) {
					var temp = true;
					for (var h = 0; h < player.height - 1; h++) {
						for (var g = 0; g < player.width; g++) {
							if (Math.abs(particles[Math.floor(entities[0].y) + h][Math.floor(entities[0].x) + g + i]) > 2) {
								temp = false;
							}
						}
					}
					if (!temp) {
						entities[0].x += i - 1;
						blinkNoise.play();

						i = 100;
					}
				}
			} else {
				for (var i = 0; i < 100; i++) {
					var temp = true;
					for (var h = 0; h < player.height - 1; h++) {
						for (var g = 0; g < player.width; g++) {
							if (Math.abs(particles[Math.floor(entities[0].y) + h][Math.floor(entities[0].x) + g - i]) > 2) {
								temp = false;
							}
						}
					}
					if (!temp) {
						entities[0].x -= i - 3;
						blinkNoise.play();
						i = 100;
					}
				}
			}
			if (this.uses < 0) {
				entities[0].inventory[entities[0].iSelected] = items[0];
				setInvImages();
			}
		},
	},

	{
		//freeze : 8
		toolNum: 8, // we need this for reasons
		unlocked: 4,
		price: 50,
		name: "freeze potion",
		image: 39,
		use: function () {
			entities[0].health++;
			document.getElementById("health").innerHTML = player.health;

			pProps[5].mixes = [1, 21, 1.5];
			pProps[8].mixes = [1, 21, 1.5];
			chat("everything around you seems to have been iced over", 2000);
			setTimeout(function () {
				delete pProps[5].mixes;
				delete pProps[8].mixes;
			}, 50);

			entities[0].inventory[entities[0].iSelected] = items[0];
			setInvImages();
			healthSound.play();
		},
	},
]; //all the items in the game

var pProps = [
	{
		name: "border",
		bouyancy: 1,
		falls: 0,
		s: "s",
		color: [0, 0, 20],
		radiates: 0,
	}, //0
	//0
	{
		name: "nothing",
		bouyancy: 0,
		falls: 0,
		s: "g",
		radiates: 0,
		color: [50, 50, 50],
		// texture: 12,
		// resx: 16,
		// resy: 16,
	}, //1
	//1
	{
		name: "gold",
		bouyancy: 1,
		falls: 1,
		s: "s",
		color: [255, 255, 0],
		radiates: 0,
		texture: 8,
		resx: 11,
		scale: 1,
		resy: 6,
	},
	//2
	{
		name: "water",
		bouyancy: 0.3,
		falls: 1,
		s: "l",
		mixes: [8, 12.5, 12.5, 9, 9.5, 9.5],
		stateChange: [6, 7, 0.6, 0.4, 0.1],
		color: [0, 0, 255],
		radiates: -0.01,
		mixes: [4, 14.5, 6.5],
	},
	//3
	{
		name: "lava",
		bouyancy: 0.9,
		falls: 1,
		s: "l",
		color: [255, 0, 0],
		stateChange: [4, 14, 1, 0.5, 0.5],
		// texture: 20,
		// resx: 60,
		// resy: 45,
		radiates: 0.4,
	},
	//4
	{
		name: "staticRock",
		bouyancy: 1,
		falls: 0,
		s: "s",
		color: [150, 150, 150],
		texture: 3, //12, //3,
		resx: 16,
		resy: 16,
		scale: 1,
		stateChange: [4, 5, 0.7, -1, 0.001],
		radiates: 0,
	},
	//5
	{
		name: "steam",
		bouyancy: 0.2,
		falls: -1,
		s: "g",
		stateChange: [4, 3, 1, 0.6, 0.0001],
		color: [200, 200, 200],
		radiates: 0,
	},
	//6
	{
		name: "ice",
		bouyancy: 0.2,
		falls: 1,
		s: "s",
		stateChange: [3, 7, 0.2, -0.9, 0.5],
		color: [200, 200, 255],
		radiates: -0.5,
	},
	//7
	{
		name: "dirt",
		bouyancy: 0.8,
		falls: 0,
		s: "s",
		resx: 200,
		resy: 200,
		scale: 4,
		texture: 13,
		color: [210, 105, 30],
		radiates: 0,
	},
	//8
	{
		name: "grass",
		bouyancy: 0.7,
		falls: 0,
		s: "s",
		color: [0, 255, 0],
		radiates: 0,
		stateChange: [13, 9, 0.51, 0, 0.3],
		mixes: [3, 9.5, 9.5],
	},
	//9
	{
		name: "fire",
		bouyancy: 0.9,
		falls: -1,
		s: "g",
		color: [255, 0, 0],
		radiates: 0.2,
		stateChange: [11, 11, 0, 1, 0.1],
	},
	//10
	{
		name: "smoke",
		bouyancy: 1,
		falls: -1,
		s: "g",
		color: [100, 100, 100],
		radiates: 0.05,
		stateChange: [1, 1, 1, 1, 0.11],
	},
	//11
	{
		name: "mud",
		bouyancy: 1,
		falls: 0,
		s: "s",
		color: [101, 67, 33],
		radiates: 0,
		stateChange: [8, 12, 0.7, 0, 0.9],
	},
	//12
	{
		name: "burning",
		bouyancy: 0.5,
		falls: 1,
		s: "g",
		color: [200, 0, 0],
		radiates: 0.1,
		mixes: [1, 13, 10],
		stateChange: [1, 1, 1, 1, 0.5],
	},
	//13
	{
		name: "gravel",
		bouyancy: 1,
		falls: 1,
		s: "s",
		color: [170, 170, 170],
		stateChange: [4, 5, 0.7, 0, 0.1],
		radiates: 0,
	},
	//14
	{
		name: "dust",
		bouyancy: 1,
		falls: -1,
		s: "g",
		color: [170, 170, 170],
		stateChange: [1, 1, 0, 1, 0.1],
		radiates: 0,
	},
	//15

	{
		name: "explosionDense",
		bouyancy: 1,
		falls: 0,
		s: "g",
		color: [245, 19, 2],
		radiates: 0.5,
		mixes: [1, 17.5, 17.5],
	},
	//16
	{
		name: "explosionMedium",
		bouyancy: 0.4,
		falls: 0,
		s: "g",
		color: [212, 66, 17],
		radiates: 0.5,
		mixes: [1, 18.5, 18.5],
	},
	//17
	{
		name: "explosionLight",
		bouyancy: 0,
		falls: 0,
		s: "g",
		color: [219, 150, 11],
		radiates: 0.3,
		mixes: [1, 10.5, 10.5, 8, 1.5, 1.5],
	},
	//18
	{
		name: "brick",
		bouyancy: 1,
		falls: 0,
		s: "s",
		color: [150, 150, 150],
		texture: 30, //12, //3,
		resx: 250,
		resy: 250,
		scale: 5,
		radiates: 0,
		// stateChange: [16, 19, 0, -1, 0.001],
	},
	//19

	{
		name: "poison",
		bouyancy: 1,
		falls: 0,
		s: "g",
		color: [250, 0, 250],
		scale: 5,
		radiates: 0,
		stateChange: [16, 16, 0, 0, 0.001],
		mixes: [3, 2, 2],
	},
	//20
	{
		name: "static ice",
		bouyancy: 0.2,
		falls: 0,
		s: "s",
		stateChange: [3, 7, 0.2, -0.9, 0.5],
		color: [200, 200, 255],
		radiates: -0.5,
	},
	//21
];
/****
 
 Bigger bouyancy means heavier in the direciton it falls.
 
 
 
 **/

let particles = []; // A array containing data about each particle

let frame = {
	x: 0,
	y: 0,
	width: 149,
	height: 80,
};
let canvasOne = document.getElementById("screen");

let canvasOneGraphics = canvasOne.getContext("2d", {
	alpha: "false",
});
let canvasTwo = document.getElementById("screen2");

let canvasTwoGraphics = canvasTwo.getContext("2d", {
	alpha: "false",
});
let canvasThree = document.getElementById("entitiesScreen");

let canvasThreeGraphics = canvasThree.getContext("2d", {
	alpha: "false",
});

let entities = [
	{
		name: "character",
		image: 0,
		x: 5,
		render: true,
		y: 15,
		width: 5,
		flipped: 1,
		height: 5,
		yVel: 0,
		xVel: 0,
		touchingGround: true,
	},
	{
		name: "stairs",
		image: 10,
		x: 3,
		render: true,
		y: 10,
		width: 10,
		gravityOff: true,
		flipped: 1,
		height: 10,
		yVel: 0,
		xVel: 0,
		touchingGround: true,
		physicsOff: true,
	},
];

let images = [
	new Image(), //0
	new Image(), //1
	new Image(),
	new Image(),
	new Image(),
	new Image(),
	new Image(),
	new Image(),
	new Image(), //8
	new Image(), //9
	new Image(), //10
	new Image(), //11
	new Image(), //12
	new Image(), //13
	new Image(), //14
	new Image(), //15
	new Image(), //16
	new Image(), //17
	new Image(), //18
	new Image(), //19

	new Image(), //20
	new Image(), //21

	new Image(), //22

	new Image(), //23

	new Image(), //24

	new Image(), //25
	new Image(), //26

	new Image(), //27

	new Image(), //28
	new Image(), //29

	new Image(), //30

	new Image(), //31

	new Image(), //32

	new Image(), //33
	new Image(), //34

	new Image(), //35
	new Image(), //36
	new Image(), //37
	new Image(), //38

	new Image(), //39
];

images[0].src = "Images/player.png";
images[1].src = "Images/playerFlip.png";
images[2].src = "Images/heart.png";
images[3].src = "Images/rock8bit.jpg";

images[4].src = "Images/pickaxe.png";
images[5].src = "Images/snake.png";
images[6].src = "Images/snakeFlip.png";
images[7].src = "Images/dead.png";
images[8].src = "Images/goldt.png";
images[9].src = "Images/empty.png";
images[10].src = "Images/upStairs.png";
images[11].src = "Images/downStairs.png";
images[12].src = "Images/magma8bit.jpg";
images[13].src = "Images/dirt2.png";
images[14].src = "Images/downStairs1.png";
images[15].src = "Images/downStairs2.png";
images[16].src = "Images/downStairs3.png";
images[17].src = "Images/downStairs4.png";
images[18].src = "Images/downStairs5.png";
images[19].src = "Images/downStairs6.png";
images[20].src = "Images/lava.png";
images[21].src = "Images/water_rod.png";
images[22].src = "Images/boomstaff.png";
images[23].src = "Images/vineStaff.png";

images[24].src = "Images/potion.png";

images[25].src = "Images/eyeball.png";

images[26].src = "Images/eyeballFlipped.png";

images[27].src = "Images/laser.png";

images[28].src = "Images/biter1.png";

images[29].src = "Images/biter2.png";

images[30].src = "Images/bricks.png";

images[31].src = "Images/shop.png";

images[32].src = "Images/poisongrass.png";

images[33].src = "Images/bat.png";

images[34].src = "Images/batFlap.png";

images[35].src = "Images/slime.png";

images[36].src = "Images/slimeFlipped.png";

images[37].src = "Images/book.png";
images[38].src = "Images/blink.png";

images[39].src = "Images/icePotion.png";

for (var i = 0; i < images.length; i++) {
	images[i].style.width = "60px";
	images[i].style.height = "60px";
}

var goldSound = new Audio("music/gold.wav");

var hurtSound = new Audio("music/damage.mp3");

var oneUpSound = new Audio("music/oneup.wav");

var cannon = new Audio("music/cannon.wav");

var grow = new Audio("music/grow.wav");

var healthSound = new Audio("music/health.wav");

var boom = new Audio("music/boom.wav");
boom.volume = 0.5;

var laser = new Audio("music/laser.wav");

var deathNoise = new Audio("music/die.wav");

var waterNoise = new Audio("music/water.wav");

var blinkNoise = new Audio("music/port.wav");

var jumpNoise = new Audio("music/jump.wav");
jumpNoise.volume = 0.4;

try {
	music.play();
} catch (err) {}

var player = entities[0];

var gameloop;
