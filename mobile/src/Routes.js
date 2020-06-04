import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Details from './pages/Details';
import Incidents from './pages/Incidents'; 

const Stack = createStackNavigator();


export default function Routes(){
    return ( 
    <NavigationContainer>
        <Stack.Navigator  >
            <Stack.Screen name="Incidents" component={Incidents} options={{ headerShown: false}}  />
            <Stack.Screen name="Details" component={Details} options={{ headerShown: false}} />
        </Stack.Navigator>
    </NavigationContainer>)
   
}
