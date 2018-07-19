import React from 'react';
import {
  AsyncStorage,
} from 'react-native';
import URL from './Url';


//logout function
export const logout = () => (

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
);
