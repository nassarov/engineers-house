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
