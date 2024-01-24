import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import styles from "./styles";

export default function App() {
	const router = useRouter();
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.contentContainer}>
				<Text>Once you are ready, press the button to get started!</Text>
				<TouchableOpacity
					style={styles.mainButton}
					onPress={() => router.push("/Quiz")}
				>
					<Text style={styles.buttonText}>Let's get started.</Text>
					<ArrowRight color="white" size={24} />
				</TouchableOpacity>
			</View>
			<StatusBar style="auto" />
		</SafeAreaView>
	);
}
