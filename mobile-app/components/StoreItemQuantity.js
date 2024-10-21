import React from 'react';
import { View, Button, Text, TouchableOpacity } from 'react-native';
import styles from './StoreItemQuantityStyles'

const StoreItemQuantity = ({quantity, onQuantityChange}) => {

    const handleIncrement = () => {
        onQuantityChange(quantity + 1)
    }

    const handleDecrement = () => {
        if(quantity > 1){
            onQuantityChange(quantity - 1)
        }
        
    }

    console.log('styles',styles)

    return (
        <View style={styles.container}> 
            <TouchableOpacity style={styles.buttonDec} onPress={handleDecrement}>
                <Text style={styles.buttonTextDec}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityCount}>{quantity}</Text>
            <TouchableOpacity style={styles.buttonInc} onPress={handleIncrement}>
                <Text style={styles.buttonTextInc} >+</Text>
            </TouchableOpacity>
        </View>
    );
};

export default StoreItemQuantity;