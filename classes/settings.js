let gameOptions = {};

let gameOptionsSmall = {
  cols: 35,
  rows:56,
  offSetX: 0,
  offSetY: 75,
  ballSpeed: 400,
  maxY: 50,
}

let gameOptionsLarge = {
  cols: 55,
  rows:90,
  offSetX: 0,
  offSetY: 75,
  ballSpeed: 400,
  maxY: 85,
}
let gameOptionsExtraLarge = {
  cols: 85,
  rows:135,
  offSetX: 0,
  offSetY: 75,
  ballSpeed: 400,
  maxY: 130,
}

grid = [];
let gridValue = [];

currentShape = { row: 0, col: 0, shape: undefined };
const WAITING_FOR_PLAYER_INPUT = 0;
const PLAYER_IS_AIMING = 1;
const BALLS_ARE_RUNNING = 2;
const ARCADE_PHYSICS_IS_UPDATING = 3;
const PREPARING_FOR_NEXT_MOVE = 4;

let bgColor = 0x000000;

let onGroup = 0;
let onLevel = 0;
let soundOn = true;
let detonaterOn = false;
var defaultValuesOptions = {
	soundfx: true,
	detonater: false
}
var defaultValues = {

levelStatus: [
-1,-1,-1,-1,-1,-1, 
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
],
  coins: 50,
  group: 0
}
var coinCount = 0;
var gameSettings = {};
var gameSettingsOptions = {};
/* 
levelStatus: [
-1,-2,-2,-2,-2,-2, 
-2,-2,-2,-2,-2,-2,
-2,-2,-2,-2,-2,-2,
-2,-2,-2,-2,-2,-2,
-2,-2,-2,-2,-2,-2,
-2,-2,-2,-2,-2,-2,
-2,-2,-2,-2,-2,-2,
-2,-2,-2
],

levelStatus: [
7,0,4,22,13,0, 
6,-1,-2,-2,-2,-2,
-2,-2,-2,-2,-2,-2,
-2,-2,-2,-2,-2,-2,
-2,-2,-2,-2,-2,-2,
-2,-2,-2,-2,-2,-2,
-2,-2,-2,-2,-2,-2,
-2,-2,-2
],

levelStatus: [
-1,-1,-1,-1,-1,-1, 
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-2,-2,-2
],



*/
