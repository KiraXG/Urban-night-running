function Score() {
    document.getElementById("main").style.display = "none";
    document.getElementById("scoreOrder").style.display = "flex";
    document.getElementsByClassName('return')[1].style.display = 'block';
    var sortScore = [];
    sortScore = maxScore.sort().reverse();
    for (let i = 0; i < sortScore.length; i++) {
        if (i < 5) {
            document.getElementsByClassName('order')[i].innerHTML = '第' + (i + 1) + '名：' + sortScore[i] + 'm';
        } else {
            break;
        }
    };

}
//游戏帮助
function Help() {
    document.getElementById("main").style.display = "none";
    document.getElementById("show").style.display = "flex";
    document.getElementsByClassName('return')[0].style.display = 'block';
}