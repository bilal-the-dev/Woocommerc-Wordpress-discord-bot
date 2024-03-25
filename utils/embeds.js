const { EmbedBuilder, strikethrough } = require("discord.js");

const generateGeneralEmbed = function ({
	title,
	url,
	description,
	fields,
	image,
	thumbnail,
	footer,
	timestamp,
}) {
	const embed = new EmbedBuilder().setColor(0x0099ff);

	title && embed.setTitle(title);
	url && embed.setURL(url);
	description && embed.setDescription(description);
	thumbnail && embed.setThumbnail(thumbnail);
	fields && embed.addFields(...fields);
	image && embed.setImage(image);
	timestamp && embed.setTimestamp();
	footer && embed.setFooter(footer);

	return embed;
};

const generateProductEmbed = function (product) {
	const {
		name,
		permalink,
		description,
		price,
		regular_price,
		total_sales,
		stock_quantity,
		rating_count,
		average_rating,
		images,
	} = product;

	// console.log(product);

	const embedDescription = `**Info:**${description}\n**Sales**:${total_sales}\n**Stock:**${
		stock_quantity ?? 0
	}\n**Price:**${
		regular_price > price ? strikethrough(regular_price) + price : price
	}\n**Reviews:**${rating_count}`;

	return generateGeneralEmbed({
		title: name,
		url: permalink,
		description: embedDescription,
		image: images[0].src,
	});
};

module.exports = { generateGeneralEmbed, generateProductEmbed };
