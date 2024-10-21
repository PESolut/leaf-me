import React,{ useState } from 'react';
import { View, Image, Dimensions, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useContextProvider } from '../Providers/Provider';
import StoreItemQuantity from './StoreItemQuantity';
import flower1Img from '../assets/weedflower.png'
import flower2Img from '../assets/weedflower2.png'
import edible1Img from '../assets/weededible.png'
import defaultImg from '../assets/weeddefault.png'
import StoreItemShowCartButton from './StoreItemShowCartButton';
import styles from './StoreItemShowStyles'
 

// finished workload
/*
    1) import image for each type
    2) use the findImageThenRender function to render each image
    3) quantity state created
    4) quantity state value rendered on screen
    6) quantityButton component created
    7) quantity state effected by onPress of quanityButton
    8) addItemToCart button created with no functionality
*/

// workload
/*
    1) onPress of StoreItemShowCartButton:
    
    check if current user has a basket
        Get current userID via Cont.Prov.
        make call to backend for userID's basket,

        API call to current users baskets
        https://leaf-me-0183706079ed.herokuapp.com/users/{UserIDHERE}}/basket/
        API Call to populate the users basket
        https://leaf-me-0183706079ed.herokuapp.com/users/{UserIDHERE}}/basket/{basketIDHERE}/storeitems

        if found; 
            populate.
        if not; 
            create new basket
            populate

    2) if not, create a new one
    3) if so, proceed to step 4
    4) add the current item to the cart
    5) navigate to last viewed dispenary

*/


// import image for each type
// for now/ MVP we will use 3, post MVP; we will have a image for each product and render out with a ASSETMAP;
// see LEAF-66 for more information


const StoreItemShow = () => {
    const route = useRoute();
    const { name, description, price, type, image, id, dispensaryID } = route.params;
    const { userID, axios } = useContextProvider()
    const screenWidth = Dimensions.get('window').width;
    const [quantity, setQuantity] = useState(1)
    console.log('storeItemShow:','name',name,'description',description,'price',price,'type',type,'image',image,'storeItemID',id)

    const findImageThenRenderBasedOnType = (type) => {
        // switch case based on the image
        switch (type) {
            case 'flower':
                return flower1Img
            case 'edible':
                return edible1Img
        
            default:
                return defaultImg
        }
    }
    const imageSrc = findImageThenRenderBasedOnType(type)

    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity)
    }

    console.log('styles',styles)

    return (
        <View>
            <Image
            style={{height: 225, width: screenWidth-5, borderRadius: 20, marginBottom: 20,}}
            source={imageSrc}
            />
            <Text style={styles.title}>{name}</Text>
            <StoreItemQuantity quantity={quantity} onQuantityChange={handleQuantityChange}/>
            <StoreItemShowCartButton dispensaryID={dispensaryID} userID={userID} storeItemID={id} quantity={quantity} name={name} description={description} price={price} type={type} image={image} />
        </View>
    );
};

export default StoreItemShow;