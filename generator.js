let generate = function (width, height, elem) {
	particles = [];
	elem = elem || 1;

	for (var i = 0; i < height; i++) {
		particles.push([]);

		for (var j = 0; j < width; j++) {
			if (i > 2 && i < height - 2) {
				if (j > 2 && j < width - 2) {
					particles[i].push(elem);
				} else {
					particles[i].push(0);
				}
			} else {
				particles[i].push(0);
			}
		}
	}
};

var generateCave = function (beginX, beginY, endX, endY, elem) {
	let asdf = [];
	for (let x = 0; x < (endY - beginY) / 4; x++) {
		asdf.push([]);
		for (let y = 0; y < (endX - beginX) / 4; y++) {
			if (Math.random() < 0.5) {
				asdf[x].push(1.5);
			} else {
				asdf[x].push(elem);
			}
			if (x >= (endY - beginY) / 4 - 20) {
				asdf[x][y] = elem;
			}
			if (y >= (endX - beginY) / 4 - 5) {
				asdf[x][y] = elem;
			}
		}
	}

	for (a = 0; a < 20; a++) {
		let oldmap = JSON.parse(JSON.stringify(asdf));
		for (i = 1; i < asdf.length - 1; i++) {
			for (j = 1; j < asdf[i].length - 1; j++) {
				let wallCount = 0;
				if (oldmap[i][j] !== 0) {
					if (Math.floor(oldmap[i][j + 1]) == elem) {
						wallCount++;
					}

					if (Math.floor(oldmap[i][j + -1]) == elem) {
						wallCount++;
					}

					// if (Math.floor(oldmap[i + 1][j + 1]) == elem) {
					// 	wallCount++;
					// }

					// if (Math.floor(oldmap[i + -1][j + 1]) == elem) {
					// 	wallCount++;
					// }

					// if (Math.floor(oldmap[i - 1][j + -1]) == elem) {
					// 	wallCount++;
					// }

					if (Math.floor(oldmap[i - 1][j]) == elem) {
						wallCount++;
					}
					if (Math.floor(oldmap[i + 1][j]) == elem) {
						wallCount++;
					}
					// if (Math.floor(oldmap[i + 1][j + -1]) == elem) {
					// 	wallCount++;
					// }

					// if (wallCount > 4) {
					// 	asdf[i][j] = elem;
					// }
					// if (wallCount < 4) {
					// 	asdf[i][j] = 1.5;
					// }
					if (wallCount > 2) {
						asdf[i][j] = elem;
					}
					if (wallCount < 2) {
						asdf[i][j] = 1.5;
					}
				}
			}
		}
	}
	try {
		for (i = 0; i < asdf.length; i++) {
			for (j = 0; j < asdf[0].length; j++) {
				for (let h = 0; h < 5; h++) {
					for (let g = 0; g < 5; g++) {
						if (particles[i * 5 + beginY + h][j * 5 + beginX + g]) {
							particles[i * 5 + beginY + h][j * 5 + beginX + g] = asdf[i][j];
						}
					}
				}
			}
		}
	} catch (err) {}
	asdf = undefined;

	for (a = 0; a < 20; a++) {
		let oldmap = JSON.parse(JSON.stringify(particles));
		for (i = 2; i < particles.length - 2; i++) {
			for (j = 2; j < particles[i].length - 2; j++) {
				let wallCount = 0;
				if (oldmap[i][j] !== 0) {
					if (Math.floor(oldmap[i][j + 1]) == elem) {
						wallCount++;
					}

					if (Math.floor(oldmap[i][j + -1]) == elem) {
						wallCount++;
					}

					if (Math.floor(oldmap[i + 1][j + 1]) == elem) {
						wallCount++;
					}

					if (Math.floor(oldmap[i + -1][j + 1]) == elem) {
						wallCount++;
					}

					if (Math.floor(oldmap[i - 1][j + -1]) == elem) {
						wallCount++;
					}

					if (Math.floor(oldmap[i - 1][j]) == elem) {
						wallCount++;
					}
					if (Math.floor(oldmap[i + 1][j]) == elem) {
						wallCount++;
					}
					if (Math.floor(oldmap[i + 1][j + -1]) == elem) {
						wallCount++;
					}

					if (wallCount > 4) {
						particles[i][j] = elem;
					}
					if (wallCount < 4) {
						particles[i][j] = 1.5;
					}
				}
			}
		}
	}
};

let generateGold = function (rate) {
	//puts random gold into empty spots of any map
	for (var i = 3; i < particles.length - 5; i += 5) {
		for (var j = 3; j < particles[i].length - 5; j += 5) {
			if (Math.random() < rate) {
				if (
					pProps[Math.floor(particles[i + 5][j])].s == 's' &&
					pProps[Math.floor(particles[i + 5][j + 1])].s == 's' &&
					pProps[Math.floor(particles[i + 5][j + 2])].s == 's' &&
					pProps[Math.floor(particles[i + 5][j + 3])].s == 's' &&
					pProps[Math.floor(particles[i + 5][j + 4])].s == 's'
				) {
					for (var h = 0; h < 5; h++) {
						for (var g = 0; g < 5; g++) {
							if (particles[i + h][j + g] < 2) {
								if (Math.random() < 0.9) {
									particles[i + h][j + g] = 2.5;
								}
							}
						}
					}
				}
			}
		}
	}
};

let generateLava = function (rate) {
	rate = rate || 0.009;
	for (var i = 12; i < particles.length - 12; i += 12) {
		for (var j = 12; j < particles[i].length - 12; j += 12) {
			if (Math.random() < rate) {
				for (var h = 0; h < 7; h++) {
					for (var g = 0; g < 7; g++) {
						if (pProps[Math.floor(particles[i + h][j + 7 - h + g])].s == 's') {
							if (Math.random() < 0.9) {
								particles[i + h][j + 7 - h + g] = 4.5;
							}
						}
					}
				}
			}
		}
	}
};

let spawnSnakes = function (rate) {
	for (var i = 4; i < particles.length - 10; i++) {
		for (var j = 4; j < particles[i].length - 10; j++) {
			let temp = true;
			for (var h = 0; h < 5; h++) {
				for (var g = 0; g < 5; g++) {
					if (particles[i + h][j + g] > 2) {
						temp = false;
					}
				}
			}
			if (temp == true) {
				if (Math.random() < rate / 10) {
					let snake = {
						name: 'snake',
						image: 5,
						x: j,
						y: i,
						width: 5,
						render: true,
						flipped: 0,
						height: 5,
						yVel: 0,
						xVel: 0,
						health: 1,
						facing: 1, //one for right 0 for left
						timer: Math.random() * 100,
						health: 1,
						takeDamage: function () {
							for (var i = 0; i < this.width; i++) {
								particles[Math.floor(this.y)][Math.floor(this.x + i)] = 2.5;
							}
							entities.splice(entities.indexOf(this), 1);
							snakes.splice(snakes.indexOf(this), 1);
						},
					};
					entities.push(snake);
					snakes.push(snake);
				}
			}
		}
	}
};

let addDoor = function () {
	//find valid door place and add door
	var availableSpaces = [];
	for (var i = 400; i < particles.length - 12; i++) {
		for (var j = 2; j < particles[i].length - 10; j++) {
			let valid = true;
			for (var h = i; h < i + 12; h++) {
				for (var g = j; g < j + 10; g++) {
					if (h > 10 + i) {
						if (pProps[Math.abs(Math.floor(particles[h][g]))].s !== 's') {
							valid = false;
						}
					} else {
						if (particles[h][g] !== 1.5) {
							valid = false;
						}
					}
				}
			}

			if (valid) {
				availableSpaces.push([i, j]);
			}
		}
	}

	// availableSpaces = [];
	if (availableSpaces.length == 0) {
		let y = Math.floor(Math.random() * 50 + 390);
		let x = Math.floor(Math.random() * 340 + 30);
		availableSpaces.push([y + 7, x + 7]);
		for (var h = y; h < y + 20; h++) {
			for (var g = x; g < x + 20; g++) {
				particles[h][g] = 1.5;
				if (h > y + 16) {
					particles[h][g] = 5.5;
				}
			}
		}
	}
	// console.log(availableSpaces);

	let pick = Math.max(
		0,
		Math.round(Math.random() * availableSpaces.length) - 1
	);
	console.log(pick);
	pick = availableSpaces[pick];
	console.log(pick);

	entities.push({
		name: 'downStairs',
		image: 11,
		x: pick[1],
		render: true,
		y: pick[0] + 1,
		width: 10,
		gravityOff: false,
		flipped: 1,
		height: 10,
		yVel: 0,
		xVel: 0,
		touchingGround: true,
	});
};

let generateVines = function (rate) {
	for (var i = 38; i < particles.length - 38; i++) {
		for (var j = 38; j < particles[i].length - 38; j++) {
			var vineHeight;
			var valid = true;
			for (var h = 35 - Math.floor(Math.random() * 15); h >= 0; h--) {
				for (var g = 0; g < 3; g++) {
					if (h === 0) {
						if (pProps[Math.floor(particles[i - h][j + g])].s !== 's') {
							valid = false;
						}
					} else {
						if (Math.floor(particles[i - h][j + g]) !== 1) {
							vineHeight = h;
							if (vineHeight < 4) {
								valid = false;
							}
						}
					}
				}
			}
			if (valid && Math.random() < rate) {
				for (var h = vineHeight; h >= 0; h--) {
					for (var g = 0; g < 3; g++) {
						if (g == 1) {
							particles[i - h][j + g] = 9.5;
						}
						if (g == 0 && h % 2 == 0) {
							particles[i - h][j + g] = 9.5;
						}
						if (g == 2 && h % 2 == 1) {
							particles[i - h][j + g] = 9.5;
						}
					}
				}
			}
		}
	}
};

let generateWater = function () {
	for (var i = 1; i < particles.length - 7; i += 7) {
		for (var j = 1; j < particles[i].length - 7; j += 7) {
			if (Math.random() < 0.009) {
				for (var h = 0; h < 7; h++) {
					for (var g = 0; g < 7; g++) {
						if (pProps[Math.floor(particles[i + h][j + 7 - h + g])].s == 's') {
							if (Math.random() < 0.9) {
								particles[i + h][j + 7 - h + g] = 3.5;
							}
						}
					}
				}
			}
		}
	}
};

let spawnEyes = function (rate) {
	for (var i = 4; i < particles.length - 10; i++) {
		for (var j = 4; j < particles[i].length - 10; j++) {
			let temp = true;
			for (var h = 0; h < 5; h++) {
				for (var g = 0; g < 5; g++) {
					if (particles[i + h][j + g] > 2) {
						temp = false;
					}
				}
			}
			if (temp == true) {
				if (Math.random() < rate / 10) {
					let eye = {
						name: 'eye',
						image: 25,
						x: j,
						y: i,
						width: 5,
						render: true,
						flipped: 0,
						height: 5,
						yVel: 0,
						xVel: 0,
						currentLaser: null,
						health: 1,
						facing: 0, //one for right 0 for left
						timer: 30,
						timerTwo: 20,
						timerThree: 100 * Math.random(),
						health: 1,
						takeDamage: function () {
							for (var i = 0; i < this.width; i++) {
								particles[Math.floor(this.y)][Math.floor(this.x + i)] = 2.5;
							}
							entities.splice(entities.indexOf(this), 1);
							eyes.splice(eyes.indexOf(this), 1);
						},
					};
					entities.push(eye);
					eyes.push(eye);
				}
			}
		}
	}
};

let spawnBiters = function (rate) {
	for (var i = 4; i < particles.length - 24; i++) {
		for (var j = 4; j < particles[i].length - 24; j++) {
			let temp = true;
			for (var h = 0; h < 14; h++) {
				for (var g = 0; g < 12; g++) {
					if (particles[i + h][j + g] > 2) {
						temp = false;
					}
				}
			}
			if (temp == true) {
				if (Math.random() < rate / 10) {
					let bite = {
						name: 'biter',
						image: 28, //28 29
						x: j,
						y: i,
						width: 8,
						render: true,
						flipped: 0,
						height: 10,
						yVel: 0,
						xVel: 0,
						health: 1,
						timer: 30 * Math.random(),
						health: 1,
						takeDamage: function () {
							for (var i = 0; i < this.width; i++) {
								particles[Math.floor(this.y)][Math.floor(this.x + i)] = 2.5;
							}
							entities.splice(entities.indexOf(this), 1);
							biters.splice(biters.indexOf(this), 1);
						},
					};
					entities.push(bite);
					biters.push(bite);
				}
			}
		}
	}
};

let spawnPoisongrass = function (rate) {
	for (var i = 4; i < particles.length - 24; i++) {
		for (var j = 4; j < particles[i].length - 24; j++) {
			let temp = true;
			for (var h = 0; h < 14; h++) {
				for (var g = 0; g < 12; g++) {
					if (particles[i + h][j + g] > 2) {
						temp = false;
					}
				}
			}
			if (temp == true) {
				if (Math.random() < rate / 10) {
					let bite = {
						name: 'poisonGrass',
						image: 32, //28 29
						x: j,
						y: i,
						width: 10,
						render: true,
						flipped: 0,
						height: 12,
						yVel: 0,
						xVel: 0,
						health: 1,
						timer: 30 * Math.random(),
						health: 1,
						takeDamage: function () {
							for (var g = 0; g < bite.height; g++) {
								for (var h = 0; h < bite.width; h++) {
									if (Math.random() < 0.3) {
										particles[Math.floor(bite.y + g)][
											Math.floor(bite.x + h)
										] = 20.5;
									}
								}
							}
							entities.splice(entities.indexOf(this), 1);
							grasses.splice(grasses.indexOf(this), 1);
						},
					};
					entities.push(bite);
					grasses.push(bite);
				}
			}
		}
	}
};

let spawnBats = function (rate) {
	for (var i = 4; i < particles.length - 10; i++) {
		for (var j = 4; j < particles[i].length - 10; j++) {
			let temp = true;
			for (var h = 0; h < 5; h++) {
				for (var g = 0; g < 5; g++) {
					if (particles[i + h][j + g] > 2) {
						temp = false;
					}
				}
			}
			if (temp == true) {
				if (Math.random() < rate / 10) {
					let bat = {
						name: 'bat',
						image: 33,
						x: j,
						y: i,
						width: 5,
						render: true,
						height: 5,
						yVel: 0,
						xVel: 0,
						health: 1,
						timer: 30,
						timerTwo: 30,
						facing: 1,
						takeDamage: function () {
							for (var i = 0; i < this.width; i++) {
								particles[Math.floor(this.y)][Math.floor(this.x + i)] = 2.5;
							}
							entities.splice(entities.indexOf(this), 1);
							bats.splice(bats.indexOf(this), 1);
						},
					};
					entities.push(bat);
					bats.push(bat);
				}
			}
		}
	}
};

let spawnSlimes = function (rate) {
	for (var i = 4; i < particles.length - 15; i++) {
		for (var j = 4; j < particles[i].length - 15; j++) {
			let temp = true;
			for (var h = 0; h < 15; h++) {
				for (var g = 0; g < 15; g++) {
					if (particles[i + h][j + g] > 2) {
						temp = false;
					}
				}
			}
			if (temp == true) {
				if (Math.random() < rate / 10) {
					let slime = {
						name: 'slime',
						image: 35, //35 left 36 right
						x: j,
						y: i,
						width: 10,
						render: true,
						flipped: 0,
						height: 10,
						yVel: 0,
						xVel: 0,
						health: 1,
						facing: 1, //one for right 0 for left
						timer: Math.random() * 100,
						health: 1,

						takeDamage: function () {
							//split into smaller slimes
							let parent = this;
							for (var b = 0; b < 2; b++) {
								let child = {
									name: 'slime',
									image: 35, //35 left 36 right
									x: parent.x,
									y: parent.y,
									width: parent.width / 2,
									render: true,
									flipped: 0,
									height: parent.height / 2,
									yVel: -2,
									xVel: Math.random() * (Math.random() > 0.5 ? -1 : 1) * 5,
									health: 1,
									facing: 1, //one for right 0 for left
									timer: Math.random() * 100,
									health: 1,
								};
								slimes.push(child);
								entities.push(child);
								if (child.width > 5) {
									child.takeDamage = this.takeDamage.bind(child);
								} else {
									child.takeDamage = function () {
										for (var i = 0; i < this.width; i++) {
											particles[Math.floor(this.y)][
												Math.floor(this.x + i)
											] = 2.5;
										}
										entities.splice(entities.indexOf(this), 1);
										slimes.splice(slimes.indexOf(this), 1);
									}.bind(child);
								}
							}

							entities.splice(entities.indexOf(this), 1);
							slimes.splice(slimes.indexOf(this), 1);
						},
					};
					entities.push(slime);
					slimes.push(slime);
				}
			}
		}
	}
};
