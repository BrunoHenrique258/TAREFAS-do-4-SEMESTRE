import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import IMCCalculator from './components/IMCCalculator';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Calculadora de IMC</Text>
      <IMCCalculator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
});
