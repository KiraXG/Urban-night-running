
function Obstacle() {

    var _this = this;
    //障碍物生成位置
    this.obstacleX = cvs.width;
    this.obstacleY = 400;
    //障碍物宽高
    this.obstacleWidth = 20 + Math.random() * 10;
    this.obstacleHeight = 30 + Math.random() * 50;
    //障碍物移动速度
    this.speed = 10;
    this.dt = 1;

    this.obstacleDead = false;
    //绘制障碍物
    this.drawObstacle = function () {
        ctx.fillStyle = 'black';
        ctx.fillRect(_this.obstacleX, _this.obstacleY, -_this.obstacleWidth, -_this.obstacleHeight);
        ctx.restore();
    }
    //障碍物移动
    this.obstacleMove = function () {
        _this.obstacleX -= _this.speed * _this.dt;

    }
    //障碍物碰撞
    this.obstacleCollision = function () {
        if (_this.obstacleX <= 0) {
            _this.obstacleDead = true;
        }
    }
}