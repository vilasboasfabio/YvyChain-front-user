import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Input from "../../components/Input/index.jsx";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import tw from "tailwind-react-native-classnames";

export default function CadastroEmpresa() {
  const navigation = useNavigation();
  const [editId, setEditId] = useState(null);
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [notaPegadaEcologica, setNotaPegadaEcologica] = useState(0);
  const [empresas, setEmpresas] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const getEmpresas = async () => {
    try {
      const response = await axios.get(`${apiUrl}/empresas`);
      setEmpresas(response.data.empresas);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const postEmpresa = async () => {
    try {
      const response = await axios.post(`${apiUrl}/empresas`, {
        nome: nome,
        cnpj: cnpj,
        email: email,
        endereco: endereco,
        telefone: telefone,
        notaPegadaEcologica: notaPegadaEcologica,
      });
      console.log(response.data);
      getEmpresas();
      clearInputs();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEmpresa = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/empresas/${id}`);
      console.log(response.data);
      getEmpresas();
    } catch (error) {
      console.error(error);
    }
  };

  const putEmpresas = async (id) => {
    try {
      const response = await axios.put(`${apiUrl}/empresas/${id}`, {
        nome: nome,
        cnpj: cnpj,
        email: email,
        endereco: endereco,
        telefone: telefone,
      });
      //consolar o id para ver se está pegando
      console.log(id);

      getEmpresas();
      setIsEditing(false);
      clearInputs();

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fillInputs = (empresa) => {
    setIsEditing(true);
    setNome(empresa.nome);
    setCnpj(empresa.cnpj);
    setEmail(empresa.email);
    setEndereco(empresa.endereco);
    setTelefone(empresa.telefone);
    setNotaPegadaEcologica(empresa.notaPegadaEcologica);
    setEditId(empresa.id); // Salva o ID para usar no PUT
  };

  const clearInputs = () => {
    setNome("");
    setCnpj("");
    setEmail("");
    setEndereco("");
    setTelefone("");
    setNotaPegadaEcologica(0);
    setEditId(null); // Limpa o ID ao limpar os inputs
  };

  useEffect(() => {
    getEmpresas();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#EED2B8" }}>
      <TouchableOpacity
        className={`bg-green-200 py-2 rounded-lg w-80 mx-auto my-8`}
        onPress={() => navigation.navigate("Home")}
      >
        <Text className={`text-black text-center`}>Voltar</Text>
      </TouchableOpacity>
      <Text style={tw`text-2xl font-bold text-center mb-4`}>
        Cadastro de Empresa
      </Text>
      <View className={`mb-4 w-80 mx-auto`}>
        <Input
          label="Nome"
          value={nome}
          onChangeText={setNome}
          style={tw`w-full`}
        />

        <Input
          label="CNPJ"
          value={cnpj}
          onChangeText={setCnpj}
          style={tw`w-full mt-4`}
        />

        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={tw`w-full mt-4`}
        />

        <Input
          label="Endereço"
          value={endereco}
          onChangeText={setEndereco}
          style={tw`w-full mt-4`}
        />

        <Input
          label="Telefone"
          value={telefone}
          onChangeText={setTelefone}
          style={tw`w-full mt-4`}
        />
      </View>
      {isEditing ? (
        <TouchableOpacity
          className={`bg-green-200 py-2 rounded-lg`}
          onPress={() => putEmpresas(editId)}
        >
          <Text className={`text-black text-center`}>Editar Empresa</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className={`bg-green-200 py-2 rounded-lg w-80 mx-auto`}
          onPress={postEmpresa}
        >
          <Text className={`text-black text-center`}>Cadastrar Empresa</Text>
        </TouchableOpacity>
      )}
      
    </ScrollView>
  );
}
