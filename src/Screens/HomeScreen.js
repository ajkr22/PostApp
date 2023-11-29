import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Search Post"
          onPress={() => navigation.navigate('Search')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Create Post"
          onPress={() => navigation.navigate('Create')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87CEEB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4169E1',
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});

export default HomeScreen;
