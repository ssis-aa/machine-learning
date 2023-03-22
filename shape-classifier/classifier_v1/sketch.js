// https://editor.p5js.org/kreier/sketches/a8qydXg7S
let shapeClassifier;
let canvas;
let resultsDiv;
let inputImage;

function setup() {
  // Create our canvas
  canvas = createCanvas(400, 400);
  pixelDensity(1.0);
  // Set up the trained model to be loaded.
  let options = {
    inputs: [64,64,4],
    task: "imageClassification",
    debug: false
  }
  shapeClassifier = ml5.neuralNetwork(options)
  
  // Tell the program where to look for the model we want to load.
  const modelInfo = {
  model: 'model/model.json',
  metadata: 'model/model_meta.json',
  weights: 'model/model.weights.bin',
  };
  
  // And load it!
  shapeClassifier.load(modelInfo, modelLoaded);
  
  // Clear the canvas
  background(255);
  createDiv('Draw a shape into the canvas!')
  
  // Create a clear button
  clearButton = createButton('clear');
  clearButton.mousePressed(function(){
    background(255);
  })
  
  // ... and a label.
  resultsDiv = createDiv('loading model')
  inputImage = createGraphics(64,64);
}

// This function is called when the model is loaded.
function modelLoaded(){
  console.log("Trained model is loaded");
  classifyImage();
}

// This function runs when the model gives a prediction for what it thinks is drawn on the canvas.

function gotResults(err,results){
  if(err){
    console.log(err);
    return
  }
  let label = results[0].label;
  let confidence = nf(100*results[0].confidence,2,1)
  resultsDiv.html(label + " , " + confidence + "% confident")
  console.log(results) 
}

// This function takes the canvas, copies it into a 64 x 64 pixel image, 
// and asks the model to try to predict what is on the canvas.
function classifyImage(){
  inputImage.copy(canvas,0,0,400,400,0,0,64,64);
  shapeClassifier.classify({image: inputImage},gotResults) 
}
  
function draw() {
  // Refresh the page as fast as you can and draw a line when the mouse is pressed.
  if(mouseIsPressed){
    strokeWeight(8);
    line(mouseX,mouseY,pmouseX,pmouseY);
  }
  
  // Use the trained model to classify what is drawn on the canvas.
  classifyImage();
}