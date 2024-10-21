import React from 'react';
import { View, Text } from 'react-native';
import { useUserContext } from '../Providers/UserProvider.js';
import styles from './BasketIndexSubheaderStyles.js'


const BasketIndexSubheader = () => {
    const { totalItems, subtotal } = useUserContext()

    return (
        <View style={styles.container}>
            <Text style={styles.leftText}>{totalItems} items</Text>
            <Text style={styles.rightText}>Subtotal: {subtotal}</Text>
        </View>
    );
};

export default BasketIndexSubheader;