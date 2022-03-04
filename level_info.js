let groups = [
{group: 0, numLevels: 16, startNum: 0, title: 'The Basics'}, 
{group: 1, numLevels: 16, startNum: 16, title: 'Tap to Drop'}, 
{group: 2, numLevels: 16, startNum: 32, title: 'Tap to Spread'},
{group: 3, numLevels: 9, startNum: 27, title: 'Swipe to Control'},
{group: 4, numLevels: 6, startNum: 24, title: 'Extra Reach'},
{group: 5, numLevels: 6, startNum: 30, title: 'Big Radius'},
{group: 6, numLevels: 6, startNum: 36, title: 'Color Drain'},
{group: 7, numLevels: 6, startNum: 42, title: 'The Basics'},
{group: 8, numLevels: 6, startNum: 48, title: 'The Basics'},
{group: 9, numLevels: 6, startNum: 54, title: 'The Basics'},
{group: 10, numLevels: 6, startNum: 60, title: 'The Basics'},
{group: 11, numLevels: 6, startNum: 66, title: 'The Basics'},
{group: 12, numLevels: 6, startNum: 72, title: 'The Basics'},
{group: 13, numLevels: 6, startNum: 78, title: 'The Basics'},
{group: 14, numLevels: 6, startNum: 84, title: 'The Basics'},
{group: 15, numLevels: 6, startNum: 90, title: 'The Basics'},
{group: 16, numLevels: 6, startNum: 96, title: 'The Basics'},
{group: 17, numLevels: 6, startNum: 102, title: 'The Basics'},
{group: 18, numLevels: 6, startNum: 108, title: 'The Basics'},
{group: 19, numLevels: 6, startNum: 114, title: 'The Basics'},
{group: 20, numLevels: 6, startNum: 120, title: 'The Basics'},
{group: 21, numLevels: 6, startNum: 126, title: 'The Basics'},
{group: 22, numLevels: 6, startNum: 132, title: 'The Basics'},
];
//level data
/*
0 normal
1 drop
2 spread
3 guide
6 expand
7 large
8 small
9 color drain
*/

let levels = [
//group 0
{ level: 0, bombTypes: [0,1,2,3,6,7,8,9], title: 'BURST', bgColor: 0x000000, groupNum: 0, size: 0 }, 
{ level: 1, bombTypes: [1, 2,], title: 'EASY STAR', bgColor: 0x000000, groupNum: 0, size: 0 }, 
{ level: 2, bombTypes: [2, 2, 2, 8, 8,8,1,1], title: 'SWORD', bgColor: 0x000000, groupNum: 0, size: 0 }, 
{ level: 3, bombTypes: [0, 6, 6, 6, 0, 3, 0], title: 'PM GHOST', bgColor: 0x000000, groupNum: 0, size: 0 },
{ level: 4, bombTypes: [0, 1, 2, 3, 4, 5, 6,7,8,9], title: 'LIGHTENING', bgColor: 0x000000, groupNum: 0, size: 0 },
{level: 5, bombTypes: [8, 1, 1, 1, 8, 0, 1], title: 'MEGA MAN', bgColor: 0x000000, groupNum: 0, size: 0}, 
//group 1
{level: 6, bombTypes: [1,1], title: 'Tap to Drop', bgColor: 0x000000, groupNum: 1, size: 0}, 

{level: 7, bombTypes: [1,1, 0, 0, 1, 8, 8], title: 'OLD MARIO', bgColor: 0x000000, groupNum: 1, size: 0}, 
{level: 8, bombTypes: [0,0, 1, 1, 0,8,8], title: 'G-DUDE', bgColor: 0x000000, groupNum: 1, size: 0},
{level: 9, bombTypes: [1,1, 0, 1,8,8,1,1,1, 0,8,8], title: 'R2-D2', bgColor: 0x000000, groupNum: 1, size: 0},
{level: 10, bombTypes: [0,1, 1, 0,0, 1,1,8,8,8], title: 'TNT', bgColor: 0x000000, groupNum: 1, size: 0},
{level: 11, bombTypes: [1,8,1,8, 1, 0, 0,1,8,1,8,1,8,8,8], title: 'AT PEACE', bgColor: 0x000000, groupNum: 1, size: 0},
//group 2
{level: 12, bombTypes: [2,0,2,0,1,8,1,0,2,2,8,1,2,8], title: 'FLOWER POWER', bgColor: 0x000000, groupNum: 2, size: 0},
{level: 13, bombTypes: [2,2,2,0,0,1,1,1,0,2,8,8], title: 'OVER THE MOON', bgColor: 0x000000, groupNum: 2, size: 0},
{level: 14, bombTypes: [1,2,1,2,0,0,1,2,8], title: 'GOOD BOY', bgColor: 0x000000, groupNum: 2, size: 0},
{level: 15, bombTypes: [1,1,2,1,2,1,2,0,2,0,2,0,1,0,8,2,1,8], title: 'POTION', bgColor: 0xB4A263, groupNum: 2, size: 0},
{level: 16, bombTypes: [2,2,0,1,1,2, 2, 0, 0,1,2,8,1,8], title: 'GROWING GROOT', bgColor: 0x000000, groupNum: 2, size: 0},
{level: 17, bombTypes: [0,1,2,2,2,0,8,8,8, ], title: 'RANDOM DESIGN', bgColor: 0x000000, groupNum: 2, size: 0},
//group 3
{level: 18, bombTypes: [0,3,3,1,3,0,1,2,2,2,2,0,1,2,2,8,8,8], title: 'AT-AT', bgColor: 0xF2F2F2, groupNum: 3, size: 0},
{level: 19, bombTypes: [3,3,3,3,1,1,2,2,0,0,1,2,3], title: 'SPACE INVADERS', bgColor: 0xCCCCCC, groupNum: 3, size: 0},
{level: 20, bombTypes: [3,1,2,1,2,1,2,1,2,3,2,2,0,0,0,1,8,2,2,1,0,0], title: 'VADER', bgColor: 0xCCCCCC, groupNum: 3, size: 0},
{level: 21, bombTypes: [3,2,1,2,1,0,1,0,1,8,2,8,2,3,2,0,3], title: 'FISH BOWL', bgColor: 0xafd7ed, groupNum: 3, size: 0},
{level: 22, bombTypes: [1,1,2,3,2,3,2,3,2,0,8,0,0], title: 'BAT SIGNAL', bgColor: 0xd6d918, groupNum: 3, size: 0},
{level: 23, bombTypes: [1,1,3,3,3,0,0,2,2,2,0], title: 'LAUGHING CRYING', bgColor: 0xCCCCCC, groupNum: 3, size: 0},
//group 4
{level: 24, bombTypes: [6,6,6, 1,2,3,0,0,6,8,8,6,2,8], title: 'BET YOU CANT STOP', bgColor: 0xd9181e, groupNum: 4, size: 0},
{level: 25, bombTypes: [1,0,6,6,1,2,2,0,3,3,0,1,3,6,8], title: 'ACE', bgColor: 0xfafafa, groupNum: 4, size: 0},
{level: 26, bombTypes: [2,6,6,1,0,3,3,0,6,6,0,0,8], title: 'GIMLI SON OF GLOAIN', bgColor: 0xCCCCCC, groupNum: 4, size: 0},
{level: 27, bombTypes: [2,6,6,1,0,3,3,0,6,6,0,0,8], title: 'FRODO AND STING', bgColor: 0xCCCCCC, groupNum: 4, size: 0 },
{level: 28, bombTypes: [6,6,6,0,1,1,1,1,3,2, 2, 6,6,3,2,0,8,8], title: 'TREE OF GONDOR', bgColor: 0x000000, groupNum: 4, size: 1},
{level: 29, bombTypes: [6,6,3,0,2, 2, 0], title: 'COOL', bgColor: 0x456173, groupNum: 4, size: 0},

//group 5
{level: 30, bombTypes: [7,7,1,2, 2, 7, 7,3,6,6,7,0,0,1,3,6,6,3,8,2,8], title: 'FALCON', bgColor: 0x000000, groupNum: 5, size: 0},
{level: 31, bombTypes: [2,7,7,1,2, 2, 7,3, 0,1,3,3,8], title: 'CALENDAR', bgColor: 0xECECEC, groupNum: 5, size: 0},
{level: 32, bombTypes: [7,7,7,1,0,1,2,6,6,7,3,3,2,6,7,1,3, 0,8], title: 'BABY YODA', bgColor: 0x747B5E, groupNum: 5, size: 1},
{level: 33, bombTypes: [7,0,1,2, 2, 7, 2,0,1,8,8,8], title: 'EARTH', bgColor: 0x000000, groupNum: 5, size: 0},
{level: 34, bombTypes: [6,6,7,0,1,2,6, 2, 7, 0,2,6,1,8,8,8], title: 'BENDERS', bgColor: 0xf25f5f, groupNum: 5, size: 0},
{level: 35, bombTypes: [7,0,6,1,2, 2, 3,7, 2,2,8,2,8,0,1], title: 'FAMOUS SHIP', bgColor: 0x8899d8, groupNum: 5, size: 0},
//group 6
{level: 36, bombTypes: [9,0,9,2, 2, 7, 0,2,6,1], title: 'FAMOUS SHIP DOWN', bgColor: 0x8899d8, groupNum: 6, size: 1},
{level: 37, bombTypes: [0,9,0,9,7,7,1,2,6,6,2, 7, 0,1,8,8], title: 'FETT', bgColor: 0x9CB3CE, groupNum: 6, size: 0},
{level: 38, bombTypes: [0,9,0,9,0,1,2, 2, 7, 7,2,8,80,1], title: 'BOMBS', bgColor: 0x000000, groupNum: 6, size: 0},
{level: 39, bombTypes: [9,0,1,2,9,2, 2, 7, 0,1], title: 'X-WING', bgColor: 0x9CB3CE, groupNum: 6, size: 0},
{level: 40, bombTypes: [2,2,7,0,3,1,9,6,2, 8,2,3, 7, 0,1], title: 'TOP GUN', bgColor: 0x9FCEE3, groupNum: 6, size: 1},
{level: 41, bombTypes: [9,9,9,9,0,2,2,2,8,8,8], title: 'LUKE\'S SABERS', bgColor: 0x9CB3CE, groupNum: 6, size: 0},
//group 7
{level: 42, bombTypes: [7,7,7,2,2,6,0,9,2, 2], title: 'Time Machine', bgColor: 0xb2e2eb, groupNum: 7, size: 1},
{level: 43, bombTypes: [9,9,9,9,9,1,6,3,8,0,8,7,8,8], title: 'World Map', bgColor: 0x6297c6, groupNum: 7, size: 1},
{level: 44, bombTypes: [7,0,9,9,1,2, 2,6, 7,7,7,7, 0,8,6,6,1], title: 'Fake Logo', bgColor: 0x000000, groupNum: 7, size: 1},
{level: 45, bombTypes: [7,0,9,6,7,7,1,2, 9,2,7,6,7,6,7, 6,2,6,1,7,9, 0,1], title: 'NASA', bgColor: 0x2757a9, groupNum: 7, size: 1},
{level: 46, bombTypes: [7,9,0,9,7,7,1,2, 2, 7, 0,0,8], title: 'Dan', bgColor: 0x000000, groupNum: 7, size: 0},
{level: 47, bombTypes: [6,0,7,7,1,9,2, 2, 1,6,7, 0,1], title: 'Gandolf', bgColor: 0x695d89, groupNum: 7, size: 0},
//group 8
{level: 48, bombTypes: [7,9,7,9,6,6,6,0,1,2,9,3, 2, 7, 0,1], title: 'Harley', bgColor: 0x794101, groupNum: 8, size: 2},
{level: 49, bombTypes: [7,9,0,1,2, 0,], title: 'Go Brownies', bgColor: 0x237321, groupNum: 8, size: 0},
{level: 50, bombTypes: [7,9,0,1,9,2, 7,6,2, 7, 0,1,8], title: 'Football', bgColor: 0x237321, groupNum: 8, size: 0},
{level: 51, bombTypes: [7,9,9,3,0,7,7,1,2, 2,9,8,8, 7, 0,1], title: 'Skyline', bgColor: 0x6b8fd1, groupNum: 8, size: 1},
{level: 52, bombTypes: [9,7,2,3,0,7,7,1,2, 2,6, 7, 0,1], title: 'Nightstand', bgColor: 0xc7dae0, groupNum: 8, size: 0},
{level: 53, bombTypes: [7,0,7,7,1,2, 2, 7, 0,1], title: 'Chopper', bgColor: 0x3f3172, groupNum: 8, size: 1},
//group 9
{level: 54, bombTypes: [7,0,1,2,6,6,9,3,2, 2, 7, 0,8,7,0,8,1], title: 'Eye of Sauron', bgColor: 0x000000, groupNum: 9, size: 0},
{level: 55, bombTypes: [7,0,9,7,6,1,2, 2, 7, 7,3,3,0,1], title: 'BTF Icons', bgColor: 0xd6cef3, groupNum: 9, size: 0},
{level: 56, bombTypes: [7,9,0,1,2,9,6,6,9,6,9,2, 7,1,2, 7,2,8,0,1], title: 'Space Shuttle', bgColor: 0xa8eeff, groupNum: 9, size: 0},
{level: 57, bombTypes: [7,9,7,7,1,2, 2, 7, 0,1], title: 'Light Bulb', bgColor: 0x000000, groupNum: 9, size: 0},
{level: 58, bombTypes: [0,9,0,7,1,2, 2, 7, 0,1], title: 'Huntini', bgColor: 0xe8e292, groupNum: 9, size: 0},
{level: 59, bombTypes: [7,9,2,7,7,1,2, 2, 7, 0,9,7,7,8,2,6,9,6,6,9,7,3,1], title: 'Portrait', bgColor: 0xffeed6, groupNum: 9, size: 0},

//group 10
{level: 60, bombTypes: [1,0,6,9,6,2,1,2,3,1,8,2], title: 'LEM', bgColor: 0x000000, groupNum: 10, size: 0},
{level: 61, bombTypes: [0,8,9,3,3,2,2,8], title: 'Light Up', bgColor: 0x000000, groupNum: 10, size: 0},
{level: 62, bombTypes: [6,6,3,3,7,0,0,2,2,1,2,9], title: 'RoboCop', bgColor: 0x746b94, groupNum: 10, size: 0},
{level: 63, bombTypes: [2,9,1,1,3,3,2, 2, 0,1], title: 'Longing', bgColor: 0xdbdad7, groupNum: 10, size: 0},
{level: 64, bombTypes: [0,9,0,7,1,2, 2, 7, 0,1], title: 'Indy', bgColor: 0xcfdb94, groupNum: 10, size: 0},
{level: 65, bombTypes: [2,2,1,3,1,0,9,2,3,0,6,2,8], title: 'Samus', bgColor: 0x000000, groupNum: 10, size: 0},
//group 11
{level: 66, bombTypes: [2,7,0,2,3,9,0,7,8,2,1], title: 'Carbonite', bgColor: 0x968888, groupNum: 11, size: 0},
{level: 67, bombTypes: [6,1,2,6,3,3,1,3,3,6], title: 'I <3 NY', bgColor: 0x000000, groupNum: 11, size: 0},
{level: 68, bombTypes: [2,2,1,3,8,9,1,7,1,0,0,7,,3,3,2], title: 'Ringwraith', bgColor: 0x0b2951, groupNum: 11, size: 0},
{level: 69, bombTypes: [3,9,7,7,1,2, 2, 7, 6,6,8,8,0,1], title: 'SM Samus', bgColor: 0x787878, groupNum: 11, size: 0},
{level: 70, bombTypes: [3,6,6,2,3,3,2,0,8,3,3], title: 'NES Controller', bgColor: 0xededed, groupNum: 11, size: 0},
{level: 71, bombTypes: [1,9,2,7,1,3,8,8,6,8,1,2,6,3,7,3,3,8,1,3,8], title: 'Smartphone', bgColor: 0x7fb2c3, groupNum: 11, size: 0},
//group 12
{level: 72, bombTypes: [7,0,0,7,8,6,6,3,3,2,1], title: 'Nokia', bgColor: 0x000000, groupNum: 12, size: 0},
{level: 73, bombTypes: [0,0,1,6,9,9,3,3,1,7,3,8], title: 'Pocket Watch', bgColor: 0x1a2d51, groupNum: 12, size: 0},
{level: 74, bombTypes: [6,1,1,7,7,9,6,1,1,1,3,7,2,0,0,3,3,1,8,3,3,7,8], title: 'The LOTR', bgColor: 0x736464, groupNum: 12, size: 0},
{level: 75, bombTypes: [2,2,3,1,1,2,2,2,8,3,0], title: 'RIP', bgColor: 0x000000, groupNum: 12, size: 0},
{level: 76, bombTypes: [0,7,3,3,1,2,2,7,3,9,8], title: 'Rocky', bgColor: 0xb09c9c, groupNum: 12, size: 0},
{level: 77, bombTypes: [6,6,0,9,2,2,7,3,0,1], title: 'Hungry Hungry', bgColor: 0x000000, groupNum: 12, size: 0},
//group 13
{level: 78, bombTypes: [7,0,6,0,7,8,3,2,1], title: 'Leaf', bgColor: 0x4f709c, groupNum: 13, size: 0},
{level: 79, bombTypes: [9,0,0,1,6,9,8,3,3], title: 'Jedi', bgColor: 0x2a2447, groupNum: 13, size: 0},
{level: 80, bombTypes: [6,1,1,7,7,9,6,2,0,3,2,7,0,8,8], title: 'Work From Home', bgColor: 0x7da19d, groupNum: 13, size: 0},
{level: 81, bombTypes: [7,2,2,3,1,1,2,2,2,8,9,1,1,0], title: 'Casio', bgColor: 0x99d9be, groupNum: 13, size: 0},
{level: 82, bombTypes: [0,7,3,3,1,2,7,7,2,0,0,6,1,2], title: 'Hiker', bgColor: 0x65b5fb, groupNum: 13, size: 0},
{level: 83, bombTypes: [6,7,6,0,7,7,6,6,9,2,2,7,3,3,0,2,8,8,8], title: 'Mother Brain', bgColor: 0x000000, groupNum: 13, size: 2},
//group 14
{level: 84, bombTypes: [7,0,0,1,1,3,9,6,7,8,2,1], title: 'Raiders', bgColor: 0xf8fad6, groupNum: 14, size: 0},
{level: 85, bombTypes: [0,0,1,6,9,9,3,3], title: 'Dumb Phone', bgColor: 0x5ab217, groupNum: 14, size: 1},
{level: 86, bombTypes: [6,1,1,7,7,9,6,2,0,0,8,8], title: 'Temple', bgColor: 0xf8fad6, groupNum: 14, size: 0},
{level: 87, bombTypes: [2,2,3,1,1,2,2,2,8,0], title: 'Olympic', bgColor: 0xe6e5e5, groupNum: 14, size: 0},
{level: 88, bombTypes: [0,7,3,3,1,2,1,3,2], title: 'Crusade', bgColor: 0xf8fad6, groupNum: 14, size: 0},
{level: 89, bombTypes: [6,6,0,7,2,2,7,6,6,6,3,0,2,1,7,8,7,8,7,8,9,9,7,2], title: 'Floppy', bgColor: 0xf5f5f5, groupNum: 14, size: 0},
//group 15
{level: 90, bombTypes: [7,0,0,7,8,2,6,7,1,3,3,7,9,6,1,8,3,1,7,1], title: 'Old Computer', bgColor: 0x3938ae, groupNum: 15, size: 0},
{level: 91, bombTypes: [0,0,1,6,7,7,9,9,3,1,2,3], title: 'Episode IV', bgColor: 0x000000, groupNum: 15, size: 0},
{level: 92, bombTypes: [6,1,1,7,7,9,6,2,0,0,8,8], title: 'Witch King', bgColor: 0x949494, groupNum: 15, size: 0},
{level: 93, bombTypes: [2,2,3,1,1,2,2,2,8,0], title: 'McFly', bgColor: 0x2a2447, groupNum: 15, size: 0},
{level: 94, bombTypes: [0,7,3,3,1,2,2], title: 'Headphones', bgColor: 0x000000, groupNum: 15, size: 0},
{level: 95, bombTypes: [6,6,0,9,2,2,7,3,0,2,8,8,8], title: 'Cassette Tape', bgColor: 0xf5f5f5, groupNum: 15, size: 0},
//group 16
{level: 96, bombTypes: [7,0,0,7,8,2,7,1,2,1,2,1], title: 'Excel', bgColor: 0xf5f5f5, groupNum: 16, size: 0},
{level: 97, bombTypes: [0,0,1,6,9,9,3,3], title: 'Kid Icarus', bgColor: 0x000000, groupNum: 16, size: 0},
{level: 98, bombTypes: [6,1,1,7,7,9,6,2,3,2,7,7,1,9,0,9,0,8,8], title: 'iPod Classic', bgColor: 0x404040, groupNum: 16, size: 0},
{level: 99, bombTypes: [2,2,3,1,1,2,2,2,8,0], title: 'Droids', bgColor: 0x9ebbff, groupNum: 16, size: 0},
{level: 100, bombTypes: [0,7,3,3,9,1,2,9,7,9,8,1,2,3,2], title: 'USA', bgColor: 0xffffff, groupNum: 16, size: 1},
{level: 101, bombTypes: [6,6,0,9,2,2,7,3,0,2,8,8,8], title: 'Laptop', bgColor: 0x8c8c8c, groupNum: 16, size: 0},
//group 17
{level: 102, bombTypes: [6,1,1,7,0,0,6,2,2,7,8,2,1], title: 'PowerPoint', bgColor: 0x000000, groupNum: 17, size: 0},
{level: 103, bombTypes: [0,0,1,6,9,9,3,3], title: 'Sheild', bgColor: 0x67c16d, groupNum: 17, size: 0},
{level: 104, bombTypes: [6,1,1,7,7,9,6,2,0,0,8,8], title: 'Liberty', bgColor: 0x1a243d, groupNum: 17, size: 0},
{level: 105, bombTypes: [2,2,3,1,1,2,2,2,8,0], title: 'Ohio', bgColor: 0x000000, groupNum: 17, size: 0},
{level: 106, bombTypes: [0,7,3,3,1,2,2], title: 'Walkman', bgColor: 0xf5f5f5, groupNum: 17, size: 0},
{level: 107, bombTypes: [6,6,0,9,2,2,7,3,0,2,8,8,8], title: 'Contra', bgColor: 0x36a220, groupNum: 17, size: 0},
//group 18
{level: 108, bombTypes: [7,0,0,7,3,3,8,2,1], title: 'Helmet', bgColor: 0x000000, groupNum: 18, size: 0},
{level: 109, bombTypes: [0,0,1,6,9,9,3,3], title: 'Lincoln', bgColor: 0x000000, groupNum: 18, size: 0},
{level: 110, bombTypes: [6,1,1,7,7,9,6,2,0,0,8,8], title: 'Excite Bike', bgColor: 0xc4c4c4, groupNum: 18, size: 0},
{level: 111, bombTypes: [2,2,3,1,1,2,2,2,8,0], title: 'Storm Trooper', bgColor: 0xf5f5f5, groupNum: 18, size: 0},
{level: 112, bombTypes: [0,7,3,3,1,2,2,7,7,6,1,3,2,0], title: 'Arcade', bgColor: 0xc4d98c, groupNum: 18, size: 0},
{level: 113, bombTypes: [6,6,0,9,2,2,7,3,0,2,8,8,8], title: 'Catapult', bgColor: 0xb5c3d9, groupNum: 18, size: 1},
//group 19
{level: 114, bombTypes: [7,0,0,7,8,2,6,1,6,7,2,1], title: 'Castle', bgColor: 0x1a243d, groupNum: 19, size: 0},
{level: 115, bombTypes: [0,0,1,6,9,9,3,3,7,7,1,2,3], title: 'Cartrages', bgColor: 0x000000, groupNum: 19, size: 0},
{level: 116, bombTypes: [6,1,1,7,7,7,2,1,6,2,6,2,0,0,8,8], title: 'Pac Man', bgColor: 0x000000, groupNum: 19, size: 0},
{level: 117, bombTypes: [2,2,3,1,1,2,2,2,8,0], title: 'SW Logo', bgColor: 0xf5f5f5, groupNum: 19, size: 1},
{level: 118, bombTypes: [0,7,3,3,1,2,2], title: 'Bella', bgColor: 0xffd28e, groupNum: 19, size: 2},
{level: 119, bombTypes: [6,6,0,9,2,2,7,3,0,2,8,8,8], title: 'USA 2', bgColor: 0xffffff, groupNum: 19, size: 1},
//group 20
{level: 120, bombTypes: [7,0,0,7,8,2,1], title: 'Motherboard', bgColor: 0xededed, groupNum: 20, size: 0},
{level: 121, bombTypes: [0,0,1,6,9,9,3,7,6,1,9,6,1,2,2,3], title: 'FINN', bgColor: 0x000000, groupNum: 20, size: 0},
{level: 122, bombTypes: [6,1,1,7,7,9,6,2,0,0,8,8], title: 'Chip', bgColor: 0x336c55, groupNum: 20, size: 0},
{level: 123, bombTypes: [2,2,3,1,1,2,2,2,8,0], title: 'Magnet', bgColor: 0x336c55, groupNum: 20, size: 0},
{level: 124, bombTypes: [0,7,3,3,1,2,2], title: 'Autobots', bgColor: 0x696969, groupNum: 20, size: 0},
{level: 125, bombTypes: [6,6,0,9,2,2,7,3,0,2,8,8,8], title: 'Stamps', bgColor: 0xe3e3e3, groupNum: 20, size: 1},
//group 21
{level: 126, bombTypes: [7,0,0,7,8,2,1,6, 8,2,3], title: 'Mailbox', bgColor: 0x000000, groupNum: 21, size: 0},
{level: 127, bombTypes: [0,0,1,6,9,9,3,3], title: 'Dark Side', bgColor: 0x000000, groupNum: 21, size: 0},
{level: 128, bombTypes: [6,1,1,7,7,9,6,2,0,0,8,8], title: 'Fellowship I', bgColor: 0x77b692, groupNum: 21, size: 0},
{level: 129, bombTypes: [2,2,3,1,1,2,2,2,8,0], title: 'Fellowship II', bgColor: 0x77b692, groupNum: 21, size: 0},
{level: 130, bombTypes: [0,7,3,3,1,2,2], title: 'Burger and Fries', bgColor: 0xe6efc2, groupNum: 21, size: 0},
{level: 131, bombTypes: [6,6,0,9,2,2,7,3,0,2,8,8,8], title: 'E.T.', bgColor: 0x000000, groupNum: 21, size: 2},
//group 22
{level: 132, bombTypes: [0,6,1,2,3,2,1,2,9], title: 'GHOSTBUSTERS', bgColor: 0x000000, groupNum: 22, size: 0},
{level: 133, bombTypes: [0,6,1,2,3,2,1,2,9], title: 'BORN IN THE USA', bgColor: 0xa6b4dd, groupNum: 22, size: 0},
{level: 134, bombTypes: [6,1,1,7,7,9,6,2,0,0,8,8], title: 'PRINCESS BRIDE', bgColor: 0x000000, groupNum: 22, size: 0},
{level: 135, bombTypes: [7,9,0,0,1,1,2,3,8], title: 'ATARI', bgColor: 0xC63939, groupNum: 22, size: 0},
{level: 136, bombTypes: [6,0,3,3,2,2,1,1,3], title: 'LOCAMOTIVE', bgColor: 0x333f70, groupNum: 22, size: 1},
{level: 137, bombTypes: [8,9,6,9,2,2,1,0,7], title: 'GLOBE', bgColor: 0xc4bbbb, groupNum: 22, size: 0},

];
