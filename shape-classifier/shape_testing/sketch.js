// https://editor.p5js.org/kreier/sketches/3SDZRqw26
let circles   = [];
let squares   = [];
let triangles = [];

let shapeClassifier;
let rowIndex = 0;
let previewHeight = 20;
let NUM_OF_IMAGES = 10;
var loopCount = 0;
var currentImageIndex = 0;
var resultsMatrix = []

var categories  = ['triangle','square','circle']
var currentMode = categories[0];

var canvas;
var inputImage;

function preload(){
  for(let i = 0; i < NUM_OF_IMAGES; i++) {
    triangles[i] = loadImage('testing_30/triangle-' + (i+1) + '.png');
    squares[i]   = loadImage('testing_30/square-'   + (i+1) + '.png');
    circles[i]   = loadImage('testing_30/circle-'   + (i+1) + '.png');
    // index = nf(i, 4, 0);
    // triangles[i] = loadImage(`testing/triangle${index}.png`);
    // squares[i]   = loadImage('testing/square${index}.png');
    // circles[i]   = loadImage('testing/circle${index}.png');
  }
}

function setup() {
  canvas = createCanvas(400, 400);
  pixelDensity(1.0);
  let options = {
    inputs: [64, 64, 4],
    task: "imageClassification",
    debug: true
  }
  shapeClassifier = ml5.neuralNetwork(options)
  const modelInfo = {
    model:    'model1/model.json',
    metadata: 'model1/model_meta.json',
    weights:  'model1/model.weights.bin',
  };
  shapeClassifier.load(modelInfo, modelLoaded);
  
  resultsDiv1 = createDiv('loading model')
  resultsDiv2 = createDiv('...')
  resultsDiv3 = createDiv('...')
  resultsDiv4 = createDiv('.')
  inputImage  = createGraphics(64,64);
  
  // Build a confusion matrix for each element of the categories array.
  for (var i = 0; i < categories.length; i++) {
    let newRow = [];
    for (var j = 0; j < categories.length; j++) {
      newRow.push(0);
    }
    resultsMatrix.push(newRow);
  }
}

function modelLoaded(){
  console.log("Trained model is loaded");
  //classifyImage();
}

function gotResults(err,results){
  if(err){
    console.log(err);
    return
  }
  let label = results[0].label;
  let confidence = Math.round(100*results[0].confidence)
  resultsDiv1.html(label + ", " + confidence + "% confident")
  label = results[1].label;
  confidence = Math.round(100*results[1].confidence)
  resultsDiv2.html(label + ", " + confidence + "% confident")
  label = results[2].label;
  confidence = Math.round(100*results[2].confidence)
  resultsDiv3.html(label + ", " + confidence + "% confident")
  //console.log(results)
    
  let targetIndex = categories.indexOf(currentMode)
  let classifiedIndex = categories.indexOf(results[0].label)

  resultsMatrix[classifiedIndex][targetIndex] += 1
}

// This function takes the canvas, copies it into a 64 x 64 pixel image, and asks the model to try to predict what is on the canvas.
  
function classifyImage(){
  inputImage.copy(canvas,0,0,400,400,0,0,64,64);
  shapeClassifier.classify({image: inputImage},gotResults)
}

function draw() {
  if(loopCount >= 2){
    loopCount = 0;
    if(currentMode == 'triangle'){
      image(triangles[currentImageIndex], 0, 0, width, height)
    }
    else if(currentMode == 'square'){
      image(squares[currentImageIndex], 0, 0, width, height)
    }
    else{
      image(circles[currentImageIndex], 0, 0, width, height)
    }
    
    classifyImage();
    currentImageIndex += 1
    table_confmatrix();
  }
  else{
    loopCount += 1;
  }
  
  if(currentMode == "triangle" && currentImageIndex == NUM_OF_IMAGES){
    currentMode = "square";
    currentImageIndex = 0;
  } 
  else if ( currentMode == "square" && currentImageIndex == NUM_OF_IMAGES){
    currentMode = "circle";
    currentImageIndex = 0;
  }
  else if ( currentMode == "circle" && currentImageIndex == NUM_OF_IMAGES){
    noLoop();
    currentImageIndex = 0;
    console.log("done with all images");
    console.table(resultsMatrix);
    table_confmatrix();
  }
}

function table_confmatrix() {
  var exportTable = "<table style='border: 1px solid black; border-collapse: collapse;'><tr><td> </td>";
  for (var i = 0; i < categories.length; i++){
    exportTable += "<td style='border: 1px solid black; border-collapse: collapse;'>" + categories[i] + "</td>";
  }
  exportTable += "</tr>"
  var correct = 0;
  var incorrect = 0;
  for (var i = 0; i < categories.length; i++){
    exportTable += "<tr><td style='border: 1px solid black; border-collapse: collapse;'>" + categories[i] + "</td>";
    for (var j = 0; j < categories.length; j++){
      exportTable += "<td style='border: 1px solid black; border-collapse: collapse;'>" + resultsMatrix[i][j] + "</td>";
      if (i == j) {
        correct += resultsMatrix[i][j]
      } else {
        incorrect += resultsMatrix[i][j]
      }
    }
    exportTable += "</tr>";
  }
  exportTable += "</tr></table>";
  exportTable += "<p>That's " + correct + " correct identified and " + incorrect + " incorrect identified ";
  exportTable += "objects. </br> Ratio correct : " + (100 * correct / (correct + incorrect)).toPrecision(3) + "% </p>";
  resultsDiv4.html(exportTable);
}