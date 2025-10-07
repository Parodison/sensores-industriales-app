import { Slot, Stack } from 'expo-router';
import { View } from 'react-native';
import { WebsocketProvider } from '../contexts/WebsocketContext';

export default function Layout() {
  return (
    <WebsocketProvider>
      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            animation: "slide_from_right",
            headerShown: false,
          }}
        />
      </View>
    </WebsocketProvider>
  );
}
