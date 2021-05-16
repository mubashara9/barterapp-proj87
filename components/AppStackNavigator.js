import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import UserDetailScreen from '../screens/UserDetailScreen';

export const AppStackNavigator=createStackNavigator({
    HomeScreen:{
        screen:HomeScreen,
        navigationOptions:{
            headerShown:false
        }
    },
   UserDetailScreen:{
        screen:UserDetailScreen,
        navigationOptions:{
            headerShown:false
        }
    }
},
{
    initialRouteName:'HomeScreen'
})