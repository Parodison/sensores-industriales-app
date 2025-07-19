import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Text, StyleSheet } from 'react-native';

export const Header = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="rgb(0, 145, 17)" />
      <Text style={styles.text}>Sensores Industriales</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(0, 145, 17)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
