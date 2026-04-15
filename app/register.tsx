import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { registerUser } from '../services/auth';
import { encryptPassword } from '../utils/encryption';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Campos requeridos', 'Completa nombre, correo y contraseña');
      return;
    }

    try {
      setLoading(true);

      const fullName = name.trim();
      const parts = fullName.split(' ').filter(Boolean);
      const firstName = parts[0] || fullName;
      const lastName = parts.slice(1).join(' ') || 'Usuario';

      await registerUser({
        firstName,
        lastName,
        identificationNumber: `${Date.now()}`,
        email: email.trim().toLowerCase(),
        encryptedPassword: encryptPassword(password),
      });

      Alert.alert('Éxito', 'Cuenta creada correctamente');
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'No fue posible crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Crear cuenta</Text>
          <Text style={styles.subtitle}>Regístrate para continuar</Text>
        </View>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.registerButtonText}>
              {loading ? 'Creando...' : 'Crear cuenta'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push('/')}
          >
            <Text style={styles.loginButtonText}>Ya tengo cuenta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7eef2',
  },
  container: {
    flexGrow: 1,
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 30,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#7b2956',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8d6a7b',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  input: {
    backgroundColor: '#faf7f8',
    borderWidth: 1,
    borderColor: '#e6ccd7',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 14,
    color: '#222',
  },
  registerButton: {
    backgroundColor: '#c85f89',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 12,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginButton: {
    borderWidth: 1.5,
    borderColor: '#c85f89',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#c85f89',
    fontSize: 17,
    fontWeight: 'bold',
  },
});