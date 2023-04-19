import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const Main = () => {
  const navigation = useNavigation();
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text testID="titleLabel" style={styles.title}>
          Okta + React Native
        </Text>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              onPress={() => {
                navigation.navigate('BrowserSignIn');
              }}
              title="BrowserSignIn"
            />
          </View>
          <View style={styles.button}>
            <Button
              onPress={() => {
                navigation.navigate('CustomSignIn');
              }}
              title="CustomSignIn"
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Main;

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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0066cc',
    paddingTop: 40,
    textAlign: 'center',
  },
});
