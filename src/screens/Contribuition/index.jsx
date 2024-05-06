import { View, Text, Image, ScrollView } from 'react-native';
import styles from './styles';
import Title from '../../components/Title';

export default function Contribuition() {
  return (
    <View style={styles.container}>
      <Title  style={styles.title} title={"SUA CONTRIBUIÇÃO"}/>
            <Text style={styles.subtitulo}>Como a sua participação no projeto pode contribuir para o meio ambiente sustentavel e um desenvolvimento humano melhor?</Text>
        <ScrollView>
        <View style={styles.divgrande}>
            <View style={styles.divpequena}>
                <Image source={require('../../../assets/maos.jpg')} style={styles.image}/>
                <Text style={styles.textodiv}>Sua participação em nosso projeto promove sustentabilidade ambiental e desenvolvimento humano.</Text>
            </View>
            <View style={styles.divpequena}>
                <Image source={require('../../../assets/broto.jpg')} style={styles.image}/>
                <Text style={styles.textodiv}>Além disso, seu envolvimento contribui para uma educação mais inclusiva e capacita as pessoas.</Text>
            </View>
            <View style={styles.divpequena}>
                <Image source={require('../../../assets/robo.jpg')} style={styles.image}/>
                <Text style={styles.textodiv}>Além disso, seu envolvimento contribui para uma educação mais inclusiva e capacita as pessoas.</Text>
            </View>
        </View>
                <View style={styles.subdiv}>
                    <Text style={styles.textosubdiv}>A sua contribuição é muito importante para nós. Juntos, podemos fazer a diferença!</Text>
                    <Image source={require('../../../assets/ivychain.png')} style={styles.image2}/>
                </View>
        </ScrollView>
    </View>
  )
}