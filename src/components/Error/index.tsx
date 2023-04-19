import React from 'react';
import {StyleSheet, Text} from 'react-native';

export interface Props {
  error: string;
}

const Error: React.FC<Props> = ({error}) => {
  if (!error) {
    return null;
  }

  return (
    <Text testID="errorBox" style={styles.error}>
      Error: {error}
    </Text>
  );
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
  },
});

export default Error;
