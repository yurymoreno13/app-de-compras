import { API_URL } from '../constants';

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  brand?: string;
  color?: string;
  stock?: number;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Labial Mate Rosado',
    description: 'Labial de larga duración con acabado mate.',
    price: 29900,
    imageUrl: 'https://via.placeholder.com/300x200.png?text=Labial',
    brand: 'Beauty',
    color: 'Rosado',
    stock: 10,
  },
  {
    id: 2,
    name: 'Base Líquida Natural',
    description: 'Base ligera con cobertura media.',
    price: 45900,
    imageUrl: 'https://via.placeholder.com/300x200.png?text=Base',
    brand: 'Natural',
    color: 'Beige',
    stock: 8,
  },
  {
    id: 3,
    name: 'Paleta de Sombras Nude',
    description: 'Paleta de colores suaves para uso diario.',
    price: 55900,
    imageUrl: 'https://via.placeholder.com/300x200.png?text=Sombras',
    brand: 'Glow',
    color: 'Nude',
    stock: 6,
  },
];

// Productos creados localmente para demo
export const localCreatedProducts: Product[] = [];

export function addLocalCreatedProduct(product: Product) {
  localCreatedProducts.unshift(product);
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/api/products`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.message || 'No se pudieron cargar los productos');
    }

    const apiData =
      Array.isArray(result) ? result :
      Array.isArray(result.data) ? result.data :
      Array.isArray(result.data?.content) ? result.data.content :
      Array.isArray(result.content) ? result.content :
      Array.isArray(result.products) ? result.products :
      [];

    const normalizedApiData = apiData.map((item: any, index: number) => ({
      id: Number(item.id ?? index + 100),
      name: item.name ?? 'Producto',
      description: item.description ?? 'Sin descripción',
      price: Number(item.price ?? 0),
      imageUrl: item.imageUrl ?? item.image ?? 'https://via.placeholder.com/300x200.png?text=Producto',
      brand: item.brand ?? 'Marca',
      color: item.color ?? 'Color',
      stock: Number(item.stock ?? 0),
    }));

    if (normalizedApiData.length > 0) {
      return [...localCreatedProducts, ...normalizedApiData];
    }

    return [...localCreatedProducts, ...mockProducts];
  } catch {
    return [...localCreatedProducts, ...mockProducts];
  }
}