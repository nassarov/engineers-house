// select landing page
let landing = document.querySelector(".landing-page");
let images = ["img-0.jpg", "img-1.jpg", "img-2.jpg", "img-3.jpg"];
// setInterval(() => {
//   let rand = Math.floor(Math.random() * images.length);
//   landing.style.backgroundImage = 'url("../imgs/' + images[rand] + '")';
// }, 3000);
let img = 0;
setInterval(() => {
  landing.style.backgroundImage = 'url("../imgs/img-' + img + '.jpg")';
  img++;
  if (img === 3) img = 0;
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

  // For header fixing
  let header = document.querySelector("header");
  let info = document.querySelector(".info");
  let infoOffset = info.offsetTop;
  let logo = document.querySelector(".logo img");
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
  if (windowScrollTop >= infoOffset) {
    header.classList.remove("header-area");
    header.classList.add("fixed-header");
    logo.setAttribute("src", "/imgs/EngHousebgB.png");
  } else if (windowScrollTop < infoOffset) {
    header.classList.add("header-area");
    header.classList.remove("fixed-header");
    logo.setAttribute("src", "/imgs/EngHousebgW.png");
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
// Function to move to the prev slide
function prevSlide() {
  currentIndex = currentIndex - 1;
  if (currentIndex < 0) {
    currentIndex = 0;
  }
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
let autoSlideInterval;

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 1500);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Auto-slide every 3 seconds
startAutoSlide();

const expand = document.createElement("div");
const prjImg = document.querySelectorAll(".prj .image");
const expandIcon = document.createElement("i");
const overlay = document.querySelector(".pop-up-overlay");
const overlayContent = document.querySelector(".popup-content");
const overlayImage = document.querySelector(".popup-content img");

// Pause auto-slide when user touches projects and continue when user removes hand or mouse
expand.addEventListener("mouseover", () => {
  stopAutoSlide();
});

expand.addEventListener("mouseout", () => {
  startAutoSlide();
});

// Allow user to scroll left and right
slides.addEventListener("wheel", (e) => {
  stopAutoSlide();
  e.preventDefault();
  if (e.deltaY > 0) {
    nextSlide();
  } else {
    prevSlide();
  }
  startAutoSlide();
});

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

prjImg.forEach((ele) => {
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
const close = document.createElement("span");
const button = document.createTextNode("X");
expand.addEventListener("click", (e) => {
  overlay.classList.remove("hidden");
  close.appendChild(button);
  close.classList.add("close");
  overlay.appendChild(close);
  overlayImage.src = e.target.closest(".prj .image").querySelector("img").src;
});
close.addEventListener("click", () => {
  overlay.classList.add("hidden");
  overlay.removeChild(close);
});
overlay.addEventListener("click", () => {
  overlay.classList.add("hidden");
  overlay.removeChild(close);
});
// Start Contact
let address = document.querySelector(".address");
address.addEventListener("click", () => {
  let link =
    "https://www.google.com/maps/place/Engineers'+House/@33.854379,36.01459,15z/data=!4m6!3m5!1s0x1518b70cd969778f:0x6516608b74e3123d!8m2!3d33.8543786!4d36.0145903!16s%2Fg%2F11rk5dstf7?hl=en&entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D";
  window.open(link, "_blank");
});

let phoneNums = document.querySelectorAll(".phn");
phoneNums.forEach((phone) => {
  phone.addEventListener("click", (e) => {
    window.location.href = `tel:${e.target.innerHTML}`;
  });
});
let email = document.querySelector(".email");
email.addEventListener("click", () => {
  window.location.href = `mailto:${email.innerHTML}`;
});
// End Contact
// menu
let toggleMenu = document.querySelector(".toggle-menu");
let links = document.querySelector(".menu");

toggleMenu.addEventListener("click", () => {
  links.classList.toggle("open");
  toggleMenu.classList.toggle("open");
  if (links.style.maxHeight) {
    links.style.maxHeight = null;
  } else {
    links.style.maxHeight = links.scrollHeight + "px";
  }
});

// menu links scrollInto
document.querySelectorAll(".scrl-btn").forEach((ele) => {
  ele.addEventListener("click", (e) => {
    document.querySelectorAll(".scrl-btn.active").forEach((activeEle) => {
      activeEle.classList.remove("active");
    });
    e.target.classList.add("active");
    let section = e.target.dataset.section;
    let target = document.querySelector(section);
    if (target) {
      let offset = 50;
      let position = target.offsetTop - offset;

      window.scrollTo({ behavior: "smooth", top: position });
    }
  });
});

// On scroll to section active corres. li a
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll(".menu li a");
// console.log(navLinks[0].dataset.section);
window.addEventListener("scroll", () => {
  let scrollPosition = window.scrollY + 100;
  sections.forEach((sec) => {
    let secTop = sec.offsetTop;
    let secH = sec.offsetHeight;
    let secSelector = `.${sec.classList[0]}`;

    if (scrollPosition >= secTop && scrollPosition < secTop + secH) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.dataset.section === secSelector) {
          link.classList.add("active");
        }
      });
    }
  });
});
