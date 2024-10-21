import React from 'react';
import { View, Button, Text, TouchableOpacity } from 'react-native';
import styles from './BasketItemQuantityStyles'

const BasketItemQuantity = ({quantity, onQuantityChange}) => {

    const handleIncrement = () => {
        onQuantityChange(quantity + 1)
    }

    const handleDecrement = () => {
        if(quantity > 1){
            onQuantityChange(quantity - 1)
        }
        
    }

    // console.log('styles',styles)

    return (
        <View style={styles.container}>
            <View style={styles.decContainer}>
                <TouchableOpacity style={styles.buttonDec} onPress={handleDecrement}>
                    <Text style={styles.buttonTextDec}>-</Text>
                </TouchableOpacity>
            </View> 
            <Text style={styles.quantityCount}>{quantity}</Text>
            <View style={styles.incContainer}>
                <TouchableOpacity style={styles.buttonInc} onPress={handleIncrement}>
                    <Text style={styles.buttonTextInc} >+</Text>
                </TouchableOpacity>
            </View>
           
        </View>
    );
};

export default BasketItemQuantity;