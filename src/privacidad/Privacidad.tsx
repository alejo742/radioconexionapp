import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const Privacidad: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('@/../assets/images/tab-logo.png')} 
        style={styles.logo} 
        resizeMode="contain" 
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.policyTitle}>
          Política de Privacidad{'\n\n'}
        </Text>
        <Text style={styles.policyText}>
          En Radio Conexión, valoramos y respetamos su privacidad. Esta política explica cómo recopilamos, usamos y protegemos su información personal.{'\n\n'}
          1. Información que recopilamos:{'\n'}
          - Información de contacto (nombre, correo electrónico) solo si usted la proporciona voluntariamente.{'\n'}
          - Datos de uso anónimos para mejorar la experiencia de la aplicación.{'\n\n'}
          2. Uso de la información:{'\n'}
          - Utilizamos la información para ofrecer y mejorar nuestros servicios.{'\n'}
          - No compartimos su información personal con terceros, salvo requerimiento legal.{'\n\n'}
          3. Seguridad:{'\n'}
          - Implementamos medidas razonables para proteger su información.{'\n\n'}
          4. Cambios en la política:{'\n'}
          - Podemos actualizar esta política. Notificaremos cualquier cambio relevante en la aplicación.{'\n\n'}
          Si tiene preguntas, contáctenos a través de nuestros canales oficiales.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  policyTitle: {
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  policyText: {
    color: '#FFF',
    textAlign: 'left',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default Privacidad;