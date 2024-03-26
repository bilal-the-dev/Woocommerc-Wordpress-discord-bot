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

const generateProductEmbed = function (product, pageNo) {
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

	const info = description
		? `**Description:** ${description
				.replace(/<p>/g, "")
				.replace(/<\/p>/g, "")
				.replace(/\n/g, "")}\n`
		: "";

	const embedDescription = `${info}**Sales**: ${total_sales}\n**Stock:** ${
		stock_quantity ?? 0
	}\n**Price:** ${
		regular_price > price ? `${strikethrough(regular_price)} ` + price : price
	} د. إ\n**Average Rating:** ⭐ ${average_rating} \n**Reviews:** ⭐ ${rating_count}`;

	return generateGeneralEmbed({
		title: name,
		url: permalink,
		description: embedDescription,
		image: images[0].src,
		footer: { text: `Page ${pageNo}` },
	});
};

module.exports = { generateGeneralEmbed, generateProductEmbed };
