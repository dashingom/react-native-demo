import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useGetUsersQuery} from '../redux/services/user';

interface iProps {
  title: string;
}

interface iUser {
  id: number;
  name: string;
}

const Item: React.FC<iProps> = ({title}) => (
  <View style={styles.item}>
    <Text>{title}</Text>
  </View>
);

const User: React.FC = () => {
  const {data: users, isLoading, isError} = useGetUsersQuery();

  const renderItem = ({item}: {item: iUser}) => <Item title={item.name} />;

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) {
    return <Text>Something went wrong</Text>;
  }

  return (
    <FlatList data={users} renderItem={renderItem} keyExtractor={(item: iUser) => item.name} />
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
