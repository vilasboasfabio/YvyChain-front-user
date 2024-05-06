import { View, Text } from 'react-native';
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
    <View className={`flex-1 items-center`} style={[styles.container, {backgroundColor: '#314D27'}]}>
      <Text style={[styles.titulo, { fontFamily: 'Aboreto_400Regular' }]} className={`text-3xl`}>Bem Vindos</Text>
    </View>
  )
}