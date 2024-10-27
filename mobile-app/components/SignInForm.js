import React from "react";
import { Text, TextInput } from "react-native";
import SignInFormButton from "./SignInFormButton";

const SignInForm = () => {

    return (
        <>
        <Text>What's your email?</Text>
        <TextInput></TextInput>
        <SignInFormButton/>

        </>
    )
}

export default SignInForm