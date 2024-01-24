import React, { useState } from "react";
import {
	TextInput,
	TouchableOpacity,
	View,
	Text,
	ScrollView
} from "react-native";
import styles from "./styles";

type Props = {
	finishQuestion: React.Dispatch<React.SetStateAction<boolean>>;
};

const Question2 = ({ finishQuestion }: Props) => {
	const [yearAnswer, setYearAnswer] = useState<string>("");
	const [questionCorrect, setQuestionCorrect] = useState<Boolean>(false);
	const [questionChecked, setQuestionChecked] = useState<Boolean>(false);
	const checkYear = (userInput: string) => {
		const todayYear = new Date().getFullYear();
		if (yearAnswer === todayYear.toString()) {
			setQuestionCorrect(true);
			setQuestionChecked(true);
			return true;
		} else {
			setQuestionCorrect(false);
			setQuestionChecked(true);
			return false;
		}
	};

	const handleInputChange = (text) => {
		const filteredText = text.replace(/[^0-9]/g, "");
		setYearAnswer(filteredText);
	};
	return (
		<ScrollView keyboardShouldPersistTaps="handled">
			<View style={styles.mainContainer}>
				<View style={styles.questionContainer}>
					<Text style={styles.question}>
						What year is it? Please enter the year below
					</Text>
					<TextInput
						placeholder="Enter year"
						onChangeText={handleInputChange}
						style={styles.textInput}
						placeholderTextColor="#7f8c8d"
						value={yearAnswer}
						keyboardType="numeric"
						maxLength={4}
					/>
					{!questionChecked && (
						<View style={styles.buttonContainer}>
							<TouchableOpacity
								style={styles.mainButton}
								onPress={() => checkYear(yearAnswer)}
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

export default Question2;
