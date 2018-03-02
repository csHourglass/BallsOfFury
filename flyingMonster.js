/*****************************************************
Flying Monster
******************************************/
funtion FlyingMonster(game, x, y, team, scene) {
    this.x = x;
    this.y = y;
    this.width = 226;
    this.height = 177;
    this.Ranimation = new Animation(ASSET_MANAGER.getAsset("./img/FlyingMonster.png"), 0, 95, this.width, this.height, 0.8, 4, true, false);
    this.Lanimation = new Animation(ASSET_MANAGER.getAsset("./img/FlyingMonster.png"), 0, 370, this.width, this.height, 0.8, 4, true, true);

    this.team = 2;
    this.boundingBox = new BoundingBox(this.x, this.y, 122, 146);
    this.scene = scene;
    Entity.call(this, game, this.x, this.y, true, 3);

}

FlyingMonster.prototype = new Entity();
FlyingMonster.prototype.constructor = FlyingMonster;

FlyingMonster.prototype.update = function() {
    // check for collisions
}
