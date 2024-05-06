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

    export default function DetalhesFornecedor({ route }) {
        const navigation = useNavigation();
        const { id } = route.params;
        const [fornecedor, setFornecedor] = useState({});
      
        const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      
        const getFornecedor = async () => {
          try {
            const response = await axios.get(`${apiUrl}/fornecedores/${id}`);
            setFornecedor(response.data);
            console.log("fornecedor achado:" + response.data);
          } catch (error) {
            console.error(error);
          }
        };
      
        useEffect(() => {
          getFornecedor();
        }, []);
      
        return (
          <View style={tw`flex-1 bg-white p-4`}>
            <Text style={tw`text-lg font-bold`}>{fornecedor.nome}</Text>
            <Text style={tw`text-sm`}>{fornecedor.email}</Text>
            <Text style={tw`text-sm`}>{fornecedor.cnpj}</Text>
            <Text style={tw`text-sm`}>{fornecedor.endereco}</Text>
            <Text style={tw`text-sm`}>{fornecedor.telefone}</Text>
          </View>
        );
      }
  