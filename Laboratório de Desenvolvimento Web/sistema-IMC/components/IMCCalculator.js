import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';

export default function IMCCalculator() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState(null);
  const [classificacao, setClassificacao] = useState('');
  const [cor, setCor] = useState('#000');

  function calcularIMC() {
    if (!peso || !altura || altura <= 0) {
      setResultado(null);
      setClassificacao('Preencha corretamente os campos!');
      setCor('red');
      return;
    }

    const imc = (parseFloat(peso) / (parseFloat(altura) * parseFloat(altura))).toFixed(2);
    setResultado(imc);

    const { classificacao, cor } = getIMCClassification(imc);
    setClassificacao(classificacao);
    setCor(cor);

    Keyboard.dismiss();
  }

  function limparCampos() {
    setPeso('');
    setAltura('');
    setResultado(null);
    setClassificacao('');
    setCor('#000');
  }

  function getIMCClassification(imc) {
    imc = parseFloat(imc);
    if (imc < 18.5) {
      return { classificacao: 'Abaixo do Peso', cor: '#FFD580' }; // Laranja Claro
    } else if (imc < 25) {
      return { classificacao: 'Peso Normal', cor: 'green' };
    } else if (imc < 30) {
      return { classificacao: 'Sobrepeso', cor: '#DAA520' }; // Amarelo Escuro
    } else if (imc < 35) {
      return { classificacao: 'Obesidade Grau I', cor: '#FF7F50' }; // Laranja/Vermelho Claro
    } else if (imc < 40) {
      return { classificacao: 'Obesidade Grau II (Severa)', cor: 'red' };
    } else {
      return { classificacao: 'Obesidade Grau III (Mórbida)', cor: '#8B0000' }; // Vermelho Escuro
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Peso (kg):</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 70"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />

      <Text style={styles.label}>Altura (m):</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 1.75"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />

      <TouchableOpacity style={styles.button} onPress={calcularIMC}>
        <Text style={styles.buttonText}>Calcular IMC</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={limparCampos}>
        <Text style={styles.buttonText}>Limpar</Text>
      </TouchableOpacity>

      {resultado && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>Seu IMC é: {resultado}</Text>
          <Text style={[styles.resultText, { color: cor, fontWeight: 'bold' }]}>{classificacao}</Text>
        </View>
      )}

      {!resultado && classificacao && (
        <Text style={[styles.resultText, { color: cor, marginTop: 10 }]}>{classificacao}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 10,
    marginTop: 5,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resultBox: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    marginTop: 5,
  },
});
