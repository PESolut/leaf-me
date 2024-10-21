import React from 'react';
import { StatusBar, View} from 'react-native';
import styles from './HeaderStyles.js'
import BackButton from './BackButton.js';
import DeliveryOptions from './DeliveryOptions.js';
import SearchBar from './SearchBar.js';

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.divider}>
                <StatusBar translucent barStyle='dark-content'/></View> 
            <View style={styles.row1}>
                <BackButton/>
                <View style={styles.divider2}/>
                <DeliveryOptions/>
            </View>
            <View style={styles.row2}>
                <SearchBar/>
            </View>       
        </View>
    );
};

export default Header;