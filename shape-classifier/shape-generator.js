// https://editor.p5js.org/kreier/sketches/kuFfclgFJ
frame = 0;
SAMPLESIZE = 100;
var currentMode = "TRIANGLE"
function setup() {
  createCanvas(64, 64);
  //Set the frame rate to be 5 frames per second
  frameRate(5)
  pixelDensity(1.0);
}

function draw() {
  strokeWeight(4);
  //Generate random coordinates and a size  
  r = random(8,24);
  x = random(r,width - r);
  y = random(r,height - r);
  // Set color
  stroke(random(100),random(100), random(100));
  // Move the origin to the random coordinate from above.
  push();
  translate(x,y);
  // Draw a different shape for each iteration of the loop at the translated origin.

  if(currentMode == "CIRCLE"){  
    background(255);
    circle(0,0,r*2);
    save("circle-" + frameCount);

  }
  else if (currentMode == "SQUARE"){
    background(255);
    rotate(random(-0.2,0.2))
    rectMode(CENTER);
    square(0,0,r*1.5);
    save("square-" + frameCount);
  }
  else if (currentMode == "TRIANGLE"){
    background(255);
    rotate(random(-0.2,0.2))
    triangle(-r,-r,r,-r,0,r);
    save("triangle-" + frameCount);

  }

  // Move the origin back to the normal spot.
  pop();

  //This code here is similar to our evaluateState function from last semester. 
  //Once 100 images have been generated, it switches the mode of the program to the next.

  if(currentMode == "TRIANGLE" && frameCount == 100){
    currentMode = "SQUARE";
    frameCount = 0;
  } 
  else if ( currentMode == "SQUARE" && frameCount == 100){
    currentMode = "CIRCLE";
    frameCount = 0;
  }
  else if ( currentMode == "CIRCLE" && frameCount == 100){
    noLoop();
  }
}
