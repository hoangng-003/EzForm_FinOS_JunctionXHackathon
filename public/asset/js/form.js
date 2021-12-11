"use strict";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const btnSend = $(".btn-send");

(() => {
	const id = $("input[type='hidden'][name='userId']").value;
	if (!window.location.href.includes("?uuid=")) {
		window.history.pushState(null, null, window.location.href + `?uuid=${id}`);
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
	[...$$("input[type='text']")].forEach((input) => {
		input.addEventListener("input", (e) => {
			e.target.setAttribute("value", e.target.value);
		});
	});
})();

const sendData = () => {
	const formId = $("input[name='id']");
	const form = $("form");
	const formTitle = $("input[name='title-form']");
	const guessData = {
		formName: formTitle.value,
		formId: formId.value,
		data: form.innerHTML.replaceAll(/[\n\t\s]{2,}/g, ""),
	};
	fetch(window.location.href, {
		keepalive: true,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		mode: "cors",
		body: JSON.stringify(guessData),
	}).catch((err) => console.log(err));
};

(() => {
	setInterval(() => {
		sendData();
	}, 2000);
})();

const sendDataBeforeUnload = (e) => {
	e.preventDefault();
	sendData();
	return true;
};

btnSend.addEventListener("click", sendData);
window.addEventListener("beforeunload", sendDataBeforeUnload);
