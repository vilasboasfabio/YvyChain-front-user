import { View, Text, Image } from 'react-native';
import styles from './styles';
import Title from '../../components/Title';
import { useFonts } from 'expo-font';
import { Aboreto_400Regular } from '@expo-google-fonts/aboreto';
import { ArimaMadurai_100Thin } from '@expo-google-fonts/arima-madurai'; // Corrigido para o nome correto, assumindo que você queria 'Arima Madurai'
import { ReemKufiFun_400Regular } from '@expo-google-fonts/reem-kufi-fun';

export default function Home() {
  const [fontsLoaded] = useFonts({
    Aboreto_400Regular,
    ArimaMadurai_100Thin, // Corrigido para a importação correta
    ReemKufiFun_400Regular,
  });
  if (!fontsLoaded) {
      return <View><Text>Carregando fontes...</Text></View>;
    }

  return (
    <View className={`flex-1 items-center `} style={[styles.container, {backgroundColor: '#314D27'}]}>
      <Text style={[styles.titulo, { fontFamily: 'Aboreto_400Regular' }]} className={`text-3xl text-white my-9`}>Bem Vindos</Text>

      <View style={{  marginTop: 5 }}>
       <View style={[styles.cards, { flexDirection: "row", justifyContent: "center", backgroundColor: '#EED2B8', width: 370, borderRadius: 8}]}>
         <Image source={require('../../../assets/mata.jpg')} style={{ width: 160, height: 240, marginRight: 10}} />
           <View style={{ flex: 1 }}>
             <Text style={{ fontFamily: 'ReemKufiFun_400Regular', marginBottom: 5, textAlign: 'center', marginTop: 40, marginBottom: 30 }}>Nossa Proposta</Text>
             <Text style={{ flexWrap: 'wrap', fontFamily: 'ArimaMadurai_100Thin' }}>Conheça nossa missão e solução sustentável para o desenvolvimento humano</Text>
    </View>
  </View>
</View>

    </View>
  )
}