import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { localCart } from './products';

export default function CartScreen() {
  const total = localCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = localCart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Pressable style={styles.smallButton} onPress={() => router.back()}>
            <Text style={styles.smallButtonText}>Volver</Text>
          </Pressable>

          <Text style={styles.title}>Mi carrito</Text>

          <Pressable style={styles.smallButton} onPress={() => router.replace('/products')}>
            <Text style={styles.smallButtonText}>Productos</Text>
          </Pressable>
        </View>

        <Text style={styles.subtitle}>Productos agregados: {totalItems}</Text>

        <FlatList
          data={localCart}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text>Cantidad: {item.quantity}</Text>
              </View>

              <Text style={styles.price}>
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          )}
          ListEmptyComponent={<Text>No hay productos agregados.</Text>}
        />

        <View style={styles.footer}>
          <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>

          <Pressable style={styles.checkoutButton} onPress={() => router.replace('/products')}>
            <Text style={styles.checkoutText}>Seguir comprando</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF7FA',
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 10,
    backgroundColor: '#FFF7FA',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  smallButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#C86B85',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  smallButtonText: {
    color: '#C86B85',
    fontWeight: '700',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#8E3E63',
  },
  subtitle: {
    marginVertical: 16,
    color: '#555',
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontWeight: '700',
    marginBottom: 4,
  },
  price: {
    fontWeight: '800',
    color: '#8E3E63',
  },
  footer: {
    marginTop: 16,
    gap: 12,
  },
  total: {
    fontSize: 20,
    fontWeight: '800',
  },
  checkoutButton: {
    backgroundColor: '#C86B85',
    padding: 14,
    borderRadius: 12,
  },
  checkoutText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
});