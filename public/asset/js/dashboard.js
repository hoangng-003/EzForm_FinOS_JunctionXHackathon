"use strict";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

(() => {
	const toggleTemplateGroup = document.querySelector(
		".dashboard-templates--hide-btn"
	);

	toggleTemplateGroup.addEventListener("click", () => {
		toggleTemplate();
	});

	function toggleTemplate() {
		document
			.querySelector(".dashboard-templates--items")
			.classList.toggle("hide");
		document
			.querySelector(".dashboard-templates--items")
			.classList.toggle("show");
	}
})();

$(".dashboard--create-form").addEventListener("click", () => {
	fetch("/dashboard", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			action: "create",
		}),
		mode: "cors",
	})
		.then((res) => res.json())
		.then((data) => (window.location.href = data.redirect))
		.catch((err) => console.log(err));
});
/*---------------Remove User form item-----------*/
(() => {
	/*---Remove---*/
	const deleteUserFormItem = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const currentContainer = [...$$(".userForm-item--container")].find(
			(container) =>
				container.id.replace("userForm-item--container-", "") ===
				e.target.id.replace("userForm-item--remove-", "")
		);
		if (confirm("Are you sure you want to delete")) {
			const formIdToRemove = currentContainer.querySelector(
				"input[type='hidden']"
			).value;
			fetch("/dashboard", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					action: "delete",
					formIdToRemove: formIdToRemove,
				}),
			}).catch((err) => console.log(err));
			currentContainer.remove();
			reload();
		} else {
			reload();
		}
	};

	/*Reload*/
	const reload = () => {
		[...$$(".userForm-item--remove")].forEach((btn) => {
			btn.addEventListener("click", deleteUserFormItem);
		});
	};
	reload();
})();

(() => {
	[...$$(".template-item")].forEach((item) => {
		item.addEventListener("click", (e) => {
			const templateId = e.currentTarget.id;
			fetch("/dashboard", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					action: "template",
					templateId,
				}),
				mode: "cors",
			})
				.then((res) => res.json())
				.then((data) => (window.location.href = data.redirect))
				.catch((err) => console.log(err));
		});
	});
})();
