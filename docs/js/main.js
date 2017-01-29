const s = function(_p5) {

    const sketchLines = [];
    let canvas, artwork;
    let img;

    function gotFile(file) {
        if (file.type === 'image') {
            img = _p5.loadImage(file.data, function(loadedImage) {
                loadedImage.resize(canvas.width, canvas.height);
                loadedImage.loadPixels();
            });
        }
    }

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
        canvas.drop(gotFile);
        artwork = _p5.createGraphics(canvas.width, canvas.height);
        artwork.background(0, 0);
    };

    _p5.draw = function() {
        _p5.background(0);
        for (let i = 0; i < sketchLines.length; i++) {
            sketchLines[i].update(_p5.mouseX, _p5.mouseY);
            let off = (_p5.mouseY * canvas.width + _p5.mouseX) * 4;
            sketchLines[i].render(artwork, [img.pixels[off], img.pixels[off + 1], img.pixels[off + 2], img.pixels[off + 3]]);
        }
        if (img) {
            // _p5.image(img, 0, 0);
        }
        _p5.image(artwork, 0, 0, canvas.width, canvas.height);
    };
};

const sketch = new p5(s);
