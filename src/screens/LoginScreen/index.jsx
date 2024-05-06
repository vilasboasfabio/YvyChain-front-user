import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Aboreto_400Regular } from '@expo-google-fonts/aboreto';
import { ArimaMadurai_100Thin } from '@expo-google-fonts/arima-madurai'; // Corrigido para o nome correto, assumindo que você queria 'Arima Madurai'
import { ReemKufiFun_400Regular } from '@expo-google-fonts/reem-kufi-fun';

import axios from 'axios';
import styles from './styles';

const LoginScreen = () => {
    const [cnpj, setCnpj] = useState('');
    const [senha, setSenha] = useState('');  // senha seria o ID da empresa
    const navigation = useNavigation();
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const handleLogin = async () => {
        try {
            const response = await axios.get(`${apiUrl}/empresas/${senha}`, { params: { cnpj } });
            if (response.data.empresa) {
                clearInput();
                navigation.navigate('PaginaGerenciamento', { empresaId: senha });
            } else {
                alert('CNPJ ou senha (ID da empresa) inválidos!');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao fazer login');
        }
    };

    const clearInput = () =>[
        setCnpj(''),
        setSenha('')
    ]
    const [fontsLoaded] = useFonts({
        Aboreto_400Regular,
        ArimaMadurai_100Thin, // Corrigido para a importação correta
        ReemKufiFun_400Regular,
      });
      if (!fontsLoaded) {
          return <View><Text>Carregando fontes...</Text></View>;
        }

    return (
        <View style={styles.container}>
            <Text style={[styles.titulo, { fontFamily: 'Aboreto_400Regular' }]}>Login</Text>
            <Text style={[styles.texto,  { fontFamily: 'ReemKufiFun_400Regular' }]}>Acesse essa área da sua empresa com as respectivas credenciais</Text>
            <View style={styles.divinputs}>
            <TextInput
            style={[styles.textoinput,  { fontFamily: 'ReemKufiFun_400Regular' }]}
                placeholder="Digite o CNPJ"
                value={cnpj}
                onChangeText={setCnpj}
                keyboardType="numeric"
            />
            <TextInput
            style={[styles.textoinput,  { fontFamily: 'ReemKufiFun_400Regular' }]}
                placeholder="Digite a senha (ID da empresa)"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />
            </View>
            <TouchableOpacity 
                style={styles.botao}
                onPress={handleLogin}>
                <Text style={[styles.textobotao, { fontFamily: 'Aboreto_400Regular' }]}>Entre</Text>
            </TouchableOpacity>
            <Text style={[styles.texto,  { fontFamily: 'ReemKufiFun_400Regular' }]}>Não está no sistema?
Entre em contato com o nosso suporte</Text>
        </View>
    );
};

export default LoginScreen;
