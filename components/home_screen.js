import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './button'; // tombol reusable

export default function HomeScreen({ navigation }) {
  const handleLogout = () => {
    navigation.replace('Login'); // kembali ke login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu Utama</Text>

      <Button 
        title="Cari Currency by Region" 
        onPress={() => navigation.navigate('CurrencySearchByRegion')} 
      />

      <Button 
        title="Logout" 
        color="#d32f2f" 
        onPress={handleLogout} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: '#f0f2f5' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20, 
    color: '#714B67' 
  }
});
