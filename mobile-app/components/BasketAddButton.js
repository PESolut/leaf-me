import React from 'react';
import { useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useUserContext } from '../Providers/UserProvider';
import styles from './BasketAddButtonStyles';

const BasketAddButton = () => {
    const { basketItems } = useUserContext()
    // console.log(styles)
    // height is 75
    // width is 300

    // useEffect(()=> {
    //     basketItems.forEach((item) => {
    //         if(item.id === 64){
    //             console.log(item)
    //         }
    //     })

    // },[basketItems])



    const handleSubmit = () => {

    }


    return (
        <TouchableOpacity style={styles.container} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Add More Items</Text>
        </TouchableOpacity>
    );
};

export default BasketAddButton;