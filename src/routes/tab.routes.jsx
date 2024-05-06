import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Category from "../screens/Category";
import Contribuition from "../screens/Contribuition";
import DetalhesEmpresa from "../screens/DetalhesEmpresa";

const Tab = createBottomTabNavigator();

const TabRoutes = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Category" component={Category} />
      <Tab.Screen name="Contribuition" component={Contribuition} />
      <Tab.Screen name="DetalhesEmpresa" component={DetalhesEmpresa} />
    </Tab.Navigator>
  );
};

export default TabRoutes;