import React, {createContext, useEffect, useState} from 'react';
import {
  createConfig,
  isAuthenticated,
  clearTokens,
  signIn,
  EventEmitter,
  getAuthClient,
} from '@okta/okta-react-native';
import octaConfig from '../../auth.config';

type AuthContextInterface = {
  values: any;
  actions: any;
};
type AuthProviderProps = {children?: React.ReactNode};

export const AuthContext = createContext<AuthContextInterface | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [context, setContext] = useState<string | null>(null);

  const checkAuthentication = async () => {
    const result = await isAuthenticated();

    setLoading(false);
    setAuthenticated(result.authenticated);
  };

  useEffect(() => {
    EventEmitter.addListener('signInSuccess', function (e: Event) {
      setAuthenticated(true);
      setContext('Logged in!');
    });
    EventEmitter.addListener('signOutSuccess', function (e: Event) {
      setAuthenticated(false);
      setContext('Logged out!');
    });
    EventEmitter.addListener('onError', function (e: Event) {
      setContext(e.error_message);
    });
    EventEmitter.addListener('onCancelled', function (e: Event) {
      console.warn(e);
    });

    const getConfig = async () => {
      await createConfig({
        clientId: octaConfig.oidc.clientId,
        redirectUri: octaConfig.oidc.redirectUri,
        endSessionRedirectUri: octaConfig.oidc.endSessionRedirectUri,
        discoveryUri: octaConfig.oidc.discoveryUri,
        scopes: octaConfig.oidc.scopes,
        requireHardwareBackedKeyStore: octaConfig.oidc.requireHardwareBackedKeyStore,
      });
    };

    void getConfig();
    void checkAuthentication();

    return () => {
      EventEmitter.removeAllListeners('signInSuccess');
      EventEmitter.removeAllListeners('signOutSuccess');
      EventEmitter.removeAllListeners('onError');
      EventEmitter.removeAllListeners('onCancelled');
    };
  }, []);

  const login = (username: string, password: string) => {
    if (loading) {
      return;
    }

    setLoading(true);

    // getAuthClient()
    //   .signInWithCredentials({username, password})
    //   .then((transaction) => {
    //     setLoading(false);
    //     const {status, sessionToken} = transaction;
    //     getAuthClient()
    //       .isAuthenticated()
    //       .then((res) => {
    //         console.log('isAuthenticated', res);
    //       })
    //       .catch((e) => {
    //         console.log('error', e);
    //       });
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     throw new Error(`Sign in was not authorized - ${JSON.stringify(error)}`);
    //   });

    signIn({username, password})
      .then(() => {
        setLoading(false);
        setAuthenticated(true);
      })
      .catch((e) => {
        setLoading(false);
        setAuthenticated(false);
        setError(e.message);
      });
  };

  const logout = () => {
    setLoading(true);
    clearTokens()
      .then(() => {
        setLoading(false);
        setAuthenticated(false);
      })
      .catch((e) => {
        setLoading(false);
        setError(e.message);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        values: {
          authenticated,
          loading,
          error,
          context,
        },
        actions: {
          login: (username: string, password: string): void => login(username, password),
          logout,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const contextState = React.useContext(AuthContext);
  if (contextState === null) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return contextState;
}

export {useAuth, AuthProvider};
