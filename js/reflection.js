let outerD = 300;  //直径
let outerR = outerD / 2;
let innerD = 250;
let innerR = innerD / 2;
let t = 10; // 线宽
let frame = 150; // Framesize for object
let d = frame / 2; // Centre-to-boundary calculation
let obj = 0;   
let xs = []; // x-displacement of light source from image centre
let ys = []; // y-displacement of light source from image centre
let xPos = []; // 
let light = [];   //可以装类
let n = 1; // Max 7
let colors = [ "yellow"];
const indexA = 1.0; // Refractive index of air
const indexG = 1.5; // Refractive index of glass
const indexW = 1.33; // Refractive index of water


function setup() {
  createCanvas(800, 800);
  c = createVector(width / 2, height / 2); // Centre of canvas
  rectMode(CORNERS);

  srcImg = createVector(c.x + 100, d + t / 2);

  // 光源中心
  dstImg = createVector(c.x - (srcImg.x - c.x), height - d - t / 2);

  for (let i = 0; i < n; i++) {
    xs.push(random([-1, 1]) * random(frame / 2 - t)); // Generate random x-value
    ys.push(random([-1, 1]) * random(frame / 2 - t)); // Generate random y-value
    light.push(new Beam());   //装入点的类
    xPos.push(light[i].x[5]);   //底下
  }
}

function draw() {
  background(241, 243, 244);

  // 光源 
  stroke("orange");
  strokeWeight(t);
  point(srcImg.x, t + 140);

  //上边缘线
  stroke("orange");
  strokeWeight(1);
  line(-t * 2, frame + t / 2, width + 2 * t, frame + t / 2);
  

  //法线(虚线)
  let linepart = 5;
  for(let i = 1; i < 10000; i=i+2){
    stroke("red");
    strokeWeight(0.5);
    line(c.x, c.y-(i-1)*linepart, c.x, c.y-linepart*i);
  }
  

  // 底面玻璃
  stroke(135,206,235);
  strokeWeight(10);
  line(c.x-outerD, c.y, c.x+outerD, c.y);


  for (let i = 0; i < n; i++) {
    light[i].trace(srcImg.x , frame + t / 2);
    xPos[i] = light[i].x[5];
  }

}

function mousePressed() {
   if((mouseX-srcImg.x)**2+(t + 140-mouseY)**2<=1000)
       obj=1;
}

function mouseDragged() {

  if (obj == 1) srcImg.x = mouseX;
  return false; 
}

function mouseReleased() {
  obj = 0;
}


class Beam {
  constructor() {
    this.x = [0, 1, 2, 3, 4, 5];
    this.y = [0, 1, 2, 3, 4, 5];
    let chosenColor = random(colors);
    this.color = color(chosenColor);
    colors = colors.filter((word) => word != chosenColor);
  }
  trace(x, y) {
    //出发点
    this.x[0] = x;
    this.y[0] = y;
    //镜子中点
    this.x[1] = c.x;
    this.y[1] = c.y;

    //反射点
    this.x[2] = c.x-(x-c.x);
    this.y[2] = y;


    for (let i = 0; i < 2; i++) {
      stroke(this.color);
      strokeWeight(t / 2);
      point(this.x[i + 1], this.y[i + 1]);
      strokeWeight(2);
      line(this.x[i], this.y[i], this.x[i + 1], this.y[i + 1]);
    }
  }
}
