import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import Button from './button'; // pakai tombol reusable

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Setting manual username & password
  const USERNAME = "admin@example.com";
  const PASSWORD = "123456";

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Email dan Password harus diisi!");
      return;
    }
    if (email === USERNAME && password === PASSWORD) {
      Alert.alert("Sukses", "Login berhasil!");
      navigation.replace('Home'); // pindah ke menu utama
    } else {
      Alert.alert("Login Gagal", "Email atau Password salah!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="MASUK" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f0f2f5' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#714B67' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 15, backgroundColor: '#fff' }
});
