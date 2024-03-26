const { ModalBuilder, PermissionFlagsBits } = require("discord.js");
const {
	handleInteractionError,
	AppError,
} = require("../../../utils/errorHandler");
const { createModalFields } = require("../../../utils/modals");

module.exports = async (interaction) => {
	try {
		if (!interaction.isButton()) return;

		if (interaction.customId !== "editOrder") return;

		if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator))
			throw new AppError("Admin only");

		const questions = {
			"Items Availability": ["Are items available?"],
			Discount: ["Discount"],
			"Additional Notes": ["Any heads up for the buyer?", "Paragraph"],
		};

		const modal = new ModalBuilder()
			.setCustomId(`orderStatus_${interaction.message.url}`)
			.setTitle("Data to be sent to buyer");

		await interaction.showModal(createModalFields(modal, questions));
	} catch (error) {
		await handleInteractionError(error, interaction);
	}
};
