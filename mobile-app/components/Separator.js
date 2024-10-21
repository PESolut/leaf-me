import React from 'react';
import { View, StyleSheet } from 'react-native'

const Separator = ({type}) => {
    return (
        <View style={type === 'basketItem' ? styles.basketItemSeparator : styles.separator}/>
    );
};

const styles = StyleSheet.create({
    separator: {
        height: 1,
        width: '90%',
        marginLeft: '5%',
        backgroundColor: '#CED0CE',
        marginVertical: 10, 
        marginBottom: 20,
    },
    basketItemSeparator: {
        height: 0.5,
        width: '90%',
        marginLeft: '5%',
        backgroundColor: '#CED0CE',
        marginVertical: 0, 
        marginBottom: 0,
    }
  });

export default Separator;