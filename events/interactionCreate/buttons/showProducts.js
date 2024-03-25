const { ComponentType } = require("discord.js");
const { fetchAllProducts } = require("../../../utils/WooCommerce");
const { generateNextPrevButtons } = require("../../../utils/buttons");
const { generateProductEmbed } = require("../../../utils/embeds");
const {
	handleInteractionError,
	AppError,
} = require("../../../utils/errorHandler");
const {
	replyOrFollowInteraction,
} = require("../../../utils/interactionHandler");

module.exports = async (interaction) => {
	try {
		if (!interaction.isButton()) return;

		const { customId } = interaction;

		const [type, categoryId] = customId.split("_");

		if (type !== "category") return;

		// await interaction.deferReply({ ephemeral: true });
		await interaction.deferUpdate();

		const response = await fetchAllProducts(categoryId);

		if (response.data.length === 0)
			throw new AppError("No product found for the category");

		let curPage = 0;
		const lastPage = response.data.length - 1;

		const embeds = response.data.map((product) =>
			generateProductEmbed(product),
		);

		const message = await replyButtonPagination(interaction);

		const collector = message.createMessageComponentCollector({
			componentType: ComponentType.Button,
			time: 1000 * 60 * 10,
		});

		collector.on("collect", async (i) => {
			if (i.customId.split("_")[0] === "buy") return;
			if (i.customId === "next" && curPage < lastPage) curPage++;
			if (i.customId === "previous" && curPage > 0) curPage--;

			await i.deferUpdate();
			await replyButtonPagination(i);
		});

		collector.on("end", (collected) => {
			console.log(`Collected ${collected.size} interactions.`);
		});

		// eslint-disable-next-line no-inner-declarations
		async function replyButtonPagination(i) {
			const embed = embeds[curPage];
			return await replyOrFollowInteraction(i, {
				content: "",
				embeds: [embed],
				components: [
					generateNextPrevButtons(curPage, lastPage, response.data[curPage].id),
				],
			});
		}
	} catch (error) {
		await handleInteractionError(error, interaction);
	}
};
