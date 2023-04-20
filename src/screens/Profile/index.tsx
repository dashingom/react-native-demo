import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {AppStackParamList} from '../../navigation/AppStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import Error from '../../components/Error';
import {getAccessToken, getUser} from '@okta/okta-react-native';
// import {useAuth} from '../../context/OktaCustomSignInContext';
import {useAuth} from '../../context/OktaBrowserSignInContext';

type Props = NativeStackScreenProps<AppStackParamList, 'Profile'>;

type User = {
  name: string;
  locale: string;
  zoneinfo: string;
};
const Profile: React.FC<Props> = ({navigation}) => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>({});
  const [accessToken, setAccessToken] = useState('');
  const [context, setContext] = useState('');
  const authState = useAuth();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text onPress={authState.actions.logout} style={styles.logoutButton}>
          Logout
        </Text>
      ),
    });

    setLoading(true);
    getUser()
      .then((user) => {
        setLoading(false);
        setContext(JSON.stringify(user, null, 2));
        setUser(user);
      })
      .catch((e) => {
        setLoading(false);
        setError(e.message);
      });
  }, []);

  const getOktaAccessToken = () => {
    setLoading(true);
    getAccessToken()
      .then((token) => {
        setLoading(false);
        setAccessToken(token.access_token);
      })
      .catch((e) => {
        setLoading(false);
        setError(e.message);
      });
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Error error={error} />
        {user && (
          <View style={{paddingLeft: 20}}>
            <Text style={styles.titleHello}>Hello {user.name}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text testID="nameTitleLabel">Name: </Text>
              <Text>{user.name}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text testID="localeTitleLabel">Locale: </Text>
              <Text>{user.locale}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text testID="timeZoneTitleLabel">Zone Info: </Text>
              <Text>{user.zoneinfo}</Text>
            </View>
          </View>
        )}
        <View style={{flexDirection: 'column', marginTop: 20, paddingLeft: 20, width: 300}}>
          <Button
            testID="accessButton"
            style={{marginTop: 40}}
            title="Get access token"
            onPress={getOktaAccessToken}
          />
          {accessToken && (
            <View style={styles.tokenContainer}>
              <Text style={styles.tokenTitle}>Access Token:</Text>
              <Text style={{marginTop: 20}} numberOfLines={5}>
                {accessToken}
              </Text>
            </View>
          )}
        </View>
        <Text>{context}</Text>
      </SafeAreaView>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  button: {
    borderRadius: 40,
    width: 200,
    height: 40,
    marginTop: 40,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  logoutButton: {
    paddingLeft: 10,
    fontSize: 16,
    color: '#0066cc',
  },
  container: {
    flex: 1,
  },
  titleHello: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0066cc',
  },
  titleDetails: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 15,
    textAlign: 'center',
  },
  tokenContainer: {
    marginTop: 20,
  },
  tokenTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
