import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
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
    
    const parseSetores = (setoresStr) => {
        try {
            // Removendo caracteres desnecessários e convertendo para um formato tratável
            const cleanedString = setoresStr.replace(/[{}"]/g, ''); // Remove os caracteres '{', '}', e aspas
            const setoresArray = cleanedString.split("),("); // Dividindo em cada setor
            return setoresArray.map(setor => {
                const parts = setor.split(",");
                return {
                    id: parts[0].trim(),
                    nome: parts[1].trim(),
                    empresaId: parts[2].trim(),
                    notaPegadaEcologica: parts[3].trim()
                };
            });
        } catch (error) {
            console.error('Erro ao parsear setores:', error);
            return [];
        }
    };
    
    
    const getEmpresaById = async (empresaId) => {
        try {
            const response = await axios.get(`${apiUrl}/empresas/${empresaId}`);
            if (response.data.empresa) {
                const empresa = response.data.empresa;
                empresa.setores = parseSetores(empresa.setores);
                setEmpresa(empresa);
            } else {
                alert('Empresa não encontrada');
            }
        } catch (error) {
            console.error('Erro ao buscar a empresa:', error);
            alert('Erro ao acessar os detalhes da empresa');
        }
    };
    
    return (
        <View style={tw`flex-1 bg-white items-center justify-center`}>
            <Text style={tw`text-xl font-bold p-4`}>Página de Gerenciamento</Text>
            {empresa ? (
                <ScrollView style={tw`w-full`}>
                    <Text style={tw`text-lg p-2`}>Nome: {empresa.nome}</Text>
                    <Text style={tw`text-lg p-2`}>Nota de Impacto Ambiental: {empresa.notapegadaecologica}</Text>
                    <Text style={tw`text-lg p-2`}>Setores:</Text>
                    {empresa.setores && empresa.setores.map((setor, index) => (
                        <Text key={index} style={tw`text-lg p-2`}>{setor.nome}</Text>
                    ))}
                </ScrollView>
            ) : (
                <Text style={tw`text-lg p-2`}>Carregando dados da empresa...</Text>
            )}
            <FooterBottom />
        </View>
    );
}
