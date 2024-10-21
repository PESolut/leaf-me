import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './StoreItemStyles'

// create the onPress function
// create the StoreItemShow component; drill down the props

const StoreItem = ({name, description, price, type, image, id, dispensaryID }) => {
    const navigation = useNavigation();

    console.log('StoreItem:',name)

    const handlePress = () => {
        // debugger
        navigation.push('StoreItemShow', { dispensaryID: dispensaryID, id: id, name: name, description: description, price: price, type: type, image: image})
    }

    return (
        <TouchableOpacity onPress={handlePress} style={styles.item}>
            <View style={styles.itemColumns}>
                <Text style={styles.itemTitle}>{name}</Text>
                <Text style={styles.itemDescription}>{description}</Text>
                <Text style={styles.itemPrice}>${price}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default StoreItem;