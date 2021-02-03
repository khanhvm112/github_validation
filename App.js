import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import login from './components/login/screens/loginscreen';
import register from './components/login/screens/registerscreen';
import homepage from './components/homepage/index'
const Stack = createStackNavigator();
export default class Validation extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={login} />
          <Stack.Screen name="Register" component={register} />
          <Stack.Screen name="Homepage" component={homepage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
const styles = StyleSheet.create({});
