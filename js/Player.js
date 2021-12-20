var img = new Image();
img.src = 'imgs/player.png';

function Player() {
    var _this = this;
    //玩家的宽高
    this.playerWidth = img.width / 4;
    this.playerHeight = img.height / 4;
    //玩家的开始位置
    this.playerX = 100;
    this.playerY = 310;
    //动画横向
    this.x = 0;
    //动画纵向
    this.y = 0;
    //玩家的起跳速度
    this.speed = 50;
    //重力
    this.g = -15;
    //起始时间
    this.t = 0;

    //玩家跳跃
    this.isJump = false;
    //玩家起跳的开始位置和结束位置
    this.start = 310;

    //玩家因重力下落的距离
    this.down;

    //按键次数
    this.jump = 0;
    this.temp = 0;
    this.count = 0;
    //绘制玩家
    this.drawPlayer = function () {
        ctx.drawImage(img, _this.playerWidth * _this.x, _this.playerHeight * _this.y,
            _this.playerWidth, _this.playerHeight,
            _this.playerX, _this.playerY,
            _this.playerWidth, _this.playerHeight
        )
    }

    //让玩家跳起来
    document.onkeydown = function (e) {
        if (e.keyCode == 32) {
            _this.isJump = true;
            _this.jump++;
            if (_this.playerY == _this.start) {
                _this.jump = 1;
                _this.count = 0;
            }
        }
    }
    this.playerJump = function () {

        if (_this.jump == 1) {
            console.log(1);
            if (_this.playerY > _this.start) {
                _this.isJump = false;
                _this.playerY = _this.start;
                _this.t = 0;
            } else {

                _this.t += .1;
                _this.down = _this.speed * _this.t + _this.g * _this.t * _this.t * .5
                _this.playerY = _this.start - _this.down;
            }
            _this.temp = _this.playerY;
        }
        if (_this.jump >= 2) {

            _this.count++;
            if (_this.count == 1) {
                _this.t = 0;
            }

            if (_this.playerY > _this.start) {
                _this.isJump = false;
                _this.playerY = _this.start;
                _this.t = 0;
                _this.count = 0;

            } else {
                _this.t += .1;
                _this.down = _this.temp - (_this.speed * _this.t + _this.g * _this.t * _this.t * .5);
                _this.playerY = _this.down;

            }

        }

    }



}