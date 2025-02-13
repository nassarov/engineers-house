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
            data.innerHTML = `${count}+`;
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

// projects
const buttonsWrapper = document.querySelector(".map");
const map1 = document.querySelector(".map .first");
const map2 = document.querySelector(".map .second");
const slides = document.querySelector(".projects-box");
const projects = document.querySelectorAll(".prj");
const totalSlides = projects.length;
let currentIndex = 0;

// Function to move to the next slide
function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides; // Loop back to the first slide
  // console.log(currentIndex);
  if (currentIndex >= totalSlides / 2) {
    map1.classList.remove("active");
    map2.classList.add("active");
  } else {
    map2.classList.remove("active");
    map1.classList.add("active");
  }
  updateSlider();
}

// Function to update the slider position
function updateSlider() {
  const translateValue = (-currentIndex / 1.75) * 20;
  slides.style.transform = `translateX(${translateValue}%)`;
}

// Auto-slide every 3 seconds
setInterval(nextSlide, 3000);
buttonsWrapper.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    Array.from(buttonsWrapper.children).forEach((item) =>
      item.classList.remove("active")
    );
    if (e.target.classList.contains("first")) {
      slides.style.transform = "translateX(-0%)";
      e.target.classList.add("active");
      currentIndex = -1;
    } else if (e.target.classList.contains("second")) {
      slides.style.transform = "translateX(-33%)";
      e.target.classList.add("active");
      currentIndex = totalSlides / 2;
    }
  }
});

const prjImg = document.querySelectorAll(".prj .image");

prjImg.forEach((ele) => {
  const expand = document.createElement("div");
  const expandIcon = document.createElement("i");
  expandIcon.classList.add("fa-solid", "fa-expand", "expand-icon");
  expand.appendChild(expandIcon);
  ele.addEventListener("mouseover", () => {
    expand.classList.add("expand");
    ele.appendChild(expand);
  });
  ele.addEventListener("mouseleave", () => {
    ele.removeChild(expand);
  });
});
