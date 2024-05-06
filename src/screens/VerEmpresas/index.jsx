import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import tw from "tailwind-react-native-classnames";

export default function VerEmpresas() {
  const navigation = useNavigation();
  const [empresas, setEmpresas] = useState([]);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const getEmpresas = async () => {
    try {
      const response = await axios.get(`${apiUrl}/empresas`);
      setEmpresas(response.data.empresas);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEmpresas();
  }, []);

  return (
    <View style={tw`flex-1 bg-white`}>
      <ScrollView style={tw`flex-1`}>
        {empresas.map((empresa) => (
          <TouchableOpacity
            key={empresa._id}
            onPress={() =>
              navigation.navigate("DetalhesEmpresa", { id: empresa._id })
            }
            style={tw`bg-gray-100 p-4 m-2 rounded-lg`}
          >
            <Text style={tw`text-lg font-bold`}>{empresa.nome}</Text>
            <Text style={tw`text-sm`}>{empresa.email}</Text>
            <Text style={tw`text-sm`}>Nota de impacto ambiental:</Text>
            <Text style={tw`text-sm`}>{empresa.notaPegadaEcologica}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
