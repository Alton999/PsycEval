import React, { useState } from "react";
import {
	TextInput,
	TouchableOpacity,
	View,
	Text,
	ScrollView
} from "react-native";
import styles from "./styles";
import { objects } from "../../constants/variables";

type Props = {
	finishQuestion: React.Dispatch<React.SetStateAction<boolean>>;
};

const Question4 = ({ finishQuestion }: Props) => {
	return (
		<ScrollView keyboardShouldPersistTaps="handled">
			<View style={styles.mainContainer}>
				<View style={styles.questionContainer}>
					<Text style={styles.question}>
						Please remember these five objects. I will ask you what they are
						later.
					</Text>
					<View>
						{objects.map((object, index) => (
							<View key={index}>
								<Text style={styles.question}>{object}</Text>
							</View>
						))}
					</View>
				</View>
				<View style={styles.questionContainer}>
					<TouchableOpacity
						style={styles.mainButton}
						onPress={() => finishQuestion(true)}
					>
						<Text style={styles.buttonText}>Next question</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
};

export default Question4;
