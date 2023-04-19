import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuth} from '../../context/OktaBrowserSignInContext';

function OktaBrowserSignIn(): JSX.Element {
  const authState = useAuth();
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text testID="titleLabel" style={styles.title}>
          Okta + React Native Browser Sign In
        </Text>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              style={styles.button}
              testID="loginButton"
              onPress={() => {
                authState.actions.login();
              }}
              title="Login"
            />
          </View>
        </View>
      </SafeAreaView>
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
  infoBox: {
    backgroundColor: 'lightskyblue',
    borderRadius: 5,
  },
});

export default OktaBrowserSignIn;
