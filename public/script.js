"use strict";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const ques = $("#ques");
const options = [...$$(".options")];
const btn = $("#btn");
const container = $("#container");
const defaultContainer = $("#default-container");
const form = $("form");
const formTitle = $("input[name='title']");

const showOption = (e) => {
	e.target.firstElementChild.classList.add("show");
};

const chooseOption = (e) => {
	e.stopPropagation();
	$(".show").classList.remove("show");
	const type = e.target.innerText;
	const currentAnswerContainer = [...$$(".answer-container")].find(
		(answerContainer) =>
			answerContainer.id.replace("answer-container-", "") ===
			e.target.parentElement.parentElement.id.replace("menu-", "")
	);
	const currentContainer = [...$$(".container")].find(
		(container) =>
			container.id.replace("container-", "") ===
			currentAnswerContainer.id.replace("answer-container-", "")
	);
	const currentAnswerContainerSelector =
		currentAnswerContainer.querySelectorAll.bind(currentAnswerContainer);
	switch (type) {
		case "Text": {
			currentContainer
				.querySelector("input")
				.setAttribute("answerType", "text");
			[...currentAnswerContainerSelector(`input`)].forEach((input) => {
				if (input.getAttribute("type") !== "text") {
					input.remove();
				} else {
					input.setAttribute("type", "text");
				}
			});
			break;
		}
		case "Checkbox": {
			currentContainer
				.querySelector("input")
				.setAttribute("answerType", "checkbox");
			const inputNumbers = [
				...currentAnswerContainerSelector("input[type='text']"),
			];
			for (let i = 0; i < inputNumbers.length * 2; ++i) {
				let inputs = [...currentAnswerContainerSelector("input")];
				if (
					inputs[i].getAttribute("type") !== "checkbox" &&
					inputs[i].getAttribute("type") !== "radio" &&
					i % 2 == 0
				) {
					inputs[i].setAttribute("type", "checkbox");
					inputs[i].removeAttribute("name");
					const newInput = document.createElement("input");
					newInput.setAttribute("name", "answer");
					newInput.setAttribute("type", "text");
					newInput.placeholder = "Answer";
					newInput.value = inputs[i].value !== "on" ? inputs[i].value : "";
					inputs[i].parentElement.insertBefore(newInput, inputs[i].nextSibling);
				} else if (inputs[i].getAttribute("type") === "radio") {
					inputs[i].setAttribute("type", "checkbox");
				}
			}
			break;
		}
		case "Radio": {
			currentContainer
				.querySelector("input")
				.setAttribute("answerType", "radio");
			const inputNumbers = [
				...currentAnswerContainerSelector("input[type='text']"),
			];
			for (let i = 0; i < inputNumbers.length * 2; ++i) {
				let inputs = [...currentAnswerContainerSelector("input")];
				if (
					inputs[i].getAttribute("type") !== "radio" &&
					inputs[i].getAttribute("type") !== "checkbox" &&
					i % 2 == 0
				) {
					inputs[i].setAttribute("type", "radio");
					inputs[i].removeAttribute("name");
					const newInput = document.createElement("input");
					newInput.setAttribute("name", "answer");
					newInput.setAttribute("type", "text");
					newInput.placeholder = "Answer";
					newInput.value = inputs[i].value !== "on" ? inputs[i].value : "";
					inputs[i].parentElement.insertBefore(newInput, inputs[i].nextSibling);
				} else if (inputs[i].getAttribute("type") === "checkbox") {
					inputs[i].setAttribute("type", "radio");
				}
			}
			break;
		}
	}
	reload();
};

const createNewAnswerField = (e) => {
	const newAnswerInputContainer = e.target.parentElement.cloneNode(true);
	const currentAnswerContainer = [...$$(".answer-container")].find(
		(currentAnswerContainer) =>
			currentAnswerContainer.id.replace("answer-container-", "") ===
			e.target.parentElement.id.replace("answer-input-container-", "")
	);
	currentAnswerContainer.appendChild(newAnswerInputContainer);
	reload();
};

const deleteAnswerField = (e) => {
	e.target.parentElement.remove();
	reload();
};

const reload = () => {
	[...$$(".menu")].forEach((menu) => {
		menu.addEventListener("click", showOption);
	});
	[...$$(".options")].forEach((option) => {
		option.addEventListener("click", chooseOption);
	});
	[...$$(".add-answer-field")].forEach((addAnswerField) => {
		addAnswerField.addEventListener("click", createNewAnswerField);
	});
	[...$$(".remove-answer-field")].forEach((removeAnswerField) => {
		removeAnswerField.addEventListener("click", deleteAnswerField);
	});
	[...$$("input[type='radio']")].forEach((radio) => {
		radio.addEventListener("click", handleRadioChecked);
	});
};

const createNewForm = () => {
	const newContainer = document.createElement("div");
	const containerIds = [...$$(".container")]
		.map((container) => parseInt(container.id.replace("container-", "")))
		.sort();
	let i = 1;
	while (containerIds.includes(i)) {
		i++;
	}
	newContainer.setAttribute("id", `container-${i}`);
	newContainer.classList.add("container");
	newContainer.innerHTML = `
	<div class="config">
		<input
			type="text"
			name="question"
			class="ques"
			answerType="text" 
			placeholder="Type your fucking question"
		/>
		<div class="menu type" id="menu-${i}">
			Text
			<ul class="type lists">
				<li class="options">Text</li>
				<li class="options">Radio</li>
				<li class="options">Checkbox</li>
			</ul>
		</div>
	</div>
	<div class="form-answer" id="form-answer-${i}">
		<div class="answer-container" id="answer-container-${i}">
			<div class="answer-input-container" id="answer-input-container-${i}">
				<input
					type="text"
					name="answer"
					class="ans"
					placeholder="Type your fucking answer"
				/>
				<button type="button" class="add-answer-field">Add</button>
				<button type="button" class="remove-answer-field">Remove</button>
			</div>
		</div>
	</div>
	`;
	container.appendChild(newContainer);
	reload();
};

const sendData = () => {
	const containers = [...$$(".container")];
	const formData = {
		title: formTitle.value,
		data: [],
	};
	for (let i = 0; i < containers.length; i++) {
		const container = containers[i];
		const answerType = container
			.querySelector("input.ques")
			.getAttribute("answerType");
		const config = container.querySelector(".config");
		const question = config.querySelector(".ques").value;
		let answers;
		switch (answerType) {
			case "text": {
				answers = [...container.querySelectorAll(".ans")].map(
					(answers) => answers.value
				);
				break;
			}
			case "radio": {
				answers = [...container.querySelectorAll(".ans")].map(
					(answer) => answer.nextElementSibling.value
				);
				break;
			}
			case "checkbox": {
				answers = [...container.querySelectorAll(".ans")].map(
					(answer) => answer.nextElementSibling.value
				);
				break;
			}
		}
		formData.data[i] = {
			question,
			answerType,
			answers,
		};
	}
	fetch("/createForm", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	})
		.then((res) => res.json())
		.then((data) => (window.location.href = data.redirect))
		.catch((err) => console.log(err));
};

const handleRadioChecked = (e) => {
	e.target.parentElement.parentElement
		.querySelectorAll("input[type='radio']")
		.forEach((radio) => {
			radio.checked = false;
		});
	e.target.checked = true;
};

reload();

btn.addEventListener("click", createNewForm);
form.addEventListener("submit", (e) => {
	e.preventDefault();
	sendData();
});
