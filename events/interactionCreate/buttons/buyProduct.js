const {
	ModalBuilder,
	TextInputStyle,
	TextInputBuilder,
} = require("discord.js");
const { handleInteractionError } = require("../../../utils/errorHandler");
const { generateActionRow } = require("../../../utils/buttons");

module.exports = async (interaction) => {
	try {
		if (!interaction.isButton()) return;

		const { customId } = interaction;

		const [type] = customId.split("_");

		if (type !== "buy") return;

		const modal = new ModalBuilder()
			.setCustomId(customId)
			.setTitle("Personal Information");

		const country = new TextInputBuilder()
			.setCustomId("Email")
			.setLabel("What's your email address?")
			.setStyle(TextInputStyle.Short);

		const quantity = new TextInputBuilder()
			.setCustomId("Quantity")
			.setLabel("The quantity of the product you want to buy?")
			.setStyle(TextInputStyle.Short);

		const info = new TextInputBuilder()
			.setCustomId("Additional Info")
			.setLabel("Any info about product (size,color,weight)")
			.setStyle(TextInputStyle.Short);

		const address = new TextInputBuilder()
			.setCustomId("Address")
			.setLabel("Shipping address (zip code,country,location)")
			.setStyle(TextInputStyle.Short);

		const firstActionRow = generateActionRow([country]);
		const secondActionRow = generateActionRow([quantity]);
		const thirdActionRow = generateActionRow([info]);
		const fourthActionRow = generateActionRow([address]);

		modal.addComponents(
			firstActionRow,
			secondActionRow,
			thirdActionRow,
			fourthActionRow,
		);

		await interaction.showModal(modal);
	} catch (error) {
		await handleInteractionError(error, interaction);
	}
};
