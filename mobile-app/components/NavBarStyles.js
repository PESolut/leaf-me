import { StyleSheet, Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingTop: 50,
        paddingLeft: 0,
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: screenWidth,
        height: 125,
        paddingHorizontal: 20,
        elevation: 3,
        shadowColor: '#0000000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
})

export default styles;