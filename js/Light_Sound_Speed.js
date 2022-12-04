
// 门铃按键
class Doorbell {
  constructor(x_, y_, r_) {
    // 位置、半径
    this.x = x_;
    this.y = y_;
    this.r = r_;
  }

  // 点在圆内
  contains(mx, my) {
    return dist(mx, my, this.x, this.y) < this.r;
  }

  // 显示是否在铃内
  display(mx, my) {
    if (this.contains(mx, my)) {
      fill(100);
    } else {
      fill(175);
    }
    stroke(0);
    strokeWeight(4);
    ellipseMode(RADIUS);
    ellipse(this.x, this.y, this.r, this.r);
  }
}

var distance;  //声源、光源的距离
var dingdong;  // 铃声
var doorbell;  // 门铃
var img;    //图像
var showImg = 0;
var speedOfLight = 300000; // 300000km/s
var speedOfSound = 0.34;   // 340m/s = 0.34km/s



function setup() {
  createCanvas(1400, 500);

  // 创建图像
  img = loadImage('../assets/lightning.png');

  // 声音文件
  soundFormats('mp3', 'ogg');
  dingdong = loadSound('../assets/thunder.mp3');
  doorbell = new Doorbell(width *0.35, height *0.23, 25);

  // 距离滑动条
  dSlider = createSlider(0, 150, 10);
  dSlider.position(width / 2 - 65, 100);
}


function draw() {
  background(255);

  // 展示图片
  if (showImg == 1) {
    image(img, dSlider.x-120 , 140);
  }

  // 展示按铃
  doorbell.display(mouseX, mouseY);

  //根据进度条设置距离
  distance = dSlider.value() / 100;
  text('0 m', dSlider.x - 40, dSlider.y + 15);
  text('1500 m', dSlider.width + dSlider.x + 60, dSlider.y + 15);
  text(distance * 1000, dSlider.width / 2 + dSlider.x, dSlider.y + 50);

  //清除图片
  button = createButton('reset');
  button.position(dSlider.width + dSlider.x + 130, dSlider.y - 5);
  button.mousePressed(clearImg);
  textAlign(CENTER);
  textSize(20);
}


// 按铃响声音 & 出现图片
function mousePressed() {
  if (doorbell.contains(mouseX, mouseY)) {

    var tLight = distance / speedOfLight * 1000;
    setTimeout(function () {
      showImg = 1;
    }, tLight);


    var tSound = distance / speedOfSound * 1000;
    setTimeout(function () {
      dingdong.play();
    }, tSound);

  }
}

function clearImg() {
  showImg = 0;
}
