const {
	handleInteractionError,
	AppError,
} = require("../../../utils/errorHandler");
const { generateGeneralEmbed } = require("../../../utils/embeds");
const { fetchOneProduct } = require("../../../utils/WooCommerce");
const { sendMessageInChannel } = require("../../../utils/sendMessage");
const {
	generateGeneralButton,
	generateActionRow,
} = require("../../../utils/buttons");

module.exports = async (interaction) => {
	try {
		if (!interaction.isModalSubmit()) return;

		const {
			customId,
			user,
			fields: { fields },
			guild,
		} = interaction;

		const [type, productId] = customId.split("_");

		if (type !== "buy") return;

		await interaction.update({
			content:
				"Your Order has been noted. You will receive a direct message from the bot regarding further information.Please turn on your DM(s).",
			// embeds: [],
			// components: [],
		});

		const respone = await fetchOneProduct(productId);
		const receiveOrderChannel = await guild.channels.fetch(
			process.env.RECIVE_ORDER_CHANNEL_ID,
		);

		const { data: product } = respone;
		if (product.length === 0) throw new AppError("Product not found");

		const submittedData = fields.reduce(
			(acc, cur) => (acc = acc + `**${cur.customId}:** ${cur.value}\n`),
			"",
		);

		const description = `**User:** ${user}\n**Product:** [${product.name}](${product.permalink})\n${submittedData}`;

		const embedData = {
			title: "Order Received 📥",
			description,
			thumbnail: user.displayAvatarURL(),
			image: product.images[0].src,
			footer: { text: user.id },
		};

		const embed = generateGeneralEmbed(embedData);
		const button = generateGeneralButton(
			"Edit Order",
			"editOrder",
			"Danger",
			"🕗",
		);

		const row = generateActionRow([button]);

		await sendMessageInChannel(receiveOrderChannel, {
			embeds: [embed],
			components: [row],
		});
	} catch (error) {
		await handleInteractionError(error, interaction);
	}
};
