// ALL THE ACTUAL FIREBASE STUFF
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
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

listAll(imagesFolder)
  .then((result) => {
    console.log(result);
    result.items.forEach((imageRef) => {
      // For each image reference, get the download URL
      getDownloadURL(imageRef)
        .then((url) => {
          // Create a container div for each image
          const imageContainer = document.createElement("div");
          imageContainer.classList.add("image-container");

          // Create a div for firebase images and append it to the container
          const firebaseImagesDiv = document.createElement("div");
          firebaseImagesDiv.classList.add("firebase-images");
          imageContainer.appendChild(firebaseImagesDiv);

          // Create an img element and set its src to the URL
          const img = document.createElement("img");
          img.src = url;
          img.style.width = "180px"; // Set the size of the image
          img.style.height = "180px";
          img.style.margin = "10px";
          // Append the image to the firebase images div
          firebaseImagesDiv.appendChild(img);

          // Create a border image for each image
          const borderImage = document.createElement("img");
          borderImage.src = "images/border-website-ori.png";
          borderImage.classList.add("border-image");
          // Append the border image to the container
          imageContainer.appendChild(borderImage);

          // Add the container to the imagesContainer
          document
            .getElementById("imagesContainer")
            .appendChild(imageContainer);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  })
  .catch((error) => {
    console.log(error);
  });
