import React, { useEffect } from "react";
import { Text, TextInput, StyleSheet, View } from "react-native";
import SignInFormButton from "./SignInFormButton"


const SignInForm2 = ({ handlePasswordSubmit, userEmail, stage, isNew, userPassword, setUserInput }) => {
    const styles = StyleSheet.create({
        container: {
            marginLeft: 10,
            fontWeight: 400,
        },
        titleText: {
            paddingBottom: 7,
            fontSize: '20',
            color: '#000000',
            lineHeight: 32,
        },
        textBox: {
            height: 40,
            width: '95%',
            paddingLeft: 10,
        },
        textBoxContainer: {
            borderRadius: 10,
            width: '95%',
            backgroundColor: '#D6D6D6',
        },
    })

    useEffect(() => {
        console.log('email',userEmail, 'stage number:', stage, 'isNew:', isNew)
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Whats your Password?</Text>
            <View style={styles.textBoxContainer} >
                <TextInput
                style={styles.textBox}
                placeholder=" enter your password here "
                value={userPassword}
                onChangeText={(text) => setUserInput(prev => ({ ...prev, password: text }))}

                ></TextInput>
            </View>
            <SignInFormButton handlePasswordSubmit={handlePasswordSubmit} type={'password'} />
        </View>
    )
}

export default SignInForm2
