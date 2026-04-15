import { API_URL } from '../constants';

export interface PersonalInfoResponse {
  success: boolean;
  message: string;
  data?: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    dateOfBirth?: string;
  };
  timestamp?: string;
}

export async function getMyPersonalInfo(token: string): Promise<PersonalInfoResponse> {
  const response = await fetch(`${API_URL}/api/users/me/personal-info`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || 'No se pudo obtener la información personal');
  }

  return result;
}

export async function updateMyPersonalInfo(
  token: string,
  payload: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    dateOfBirth: string;
  }
): Promise<PersonalInfoResponse> {
  const response = await fetch(`${API_URL}/api/users/me/personal-info`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || 'No se pudo actualizar la información personal');
  }

  return result;
}