let t = 10; // 所有轮廓的线粗细
let colors = ["#87CEEB"];
let sourceX = 10;
let sourceY = 100;
let light = [];
const indexA = 1.0; // 空气的折射率
let indexG = 1.5; // 玻璃的折射率

let x = 200;
let y = 300;

function setup() {

    createCanvas(800, 800); // 创建一个画布
    c = createVector(width / 2, height / 2); // 画布中心坐标
    rectMode(CORNERS);
    light.push(new Beam());

    // 滑动条
    rSlider = createSlider(1,100,100);
    rSlider.position(800, 20);
}


function draw() {
    background(241, 243, 244);

    text('介质的折射率', rSlider.x * 2 + rSlider.width, 100);
   // text('光源固定，拖动入射点(入射光与介质的交点)改变入射方向', rSlider.x * 2 + rSlider.width, 90);
    indexG = rSlider.value() / (1.0 * 100) + 1;

    strokeWeight(t);
    point(sourceX, sourceY);

    stroke(240, 255, 255);
    strokeWeight(200);
    line(0, 400, 800, 400);



    light[0].trace(x, y);
}

function mousePressed() {
    if ((mouseX - x) ** 2 + (mouseY - y) ** 2 <= 100)
        obj = 1;
}

function mouseReleased() {
    obj = 0;
}

function mouseDragged() {
    if (obj == 1) x = mouseX;
    return false;
}

function drawF(xf,yf){
    let linepart = 10;
    for (let i = 1; i < 20; i = i + 2) {
        stroke("#4169E1");
        strokeWeight(0.5);
        line(xf, yf + 100 - (i - 1) * linepart, xf, yf + 100 - linepart * i);
    }
}
class Beam {
    constructor() {
        this.x = [0, 0, 0, 0];
        this.y = [0, 0, 0, 0];
        let chosenColor = random(colors);
        this.color = color(chosenColor);
        colors = colors.filter((word) => word != chosenColor);
    }
    trace(x, y) {
        this.x[0] = sourceX;
        this.y[0] = sourceY;

        this.x[1] = x;
        this.y[1] = y;

        let in1 = atan2(this.x[1] - this.x[0], this.y[1] - this.y[0])
        let g1 = asin(indexA * sin(in1) / indexG);

        this.x[2] = 200 * tan(g1) + this.x[1];
        this.y[2] = 500;
        this.x[3] = this.x[2] + this.x[1] - this.x[0];
        this.y[3] = 700;

        stroke(this.color);
        strokeWeight(t);
        point(this.x[0], this.y[0]);
        drawF(this.x[1], this.y[1]);
        drawF(this.x[2], this.y[2]);
        for (let i = 0; i < 3; i++) {
            stroke(this.color);
            strokeWeight(t);
            point(this.x[i+1], this.y[i+1]);
            strokeWeight(2);
            line(this.x[i], this.y[i], this.x[i + 1], this.y[i + 1]);
        }
    }
}