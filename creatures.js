let snakes = []; //array of shared objects representing snakes in the game. These objects are also in the entities global lists

let stepSnakes = function () {
	for (var i = 0; i < snakes.length; i++) {
		let snake = snakes[i];
		if (
			snake.x < frame.x + frame.width + 5 &&
			snake.x > frame.x - 5 &&
			snake.y > frame.y - 5 &&
			snake.y < frame.y + frame.height + 5
		) {
			snake.render = true;
			snake.timer--;
			if (snake.timer < 0) {
				if (snake.timer < -100) {
					snake.timer = Math.random() * 100;
					snake.facing = Math.random() < 0.5;
					if (snake.facing) {
						snake.image = 5;
					} else {
						snake.image = 6;
					}
				}
				if (snake.facing) {
					//facing right
					snake.xVel += Math.random() / 5;
				} else {
					snake.xVel -= Math.random() / 5;
				}
			}
			if (Math.abs(snake.x - entities[0].x) < 4) {
				if (Math.abs(snake.y - entities[0].y) < 4) {
					entities[0].takeDamage();
				}
			}
		} else {
			snake.render = false;
		}
	}
};

let eyes = [];

let eyesStep = function () {
	for (var i = 0; i < eyes.length; i++) {
		let eye = eyes[i];
		if (
			eye.x < frame.x + frame.width + 5 &&
			eye.x > frame.x - 5 &&
			eye.y > frame.y - 5 &&
			eye.y < frame.y + frame.height + 5
		) {
			eye.render = true;
			eye.timer--;
			eye.timerTwo--;
			eye.timerThree--;
			if (eye.timerThree < 0) {
				if (eye.currentLaser == null) {
					//shoot laser
					eye.currentLaser = {
						name: 'laser',
						image: 27,
						x: eye.x + (eye.facing ? eye.width : 0),
						render: true,
						y: eye.y,
						width: 4,
						flipped: 0,
						height: 2,
						yVel: 0,
						gravityOff: true,
						xVel: !eye.facing ? -5 : 5,
						touchingGround: true,
					};
					entities.push(eye.currentLaser);
					laser.play();
				} else {
					if (eye.currentLaser.xVel < 0.1) {
						entities.splice(entities.indexOf(eye.currentLaser), 1);
						eye.timerThree = 100 * Math.random();
						eye.currentLaser = null;
					} else {
						if (Math.abs(eye.currentLaser.x - entities[0].x) < 4) {
							if (Math.abs(eye.currentLaser.y - entities[0].y) < 4) {
								entities[0].takeDamage();
							}
						}
					}
				}
			}
			if (eye.timerTwo < 0) {
				eye.timerTwo = 40;
			}
			eye.yVel -= (Math.abs(eye.timerTwo - 20) + 1.2) / 120;
			if (eye.timer < 0) {
				if (eye.timer < -100) {
					eye.timer = Math.random() * 100;
					eye.facing = Math.random() < 0.5;
					if (eye.facing) {
						eye.image = 26;
					} else {
						eye.image = 25;
					}
				}
				if (eye.facing) {
					//facing right
					eye.xVel += Math.random() / 5;
				} else {
					eye.xVel -= Math.random() / 5;
				}
			}
			if (Math.abs(eye.x - entities[0].x) < 4) {
				if (Math.abs(eye.y - entities[0].y) < 4) {
					entities[0].takeDamage();
				}
			}
		} else {
			eye.render = false;
		}
	}
};

let biters = [];

let bitersStep = function () {
	for (var i = 0; i < biters.length; i++) {
		let bite = biters[i];
		if (
			bite.x < frame.x + frame.width + 5 &&
			bite.x > frame.x - 5 &&
			bite.y > frame.y - 5 &&
			bite.y < frame.y + frame.height + 5
		) {
			bite.render = true;
			bite.timer--;
			if (bite.timer < 0) {
				bite.timer = 30;
				if (bite.image == 28) {
					bite.image++;
				} else {
					bite.image = 28;
				}
			}
			if (Math.abs(bite.x + bite.width / 2 - entities[0].x) < 8) {
				if (Math.abs(bite.y + bite.height / 2 - entities[0].y) < 8) {
					entities[0].takeDamage();
				}
			}
		}
	}
};

let grasses = [];

let grassStep = function () {
	for (var i = 0; i < grasses.length; i++) {
		let bite = grasses[i];
		if (
			bite.x < frame.x + frame.width + 5 &&
			bite.x > frame.x - 5 &&
			bite.y > frame.y - 5 &&
			bite.y < frame.y + frame.height + 5
		) {
			bite.render = true;

			if (Math.abs(bite.x + bite.width / 2 - entities[0].x) < 8) {
				if (Math.abs(bite.y + bite.height / 2 - entities[0].y) < 8) {
					bite.takeDamage();
				}
			}
		}
	}
};

let bats = [];

let batsStep = function () {
	for (var i = 0; i < bats.length; i++) {
		let bat = bats[i];
		if (
			bat.x < frame.x + frame.width + 5 &&
			bat.x > frame.x - 5 &&
			bat.y > frame.y - 5 &&
			bat.y < frame.y + frame.height + 5
		) {
			bat.render = true;
			bat.physicsOff = false;

			bat.timer--;
			bat.timerTwo--;

			if (bat.timerTwo < 0) {
				bat.timerTwo = 40;
				bat.image = 34;
			}

			if (bat.timerTwo == 20) {
				bat.image = 33;
			}
			bat.yVel -= (Math.abs(bat.timerTwo - 20) + 1.2) / 120;
			if (bat.timer < 0) {
				if (bat.timer < -100) {
					bat.timer = Math.random() * 100;
					bat.facing = Math.random() < 0.5;
				}
				if (bat.facing) {
					//facing right
					bat.xVel += Math.random() / 5;
				} else {
					bat.xVel -= Math.random() / 5;
				}
			}
			if (Math.abs(bat.x - entities[0].x) < 4) {
				if (Math.abs(bat.y - entities[0].y) < 4) {
					entities[0].takeDamage();
				}
			}
		} else {
			bat.render = false;
			bat.physicsOff = true;
		}
	}
};

let slimes = []; //array of shared objects representing slimes in the game. These objects are also in the entities global lists

let stepSlimes = function () {
	for (var i = 0; i < slimes.length; i++) {
		let slime = slimes[i];
		if (
			slime.x < frame.x + frame.width + 5 &&
			slime.x > frame.x - 5 &&
			slime.y > frame.y - 5 &&
			slime.y < frame.y + frame.height + 5
		) {
			slime.render = true;
			slime.timer--;
			if (slime.timer < 0) {
				if (slime.timer < -100) {
					slime.timer = Math.random() * 100;
					slime.facing = Math.random() < 0.5;
					if (slime.facing) {
						slime.image = 36;
					} else {
						slime.image = 35;
					}
				}
				if (slime.facing) {
					//facing right
					slime.xVel += Math.random() / 5;
				} else {
					slime.xVel -= Math.random() / 5;
				}
			}
			if (Math.abs(slime.x - entities[0].x) < 4) {
				if (Math.abs(slime.y - entities[0].y) < 4) {
					entities[0].takeDamage();
				}
			}
		} else {
			slime.render = false;
		}
	}
};
