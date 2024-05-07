import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList } from "react-native";
import axios from "axios";
import tw from "tailwind-react-native-classnames";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

export default function VerSetores(){
    const navigation = useNavigation();
    const route = useRoute();
    const { empresaId } = route.params;
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const [sectors, setSectors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [order, setOrder] = useState('asc'); // 'asc' ou 'desc'

    useEffect(() => {
        fetchSectors();
    }, [order, searchTerm]);

    const fetchSectors = async () => {
        try {
            const response = await axios.get(`${apiUrl}/setores/empresa/${empresaId}?search=${searchTerm}&order=${order}`);
            setSectors(response.data.setores);
        } catch (error) {
            console.error('Erro ao buscar setores:', error);
        }
    };

    const voltarParaAPaginaDeGerenciamento = () =>{
        navigation.navigate('PaginaGerenciamento', {empresaId: empresaId});
    }
    const goToSectorsPage = () => {
        navigation.navigate("VerSetores",{empresaId: empresaId});
      };
    
      const goToProductsPage = () => {
        navigation.navigate("VerProdutos", {empresaId: empresaId});
      };

    return (
      <View className={`flex-1 p-4`} style={{
        backgroundColor: "#314D27",
      }}>
          <ScrollView>
          <Text className={`text-white text-2xl text-center mb-6`}>Pesquisar setores:</Text>
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
              data={sectors}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                
                <View style={{
                  flexDirection: "row",
                  alignItems: "center",
                  
                }}>
                  <Text className={`p-2 border-b border-gray-300 text-white`}>{item.nome}</Text>
                  
                  <Text className={`p-2 border-b ml-0 text-right w-64 border-gray-300 text-white`}>Nota: {item.impacto_ambiental}</Text>

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