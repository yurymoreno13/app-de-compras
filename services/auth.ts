import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../constants';
import { encryptPassword } from '../utils/encryption';

const SESSION_KEY = 'user_session';

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  identificationNumber: string;
  email: string;
  encryptedPassword: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    email: string;
    role: string;
    userId: string;
  };
  timestamp?: string;
}

export const registerUser = async (data: RegisterPayload) => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      ...data,
      role: 'BUYER',
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || 'Error en registro');
  }

  return result;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const encryptedPassword = encryptPassword(password);

  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      encryptedPassword,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || 'Error en login');
  }

  // Guardar sesión si viene data
  if (result?.data) {
    await saveSession(result.data);
  }

  return result;
};

export const saveSession = async (sessionData: {
  token: string;
  email: string;
  role: string;
  userId: string;
}) => {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
};

export const getSession = async () => {
  const data = await AsyncStorage.getItem(SESSION_KEY);
  return data ? JSON.parse(data) : null;
};

export const getToken = async () => {
  const session = await getSession();
  return session?.token || null;
};

export const clearSession = async () => {
  await AsyncStorage.removeItem(SESSION_KEY);
};