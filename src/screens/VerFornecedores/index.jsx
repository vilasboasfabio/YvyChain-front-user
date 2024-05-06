import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
  } from "react-native";
  import { useNavigation } from "@react-navigation/native";
  import axios from "axios";
  import { useState } from "react";
  import { useEffect } from "react";
  import tw from "tailwind-react-native-classnames";

    export default function VerFornecedores() {
        const navigation = useNavigation();
        const [fornecedores, setFornecedores] = useState([]);
      
        const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      
        const getFornecedores = async () => {
          try {
            const response = await axios.get(`${apiUrl}/fornecedores`);
            setFornecedores(response.data);
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        };
      
        useEffect(() => {
          getFornecedores();
        }, []);
      
        return (
          <View style={tw`flex-1 bg-white`}>
            <ScrollView style={tw`flex-1`}>
              {fornecedores.map((fornecedor) => (
                <TouchableOpacity
                  key={fornecedor._id}
                  onPress={() =>
                    navigation.navigate("DetalhesFornecedor", { id: fornecedor._id })
                  }
                  style={tw`bg-gray-100 p-4 m-2 rounded-lg`}
                >
                  <Text style={tw`text-lg font-bold`}>{fornecedor.nome}</Text>
                  <Text style={tw`text-sm`}>{fornecedor.email}</Text>
                  <Text style={tw`text-sm`}>Nota: {fornecedor.notaimpactoambiental}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        );
      }