import './style.css'

import lottie from 'lottie-web';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

document.addEventListener('DOMContentLoaded', () => {
  const animationContainer = document.getElementById('lottie-container');
  const animationData = './animations/camera-animation.json'; // Update the path to your Lottie JSON file

  // Load the animation
  lottie.loadAnimation({
    container: animationContainer!,
    renderer: 'svg', 
    loop: true,
    autoplay: true,
    path: animationData,
  });
});

const header = document.querySelector('.header');
let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
  const currentScrollPosition = window.scrollY;

  if (currentScrollPosition > lastScrollPosition) {
    // Scrolling down, hide the header
    header?.classList.add('hidden');
  } else {
    // Scrolling up, show the header
    header?.classList.remove('hidden');
  }

  lastScrollPosition = currentScrollPosition;
});


if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
} else {
  window.onbeforeunload = function () {
      window.scrollTo(0, 0);
  }
}



// Animation for Gallery Page
gsap.registerPlugin(ScrollTrigger);

const elements: NodeListOf<HTMLElement> = document.querySelectorAll(".revealUp");

elements.forEach(function (elem) {
  ScrollTrigger.create({
    trigger: elem,
    start: "top 80%",
    end: "bottom 20%",
    onEnter: function () {
      gsap.fromTo(
        elem,
        { y: 100, autoAlpha: 0 },
        {
          duration: 1.25,
          y: 0,
          autoAlpha: 1,
          ease: "back",
          overwrite: "auto"
        }
      );
    },
    onLeave: function () {
      gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: "auto" });
    },
    onEnterBack: function () {
      gsap.fromTo(
        elem,
        { y: -100, autoAlpha: 0 },
        {
          duration: 1.25,
          y: 0,
          autoAlpha: 1,
          ease: "back",
          overwrite: "auto"
        }
      );
    },
    onLeaveBack: function () {
      gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: "auto" });
    }
  });
});