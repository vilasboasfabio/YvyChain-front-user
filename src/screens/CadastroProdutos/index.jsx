import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Input from "../../components/Input/index.jsx";
import InsumoSelector from "../../components/InsumoSelector/index.jsx";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import tw from "tailwind-react-native-classnames";

export default function CadastroProdutos() {
  const navigation = useNavigation();
  const [editId, setEditId] = useState(null);
  const [nome, setNome] = useState("");
  const [setorResponsavel, setSetorresponsavel] = useState("");
  const [selectedInsumos, setSelectedInsumos] = useState([]);
  const [consumoDeRecursos, setConsumoderecursos] = useState("");
  const [emissaoDeCarbono, setEmissaodecarbono] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const getProdutos = async () => {
    try {
      const response = await axios.get(`${apiUrl}/produtos`);
      setProdutos(response.data.produtos);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const postProduto = async () => {
    try {
      const response = await axios.post(`${apiUrl}/produtos`, {
        nome: nome,
        setorResponsavel: setorResponsavel,
        insumos: selectedInsumos, // Envia os IDs dos insumos selecionados
        consumoDeRecursos: consumoDeRecursos,
        emissaoDeCarbono: emissaoDeCarbono,
      });
      console.log(response.data);
      getProdutos();
      clearInputs();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduto = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/produtos/${id}`);
      console.log(response.data);
      getProdutos();
    } catch (error) {
      console.error(error);
    }
  };

  const clearInputs = () => {
    setNome("");
    setSetorresponsavel("");
    setSelectedInsumos([]);
    setConsumoderecursos("");
    setEmissaodecarbono("");
  };

  const putProduto = async () => {
    try {
      const response = await axios.put(`${apiUrl}/produtos/${editId}`, {
        nome: nome,
        setorResponsavel: setorResponsavel,
        insumos: selectedInsumos,
        consumoDeRecursos: consumoDeRecursos,
        emissaoDeCarbono: emissaoDeCarbono,
      });
      console.log(response.data);
      getProdutos();
      clearInputs();
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (produto) => {
    setEditId(produto.id);
    setNome(produto.nome);
    setSetorresponsavel(produto.setorResponsavel);
    setSelectedInsumos(produto.insumos);
    setConsumoderecursos(produto.consumoDeRecursos);
    setEmissaodecarbono(produto.emissaoDeCarbono);
    setIsEditing(true);
  };

  useEffect(() => {
    getProdutos();
  }, []);

  return (
    <ScrollView style={tw`flex-1 bg-white p-4`}>
      <Text style={tw`text-lg font-bold`}>Cadastro de Produtos</Text>
      <Input label="Nome" value={nome} onChangeText={setNome} />
      <Input
        label="Setor Responsável"
        value={setorResponsavel}
        onChangeText={setSetorresponsavel}
      />
      <InsumoSelector
        onSelectionChange={(newSelection) => {
          setSelectedInsumos(newSelection.map((insumo) => insumo.id)); // Guarda apenas os IDs
        }}
      />
      <Input
        label="Consumo de Recursos"
        value={consumoDeRecursos}
        onChangeText={setConsumoderecursos}
      />
      <Input
        label="Emissão de Carbono"
        value={emissaoDeCarbono}
        onChangeText={setEmissaodecarbono}
      />
      <TouchableOpacity
        style={tw`bg-blue-500 p-2 rounded`}
        onPress={isEditing ? putProduto : postProduto}
      >
        <Text style={tw`text-white text-center`}>
          {isEditing ? "Editar" : "Cadastrar"}
        </Text>
      </TouchableOpacity>
      <ScrollView>
        {produtos.map((produto) => (
          <View
            key={produto.id}
            style={tw`flex-row justify-between items-center bg-gray-100 p-2 rounded mt-2`}
          >
            <Text>{produto.nome}</Text>
            <TouchableOpacity
              style={tw`bg-red-500 p-2 rounded`}
              onPress={() => deleteProduto(produto.id)}
            >
              <Text style={tw`text-white text-center`}>Deletar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-blue-500 p-2 rounded`}
              onPress={() => handleEdit(produto)}
            >
              <Text style={tw`text-white text-center`}>Editar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}
