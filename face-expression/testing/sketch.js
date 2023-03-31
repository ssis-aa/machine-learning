// https://editor.p5js.org/kreier/sketches/4vo0TE82i
let properties = [
  { name: "mouthWidth", min: 40, max: 100, default: 50 },
  { name: "mouthHeight", min: 30, max: 90, default: 40 },
  { name: "mouthCurve", min: -20, max: 20, default: 0 },
  { name: "eyeSize", min: 10, max: 60, default: 30 },
  { name: "eyeDistance", min: 40, max: 80, default: 60 },
  { name: "eyeLocation", min: 0, max: 50, default: 0 },
  { name: "eyeBrowLocation", min: 10, max: 50, default: 20 },
  { name: "eyeBrowAngle", min: -30, max: 30, default: 0 },
  { name: "eyeBrowLength", min: 5, max: 30, default: 10 },
];

let categories = [
  "happy",
  "surprised",
  "neutral",
  "angry",
  "sad",
  "worried",
  "other",
];

let INPUT_FILE = "/data/faceDataTesting.csv"
var categoryButtons = {};

var propertyControls = {};
var headWidthSlider;
var headHeightSlider;
var eyeSizeSlider;
var eyeDistanceSlider;
var eyeLocationSlider;
var targetSpan;
var classifiedSpan;

var canvas;
var nn;
var table;
var loopCount = 0;

var classifyResults = false;
var testingResultsComplete = false;
var dataArray = [];
var dataArrayIndex = 0;
var resultsMatrix = [];

function preload() {
  // my table is comma separated value "csv"
  // and has a header specifying the columns labels
  table = loadTable(INPUT_FILE, "csv");
}

function setup() {
  canvas = createCanvas(200, 200);
  canvas.id("canvas");
  angleMode(DEGREES);
  // This code creates the sliders for properties and hides them
  for (var i = 0; i < properties.length; i++) {
    currentProperty = properties[i];
    let newSlider = createSlider(
      currentProperty.min,
      currentProperty.max,
      currentProperty.default
    );
    newSlider.position(10, 255 + 20 * i);
    newSlider.style("width", "80px");
    newSlider.changed(classify);
    newSlider.parent("sliders");
    // newSlider.hide();
    let newSpan = createSpan(currentProperty.name);
    newSpan.position(100, 250 + 20 * i);
    // newSpan.hide();
    propertyControls[currentProperty.name] = newSlider;
  }
  // This code creates the buttons for each category
  for (var i = 0; i < categories.length; i++) {
    let button = createButton(categories[i]);
    button.position(220, 0 + 35 * i);
    button.mouseClicked(randomizeProperties);
    button.class("btn btn-primary");
    button.hide();
    categoryButtons[categories[i]] = button;
  }

  targetSpan = createSpan("target");
  targetSpan.parent("#target");

  classifiedSpan = createSpan("classified");
  classifiedSpan.parent("#classifiedFace");

  
  // This portion of the code sets up the inputs for the 
  // machine learning algorithm from the CSV file.
  const options = {
    // inputs: ['mouthWidth', 'mouthHeight','mouthCurve',
    // 'eyeSize','eyeDistance','eyeLocation','eyeBrowLocation',
    // 'eyeBrowAngle','eyeBrowLength'],
    // outputs: ['emotion'] ,
    inputs: 9, // This is the number of input values
    outputs: 1, //this is the number of output values
    task: "classification", 
    // We use classification because we want the output to be one 
    // of a few specific labels for happy, sad, etc.
    debug: false, // we don't need any training progress because this is a testing program

  };

  // Create the neural network
  nn = ml5.neuralNetwork(options);
  
  // Define the names of the trained model files to be brought into the sketch
  const modelDetails = {
    model:    'model/model.json',
    metadata: 'model/model_meta.json',
    weights:  'model/model.weights.bin'
  }
  // Load the model, and when complete, run the modelLoaded function.
  nn.load(modelDetails, modelLoaded)
}

function modelLoaded(){
  console.log("model loaded")
  // Run the function to load the data from the CSV file.
  loadData()
}

function loadData() {
  // The code below gets the data from the loaded CSV file and 
  // stores it in input/output arrays to be read into the neural network.
  
  // For each row of the table,
  for (let r = 0; r < table.getRowCount(); r++) {
    var rowArray = [];
    // Store each value in that row in a new row array.
    // table.rows[r].arr.length - 2 means get all of the columns except the last one
    for (var i = 0; i < table.rows[r].arr.length - 1; i++) {
      rowArray.push(parseInt(table.rows[r].arr[i]));
    }
    // Create a single element array for the output value which is in the rightmost column
    let outputIndex = table.rows[r].arr.length - 1
    rowArray.push(table.rows[r].arr[outputIndex]);

    dataArray.push(rowArray);
  }
  

  // Build a confusion matrix for each element of the categories array.
  for (var i = 0; i < categories.length; i++) {
    let newRow = [];
    for (var j = 0; j < categories.length; j++) {
      newRow.push(0);
    }
    resultsMatrix.push(newRow);
  }
  //console.log(resultsMatrix)
  console.log("data loaded");
}

function classify() {
  //console.log("begin classify");
  mouthWidth = propertyControls["mouthWidth"].value();
  mouthHeight = propertyControls["mouthHeight"].value();
  mouthCurve = propertyControls["mouthCurve"].value();
  eyeSize = propertyControls["eyeSize"].value();
  eyeDistance = propertyControls["eyeDistance"].value();
  eyeLocation = propertyControls["eyeLocation"].value();
  eyeBrowLocation = propertyControls["eyeBrowLocation"].value();
  eyeBrowAngle = propertyControls["eyeBrowAngle"].value();
  eyeBrowLength = propertyControls["eyeBrowLength"].value();
  let input = [
    mouthWidth,
    mouthHeight,
    mouthCurve,
    eyeSize,
    eyeDistance,
    eyeLocation,
    eyeBrowLocation,
    eyeBrowAngle,
    eyeBrowLength,
  ];
  //console.log(input)
  console.log("classifying")
  nn.classify(input, handleResults);
}

function handleResults(error, result) {
  if (error) {
    console.error(error);
    return;
  }
  classifiedSpan.html("AI classified as: "+ result[0].label);
  let targetIndex = categories.indexOf(targetSpan.html())
  let classifiedIndex = categories.indexOf(result[0].label)
  
  resultsMatrix[classifiedIndex][targetIndex] += 1
}

function draw() {
  mouthWidth = propertyControls["mouthWidth"].value();
  mouthHeight = propertyControls["mouthHeight"].value();
  mouthCurve = propertyControls["mouthCurve"].value();
  eyeSize = propertyControls["eyeSize"].value();
  eyeDistance = propertyControls["eyeDistance"].value();
  eyeLocation = propertyControls["eyeLocation"].value();
  eyeBrowLocation = propertyControls["eyeBrowLocation"].value();
  eyeBrowAngle = propertyControls["eyeBrowAngle"].value();
  eyeBrowLength = propertyControls["eyeBrowLength"].value();

  if (loopCount > 0 && testingResultsComplete == false) {
    loopCount = 0;
    dataArrayIndex += 1;
    if (dataArrayIndex < dataArray.length) {
      drawFace(mouthWidth, mouthHeight, mouthCurve, 
               eyeSize, eyeDistance,eyeLocation, 
               eyeBrowLocation, eyeBrowAngle,eyeBrowLength)
      loadCurrentFace();
      
      classify()
    } else {
      testingResultsComplete = true;
      console.log("processed all data");
      console.table(resultsMatrix)
    }
  } else {
    loopCount += 1;
  }
}

function drawFace(mouthHeight, mouthWidth, mouthCurve,
                  eyeSize, eyeDistance, eyeLocation,
                  eyeBrowLocation, eyebrowAngle, eyeBrowLength) 
  {
  background(220);

  noStroke();
  fill(130, 130, 250);
  circle(width / 2, height / 2, 0.9 * width);
  stroke(10);
  fill(244, 224, 77);
  ellipse(width / 2, height / 2, mouthWidth, mouthHeight);

  //beak
  beginShape();
  vertex(width / 2 - mouthWidth / 2, height / 2);
  quadraticVertex(
    width / 2,
    width / 2 - mouthCurve,
    width / 2 + mouthWidth / 2,
    height / 2
  );
  endShape();

  //eyes
  fill(10);
  circle(width / 2 + eyeDistance, width / 2 - eyeLocation, eyeSize);
  circle(width / 2 - eyeDistance, width / 2 - eyeLocation, eyeSize);
  fill(250);
  circle(width / 2 + eyeDistance, width / 2 - eyeLocation, 0.9 * eyeSize);
  circle(width / 2 - eyeDistance, width / 2 - eyeLocation, 0.9 * eyeSize);
  fill(0);
  circle(width / 2 + eyeDistance, width / 2 - eyeLocation, 0.1 * eyeSize);
  circle(width / 2 - eyeDistance, width / 2 - eyeLocation, 0.1 * eyeSize);

  // eyebrows
  strokeWeight(4);
  push();
  translate(width / 2 + eyeDistance, width / 2 - eyeLocation - eyeBrowLocation);
  rotate(eyeBrowAngle);
  line(-eyeBrowLength, 0, eyeBrowLength, 0);
  pop();
  push();
  translate(width / 2 - eyeDistance, width / 2 - eyeLocation - eyeBrowLocation);
  rotate(-eyeBrowAngle);
  line(-eyeBrowLength, 0, eyeBrowLength, 0);
  pop();
}

function randomizeProperties() {
  let faceData = {};
  for (var i = 0; i < properties.length; i++) {
    let currentProperty = properties[i];
    faceData[currentProperty.name] = propertyControls[
      currentProperty.name
    ].value();
    let randomPropertyValue =
      Math.round(Math.random() * (currentProperty.max - currentProperty.min)) +
      currentProperty.min;
    propertyControls[currentProperty.name].value(randomPropertyValue);
  }
  //faceData['output'] = event.target.innerText
  classify();
}

function loadCurrentFace() {
  currentRow = dataArray[dataArrayIndex];
  propertyControls["mouthWidth"].value(currentRow[0]);
  propertyControls["mouthHeight"].value(currentRow[1]);
  propertyControls["mouthCurve"].value(currentRow[2]);
  propertyControls["eyeSize"].value(currentRow[3]);
  propertyControls["eyeDistance"].value(currentRow[4]);
  propertyControls["eyeLocation"].value(currentRow[5]);
  propertyControls["eyeBrowLocation"].value(currentRow[6]);
  propertyControls["eyeBrowAngle"].value(currentRow[7]);
  propertyControls["eyeBrowLength"].value(currentRow[8]);
  targetSpan.html("target: " + currentRow[9]);
}
