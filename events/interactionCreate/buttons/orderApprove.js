const { generateGeneralEmbed } = require("../../../utils/embeds");
const { handleInteractionError } = require("../../../utils/errorHandler");
const { sendMessageInChannel } = require("../../../utils/sendMessage");

module.exports = async (interaction) => {
	try {
		if (!interaction.isButton()) return;

		const { customId, client, user } = interaction;

		const [type, status, messageURL] = customId.split("_");

		if (type !== "order") return;

		const guild = client.guilds.cache.get(process.env.GUILD_ID);

		let channel, reply, title, sort;

		if (status === "app") {
			sort = "accepted";
			reply = "Success! Your order will be placed and delievered to you.";
			title = "Order approved 🎊";
			channel = await guild.channels.fetch(
				process.env.ORDER_APPROVED_CHANNEL_ID,
			);
		}

		if (status === "dec") {
			sort = "declined";
			reply = "Success! Your order has been cancelled.";
			title = "Order declined 🔻";
			channel = await guild.channels.fetch(
				process.env.ORDER_DECLINED_CHANNEL_ID,
			);
		}

		await interaction.update({ content: reply, components: [], embeds: [] });

		const embed = generateGeneralEmbed({
			title,
			description: `The [order](${messageURL}) has been ${sort} by the member ${user}.`,
			thumbnail: user.displayAvatarURL(),
		});

		await sendMessageInChannel(channel, { embeds: [embed] });
	} catch (error) {
		await handleInteractionError(error, interaction);
	}
};
