import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "../screens/Home";
import VerEmpresas from "../screens/VerEmpresas";
import DetalhesEmpresa from "../screens/DetalhesEmpresa";

import DetalhesFornecedor from "../screens/DetalhesFornecedor";
import VerProdutos from "../screens/VerProdutos";
import StackRoutes from "./stack.routes";
import PaginaGerenciamento from "../screens/PaginaGerenciamento";
import LoginScreen from "../screens/LoginScreen";
import RelatorioSustentabilidade from "../screens/RelatorioSustentabilidade";
import { View, Image } from "react-native";
import VerSetores from "../screens/VerSetores";
import VerTodasEmpresas from "../screens/VerTodasEmpresas";

const Drawer = createDrawerNavigator();

const DrawerRoutes = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: "white",
        headerTintColor: "white",
        drawerLabelStyle: {
          color: "white",
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          headerTitle: "",
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "right" }}>
              <Image
                source={require("../../assets/logo.png")}
                style={{
                  width: 75,
                  height: 75,
                  marginLeft: 260,
                  marginBottom: 29,
                  marginTop: 18,
                }}
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: "#3B5B30",
            height: 110,
          },
          drawerStyle: {
            backgroundColor: "#3B5B30",
            textColor: "#fff",
          },
        }}
      />

      <Drawer.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: "Login",
          headerTitle: "",
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "right" }}>
              <Image
                source={require("../../assets/logo.png")}
                style={{
                  width: 75,
                  height: 75,
                  marginLeft: 260,
                  marginBottom: 20,
                  marginTop: 18,
                }}
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: "#3B5B30",
            height: 110,
          },
          drawerStyle: {
            backgroundColor: "#3B5B30",
            textColor: "#fff",
          },
        }}
      />

      <Drawer.Screen
        name="StackRoutes"
        component={StackRoutes}
        options={{
          drawerItemStyle: { height: 0 }, // Esconde o item no menu
          unmountOnBlur: true, // Desmonta a tela ao perder o foco
          title: "StackRoutes",
          headerTitle: "",
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "right" }}>
              <Image
                source={require("../../assets/logo.png")}
                style={{
                  width: 75,
                  height: 75,
                  marginLeft: 260,
                  marginBottom: 20,
                  marginTop: 18,
                }}
              />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="PaginaGerenciamento"
        component={PaginaGerenciamento}
        options={{
          title: "Gerenciamento",
          headerTitle: "",
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "right" }}>
              <Image
                source={require("../../assets/logo.png")}
                style={{
                  width: 75,
                  height: 75,
                  marginLeft: 260,
                  marginBottom: 20,
                  marginTop: 18,
                }}
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: "#3B5B30",
            height: 110,
          },
          drawerStyle: {
            backgroundColor: "#3B5B30",
            textColor: "#fff",
          },
          drawerItemStyle: { height: 0 }, // Esconde o item no menu
          unmountOnBlur: true,
        }}
      />

      <Drawer.Screen
        name="VerSetores"
        component={VerSetores}
        options={{
          title: "Home",
          headerTitle: "",
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "right" }}>
              <Image
                source={require("../../assets/logo.png")}
                style={{
                  width: 75,
                  height: 75,
                  marginLeft: 260,
                  marginBottom: 20,
                  marginTop: 18,
                }}
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: "#3B5B30",
            height: 110,
          },
          drawerStyle: {
            backgroundColor: "#3B5B30",
            textColor: "#fff",
          },
          drawerItemStyle: { height: 0 }, // Esconde o item no menu
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="VerTodasEmpresas"
        component={VerTodasEmpresas}
        options={{
          title: "Home",
          headerTitle: "",
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "right" }}>
              <Image
                source={require("../../assets/logo.png")}
                style={{
                  width: 75,
                  height: 75,
                  marginLeft: 260,
                  marginBottom: 20,
                  marginTop: 18,
                }}
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: "#3B5B30",
          },
          drawerStyle: {
            backgroundColor: "#3B5B30",
            textColor: "#fff",
          },
          drawerItemStyle: { height: 0 }, // Esconde o item no menu
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Relatório"
        component={RelatorioSustentabilidade}
        options={{
          title: "Relatório",
          headerTitle: "",
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "right" }}>
              <Image
                source={require("../../assets/logo.png")}
                style={{
                  width: 75,
                  height: 75,
                  marginLeft: 260,
                  marginBottom: 20,
                  marginTop: 18,
                }}
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: "#3B5B30",
            height: 110,
          },
          drawerStyle: {
            backgroundColor: "#3B5B30",
            textColor: "#fff",
          },
          drawerItemStyle: { height: 0 }, // Esconde o item no menu
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="VerProdutos"
        component={VerProdutos}
        options={{
          title: "VerProdutos",
          headerTitle: "",
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "right" }}>
              <Image
                source={require("../../assets/logo.png")}
                style={{
                  width: 75,
                  height: 75,
                  marginLeft: 260,
                  marginBottom: 20,
                  marginTop: 18,
                }}
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: "#3B5B30",
            height: 110,
          },
          drawerStyle: {
            backgroundColor: "#3B5B30",
            textColor: "#fff",
          },
          drawerItemStyle: { height: 0 }, // Esconde o item no menu
          unmountOnBlur: true,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;
