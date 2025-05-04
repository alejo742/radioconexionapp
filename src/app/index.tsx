import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';

export default function App() {
  useEffect(() => {
    Alert.alert("hola");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expo Firebase TypeScript App</Text>
      
      <View style={styles.card}>
        <Text style={styles.subtitle}>Welcome</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
});