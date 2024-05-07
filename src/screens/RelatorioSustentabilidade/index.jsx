import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import tw from 'tailwind-react-native-classnames';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from "@expo/vector-icons";
import styles from './styles';

const RelatorioSustentabilidade = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [relatorio, setRelatorio] = useState(null);
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const { empresaId } = route.params;

    const voltarParaAPaginaDeGerenciamento = () =>{
        navigation.navigate('PaginaGerenciamento', {empresaId: empresaId});
    }
    const goToSectorsPage = () => {
        navigation.navigate("VerSetores", {empresaId: empresaId});
      };
    
      const goToProductsPage = () => {
        navigation.navigate("VerProdutos", {empresaId: empresaId});
      };

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
            <View  className={`rounded-lg -mt-10 pt-6 px-4 mb-6`} style={{
                  backgroundColor: "#EED2B8",
                }}>
                <Text style={tw`text-lg text-black text-justify mb-8`}>Olá, pude chegar os dados da sua empresa "{relatorio.empresaNome}", afreri os resultados e tirei o seguinte relatório:</Text>
                </View>
                <Text style={[
                  styles.texto2,
                  { fontFamily: "ArimaMadurai_100Thin" },
                ]} >
                    A nota de impacto ambiental da empresa é {relatorio.notaImpactoAmbiental}.
                </Text>
                <Text style={[
                  styles.texto2,
                  { fontFamily: "ArimaMadurai_100Thin" },
                ]}>
                    A média da nota de impacto ambiental dos setores é {relatorio.mediaNotaSetores}
                </Text>
                <Text style={[
                  styles.texto2,
                  { fontFamily: "ArimaMadurai_100Thin" },
                ]}>
                   Os produtos têm uma média de impcato ambiental de {relatorio.mediaNotaProdutos}
                </Text>
                <Text style={[
                  styles.texto2,
                  { fontFamily: "ArimaMadurai_100Thin" },
                ]}>
                    O setor com maior impacto ambiental é {relatorio.setorComMaiorImpacto.nome} (com a nota de: {relatorio.setorComMaiorImpacto.impacto_ambiental})
                </Text>
                <Text style={[
                  styles.texto2,
                  { fontFamily: "ArimaMadurai_100Thin" },
                ]}>
                    O setor com o melhor resultado em impacto ambiental, por sua vez, é {relatorio.setorComMenorImpacto.nome} (com a nota de: {relatorio.setorComMenorImpacto.impacto_ambiental})
                </Text>
                <Text style={[
                  styles.texto2,
                  { fontFamily: "ArimaMadurai_100Thin" },
                ]}>
                    O produto com maior impacto ambiental é {relatorio.produtoComMaiorImpacto.nome} (tendo a respectiva nota de: {relatorio.produtoComMaiorImpacto.nota_impacto_ambiental})
                </Text>
                <Text style={[
                  styles.texto2,
                  { fontFamily: "ArimaMadurai_100Thin" },
                ]}>
                    O produto com o resultado mais satisfatório em impacto ambiental foi {relatorio.produtoComMenorImpacto.nome} (e a sua nota é: {relatorio.produtoComMenorImpacto.nota_impacto_ambiental})
                </Text>
                <Text style={[
                  styles.texto2,
                  { fontFamily: "ArimaMadurai_100Thin" },
                ]}>
                    Foi possível aferir que o insumo com maior impacto ambiental foi {relatorio.insumoComMaiorImpacto.nome} (com a nota: {relatorio.insumoComMaiorImpacto.max_impacto})
                </Text>
                <Text style={[
                  styles.texto2,
                  { fontFamily: "ArimaMadurai_100Thin" },
                ]}>
                    Por fim, a média da nota do consumo de recursos na fabricação dos produtos é {relatorio.mediaConsumoRecursos}
                </Text>
                <Text style={[
                  styles.texto2,
                  { fontFamily: "ArimaMadurai_100Thin" },
                ]}>
                    Este relatório visa proporcionar uma visão clara do desempenho ambiental da empresa, destacando áreas de alta e baixa eficiência em termos de impacto ambiental.
                </Text>
            </>
        );
    };

    return (
        <View className={`p-4`} style={{ backgroundColor: "#314D27" }}>
        <ScrollView >
            <Text className={`text-xl font-bold mb-7 h-12 pt-3 rounded-lg`}  style={[styles.titulo, { fontFamily: "Aboreto_400Regular",  backgroundColor: "#EED2B8" }]}>Relatório de Sustentabilidade</Text>
            {formatRelatorio(relatorio)}
            <View>
                
                <TouchableOpacity className={`mt-5 mb-28 bg-green-500 p-3 rounded-lg`} onPress={voltarParaAPaginaDeGerenciamento} style={{
                  backgroundColor: "#EED2B8",
                }}>
                    <Text className={`text-black text-center font-bold`}>Voltar</Text>
                </TouchableOpacity>

            
            </View>
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
};

export default RelatorioSustentabilidade;
