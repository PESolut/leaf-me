import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Header from "../components/Header";
import SignInForm from "../components/SignInForm";
import SignInForm2 from "../components/SignInForm2";
import axios from 'axios';
import { useContextProvider } from '../Providers/Provider';

const SignIn = () => {
    const { API } = useContextProvider();
    const [stage, setStage] = useState(1);
    const [isNew, setIsNew] = useState(null);
    const [userInput, setUserInput] = useState({
        email: '',
        password: ''
    });
    

    const checkEmailExists = async (email) => {
        try {
            const response = await axios.post(`${API}/users/check-email`, { email: email });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const handleEmailSubmit = async () => {
        console.log(userInput.email)
        try {
            const userExists = await checkEmailExists(userInput.email);
            console.log('userExists response:',userExists)
            // setUserInput(prev => ({ ...prev, userInput }));
            if(userExists.message == 'Email is available'){
                setIsNew(true)
            } else {
                setIsNew(false)
            }
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
                <SignInForm 
                    handleEmailSubmit={handleEmailSubmit}
                    email={userInput.email}
                    setUserInput={setUserInput}
                />
            )}
            {stage === 2 && (
                <SignInForm2 
                    onSubmit={handlePasswordSubmit}
                    isNewUser={isNew}
                    userEmail={userInput.email}
                    stage={stage}
                    isNew={isNew}
                />
            )}
        </View>
    );
};

export default SignIn;
