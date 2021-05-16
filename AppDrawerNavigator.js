import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import SettingScreen from '../screens/SettingScreen';
import MyBarter from '../screens/MyBarter';
import {Icon} from 'react-native-elements';
import NotificationScreen from '../screens/NotificationScreen'

export const AppDrawerNavigator=createDrawerNavigator({
    Home:{
        screen:AppTabNavigator
    },
    MyBarter:{
        screen:MyBarter
    },
    Notifications :{
        screen : NotificationScreen,
        navigationOptions:{
          drawerIcon : <Icon name="bell" type ="font-awesome" />,
          drawerLabel : "Notifications"
        }
      },
    Setting:{screen:SettingScreen},
},
{
    contentComponent:CustomSideBarMenu
},
{
    initialRouteName:'Home'
}
)