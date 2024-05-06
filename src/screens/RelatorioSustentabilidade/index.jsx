import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import tw from 'tailwind-react-native-classnames';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const RelatorioSustentabilidade = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [relatorio, setRelatorio] = useState(null);
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    useEffect(() => {
        const fetchDadosRelatorio = async () => {
            const { empresaId } = route.params;
            try {
                const response = await axios.get(`${apiUrl}/empresas/relatorio/${empresaId}`);
                setRelatorio(response.data);
            } catch (error) {
                console.error('Erro ao buscar relatório:', error);
            }
        };

        fetchDadosRelatorio();
    }, [route.params]);

    const formatRelatorio = (relatorio) => {
        if (!relatorio) return <Text>Carregando relatório...</Text>;

        return (
            <>
                <Text style={tw`text-lg`}>Relatório de Sustentabilidade elaborado para {relatorio.empresaNome}.</Text>
                <Text style={tw`text-lg mt-2`}>
                    A nota de impacto ambiental da empresa é {relatorio.notaImpactoAmbiental}.
                </Text>
                <Text style={tw`text-lg mt-2`}>
                    Média da nota de impacto ambiental dos setores: {relatorio.mediaNotaSetores}
                </Text>
                <Text style={tw`text-lg`}>
                    Média da nota de impacto ambiental dos produtos: {relatorio.mediaNotaProdutos}
                </Text>
                <Text style={tw`text-lg mt-2`}>
                    Setor com maior impacto ambiental: {relatorio.setorComMaiorImpacto.nome} (Nota: {relatorio.setorComMaiorImpacto.impacto_ambiental})
                </Text>
                <Text style={tw`text-lg`}>
                    Setor com menor impacto ambiental: {relatorio.setorComMenorImpacto.nome} (Nota: {relatorio.setorComMenorImpacto.impacto_ambiental})
                </Text>
                <Text style={tw`text-lg mt-2`}>
                    Produto com maior impacto ambiental: {relatorio.produtoComMaiorImpacto.nome} (Nota: {relatorio.produtoComMaiorImpacto.nota_impacto_ambiental})
                </Text>
                <Text style={tw`text-lg`}>
                    Produto com menor impacto ambiental: {relatorio.produtoComMenorImpacto.nome} (Nota: {relatorio.produtoComMenorImpacto.nota_impacto_ambiental})
                </Text>
                <Text style={tw`text-lg mt-2`}>
                    Insumo com maior impacto ambiental: {relatorio.insumoComMaiorImpacto.nome} (Nota: {relatorio.insumoComMaiorImpacto.max_impacto})
                </Text>
                <Text style={tw`text-lg mt-2`}>
                    Média de consumo de recursos dos produtos: {relatorio.mediaConsumoRecursos}
                </Text>
                <Text style={tw`text-lg mt-2`}>
                    Este relatório visa proporcionar uma visão clara do desempenho ambiental da empresa, destacando áreas de alta e baixa eficiência em termos de impacto ambiental.
                </Text>
            </>
        );
    };

    return (
        <ScrollView style={tw`flex-1 bg-white p-4`}>
            <Text style={tw`text-xl font-bold mb-4`}>Relatório de Sustentabilidade</Text>
            {formatRelatorio(relatorio)}
            <View>
                
                <TouchableOpacity style={tw`mt-5 bg-green-500 p-3 rounded-lg`} onPress={() =>  navigation.navigate('Home')}>
                    <Text style={tw`text-white text-center font-bold`}>Voltar</Text>
                </TouchableOpacity>

            
            </View>
        </ScrollView>
    );
};

export default RelatorioSustentabilidade;
