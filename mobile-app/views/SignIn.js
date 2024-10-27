import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Header from "../components/Header";
import SignInForm from "../components/SignInForm";
import SignInForm2 from "../components/SignInForm2";

const SignIn = () => {
    const [stage, setStage] = useState(1);
    const [isNew, setIsNew] = useState(null);
    const [userInput, setUserInput] = useState({
        email: '',
        password: ''
    });

    const handleEmailSubmit = async (email) => {
        try {
            const userExists = await checkEmailExists(email);
            setUserInput(prev => ({ ...prev, email }));
            setIsNew(!userExists);
            setStage(2);
        } catch (error) {
            console.error('Error checking email:', error);
        }
    };

    const handlePasswordSubmit = async (password) => {
        try {
            setUserInput(prev => ({ ...prev, password }));
            
            if (isNew) {
                await createNewUser(userInput);
                setStage(0);
            } else {
                const isValid = await verifyUser(userInput);
                if (isValid) {
                    setStage(0);
                } else {
                    alert('Invalid password');
                }
            }
        } catch (error) {
            console.error('Error processing password:', error);
        }
    };

    useEffect(() => {
        if (stage === 0) {
            // Redirect to home
            // navigation.navigate('Home');
        }
    }, [stage]);

    return (
        <View>
            <Header />
            {stage === 1 && (
                <SignInForm handleEmailSubmit={handleEmailSubmit} />
            )}
            {stage === 2 && (
                <SignInForm2 
                    onSubmit={handlePasswordSubmit}
                    isNewUser={isNew}
                />
            )}
        </View>
    );
};

export default SignIn;
