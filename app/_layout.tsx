import { Stack } from "expo-router/stack";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React from "react";

// SplashScreen.preventAutoHideAsync();

const Layout = () => {
	const [fontsLoaded] = useFonts({
		DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
		DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
		DMRegular: require("../assets/fonts/DMSans-Regular.ttf")
	});
	// const onLayoutRootView = useCallback(async () => {
	// 	if (fontsLoaded) {
	// 		// Only show homepage if fonts have been loaded
	// 		await SplashScreen.hideAsync();
	// 	}
	// }, [fontsLoaded]);
	// if (!fontsLoaded) return null;

	return (
		<Stack
			screenOptions={{
				title: "My home",
				headerStyle: { backgroundColor: "#f4511e" },
				headerTintColor: "#fff",
				headerTitleStyle: {
					fontWeight: "bold"
				},
				headerTitle: "Home"
			}}
		/>
	);
};

export default Layout;
