function SketchLine({
    mouseVector,
    originVector,
    easeFactor,
    numberOfVertices,
    speedFactor
}) {

    this.curveVertices = [];
    this.distances = [];
    this.endPoints = [];

    this.easeFactor = easeFactor;
    this.numberOfVertices = numberOfVertices;
    this.speedFactor = speedFactor;

    for (let i = 0; i < this.numberOfVertices; i++) {
        this.curveVertices[i] = mouseVector.copy();
        this.distances[i] = originVector;
        this.endPoints[i] = originVector;
    }
}

SketchLine.prototype.update = function(mouseX, mouseY) {
    for (let i = 0; i < this.numberOfVertices; i++) {
        this.distances[i].x = (i === 0) ? mouseX - this.curveVertices[0].x : this.curveVertices[i - 1].x - this.curveVertices[i].x;
        this.distances[i].y = (i === 0) ? mouseY - this.curveVertices[0].y : this.curveVertices[i - 1].y - this.curveVertices[i].y;
        this.distances[i].mult(this.easeFactor);
        this.endPoints[i].add(this.distances[i]);
        this.curveVertices[i].add(this.endPoints[i]);
        this.endPoints[i].mult(this.speedFactor);
    }
};

SketchLine.prototype.render = function(artwork) {
    artwork.beginShape();
    for (let i = 0; i < this.numberOfVertices; i++) {
        artwork.noFill();
        artwork.strokeWeight(0.5);
        artwork.blendMode(artwork.ADD);
        artwork.stroke(255, 10);
        artwork.curveVertex(this.curveVertices[i].x, this.curveVertices[i].y);
    }
    artwork.endShape();
};
