import NodeWebcam from 'node-webcam';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import faceapi from 'face-api.js';
import canvas from 'canvas';

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

// Webcam options
const webcamOptions = {
  width: 1280,
  height: 720,
  quality: 100,
  delay: 0,
  saveShots: true,
  output: 'jpeg',
  device: false,
  callbackReturn: 'location',
  verbose: false,
};

const Webcam = NodeWebcam.create(webcamOptions);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function captureAndAnalyze() {
  const imagePath = path.join(__dirname, 'snapshot.jpg');
  Webcam.capture(imagePath, (err, data) => {
    if (err) return console.error('Failed to capture image:', err);
    analyzeEmotion(imagePath);
  });
}

// Function to analyze emotions
async function analyzeEmotion(imagePath) {
  try {
    const image = fs.readFileSync(imagePath);
    const emotions = await detectEmotion(image);
    let dominantEmotion = 'neutral';
    let highestProbability = 0;

    emotions.forEach(emotion => {
      for (const [key, value] of Object.entries(emotion.expressions)) {
        if (value > highestProbability) {
          highestProbability = value;
          dominantEmotion = key;
        }
      }
    });

    console.log(emotions);

    return dominantEmotion;
  } catch (error) {
    console.error('Failed to detect emotion or get response:', error);
  }
}

await faceapi.nets.tinyFaceDetector.loadFromDisk('./models');
await faceapi.nets.faceExpressionNet.loadFromDisk('./models');

const detectEmotion = async (image) => {
  const detections = await faceapi.detectAllFaces(image, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
  return detections;
};


export { captureAndAnalyze };