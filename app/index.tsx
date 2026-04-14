import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>💄 Beauty Store</Text>
      <Text style={styles.subtitle}>Bienvenido a la app de maquillaje</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCEEF2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#8E3E63',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    color: '#555',
  },
});