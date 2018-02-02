/* the purpose of this class is essentially just for
   collision detection between entities */
function BoundingBox (x, y, width, height, id) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
	this.id = id;
	
    this.left = x;
    this.top = y;
    this.right = x + width;
    this.bottom = y + height;
	this.oldLoc = [this.top, this.right, this.bottom, this.left];
}

//If collided, return the id of the collided object
BoundingBox.prototype.hasCollided = function (other) {
    if (this.right > other.left && this.left < other.right &&
        this.top < other.bottom && this.bottom > other.top) {
		return other.boundingBox.id;
	} else {
		return -1;
	}
}

BoundingBox.prototype.storeLocation = function(top, right, bottom, left) {
	this.oldLoc[0] = top;
	this.oldLoc[1] = right;
	this.oldLoc[2] = bottom;
	this.oldLoc[3] = left;
}

BoundingBox.prototype.draw = function(ctx) {
    //log red box console.log(this.x, this.y, this.width, this.height);
    //log green box console.log(this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height);

    // ctx.strokeStyle = "red";    // frame
    // ctx.strokeRect(this.x, this.y, this.width, this.height);

    ctx.strokeStyle = "green";  // bounding box
    ctx.strokeRect(this.x, this.y, this.width, this.height);
}

BoundingBox.prototype.collidedFromTop = function(other) {
	 return this. >= other.Bottom &&
           boxTop < other.Bottom;
	
}


    return oldBoxRight < other.Left &&
           boxRight >= other.Left;
}

collidedFromRight(other)
{
    return oldBoxLeft >= other.Right &&
           boxLeft < other.Right;
}

collidedFromTop(other)
{
    return oldBoxBottom < other.Top &&
           boxBottom >= other.Top;
}

collidedFromBottom(other)
{
    return oldBoxTop >= other.Bottom &&
           boxTop < other.Bottom;
}