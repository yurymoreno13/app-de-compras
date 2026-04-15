import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Product } from '../services/products';

interface Props {
  product: Product;
  onAdd: () => void;
}

export default function ProductCard({ product, onAdd }: Props) {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: product.imageUrl || 'https://via.placeholder.com/300x200.png?text=Makeup',
        }}
        style={styles.image}
      />

      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.description}>
        {product.description || 'Producto de maquillaje'}
      </Text>
      <Text style={styles.price}>${product.price}</Text>

      <Pressable style={styles.button} onPress={onAdd}>
        <Text style={styles.buttonText}>Agregar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4A2C40',
    marginBottom: 6,
  },
  description: {
    color: '#555',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#C86B85',
    padding: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
});