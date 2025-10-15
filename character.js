var input = {};
//*local storage data validation*//
if (window.localStorage.health === undefined || isNaN(window.localStorage.health) || window.localStorage.health <= 0) {
	window.localStorage.health = 6;
}
if (window.localStorage.gold === undefined || isNaN(window.localStorage.gold) || window.localStorage.gold < 0) {
	window.localStorage.gold = 0;
}
if (window.localStorage.level === undefined || isNaN(window.localStorage.level) || window.localStorage.level < 1) {
	window.localStorage.level = 1;
}
if (
	window.localStorage.levelHighscore === undefined ||
	isNaN(window.localStorage.levelHighscore) ||
	window.localStorage.levelHighscore < 1
) {
	window.localStorage.levelHighscore = 1;
}
if (window.localStorage.gotNewHighscore === undefined) {
	window.localStorage.gotNewHighscore = false;
}
if (window.localStorage.inventory === "0,0,0,0") {
	window.localStorage.inventory = "1,0,0,0"; //you literally need a pickaxe to play the game
}
//*local storage data validation*//
player.health = window.localStorage.health;
document.getElementById("health").innerHTML = player.health;
if (
	window.localStorage.inventory === undefined ||
	window.localStorage.inventory === "" ||
	window.localStorage.inventory === "undefined"
) {
	player.inventory = [items[1], items[0], items[0], items[0]];
	window.localStorage.inventory = "";
} else {
	let s = window.localStorage.inventory.split(",");
	player.inventory = [items[s[0]], items[s[1]], items[s[2]], items[s[3]]];
}
// console.log(player.inventory);
// console.log(items);
let setLocalStorageInventory = function () {
	window.localStorage.inventory = "";
	for (var i = 0; i < player.inventory.length; i++) {
		if (i != 0) {
			window.localStorage.inventory += ",";
		}
		if (!player.inventory[i]) {
			player.inventory[i] = items[i == 0 ? 1 : 0];
		}
		window.localStorage.inventory += player.inventory[i].toolNum;
	}
};
setLocalStorageInventory();
var gold = 0;
var selected = 3.5;
player.died = false;
gold = window.localStorage.gold;
document.getElementById("goldcount").innerHTML = gold;

var setInvImages = function () {
	//sets the inventory images to match what they are
	document.getElementById("invSlot").innerHTML =
		'<img style="width:60px;height:60px;" src = "' + images[player.inventory[0].image].src + '" />';
	document.getElementById("invSlot2").innerHTML =
		'<img style="width:60px;height:60px;" src = "' + images[player.inventory[1].image].src + '" />';
	document.getElementById("invSlot3").innerHTML =
		'<img style="width:60px;height:60px;" src = "' + images[player.inventory[2].image].src + '" />';

	document.getElementById("invSlot4").innerHTML =
		'<img style="width:60px;height:60px;" src = "' + images[player.inventory[3].image].src + '" />';
};

setInvImages();

var damageMultiplier = 1; //how much damage is took per hit
var dmgCooldown = 0;
var won = false;

player.takeDamage = function (amount) {
	amount = amount || 1;
	if (dmgCooldown < 0 && damageMultiplier > 0) {
		dmgCooldown = 130;
		player.health -= damageMultiplier * amount;
		document.getElementById("health").innerHTML = player.health;
		player.image = 7;
		hurtSound.play();
	}
	if (player.health <= 0 && !player.died) {
		player.died = true;
		deathNoise.volume = 1;
		deathNoise.play();
		setInterval(function () {
			player.image = 7;
		}, 100);
		player.image = 7;
		//reset all local storage data to defaults
		window.localStorage.health = 6;
		window.localStorage.gold = 0;
		window.localStorage.level = 1;
		// window.localStorage.levelHighscore = 1;
		window.localStorage.inventory = "1,0,0,0";
		document.removeEventListener("keydown", keydown);
		document.getElementById("deathScreen").hidden = false;
		if (window.localStorage.gotNewHighscore !== "false") {
			document.getElementById("deathText").src = "Images/textCelebratory.png";
		}
		music.pause();
		setTimeout(function () {
			document.getElementById("hintText").hidden = false;
			document.addEventListener("keydown", function () {
				window.location = "start.html";
			});
			//window.location = 'start.html';
		}, 3000);
	}
};

player.iSelected = 0;

document.addEventListener("keyup", function (e) {
	if (e.key === "Escape") {
		window.close();
	}
	input[e.key] = false;
});

let keydown = function (e) {
	if (e.key === "Escape") {
		window.close();
	}
	if (e.key == "q") {
		if (!input.s) {
			player.iSelected++;
			if (player.iSelected > 3) {
				player.iSelected = 0;
			}
			document.getElementById("invSlot").style.border = player.iSelected == 0 ? "2px solid yellow" : "2px solid white";
			document.getElementById("invSlot2").style.border = player.iSelected == 1 ? "2px solid yellow" : "2px solid white";
			document.getElementById("invSlot3").style.border = player.iSelected == 2 ? "2px solid yellow" : "2px solid white";
			document.getElementById("invSlot4").style.border = player.iSelected == 3 ? "2px solid yellow" : "2px solid white";
		} else {
			//drop or pick up item
			if (player.inventory[player.iSelected].name != "nothing") {
				//drop
				entities.push({
					name: player.inventory[player.iSelected].name,
					image: player.inventory[player.iSelected].image,
					x: player.x,
					toolNum: player.inventory[player.iSelected].toolNum,
					render: true,
					y: player.y,
					width: 5,
					flipped: 1,
					height: 5,
					xVel: player.flipped ? -2 : 2,
					yVel: 3,
					physicsOff: false,
				});

				player.inventory[player.iSelected] = items[0];
			} else {
				//pickUp
				for (var j = 0; j < entities.length; j++) {
					for (var j = 0; j < entities.length; j++) {
						if (entities[j].toolNum && !entities[j].shopItem) {
							if (Math.abs(entities[j].x - entities[0].x) < 6) {
								if (Math.abs(entities[j].y - entities[0].y) < 6) {
									player.inventory[player.iSelected] = items[entities[j].toolNum];
									entities.splice(j, 1);
									j = entities.length + 2;
								}
							}
						} else if (entities[j].shopItem) {
							if (Math.abs(entities[j].x - entities[0].x) < 6 && entities[j].price <= gold) {
								if (Math.abs(entities[j].y - entities[0].y) < 6) {
									chat("You bought the " + items[entities[j].toolNum].name, 1000);
									// coiny.play();
									player.inventory[player.iSelected] = items[entities[j].toolNum];
									gold -= entities[j].price;
									entities.splice(j, 1);
									j = entities.length + 2;
									document.getElementById("goldcount").innerHTML = gold;
								}
							}
						}
					}
				}
			}

			setInvImages();
		}
	}
	if (e.key === "e") {
		player.inventory[player.iSelected].use();
	}
	input[e.key] = true;
};

document.addEventListener("keydown", keydown);

// var mouseDown = 0; //particle test code
// document.body.onmousedown = function () {
// 	mouseDown++;
// };
// document.body.onmouseup = function () {
// 	--mouseDown;
// };

// var getMousePosition = function (canvas, event) {
// 	var rect = canvas.getBoundingClientRect();
// 	mousex = event.clientX - rect.left;
// 	mousey = event.clientY - rect.top;
// };

// canvasTwo.addEventListener('mousemove', function (e) {
// 	getMousePosition(canvasTwo, e);
// });

// function myFunction(elem) {
// 	var button = document.createElement('button');
// 	button.innerHTML = pProps[elem].name;
// 	button.onclick = function () {
// 		selected = elem + pProps[elem].radiates + 0.5;
// 		return false;
// 	};
// 	document.getElementById('buttonContainer').appendChild(button);
// }

// // MAKES ELEMENT BUTTONS
// for (var i = 0; i < pProps.length; i++) {
// 	myFunction(i);
// } //particle test code

let stepCharacter = function () {
	dmgCooldown--;

	// if (mouseDown) { //particle test code
	// 	var mpoa = positionToArrayPos(
	// 		mousex / (900 / frame.width) + frame.x,
	// 		mousey / (480 / frame.height) + frame.y,
	// 		particles,
	// 		1
	// 	);
	// 	if (particles[mpoa[0]][mpoa[1]]) {
	// 		particles[mpoa[0]][mpoa[1]] = selected;

	// 		renderPix(mpoa[0], mpoa[1]);
	// 	}
	// } //particle test code

	// entities[0].x = entities[2].x;
	// entities[0].y = entities[2].y;
	if (input.w) {
		if (Math.abs(player.x - entities[2].x) < 10) {
			if (Math.abs(player.y - entities[2].y) < 10) {
				console.log("win");

				if (!won) {
					won = true;
					window.localStorage.inventory = "";
					if (window.localStorage.levelHighscore > parseInt(window.localStorage.level) + 1) {
						window.localStorage.levelHighscore = window.localStorage.levelHighscore;
					} else {
						window.localStorage.levelHighscore = parseInt(window.localStorage.level) + 1;
						window.localStorage.gotNewHighscore = true;
					}
					setLocalStorageInventory();
					window.localStorage.health = player.health;
					window.localStorage.gold = gold;
					player.render = false;
					document.removeEventListener("keydown", keydown);
					damageCooldown = -1; //turns off the flashing from taking damage
					damageMultiplier = 0;
					entities[2].image = 14;
					window.localStorage.level++;
					for (let j = 1; j < 6; j++) {
						setTimeout(function () {
							entities[2].image = 14 + j;
							player.render = false;
						}, 300 + j * 200);
						if (j == 5) {
							setTimeout(function () {
								entities[2].image = 11;
								player.render = false;
								setTimeout(function () {
									//whats a better ends with check
									//a: substring
									if (window.location.href.slice(-13) == "tutorial.html") {
										window.location = "start.html";
									} else if (window.location.href.slice(-9) == "shop.html") {
										window.location = "index.html";
									} else {
										if ((window.localStorage.level - 1) % 3 !== 0) {
											window.location.reload();
										} else {
											window.location = "shop.html";
										}
									}
								}, 500);
							}, 300 + (j + 1) * 200);
						}
					}
					oneUpSound.play();
				}
			} else if (player.touchingGround) {
				player.yVel = -3.0;
				jumpNoise.play();
			}
		} else if (player.touchingGround) {
			player.yVel = -3.0;
			jumpNoise.play();
		}
	}
	if (input.a) {
		player.xVel = -1;
		player.image = 1;
		player.flipped = true;
	}
	if (input.s) {
		player.yVel += 0.1;
	}
	if (input.d) {
		player.xVel = 1;
		player.image = 0;
		player.flipped = false;
	}

	try {
		let start = Math.floor(player.x + 1);
		let end = player.x + player.width - 2;
		let h = Math.floor(player.y + player.height);
		for (var i = 0; i < end - start + 1; i++) {
			if (Math.floor(particles[h][start + i]) == 2) {
				goldSound.play();
				particles[h][start + i] = 1.5;
				renderPix(h, start + i);
				gold++;
				document.getElementById("goldcount").innerHTML = gold;
			}
			if (particles[h - 1][start + 1] % 1 > 0.7 && dmgCooldown < 0) {
				player.takeDamage();
			}
		}

		start = Math.floor(player.x + 1);
		end = player.x + player.width - 2;
		h = Math.floor(player.y);
		for (var i = 0; i < end - start + 1; i++) {
			if (Math.floor(particles[h][start + i]) == 2) {
				particles[h][start + i] = 1.5;
				renderPix(h, start + i);
				gold++;
				document.getElementById("goldcount").innerHTML = gold;
				goldSound.play();
			}
			if (particles[h + 1][start + 1] % 1 > 0.7 && dmgCooldown < 0) {
				player.takeDamage();
			}
		}

		start = Math.floor(player.y + 1);
		end = player.y + player.height - 1;
		h = Math.floor(player.x + player.width - 1);
		for (var i = 0; i < end - start + 1; i++) {
			if (Math.floor(particles[start + i][h]) == 2) {
				particles[start + i][h] = 1.5;
				renderPix(start + i, h);
				gold++;
				goldSound.play();
				document.getElementById("goldcount").innerHTML = gold;
			}
			if (particles[start + 1][h - 1] % 1 > 0.7 && dmgCooldown < 0) {
				player.takeDamage();
			}
		}

		start = Math.floor(player.y + 1);
		end = player.y + player.height - 1;
		h = Math.floor(player.x);
		for (var i = 0; i < end - start + 1; i++) {
			if (Math.floor(particles[start + i][h]) == 2) {
				particles[start + i][h] = 1.5;
				renderPix(start + i, h);
				gold++;
				goldSound.play();
				document.getElementById("goldcount").innerHTML = gold;
			}
			if (particles[start + 1][h + 1] % 1 > 0.7 && dmgCooldown < 0) {
				player.takeDamage();
			}
		}

		if (dmgCooldown > 0) {
			if (dmgCooldown % 5 == 0 && damageMultiplier > 0) {
				player.render = false;
			} else {
				player.render = true;
			}
		}
	} catch (err) {
		// alert(err);
	}
};
