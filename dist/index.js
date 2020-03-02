import { World } from './mapDigger.js';
const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");
context.font = "20px Arial";
let world = new World(50, 20);
draw(world.map, 20, 20, canvas);
function draw(map, charWitdh, charHeigth, canvas) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    let y = charHeigth;
    map.forEach(row => {
        let x = 0;
        row.forEach(tile => {
            context.fillText(tile.glyph, x, y);
            x += charWitdh;
        });
        y += charHeigth;
    });
}
