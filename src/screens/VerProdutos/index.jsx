import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import tw from "tailwind-react-native-classnames";

export default function VerProdutos() {

    const navigation = useNavigation();
    const [produtos, setProdutos] = useState([]);

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const getProdutos = async () => {
        try {
            const response = await axios.get(`${apiUrl}/produtos`);
            setProdutos(response.data.produtos);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getProdutos();
    }, []);

    return (
        <View style={tw`flex-1 bg-white p-4`}>
            <Text style={tw`text-lg font-bold`}>Produtos</Text>
            <ScrollView>
                {produtos.map((produto) => (
                    <TouchableOpacity
                        key={produto.id}
                        style={tw`border-b border-gray-200 p-4`}
                        onPress={() => navigation.navigate("DetalhesProduto", { id: produto.id })}
                    >
                        <Text style={tw`text-lg font-bold`}>{produto.nome}</Text>
                        <Text style={tw`text-sm`}>{produto.descricao}</Text>
                        <Text style={tw`text-sm`}>{produto.preco}</Text>
                        <Text style={tw`text-sm`}>{produto.estoque}</Text>
                        <Text style={tw`text-sm`}>{produto.empresa_id}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}