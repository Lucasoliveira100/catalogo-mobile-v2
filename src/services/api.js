import axios from "axios";

// Instância base do axios apontando pra API pública usada no catálogo
const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 8000,
});

// Categorias que o app organiza nas abas masculino/feminino
export const CATEGORIAS_MASCULINO = ["mens-shirts", "mens-shoes", "mens-watches"];
export const CATEGORIAS_FEMININO = [
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
];

// Busca os produtos de uma única categoria
async function buscarProdutosPorCategoria(categoria) {
  const resposta = await api.get(`/products/category/${categoria}`);
  return resposta.data.products;
}

// Junta os produtos de várias categorias numa lista só (usado nas abas)
export async function buscarProdutosPorGrupo(listaDeCategorias) {
  const resultados = await Promise.all(
    listaDeCategorias.map((categoria) => buscarProdutosPorCategoria(categoria))
  );
  // achata o array de arrays em uma lista única de produtos
  return resultados.flat();
}

// Busca os detalhes de um único produto pelo id
export async function buscarProdutoPorId(id) {
  const resposta = await api.get(`/products/${id}`);
  return resposta.data;
}

export default api;
