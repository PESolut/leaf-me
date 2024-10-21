import { StyleSheet, Dimensions } from 'react-native'
const screenWidth = Dimensions.get('window').width;

export default styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        marginTop: 75,
        marginLeft: 50,
        alignItems: 'center',
        backgroundColor: 'black',
        width: 300,
        height: 75

    },
    buttonText: {
        paddingTop: 25,
        color: 'white'
    }

})