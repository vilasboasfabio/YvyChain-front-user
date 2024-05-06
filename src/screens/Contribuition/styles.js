import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#3B5B30",
    },
    title: {
        color: "EED2B8",
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "Roboto",
    },
    subtitulo: {
        color: "#EED2B8",
        fontSize: 13,
        fontFamily: "Roboto",
        textAlign: "center",
        margin: 10,
    },
    image: {
        width: 201,
        height: 200,
        margin: 10,
        marginLeft: -1,
        marginTop: -1,
        borderRadius: 10,
    },
    divpequena: {
        backgroundColor: "#EED2B8",
        margin: 10,
        width: 200,
        height: 300,
        borderRadius: 10,
    },
    divgrande: {
        display: "flex",
        backgroundColor: "#3B5B30",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
    },
    textodiv: {
        color: "#3B5B30",
        fontSize: 12,
        fontFamily: "Roboto",
        textAlign: "center",
        margin: 10,
        textAlign: "left",
    },
    subdiv: {
        backgroundColor: "#D9D9D9",
        marginTop: 30,
        padding: 40,
        marginBottom: 60,
    },
    textosubdiv: {
        color: "#000000",
        fontSize: 12,
        fontFamily: "Roboto",
        textAlign: "left",
    },
    image2: {
        width: 50,
        height: 130,
        marginTop: 10,
        marginLeft: 125,
    },
});
export default styles;