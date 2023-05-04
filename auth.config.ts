import {OKTA_CLIENT_ID, OKTA_REDIRECT_URI, OKTA_LOGOUT_REDIRECT_URI, OKTA_ISSUER} from '@env';

// export default {
//   oidc: {
//     clientId: OKTA_CLIENT_ID, // e.g.: `a0abcEf0gH123ssJS4o5`
//     redirectUri: OKTA_REDIRECT_URI, // e.g.: `com.okta.example:/callback`
//     endSessionRedirectUri: OKTA_LOGOUT_REDIRECT_URI, // e.g.: com.okta.example:/logout
//     discoveryUri: OKTA_ISSUER, // e.g.: https://dev-1234.okta.com/oauth2/default
//     scopes: ['openid', 'profile', 'offline_access'],
//     requireHardwareBackedKeyStore: false,
//   },
// };

// export default {
//   oidc: {
//     clientId: '0oa7oabyi90ZOpcu11d7', // e.g.: `a0abcEf0gH123ssJS4o5`
//     redirectUri: 'com.oktapreview.eaton-sandbox:/callback', // e.g.: `com.okta.example:/callback`
//     endSessionRedirectUri: 'com.oktapreview.eaton-sandbox:/callback', // e.g.: com.okta.example:/logout
//     discoveryUri: 'https://eaton-sandbox.oktapreview.com/oauth2/aus344pyzfdyRD44N1d7', // e.g.: https://dev-1234.okta.com/oauth2/default
//     scopes: ['openid', 'profile', 'offline_access'],
//     requireHardwareBackedKeyStore: false,
//   },
// };

export default {
  oidc: {
    clientId: '0oa959ask52yU64IT5d7', // e.g.: `a0abcEf0gH123ssJS4o5`
    redirectUri: 'com.okta.dev-60703092:/callback', // e.g.: `com.okta.example:/callback`
    endSessionRedirectUri: 'com.okta.dev-60703092:/callback', // e.g.: com.okta.example:/logout
    discoveryUri: 'https://dev-60703092.okta.com/oauth2/default', // e.g.: https://dev-1234.okta.com/oauth2/default
    scopes: ['openid', 'profile', 'offline_access'],
    requireHardwareBackedKeyStore: false,
  },
};
