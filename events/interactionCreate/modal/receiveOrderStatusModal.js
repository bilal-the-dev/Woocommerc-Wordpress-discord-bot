const {
	handleInteractionError,
	AppError,
} = require("../../../utils/errorHandler");
const { generateGeneralEmbed } = require("../../../utils/embeds");
const {
	generateActionRow,
	generateGeneralButton,
} = require("../../../utils/buttons");
const { convertFieldMapToStr } = require("../../../utils/modals");
const {
	replyOrFollowInteraction,
} = require("../../../utils/interactionHandler");

module.exports = async (interaction) => {
	try {
		if (!interaction.isModalSubmit()) return;

		const {
			customId,
			user,
			fields: { fields },
			message: { embeds },
			guild,
		} = interaction;

		const [type, messageURL] = customId.split("_");

		if (type !== "orderStatus") return;

		const member = embeds[0].data.footer.text;

		await interaction.deferReply({ ephemeral: true });

		const memberToSendDM = await guild.members
			.fetch(member)
			.catch((e) => console.log(e));

		if (!memberToSendDM) throw new AppError("User has left the server");

		const description = `Information regarding your [order](${messageURL}). If you approve, your order will be placed.\n${convertFieldMapToStr(
			fields,
		)}`;

		const embedData = {
			title: "Order Status",
			description,
			thumbnail: user.displayAvatarURL(),
		};

		const embed = generateGeneralEmbed(embedData);
		const approve = generateGeneralButton(
			"Approve",
			`order_app_${messageURL}`,
			"Danger",
		);
		const decline = generateGeneralButton(
			"Decline",
			`order_dec_${messageURL}`,
			"Primary",
		);

		const row = generateActionRow([approve, decline]);

		const hasSentDM = await memberToSendDM
			.send({
				embeds: [embed],
				components: [row],
			})
			.catch((e) => console.log(e));

		if (!hasSentDM)
			throw new AppError(
				"User has turned off DM messages. Ask them to turn on their DM",
			);

		await replyOrFollowInteraction(interaction, {
			content: "Sent them a DM! Please wait for their response.",
		});

		await interaction.message.edit({ components: [] });
	} catch (error) {
		await handleInteractionError(error, interaction);
	}
};
