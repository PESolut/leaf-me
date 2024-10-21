import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        height: 80,
        // backgroundColor: 'red',
        margin: 10,
    },
    column1: {
        flex: 1,
    },
    column2: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between'
    },
    price: {

    },
    name: {
        paddingTop: 10
    }
})

export default styles