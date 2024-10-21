import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    aContainer: {
        marginTop: 10,
        // marginBottom: 10,
        // margin: 10,
        // paddingTop: 2.5,
        // paddingBottom: 2.5,
        // backgroundColor: 'red',
        flexDirection: 'row',
        // height: 120,
        width: '100%',
        backgroundColor: 'lightgray'
    },
    aColumn1: {
        height: 60,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.8,
    },
    aColumn2: {
        height: 60,
        flex: 2.5,
        backgroundColor: 'lightgray',
    },
    aColumn3: {
        // backgroundColor: 'orange',
        height: 60,
        flex: 0.2,
    },
    bContainer: {
        flexDirection: 'row,',
        flexWrap: 'wrap',
        height: '75%',
        padding: 5,
        justifyContent: 'space-between'
    },
    bItem: {
        width: '50%',
        height: '48%',
        // backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 5,
    },
    bItemText: {
        fontSize: 10
    }

})