import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import tw from 'tailwind-react-native-classnames';

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

    return (
        <View style={tw`flex-1 items-center justify-center p-5 bg-white`}>
            <TextInput
                style={tw`w-full mb-3 border-b border-gray-300 py-2 px-3`}
                placeholder="Digite o CNPJ"
                value={cnpj}
                onChangeText={setCnpj}
                keyboardType="numeric"
            />
            <TextInput
                style={tw`w-full mb-3 border-b border-gray-300 py-2 px-3`}
                placeholder="Digite a senha (ID da empresa)"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />
            <TouchableOpacity style={tw`w-full bg-blue-500 p-3 rounded-lg`} onPress={handleLogin}>
                <Text style={tw`text-white text-center font-bold`}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;
