# Using Machine Learning as a Sketch Classifier

## Experimenting with Sketch Classifier
- Visit this website to experiment with a trained machine learning algorithm. 
- Trained Classifier Link: https://editor.p5js.org/kreier/sketches/a8qydXg7S   (v1, v2) 
- Play with the program and find what it does well and not so well, emphasis on the not-so-well. (Coding Challenge 158)

## Training a Classifier
- Students watch [this video](https://youtu.be/NLZTP5BIxZo) (10:36) to learn how to use the code. 
- [Here is the folder of images for you](https://drive.google.com/file/d/1iwof-vI6OSbNlIHlRnVKEt9IBfjpm0yI/view?usp=sharing) to analyze in the task during class. Why does the classifier work as it does? How might you improve the data set to make it work better?

## Create a Dataset for Classifier
- Open the link using Google Chrome: This code was used to create the dataset (v1, v2)
- Change the code based on your ideas for having better performance on triangles. 
- Run the code to make sure that the triangles are better than they were in the sample set.
- Uncomment lines 31, 38 and 44. These will include the code to save the images of circles, squares, and triangles that appear. Then run the code for yourself.
- Save all of the downloaded images into a single folder on your computer.

## Training the Classifier
- Open the classifier training example: https://editor.p5js.org/kreier/sketches/nlmY0B2DH (v1) Download this example. You won’t be training on p5js website, instead on your local machine. Unpack the content of the downloaded zip-file.
- Open the terminal, navigate to this downloaded folder and start your python3 webserver using the code `python3 -m http.server 8000`.  If this gives an error,  you first have to install the xcode command line tools with `xcode-select -–install`
- Open a web browser in incognito mode and navigate to `localhost:8000`.
- After training your classifier you should get 3 files: `model_meta.json` `model.json` and `model.weights.bin` . But this one is based on only 30 images in /data.
- Output left for the p5js website, output right on your local webserver:

## Testing the Classifier  
- Edit the sketch.js in the download folder, increase the input image list to 9 in line 18 to 9 and the epochs in line 46 to 60.
- You have to stop the webserver with ctrl+c and start a new one on another port, for example on `python3 -m http.server 8001` and then open `localhost:8001` in the incognito browser
- Copy your generated 300 images  that you created into the training folder inside your downloaded example. Change the reference folder for the images to training in line 20, 21, 22 
- Train your model and download the 3 files `model.json`, `model.weights.bin` and `model_meta.json`
