import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';
import tw from 'tailwind-react-native-classnames';
import { useRoute } from '@react-navigation/native';

const RelatorioSustentabilidade = () => {
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
                <Text style={tw`text-lg`}>Relatório de Sustentabilidade gerado para {relatorio.empresaNome}.</Text>
                <Text style={tw`text-lg mt-2`}>
                    Este relatório abrange diversos aspectos da sustentabilidade ambiental da empresa, incluindo análises detalhadas sobre os setores e produtos.
                </Text>
                <Text style={tw`text-lg mt-2`}>
                    A nota de impacto ambiental da empresa é {relatorio.notaImpactoAmbiental}. Abaixo estão os detalhes dos setores e produtos:
                </Text>
                <Text style={tw`text-lg mt-2`}>
                    - Média da nota de impacto ambiental dos setores: {relatorio.mediaNotaSetores}
                </Text>
                <Text style={tw`text-lg`}>
                    - Média da nota de impacto ambiental dos produtos: {relatorio.mediaNotaProdutos}
                </Text>
                <Text style={tw`text-lg mt-2`}>
                    O setor com maior impacto ambiental é {relatorio.setorComMaiorImpacto.nome} com uma nota de {relatorio.setorComMaiorImpacto.impacto_ambiental}.
                </Text>
                <Text style={tw`text-lg`}>
                    O setor com menor impacto ambiental é {relatorio.setorComMenorImpacto.nome} com uma nota de {relatorio.setorComMenorImpacto.impacto_ambiental}.
                </Text>
                <Text style={tw`text-lg mt-2`}>
                    Essas informações ajudam a identificar áreas onde a empresa pode melhorar suas práticas ambientais e reduzir o impacto no meio ambiente.
                </Text>
            </>
        );
    };

    return (
        <ScrollView style={tw`flex-1 bg-white p-4`}>
            <Text style={tw`text-xl font-bold mb-4`}>Relatório de Sustentabilidade</Text>
            {formatRelatorio(relatorio)}
        </ScrollView>
    );
};

export default RelatorioSustentabilidade;
