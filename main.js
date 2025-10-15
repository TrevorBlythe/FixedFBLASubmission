//This will be the main js that utilizes all the classes to run the game
// made by trevor blythe
// canvas width and height will aslways be 900 by 480

document.getElementById("levelCount").innerHTML = "level: " + window.localStorage.level;

var mapWidth = 400;
var mapHeight = 472;

generate(mapWidth, mapHeight);

addDoor();
var music;
if (window.localStorage.level <= 3) {
	generateCave(1, 1, mapWidth, mapHeight, 5);
	spawnSnakes(0.002);
	spawnBats(0.001);
	generateLava();
	generateWater();
	music = new Audio("music/Banger.wav");
	music.volume = 0.5;
	music.loop = true;
} else if (window.localStorage.level <= 6) {
	generateCave(1, 1, mapWidth, mapHeight, 8);
	spawnEyes(0.001);
	generateVines(0.003);
	spawnBiters(0.005);
	spawnPoisongrass(0.005);
	generateWater();
	spawnBats(0.001);
	spawnSnakes(0.002);
	music = new Audio("music/jungle.mp3");
	music.volume = 0.5;
	music.loop = true;
} else {
	generateCave(1, 1, mapWidth, mapHeight, 5);
	pProps[5].texture = 12;
	spawnEyes(0.001);
	spawnSlimes(0.011);
	pProps[5].color = [80, 50, 50];
	generateLava(0.05);
	generateGold(0.06);
	music = new Audio("music/magma.wav");
	music.volume = 0.5;
	music.loop = true;
}
music.play();

generateGold(0.06);

for (var i = 3; i < 20; i++) {
	for (var j = 3; j < 20; j++) {
		particles[i][j] = 1;
	}
}

const times = [];
let fps;

var chat = function (text, time) {
	let children = document.getElementById("chatbox").children;
	for (var i = 0; i < children.length; i++) {
		children[i].hidden = false;
	}
	children[0].innerHTML = text;
	setTimeout(function () {
		for (var i = 0; i < children.length; i++) {
			children[i].hidden = true;
		}
	}, time);
};

var renderPix = function (i, j) {
	var part = Math.abs(particles[i][j]);
	var particle = pProps[Math.floor(part)];
	if (particle.texture) {
		canvasOneGraphics.drawImage(
			images[particle.texture],
			(i % (particle.resx / particle.scale)) * particle.scale,
			(j % (particle.resy / particle.scale)) * particle.scale,
			particle.scale,
			particle.scale,
			j * 2,
			i * 2,
			2,
			2
		);
	} else {
		var heat = (part - Math.floor(part) - 0.5) * 300;

		canvasOneGraphics.fillStyle = `rgb(${particle.color[0] + heat},${particle.color[1] - heat},${particle.color[2] - heat})`;
		// canvasOneGraphics.fillStyle = `rgb(${particle.color[0]},${particle.color[1]},${particle.color[2]})`;
		canvasOneGraphics.fillRect(j * 2, i * 2, 2, 2);
	}
};

var renderEntity = function (entity) {
	if (entity.render) {
		canvasThreeGraphics.drawImage(images[entity.image], entity.x * 4, entity.y * 4, entity.width * 4, entity.height * 4);
	}
};

var fullRender = function () {
	for (var i = 0; i < particles.length; i++) {
		for (var j = 0; j < particles[i].length; j++) {
			if (particles[i][j] !== 0) {
				renderPix(i, j);
			} else {
				canvasOneGraphics.fillStyle = "black";
				canvasOneGraphics.fillRect(j * 2, i * 2, 2, 2);
			}
		}
	}
	renderEntity(entities[0]);
};

window.onload = function () {
	fullRender();
	document.getElementById("loadingScreen").hidden = true;
	gameloop = setInterval(function () {
		/********
		 * GAME LOOP
		 * GameLOOp
		 *
		 *
		 *
		 */
		stepParticles(
			particles,
			Math.max(Math.floor(frame.x), 0),
			Math.max(Math.floor(frame.y), 0),
			Math.min(Math.floor(frame.x) + frame.width + 10, mapWidth - 2),
			Math.min(Math.floor(frame.y) + frame.height + 10, mapHeight - 2)
		);
		stepEntitiesPhysics(Math.max(frame.x, 0), Math.max(frame.y, 0), frame.x + frame.width, frame.y + frame.height);
		canvasTwoGraphics.drawImage(canvasOne, frame.x * 2, frame.y * 2, frame.width * 2, frame.height * 2, 0, 0, 900, 480);
		canvasTwoGraphics.drawImage(canvasThree, frame.x * 4, frame.y * 4, frame.width * 4, frame.height * 4, 0, 0, 900, 480);
		stepCharacter();
		stepSnakes();
		eyesStep();
		bitersStep();
		grassStep();
		batsStep();
		stepSlimes();
		frame.x = Math.min(Math.max(0, lerp(frame.x, entities[0].x - 75, 0.1)), mapWidth - frame.width);
		frame.y = Math.min(Math.max(lerp(frame.y, entities[0].y - 40, 0.1), 0), mapHeight - frame.height);
		// const now = performance.now();
		// while (times.length > 0 && times[0] <= now - 1000) {
		// 	times.shift();
		// }
		// times.push(now);
		// fps = times.length;
		// if (Math.random() < 0.01) {
		// 	console.log(fps);
		// }
	}, 16);
};
