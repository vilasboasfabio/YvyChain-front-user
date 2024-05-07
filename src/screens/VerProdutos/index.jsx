import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList } from "react-native";
import axios from "axios";
import tw from "tailwind-react-native-classnames";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

export default function VerProdutos() {
    const navigation = useNavigation();
    const route = useRoute();
    const { empresaId } = route.params;
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [order, setOrder] = useState('asc'); // 'asc' ou 'desc'

    useEffect(() => {
        fetchProducts();
    }, [order, searchTerm]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/produtos/empresa/${empresaId}?search=${searchTerm}&order=${order}`);
            setProducts(response.data.produtos);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    const voltarParaAPaginaDeGerenciamento = () =>{
        navigation.navigate('PaginaGerenciamento', {empresaId: empresaId});
    }
    const goToSectorsPage = () => {
        navigation.navigate("VerSetores", {empresaId: empresaId});
      };
    
      const goToProductsPage = () => {
        navigation.navigate("VerProdutos", {empresaId: empresaId});
      };


    return (
        <View className={`flex-1 p-4`} style={{
          backgroundColor: "#314D27",
        }}>
            <ScrollView>
            <Text className={`text-white text-2xl text-center mb-6`}>Pesquisar Produtos:</Text>
            <TextInput
                style={tw`border border-gray-300 p-2 mb-4`}
                onChangeText={text => setSearchTerm(text)}
                value={searchTerm}
            />
           <View>
            <TouchableOpacity onPress={() => setOrder(order === 'asc' ? 'desc' : 'asc')} style={{
                  backgroundColor: "#EED2B8",
                }} className={`w-52 mb-6 rounded-lg`}>
                <Text className={`p-2 border-gray-300 text-black text-center`} >Ordenar {order === 'asc' ? 'Descendente' : 'Ascendente'}</Text>
            </TouchableOpacity>
            </View>
            <FlatList
                data={products}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <View style={{
                    backgroundColor: "#EED2B8",
                  }} className={`rounded-lg p-2`}>
                  <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    
                  }} className={`mt-4`}>
                    <Text className={`p-2 border-b border-gray-800 text-black`}>{item.nome}</Text>
                    <Text className={`p-2 border-b text-right border-gray-800 w-60 text-black`}>Nota: {item.nota_impacto_ambiental}</Text>

                  </View>
                  <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    
                  }} className={`mt-4`}>
                    
                    <Text className={`p-2 border-b border-gray-800 text-black`}>Consumo de Recursos: {item.consumo_de_recursos}</Text>
                    <Text className={`p-2 border-b border-gray-800 text-black ml-1 text-right`}>Pontuação de C02:{item.emissao_de_carbono}</Text>

                  </View>
                  </View>
                )}
            />
            </ScrollView>
            <View
        className={`flex-row mx-auto -mt-20 fixed justify-around items-center w-5/6 h-14 rounded-3xl mb-10`}
        style={{ backgroundColor: '#3B5B30' }}
      >
        <TouchableOpacity className={`items-center`} onPress={goToSectorsPage}>
          <FontAwesome name="industry" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className={`items-center`} onPress={goToProductsPage}>
          <FontAwesome name="shopping-cart" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className={`items-center`} onPress={voltarParaAPaginaDeGerenciamento}>
          <FontAwesome name="truck" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
        </View>
    );
   
}