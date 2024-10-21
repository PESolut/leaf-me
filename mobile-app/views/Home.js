import React from 'react';
import {Text} from 'react-native';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {

    const navigation = useNavigation();

  return (
    <Button 
    title="Go to Dispensaries"
    onPress={() => navigation.navigate("Dispensaries")}
    />
  )
};

export default Home;