import { StyleSheet, Dimensions } from "react-native"
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    itemTop: {

    },
    item: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 20,
        paddingTop: 35,
        paddingBottom: 35,
        marginBottom: 5,
        

    },
    itemColumns: {
        flexDirection: 'row'

    },
    itemTitle: {
        fontWeight: 'bold',
        flex: 1,


    },
    itemDescription: {
        flex: 2

    },
    itemPrice: {
        flex: 0.5

    }
})

export default styles;