let video;
let gridSizeSlider;
let invertSlider;
let letters = ["&", "g", "a", "z", "e", "*", "#"];
// let letters = [ 'g', 'a', 'z', 'e'];
new p5((p) => {
  p.setup = function () {
    let canvas = p.createCanvas(303, 200);
    canvas.parent("canvasContainer");

    gridSizeSlider = p.createSlider(1, 10, 5);
    gridSizeSlider.position(10, -200);

    invertSlider = p.createSlider(0, 1, 0);
    invertSlider.position(200, -200);

    video = p.createCapture(p.VIDEO);
    video.size(p.width, p.height);
    video.hide();
  };

  p.draw = function () {
    p.background("#FFFFFF");

    let gridSize = gridSizeSlider.value();

    video.loadPixels();
    for (let y = 0; y < video.height; y += gridSize) {
      for (let x = 0; x < video.width; x += gridSize) {
        let index = (y * video.width + x) * 4;
        let r = video.pixels[index];
        // let dia = map(r, 0, 255/2, gridSize, 2);
        let dia = p.map(r, 0, 255, gridSize, 1);

        let letter = letters[Math.floor(Math.random() * letters.length)];
        p.fill("#000000");
        p.stroke("#000000");
        // strokeWeight(1);
        p.textSize(dia);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(letter, x, y);
        p.text(letter, x + gridSize / 2, y + gridSize / 2);
      }
    }

    if (invertSlider.value() > 0) {
      p.filter(p.INVERT);
    }
  };
}, "circle");
