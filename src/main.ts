/** @format */

import "./style.css";

import lottie from "lottie-web";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

document.addEventListener("DOMContentLoaded", () => {
	const mainAnimationPath = "./animations/camera-animation.json";

	// Load the main Lottie animation asynchronously
	const mainContainer = document.getElementById(
		"lottie-container"
	) as HTMLElement;
	lottie.loadAnimation({
		container: mainContainer,
		path: mainAnimationPath,
		renderer: "svg", // Change 'svg' to 'canvas' if you prefer
		autoplay: true,
		loop: true,
		rendererSettings: {
			progressiveLoad: true, // This allows the main animation to load progressively
		},
	});
});

const header = document.querySelector(".header");
let lastScrollPosition = 0;

window.addEventListener("scroll", () => {
	const currentScrollPosition = window.scrollY;

	if (currentScrollPosition > lastScrollPosition) {
		// Scrolling down, hide the header
		header?.classList.add("hidden");
	} else {
		// Scrolling up, show the header
		header?.classList.remove("hidden");
	}

	lastScrollPosition = currentScrollPosition;
});

if (history.scrollRestoration) {
	history.scrollRestoration = "manual";
} else {
	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	};
}

// Animation for Gallery Page
gsap.registerPlugin(ScrollTrigger);

const elements: NodeListOf<HTMLElement> =
	document.querySelectorAll(".revealUp");

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
					overwrite: "auto",
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
					overwrite: "auto",
				}
			);
		},
		onLeaveBack: function () {
			gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: "auto" });
		},
	});
});

const showMoreButton = document.getElementById("showMoreButton");
const hiddenImages: NodeListOf<HTMLImageElement> =
	document.querySelectorAll(".hidden");

if (showMoreButton) {
	showMoreButton.addEventListener("click", function () {
		hiddenImages.forEach(function (img) {
			img.classList.remove("hidden");
			gsap.fromTo(
				img,
				{ y: -100, autoAlpha: 0 },
				{
					duration: 1.25,
					y: 0,
					autoAlpha: 1,
					ease: "back",
					overwrite: "auto",
					immediateRender: false,
				}
			);
		});

		// Hide the "Show More" button once all images are shown
		if (showMoreButton) {
			showMoreButton.style.display = "none";
		}
	});
}
