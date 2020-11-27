// ---
function generateNaive(x, y) {
    let rectangles = generateCell(x + "," + y + "," + SEED);
    let output = [];
    for (let i = 0; i < rectangles.length; i++) {
        let r = rectangles[i];

        // remove the rectangles that overlap the border
        if (r.x + r.w < WIDTH && r.y + r.h < HEIGHT) {
            // translate the rectangle by the cell position
            output.push({
                x: r.x + WIDTH * x,
                y: r.y + HEIGHT * y,
                w: r.w,
                h: r.h
            });
        }
    }
    return output;
}
// ---

window.addEventListener('load', function() {
    WIDTH = 100;
    HEIGHT = 100;
    N = 100;

    let rectangles = [];
    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
            rectangles = rectangles.concat(generateNaive(x, y));
        }
    }

    let canvas = document.getElementById("canvas_naive");
    let c = canvas.getContext("2d");

    c.fillStyle = "#888";

    for (let i = 0; i < rectangles.length; i++) {
        let r = rectangles[i];
        c.fillRect(
            Math.floor(r.x),
            Math.floor(r.y),
            Math.floor(r.w),
            Math.floor(r.h));
    }
});
