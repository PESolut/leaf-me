import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    leftText: {
        flex: 1,
        textAlign: 'left',
    },
    rightText: {
        flex: 1,
        textAlign: 'right',
    }
})

export default styles