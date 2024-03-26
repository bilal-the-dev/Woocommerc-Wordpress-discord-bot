const WooCommerce = require("../index");

// const fetchCategories = async () =>
// 	await WooCommerce.get("products/categories?per_page=24");

const fetchAllProducts = async (categoryId) =>
	await WooCommerce.get(`products?category=${categoryId}per_page=100`);

const fetchOneProduct = async (productId) =>
	await WooCommerce.get(`products/${productId}`);

module.exports = { fetchAllProducts, fetchOneProduct };
