import React, {Component, Fragment} from 'react';

import {SafeAreaView, ScrollView, Button, StyleSheet, Text, View} from 'react-native';
import {
  createConfig,
  signIn,
  signOut,
  isAuthenticated,
  getUser,
  getUserFromIdToken,
  EventEmitter,
} from '@okta/okta-react-native';
import octaConfig from '../../auth.config';

export default class Auth extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      context: null,
    };
    this.checkAuthentication = this.checkAuthentication.bind(this);
  }

  async componentDidMount() {
    let that = this;
    EventEmitter.addListener('signInSuccess', function (e: Event) {
      that.setState({authenticated: true});
      that.setContext('Logged in!');
    });
    EventEmitter.addListener('signOutSuccess', function (e: Event) {
      that.setState({authenticated: false});
      that.setContext('Logged out!');
    });
    EventEmitter.addListener('onError', function (e: Event) {
      console.warn(e);
      that.setContext(e.error_message);
    });
    EventEmitter.addListener('onCancelled', function (e: Event) {
      console.warn(e);
    });
    await createConfig({
      clientId: octaConfig.oidc.clientId,
      redirectUri: octaConfig.oidc.redirectUri,
      endSessionRedirectUri: octaConfig.oidc.endSessionRedirectUri,
      discoveryUri: octaConfig.oidc.discoveryUri,
      scopes: octaConfig.oidc.scopes,
      requireHardwareBackedKeyStore: octaConfig.oidc.requireHardwareBackedKeyStore,
    });
    await this.checkAuthentication();
  }

  componentWillUnmount() {
    EventEmitter.removeAllListeners('signInSuccess');
    EventEmitter.removeAllListeners('signOutSuccess');
    EventEmitter.removeAllListeners('onError');
    EventEmitter.removeAllListeners('onCancelled');
  }

  async componentDidUpdate() {
    await this.checkAuthentication();
  }

  async checkAuthentication() {
    const result = await isAuthenticated();
    if (result.authenticated !== this.state.authenticated) {
      this.setState({authenticated: result.authenticated});
    }
  }

  async login() {
    await signIn();
  }

  async logout() {
    await signOut();
  }

  async getUserIdToken() {
    const user = await getUserFromIdToken();
    this.setContext(JSON.stringify(user, null, 2));
  }

  async getMyUser() {
    const user = await getUser();
    this.setContext(JSON.stringify(user, null, 2));
  }

  setContext = (message) => {
    this.setState({
      context: message,
    });
  };

  renderButtons() {
    if (this.state.authenticated) {
      return (
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              onPress={async () => {
                await this.getUserIdToken();
              }}
              title="Get User From Id Token"
            />
          </View>
          <View style={styles.button}>
            <Button
              onPress={async () => {
                await this.getMyUser();
              }}
              title="Get User From Request"
            />
          </View>
        </View>
      );
    }
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView style={styles.container}>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              {this.state.authenticated ? (
                <Button
                  style={styles.button}
                  testID="logoutButton"
                  onPress={async () => {
                    await this.logout();
                  }}
                  title="Logout"
                />
              ) : (
                <Button
                  style={styles.button}
                  testID="loginButton"
                  onPress={async () => {
                    await this.login();
                  }}
                  title="Login"
                />
              )}
            </View>
          </View>
          {this.renderButtons()}
          <Text>{this.state.context}</Text>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    width: 300,
    height: 40,
    marginTop: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  infoBox: {
    backgroundColor: 'lightskyblue',
    borderRadius: 5,
  },
});
