import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { auth, db } from '@/config/firebase';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [data, setData] = useState<string>('No data fetched yet');

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Cleanup subscription
    return unsubscribe;
  }, []);

  const signInAnon = async () => {
    try {
      await signInAnonymously(auth);
      console.log('Signed in anonymously');
    } catch (error) {
      console.error('Error signing in: ', error);
    }
  };

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'test'));
      let result = '';
      querySnapshot.forEach((doc) => {
        result += `${doc.id} => ${JSON.stringify(doc.data())}\n`;
      });
      setData(result || 'No documents found');
    } catch (error) {
      console.error('Error fetching data: ', error);
      setData(`Error fetching data: ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expo Firebase TypeScript App</Text>
      
      <View style={styles.card}>
        <Text style={styles.subtitle}>Auth Status:</Text>
        <Text>{user ? `Signed in as ${user.uid}` : 'Not signed in'}</Text>
        {!user && 
          <TouchableOpacity onPress={signInAnon} >
            Sign in Anonymously
          </TouchableOpacity>}
      </View>
      
      <View style={styles.card}>
        <Text style={styles.subtitle}>Firestore Data:</Text>
        <Text style={styles.data}>{data}</Text>
        <TouchableOpacity onPress={fetchData} >
          Fetch Data
        </TouchableOpacity>
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
  data: {
    fontFamily: 'monospace',
    marginBottom: 10,
  },
});