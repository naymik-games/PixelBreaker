function fill(){
					var col = Math.floor(game.input.worldX / tileSize);
					var row = Math.floor(game.input.worldY / tileSize);
					floodFill(row,col);
				}
				
				function floodFill(row,col){
					if(fillMap[col][row].v==0){
						fillMap[col][row].v=2;
						fillMap[col][row].t.tint=colors[2];
						floodFill(row+1,col);
        					floodFill(row-1,col);
        					floodFill(row,col+1);
        					floodFill(row,col-1);		
					}
					
					
					
					// in preload()
this.load.json('levelData', 'assets/level.json');


// in create()
let data = this.cache.json.get('levelData');
 
				}