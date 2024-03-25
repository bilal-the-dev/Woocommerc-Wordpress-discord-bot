const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

const generateGeneralButton = (label, id, style, emoji) => {
	const button = new ButtonBuilder()
		.setCustomId(id)
		.setLabel(label)
		.setStyle(ButtonStyle[style]);

	emoji && button.setEmoji(emoji);

	return button;
};

const generateGneralDisabledButton = function (label, id, style, condition) {
	const button = generateGeneralButton(label, id, style);
	button.setDisabled(condition);
	return button;
};

const generateNextPrevButtons = function (curPage, lastPage, id) {
	const prevButton = generateGneralDisabledButton(
		"Previous",
		"previous",
		"Success",
		curPage === 0,
	);
	const buyButton = generateGeneralButton("Buy", `buy_${id}`, "Primary");
	const nextButton = generateGneralDisabledButton(
		"Next",
		"next",
		"Danger",
		curPage === lastPage,
	);

	return generateActionRow([prevButton, buyButton, nextButton]);
};

const generateActionRow = (components) =>
	new ActionRowBuilder().addComponents(...components);

module.exports = {
	generateGeneralButton,
	generateActionRow,
	generateNextPrevButtons,
};
