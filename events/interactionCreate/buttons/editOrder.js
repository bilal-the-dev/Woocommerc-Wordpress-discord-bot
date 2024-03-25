const { fetchCategories } = require("../../../utils/WooCommerce");
const {
	generateGeneralButton,
	generateActionRow,
} = require("../../../utils/buttons");
const { handleInteractionError } = require("../../../utils/errorHandler");
const {
	replyOrFollowInteraction,
} = require("../../../utils/interactionHandler");

module.exports = async (interaction) => {
	try {
		if (!interaction.isButton()) return;

		if (interaction.customId !== "editOrder") return;

		await interaction.deferReply({ ephemeral: true });

		const response = await fetchCategories();

		// console.log(response);
		console.log(`Fetched ${response.data.length} categories.`);
		let buttons = [];

		const rows = [];

		for (const [i, product] of response.data.entries()) {
			buttons.push(
				generateGeneralButton(
					product.name.replace(/&amp;/g, "&"),
					`category_${product.id}`,
					"Secondary",
				),
			);

			if (buttons.length !== 5 && i !== response.data.length - 1) continue;
			rows.push(generateActionRow(buttons));
			buttons = [];
		}

		// console.log(rows);
		await replyOrFollowInteraction(interaction, {
			content:
				"Please select among which category you want to buy the product from.",
			components: [...rows],
			ephemeral: true,
		});
	} catch (error) {
		await handleInteractionError(error, interaction);
	}
};
