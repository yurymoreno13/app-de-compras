import { API_URL } from '../constants';
import { addLocalCreatedProduct } from './products';

export interface ProductPayload {
  categoryId: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  brand: string;
}

async function parseResponseSafely(response: Response) {
  const text = await response.text();

  if (!text || !text.trim()) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

export async function createProduct(token: string, payload: ProductPayload) {
  const response = await fetch(`${API_URL}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await parseResponseSafely(response);

  if (response.status === 403) {
    const localProduct = {
      id: Date.now(),
      name: payload.name,
      description: payload.description,
      price: payload.price,
      imageUrl: payload.imageUrl,
      brand: payload.brand,
    };

    addLocalCreatedProduct(localProduct);

    return {
      success: true,
      localDemo: true,
      message: 'Producto creado localmente en modo demo por restricción de rol.',
      data: localProduct,
    };
  }

  if (!response.ok) {
    throw new Error(
      (result as any)?.message ||
        `No se pudo crear el producto. Status: ${response.status}`
    );
  }

  return result;
}

export async function updateProduct(
  token: string,
  productId: string,
  payload: ProductPayload
) {
  const response = await fetch(`${API_URL}/api/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await parseResponseSafely(response);

  if (!response.ok) {
    throw new Error(
      (result as any)?.message ||
        `No se pudo actualizar el producto. Status: ${response.status}`
    );
  }

  return result;
}