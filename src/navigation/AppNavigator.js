import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch, useSelector } from "react-redux";

import LoginScreen from "../screens/LoginScreen";
import ProductListScreen from "../screens/ProductListScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import { fazerLogout } from "../store/authSlice";
import { CATEGORIAS_MASCULINO, CATEGORIAS_FEMININO } from "../services/api";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Botão de logout que fica no header das abas
function BotaoLogout() {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity onPress={() => dispatch(fazerLogout())} style={{ marginRight: 12 }}>
      <Text style={{ color: "#007aff" }}>Sair</Text>
    </TouchableOpacity>
  );
}

// Abas de categorias (masculino / feminino), cada uma reaproveita a mesma tela
function AbasDeProdutos() {
  return (
    <Tab.Navigator screenOptions={{ headerRight: () => <BotaoLogout /> }}>
      <Tab.Screen
        name="Masculino"
        component={ProductListScreen}
        initialParams={{ categorias: CATEGORIAS_MASCULINO }}
      />
      <Tab.Screen
        name="Feminino"
        component={ProductListScreen}
        initialParams={{ categorias: CATEGORIAS_FEMININO }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const logado = useSelector((state) => state.auth.logado);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!logado ? (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen
              name="Tabs"
              component={AbasDeProdutos}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Detalhes"
              component={ProductDetailsScreen}
              options={{ title: "Detalhes do produto" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
