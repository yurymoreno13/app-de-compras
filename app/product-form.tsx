import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { createProduct } from '../services/product-management';
import { getSession } from '../services/auth';

export default function ProductForm() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    brand: '',
  });

  const [imageUri, setImageUri] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const pickImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert('Permiso requerido', 'Debes permitir acceso a la galería');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'] as any,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.length > 0) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'No fue posible seleccionar la imagen');
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.description || !form.brand) {
      Alert.alert(
        'Campos requeridos',
        'Completa nombre, precio, descripción y marca'
      );
      return;
    }

    const numericPrice = Number(form.price);

    if (isNaN(numericPrice) || numericPrice <= 0) {
      Alert.alert('Precio inválido', 'Ingresa un precio válido');
      return;
    }

    try {
      setLoading(true);

      const session = await getSession();
      const token = session?.token;

      if (!token) {
        throw new Error('No se encontró la sesión del usuario');
      }

      await createProduct(token, {
        categoryId: 1,
        name: form.name.trim(),
        price: numericPrice,
        imageUrl: imageUri || '',
        description: form.description.trim(),
        brand: form.brand.trim(),
      });

      Alert.alert('Éxito', 'Producto creado correctamente');

      setForm({
        name: '',
        price: '',
        description: '',
        brand: '',
      });
      setImageUri('');

      router.replace('/products');
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'No fue posible crear el producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.smallButton} onPress={() => router.back()}>
            <Text style={styles.smallButtonText}>Volver</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Crear producto</Text>

          <View style={styles.headerSpace} />
        </View>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="#999"
            value={form.name}
            onChangeText={(text) => handleChange('name', text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Precio"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={form.price}
            onChangeText={(text) => handleChange('price', text)}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descripción"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            value={form.description}
            onChangeText={(text) => handleChange('description', text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Marca"
            placeholderTextColor="#999"
            value={form.brand}
            onChangeText={(text) => handleChange('brand', text)}
          />

          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.imageButtonText}>
              {imageUri ? 'Cambiar imagen' : 'Seleccionar y subir imagen'}
            </Text>
          </TouchableOpacity>

          {imageUri ? <Image source={{ uri: imageUri }} style={styles.preview} /> : null}

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'Creando...' : 'Crear producto'}
            </Text>
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
  headerSpace: {
    width: 76,
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
  textArea: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  imageButton: {
    borderWidth: 1.5,
    borderColor: '#c85f89',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 12,
  },
  imageButtonText: {
    color: '#c85f89',
    fontSize: 16,
    fontWeight: 'bold',
  },
  preview: {
    width: '100%',
    height: 180,
    borderRadius: 14,
    marginBottom: 14,
    resizeMode: 'cover',
  },
  submitButton: {
    backgroundColor: '#c85f89',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});