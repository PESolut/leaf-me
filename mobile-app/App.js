import React from 'react';
import { NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet, Text, View } from 'react-native';
// components imports
import Home from './views/Home'
import Dispensaries from './views/Dispensaries'
import DispensariesShow from './views/DispensariesShow';
import StoreItemShowView from './views/StoreItemShowView';
import Basket from './views/Basket';
import Orders from './views/Orders';
// provider imports
import Provider from './Providers/Provider';
import { SearchToggleProvider } from './Providers/SearchToggleProvider';
import DispensariesProvider, { useDisProvider } from './Providers/DispensariesProvider';
import UserProvider from './Providers/UserProvider';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Provider>
        <UserProvider>
        <SearchToggleProvider>
          <DispensariesProvider>
            <Stack.Navigator initialRouteName="Dispensaries">
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Dispensaries" component={Dispensaries} options={{ headerShown: false }}/>
              <Stack.Screen name="DispensariesShow" component={DispensariesShow} options={{ headerShown: false }}/>
              <Stack.Screen name="StoreItemShow" component={StoreItemShowView} options={{ headerShown: false }}/>
              <Stack.Screen name="Basket" component={Basket} options={{headerShown: false}}/>
              <Stack.Screen name="Orders" component={Orders} options={{headerShown: false}}/>
          </Stack.Navigator>
          </DispensariesProvider>
        </SearchToggleProvider>
        </UserProvider>
      </Provider>
    </NavigationContainer>

  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
