var snake;
var status_p;
var current_food;
var scoreboard;
var direction;
var top_coord = 500;
var left_coord = 900;
var score = 0;
var food_top = 0;
var food_left = 0;
var top_diff;
var left_diff;
var section;
var section_list = []
var main_timer;

window.onload = function(){
	snake = document.getElementById("snakeHead");
	snake.style.top = top_coord + "px";
	snake.style.left = left_coord + "px";
	scoreboard = document.getElementById("scoreboard");
	status_p = document.getElementById("status");
	main_timer = setInterval(main, 50);
	make_food();
};

document.onkeypress = function(key){
	if(key.keyCode == 119 && direction != 1) direction = -1;
	else if(key.keyCode == 115 && direction != -1) direction = 1;
	else if(key.keyCode == 100 && direction != -2) direction = 2;
	else if(key.keyCode == 97 && direction != 2) direction = -2;
}

function move() {
	if(direction == 1){
		top_coord += 10
		if (top_coord > 1000) top_coord = -30;
		snake.style.top = top_coord + "px";
	}
	if(direction == -1){
		top_coord -= 10
		if (top_coord < -30) top_coord = 1000;
		snake.style.top = top_coord + "px";
	}
	if(direction == 2){
		left_coord += 10
		if (left_coord > 1900) left_coord = -30;
		snake.style.left = left_coord + "px";
	}
	if(direction == -2){
		left_coord -= 10
		if (left_coord < -30) left_coord = 1900;
		snake.style.left = left_coord + "px";
	}
}

function increment_score() {
	score += 1;
	scoreboard.innerHTML = "Score: " + score;
	current_food.remove();
	make_food();
	/*if(score > 10) make_food();
	if(score > 20) make_food();
	if(score > 30) make_food();
	if(score > 40) make_food();*/
}

function make_food() {
	var food = document.createElement("div");
	food.classList.add("food");
	food.classList.add("snake");
	food.id = "food";
	food_top = Math.floor(Math.random() * Math.floor(960));
	food.style.top = food_top + "px";
	food_left = Math.floor(Math.random() * Math.floor(1790));
	food.style.left = food_left + "px";
	document.body.insertBefore(food, snake);
	current_food = document.getElementById("food");
}

function eat_food() {
	top_diff = top_coord - food_top;
	left_diff = left_coord - food_left;
	if(top_diff < 0) top_diff *= -1;
	if(left_diff < 0) left_diff *= -1;
	if(top_diff < 10 && left_diff < 10) {
		increment_score();
	}
}

function create_section() {
	var section_id = Math.floor((Math.random() * 2000))
	window['section'+section_id] = document.createElement("div");
	section = window['section'+section_id]
	window['section'+section_id].classList.add('snake');
	section.style.top = top_coord + 'px';
	section.style.left = left_coord + 'px';
	section.id = section_id;
	section.innerHTML = 0;
	section_list.push(window['section'+section_id]);
	document.body.insertBefore(window['section'+section_id], snake);
}

function section_main() {
	for(const item in section_list) {
		
		
		let section_top_coor = section_list[item].style.top;
		let section_left_coor = section_list[item].style.left;
		if(section_top_coor == top_coord + 'px' && section_left_coor == left_coord + 'px' && score > 1){
			//window.alert("Lose");
			status_p.innerHTML = "Lose!"
			clearInterval(main_timer);
		}
		
		let timer = parseInt(section_list[item].innerHTML,10);
		timer += 1;
		
		if(timer > (score*3)){
			section_list[item].remove();
			section_list.shift();
		}
		else {section_list[item].innerHTML = timer;}
		
	}
}

function main() {
	create_section();
	move();
	section_main();
	eat_food();
};