const replyOrFollowInteraction = async (interaction, reply) => {
	if (!interaction.replied && !interaction.deferred)
		return await interaction.reply(reply);

	return await interaction.editReply(reply);
};

module.exports = { replyOrFollowInteraction };
