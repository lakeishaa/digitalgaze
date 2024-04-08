var capture;
var tracker;
var w = 640,
  h = 480;
var canvasX, canvasY;
let numCircles = 6; // Number of circles in the ring
let radius = 250; // Radius of the ring
let centerX, centerY; // Center of the canvas

// let urls = [
//   "https://www.google.com",
//   "https://www.yahoo.com",
//   "https://www.youtube.com",
//   "https://www.wikipedia.com",
//   "https://www.example.com",
// ];

let urls = [
  "experiment-fisheye.html",
  "experiment-scan.html",
  "experiment-distort/index.html",
  "experiment-screen/index.html",
  // "https://editor.p5js.org/lakeishaa/full/TkAX6AHmQ",
  // "https://lakeishaa.github.io/thesis/expxeriment-2/version-2/",
  "experiment-emoji/index.html",
  "experiment-letters/index.html",
];

function openModal(url) {
  var modal = document.getElementById("myModal");
  var modalFrame = document.getElementById("modalFrame");

  modal.style.display = "block"; // Display the modal

  // Set the iframe source to the URL
  modalFrame.src = url;

  console.log("Opening modal with URL:", url);
}

new p5((p) => {
  p.setup = function () {
    p.createCanvas(800, 800); // Double the size of the canvas

    canvasX = (p.windowWidth - p.width) / 2; // Calculate canvas X position
    canvasY = (p.windowHeight - p.height) / 2; // Calculate canvas Y position

    p.createCanvas(800, 800).position(canvasX, canvasY); // Set canvas position

    capture = p.createCapture(
      {
        audio: false,
        video: {
          width: w,
          height: h,
        },
      },
      function () {
        console.log("capture ready.");
      }
    );
    capture.elt.setAttribute("playsinline", "");
    capture.size(w, h);
    capture.hide();

    p.colorMode(p.HSB);

    tracker = new clm.tracker();
    tracker.init();
    tracker.start(capture.elt);

    centerX = p.width / 2;
    centerY = p.height / 2;
  };

  let hoveredCircle = -1; // Index of the circle being hovered, initialized to -1

  p.draw = function () {
    var positions = tracker.getCurrentPosition();

    if (positions.length > 0) {
      p.background(255); // Set the background color to grey

      // Drop shadow for the white circle
      p.noStroke();
      p.fill(0, 50); // Set the shadow color and transparency
      p.ellipse(p.width / 2 + 10, p.height / 2 + 10, 400); // Draw the shadow with an offset

      // Whites of the eye
      p.strokeWeight(1);
      p.stroke(0);
      p.fill(255);
      p.ellipse(p.width / 2, p.height / 2, 400); // Draw the white circle

      // Iris
      let xc = p.constrain(p.map(positions[62][0], 0, w, p.width, 0), 340, 460); // Adjust the mapping and constrain
      let xs = p.constrain(
        p.map(positions[62][1], 0, h, 0, p.height),
        340,
        460
      ); // Adjust the mapping and constrain
      p.fill(0, 0, 10, 0.95); // Adjust the alpha value (0.5 = 50% transparency)
      p.circle(xc, xs, 200); // Double the size

      // Draw webcam frame at the position of the iris
      p.blendMode(p.OVERLAY);
      // tint(255, 55); // Set the transparency (100 = semi-transparent)

      let frameSize = 200; // Size of the webcam frame
      let frameX = xc - frameSize / 2; // X position of the frame
      let frameY = xs - frameSize / 2; // Y position of the frame
      p.image(capture, frameX, frameY, frameSize, frameSize);

      // Reset blend mode for subsequent drawings
      p.blendMode(p.BLEND);

      // Glare
      p.fill(255);
      p.noStroke();
      p.ellipse(xc + 40, xs - 40, 40); // Draw the glare circle

      // Draw circles in a loop
      for (let i = 0; i < numCircles; i++) {
        // Calculate the angle for this circle
        let angle = i * (p.TWO_PI / numCircles);
        p.strokeWeight(1);
        p.stroke(000000);
        if (hoveredCircle === i) {
          p.fill("black"); // Change color to red when hovered
        } else {
          p.fill("white"); // Otherwise, keep it black
        }

        // Calculate the position of the circle
        let x = centerX + p.cos(angle) * radius;
        let y = centerY + p.sin(angle) * radius;

        // Draw the circle
        p.ellipse(x, y, 20, 20);
      }
    }
  };

  p.mouseMoved = function () {
    // Check if mouse is inside any circle
    hoveredCircle = -1; // Reset the hovered circle index
    for (let i = 0; i < numCircles; i++) {
      // Calculate the angle for this circle
      let angle = i * (p.TWO_PI / numCircles);
      // Calculate the position of the circle
      let x = centerX + p.cos(angle) * radius;
      let y = centerY + p.sin(angle) * radius;
      // Check if mouse is inside this circle
      let d = p.dist(p.mouseX, p.mouseY, x, y);
      if (d < 10) {
        // Radius of the circle is 10 (diameter 20)
        // Log which circle is being hovered
        hoveredCircle = i;
        return false; // Prevent default action of the mouseMoved event
      }
    }
  };

  p.mousePressed = function () {
    // Check if mouse is inside any circle
    for (let i = 0; i < numCircles; i++) {
      // Calculate the angle for this circle
      let angle = i * (p.TWO_PI / numCircles);
      // Calculate the position of the circle
      let x = centerX + p.cos(angle) * radius;
      let y = centerY + p.sin(angle) * radius;
      // Check if mouse is inside this circle
      let d = p.dist(p.mouseX, p.mouseY, x, y);
      if (d < 10) {
        // Radius of the circle is 10 (diameter 20)
        // Log which circle is being clicked
        console.log("Circle " + (i + 1) + " clicked");
        // Open the corresponding URL in a modal
        openModal(urls[i]);
        return false; // Prevent default action of the click event
      }
    }
  };

  var modal = document.getElementById("myModal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Function to open URL in a modal
  function openModal(url) {
    var modal = document.getElementById("myModal");
    var modalFrame = document.getElementById("modalFrame");

    modal.style.display = "block"; // Display the modal

    // Set the iframe source to the URL
    modalFrame.src = url;

    console.log("Opening modal with URL:", url);
  }
});
