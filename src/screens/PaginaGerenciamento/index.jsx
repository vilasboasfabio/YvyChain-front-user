import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import FooterBottom from "../../components/FooterBottom";
import tw from "tailwind-react-native-classnames";

export default function PaginaGerenciamento() {
    const navigation = useNavigation();
    const route = useRoute();
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const [empresa, setEmpresa] = useState(null);

    useEffect(() => {
        const empresaId = route.params.empresaId;
        if (empresaId) {
            getEmpresaById(empresaId);
        }
    }, [route.params.empresaId]);

    const getEmpresaById = async (empresaId) => {
        try {
            const response = await axios.get(`${apiUrl}/empresas/${empresaId}`);
            if (response.data.empresa) {
                setEmpresa(response.data.empresa);
            } else {
                alert('Empresa não encontrada');
            }
        } catch (error) {
            console.error('Erro ao buscar a empresa:', error);
            alert('Erro ao acessar os detalhes da empresa');
        }
    };

    const goToReportPage = () => {
        navigation.navigate('Relatório', { empresaId: empresa?.id });
    };

    return (
        <View style={tw`flex-1 bg-white items-center justify-center`}>
            <Text style={tw`text-xl font-bold p-4`}>Página de Gerenciamento</Text>
            {empresa ? (
                <ScrollView style={tw`w-full`}>
                    {/* Dados da empresa e setores */}
                    <TouchableOpacity style={tw`mt-5 bg-green-500 p-3 rounded-lg`} onPress={goToReportPage}>
                      
                        <Text style={tw`text-white text-center font-bold`}>Gerar relatório da empresa:{empresa.nome}</Text>
                    </TouchableOpacity>
                </ScrollView>
            ) : (
                <Text>Carregando dados da empresa...</Text>
            )}
            <FooterBottom />
        </View>
    );
}
