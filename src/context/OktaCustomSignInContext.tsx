import React, {createContext, useEffect, useState} from 'react';
import {createConfig, isAuthenticated, clearTokens, signIn} from '@okta/okta-react-native';
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

  const checkAuthentication = async () => {
    const result = await isAuthenticated();

    setLoading(false);
    setAuthenticated(result.authenticated);
  };

  useEffect(() => {
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
  }, []);

  const login = (username: string, password: string) => {
    if (loading) {
      return;
    }

    setLoading(true);

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
    clearTokens()
      .then(() => {
        setAuthenticated(false);
      })
      .catch((e) => {
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
