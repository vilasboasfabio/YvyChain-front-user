import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

const FooterBottom = () => {
    const navigation = useNavigation();

    const navigateToSectors = () => {
        navigation.navigate('CadastroSetores');
    };

    const navigateToProducts = () => {
        navigation.navigate('CadastroProdutos');
    };

    const navigateToSuppliers = () => {
        navigation.navigate('VerFornecedores');
    };

    return (
        <View className={`flex-row justify-around items-center w-full bg-green-300 py-4`}>
            <TouchableOpacity style={tw`items-center`} onPress={navigateToSectors}>
                <FontAwesome name="industry" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={tw`items-center`} onPress={navigateToProducts}>
                <FontAwesome name="shopping-cart" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={tw`items-center`} onPress={navigateToSuppliers}>
                <FontAwesome name="truck" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};

export default FooterBottom;
