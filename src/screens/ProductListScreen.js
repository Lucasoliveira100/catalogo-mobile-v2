import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import ProductCard from "../components/ProductCard";
import { buscarProdutosPorGrupo } from "../services/api";

// Essa tela é usada duas vezes na navegação por abas (masculino e feminino),
// cada aba passa a sua lista de categorias via route.params.categorias
export default function ProductListScreen({ route, navigation }) {
  const { categorias } = route.params;

  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    try {
      setCarregando(true);
      setErro(false);
      const lista = await buscarProdutosPorGrupo(categorias);
      setProdutos(lista);
    } catch (e) {
      console.log("Erro ao buscar produtos:", e.message);
      setErro(true);
    } finally {
      setCarregando(false);
    }
  }

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#222" />
        <Text style={styles.textoCarregando}>Carregando produtos...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centro}>
        <Text style={styles.textoErro}>Não deu pra carregar os produtos agora.</Text>
        <Text style={styles.textoRetry} onPress={carregarProdutos}>
          Tentar de novo
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={produtos}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <ProductCard
          produto={item}
          aoClicar={() => navigation.navigate("Detalhes", { id: item.id })}
        />
      )}
      ListEmptyComponent={
        <View style={styles.centro}>
          <Text>Nenhum produto encontrado.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  textoCarregando: {
    marginTop: 8,
    color: "#666",
  },
  textoErro: {
    color: "red",
    marginBottom: 8,
    textAlign: "center",
  },
  textoRetry: {
    color: "#007aff",
    fontWeight: "bold",
  },
});
