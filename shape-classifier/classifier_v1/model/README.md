# Dimensions of the model

The file [model.json](model.json) defines the model. We see serveral layers like "Conv2D", "MaxPooling2D", "Conv2D", "MaxPooling2D", "Flatten" and "Dense". The respective 6 weight categories are:

- Conv2D1.kernel [5, 5, 4, 8] - 5x5x4x8 = 800 values
- Conv2D1.bias [8] - 8 values
- Conv2D2.kernel [5, 5, 8, 16] - 5x5x8x16 = 3200 values
- Conv2D2.bias [16] - 16 values
- Dense1.kernel [2704,3] - 2704x3 = 8112 values
- Dense1.bias [3] - 3 values

In total we have 800 + 8 + 3200 + 16 + 8112 + 3 = 12139 values. They are all stored as `float32` and therefore need 32 bits or 4 bytes. The total model size is therefore 48556 bytes or 47.4 kByte. Which is the exact size of the [model.weights.bin](model.weights.bin) file.
