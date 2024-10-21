import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import styles from './NavBarButtonStyles.js'

const NavBarButton = ({type}) => {
    const navigation = useNavigation();

    let iconImage;
    const buttonType = type

    const handlePress = (buttonType) => {
        console.log('press from button:',)
        switch (type) {
            case 'Home':
                navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: 'Dispensaries' }],
                    }))
                break;
            case 'Cart':
                navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: 'Basket' }],
                    }))
                break
            case 'Orders':
                navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: 'Orders' }],
                    }))
                break
            default:
                iconImage = null;
                break;
        }
    }

    switch (type) {
        case 'Home':
            iconImage = require('../assets/NavHomeIcon.png')
            break;
        case 'Cart':
            iconImage = require('../assets/NavCartIcon.png')
            break
        case 'Orders':
            iconImage = require('../assets/NavUserSettingsIcon.png')
            break
        default:
            iconImage = null;
            break;
    }
    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <View style={{ alignItems: 'center', paddingLeft: 30 }}>
                {iconImage && <Image source={iconImage} style={{ width: 40, height: 40 }} />}
                {type && <Text>{type}</Text>}
            </View>
        </TouchableOpacity>
    );
};

export default NavBarButton;