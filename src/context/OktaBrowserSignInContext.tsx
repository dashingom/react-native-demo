import React, {createContext, useEffect, useState} from 'react';
import {
  createConfig,
  signInWithBrowser,
  signOut,
  isAuthenticated,
  EventEmitter,
} from '@okta/okta-react-native';
import oktaConfig from '../../auth.config';

interface Values {
  authenticated: boolean;
  context: string | null;
}

interface Actions {
  login: () => void;
  logout: () => void;
}

type AuthContextInterface = {
  values: Values;
  actions: Actions;
};
type AuthProviderProps = {children?: React.ReactNode};

export const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [context, setContext] = useState<string | null>(null);

  const checkAuthentication = async () => {
    const result = await isAuthenticated();
    if (result.authenticated !== authenticated) {
      setAuthenticated(result.authenticated);
    }
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
      console.warn(e);
      setContext(e.error_message);
    });
    EventEmitter.addListener('onCancelled', function (e: Event) {
      console.warn(e);
    });

    const getConfig = async () => {
      await createConfig({
        clientId: oktaConfig.oidc.clientId,
        redirectUri: oktaConfig.oidc.redirectUri,
        endSessionRedirectUri: oktaConfig.oidc.endSessionRedirectUri,
        discoveryUri: oktaConfig.oidc.discoveryUri,
        scopes: oktaConfig.oidc.scopes,
        requireHardwareBackedKeyStore: oktaConfig.oidc.requireHardwareBackedKeyStore,
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

  const login = async () => {
    await signInWithBrowser();
  };

  const logout = async () => {
    await signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        values: {
          authenticated,
          context,
        },
        actions: {
          login,
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
