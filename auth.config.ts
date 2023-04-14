import {CLIENT_ID, REDIRECT_URI, LOGOUT_REDIRECT_URI, ISSUER} from '@env';

export default {
  oidc: {
    clientId: CLIENT_ID, // e.g.: `a0abcEf0gH123ssJS4o5`
    redirectUri: REDIRECT_URI, // e.g.: `com.okta.example:/callback`
    endSessionRedirectUri: LOGOUT_REDIRECT_URI, // e.g.: com.okta.example:/logout
    discoveryUri: ISSUER, // e.g.: https://dev-1234.okta.com/oauth2/default
    scopes: ['openid', 'profile', 'offline_access'],
    requireHardwareBackedKeyStore: false,
  },
};
