import {OKTA_CLIENT_ID, OKTA_REDIRECT_URI, OKTA_LOGOUT_REDIRECT_URI, OKTA_ISSUER} from '@env';

export default {
  oidc: {
    clientId: OKTA_CLIENT_ID, // e.g.: `a0abcEf0gH123ssJS4o5`
    redirectUri: OKTA_REDIRECT_URI, // e.g.: `com.okta.example:/callback`
    endSessionRedirectUri: OKTA_LOGOUT_REDIRECT_URI, // e.g.: com.okta.example:/logout
    discoveryUri: OKTA_ISSUER, // e.g.: https://dev-1234.okta.com/oauth2/default
    scopes: ['openid', 'profile', 'offline_access'],
    requireHardwareBackedKeyStore: false,
  },
};
