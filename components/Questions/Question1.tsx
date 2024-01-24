import React, { useState } from "react";
import {
	TextInput,
	TouchableOpacity,
	View,
	Text,
	ScrollView
} from "react-native";
import styles from "./styles";

type QuestionProp = {
	finishQuestion: React.Dispatch<React.SetStateAction<boolean>>;
};

const Question1 = ({ finishQuestion }: QuestionProp) => {
	const [dayAnswer, setDayAnswer] = useState<string>("");
	const [questionCorrect, setQuestionCorrect] = useState<Boolean>(false);
	const [questionChecked, setQuestionChecked] = useState<Boolean>(false);
	const checkDay = (userInput: string) => {
		const daysOfWeek = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday"
		];
		const todayDay = new Date().getDay();
		const dayName = daysOfWeek[todayDay];

		if (userInput.trim().toLowerCase() === dayName.trim().toLowerCase()) {
			setQuestionCorrect(true);
			setQuestionChecked(true);
			return true;
		} else {
			setQuestionCorrect(false);
			setQuestionChecked(true);
			return false;
		}
	};
	return (
		<ScrollView keyboardShouldPersistTaps="handled">
			<View style={styles.mainContainer}>
				<View style={styles.questionContainer}>
					<Text style={styles.question}>
						What day of the week is it? Please ensure it is spelt correctly
					</Text>
					<TextInput
						placeholder="Day of the week"
						onChangeText={(text) => setDayAnswer(text)}
						style={styles.textInput}
						placeholderTextColor="#7f8c8d"
					/>
					{!questionChecked && (
						<View style={styles.questionContainer}>
							<TouchableOpacity
								style={styles.mainButton}
								onPress={() => checkDay(dayAnswer)}
							>
								<Text style={styles.buttonText}>Check answer</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
				{questionChecked && (
					<View style={styles.questionContainer}>
						<Text>
							{questionCorrect
								? "Correct! Well done."
								: "Incorrect. Let's move on."}
						</Text>
						<TouchableOpacity
							style={styles.mainButton}
							onPress={() => finishQuestion(true)}
						>
							<Text style={styles.buttonText}>Next question</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		</ScrollView>
	);
};

export default Question1;
