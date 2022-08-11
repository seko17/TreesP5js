let angle = 0;
let movetree = 0.01; /// each pass offset by 1% of screen width
let density = 0; /// make tree pass counter
let extrabranch = 0; /// randomly make extra branch
let lessbranch = 0; /// not implimented
let trunkthick = 0.11; /// each branch diminished size 
let limbmin = 10; /// small limbs makes dense tops
let treemax = 3; /// how many passes per tree
let pg;


function setup() {
  createCanvas(windowWidth, windowHeight);
  pg = createGraphics(width, height);
  pg.background(0, random(50,100),random(100,255), 255);
}

function draw() {
  pg.push();
  density += 1;
  extrabranch = int(random(0, 2));
  lessbranch = int(random(0, 3));
  if (density > treemax) {
    density = 0;
    movetree += 0.08;
    if (movetree > 1) {
      movetree = 0.01;
      image(pg, 0, 0);

  pg.background(0, random(50,100),random(100,255), 255);
    }
  }
  angle = random(PI * 0.1);
  let startl = random(50, 125);
  pg.stroke(random(50, 60), random(25, 30), 0, 255);
  // pg.stroke(0,0,0,0);
  pg.strokeWeight(startl * trunkthick);
  pg.translate(width * (movetree + random(-0.005, 0.005)),
    height * 0.95);
  branch(startl);
  pg.pop();
}


function branch(len) {
  pg.line(0, 0, 0, -len);
  pg.translate(1, -len);
  if (len > limbmin) {
    pg.push();
    pg.stroke(random(50, 60), random(25, 30), 0, 255);
    // pg.stroke(0,0,0,0);
    pg.strokeWeight(len * trunkthick);
    pg.rotate(random(-QUARTER_PI * random(1), QUARTER_PI * random(1)));
    branch(len * random(0.4, 0.8));
    pg.pop();

    if (extrabranch === 0) {
      pg.push();
      pg.stroke(random(50, 100), random(25, 30), 0, 255);
      // pg.stroke(0,0,0,0);
      pg.strokeWeight(len * trunkthick);
      pg.rotate(random(-QUARTER_PI * random(1), QUARTER_PI * random(1)));
      branch(len * random(0.2, 0.97));
      pg.pop();
      pg.push();
      pg.stroke(random(100, 75), random(25, 50), 0, 255);
      // pg.stroke(0,0,0,0);
      pg.strokeWeight(len * trunkthick);
      pg.rotate(random(-QUARTER_PI * random(1), QUARTER_PI * random(1)));
      branch(len * random(0.2, 0.97));
      pg.pop();
    }
  } else if (len <= limbmin) {
    pg.push();
    pg.noStroke();
    pg.fill(random(50, 120),
      175,
      random(20, 80), 200);
    pg.ellipse(0, 0, random(3, 11), random(3, 11));
    pg.pop();
    len = random(50, 200);
    pg.translate(width * movetree,
      height * 0.95);
    pg.rotate(0);
  }
}



function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}