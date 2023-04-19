import {ActivityIndicator, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Error from '../../components/Error';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../navigation/AuthStack';
import {useAuth} from '../../context/OktaCustomSignInContext';

type Props = NativeStackScreenProps<AuthStackParamList, 'CustomSignIn'>;

const OktaCustomSignIn: React.FC<Props> = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const authState = useAuth();
  const {loading, error} = authState.values;

  const login = () => {
    authState.actions.login(username, password);
    reset();
  };

  const reset = () => {
    setUsername('');
    setPassword('');
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {loading && <ActivityIndicator />}
        <Text style={styles.title} testID="titleBox">
          Native Sign-In
        </Text>
        <Error error={error} />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <TextInput
              value={username}
              style={styles.textInput}
              placeholder="User Name"
              onChangeText={(username) => setUsername(username)}
              testID="usernameTextInput"
            />
            <TextInput
              style={styles.textInput}
              value={password}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              testID="passwordTextInput"
            />
            <View style={{marginTop: 40, height: 40}}>
              <Button onPress={login} title="Login" testID="loginButton" />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default OktaCustomSignIn;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  textInput: {
    marginTop: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    borderRadius: 40,
    width: 200,
    height: 40,
    marginTop: 40,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0066cc',
    paddingTop: 40,
    textAlign: 'center',
  },
});
