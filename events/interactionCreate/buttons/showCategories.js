const {
	generateGeneralButton,
	generateActionRow,
} = require("../../../utils/buttons");
const { handleInteractionError } = require("../../../utils/errorHandler");
const {
	replyOrFollowInteraction,
} = require("../../../utils/interactionHandler");
const { categories } = require("./../../../config.json");

module.exports = async (interaction) => {
	try {
		if (!interaction.isButton()) return;

		if (interaction.customId !== "showCategory") return;

		// await interaction.deferReply({ ephemeral: true });

		const categoriesArray = Object.entries(categories);
		let buttons = [];

		const rows = [];

		for (const [i, [name, id]] of categoriesArray.entries()) {
			buttons.push(generateGeneralButton(name, `category_${id}`, "Secondary"));

			if (buttons.length !== 3 && i !== categoriesArray.length - 1) continue;
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
