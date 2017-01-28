function SketchLine(numberOfVertices, easeFactor, speedFactor, p, art) {

    let curveVertices = [];
    let distances = [];
    let endPoints = [];

    for (let i = 0; i < numberOfVertices; i++) {
        curveVertices[i] = p.createVector(p.mouseX, p.mouseY);
        distances[i] = p.createVector(0, 0);
        endPoints[i] = p.createVector(0, 0);
    }

    this.update = function() {
        for (let i = 0; i < numberOfVertices; i++) {
            distances[i].x = (i === 0) ? p.mouseX - curveVertices[0].x : curveVertices[i - 1].x - curveVertices[i].x;
            distances[i].y = (i === 0) ? p.mouseY - curveVertices[0].y : curveVertices[i - 1].y - curveVertices[i].y;
            distances[i].mult(easeFactor);
            endPoints[i].add(distances[i]);
            curveVertices[i].add(endPoints[i]);
            endPoints[i].mult(speedFactor);
        }
    };

    this.render = function() {
        art.beginShape();
        for (let i = 0; i < numberOfVertices; i++) {
            art.noFill();
            art.strokeWeight(0.5);
            art.blendMode(art.ADD);
            art.stroke(255, 4);
            art.curveVertex(curveVertices[i].x, curveVertices[i].y);
        }
        art.endShape();
    };
}
