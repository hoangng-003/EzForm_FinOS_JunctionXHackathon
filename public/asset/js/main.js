"use strict";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

/*---------Hide/Show About us container -------------*/
(() => {
	const abouBtn = document.querySelector(".js-about-us"),
		closeAbtSection = document.querySelector(".close-aboutContainer"),
		aboutMenu = document.querySelector(".about-us-section");

	abouBtn.addEventListener("click", showAboutUs);
	closeAbtSection.addEventListener("click", hideAboutUs);

	function showAboutUs() {
		aboutMenu.classList.add("show");
		bodyStopScrolling();
	}

	function hideAboutUs() {
		aboutMenu.classList.remove("show");
		bodyStopScrolling();
	}
})();

function bodyStopScrolling() {
	document.body.classList.toggle("stop-scrolling");
}

// scroll into view
(() => {
	[...$$(".scroll")].forEach((item) => {
		item.addEventListener("click", (e) => {
			[...$$(".scroll-view")]
				.find((section) => section.id === e.target.id.replace("btn-", ""))
				.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
		});
	});
})();
/*-------------------------------------------------
Show and hide header shadow when scroll up and down
--------------------------------------------------*/
