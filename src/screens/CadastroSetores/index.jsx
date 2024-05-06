import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Input from "../../components/Input/index.jsx";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import tw from "tailwind-react-native-classnames";

export default function CadastroSetores() {
  const navigation = useNavigation();
  const [editId, setEditId] = useState(null);
  const [nome, setNome] = useState("");
  const [empresa_id, setEmpresa_id] = useState("");

  const [setores, setSetores] = useState([]);

  const [isEditing, setIsEditing] = useState(false);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const getSetores = async () => {
    try {
      const response = await axios.get(`${apiUrl}/setores`);
      setSetores(response.data.setores);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const postSetor = async () => {
    try {
      const response = await axios.post(`${apiUrl}/setores`, {
        nome: nome,
        empresa_id: empresa_id,
      });
      console.log(response.data);
      getSetores();
      clearInputs();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSetor = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/setores/${id}`);
      console.log(response.data);
      getSetores();
    } catch (error) {
      console.error(error);
    }
  };

  const clearInputs = () => {
    setNome("");
    setEmpresa_id("");
  };

  const putSetor = async () => {
    try {
      const response = await axios.put(`${apiUrl}/setores/${editId}`, {
        nome: nome,
        empresa_id: empresa_id,
      });
      console.log(response.data);
      getSetores();
      clearInputs();
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSetores();
  }, []);

  return (
    <View style={tw`flex-1 bg-white p-4`}>
      <ScrollView>
        <Text style={tw`text-lg font-bold`}>Cadastro de Setores</Text>
        <Input label="Nome" value={nome} onChangeText={setNome} />
        <Input
          label="Empresa ID"
          value={empresa_id}
          onChangeText={setEmpresa_id}
        />
        <TouchableOpacity
          style={tw`bg-blue-500 p-2 rounded mt-4`}
          onPress={() => {
            if (isEditing) {
              putSetor();
            } else {
              postSetor();
            }
          }}
        >
          <Text style={tw`text-white text-center`}>
            {isEditing ? "Editar" : "Cadastrar"}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={tw`bg-blue-500 p-2 rounded mt-4`}
          onPress={() => {
            getSetores();
          }}
        >
            <Text style={tw`text-white text-center`}>Recarregar</Text>
        </TouchableOpacity>

        <ScrollView>
          {
            //verificar se há setores para mapear e exibir
            setores.length > 0 ? (
              setores.map((setor) => (
                <View
                  key={setor.id}
                  className={`justify-between items-center border-b border-gray-300 p-2`}
                >
                  <Text>{setor.nome}</Text>
                  <Text>{setor.empresa_id}</Text>
                  <View style={tw`flex-row`}>
                    <TouchableOpacity
                      style={tw`bg-yellow-500 p-2 rounded`}
                      onPress={() => {
                        setEditId(setor.id);
                        setNome(setor.nome);
                        setEmpresa_id(setor.empresa_id);
                        setIsEditing(true);
                      }}
                    >
                      <Text style={tw`text-white`}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={tw`bg-red-500 p-2 rounded ml-2`}
                      onPress={() => {
                        deleteSetor(setor.id);
                      }}
                    >
                      <Text style={tw`text-white`}>Deletar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <Text style={tw`text-center mt-4`}>Nenhum setor cadastrado</Text>
            )
          }
        </ScrollView>
      </ScrollView>
    </View>
  );
}
