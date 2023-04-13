// Shape Classifier (Training)
// Coding Challenge
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/158-shape-classifier.html
// https://youtu.be/3MqJzMvHE3E

// Generate Dataset: 
// https://github.com/CodingTrain/website/tree/gh-pages/CodingChallenges/CC_158_Shape_Classifier/dataset
// Generate Dataset (port): https://editor.p5js.org/codingtrain/sketches/7leVIzy5l
// Training: https://github.com/CodingTrain/website/tree/gh-pages/CodingChallenges/CC_158_Shape_Classifier/training
// Mouse:  https://editor.p5js.org/codingtrain/sketches/JgLVfCS4E
// Webcam: https://editor.p5js.org/codingtrain/sketches/2hZGBkqqq

let circles = [];
let squares = [];
let triangles = [];

function preload() {
  for (let i = 0; i < 7; i++) {
    let index = nf(i + 1, 4, 0);
    // circles[i]   = loadImage(`data/circle${index}.png`);
    // squares[i]   = loadImage(`data/square${index}.png`);
    // triangles[i] = loadImage(`data/triangle${index}.png`);
    circles[i]   = loadImage('data_301/circle-' + (i+1) + '.png');
    squares[i]   = loadImage('data_301/square-' + (i+1) + '.png');
    triangles[i] = loadImage('data_301/triangle-' + (i+1) + '.png');
  }
}

let shapeClassifier;
let trained_epochs = 0;

function setup() {
  createCanvas(200, 200);
  background(200);
  //image(squares[0], 0, 0, width, height);

  let options = {
    inputs: [64, 64, 4],
    task: 'imageClassification',
    debug: true
  };
  shapeClassifier = ml5.neuralNetwork(options);

  for (let i = 0; i < circles.length; i++) {
    shapeClassifier.addData({ image: circles[i] }, { label: 'circle' });
    shapeClassifier.addData({ image: squares[i] }, { label: 'square' });
    shapeClassifier.addData({ image: triangles[i] }, { label: 'triangle' });
  }
  shapeClassifier.normalizeData();
  trained_epochs = 50;
  shapeClassifier.train({ epochs: 50 }, finishedTraining);
  console.log('Click into Preview and press S for saving of the model.')
  console.log('Press C to continue training.')
}

function finishedTraining() {
  console.log('Finished training! Epochs:', trained_epochs);
  // shapeClassifier.save();
}

function keyPressed() {
  if (key == 's') {
    shapeClassifier.save();
  } else if (key == 'c') {
    trained_epochs += 50;
    shapeClassifier.train({ epochs: 50 }, finishedTraining);
  }
}