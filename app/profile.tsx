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
import { clearSession } from '../services/auth';

export default function ProfileScreen() {
  const [name, setName] = useState('Sirley');
  const [lastName, setLastName] = useState('Cachaya');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleUpdate = () => {
    Alert.alert('Éxito', 'Datos actualizados correctamente');
  };

  const handleLogout = async () => {
    await clearSession();
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.smallButton} onPress={() => router.back()}>
            <Text style={styles.smallButtonText}>Volver</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Perfil</Text>

          <TouchableOpacity style={styles.smallButton} onPress={handleLogout}>
            <Text style={styles.smallButtonText}>Salir</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Apellido"
            placeholderTextColor="#999"
            value={lastName}
            onChangeText={setLastName}
          />

          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <TextInput
            style={styles.input}
            placeholder="Fecha de nacimiento (YYYY-MM-DD)"
            placeholderTextColor="#999"
            value={birthDate}
            onChangeText={setBirthDate}
          />

          <TouchableOpacity style={styles.primaryButton} onPress={handleUpdate}>
            <Text style={styles.primaryButtonText}>Actualizar datos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push('/product-form')}
          >
            <Text style={styles.secondaryButtonText}>Ir a crear/editar producto</Text>
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
    paddingTop: 28,
    paddingHorizontal: 18,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#7b2956',
  },
  smallButton: {
    borderWidth: 1.2,
    borderColor: '#b85b83',
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    minWidth: 76,
    alignItems: 'center',
  },
  smallButtonText: {
    color: '#b85b83',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 18,
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
  primaryButton: {
    backgroundColor: '#c85f89',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    borderWidth: 1.5,
    borderColor: '#c85f89',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#c85f89',
    fontSize: 17,
    fontWeight: 'bold',
  },
});