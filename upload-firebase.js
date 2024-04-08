// ALL THE ACTUAL FIREBASE STUFF
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";
// this is the id you get from the firebase site
// 1. go to your project in firebase
// 2. on the left, you should see project overview. click the settings icon next to that
// 3. under the general tab, scroll down until you see "Your Apps" > "SDK Setup and Configuration" > click "CDN" option
// 4. copy the "const firebaseConfig" stuff here

const firebaseConfig = {
  apiKey: "AIzaSyAMQ_CG_5z5hnipSNsGPgOQ_0qdwuvvkFE",
  authDomain: "experiment-1-a5569.firebaseapp.com",
  projectId: "experiment-1-a5569",
  storageBucket: "experiment-1-a5569.appspot.com",
  messagingSenderId: "786848567347",
  appId: "1:786848567347:web:ede8d79959c40fce2d1346",
  measurementId: "G-FENP5DHES2",
  storageBucket: "gs://experiment-1-a5569.appspot.com",
};
// only replace the const stuff ^^^^

// COPY EVERYTHING BELOW BUT READ THE NOTES VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV

const app = initializeApp(firebaseConfig);
const storage = getStorage();
const imagesFolder = ref(storage, "images");

function getCanvasSnapshot() {
  const canvas = document.getElementById("defaultCanvas0");
  // Convert the canvas content to a Blob
  canvas.toBlob((blob) => {
    uploadCanvasBlob(blob);
  }, "image/png");
}
function uploadCanvasBlob(blob) {
  // Create a unique filename for the image
  const imageName = "screencap-" + new Date().toISOString() + ".png";
  // Create a reference to 'images/imageName.png' in Firebase Storage
  const imageRef = ref(imagesFolder, imageName);
  // Upload the blob to Firebase Storage
  uploadBytes(imageRef, blob).then((snapshot) => {
    console.log("Uploaded a blob or file!");
  });
}
document
.getElementById("submitButton")
.addEventListener("click", getCanvasSnapshot);

// document.body.addEventListener("click", uploadToFirebase);
