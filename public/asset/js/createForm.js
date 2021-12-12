const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const sendDataBeforeUnload = (e) => {
	e.preventDefault();
	const formData = $("form").innerHTML.replaceAll(/[\n\t\s]{2,}/g, "");
	const formTitle = $("input[name='title-form']").value;
	fetch(window.location.href, {
		keepalive: true,
		mode: "cors",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ title: formTitle, form: formData, action: "save" }),
	}).catch((err) => console.log(err));
	return true;
};

const setUp = () => {
	window.addEventListener("beforeunload", sendDataBeforeUnload);
	fetch("/dashboard", {
		keepalive: true,
		mode: "cors",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ action: "update" }),
	}).catch((err) => console.log(err));
	[...$$("input")].forEach((input) => {
		input.addEventListener("input", (e) => {
			e.target.setAttribute("value", e.target.value);
		});
	});
};

(() => {
	$("input[name='title-form']").addEventListener("input", (e) => {
		$(".form-title > h3").innerText = e.target.value;
		setUp();
	});
})();

setUp();

const formQuestionBody = $("#form-question--body");

/*---Popup Question-section and Response-section*/
(() => {
	const quesSection = document.querySelector(".view--question"),
		formQuesBody = document.querySelector(".form-body--questions");
	const resSection = document.querySelector(".view--response"),
		formResBody = document.querySelector(".form-body-responses");

	quesSection.addEventListener("click", () => {
		if (!quesSection.classList.contains("active")) {
			quesSection.classList.add("active");
			resSection.classList.remove("active");

			formQuesBody.classList.add("show");
			formQuesBody.classList.remove("hide");
			formResBody.classList.add("hide");
			formResBody.classList.remove("show");
		}
	});

	resSection.addEventListener("click", () => {
		if (!resSection.classList.contains("active")) {
			resSection.classList.add("active");
			quesSection.classList.remove("active");

			formResBody.classList.add("show");
			formResBody.classList.remove("hide");
			formQuesBody.classList.add("hide");
			formQuesBody.classList.remove("show");
		}
	});
})();

/*-------------------
    Create Form
---------------------*/

/*---------------Send Form popup-----------*/
(() => {
	const btnSendForm = document.querySelector(".btn-send");
	const closeSendForm = document.querySelector(".sending-popup--close-btn");
	btnSendForm.addEventListener("click", () => {
		popupSendForm();
	});
	closeSendForm.addEventListener("click", () => {
		popupSendForm();
	});

	function popupSendForm() {
		document.querySelector(".form-sending-popup").classList.toggle("active");
	}

	/*---Copy input.value() when click btn-Copy to clipBoard---*/
	const inputLinkSend = document.querySelector(".link-sendForm");
	const id = $("input[type='hidden']").value;
	const url = window.location.href.split("/").slice(0, 3).join("/");
	inputLinkSend.setAttribute("value", `${url}/form/${id}`);
	const copyLinkSend = document.querySelector(".sending-popup--copyLink");
	copyLinkSend.addEventListener("click", () => {
		navigator.clipboard.writeText(inputLinkSend.value);
		copyLinkSend.innerText = "Copied!";
	});
})();

/*---------------Add and delete Personal-info group-----------*/
(() => {
	/*---Add group---*/
	const addPersonInfoGroup = document.querySelector(".add-personal-info");

	addPersonInfoGroup.addEventListener("click", () => {
		createPersonInfoGroup();
	});

	let i = 0;
	function createPersonInfoGroup() {
		PersonInfoGroup = document.createElement("div");

		PersonInfoGroup.classList.add("form-question--personal-info-group");
		PersonInfoGroup.setAttribute(
			"id",
			"form-question--personal-info-group-" + i
		);
		PersonInfoGroup.innerHTML = `
        <div class="row">
            <!-- name -->
            <div id="form-question--fullName-${i}" class="form-question--fullName w-50 form-control--container">
                <button type="button" id="btn--remove-fullName-${i}" class="btn--remove-fullName btn--remove-asw-field fas fa-trash-alt">
                </button>
                <button type="button" class="btn--require-asw-field btn--require-name fas fa-exclamation-circle" id="btn--require-name-${i}">
                </button>
                <input type="text" name="input-descript" id="input-descript" class="form-control--descript" value="Full name">
                <input type="text" name="user-fullName-${i}" id="user-fullName-${i}" class="form-control" required>
            </div>
            <!-- email -->
            <div id="form-question--email-${i}" class="form-question--email w-50 form-control--container">
                <button type="button" id="btn--remove-email-${i}" class="btn--remove-email btn--remove-asw-field fas fa-trash-alt">
                </button>
                <button type="button" class="btn--require-asw-field btn--require-email fas fa-exclamation-circle" id="btn--require-email-${i}">
                </button>
                <input type="text" name="input-descript" id="input-descript" class="form-control--descript" value="Email">
                <input type="email" name="user-email-${i}" id="user-email-${i}" class="form-control" placeholder="email@domain.com" required>
            </div>
            <!-- birthday -->
            <div id="form-question--birthday-${i}" class="form-question--birthday w-50 form-control--container">
                <button type="button" id="btn--remove-birthday-${i}" class="btn--remove-birthday btn--remove-asw-field fas fa-trash-alt">
                </button>
                <button type="button" class="btn--require-asw-field btn--require-birthday fas fa-exclamation-circle" id="btn--require-birthday-${i}">
                </button>
                <input type="text" name="input-descript" id="input-descript" class="form-control--descript" value="Birthday">
                <input type="date" name="user-birthday-${i}" id="user-birthday-${i}" class="form-control" required>
            </div>
            <!-- phone -->
            <div id="form-question--phone-${i}" class="form-question--phone w-50 form-control--container">
                <button type="button" id="btn--remove-phone-${i}" class="btn--remove-phone btn--remove-asw-field fas fa-trash-alt">
                </button>
                <button type="button" class="btn--require-asw-field btn--require-phone fas fa-exclamation-circle" id="btn--require-phone-${i}">
                </button>
                <input type="text" name="input-descript" id="input-descript" class="form-control--descript" value="Phone number">
                <input type="tel" name="user-phone-${i}" id="user-phone-${i}" class="form-control" pattern="[0-9]{10}" placeholder="0123456789" required>
            </div>
            <!-- address -->
            <div id="form-question--address-${i}" class="form-question--address w-100 form-control--container">
                <button type="button" id="btn--remove-address-${i}" class="btn--remove-address btn--remove-asw-field fas fa-trash-alt">
                </button>
                <button type="button" class="btn--require-asw-field btn--require-address fas fa-exclamation-circle" id="btn--require-address-${i}">
                </button>
                <input type="text" name="input-descript" id="input-descript" class="form-control--descript" value="Address">
                <input type="text" name="user-address-${i}" id="user-address-${i}" class="form-control" placeholder="Street - City - Country" required>
            </div>
            <!-- CCCD -->
            <div id="form-question--CCCD-${i}" class="form-question--CCCD w-50 form-control--container">
                <button type="button" id="btn--remove-CCCD-${i}" class="btn--remove-CCCD btn--remove-asw-field fas fa-trash-alt">
                </button>
                <button type="button" class="btn--require-asw-field btn--require-CCCD fas fa-exclamation-circle" id="btn--require-CCCD-${i}">
                </button>
                <input type="text" name="input-descript" id="input-descript" class="form-control--descript" value="Cityzen Indentify number">
                <input type="number" name="user-CCCD-${i}" id="user-CCCD-${i}" class="form-control" required>
            </div>
            <!-- works -->
            <div id="form-question--works-${i}" class="form-question--works w-100 form-control--container">
                <button type="button" id="btn--remove-works-${i}" class="btn--remove-works btn--remove-asw-field fas fa-trash-alt">
                </button>
                <button type="button" class="btn--require-asw-field btn--require-works fas fa-exclamation-circle" id="btn--require-works-${i}">
                </button>
                <input type="text" name="input-descript" id="input-descript" class="form-control--descript" value="Works">
                <input type="text" name="user-works-${i}" id="user-works-${i}" class="form-control" placeholder="Company Name" required>
            </div>
        </div>`;
		i++;
		formQuestionBody.appendChild(PersonInfoGroup);
		reload();
	}

	/*---Reload and add Click event for many btn-remove*/
	const reload = () => {
		[...document.querySelectorAll(".btn--remove-fullName")].forEach(
			(fullName) => {
				fullName.addEventListener("click", deleteFullName);
			}
		);
		[...document.querySelectorAll(".btn--remove-email")].forEach((email) => {
			email.addEventListener("click", deleteEmail);
		});
		[...document.querySelectorAll(".btn--remove-birthday")].forEach(
			(birthday) => {
				birthday.addEventListener("click", deleteBirthday);
			}
		);
		[...document.querySelectorAll(".btn--remove-phone")].forEach((phone) => {
			phone.addEventListener("click", deletePhone);
		});
		[...document.querySelectorAll(".btn--remove-address")].forEach(
			(address) => {
				address.addEventListener("click", deleteAddress);
			}
		);
		[...document.querySelectorAll(".btn--remove-CCCD")].forEach((cccd) => {
			cccd.addEventListener("click", deleteCCCD);
		});
		[...document.querySelectorAll(".btn--remove-works")].forEach((works) => {
			works.addEventListener("click", deleteWorks);
		});

		// Add reload() for all required-btn
		[...document.querySelectorAll(".btn--require-name")].forEach((btn) => {
			btn.addEventListener("click", toggleRequiredName);
		});
		[...document.querySelectorAll(".btn--require-email")].forEach((btn) => {
			btn.addEventListener("click", toggleRequiredEmail);
		});
		[...document.querySelectorAll(".btn--require-birthday")].forEach((btn) => {
			btn.addEventListener("click", toggleRequiredBirthday);
		});
		[...document.querySelectorAll(".btn--require-phone")].forEach((btn) => {
			btn.addEventListener("click", toggleRequiredPhone);
		});
		[...document.querySelectorAll(".btn--require-address")].forEach((btn) => {
			btn.addEventListener("click", toggleRequiredAddress);
		});
		[...document.querySelectorAll(".btn--require-CCCD")].forEach((btn) => {
			btn.addEventListener("click", toggleRequiredCCCD);
		});
		[...document.querySelectorAll(".btn--require-works")].forEach((btn) => {
			btn.addEventListener("click", toggleRequiredWorks);
		});
	};
	reload();

	/*---Remove element item----*/
	// Remove fullName
	function deleteFullName(event) {
		const currentContainer = [
			...document.querySelectorAll(".form-question--fullName"),
		].find(
			(container) =>
				container.id.replace("form-question--fullName-", "") ===
				event.target.id.replace("btn--remove-fullName-", "")
		);
		currentContainer.remove();
		reload();
	}
	// Remove email
	function deleteEmail(event) {
		const currentContainer = [
			...document.querySelectorAll(".form-question--email"),
		].find(
			(container) =>
				container.id.replace("form-question--email-", "") ===
				event.target.id.replace("btn--remove-email-", "")
		);
		currentContainer.remove();
		reload();
	}
	// Remove birthday
	function deleteBirthday(event) {
		const currentContainer = [
			...document.querySelectorAll(".form-question--birthday"),
		].find(
			(container) =>
				container.id.replace("form-question--birthday-", "") ===
				event.target.id.replace("btn--remove-birthday-", "")
		);
		currentContainer.remove();
		reload();
	}
	// Remove phone
	function deletePhone(event) {
		const currentContainer = [
			...document.querySelectorAll(".form-question--phone"),
		].find(
			(container) =>
				container.id.replace("form-question--phone-", "") ===
				event.target.id.replace("btn--remove-phone-", "")
		);
		currentContainer.remove();
		reload();
	}
	// Remove address
	function deleteAddress(event) {
		const currentContainer = [
			...document.querySelectorAll(".form-question--address"),
		].find(
			(container) =>
				container.id.replace("form-question--address-", "") ===
				event.target.id.replace("btn--remove-address-", "")
		);
		currentContainer.remove();
		reload();
	}
	// Remove CCCD
	function deleteCCCD(event) {
		const currentContainer = [
			...document.querySelectorAll(".form-question--CCCD"),
		].find(
			(container) =>
				container.id.replace("form-question--CCCD-", "") ===
				event.target.id.replace("btn--remove-CCCD-", "")
		);
		currentContainer.remove();
		reload();
	}
	// Remove works
	function deleteWorks(event) {
		const currentContainer = [
			...document.querySelectorAll(".form-question--works"),
		].find(
			(container) =>
				container.id.replace("form-question--works-", "") ===
				event.target.id.replace("btn--remove-works-", "")
		);
		currentContainer.remove();
		reload();
	}

	/*---Required element item----*/
	// Toggle Name required
	function toggleRequiredName(e) {
		let x = e.target.id.replace("btn--require-name-", "");
		const check = document.getElementById("user-fullName-" + x).required;
		if (check) {
			document.getElementById("user-fullName-" + x).required = false;
		} else {
			document.getElementById("user-fullName-" + x).required = true;
		}
		document
			.querySelector("#btn--require-name-" + x)
			.classList.toggle("fa-exclamation-circle");
		document
			.querySelector("#btn--require-name-" + x)
			.classList.toggle("fa-calendar-check");
	}
	// Toggle email required
	function toggleRequiredEmail(e) {
		let x = e.target.id.replace("btn--require-email-", "");
		const check = document.getElementById("user-email-" + x).required;
		if (check) {
			document.getElementById("user-email-" + x).required = false;
		} else {
			document.getElementById("user-email-" + x).required = true;
		}
		document
			.querySelector("#btn--require-email-" + x)
			.classList.toggle("fa-exclamation-circle");
		document
			.querySelector("#btn--require-email-" + x)
			.classList.toggle("fa-calendar-check");
	}
	// Toggle birthday required
	function toggleRequiredBirthday(e) {
		let x = e.target.id.replace("btn--require-birthday-", "");
		const check = document.getElementById("user-birthday-" + x).required;
		if (check) {
			document.getElementById("user-birthday-" + x).required = false;
		} else {
			document.getElementById("user-birthday-" + x).required = true;
		}
		document
			.querySelector("#btn--require-birthday-" + x)
			.classList.toggle("fa-exclamation-circle");
		document
			.querySelector("#btn--require-birthday-" + x)
			.classList.toggle("fa-calendar-check");
	}
	// Toggle phone required
	function toggleRequiredPhone(e) {
		let x = e.target.id.replace("btn--require-phone-", "");
		const check = document.getElementById("user-phone-" + x).required;
		if (check) {
			document.getElementById("user-phone-" + x).required = false;
		} else {
			document.getElementById("user-phone-" + x).required = true;
		}
		document
			.querySelector("#btn--require-phone-" + x)
			.classList.toggle("fa-exclamation-circle");
		document
			.querySelector("#btn--require-phone-" + x)
			.classList.toggle("fa-calendar-check");
	}
	// Toggle address required
	function toggleRequiredAddress(e) {
		let x = e.target.id.replace("btn--require-address-", "");
		const check = document.getElementById("user-address-" + x).required;
		if (check) {
			document.getElementById("user-address-" + x).required = false;
		} else {
			document.getElementById("user-address-" + x).required = true;
		}
		document
			.querySelector("#btn--require-address-" + x)
			.classList.toggle("fa-exclamation-circle");
		document
			.querySelector("#btn--require-address-" + x)
			.classList.toggle("fa-calendar-check");
	}
	// Toggle CCCD required
	function toggleRequiredCCCD(e) {
		let x = e.target.id.replace("btn--require-CCCD-", "");
		const check = document.getElementById("user-CCCD-" + x).required;
		if (check) {
			document.getElementById("user-CCCD-" + x).required = false;
		} else {
			document.getElementById("user-CCCD-" + x).required = true;
		}
		document
			.querySelector("#btn--require-CCCD-" + x)
			.classList.toggle("fa-exclamation-circle");
		document
			.querySelector("#btn--require-CCCD-" + x)
			.classList.toggle("fa-calendar-check");
	}
	// Toggle works required
	function toggleRequiredWorks(e) {
		let x = e.target.id.replace("btn--require-works-", "");
		const check = document.getElementById("user-works-" + x).required;
		if (check) {
			document.getElementById("user-works-" + x).required = false;
		} else {
			document.getElementById("user-works-" + x).required = true;
		}
		document
			.querySelector("#btn--require-works-" + x)
			.classList.toggle("fa-exclamation-circle");
		document
			.querySelector("#btn--require-works-" + x)
			.classList.toggle("fa-calendar-check");
	}
})();

/*---------------Add and delete Question Title-----------*/
(() => {
	/*---Add---*/
	const addQuesTitle = document.querySelector(".add-title");

	addQuesTitle.addEventListener("click", () => {
		createQuesTitle();
	});

	let i = 0;
	function createQuesTitle() {
		quesTitle = document.createElement("div");

		quesTitle.classList.add("form-question--titleBox-group");
		quesTitle.setAttribute("id", "form-question--titleBox-group-" + i);
		quesTitle.innerHTML = `
        <div class="row">
            <div class="form-question--titleBox w-100 form-control--container">
                <button type="button" class="btn--remove-asw-field btn--remover-quesTitle fas fa-trash-alt" id="btn--remover-quesTitle-${i}">
                </button>
                <input type="text" name="question--title-${i}" id="question--title-${i}" class="question--title" placeholder="Question Title">
                 <div class="section--endline--inner"></div>
            </div>
        </div>`;
		i++;
		formQuestionBody.appendChild(quesTitle);
		reload();
	}

	/*---Reload---*/
	const reload = () => {
		[...document.querySelectorAll(".btn--remover-quesTitle")].forEach((btn) => {
			btn.addEventListener("click", deleteQuesTitle);
		});
	};
	reload();

	/*---Remove---*/
	function deleteQuesTitle(event) {
		const currentContainer = [
			...document.querySelectorAll(".form-question--titleBox-group"),
		].find(
			(container) =>
				container.id.replace("form-question--titleBox-group-", "") ===
				event.target.id.replace("btn--remover-quesTitle-", "")
		);
		currentContainer.remove();
		reload();
	}
})();

/*---------------Add and delete Question Description-----------*/
(() => {
	/*---Add---*/
	const addDescriptTitle = document.querySelector(".add-description");

	addDescriptTitle.addEventListener("click", () => {
		createDescriptTitle();
	});

	let i = 0;
	function createDescriptTitle() {
		DescriptTitle = document.createElement("div");

		DescriptTitle.classList.add("form-question--descriptBox-group");
		DescriptTitle.setAttribute("id", "form-question--descriptBox-group-" + i);
		DescriptTitle.innerHTML = `
        <div class="row">
            <div class="form-question--descriptBox w-100 form-control--container">
                <button type="button" id="btn--remove-quesDescript-${i}" class="btn--remove-asw-field btn--remove-quesDescript fas fa-trash-alt">
                </button>
                <input type="text" name="question-descript-${i}" id="question-descript-${i}" class="form-control--descript" placeholder="Question description">
                <div class="section--endline--inner"></div>
            </div>
        </div>`;
		i++;
		formQuestionBody.appendChild(DescriptTitle);
		reload();
	}

	/*---Reload---*/
	const reload = () => {
		[...document.querySelectorAll(".btn--remove-quesDescript")].forEach(
			(btn) => {
				btn.addEventListener("click", deleteDescriptTitle);
			}
		);
	};
	reload();

	/*---Remove---*/
	function deleteDescriptTitle(event) {
		const currentContainer = [
			...document.querySelectorAll(".form-question--descriptBox-group"),
		].find(
			(container) =>
				container.id.replace("form-question--descriptBox-group-", "") ===
				event.target.id.replace("btn--remove-quesDescript-", "")
		);
		currentContainer.remove();
		reload();
	}
})();

/*---------------Add and delete inputBox-----------*/
(() => {
	/*---Add---*/
	const addInputBox = document.querySelector(".add-input");

	addInputBox.addEventListener("click", () => {
		createInputBox();
	});

	let i = 0;
	function createInputBox() {
		inputBox = document.createElement("div");

		inputBox.classList.add("form-question--inputBox-group");
		inputBox.setAttribute("id", "form-question--inputBox-group-" + i);
		inputBox.innerHTML = `
        <div class="row">
            <div class="form-question--inputBox w-100 form-control--container">
                <button type="button" class="btn--remove-asw-field btn--remove-input fas fa-trash-alt" id="btn--remove-input-${i}">
                </button>
                <button type="button" class="btn--require-asw-field btn--require-input fas fa-exclamation-circle" id="btn--require-input-${i}">
                </button>
                <input type="text" name="input-descript" id="input-descript" class="form-control--descript" value="Input box description">
                <input type="text" name="user-inputBox-${i}" id="user-inputBox-${i}" class="form-control" required>                                    
            </div>
        </div>`;
		i++;
		formQuestionBody.appendChild(inputBox);
		reload();
	}

	/*---Remove---*/

	function deleteInputBox(event) {
		const currentContainer = [
			...document.querySelectorAll(".form-question--inputBox-group"),
		].find(
			(container) =>
				container.id.replace("form-question--inputBox-group-", "") ===
				event.target.id.replace("btn--remove-input-", "")
		);
		currentContainer.remove();
		reload();
	}

	/*---Reload---*/
	const reload = () => {
		[...document.querySelectorAll(".btn--remove-input")].forEach((btn) => {
			btn.addEventListener("click", deleteInputBox);
		});
		// reload for required-btn
		[...document.querySelectorAll(".btn--require-input")].forEach((btn) => {
			btn.addEventListener("click", toggleRequiredInputBox);
		});
	};
	reload();

	/*---Toggle required for this field---*/
	function toggleRequiredInputBox(e) {
		let x = e.target.id.replace("btn--require-input-", "");
		const check = document.getElementById("user-inputBox-" + x).required;
		if (check) {
			document.getElementById("user-inputBox-" + x).required = false;
		} else {
			document.getElementById("user-inputBox-" + x).required = true;
		}
		document
			.querySelector("#btn--require-input-" + x)
			.classList.toggle("fa-exclamation-circle");
		document
			.querySelector("#btn--require-input-" + x)
			.classList.toggle("fa-calendar-check");
	}
})();

/*---------------Add and delete radio group-----------*/
(() => {
	/*---Add group---*/
	const addRadioGroup = document.querySelector(".add-radio");

	addRadioGroup.addEventListener("click", () => {
		createRadioBox();
	});

	let i = 0;
	function createRadioBox() {
		radioBox = document.createElement("div");

		radioBox.classList.add("form-question--radio-group");
		radioBox.setAttribute("id", "form-question--radio-group-" + i);
		radioBox.innerHTML = `
        <div class="row">
            <div id="form-question--radioBox-${i}" class="form-question--radioBox w-100 form-control--container">
                <button type="button" id="btn--remove-radioBox-${i}" class="btn--remove-radioBox btn--remove-asw-field fas fa-trash-alt">
                </button>
                <button type="button" id="btn--add-radioItem-${i}" class="btn--add-radioItem btn--add-radio-field far fa-plus-square">
                </button>
                <button type="button" class="btn--require-asw-field btn--require-radioBox fas fa-exclamation-circle" id="btn--require-radioBox-${i}">
                </button>
                <!--radio item-->
                <div class="form-check--container row">
                    <input type="radio" name="group-radio-${i}" id="group-radio-${i}" class="form-check--input" required>                                       
                    <input type="text" name="input-descript" id="input-descript" class="form-check--descript" placeholder="Radio box description">
                </div>
            </div>
        </div>`;
		i++;
		formQuestionBody.appendChild(radioBox);
		reload();
	}

	/*---Reload---*/
	const reload = () => {
		[...document.querySelectorAll(".btn--remove-radioBox")].forEach((btn) => {
			btn.addEventListener("click", deleteRadioBox);
		});
		[...document.querySelectorAll(".btn--add-radioItem")].forEach((btn) => {
			btn.addEventListener("click", addRadioItem);
		});
		// Reload for RadioBox required
		[...document.querySelectorAll(".btn--require-radioBox")].forEach((btn) => {
			btn.addEventListener("click", toggleRequiredRadioBox);
		});
	};
	reload();

	/*---Remove---*/
	function deleteRadioBox(event) {
		const currentContainer = [
			...document.querySelectorAll(".form-question--radio-group"),
		].find(
			(container) =>
				container.id.replace("form-question--radio-group-", "") ===
				event.target.id.replace("btn--remove-radioBox-", "")
		);
		currentContainer.remove();
		reload();
	}

	/*---Add radio item---*/
	function addRadioItem(event) {
		// X = id number of button-add-radioItem clicked
		let x = event.target.id.replace("btn--add-radioItem-", "");

		const formQuesRadioBox = document.getElementById(
			"form-question--radioBox-" + x
		);

		radioBoxItem = document.createElement("div");

		radioBoxItem.classList.add("form-check--container", "row");
		radioBoxItem.innerHTML = `
        <input type="radio" name="group-radio-${x}" class="form-check--input">                                       
        <input type="text" name="input-descript" id="input-descript" class="form-check--descript" placeholder="Radio box description">`;

		formQuesRadioBox.appendChild(radioBoxItem);
	}

	//Toggle radio-box required
	function toggleRequiredRadioBox(e) {
		let x = e.target.id.replace("btn--require-radioBox-", "");
		const check = document.getElementById("group-radio-" + x).required;
		if (check) {
			document.getElementById("group-radio-" + x).required = false;
		} else {
			document.getElementById("group-radio-" + x).required = true;
		}
		document
			.querySelector("#btn--require-radioBox-" + x)
			.classList.toggle("fa-exclamation-circle");
		document
			.querySelector("#btn--require-radioBox-" + x)
			.classList.toggle("fa-calendar-check");
	}
})();

/*---------------Add and delete checkBox group-----------*/
(() => {
	/*---Add---*/
	const addcheckBoxGroup = document.querySelector(".add-checkbox");

	addcheckBoxGroup.addEventListener("click", () => {
		createCheckBox();
	});

	let i = 0;

	/*Reload*/
	const reload = () => {
		[...document.querySelectorAll(".btn--remove-checkbox")].forEach((btn) => {
			btn.addEventListener("click", deleteCheckBox);
		});
	};

	function createCheckBox() {
		checkBox = document.createElement("div");

		checkBox.classList.add("form-question--checkbox-group");
		checkBox.setAttribute("id", "form-question--checkbox-group-" + i);
		checkBox.innerHTML = `
        <div class="row">
            <div class="form-question--radioBox w-100 form-control--container">
            <button type="button" class="btn--remove-asw-field btn--remove-checkbox fas fa-trash-alt" id="btn--remove-checkbox-${i}">
            </button>
            <div class="form-check--container">
                <input type="checkbox" name="group-checkbox-${i}" id="ques-checkbox-${i}" class="form-check--input">                                       
                <input type="text" name="input-descript" id="input-descript" class="form-check--descript" placeholder="Radio box description">
            </div> 
            </div>
        </div>`;
		i++;
		formQuestionBody.appendChild(checkBox);
		reload();
	}
	reload();

	/*---Remove---*/
	function deleteCheckBox(event) {
		const currentContainer = [
			...document.querySelectorAll(".form-question--checkbox-group"),
		].find(
			(container) =>
				container.id.replace("form-question--checkbox-group-", "") ===
				event.target.id.replace("btn--remove-checkbox-", "")
		);
		currentContainer.remove();
		reload();
	}
})();

(() => {
	const btnPreview = $(".btn-preview-form");
	const sendData = () => {
		const formData = $("form").innerHTML.replaceAll(/[\n\t\s]{2,}/g, "");
		const formTitle = $("input[name='title-form']").value;
		fetch(window.location.href, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: formTitle,
				form: formData,
				action: "preview",
			}),
		})
			.then((res) => res.json())
			.then((data) => (window.location.href = data.redirect))
			.catch((err) => console.log(err));
	};
	btnPreview.addEventListener("click", sendData);
})();

() => {
	const btnSend = $(".btn-send");
	const sendOfficialData = () => {
		const formData = $("form").innerHTML.replaceAll(/[\n\t\s]{2,}/g, "");
		const formTitle = $("input[name='title-form']").value;
		fetch(window.location.href, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: formTitle,
				form: formData,
				action: "send",
			}),
		}).catch((err) => console.log(err));
	};
	btnSend.addEventListener("click", sendOfficialData);
};
