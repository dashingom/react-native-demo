import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {
  createConfig,
  signInWithBrowser,
  signOut,
  getAccessToken,
  isAuthenticated,
  getUser,
  getUserFromIdToken,
  refreshTokens,
  EventEmitter,
} from '@okta/okta-react-native';
import configFile from '../../auth.config';

function App(): JSX.Element {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [context, setContext] = useState(null);

  useEffect(() => {
    EventEmitter.addListener('signInSuccess', function (error) {
      if (error) {
        console.warn(error);
        setContext(error.error_message);
        return;
      }

      setAuthenticated(true);
      setContext('Logged in!');
    });

    EventEmitter.addListener('signOutSuccess', function (error) {
      if (error) {
        console.warn(error);
        setContext(error.error_message);
        return;
      }

      setAuthenticated(false);
      setContext('Logged out!');
    });

    EventEmitter.addListener('onError', function (error) {
      console.warn(error);
      setContext(error.error_message);
    });

    EventEmitter.addListener('onCancelled', function (error) {
      console.warn(error);
    });

    const getConfig = async () => {
      await createConfig({
        clientId: configFile.oidc.clientId,
        redirectUri: configFile.oidc.redirectUri,
        endSessionRedirectUri: configFile.oidc.endSessionRedirectUri,
        discoveryUri: configFile.oidc.discoveryUri,
        scopes: configFile.oidc.scopes,
        requireHardwareBackedKeyStore: configFile.oidc.requireHardwareBackedKeyStore,
      });
    };

    getConfig();

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
    <>
      <Text testID="titleLabel" style={styles.title}>
        Okta + React Native
      </Text>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          {authenticated ? (
            <Button
              style={styles.button}
              testID="logoutButton"
              onPress={() => {
                logout();
              }}
              title="Logout"
            />
          ) : (
            <Button
              style={styles.button}
              testID="loginButton"
              onPress={() => {
                login();
              }}
              title="Login"
            />
          )}
        </View>
      </View>
      <Text testID="descriptionBox">{context}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    borderRadius: 40,
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  context: {
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0066cc',
    paddingTop: 40,
    textAlign: 'center',
  },
});

export default App;
