import { TouchableOpacity, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        // alignContent: 'center',
        borderRadius: 4,
        // marginTop: 75,
        // marginLeft: 10,
        alignItems: 'center',
        backgroundColor: 'black',
        width: '95%',
        height: 40,
        marginBottom: 10,
    },
    buttonText: {
        fontSize: '16',
        paddingVertical: '3%',
        color: 'white'
    }
})

const SignInFormButton = ({handleEmailSubmit, handlePasswordSubmit, type}) => {
    return (
        <TouchableOpacity 
            style={styles.container} 
            onPress={() => {
                if (type === 'email') {
                    handleEmailSubmit();
                } else if (type === 'password') {
                    handlePasswordSubmit();
                }
            }}
        >
            <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
    )
}

export default SignInFormButton
