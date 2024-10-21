import React from 'react';
import { View, Text } from 'react-native';
import styles from './NavBarStyles'
import NavBarButton from './NavBarButton';
import { useIsFocused } from '@react-navigation/native'; 


const NavBar = () => {
    const isFocused = useIsFocused(); 

    if (!isFocused) {
        return null
    }

    return (
        <View style={styles.container}>
            <NavBarButton type={'Home'}/>
            <NavBarButton type={'Cart'}/>
            <NavBarButton type={'Orders'}/>
            {/* <NavBarButton type={'Help'}/> */}
        </View>
    );
};

export default NavBar;