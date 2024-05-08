import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import { useFonts } from "expo-font";
import { Aboreto_400Regular } from "@expo-google-fonts/aboreto";
import { ArimaMadurai_100Thin } from "@expo-google-fonts/arima-madurai"; // Corrigido para o nome correto, assumindo que você queria 'Arima Madurai'
import { ReemKufiFun_400Regular } from "@expo-google-fonts/reem-kufi-fun";
import styles from "./styles";

export default function PaginaGerenciamento() {
  const navigation = useNavigation();
  const route = useRoute();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const [empresa, setEmpresa] = useState(null);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const [timeParts, setTimeParts] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const empresaId = route.params.empresaId;
    if (empresaId) {
      getEmpresaById(empresaId);
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer); // Limpar o intervalo quando o componente for desmontado
  }, [route.params.empresaId]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setTimeParts({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer); // Limpar o intervalo quando o componente for desmontado
  }, []);

  const getEmpresaById = async (empresaId) => {
    try {
      const response = await axios.get(`${apiUrl}/empresas/${empresaId}`);
      if (response.data.empresa) {
        setEmpresa(response.data.empresa);
      } else {
        alert("Empresa não encontrada");
      }
    } catch (error) {
      console.error("Erro ao buscar a empresa:", error);
      alert("Erro ao acessar os detalhes da empresa");
    }
  };

  const goToReportPage = () => {
    navigation.navigate("Relatório", { empresaId: empresa?.id });
  };

  const greetingTime = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const goToSectorsPage = () => {
    navigation.navigate("VerSetores", { empresaId: empresa.id });
  };

  const goToProductsPage = () => {
    navigation.navigate("VerProdutos", { empresaId: empresa.id });
  };

  const voltarParaAPaginaDeGerenciamento = () => {
    navigation.navigate("PaginaGerenciamento", { empresaId: empresaId });
  };

  const [fontsLoaded] = useFonts({
    Aboreto_400Regular,
    ArimaMadurai_100Thin, // Corrigido para a importação correta
    ReemKufiFun_400Regular,
  });
  if (!fontsLoaded) {
    return (
      <View>
        <Text>Carregando fontes...</Text>
      </View>
    );
  }

  return (
    <View
      className={`flex-1 items-center justify-center -mb-2`}
      style={{ backgroundColor: "#314D27" }}
    >
      <ScrollView>
        <Text
          className={`mb-4 mt-8 text-white`}
          style={[styles.titulo, { fontFamily: "Aboreto_400Regular" }]}
        >
          {greetingTime()}, bem-vindo à página de gerenciamento!
        </Text>
        {empresa ? (
          <ScrollView className={`w-full`}>
            <View className={`w-96 mx-auto text-center mb-8 mt-8`}>
              <Text
                className={`text-lg text-center  font-semibold mb-2 text-white`}
                style={[
                  styles.textoinput,
                  { fontFamily: "ArimaMadurai_100Thin" },
                ]}
              >
                Gerenciar Empresa: {empresa.nome}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  
                }}
                className={` w-96 mx-auto`}
              >
                <View  className={`rounded-lg`} style={{
                  backgroundColor: "#EED2B8",
                }}>
                  <Text
                    className={`text-base mb-1 text-black text-center `}
                    style={[
                      styles.texto2,
                      { fontFamily: "ReemKufiFun_400Regular" },
                    ]}
                  >
                    CNPJ: {empresa.cnpj}
                  </Text>
                  <Text
                    className={`text-base mb-1 text-black text-center `}
                    style={[
                      styles.texto2,
                      { fontFamily: "ReemKufiFun_400Regular" },
                    ]}
                  >
                    Endereço: {empresa.endereco}
                  </Text>
                  <Text
                    className={`text-base mb-1 text-black text-center `}
                    style={[
                      styles.texto2,
                      { fontFamily: "ReemKufiFun_400Regular" },
                    ]}
                  >
                    Email: {empresa.email}
                  </Text>
                  <Text
                    className={`text-base mb-1 text-black text-center `}
                    style={[
                      styles.texto2,
                      { fontFamily: "ReemKufiFun_400Regular" },
                    ]}
                  >
                    Telefone: {empresa.telefone}
                  </Text>
                </View>
                <View className={`ml-10`}>
                  <Text
                    className={`text-lg text-white`}
                    style={[{ fontFamily: "ReemKufiFun_400Regular" }]}
                  >
                    H: {timeParts.hours}
                  </Text>
                  <Text
                    className={`text-lg text-white`}
                    style={[{ fontFamily: "ReemKufiFun_400Regular" }]}
                  >
                    M: {timeParts.minutes}
                  </Text>
                  <Text
                    className={`text-lg text-white`}
                    style={[{ fontFamily: "ReemKufiFun_400Regular" }]}
                  >
                    S: {timeParts.seconds}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
              }}
              className={`rounded-lg w-96 mx-auto`}
            >
              <Image
                source={require("../../../assets/ivychain.png")}
                style={{
                  width: 50,
                  height: 200,
                  marginLeft: 30,
                  marginRight: 20,
                  marginBottom: 20,
                  marginTop: 18,
                }}
              />
              <Text
                className={` w-2/3 text-justify p-8 rounded-lg`}
                style={[
                  styles.texto2,
                  { fontFamily: "ReemKufiFun_400Regular",
                alignItems: "center",
                backgroundColor: "#EED2B8",
                },
                  
                ]}
              >
                Quer saber como sua empresa está se saindo no compromisso da
                sustentabilidade? É só pedir para a Yvy gerar um relatório de
                sustentabilidade para você!
              </Text>
            </View>
            <TouchableOpacity
              className={`mt-5 bg-green-700 p-3 rounded-lg w-96 mx-auto mb-28`}
              onPress={goToReportPage}
              style={{ backgroundColor: "#44221F" }}
            >
              <Text className={`text-white text-center font-bold`}>
                Gerar relatório de sustentabilidade
              </Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <Text>Carregando dados da empresa...</Text>
        )}
      </ScrollView>
      <View
        className={`flex-row mx-auto -mt-20 fixed justify-around items-center w-5/6 h-14 rounded-3xl mb-10`}
        style={{ backgroundColor: "#3B5B30" }}
      >
        <TouchableOpacity className={`items-center`} onPress={goToSectorsPage}>
          <FontAwesome name="folder" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className={`items-center`} onPress={goToProductsPage}>
          <FontAwesome name="product-hunt" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          className={`items-center`}
          onPress={voltarParaAPaginaDeGerenciamento}
        >
          <FontAwesome name="industry" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
