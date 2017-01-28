const s = function(_p5) {

    const sketchLines = [];
    let canvas, artwork;

    const ui = {
        numberOfLines: 100,
        easeFactor: 0.25,
        easeFactorJitter: 0.1,
        speedFactor: 0.3,
        speedFactorJitter: 0.1,
        numberOfVertices: 8,
        numberOfVerticesJitter: 1
    };

    _p5.mousePressed = function() {
        for (let i = 0; i < ui.numberOfLines; i++) {
            sketchLines.push(new SketchLine({
                originVector: _p5.createVector(0, 0),
                mouseVector: _p5.createVector(_p5.mouseX, _p5.mouseY),
                easeFactor: ui.easeFactor + _p5.random(-ui.easeFactorJitter, ui.easeFactorJitter),
                speedFactor: ui.speedFactor + _p5.random(-ui.speedFactorJitter, ui.speedFactorJitter),
                numberOfVertices: ui.numberOfVertices + _p5.random(-ui.numberOfVerticesJitter, ui.numberOfVerticesJitter)
            }));
        }
    };

    _p5.mouseReleased = function() {
        sketchLines.length = 0;
    };

    _p5.setup = function() {
        _p5.background(0);
        canvas = _p5.createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent('neobrush');
        artwork = _p5.createGraphics(canvas.width, canvas.height);
        artwork.background(0);
    };

    _p5.draw = function() {
        _p5.background(0);
        for (let i = 0; i < sketchLines.length; i++) {
            sketchLines[i].update(_p5.mouseX, _p5.mouseY);
            sketchLines[i].render(artwork);
        }
        _p5.image(artwork, 0, 0, canvas.width, canvas.height);
    };
};

const sketch = new p5(s);
