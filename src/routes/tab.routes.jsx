import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/Home";
import DetalhesEmpresa from "../screens/DetalhesEmpresa";

const Tab = createBottomTabNavigator();

const TabRoutes = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="DetalhesEmpresa" component={DetalhesEmpresa} />
    </Tab.Navigator>
  );
};

export default TabRoutes;