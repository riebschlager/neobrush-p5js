const s = function(_p5) {

    const sketchLines = [];
    let canvas, art;

    const ui = {
        numberOfLines: 100,
        easing: 0.25,
        easingJitter: 0.1,
        speed: 0.3,
        speedJitter: 0.1,
        vertices: 8,
        verticesJitter: 1
    };

    _p5.mousePressed = function() {
        for (let i = 0; i < ui.numberOfLines; i++) {
            const easing = ui.easing + _p5.random(-ui.easingJitter, ui.easingJitter);
            const speed = ui.speed + _p5.random(-ui.speedJitter, ui.speedJitter);
            const vertices = ui.vertices + _p5.random(-ui.verticesJitter, ui.verticesJitter);
            const line = new SketchLine(vertices, easing, speed, _p5, art);
            sketchLines.push(line);
        }
    };

    _p5.mouseReleased = function() {
        sketchLines.length = 0;
    };

    _p5.setup = function() {
        _p5.background(0);
        canvas = _p5.createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent('neobrush');
        art = _p5.createGraphics(canvas.width, canvas.height);
        art.background(0);
    };

    _p5.draw = function() {
        _p5.background(0);
        for (let i = 0; i < sketchLines.length; i++) {
            sketchLines[i].update();
            sketchLines[i].render();
        }
        _p5.image(art, 0, 0, canvas.width, canvas.height);
    };
};

const sketch = new p5(s);
