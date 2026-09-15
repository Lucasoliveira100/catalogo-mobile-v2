import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { buscarProdutoPorId } from "../services/api";

export default function ProductDetailsScreen({ route }) {
  const { id } = route.params;

  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarProdutoPorId(id)
      .then(setProduto)
      .catch((e) => console.log("Erro ao buscar detalhes:", e.message))
      .finally(() => setCarregando(false));
  }, [id]);

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#222" />
      </View>
    );
  }

  if (!produto) {
    return (
      <View style={styles.centro}>
        <Text>Não achei esse produto.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: produto.thumbnail }} style={styles.imagem} />
      <Text style={styles.nome}>{produto.title}</Text>

      <View style={styles.linhaPreco}>
        <Text style={styles.preco}>${produto.price}</Text>
        {produto.discountPercentage ? (
          <Text style={styles.desconto}>-{produto.discountPercentage}%</Text>
        ) : null}
      </View>

      <Text style={styles.descricao}>{produto.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imagem: {
    width: "100%",
    height: 220,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
    marginBottom: 16,
  },
  nome: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  linhaPreco: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  preco: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  desconto: {
    color: "green",
    fontWeight: "bold",
  },
  descricao: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
});
