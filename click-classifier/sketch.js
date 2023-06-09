// https://editor.p5js.org/kreier/sketches/a1gdLa8rZ
let model;
let targetLabel = 'C';
// let trainingData = [];
let state = 'collection';
let env, wave;

let notes = {
  C: 261.6256,
  D: 293.6648,
  E: 329.6276
}

let colors = {
  C: 'rgba(255, 0, 0, 0.4)',
  D: 'rgba(0, 255, 0, 0.4)',
  E: 'rgba(0, 0, 255, 0.4)'
}

function setup() {
  createCanvas(400, 400);
  
  let  options = {
    inputs: ['x', 'y'],
    outputs: ['label'],
    task: 'classification',
    debug: 'true',
  }
  model = ml5.neuralNetwork(options);
  
  env = new p5.Envelope();
  env.setADSR(0.05, 0.1, 0.5, 1);
  env.setRange(1.2, 0); 
  wave = new p5.Oscillator(); 
  wave.setType('sine');
  wave.start();
  wave.freq(440);
  wave.amp(env);
  
  background(255);
}

function keyPressed() {
  if (key == 't') {
    state = 'training';
    console.log('starting training.');
    model.normalizeData();
    let options = {
      epochs: 200
    }
    model.train(options, whileTraining, finishedTraining);
  } else {
      targetLabel = key.toUpperCase();
  }
}

function whileTraining(epochs, loss) {
  console.log(epochs);
}

function finishedTraining() {
  console.log('finished training.');
  state = 'prediction';
}

function mousePressed() {
  let inputs = {
    x: mouseX,
    y: mouseY
  }
  if (state == 'collection') {
    let target = {
      label: targetLabel
    }
    model.addData(inputs,target);
    stroke(0);
    noFill();
    ellipse(mouseX, mouseY, 24);
    fill(0);
    noStroke();
    textAlign(CENTER,CENTER);
    text(targetLabel, mouseX, mouseY);
    wave.freq(notes[targetLabel]);
    env.play();
  } else if (state == 'prediction') {
    model.classify(inputs, gotResults);
  }
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  console.log(results);
  let label = results[0].label;
  stroke(0);
  // fill(0, 0, 255, 100);
  fill(colors[label]);
  console.log(colors[label]);
  ellipse(mouseX, mouseY, 24);
  fill(0);
  noStroke();
  textAlign(CENTER,CENTER);
  text(label, mouseX, mouseY);
  wave.freq(notes[label]);
  env.play();
}

// function draw() {
//   background(220);
// }