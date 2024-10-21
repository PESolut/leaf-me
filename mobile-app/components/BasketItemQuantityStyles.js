import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        maxHeight: 30,
        flexDirection: 'row',
        backgroundColor: '#D6D6D6',
        borderRadius: 20,
        // paddingHorizontal: 10,
        // paddingVertical: 5,
    },
    decContainer:{

    },
    incContainer:{
        // borderRadius: 20,
        // paddingHorizontal: 10,
        // paddingVertical: 0,
    },
    buttonTextDec:{
        paddingVertical: 5,
    },
    buttonTextInc:{
        paddingVertical: 5,
    },
    quantityCount:{
        paddingVertical: 5,
    },
    buttonDec:{
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 0,
        // backgroundColor: 'blue',
        height: 30,
        width: 30,
    },
    buttonInc:{
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 0,
        // backgroundColor: 'blue',
        height: 30,
        width: 30,
    }

})

export default styles