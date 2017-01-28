function SketchLine({
    easeFactor,
    speedFactor,
    numberOfVertices,
    _p5,
    art
}) {
    this.curveVertices = [];
    this.distances = [];
    this.endPoints = [];
    this.numberOfVertices = numberOfVertices;
    this.p = _p5;
    this.easeFactor = easeFactor;
    this.speedFactor = speedFactor;
    this.art = art;

    for (let i = 0; i < this.numberOfVertices; i++) {
        this.curveVertices[i] = this.p.createVector(this.p.mouseX, this.p.mouseY);
        this.distances[i] = this.p.createVector(0, 0);
        this.endPoints[i] = this.p.createVector(0, 0);
    }
}

SketchLine.prototype.update = function() {
    for (let i = 0; i < this.numberOfVertices; i++) {
        this.distances[i].x = (i === 0) ? this.p.mouseX - this.curveVertices[0].x : this.curveVertices[i - 1].x - this.curveVertices[i].x;
        this.distances[i].y = (i === 0) ? this.p.mouseY - this.curveVertices[0].y : this.curveVertices[i - 1].y - this.curveVertices[i].y;
        this.distances[i].mult(this.easeFactor);
        this.endPoints[i].add(this.distances[i]);
        this.curveVertices[i].add(this.endPoints[i]);
        this.endPoints[i].mult(this.speedFactor);
    }
};

SketchLine.prototype.render = function() {
    this.art.beginShape();
    for (let i = 0; i < this.numberOfVertices; i++) {
        this.art.noFill();
        this.art.strokeWeight(0.5);
        this.art.blendMode(this.art.ADD);
        this.art.stroke(255, 1);
        this.art.curveVertex(this.curveVertices[i].x, this.curveVertices[i].y);
    }
    this.art.endShape();
};
