const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const { Client, IntentsBitField, Partials } = require("discord.js");
const WOK = require("wokcommands");
const dotenv = require("dotenv");
const path = require("path");

const { DefaultCommands } = WOK;
dotenv.config({ path: `${__dirname}/.env` });

const { isSendingBuyProductEmbed } = require("./config.json");
const { sendBuyProductEmbed } = require("./utils/sendMessage");

const { TOKEN, STORE_URL, CONSUMER_KEY, CONSUMER_SECRET } = process.env;

// create a woocommerce api client
const WooCommerce = new WooCommerceRestApi({
	url: STORE_URL,
	consumerKey: CONSUMER_KEY,
	consumerSecret: CONSUMER_SECRET,
	version: "wc/v3",
});

const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.MessageContent,
	],
	partials: [Partials.Channel],
});

client.on("ready", async (readyClient) => {
	console.log(`${readyClient.user.username} is running 🧶`);

	if (isSendingBuyProductEmbed) await sendBuyProductEmbed(readyClient);

	new WOK({
		client,
		commandsDir: path.join(__dirname, "./commands"),
		events: {
			dir: path.join(__dirname, "events"),
		},
		disabledDefaultCommands: [
			DefaultCommands.ChannelCommand,
			DefaultCommands.CustomCommand,
			DefaultCommands.Prefix,
			DefaultCommands.RequiredPermissions,
			DefaultCommands.RequiredRoles,
			DefaultCommands.ToggleCommand,
		],
		cooldownConfig: {
			errorMessage: "Please wait {TIME} before doing that again.",
			botOwnersBypass: false,
			dbRequired: 300,
		},
	});
});

client.login(TOKEN);

module.exports = WooCommerce;
