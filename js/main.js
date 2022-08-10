//tao bien thu tuc
var canvas = document.getElementById('gamezone');
var context = canvas.getContext('2d');
var scoreshow = document.getElementById('score');

//input hinh vao
var ufoimg = new Image();
var background = new Image();
var ongtren = new Image();
var ongduoi = new Image();
ufoimg.src = "img/ufo.png";
background.src = "img/background.png";
ongtren.src = "img/ongtren.png";
ongduoi.src = "img/ongduoi.png";

//tao var dung cho function
var score = 0;
var khoangcachhaiong = 140;
var khoangcachdenongduoi;
//obj ufo
var ufo = {
    x: 150,
    y: background.height / 2
}
//array ong
var ong = [];
ong[0] = {
    x: canvas.width,
    y: 0
}

//function chay game
function run() {
    //load img
    context.drawImage(background, 0, 0);
    context.drawImage(ufoimg, ufo.x, ufo.y);


    for (var i = 0; i < ong.length; i++) {
        //ve ong
        khoangcachdenongduoi = ongtren.height + khoangcachhaiong;
        context.drawImage(ongtren, ong[i].x, ong[i].y);
        context.drawImage(ongduoi, ong[i].x, ong[i].y + khoangcachdenongduoi);
        ong[i].x -= 3; //ong di chuyen
        //them ong
        if (ong[i].x == canvas.width / 2) {
            ong.push({
                x: canvas.width,
                y: Math.floor(Math.random() * ongtren.height) - ongtren.height
            })
        }
        //xoa ong khoi mang
        if (ong[i].x == 0) ong.splice(0, 1);
        if (ong[i].x == ufo.x) score++;


        //thua 
        if (ufo.y + ufoimg.height == canvas.height ||
            ufo.x + ufoimg.width >= ong[i].x && ufo.x <= ong[i].x + ongtren.width
            && (ufo.y <= ong[i].y + ongtren.height ||
                ufo.y + ufoimg.height >= ong[i].y + khoangcachdenongduoi)
        ) {
            document.getElementById('thongbao').style.setProperty('opacity', "1");
            return;
        }
    }

    //hien diem
    scoreshow.innerHTML = "score: " + score;
    // ufo roi
    ufo.y += 3;
    requestAnimationFrame(run);
}
  //function bam phim bay len
  document.addEventListener("keydown", function () {
    ufo.y -= 60;
})
 //nhan phim start
var input = document.getElementById('start');
input.onclick = function () {
    start.style.setProperty('opacity', "0");
    huongdan.style.setProperty('display', "none");
    run();
}

//function nhan nut Play Again
var input1 = document.getElementById('playagain');
input1.onclick = function () {
    location.reload();
}


