"use strict";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

[...$$("input")].forEach((input) => {
	input.readOnly = true;
});
