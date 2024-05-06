import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Input from "../../components/Input/index.jsx";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import tw from "tailwind-react-native-classnames";

export default function CadastroFornecedores() {
  const navigation = useNavigation();
  const [editId, setEditId] = useState(null);
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [fornecedores, setFornecedores] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const getFornecedores = async () => {
    try {
      const response = await axios.get(`${apiUrl}/fornecedores`);
      setFornecedores(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const postFornecedor = async () => {
    try {
      const response = await axios.post(`${apiUrl}/fornecedores`, {
        nome: nome,
        cnpj: cnpj,
        email: email,
        endereco: endereco,
        telefone: telefone,
      });
      console.log(response.data);
      getFornecedores();
      clearInputs();
    } catch (error) {
      console.error(error);
    }
  }

    const deleteFornecedor = async (id) => {
        try {
        const response = await axios.delete(`${apiUrl}/fornecedores/${id}`);
        console.log(response.data);
        getFornecedores();
        } catch (error) {
        console.error(error);
        }
    }

   const putFornecedor = async () => {
        try {
        const response = await axios.put(`${apiUrl}/fornecedores/${editId}`, {
            nome: nome,
            cnpj: cnpj,
            email: email,
            endereco: endereco,
            telefone: telefone,
        });
        console.log(response.data);
        getFornecedores();
        clearInputs();
        setIsEditing(false);
        } catch (error) {
        console.error(error);
        }
    }

    const handleEdit = (fornecedor) => {
        setEditId(fornecedor.id);
        setNome(fornecedor.nome);
        setCnpj(fornecedor.cnpj);
        setEmail(fornecedor.email);
        setEndereco(fornecedor.endereco);
        setTelefone(fornecedor.telefone);
        setIsEditing(true);
    }



    useEffect(() => {
        getFornecedores();
    }, []);

  const clearInputs = () => {
    setNome("");
    setCnpj("");
    setEmail("");
    setEndereco("");
    setTelefone("");
  };

    return (
        <View style={tw`flex-1 bg-white`}>
        <ScrollView style={tw`flex-1`}>
            <View style={tw`p-4`}>
            <Input
                label="Nome"
                value={nome}
                onChangeText={setNome}
            />
            <Input
                label="CNPJ"
                value={cnpj}
                onChangeText={setCnpj}
            />
            <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
            />
            <Input
                label="Endereço"
                value={endereco}
                onChangeText={setEndereco}
            />
            <Input
                label="Telefone"
                value={telefone}
                onChangeText={setTelefone}
            />
            <TouchableOpacity
                style={tw`bg-green-200 p-4 m-2 rounded-lg`}
                onPress={isEditing ? putFornecedor : postFornecedor}
            >
                <Text style={tw`text-lg text-amber-900`}>
                {isEditing ? "Editar" : "Cadastrar"}
                </Text>
            </TouchableOpacity>
            </View>
            {fornecedores.map((fornecedor) => (
            <TouchableOpacity
                key={fornecedor._id}
                onPress={() => handleEdit(fornecedor)}
                style={tw`bg-gray-100 p-4 m-2 rounded-lg`}
            >
                <Text style={tw`text-lg font-bold`}>{fornecedor.nome}</Text>
                <Text style={tw`text-sm`}>{fornecedor.email}</Text>
                <Text style={tw`text-sm`}>Nota de impacto ambiental:</Text>
                <Text style={tw`text-sm`}>{fornecedor.notaImpactoAmbiental}</Text>
                <TouchableOpacity
                style={tw`bg-red-200 p-2 m-2 rounded-lg`}
                onPress={() => deleteFornecedor(fornecedor.id)}
                >
                <Text style={tw`text-lg text-amber-900`}>Excluir</Text>
                </TouchableOpacity>
            </TouchableOpacity>
            ))}
        </ScrollView>
        </View>
    );

}
