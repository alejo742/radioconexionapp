import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Privacidad: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('@/../assets/images/tab-logo.png')} 
        style={styles.logo} 
        resizeMode="contain" 
      />
      <Text style={styles.policyText}>
        Esta es nuestra política de privacidad. Aquí describimos cómo recopilamos, usamos y protegemos su información personal.
        ...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  policyText: {
    color: '#FFF',
    textAlign: 'center',
  },
});

export default Privacidad;