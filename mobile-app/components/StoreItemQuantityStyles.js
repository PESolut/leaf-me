import { StyleSheet, Dimensions } from "react-native"
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        paddingLeft: screenWidth/3.2,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    buttonDec: {
        marginRight: 20,
        backgroundColor: 'lightgray',
        height: 30,
        width: 30,
        borderRadius: 20
    },
    buttonInc: {
        marginLeft: 20,
        backgroundColor: 'lightgray',
        height: 30,
        width: 30,
        borderRadius: 20
    },
    buttonTextDec: {
        fontWeight: 'bold',
        paddingTop: 6,
        textAlign: "center",

    },
    buttonTextInc: {
        fontWeight: 'bold',
        paddingTop: 6,
        textAlign: "center"

    },
    quantityCount: {
        paddingTop: 6,
        fontWeight: 'bold',
        backgroundColor: 'lightgray',
        height: 30,
        width: 50,
        textAlign: "center",

    }
})

export default styles