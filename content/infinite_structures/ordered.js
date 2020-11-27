// ---
function generateOrdered(x, y, rectangles) {
    let cell = generateCell(x + "," + y + "," + SEED);
    for (let i = 0; i < cell.length; i++) {
        let r1 = cell[i];

        // translate the rectangle by the cell position
        r1.x += x * WIDTH;
        r1.y += y * HEIGHT;

        // test if new rectangles overlaps any previous one
        // (I know this can be done more efficiently)
        let intersecting = false;
        for (let j = 0; j < rectangles.length; j++) {
            let r2 = rectangles[j];

            if (r1.x <= r2.x + r2.w && r1.x + r1.w >= r2.x &&
                r1.y <= r2.y + r2.h && r1.y + r1.h >= r2.y) {
                intersecting = true;
                break;
            }
        }

        if (!intersecting) {
            rectangles.push(r1);
        }
    }
}
// ---

window.addEventListener('load', function() {
    WIDTH = 150;
    HEIGHT = 150;
    N = 40;
    MAX_SIZE = 100;

    let canvas = document.getElementById("canvas_ordered");
    let c = canvas.getContext("2d");

    c.fillStyle = "#888";

    let state = 0;
    let rectangles1 = [];
    let rectangles2 = [];

    function draw() {

        for (let i = 0; i < rectangles1.length; i++) {
            let r = rectangles1[i];
            r.w = Math.min(r.w, 2 * WIDTH - r.x);
            c.fillRect(
                Math.floor(r.x),
                Math.floor(r.y),
                Math.floor(r.w),
                Math.floor(r.h));
        }


        for (let i = 0; i < rectangles2.length; i++) {
            let r = rectangles2[i];
            c.fillRect(
                Math.floor(r.x) + 2 * WIDTH + 30,
                Math.floor(r.y),
                Math.floor(r.w),
                Math.floor(r.h));
        }

    }

    function tick() {
        switch (state) {
            case 0:
                c.clearRect(0, 0, canvas.width, canvas.height);
                SEED = Math.random();
                rectangles1 = [];
                rectangles2 = [];
                generateOrdered(0, 0, rectangles1);
                generateOrdered(0, 0, rectangles2);
                break;
            case 1:
                generateOrdered(1, 0, rectangles1);
                generateOrdered(0, 1, rectangles2);
                break;
            case 2:
                generateOrdered(1, 1, rectangles1);
                generateOrdered(1, 1, rectangles2);
                break;
            case 3:
                generateOrdered(0, 1, rectangles1);
                generateOrdered(1, 0, rectangles2);
                break;
        }
        draw();
        if (state == 3) {
            state = 0;
            setTimeout(tick, 3000);
        } else {
            state++;
            setTimeout(tick, 1000);
        }
    }

    tick();
});

