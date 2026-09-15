import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { fazerLogin } from "../store/authSlice";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const dispatch = useDispatch();

  function validarCampos() {
    if (!email.trim() || !senha.trim()) {
      return "Preenche email e senha pra continuar";
    }
    if (!email.includes("@")) {
      return "Email inválido";
    }
    if (senha.length < 4) {
      return "Senha precisa ter pelo menos 4 caracteres";
    }
    return "";
  }

  function handleLogin() {
    const mensagemErro = validarCampos();
    if (mensagemErro) {
      setErro(mensagemErro);
      return;
    }
    setErro("");
    // login é só simulado, não tem backend de autenticação real
    dispatch(fazerLogin(email));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Catálogo Mobile</Text>
      <Text style={styles.subtitulo}>Entra pra ver os produtos</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.botaoTexto}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  erro: {
    color: "red",
    marginBottom: 12,
  },
  botao: {
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 8,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
});
