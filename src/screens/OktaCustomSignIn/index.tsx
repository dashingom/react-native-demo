import {ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Error from '../../components/Error';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../navigation/AuthStack';
import {useAuth} from '../../context/OktaCustomSignInContext';

type Props = NativeStackScreenProps<AuthStackParamList, 'CustomSignIn'>;

const OktaCustomSignIn: React.FC<Props> = () => {
  const [username, setUsername] = useState<string>('onkar.nawghare@mailinator.com');
  const [password, setPassword] = useState<string>('Omkar@123');
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
        <Error error={error} />
        <View>
          <View style={styles.SectionStyle}>
            <TextInput
              value={username}
              style={styles.textInput}
              placeholder="User Name"
              onChangeText={(username) => setUsername(username)}
              testID="usernameTextInput"
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.textInput}
              value={password}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              testID="passwordTextInput"
            />
          </View>
          <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5} onPress={login}>
            <Text style={styles.buttonTextStyle}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default OktaCustomSignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  textInput: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  buttonStyle: {
    backgroundColor: '#007BC1',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
    fontSize: 16,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});
