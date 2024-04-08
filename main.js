document.addEventListener("DOMContentLoaded", function () {
  const numCursors = 35; // Number of custom cursors
  const cursors = [];
  const cursorEases = [
    0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3,
  ]; // Different levels of ease for cursors

  // Update cursor positions
  function updateCursorPosition(cursor, ease) {
    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;

    function update() {
      const dx = mouseX - posX;
      const dy = mouseY - posY;

      posX += dx * ease;
      posY += dy * ease;

      cursor.style.left = posX + "px";
      cursor.style.top = posY + "px";

      requestAnimationFrame(update);
    }

    document.addEventListener("mousemove", function (event) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });

    update();
  }

  // Create custom cursors and assign different ease levels to each cursor
  for (let i = 0; i < numCursors; i++) {
    const customCursor = document.createElement("div");
    customCursor.classList.add("custom-cursor");
    document.body.appendChild(customCursor);
    cursors.push(customCursor);

    const ease = cursorEases[i % cursorEases.length];
    updateCursorPosition(customCursor, ease);
  }

  // Add event listener to the close button inside the modal
  // document.querySelector(".close").addEventListener("click", function () {
  //   // Hide the modal and overlay
  //   document.getElementById("popup").style.display = "none";
  //   document.getElementById("overlay").style.display = "none";
  // });

  // Add event listener to the close button inside the modal
  document.getElementById("popup").addEventListener("click", function (event) {
    if (event.target.id === "xButton") {
      // Hide the modal and overlay
      document.getElementById("popup").style.display = "none";
      // document.getElementById("overlay").style.display = "none";
    }
  });

  // Start the stopwatch when the page loads
  startStopwatch();

  // Call openPopup after 2 minutes
  // setTimeout(openPopup, 2 * 60 * 1000);
  setTimeout(openPopup, 2 * 1000);
});

let timerInterval;
let seconds = 0,
  minutes = 0,
  hours = 0;

// Function to start the stopwatch
function startStopwatch() {
  timerInterval = setInterval(updateTimer, 1000);
}

// Function to update the timer
function updateTimer() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }
  updateTimerDisplay();
}

// Function to update the timer display
function updateTimerDisplay() {
  const formattedTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
  document.getElementById("timer").innerText = formattedTime;
}

// Function to pad numbers with leading zeros
function pad(num) {
  return (num < 10 ? "0" : "") + num;
}

// Function to save the timer state in cookies
function saveTimerState() {
  document.cookie = `timer=${hours}:${minutes}:${seconds}`;
}

// Function to retrieve the timer state from cookies
function retrieveTimerState() {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name.trim() === "timer") {
      const [h, m, s] = value.split(":").map(Number);
      hours = h;
      minutes = m;
      seconds = s;
      updateTimerDisplay();
      break;
    }
  }
}

// Start the stopwatch when the page loads
startStopwatch();

// Save timer state when window is closed or refreshed
window.addEventListener("beforeunload", saveTimerState);

// Retrieve timer state when the window is reopened
window.addEventListener("load", retrieveTimerState);

// add more stuff

// Get IP Address
fetch("https://api.ipify.org?format=json")
  .then((response) => response.json())
  .then((data) => {
    var ipAddress = data.ip;
    console.log("IP Address:", ipAddress);
  })
  .catch((error) => console.error("Error getting IP address:", error));

// Function to set a cookie
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Function to track page views
setCookie("page_views", parseInt(getCookie("page_views") || 0) + 1, 365);
console.log("Page views:", getCookie("page_views"));

// Function to track navigation paths
var navigationPath = getCookie("navigation_path") || "";
navigationPath += window.location.href + " > ";
setCookie("navigation_path", navigationPath, 365);
console.log("Navigation path:", navigationPath);

// Function to track sequence of pages visited
var visitedPages = JSON.parse(getCookie("visited_pages")) || [];
visitedPages.push(window.location.href);
setCookie("visited_pages", JSON.stringify(visitedPages), 365);
console.log("Visited pages:", visitedPages);

// Function to track clicks
document.addEventListener("click", function (event) {
  var clickedElement = event.target;
  console.log("Clicked element:", clickedElement);

  // Increment click count
  var clickCount = parseInt(getCookie("click_count") || 0);
  clickCount++;
  setCookie("click_count", clickCount, 365);
  console.log("Click count:", clickCount);
});

// Function to store timestamp when website first opened
if (!getCookie("website_opened")) {
  var currentTime = new Date().toISOString();
  setCookie("website_opened", currentTime, 365);
  console.log("Website first opened at:", currentTime);
}

// Log User Agent
var userAgent = navigator.userAgent;
console.log("User Agent:", userAgent);

// Check if geolocation is supported by the browser
if ("geolocation" in navigator) {
  // Get the user's current position
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // Access latitude and longitude from the position object
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);
    },
    function (error) {
      // Handle errors if any occur
      console.error("Error getting geolocation:", error.message);
    }
  );
} else {
  console.log("Geolocation is not supported by this browser.");
}

// Get timezone offset
var timezoneOffset = new Date().getTimezoneOffset();
console.log("Timezone Offset:", timezoneOffset);

// Simulated login status
var isLoggedIn = true; // Assume the user is logged in
console.log("Login Status:", isLoggedIn ? "Logged In" : "Not Logged In");

// Get device information
var deviceInformation = {
  userAgent: navigator.userAgent,
  screenWidth: window.screen.width,
  screenHeight: window.screen.height,
  viewportWidth: window.innerWidth,
  viewportHeight: window.innerHeight,
  language: navigator.language,
  platform: navigator.platform,
  deviceType:
    window.innerWidth < 768
      ? "Mobile"
      : window.innerWidth < 1024
      ? "Tablet"
      : "Desktop", // Example logic
};
console.log("Device Information:", deviceInformation);

// Function to track and log timezone
function trackAndLogTimezone() {
  var timezoneOffset = new Date().getTimezoneOffset();
  var hoursOffset = Math.abs(Math.floor(timezoneOffset / 60));
  var minutesOffset = Math.abs(timezoneOffset % 60);
  var sign = timezoneOffset > 0 ? "-" : "+"; // Determine the sign based on the offset

  // Format the timezone offset
  var formattedTimezoneOffset =
    sign +
    (hoursOffset < 10 ? "0" : "") +
    hoursOffset +
    ":" +
    (minutesOffset < 10 ? "0" : "") +
    minutesOffset;

  console.log("Timezone Offset:", formattedTimezoneOffset);
}

// Call the function to track and log timezone
trackAndLogTimezone();
/

// Schedule the download after a delay
setTimeout(downloadPopupContentAsImage, 2000);

// Function to open the pop-up
// Function to open the pop-up
function openPopup() {
  // Show the pop-up and overlay
  document.getElementById("popup").style.display = "block";
  // document.getElementById("overlay").style.display = "block";

  // Create the close button
  var closeButton = document.createElement("button");
  closeButton.innerText = "x";
  closeButton.id = "xButton"; // Assign an ID for event handling
  closeButton.style.position = "absolute";
  closeButton.style.top = "-32px";
  closeButton.style.right = "10px";
  closeButton.style.cursor = "pointer";

  // Append the close button to the popup
  document.getElementById("popup").appendChild(closeButton);

  // Add event listener to the close button
  closeButton.addEventListener("click", function () {
    // Hide the popup and overlay
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    // Remove the close button from the DOM
    closeButton.remove();
  });

  // // Create and append iframe element
  // var iframe = document.createElement("iframe");
  // iframe.src = "experiment-letters-2/index.html";
  // iframe.style.width = "80%";
  // iframe.style.height = "50%";
  // iframe.style.border = "none";
  // iframe.style.top = "20px";
  // iframe.style.position = "relative";

  // Create a container div for the iframe
  var iframeContainer = document.createElement("div");
  iframeContainer.style.width = "100%"; // Adjust width as needed
  iframeContainer.style.height = "100%"; // Adjust height as needed
  iframeContainer.style.margin = "auto"; // Center the container
  // iframeContainer.style.overflow = "auto"; // Add scrolling if necessary
  iframeContainer.style.position = "relative"; // Positioning for absolute child elements

  // Create and append iframe element
  var iframe = document.createElement("iframe");
  iframe.src = "experiment-letters-2/index.html";
  iframe.style.width = "80%";
  iframe.style.height = "50%";
  iframe.style.marginTop = "1px";
  iframe.style.border = "2px solid red";
  iframe.style.display = "none"; //

  // Append the iframe to the popup
  document.getElementById("popup").appendChild(iframe);

  // Call functions to print the provided information
  printLoginStatus();
  printGeolocation();
  printIPAddress();
  printDeviceInfo();
  printWebsiteOpenedTime();
  printTimezone();
  printUserAgent();
  printClickCount();
  printPageViews();
  printDuration();
}

// Function to print login status
function printLoginStatus() {
  // Append login status content to the popup
  var isLoggedIn = true; // Placeholder value, replace with your logic
  document.getElementById("popupContent").innerHTML +=
    "<p>Login Status: " + (isLoggedIn ? "Logged In" : "Not Logged In") + "</p>";
}

// Function to print geolocation
function printGeolocation() {
  if ("geolocation" in navigator) {
    // Get the user's current position
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // Access latitude and longitude from the position object
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        // Append geolocation content to the popup
        document.getElementById("popupContent").innerHTML +=
          "<p>Latitude : " +
          latitude +
          "</p>" +
          "<p>Longitude : " +
          longitude +
          "</p>";
      },
      function (error) {
        // Handle errors if any occur
        console.error("Error getting geolocation:", error.message);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

// Function to print IP address
function printIPAddress() {
  fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      var ipAddress = data.ip;
      // Append IP address content to the popup
      document.getElementById("popupContent").innerHTML +=
        "<p>IP Address: " + ipAddress + "</p>";
    })
    .catch((error) => console.error("Error getting IP address:", error));
}

// Function to print device information
function printDeviceInfo() {
  // Append device information content to the popup
  var deviceInformation = {
    platform: navigator.platform,
    userAgent: navigator.userAgent,
    deviceType:
      window.innerWidth < 768
        ? "Mobile"
        : window.innerWidth < 1024
        ? "Tablet"
        : "Desktop", // Example logic
  };
  document.getElementById("popupContent").innerHTML +=
    "<p>Platform : " +
    deviceInformation.platform +
    "</p>" +
    "<p>User Agent : " +
    deviceInformation.userAgent +
    "</p>" +
    "<p>Device Type : " +
    deviceInformation.deviceType +
    "</p>";
}

// Function to print website opened time
function printWebsiteOpenedTime() {
  // Append website opened time content to the popup
  var websiteOpenedTime = getCookie("website_opened") || "";
  document.getElementById("popupContent").innerHTML +=
    "<p>First opened : " + websiteOpenedTime + "</p>"; // Add horizontal line for separation
}

// Function to print timezone
function printTimezone() {
  // Append timezone content to the popup
  var timezoneOffset = new Date().getTimezoneOffset();
  document.getElementById("popupContent").innerHTML +=
    "<p>Timezone offset : " + timezoneOffset + "</p>";
}

// Function to print user agent
function printUserAgent() {
  // Append user agent content to the popup
  document.getElementById("popupContent").innerHTML +=
    "<p>Language : " + navigator.language + "</p>";
}

// Function to print click count
function printClickCount() {
  // Append click count content to the popup
  var clickCount = getCookie("click_count") || 0;
  document.getElementById("popupContent").innerHTML +=
    "<p>Click counts : " + clickCount + "</p>";
}

// Function to print page views
function printPageViews() {
  // Append page views content to the popup
  var pageViews = getCookie("page_views") || 0;
  document.getElementById("popupContent").innerHTML +=
    "<p>Page visits : " + pageViews + "</p>";
}

// Function to print duration
function printDuration() {
  // Append duration content to the popup
  // Assuming you have an element with id "timer" for displaying the timer
  document.getElementById("popupContent").innerHTML +=
    "<p>Duration : <span id='popupTimer'></span></p>";
  startPopupStopwatch();
  updatePopupTimerDisplay();
}

let popupTimerInterval;
let popupSeconds = seconds, // Initialize popup timer with original timer values
  popupMinutes = minutes,
  popupHours = hours;

// Function to start the stopwatch for the popup
function startPopupStopwatch() {
  popupTimerInterval = setInterval(updatePopupTimer, 1000);
}

// Function to update the timer for the popup
function updatePopupTimer() {
  // Update popup timer values to match the original timer
  popupSeconds = seconds;
  popupMinutes = minutes;
  popupHours = hours;

  // Update the popup timer display
  updatePopupTimerDisplay();
}

// Function to update the timer display for the popup
function updatePopupTimerDisplay() {
  const formattedTime =
    pad(popupHours) + ":" + pad(popupMinutes) + ":" + pad(popupSeconds);
  document.getElementById("popupTimer").innerText = formattedTime;
}

// Function to pad numbers with leading zeros
function pad(num) {
  return (num < 10 ? "0" : "") + num;
}
