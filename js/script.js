// Variable declarations

const header = document.querySelector(".header");

const fullNavigation = document.querySelector(".navigation");
const navigation = document.querySelector(".nav");
const allSections = document.querySelectorAll(".section");

const btnAlt = document.querySelector(".btn--alt");
const btnScrollTo = document.querySelector(".btn--scroll-to");

const section1 = document.querySelector("#Why");

const accordionEl = document.querySelectorAll(".accordion");
const hiddenBoxEl = document.querySelector(".accordion-box");
const iconEl = document.querySelector(".accordion-title::after ");
const acc = document.getElementsByClassName("accordion");
let i;

// sticky navigation
const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};

const obsOptions = {
  root: null,
  threshold: [0, 0.2],
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);

const navHeight = fullNavigation.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    fullNavigation.classList.add("sticky");
   
  } else fullNavigation.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Button scrolling
btnScrollTo.addEventListener("click", function (e) {
  section1.scrollIntoView({ behavior: "smooth" });
});


// Page navigation
document
  .querySelector(".nav-items-list")
  .addEventListener("click", function (e) {
    e.preventDefault();

    // Matching strategy
    if (e.target.classList.contains("nav-items")) {
      const id = e.target.getAttribute("href");

      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  });



// Menu fading animation
const handleHover = function (e) {
  if (e.target.classList.contains("nav-items")) {
    const link = e.target;
    const siblings = link
      .closest(".nav-items-list")
      .querySelectorAll(".nav-items");

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
  }
};

navigation.addEventListener("mouseover", handleHover.bind(0.5));
navigation.addEventListener("mouseout", handleHover.bind(1));

// Reveal elements on Scroll
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
};

// creating the observer constructor and the conditions
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, // viewport
  threshold: 0.15,
});

// setting the initial state through intersectionobserver()
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});




// Carousel Component
function scrollEv(leftArrow, rightArrow, carousel) {
  if (carousel.scrollLeft <= 0) {
    leftArrow.classList.add("arrow-inactive");
  } else {
    leftArrow.classList.remove("arrow-inactive");
  }
  if (carousel.scrollLeft >= carousel.scrollWidth - carousel.offsetWidth - 1) {
    rightArrow.classList.add("arrow-inactive");
  } else {
    rightArrow.classList.remove("arrow-inactive");
  }
}
function clickLeftArrow(carousel, rectList) {
  let shiftScroll;
  for (let i = 0; i < rectList.length; i++) {
    if (carousel.scrollLeft > rectList[rectList.length - 1]) {
      shiftScroll = rectList[rectList.length - 1];
    } else if (
      carousel.scrollLeft > rectList[i] &&
      carousel.scrollLeft <= rectList[i + 1]
    ) {
      shiftScroll = rectList[i];
    }
  }
  carousel.scrollto({
    right: shiftScroll,
    behavior: "smooth",
  });
}
function clickRightArrow(carousel, rectList) {
  let shiftScroll;
  for (let i = 0; i < rectList.length; i++) {
    if (
      carousel.scrollLeft >= rectList[i] - 1 &&
      carousel.scrollLeft < rectList[i + 1]
    ) {
      shiftScroll = rectList[i + 1];
    }
  }
  carousel.scrollTo({
    left: shiftScroll,
    behavior: "smooth",
  });
}
function listRectCarousel(carouselNumber, carousels) {
  let divs = carousels[carouselNumber].getElementsByClassName("carousel-item");
  let rectList = [];
  let rectGauche = carousels[carouselNumber].getBoundingClientRect().left;
  for (let i = 0; i < divs.length; i++) {
    let rect = divs[i].getBoundingClientRect();
    rectList.push(rect.left - rectGauche);
  }
  for (let i = rectList.length - 1; i >= 0; i--) {
    rectList[i] = rectList[i] - rectList[0];
  }
  return rectList;
}

function autoSlidePosLeft(carouselNumber, carousels, leftArrows) {
  let rectList = listRectCarousel(carouselNumber, carousels);
  leftArrows[carouselNumber].addEventListener("click", () => {
    clickLeftArrow(carousels[carouselNumber], rectList);
  });
}
function autoSlidePosRight(carouselNumber, carousels, rightArrows) {
  let rectList = listRectCarousel(carouselNumber, carousels);
  rightArrows[carouselNumber].addEventListener("click", () => {
    clickRightArrow(carousels[carouselNumber], rectList);
  });
}
window.onload = () => {
  let leftArrows = document.getElementsByClassName("left-arrow");
  let rightArrows = document.getElementsByClassName("right-arrow");
  let carousels = document.getElementsByClassName("section-carousel");
  for (let i = 0; i < leftArrows.length; i++) {
    autoSlidePosLeft(i, carousels, leftArrows);
    window.onresize = () => {
      autoSlidePosLeft(i, carousels, leftArrows);
    };
  }
  for (let i = 0; i < rightArrows.length; i++) {
    autoSlidePosRight(i, carousels, rightArrows);
    window.onresize = () => {
      autoSlidePosRight(i, carousels, rightArrows);
    };
  }
  for (let i = 0; i < carousels.length; i++) {
    carousels[i].addEventListener("scroll", () => {
      scrollEv(leftArrows[i], rightArrows[i], carousels[i]);
    });
  }
  for (let i = 0; i < carousels.length; i++) {
    scrollEv(leftArrows[i], rightArrows[i], carousels[i]);
    window.onresize = () => {
      scrollEv(leftArrows[i], rightArrows[i], carousels[i]);
    };
  }
};

// accordion component
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    const panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
