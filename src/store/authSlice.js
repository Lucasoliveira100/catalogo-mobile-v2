import { createSlice } from "@reduxjs/toolkit";

const estadoInicial = {
  logado: false,
  usuario: null, // guarda só o email digitado, é só uma simulação de login
};

const authSlice = createSlice({
  name: "auth",
  initialState: estadoInicial,
  reducers: {
    fazerLogin: (state, action) => {
      state.logado = true;
      state.usuario = action.payload;
    },
    fazerLogout: (state) => {
      // limpa os dados guardados, como pede o requisito de logout
      state.logado = false;
      state.usuario = null;
    },
  },
});

export const { fazerLogin, fazerLogout } = authSlice.actions;
export default authSlice.reducer;
