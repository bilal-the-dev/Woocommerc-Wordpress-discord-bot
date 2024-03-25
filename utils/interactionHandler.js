const replyOrFollowInteraction = async (interaction, reply) => {
	if (interaction.deferred) return await interaction.editReply(reply);
	if (!interaction.replied) return await interaction.reply(reply);

	return await interaction.followUp(reply);
};

module.exports = { replyOrFollowInteraction };
