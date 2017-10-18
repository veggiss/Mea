class Laser extends Phaser.Sprite {
	constructor(game, x, y) {
		super(game, x, y, 'laser');

		//Globals
		this.needsReset = false;
		this.game = game;
		this.line = new Phaser.Line(this.x + 2, this.y - 3, this.x + 2, this.y - 53);
		this.lineOrigin = new Phaser.Line(this.x + 2, this.y - 3, this.x + 2, this.y - 53);
		this.graphics = this.game.add.graphics(0, 0);

		//Sprite
		this.autoCull = true;

		//Physics
		this.game.physics.arcade.enable(this);
		this.body.immovable = true;
		this.body.moves = false;

		this.game.physics.arcade.enable(this.graphics);
		this.graphics.body.immovable = true;
		this.graphics.body.moves = false;
	}

	update() {
		this.graphics.clear();
		this.graphics.lineStyle(2, 0x00ff00, 1);
		this.graphics.moveTo(this.line.start.x, this.line.start.y);
		this.graphics.lineTo(this.line.end.x, this.line.end.y);
	}

	lineIntersection(line, rect) {
	    var x1 = line.start.x;
	    var y1 = line.start.y;
	 
	    var x2 = line.end.x;
	    var y2 = line.end.y;
	 
	    var bx1 = rect.x;
	    var by1 = rect.y;
	    var bx2 = rect.right;
	    var by2 = rect.bottom;
	 
	    var lines = [
	        new Phaser.Line(bx1, by1, bx2, by1),
	        new Phaser.Line(bx1, by2, bx2, by2),
	        new Phaser.Line(bx1, by1, bx1, by2),
	        new Phaser.Line(bx2, by1, bx2, by2)
	    ]
	 
	    var intersects = [];
	 
	    for(var l of lines) {
	        if(line.intersects(l) != null) {
	            intersects.push(line.intersects(l));
	        }
	    }
	 
	    var closestIntersectDistance = 200;
	    var closestIntersect = null;
	 
	    for(var intersect of intersects) {
	        var dx = Math.abs(intersect.x - x1);
	        var dy = Math.abs(intersect.y - y1);
	        var dxSq = Math.pow(dx, 2);
	        var dySq = Math.pow(dy, 2);
	        var distanceFromStart = Math.sqrt(dxSq + dySq);
	        if(distanceFromStart < closestIntersectDistance) {
	            closestIntersectDistance = distanceFromStart;
	            closestIntersect = intersect;
	        }
	    }
	 
	    if(closestIntersect != null) {
	        return closestIntersect;
	    } else {
	        return null;
	    }
	};

	laserIntersect() {
		let obj = this.map.obj_laser.getAt(0);
		let tile = this.map.groundLayer.getRayCastTiles(obj.lineOrigin, 1, true);
		let p = null;
		//console.log(tile[0].getBounds());
		if (tile.length > 0) {
			let tileRect = new Phaser.Rectangle(tile[0].worldX, tile[0].worldY, 8, 8);
			p = this.lineIntersection(obj.line, tileRect);
		}
		if (p != null) {
			obj.line.end.x = p.x;
			obj.line.end.y = p.y;
		} else {
			obj.line.end.x = obj.lineOrigin.end.x;
			obj.line.end.y = obj.lineOrigin.end.y;
		}
	}
}

export default Laser;