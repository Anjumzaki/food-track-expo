import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import FoodTrackScreen from './screens/FoodTrackScreen'
import BarCodeScannerScreen from './screens/BarcodeScannerScreen'
import CustomTab from './components/CustomTab'
import AddItem from './screens/AddItem'


const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();

// const BookmarkStack = () => {
//     return (
//         <Stack.Navigator screenOptions={{ headerShown: false }} >
//             <Stack.Screen name='Bookmarks' component={Bookmarks} />
//             <Stack.Screen name='ItemDetail' component={ItemDetail} />
//         </Stack.Navigator>
//     )
// }
class AppNavigator extends Component {


    TabStack() {
        return (
            <Tab.Navigator initialRouteName='FoodTrackScreen' tabBar={props => <CustomTab {...props} />} screenOptions={{ headerShown: false }} >
                <Tab.Screen name='FoodTrackScreen' component={FoodTrackScreen} />

            </Tab.Navigator>
        );
    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName='TabStack' screenOptions={{ headerShown: false }} >
                    <Stack.Screen name='TabStack' component={this.TabStack} />
                    <Stack.Screen name='BarCodeScannerScreen' component={BarCodeScannerScreen} />
                    <Stack.Screen name='AddItem' component={AddItem} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default connect(state => state)(AppNavigator)