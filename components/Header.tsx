import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, StatusBar, TouchableOpacity } from 'react-native';
import { InterText as Text } from './InterText';
import ArrowBack from '../assets/svg/arrow_back.svg'
import { useRouter } from 'expo-router';

interface HeaderProps {
  backButton?: boolean;
}

export const Header = (props: HeaderProps) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {props.backButton &&
        <TouchableOpacity style={{
          position: "absolute",
          top: 45,
          left: 20,
          padding: 10, // <- área clickeable más grande
          zIndex: 1000
        }}
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <ArrowBack width={35} height={35} />
        </TouchableOpacity>
      }
      <StatusBar backgroundColor="rgba(169, 169, 169, 1)" />
      <Text type='bold' style={styles.text}>DATA-SENSER</Text>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: StatusBar.currentHeight || 30,
    backgroundColor: '#a8a8a8ff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    position: "relative"

  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: "center",
    width: 100,
    flex: 3,
  },
});
