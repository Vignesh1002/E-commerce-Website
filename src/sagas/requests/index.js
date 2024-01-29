import axios from "axios";

axios.defaults.baseURL = 'https://dummyjson.com';

export const getAllProducts = async() => axios.get('/products');

export const getSingleProduct = async(id) => axios.get(`/products/${id}`);

export const searchProducts = async(product) => axios.get(`/products/search?q=${product}`);

export const getAllCategories = async() => axios.get('/products/categories');

export const getProductsOfCategory = async(category) => axios.get(`/products/categories/${category}`);