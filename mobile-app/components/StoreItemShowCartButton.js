import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './StoreItemShowCartButtonStyles'
import { useNavigation } from '@react-navigation/native';
import { checkIfCurrentUserHasBasket, createNewBasket, populateBasketWithStoreItem } from './Functions';
import { useUserContext } from '../Providers/UserProvider';


const StoreItemShowCartButton = ({quantity, name, price, storeItemID,userID}) => {
    const navigation = useNavigation();
    const { setTriggerRerenderFlag, triggerRerenderFlag, toggleRerenderFlag } = useUserContext()
 
    const handlePress =  async () => {

        // before we check if a user has a basket; lets confirm that we have a registered user!
        if(userID){
            // we do have a user
                 // check if user has basket
        let usersBasketID = await checkIfCurrentUserHasBasket(userID)
        console.log('storeItemShow handlePress - return for checkIfCurrentUserHasBasket:',usersBasketID)
        console.log('storeItemID:',storeItemID)

        
        // if user has basket, populate store-item to basket, otherwise, create new basket then populate basket
        if(usersBasketID){
            await populateBasketWithStoreItem(usersBasketID, userID,null,storeItemID, quantity)
        } else {
            
            // create new basket then populate the basket
            usersBasketID = await createNewBasket(userID)
            await populateBasketWithStoreItem(usersBasketID,userID,null,storeItemID,)
            
        }
        // debugger
        // try {
        // } catch (error) {
        //     debugger
        //     console.error(error)
        // }
        navigation.push('DispensariesShow')
        toggleRerenderFlag(triggerRerenderFlag)
        console.log('\nLog2\n','triggerRerenderFlag',triggerRerenderFlag)
        toggleRerenderFlag(triggerRerenderFlag)

        } else {
            // we do not have a user
            // tell user to sign in!
            console.log('sign in bro!')

        }
        
   

    }

    return (
        // <Button title={`Add ${name} to Cart ($${price})`} onPress={handlePress}/>
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Text style={styles.buttonText}>
                Add {name} to Cart ({price})
            </Text>
        </TouchableOpacity>
    );
};

export default StoreItemShowCartButton;