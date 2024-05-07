import { View, Text, Image, ScrollView } from "react-native";
import styles from "./styles";
import Title from "../../components/Title";
import { useFonts } from "expo-font";
import { Aboreto_400Regular } from "@expo-google-fonts/aboreto";
import { ArimaMadurai_100Thin } from "@expo-google-fonts/arima-madurai"; // Corrigido para o nome correto, assumindo que você queria 'Arima Madurai'
import { ReemKufiFun_400Regular } from "@expo-google-fonts/reem-kufi-fun";


export default function Home() {
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
    <ScrollView>
      <View
        className={`flex-1 items-center `}
        style={[styles.container, { backgroundColor: "#314D27" }]}
      >
        <Text
          style={[styles.titulo, { fontFamily: "Aboreto_400Regular" }]}
          className={`text-3xl text-white my-9`}
        >
          Bem Vindos
        </Text>

        <View style={{ marginTop: 5 }}>
          <View
            style={[
              styles.cards,
              {
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "#EED2B8",
                width: 370,
                borderRadius: 8,
              },
            ]}
            className={`-ml-5`}
          >
            <Image
              source={require("../../../assets/mata.jpg")}
              style={{ width: 160, height: 240, marginRight: 10 }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "ReemKufiFun_400Regular",
                  marginBottom: 5,
                  textAlign: "center",
                  marginTop: 40,
                  marginBottom: 30,
                }}
              >
                Nossa Proposta
              </Text>
              <Text
                style={{ flexWrap: "wrap", fontFamily: "ArimaMadurai_100Thin" }}
                className={`text-justify w-5/6 ml-2`}
              >
                Conheça nossa missão e solução sustentável para o
                desenvolvimento humano.
              </Text>
            </View>
          </View>

          <View
            style={{ alignItems: "center", marginTop: 20, marginBottom: 20 }}
          >
            <Image
              source={require("../../../assets/folhinha1.png")}
              style={{ width: 70, height: 70 }}
            />
          </View>

          <View
            style={[
              styles.cards,
              {
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "#EED2B8",
                width: 370,
                borderRadius: 8,
              },
            ]}
            className={`ml-12`}
          >
            <Image
              source={require("../../../assets/tucano.jpg")}
              style={{ width: 160, height: 240, marginRight: 10, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, }}
            />
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "ReemKufiFun_400Regular",
                  marginBottom: 5,
                  textAlign: "center",
                  marginTop: 40,
                  marginBottom: 30,
                }}
              >
                Sua Contribuição
              </Text>
              <Text
                style={{ flexWrap: "wrap", fontFamily: "ArimaMadurai_100Thin" }}
                className={`w-5/6 text-justify mr-2`}
              >
                Entenda como sua colaboração nesse projeto pode promover o
                desenvolvimento.
              </Text>
            </View>
          </View>

          <View
            style={{ alignItems: "center", marginTop: 20, marginBottom: 20 }}
          >
            <Image
              source={require("../../../assets/folhinha2.png")}
              style={{ width: 70, height: 70 }}
            />
          </View>

          <View
            style={[
              styles.cards,
              {
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "#EED2B8",
                width: 370,
                borderRadius: 8,
              },
            ]}
          >
            <Image
              source={require("../../../assets/yvy1.jpg")}
              style={{ width: 160, height: 240, marginRight: 10 }}
            />
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "ReemKufiFun_400Regular",
                  marginBottom: 5,
                  textAlign: "center",
                  marginTop: 40,
                  marginBottom: 30,
                }}
              >
                Conheça a Yvy
              </Text>
              <Text
                style={{ flexWrap: "wrap", fontFamily: "ArimaMadurai_100Thin" }}
                className={`text-justify`}
              >
                A nossa inteligência capaz de rastrear a pegada ecológica e a
                classificação de desenvolvimento da sua empresa.
              </Text>
            </View>
          </View>
        </View>

        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{
              flexWrap: "wrap",
              fontFamily: "ArimaMadurai_100Thin",
              marginBottom: 5,
              marginRight: 20,
              marginLeft: 20,
              marginTop: 40,
              marginBottom: 40,
              color: 'white'
            }}
            className={`text-justify`}
          >
            O projeto YvyChain é um sistema ambicioso que busca integrar
            sustentabilidade profundamente nos processos de produção industrial.
            Por meio de análises detalhadas e monitoramento contínuo, visa não
            apenas reduzir o impacto ambiental, mas também promover práticas de
            produção mais conscientes e responsáveis, alinhadas com os objetivos
            globais de sustentabilidade.
          </Text>
        </View>

      </View>
    </ScrollView>
  );
}
