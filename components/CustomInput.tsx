import { StyleSheet, TextInput, View } from 'react-native';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
}

export default function CustomInput({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
}: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5C7D1',
    borderRadius: 12,
    padding: 14,
  },
});