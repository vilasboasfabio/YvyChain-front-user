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
        <View style={tw`flex-1 bg-white p-4`}>
            <ScrollView>
            <TextInput
                style={tw`border border-gray-300 p-2 mb-4`}
                placeholder="Pesquisar produtos"
                onChangeText={text => setSearchTerm(text)}
                value={searchTerm}
            />
            <TouchableOpacity onPress={() => setOrder(order === 'asc' ? 'desc' : 'asc')}>
                <Text>Ordenar {order === 'asc' ? 'Descendente' : 'Ascendente'}</Text>
            </TouchableOpacity>
            <FlatList
                data={products}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Text style={tw`p-2 border-b border-gray-300`}>{item.nome}</Text>
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