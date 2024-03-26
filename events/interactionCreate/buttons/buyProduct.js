const { ModalBuilder } = require("discord.js");
const { handleInteractionError } = require("../../../utils/errorHandler");
const { createModalFields } = require("../../../utils/modals");

module.exports = async (interaction) => {
	try {
		if (!interaction.isButton()) return;

		const { customId } = interaction;

		const [type] = customId.split("_");

		if (type !== "buy") return;

		const questions = {
			Email: ["What's your email address?"],
			Quantity: ["The quantity of the product you want to buy?"],
			"Additional Info": [
				"Any info about product (size,color,weight)",
				"paragraph",
			],
			Address: ["Shipping address (zip code,country,location)"],
		};

		const modal = new ModalBuilder()
			.setCustomId(customId)
			.setTitle("Personal Information");

		await interaction.showModal(createModalFields(modal, questions));
	} catch (error) {
		await handleInteractionError(error, interaction);
	}
};
