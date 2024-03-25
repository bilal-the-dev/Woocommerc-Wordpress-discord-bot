const { generateGeneralButton, generateActionRow } = require("./buttons");
const { generateGeneralEmbed } = require("./embeds");

const { STORE_CHANNEL_ID, GUILD_ID } = process.env;

const sendBuyProductEmbed = async function (client) {
	const guild = client.guilds.cache.get(GUILD_ID);
	const channelToSend = await guild.channels.fetch(STORE_CHANNEL_ID);

	const data = {
		title: "Lets buy something",
		description: "Please click the button below to start the buying process!",
	};

	const embed = generateGeneralEmbed(data);
	const button = generateGeneralButton(
		"Buy a product",
		"showCategory",
		"Danger",
		"🛒",
	);
	const row = generateActionRow([button]);

	await sendMessageInChannel(channelToSend, {
		embeds: [embed],
		components: [row],
	});
};

const sendMessageInChannel = async (channel, data) => await channel.send(data);

module.exports = { sendBuyProductEmbed, sendMessageInChannel };
