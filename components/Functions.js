import React from 'react';
import {  StackActions, NavigationActions } from 'react-navigation';
import {
  AsyncStorage,
} from 'react-native';
import URL from './Url';


//logout function
export const sessionDestroy = () => {

    AsyncStorage.multiRemove([
    'user',
    'role_no',
    'userId',
    'organizationId',
    'parentOrganizationId',
    'organizationEmail',
    'organizationDisplayName',
    'UserType',
    'authority',
    'liveTemplate',
    'logourl',
    'appId',
    'password',
    'username',
  ], (err) => {('Local storage  removed!');})
  };

export const noBack=(prop,route)=>{
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: route })],
  })
  prop.navigation.dispatch(resetAction);
};
