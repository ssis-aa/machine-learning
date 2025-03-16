# Machine learning

<sup>Unit 5: Machine Learning</sup>

## Day 1: Sketch Classifier

### 1.1 Experimenting with Sketch Classifier

- Visit this website to experiment with a trained machine learning algorithm. 
- Trained Classifier Link: [https://editor.p5js.org/kreier/sketches/a8qydXg7S](https://editor.p5js.org/kreier/sketches/a8qydXg7S)   ([v1](https://editor.p5js.org/emwdx/sketches/9lStJ7PCF), [v2](https://editor.p5js.org/mkreier/sketches/-Df6sPm_o)) 
- Play with the program and find what it does well and not so well, emphasis on the not-so-well. (Coding Challenge 158)
- Record a video that summarizes your findings and put it in the next page: 1.2

### 1.2 Sketch Classifier Observations

- After playing with the Sketch Classifier in 1.1, record a video where you show the strengths and the weaknesses of the classifier as it is now. What is it good at? What does it not do well?
- Submit your video at this Flipgrid link: [https://flip.com/1e7ad802](https://flip.com/1e7ad802) 
- Last years submissions: [https://flipgrid.com/4a7a2f4d](https://flipgrid.com/4a7a2f4d)
- To submit this assignment, take a screenshot of one of the biggest fails you observed while you played with this.

### 1.3 Training a Classifier

- (10:36) Students watch [this video](https://youtu.be/NLZTP5BIxZo) to learn how to use the code.
- Here is [the folder of images for you](https://drive.google.com/file/d/1iwof-vI6OSbNlIHlRnVKEt9IBfjpm0yI/view?usp=sharing) to analyze in the task during class. Why does the classifier work as it does? How might you improve the data set to make it work better?
- **Create Dataset for Classifier**
  - Open the link using Google Chrome: [This code was used to create the dataset](https://editor.p5js.org/kreier/sketches/kuFfclgFJ) ([v1](https://editor.p5js.org/emwdx/sketches/MN-6eJwEJ), [v2](https://editor.p5js.org/mkreier/sketches/InBZ-A2LU))
  - Change the code based on your ideas for having better performance on triangles. 
  - Run the code to make sure that the triangles are better than they were in the sample set.
  - Uncomment lines 31, 38 and 44. These will include the code to save the images of circles, squares, and triangles that appear. Then run the code for yourself.
  - Save all of the downloaded images into a single folder on your computer.
- **Training the Classifier**
  - Open the classifier training example: [https://editor.p5js.org/kreier/sketches/nlmY0B2DH](https://editor.p5js.org/kreier/sketches/nlmY0B2DH) ([v1](https://editor.p5js.org/mkreier/sketches/EHQdwsN9L)) Download this example. You won’t be training on p5js website, instead on your local machine. Unpack the content of the downloaded zip-file.
  - Open the terminal, navigate to this downloaded folder and start your python3 webserver using the code `python3 -m http.server 8000`.  If this gives an error,  you first have to install the xcode command line tools with `xcode-select -–install`
  - Open a web browser in incognito mode and navigate to `localhost:8000`.
  - After training your classifier you should get 3 files: `model_meta.json`, `model.json` and `model.weights.bin` . But this one is based on only 30 images in `/data`.
  - Output left for the p5js website, output right on your local webserver:
<img src="https://github.com/user-attachments/assets/a72ac6c9-0f85-4002-89cd-8d21e57cbd27" width="75%"> <img src="https://github.com/user-attachments/assets/ae4b9523-9917-4e1c-9ea8-8e5dab1ae355" width="23%">
 
  - Edit the `sketch.js` in the download folder, increase the input image list to 9 in line 18 to 9 and the epochs in line 46 to 60.
  - You have to stop the webserver with ctrl+c and start a new one on another port, for example on `python3 -m http.server 8001` and then open `localhost:8001` in the incognito browser
  - Copy your generated 300 images  that you created into the training folder inside your downloaded example. Change the reference folder for the images to training in line 20, 21, 22 
  - Train your model and download the 3 files `model.json`, `model.weights.bin` and `model_meta.json`
- Follow the instructions in this video to train your classifier on your computer: 
- 7:38 [AA - Shape Sketch Classifier - Training on your Computer](https://youtu.be/L3LDbbAONpw)

## Day 2: Improving the Classifier

### 2.1 Testing the Classifier

- Open the classifier testing example:  [https://editor.p5js.org/kreier/sketches/jJXV1ycLp](https://editor.p5js.org/kreier/sketches/jJXV1ycLp) ([v1](https://editor.p5js.org/emwdx/sketches/YGsVcehAN))
- The included weights classify 19 to 20 correct: How well is your model doing?



Try this shape classifier - start this sketch and draw a triangle, circle or square into the field on the right.

[Click classifier](https://editor.p5js.org/kreier/sketches/a1gdLa8rZ)
