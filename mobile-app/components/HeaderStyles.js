import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;


const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        height: 225
    },
    divider: {
        backgroundColor: 'white',
        height: 35
    },
    divider2: {
        width: screenWidth/1.96
    },
    row1: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white', 
        height: 80,
    },
    row2: {
        marginTop: -15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 60,
    }

})


export default styles;