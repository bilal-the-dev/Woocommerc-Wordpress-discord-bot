const { TextInputBuilder, TextInputStyle } = require("discord.js");
const { generateActionRow } = require("./buttons");

const createModalFields = function (modal, fields) {
	const inputs = Object.entries(fields).map(([id, label]) =>
		generateActionRow([
			new TextInputBuilder()
				.setCustomId(id)
				.setLabel(label[0])
				.setStyle(label[1] ? TextInputStyle.Paragraph : TextInputStyle.Short),
		]),
	);

	modal.addComponents(...inputs);

	return modal;
};

const convertFieldMapToStr = (fields) =>
	fields.reduce(
		(acc, cur) => (acc = acc + `**${cur.customId}:** ${cur.value}\n`),
		"",
	);

module.exports = { convertFieldMapToStr, createModalFields };
