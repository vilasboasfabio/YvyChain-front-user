import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "../screens/Home";
import VerEmpresas from "../screens/VerEmpresas";
import DetalhesEmpresa from "../screens/DetalhesEmpresa";
import VerFornecedores from "../screens/VerFornecedores";
import DetalhesFornecedor from "../screens/DetalhesFornecedor";
import VerProdutos from "../screens/VerProdutos";
import StackRoutes from "./stack.routes";
import PaginaGerenciamento from "../screens/PaginaGerenciamento";
import LoginScreen from "../screens/LoginScreen";
import CustomDrawerContent from "../components/ImageDrawer";
import { ImageBackground, View, Text, Image } from 'react-native';

const Drawer = createDrawerNavigator();

const DrawerRoutes = () => {
  return (
    <Drawer.Navigator screenOptions ={{
      drawerActiveTintColor: 'white',
      headerTintColor: 'white',
    }}>
      <Drawer.Screen 
        name="Home"
        component={Home}
        options={{
          title: "Home",
          headerTitle: "",

          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'right' }}>
              <Image source={require('../../assets/logo.png')} style={{ width: 75, height: 75, marginLeft: 260, marginBottom: 20, marginTop: 18}} />
            </View>
          ),
          
          headerStyle: {
            backgroundColor: "#3B5B30",
          
            
          },
          drawerStyle: {
            backgroundColor: "#3B5B30",
            textColor: "#fff",
            
          },
        }}
      />
      <Drawer.Screen
        name="VerEmpresas"
        component={VerEmpresas}
        options={{
          headerStyle: {
            backgroundColor: "#3B5B30",
          },
          drawerStyle: {
            backgroundColor: "#3B5B30",
            textColor: "#fff",
          },
        }}
      />
      <Drawer.Screen
        name="DetalhesEmpresa"
        component={DetalhesEmpresa}
        options={{
          drawerItemStyle: { height: 0 }, // Esconde o item no menu
          unmountOnBlur: true, // Desmonta a tela ao perder o foco
        }}
      />
      <Drawer.Screen name="VerFornecedores" component={VerFornecedores} />
      <Drawer.Screen
        name="DetalhesFornecedor"
        component={DetalhesFornecedor}
        options={{
          drawerItemStyle: { height: 0 }, // Esconde o item no menu
          unmountOnBlur: true, // Desmonta a tela ao perder o foco
        }}
      />
      <Drawer.Screen name="VerProdutos" component={VerProdutos} />
      <Drawer.Screen
        name="StackRoutes"
        component={StackRoutes}
        options={{
          drawerItemStyle: { height: 0 }, // Esconde o item no menu
          unmountOnBlur: true, // Desmonta a tela ao perder o foco
        }}
      />
      <Drawer.Screen
        name="PaginaGerenciamento"
        component={PaginaGerenciamento}
      />
      <Drawer.Screen name="LoginScreen" component={LoginScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;
