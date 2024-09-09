import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, Dimensions, Platform, KeyboardAvoidingView, StatusBar, useWindowDimensions, StyleSheet, Alert } from 'react-native';

const App = () => {
  const { width, height } = useWindowDimensions();
  const [isPortrait, setIsPortrait] = useState(height > width);

  useEffect(() => {
    const handleChange = ({ window }) => {
      setIsPortrait(window.height > window.width);
    };

    Dimensions.addEventListener('change', handleChange);

    return () => {
      Dimensions.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <StatusBar
        barStyle={isPortrait ? 'dark-content' : 'light-content'}
        backgroundColor={isPortrait ? 'white' : 'black'}
      />
      <View style={[styles.buttonContainer, isPortrait ? styles.buttonContainerPortrait : styles.buttonContainerLandscape]}>
        <Button title="Button 1" onPress={() => Alert.alert('Button 1 Pressed')} />
        <Button title="Button 2" onPress={() => Alert.alert('Button 2 Pressed')} />
      </View>
      <Image
        source={require('./assets/Logo.png')}
        style={[styles.image, { width: width * 0.8, height: (width * 0.8) * 0.6 }]}
        resizeMode="contain"
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  buttonContainerPortrait: {
    flexDirection: 'column',
  },
  buttonContainerLandscape: {
    flexDirection: 'row',
  },
  image: {
    margin: 20,
  },
});

export default App;
