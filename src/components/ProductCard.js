import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function ProductCard({ produto, aoClicar }) {
  return (
    <TouchableOpacity style={styles.card} onPress={aoClicar}>
      <Image source={{ uri: produto.thumbnail }} style={styles.imagem} />
      <View style={styles.info}>
        <Text style={styles.nome} numberOfLines={2}>
          {produto.title}
        </Text>
        <Text style={styles.preco}>${produto.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  imagem: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 12,
    backgroundColor: "#f2f2f2",
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 14,
    marginBottom: 4,
  },
  preco: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
});
