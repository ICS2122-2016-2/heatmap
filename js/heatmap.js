const N_AISLES  = 15;
const TILE_SIZE = 10;
const TILES_BETWEEN_SHELVES = 5;
const AISLE_LABEL_FONT = "14px Arial";
const AISLE_LABEL_COLOR = "#000000";
const X_OFFSET = 0;
const Y_OFFSET = 1;
const LARGE_SHELF_SIZE = 45;
const SMALL_SHELF_SIZE = 40;
const TRANSVERSAL_AISLE_WIDTH = 5;
const LARGE_SHELF_FILL_COLOR = "#000000";
const SMALL_SHELF_FILL_COLOR = "#000000";

// Create and fill the market canvas
var stage = new createjs.Stage("marketCanvas"),
	largeShelf = new createjs.Shape(),
	smallShelf = new createjs.Shape(),
	leftLargeShelf, rightLargeShelf, leftSmallShelf, rightSmallShelf, aisleLabel;

largeShelf.graphics.beginFill(LARGE_SHELF_FILL_COLOR).drawRect(
	0, 0,
	TILE_SIZE,
	LARGE_SHELF_SIZE * TILE_SIZE
);
smallShelf.graphics.beginFill(SMALL_SHELF_FILL_COLOR).drawRect(
	0, 0,
	TILE_SIZE,
	SMALL_SHELF_SIZE * TILE_SIZE
);

for(var i = 0; i < N_AISLES; i++) {
	leftLargeShelf = largeShelf.clone();
	rightLargeShelf = largeShelf.clone();
	leftSmallShelf = smallShelf.clone();
	rightSmallShelf = smallShelf.clone();
	leftLargeShelf.x = leftSmallShelf.x = i * (TILES_BETWEEN_SHELVES + 1) * TILE_SIZE;
	// We reuse the previously computed value...
	rightLargeShelf.x = rightSmallShelf.x = leftLargeShelf.x + TILES_BETWEEN_SHELVES * TILE_SIZE;
	leftSmallShelf.y = rightSmallShelf.y = Y_OFFSET * TILE_SIZE;
	leftLargeShelf.y = rightLargeShelf.y = (SMALL_SHELF_SIZE + TRANSVERSAL_AISLE_WIDTH + Y_OFFSET) * TILE_SIZE;

	aisleLabel = new createjs.Text("P" + (i + 1), AISLE_LABEL_FONT, AISLE_LABEL_COLOR);
	aisleLabel.x = leftLargeShelf.x + (TILES_BETWEEN_SHELVES / 2 - .4) * TILE_SIZE;

	// Add the childs...
	stage.addChild(leftSmallShelf);
	stage.addChild(rightSmallShelf);
	stage.addChild(leftLargeShelf);
	stage.addChild(rightLargeShelf);
	stage.addChild(aisleLabel);
}

stage.update();

// Create the heatmap
const heatmapInstance = h337.create({ container: document.getElementById("heatmapWrapper") });

var points = [];
var max = 0;
var width = 900;
var height = 950;
var re = /^\(([0-9]+), ([0-9]+)\)$/;
var key, value, parsed, point;
for(key in DATAPOINTS) {
	if(DATAPOINTS.hasOwnProperty(key)) {
		value = DATAPOINTS[key];
		parsed = key.match(re);
		point = {
			x: parseInt(parsed[1]) * 10,
			y: parseInt(parsed[2]) * 10,
			value: value
		};
		max = Math.max(value, max);
		points.push(point);
	}
}
var data = { 
  max: max, 
  min: 0,
  data: points 
};
heatmapInstance.setData(data);
