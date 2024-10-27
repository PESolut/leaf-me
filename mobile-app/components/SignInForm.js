import React from "react";
import { Text, TextInput, StyleSheet, View } from "react-native";
import SignInFormButton from "./SignInFormButton";

const SignInForm = ({handleEmailSubmit}) => {

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

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>What's your email?</Text>
            <View style={styles.textBoxContainer}>
                <TextInput 
                    style={styles.textBox}
                    placeholder=" enter your email here "
                ></TextInput>
            </View>
            <SignInFormButton handleEmailSubmit={handleEmailSubmit}/>
        </View>
    )
}

export default SignInForm
