import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import tw from 'tailwind-react-native-classnames';

const InsumoSelector = ({ onSelectionChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [displayedInsumos, setDisplayedInsumos] = useState([]);
    const [selectedInsumos, setSelectedInsumos] = useState([]);

    const fetchInsumos = async () => {
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/insumos`);
            setDisplayedInsumos(response.data.insumos);
        } catch (error) {
            console.error('Failed to fetch insumos', error);
        }
    };

    useEffect(() => {
        fetchInsumos();
    }, []);

    const handleSelectInsumo = (insumo) => {
        if (!selectedInsumos.find(item => item.id === insumo.id)) {
            const newSelection = [...selectedInsumos, insumo];
            setSelectedInsumos(newSelection);
            onSelectionChange(newSelection);
        }
    };

    const handleRemoveInsumo = (id) => {
        const newSelection = selectedInsumos.filter(item => item.id !== id);
        setSelectedInsumos(newSelection);
        onSelectionChange(newSelection);
    };

    return (
        <View>
            <View style={tw`flex-row flex-wrap`}>
                {selectedInsumos.map(insumo => (
                    <TouchableOpacity key={insumo.id} onPress={() => handleRemoveInsumo(insumo.id)} style={tw`bg-blue-200 m-1 p-1 rounded`}>
                        <Text style={tw`text-blue-800`}>{insumo.nome} ×</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TextInput
                placeholder="Buscar insumos..."
                value={searchTerm}
                onChangeText={setSearchTerm}
                style={tw`border border-gray-400 p-2 rounded`}
            />
            <FlatList
                data={displayedInsumos.filter(insumo => insumo.nome.toLowerCase().includes(searchTerm.toLowerCase()))}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleSelectInsumo(item)} style={tw`p-2 border-b border-gray-300`}>
                        <Text>{item.nome}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default InsumoSelector;
