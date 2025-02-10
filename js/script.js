// select landing page
let landing = document.querySelector(".landing-page");
console.log(landing);
let images = ["img-0.jpg", "img-2.jpg", "img-3.jpg", "img-4.jpg"];
// setInterval(() => {
//   let rand = Math.floor(Math.random() * images.length);
//   landing.style.backgroundImage = 'url("../imgs/' + images[rand] + '")';
// }, 3000);
let img = 0;
setInterval(() => {
  landing.style.backgroundImage = 'url("../imgs/img-' + img + '.jpg")';
  img++;
  if (img === 4) img = 0;
}, 3000);

// toggle option button to open settings
let setting = document.querySelector(".settings-box");
let gear = document.querySelector(".toggle-settings");
let settingButton = document.querySelector(".fa-gear");
gear.addEventListener("click", () => {
  settingButton.classList.toggle("fa-spin");
  setting.classList.toggle("open");
});

// check for color in localStorage
let storageColor = localStorage.getItem("theme-color");

if (storageColor !== null) {
  document.documentElement.style.setProperty(
    "--secondary",
    localStorage.getItem("theme-color")
  );
}

// switching by options the color of theme
const colors = document.querySelectorAll(".colors-list li");
// looping on list items
colors.forEach((li) => {
  // select color on click on
  li.addEventListener("click", (e) => {
    //  Set color on root
    document.documentElement.style.setProperty(
      "--secondary",
      e.target.dataset.color
    );
    // Setting the color in localStorage
    localStorage.setItem("theme-color", e.target.dataset.color);
  });
});
