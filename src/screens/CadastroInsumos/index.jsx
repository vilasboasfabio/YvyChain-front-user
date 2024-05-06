import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Input from "../../components/Input/index.jsx";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import tw from "tailwind-react-native-classnames";

export default function CadastroInsumos() {

    const navigation = useNavigation();
    const [editId, setEditId] = useState(null);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [notaemissaodeco2, setNotaemissaodeco2] = useState("");
    const [fornecedorResponsavel, setFornecedorresponsavel] = useState("");
    const [pegadaEcologica, setPegadaecologica] = useState("");
    const [insumos, setInsumos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const getInsumos = async () => {
        try {
            const response = await axios.get(`${apiUrl}/insumos`);
            setInsumos(response.data.insumos);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const postInsumo = async () => {
        try {
            const response = await axios.post(`${apiUrl}/insumos`, {
                nome: nome,
                descricao: descricao,
                preco: preco,
                notaemissaodeco2: notaemissaodeco2,
                fornecedorResponsavel: fornecedorResponsavel,
                pegadaEcologica: pegadaEcologica,
            });
            console.log(response.data);
            getInsumos();
            clearInputs();
        } catch (error) {
            console.error(error);
        }
    }

    const deleteInsumo = async (id) => {
        try {
            const response = await axios.delete(`${apiUrl}/insumos/${id}`);
            console.log(response.data);
            getInsumos();
        } catch (error) {
            console.error(error);
        }
    }

    const clearInputs = () => {
        setNome("");
        setDescricao("");
        setPreco("");
        setNotaemissaodeco2("");
        setFornecedorresponsavel("");
        setPegadaecologica("");
    }

    const putInsumo = async () => {
        try {
            const response = await axios.put(`${apiUrl}/insumos/${editId}`, {
                nome: nome,
                descricao: descricao,
                preco: preco,
                notaemissaodeco2: notaemissaodeco2,
                fornecedorResponsavel: fornecedorResponsavel,
                pegadaEcologica: pegadaEcologica,
            });
            console.log(response.data);
            getInsumos();
            clearInputs();
            setIsEditing(false);
        } catch (error) {
            console.error(error);
        }
    }

    const handleEdit = (insumo) => {
        setEditId(insumo.id);
        setNome(insumo.nome);
        setDescricao(insumo.descricao);
        setPreco(insumo.preco);
        setNotaemissaodeco2(insumo.notaemissaodeco2);
        setFornecedorresponsavel(insumo.fornecedorResponsavel);
        setPegadaecologica(insumo.pegadaEcologica);
        setIsEditing(true);
    }

    useEffect(() => {
        getInsumos();
    }, []);

    return (
        <View style={tw`flex-1 bg-white p-4`}>
            <Text style={tw`text-lg font-bold`}>Cadastro de Insumos</Text>
            <ScrollView>
                <Input
                    label="Nome"
                    value={nome}
                    onChangeText={setNome}
                />
                <Input
                    label="Descrição"
                    value={descricao}
                    onChangeText={setDescricao}
                />
                <Input
                    label="Preço"
                    value={preco}
                    onChangeText={setPreco}
                />
                <Input
                    label="Nota de emissão de CO2"
                    value={notaemissaodeco2}
                    onChangeText={setNotaemissaodeco2}
                />
                <Input
                    label="Fornecedor Responsável"
                    value={fornecedorResponsavel}
                    onChangeText={setFornecedorresponsavel}
                />
                <Input
                    label="Pegada Ecológica"
                    value={pegadaEcologica}
                    onChangeText={setPegadaecologica}
                />
                <TouchableOpacity
                    style={tw`bg-blue-500 py-2 mt-4 rounded items-center`}
                    onPress={() => {
                        if (isEditing) {
                            putInsumo();
                        } else {
                            postInsumo();
                        }
                    }}
                >
                    <Text style={tw`text-white`}>
                        {isEditing ? "Editar" : "Cadastrar"}
                    </Text>
                </TouchableOpacity>
                <View style={tw`mt-4`}>
                    {insumos.map((insumo) => (
                        <View key={insumo.id} style={tw`flex-row justify-between items-center border-b border-gray-300 py-2`}>
                            <Text>{insumo.nome}</Text>
                            <View style={tw`flex-row`}>
                                <TouchableOpacity
                                    style={tw`bg-green-500 py-1 px-2 rounded items-center`}
                                    onPress={() => handleEdit(insumo)}
                                >
                                    <Text style={tw`text-white`}>Editar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={tw`bg-red-500 py-1 px-2 rounded items-center ml-2`}
                                    onPress={() => deleteInsumo(insumo.id)}
                                >
                                    <Text style={tw`text-white`}>Deletar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </View>
    );
}
