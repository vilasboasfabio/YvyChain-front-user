import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import tw from "tailwind-react-native-classnames";

export default function DetalhesEmpresa({ route }) { // Adicione "route" aqui

    const navigation = useNavigation();
    const [empresa, setEmpresa] = useState(null);
    const [id, setId] = useState(null);
    
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    
    const getEmpresa = async (id) => {
        try {
        const response = await axios.get(`${apiUrl}/empresas/${id}`);
        setEmpresa(response.data.empresa);
        console.log(response.data);
        } catch (error) {
        console.error(error);
        }
    };
    
    useEffect(() => {
        if (id) {
        getEmpresa(id);
        }
    }, [id]);
    
    useEffect(() => {
        setId(route.params.id); // Altere esta linha
    }, []);
    
    return (
        <View style={tw`flex-1 bg-white`}>
            <TouchableOpacity className={`bg-green-200`} onPress={() => navigation.navigate("VerEmpresas")}>
                <Text className={`text-lg p-4 mx-auto text-amber-900`}>Voltar</Text>
            </TouchableOpacity>
        <ScrollView style={tw`flex-1`}>
            {empresa && (
            <View style={tw`bg-gray-100 p-4 m-2 rounded-lg`}>
                <Text style={tw`text-lg font-bold`}>{empresa.nome}</Text>
                <Text style={tw`text-sm`}>{empresa.email}</Text>
                <Text style={tw`text-sm`}>Nota de impacto ambiental:</Text>
                <Text style={tw`text-sm`}>{empresa.notaPegadaEcologica}</Text>
            </View>
            )}
        </ScrollView>
        </View>
    );
    }