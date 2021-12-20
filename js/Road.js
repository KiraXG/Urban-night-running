var img1 = new Image();
img1.src = 'imgs/city.png';

function Road() {
    var _this = this;
    this.roadX = 0;
    this.roadY = 400;
    this.roadWidth = cvs.width;
    this.roadHeight = cvs.height - 400;
    this.drawRoad = function () {
        ctx.fillStyle = 'black';
        ctx.fillRect(_this.roadX, _this.roadY, _this.roadWidth, _this.roadHeight);
    }
}

function City() {
    var _this = this;
    this.cityX = cvs.width;
    this.cityY = 46;
    this.cityWidth = img1.width;
    this.cityHeight = img1.height;
    this.speed = 10;
    this.dt = 1;
    this.cityDead = false;
    this.drawCity = function () {
        ctx.drawImage(img1, 0, 0,
            _this.cityWidth, _this.cityHeight,
            _this.cityX, _this.cityY,
            _this.cityWidth, _this.cityHeight)
    }
    this.cityMove = function () {
        _this.cityX -= _this.speed * _this.dt;
    }
    this.cityCollision = function () {
        if (_this.cityX <= -_this.cityWidth) {
            _this.cityDead = true;
        }
    }
}