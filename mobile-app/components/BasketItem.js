import React from 'react';
import { View, Text } from 'react-native';
import BasketItemQuantity from './BasketItemQuantity';
import styles from './BasketItemStyles'
import { useState, useEffect } from 'react';
import { useUserContext } from '../Providers/UserProvider.js';

const BasketItem = ({basketId, id, quantity, storeItemID, name, price}) => {
    const { totalItems, subtotal, setSubtotal, setTotalItems, basketItems, handleQuantityChange2 } = useUserContext()
    const [quantityState, setQuantityState] = useState(1)
    // this subtotal state is to temporaily render the price * quantity
    const [subtotalState, setSubtotalState] = useState(0)
    
    // when the quantity from the req comes in, store it in state so we can temporaily edit it
    // also updates our basketItems state to reflect for our handleSubmit to be up to date
    useEffect(()=> {
        setQuantityState(quantity)
        // console.log('\nquantity\n',quantity)
    },[quantity])

    useEffect(() => {

        // take the subtotal string
        // transform into number
        // const convertToNumber = (str) => {
        //     return parseFloat(str.replace('$', ''));
        //   };
        //   const subtotalNumber = convertToNumber(subtotal)

        // if quantityChange is positive
            // const subtotalWithoutSymbol = subtotal.replace('$','')
            // console.log(subtotalWithoutSymbol)
            // const subtotalNumber = parseFloat(subtotalWithoutSymbol)
            // console.log('Num:',subtotalNumber)
            // const newSubtotal = subtotalNumber + Number(price)
            // const newSubtotalStr = `$${newSubtotal.toFixed(2)}`
        
        // on quantityState change, update the subtotal by adding the change from the current basketitem price to the subtotal
        
        // console.log(subtotal, subtotalState)
        setSubtotalState(price * quantityState)
        handleQuantityChange2()
        // setSubtotal(newSubtotalStr)
    },[quantityState])


    const handleQuantityChange = (newQuantity) => {
        if(newQuantity > quantityState){
            const subtotalWithoutSymbol = subtotal.replace('$','')
            // console.log(subtotalWithoutSymbol)
            const subtotalNumber = parseFloat(subtotalWithoutSymbol)
            // console.log('Num:',subtotalNumber)
            const newSubtotal = subtotalNumber + Number(price)
            const newSubtotalStr = `$${newSubtotal.toFixed(2)}`
            setSubtotalState(price * quantityState)
            setTotalItems(totalItems + 1)
            setSubtotal(newSubtotalStr)
        } else {
            const subtotalWithoutSymbol = subtotal.replace('$','')
            const subtotalNumber = parseFloat(subtotalWithoutSymbol)
            const newSubtotal = subtotalNumber - Number(price)
            const newSubtotalStr = `$${newSubtotal.toFixed(2)}`
            setSubtotalState(price * quantityState)
            setTotalItems(totalItems - 1)
            setSubtotal(newSubtotalStr)

        }
        setQuantityState(newQuantity)
        handleQuantityChange2(id, newQuantity)

    }

    return (
        <View style={styles.container}>
            {/* column 1, containing the item's name */}
            <View style={styles.column1}>
                <Text style={styles.name}>{name}</Text>
            </View>
            {/* column 2, containing the quantity buttons + items price*/}
            <View style={styles.column2}>
                <BasketItemQuantity quantity={quantityState} onQuantityChange={handleQuantityChange}></BasketItemQuantity>
                <Text style={styles.price}> ${(subtotalState).toFixed(2)}</Text>
            </View>
        </View>
    );
};

export default BasketItem;