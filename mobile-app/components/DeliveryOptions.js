
import { View,Text } from 'react-native';

const DeliveryOptions = () => {
    return (
        <View style={{
            paddingTop: 20
        }}>
            <Text style={{
                paddingLeft: 8,
                marginTop: -23,
            }}>Delivery Now</Text>
            <Text style={{
                fontSize: 11
            }}>`delivery address`</Text>
            
        </View>
    );
};

export default DeliveryOptions;