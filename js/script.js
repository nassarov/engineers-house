// select landing page
let landing = document.querySelector(".landing-page");
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
  // check for active class
  document.querySelectorAll(".colors-list li").forEach((ele) => {
    ele.classList.remove("active");
    // add active class to ele of color in storage
    if (ele.dataset.color === storageColor) {
      ele.classList.add("active");
    }
  });
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

    // remove active class from all children by going back to parent the to children
    e.target.parentElement.querySelectorAll(".active").forEach((ele) => {
      ele.classList.remove("active");
    });
    // Add active on target
    e.target.classList.add("active");
  });
});

// Select data from about
let about = document.querySelector(".about");
let allData = document.querySelectorAll(".data-card span");
let isDataUpdated = false;

window.onscroll = () => {
  // Offset of section
  let aboutOffset = about.offsetTop;

  // offset outer height
  let aboutOuterH = about.offsetHeight;

  // Window height
  let windowH = this.innerHeight;

  // window scroll top
  let windowScrollTop = window.scrollY;

  if (windowScrollTop > aboutOffset + aboutOuterH - windowH && !isDataUpdated) {
    allData.forEach((data) => {
      if (data.dataset.n) {
        let target = parseInt(data.dataset.n, 10);
        let count = 0;
        let interval = setInterval(() => {
          if (count <= target) {
            data.innerHTML = count;
            count++;
          } else {
            clearInterval(interval);
          }
        }, 5); // Adjust the interval time as needed
      }
    });
    isDataUpdated = true;
  }
};
