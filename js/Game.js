/** @type {HTMLCanvasElement} */
//将canvas画布大小设为屏幕大小
var cvs = document.getElementById('cvs');
var ctx = cvs.getContext('2d');
cvs.width = document.documentElement.clientWidth;
cvs.height = document.documentElement.clientHeight - 5;

var gGame = null;
var gameTimer;
var maxScore = [];
var lastScore = 0;

function onLoad() {
    Score();
    gGame = new Game();
    gameTimer = setInterval(gGame.update, 24);
    //隐藏UI
    document.getElementById("main").style.display = "none";
    document.getElementById('final').style.display = 'none';
    document.getElementById('show').style.display = 'none';
    document.getElementById('scoreOrder').style.display = 'none';
    cvs.style.display = "block";
}

function menu() {
    document.getElementById("main").style.display = "flex";
    document.getElementById('final').style.display = 'none';
    document.getElementById('show').style.display = 'none';
    document.getElementById('scoreOrder').style.display = 'none';
    cvs.style.display = "none";
}

function Game() {
    var _this = this;
    this.player = new Player();
    this.obstacle = new Obstacle();
    this.road = new Road();
    this.city = new City();


    //障碍物生成间隔
    this.frame = 0;
    this.lastFrame = 0;
    this.CD;
    //玩家
    this.frame1 = 0;
    this.lastFrame1 = 0;
    this.CD1 = 2;
    //城市
    this.frame2 = 0;
    this.lastFrame2 = 0;
    this.CD2;

    this.score = 0;

    this.obstacles = [];
    this.cities = [];

    this.update = function () {
        ctx.clearRect(0, 0, cvs.width, cvs.height);

        _this.score = Math.ceil(_this.frame / 10);
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText('距离：' + _this.score + 'm', 50, 50);
        _this.city.drawCity();
        _this.road.drawRoad();
        //城市随时间生成
        _this.frame2++;
        _this.CD2 = Math.random() * 4000;
        if (_this.frame2 - _this.lastFrame2 >= (_this.CD2 + 100)) {
            _this.city.drawCity();
            _this.cities.push(new City());
            _this.lastFrame2 = _this.frame2;
        }
        if (_this.cities.length >= 1) {
            _this.cities.forEach(function (item, index) {

                item.cityCollision();
                if (item.cityDead) {
                    _this.cities.splice(index, 1);
                }
                item.drawCity();
                item.cityMove();
            })

        }
        _this.player.drawPlayer();

        //动画
        _this.frame1++;
        if (_this.frame1 - _this.lastFrame1 >= _this.CD1) {
            _this.player.drawPlayer();
            if (_this.player.playerY > 309) {
                _this.player.x = _this.player.x++ >= 3 ? 0 : _this.player.x;
                if (_this.player.x == 0) {
                    _this.player.y = _this.player.y++ >= 3 ? 0 : _this.player.y;
                }
            } else {
                if (_this.player.jump == 1) {
                    _this.player.x = 2;
                    _this.player.y = 1;
                } else {
                    _this.player.x = 3;
                    _this.player.y = 3;
                }
            }
            _this.lastFrame1 = _this.frame1;
        }

        //障碍物随时间生成
        _this.frame++;
        _this.CD = Math.random() * 1000;
        if (_this.frame - _this.lastFrame >= (_this.CD + 50)) {
            _this.obstacles.push(new Obstacle());

            _this.lastFrame = _this.frame;
            //console.log(1);
        }


        //障碍物碰撞
        if (_this.obstacles.length >= 1) {
            _this.obstacles.forEach(function (item, index) {
                item.obstacleCollision();
                if (item.obstacleDead) {
                    _this.obstacles.splice(index, 1);
                }
                item.drawObstacle();
                item.obstacleMove();
            })
        }
        //城市碰撞

        //人物跳跃

        if (_this.player.isJump == true) {
            _this.player.playerJump();
        }

        //障碍物与人物碰撞
        if (_this.obstacles.length >= 1) {
            _this.obstacles.forEach(function (o) {
                if ((Math.abs(o.obstacleX - _this.player.playerX - _this.player.playerWidth) <= o.obstacleWidth - 10 &&
                        Math.abs(o.obstacleY - _this.player.playerY - _this.player.playerHeight) <= _this.obstacles[0].obstacleHeight)) {
                    o.obstacleDead = true;
                    //console.log(2);
                    clearInterval(gameTimer);
                    setTimeout(function () {
                        if (o.obstacleDead = true) {
                            document.getElementById('final').style.display = 'flex';
                            maxScore.push(_this.score);
                            console.log(maxScore);

                            if (_this.score > lastScore) {
                                lastScore = _this.score;
                                document.getElementsByClassName('isNewScore')[0].innerHTML = '';
                                document.getElementsByClassName('isNewScore')[0].innerHTML = '\xa0\xa0\xa0新纪录！';
                            } else {
                                document.getElementsByClassName('isNewScore')[0].innerHTML = '';
                                document.getElementsByClassName('isNewScore')[0].innerHTML = '\xa0\xa0本次纪录：';
                            }
                            document.getElementsByClassName('distance')[0].innerHTML = '';
                            document.getElementsByClassName('distance')[0].innerHTML = '距离：' + _this.score + 'm';
                        }
                    }, 1000)
                }
            })
        }
    }
}