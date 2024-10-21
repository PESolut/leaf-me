import { StyleSheet, Dimensions } from "react-native"
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default styles