import React from 'react';
import { View, FlatList } from 'react-native';
import { useDisProvider } from '../Providers/DispensariesProvider.js';
import { useSearchToggle } from '../Providers/SearchToggleProvider.js';
import DispensariesItem from './DispensariesItem.js';
import styles from './DispensariesIndexStyles.js';

const DispensariesIndex = () => {
    const { dispensaries } = useDisProvider() 
    const { searchResults } = useSearchToggle(); 

    const renderItem = ({item}) => (
        <DispensariesItem dispensaryId={item.id} image={item.image} name={item.name} address={item.address} deliveryfee={item.deliveryfee} />
    )

    return (
  
        <View style={styles.container}>
            {
                searchResults ? (
                    <FlatList
                        data={searchResults}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                ) : (
                    <FlatList
                        data={dispensaries}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                )
            }
        </View>
    );
};   

export default DispensariesIndex;