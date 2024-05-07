import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#44221F",
    },
    titulo: {
        color: "#fff",
        fontSize: 26,
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 50,
    },
    texto: {
        color: "#fff",
        fontSize: 14,
        textAlign: "center",
        margin: 20,
    },
    divinputs: {
        margin: 20,
        borderRadius: 10,
        padding: 100,
        backgroundColor: "#EED2B8",
        justifyContent: "center",
        width: 300,
        alignSelf: "center",
    },
    botao: {
        backgroundColor: "#C8E5BE",
        borderRadius: 10,
        padding: 10,
        width: 150,
        alignSelf: "center",
        marginTop: -45,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textobotao: {
        textAlign: "center",
        fontWeight: "bold",
    },
    textoinput: {
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        borderBottomColor: "#000",
        padding: 10,
        margin: 10,
        fontSize: 20,
    },
    texto2:{
        color: "#000",
        fontSize: 14,
        margin: 20,
    }
});
export default styles;