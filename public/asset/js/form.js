"use strict";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const btnSend = $(".btn-send");
const formId = $("input[name='id']");
const form = $("form");
const formTitle = $("input[name='title-form']");

(() => {
	localStorage.removeItem("form");
	if (localStorage.getItem("user-form")) {
		$("form").innerHTML = localStorage.getItem("user-form");
	}
	[...$$(".btn--remove-asw-field")].forEach((btn) => btn.remove());
	[...$$(".btn--add-radioItem")].forEach((btn) => btn.remove());
	[
		...$$(
			"input[name='questions'], input[name='title-form'], input[name='title-ques'], input[name='ques-des'], input[name='form-des'], input[id='input-descript']"
		),
	].forEach((e) => {
		e.readOnly = true;
		e.style.cursor = "default";
	});
})();

const saveLocal = () => {
	localStorage.setItem("user-form", $("form").innerHTML);
	setInterval(() => {
		if ($("input:focus")) {
			localStorage.setItem("user-form", $("form").innerHTML);
		}
	}, 1000);
};

saveLocal();

const sendData = () => {
	const guessData = {
		formName: formTitle.value,
		formId: formId.value,
		data: form.innerHTML.replaceAll(/[\n\t\s]{2,}/g, ""),
	};
	// for (let i = 0; i < containers.length; i++) {
	// 	const container = containers[i];
	// 	const answerType = container
	// 		.querySelector("input.ques")
	// 		.getAttribute("answerType");
	// 	const question = container.querySelector(".ques").value;
	// 	let answers;
	// 	switch (answerType) {
	// 		case "text": {
	// 			answers = [...container.querySelectorAll(".ans")].map(
	// 				(answers) => answers.value
	// 			);
	// 			break;
	// 		}
	// 		case "radio": {
	// 			answers = [
	// 				container.querySelector(".ans:checked").nextElementSibling.value,
	// 			];
	// 			break;
	// 		}
	// 		case "checkbox": {
	// 			answers = [...container.querySelectorAll(".ans:checked")].map(
	// 				(answer) => answer.nextElementSibling.value
	// 			);
	// 			break;
	// 		}
	// 	}
	// 	guessData.data[i] = {
	// 		question,
	// 		answerType,
	// 		answers,
	// 	};
	// }
	fetch("/form", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(guessData),
	}).catch((err) => console.log(err));
};

btnSend.addEventListener("click", sendData);
document.addEventListener("click", saveLocal);
