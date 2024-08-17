import { StyleSheet, Text, View } from "react-native";
import { Slot, SplashScreen, Stack } from "expo-router";
//SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="(auth)" options={{ headerShown: false }} />
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			
			{/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
		</Stack>
	);
}
