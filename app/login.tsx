import { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import CustomInput from '../components/CustomInput';
import { loginUser } from '../services/auth';
import { saveToken, saveUser } from '../utils/storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert('Error', 'Correo y contraseña son obligatorios');
        return;
      }

      setLoading(true);

      const result = await loginUser(email, password);
      const token = result?.data?.token;

      if (!token) {
        throw new Error('No se recibió token de autenticación');
      }

      await saveToken(token);
      await saveUser(result.data);

      Alert.alert('Éxito', 'Inicio de sesión correcto');
      router.push('/products');
    } catch (error: any) {
      const message =
        error?.message || JSON.stringify(error) || 'No fue posible iniciar sesión';

      if (message.includes('Database temporarily unavailable')) {
        Alert.alert(
          'Servidor ocupado',
          'La base de datos está temporalmente no disponible. Entraremos al catálogo para la demo.'
        );
        router.push('/products');
        return;
      }

      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center bg-blush px-5">
      <Text className="mb-5 text-center text-3xl font-extrabold text-wine">
        Iniciar sesión
      </Text>

      <CustomInput value={email} onChangeText={setEmail} placeholder="Correo" />
      <CustomInput
        value={password}
        onChangeText={setPassword}
        placeholder="Contraseña"
        secureTextEntry
      />

      <Pressable className="mt-2 rounded-xl bg-rose px-4 py-4" onPress={handleLogin}>
        <Text className="text-center font-bold text-white">
          {loading ? 'Ingresando...' : 'Ingresar'}
        </Text>
      </Pressable>

      <Pressable className="mt-4" onPress={() => router.push('/register')}>
        <Text className="text-center font-bold text-wine">Crear cuenta</Text>
      </Pressable>
    </View>
  );
}