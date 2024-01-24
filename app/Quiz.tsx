import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	TextInput
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import Question1 from "../components/Questions/Question1";
import Question2 from "../components/Questions/Question2";
import Question3 from "../components/Questions/Question3";
import Question4 from "../components/Questions/Question4";
import Question5 from "../components/Questions/Question5";

const Quiz = () => {
	const [currentQuestion, setCurrentQuestion] = useState<number>(1);
	const [currentQuestionFinished, setCurrentQuestionFinished] =
		useState<boolean>(false);

	useEffect(() => {
		if (currentQuestionFinished) {
			setCurrentQuestion(currentQuestion + 1);
			setCurrentQuestionFinished(false);
		}
	}, [currentQuestionFinished]);
	const renderQuestion = () => {
		switch (currentQuestion) {
			case 1:
				return <Question1 finishQuestion={setCurrentQuestionFinished} />;
			case 2:
				return <Question2 finishQuestion={setCurrentQuestionFinished} />;
			case 3:
				return <Question3 finishQuestion={setCurrentQuestionFinished} />;
			case 4:
				return <Question4 finishQuestion={setCurrentQuestionFinished} />;
			case 5:
				return <Question5 finishQuestion={setCurrentQuestionFinished} />;
			default:
				return (
					<View>
						<Text>Error question does not exist.</Text>
					</View>
				);
		}
	};
	return (
		<SafeAreaView style={styles.container}>
			<Stack.Screen
				options={{
					headerTitle: "Quiz"
				}}
			/>
			{renderQuestion()}
		</SafeAreaView>
	);
};

export default Quiz;
