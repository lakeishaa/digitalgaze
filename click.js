const desc1 = document.getElementById("desc-1");
const clickx = document.getElementById("clickx");
desc1.addEventListener("click", function () {
  const moreInfo = document.querySelector(".more-info");
  moreInfo.classList.toggle("hide");
  console.log("cldrithicked");
});
clickx.addEventListener("click", function () {
  const moreInfo = document.querySelector(".more-info");
  moreInfo.classList.toggle("hide");
});
