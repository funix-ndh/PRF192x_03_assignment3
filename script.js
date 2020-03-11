// game object
var Game = function (doors, doorEls, infoEl, currentStreak, bestStreak) {
  this.remain = 3;
  this.canMove = true;
  this.doors = doors;
  this.doorEls = doorEls;
  this.infoEl = infoEl;
  this.currentStreak = currentStreak;
  this.bestStreak = bestStreak;
}
Game.prototype.resetGame = function () {
  for (var item of this.doorEls) {
    item.setAttribute('src', './images/closed_door.svg');
    item.setAttribute('picked', '0');
  }
  this.infoEl.innerHTML = "Good luck!";
  this.remain = 3;
  this.canMove = true;
}
Game.prototype.isGameOver = function (gameObj) {
  if (this.remain === 1) {
    this.infoEl.innerHTML = "You win! Play again?"
    this.currentStreak.innerHTML = parseFloat(this.currentStreak.innerHTML) + 1;
    if (parseFloat(this.currentStreak.innerHTML) > parseFloat(this.bestStreak.innerHTML)) {
      this.bestStreak.innerHTML = this.currentStreak.innerHTML;
    }
    return true;
  }
  if (gameObj.isLose) {
    this.infoEl.innerHTML = "Game over! Play again?"
    this.currentStreak.innerHTML = 0;
    return true;
  }
  return false;
}
Game.prototype.canContinue = function (index) {
  return this.canMove && this.doorEls[index].getAttribute('picked') !== '1';
}
Game.prototype.openDoor = function (index) {
  var rand = Math.floor(Math.random() * this.remain);
  var door = this.doors[rand];

  this.doorEls[index].setAttribute("src", door.src);

  if (this.isGameOver(door)) {
    this.canMove = false;
  }

  this.remain--;
  this.doors[rand] = this.doors[this.remain];
  this.doors[this.remain] = door;
  this.doorEls[index].setAttribute('picked', '1');
}

// game states
var doors = [
  {src: "./images/beach.svg", isLose: false},
  {src: "./images/space.svg", isLose: false},
  {src: "./images/robot.svg", isLose: true}
];

// elements
var doorEls = document.getElementsByClassName("game");
var infoEl = document.getElementById('info');
var currentStreak = document.getElementById('current-streak');
var bestStreak = document.getElementById('best-streak');

var game = new Game(doors, doorEls, infoEl, currentStreak, bestStreak);

var onItemClicked = function (e) {
  var index = parseFloat(e.target.getAttribute("index"));
  if (!game.canContinue(index)) return;
  game.openDoor(index);
}

for (var item of doorEls) {
  item.addEventListener('click', onItemClicked)
}

var onInfoClicked = function () {
  game.resetGame(doors);
}

infoEl.addEventListener('click', onInfoClicked)

