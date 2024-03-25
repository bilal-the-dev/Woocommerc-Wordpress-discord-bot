const { replyOrFollowInteraction } = require("./interactionHandler");

class AppError extends Error {
	constructor(message) {
		super(message);

		this.isOperational = true;

		Error.captureStackTrace(this, this.constructor);
	}
}

const handleInteractionError = async (err, interaction) => {
	console.log(err);
	const content = err.isOperational
		? err.message
		: "Something went wrong, if you think the problem is from our end please notify the staff";

	const reply = {
		content: `Err! \`${content}\`.`,
		ephemeral: true,
		components: [],
		embeds: [],
	};

	await replyOrFollowInteraction(interaction, reply);
};
module.exports = { AppError, handleInteractionError };
