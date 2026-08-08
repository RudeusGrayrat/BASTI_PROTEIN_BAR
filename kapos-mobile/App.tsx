import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.brandMark}>
        <Text style={styles.brandLetter}>K</Text>
      </View>
      <Text style={styles.eyebrow}>KAPOS MOBILE</Text>
      <Text style={styles.title}>Venta rapida con Izipay</Text>
      <Text style={styles.description}>
        Terminal movil de Kapos para seleccionar productos, identificar al cliente,
        aplicar puntos, cobrar y emitir comprobantes desde el mismo backend de
        Kapos.
      </Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0b0b',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  brandMark: {
    width: 78,
    height: 78,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 39,
    backgroundColor: '#b4e610',
    shadowColor: '#b4e610',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 10,
  },
  brandLetter: {
    color: '#111111',
    fontSize: 42,
    fontWeight: '900',
  },
  eyebrow: {
    marginTop: 28,
    color: '#b4e610',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 4,
    textAlign: 'center',
  },
  title: {
    marginTop: 14,
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
  },
  description: {
    marginTop: 14,
    maxWidth: 340,
    color: '#d8dec8',
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
  },
});
