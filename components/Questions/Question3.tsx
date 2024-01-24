import React, { useState } from "react";
import {
	TextInput,
	TouchableOpacity,
	View,
	Text,
	SafeAreaView,
	FlatList,
	ScrollView
} from "react-native";
import * as Location from "expo-location";

import styles from "./styles";
import SelectToggle from "../SelectToggle/SelectToggle";

type Props = {
	finishQuestion: React.Dispatch<React.SetStateAction<boolean>>;
};

const Question2 = ({ finishQuestion }: Props) => {
	const [questionCorrect, setQuestionCorrect] = useState<Boolean>(false);
	const [questionChecked, setQuestionChecked] = useState<Boolean>(false);
	const [selectedOption, setSelectedOption] = useState<string>("");
	const options = [
		{
			label: "New South Wales",
			value: "NSW"
		},
		{
			label: "Queensland",
			value: "QLD"
		},
		{
			label: "South Australia",
			value: "SA"
		},
		{
			label: "Tasmania",
			value: "TAS"
		},
		{
			label: "Victoria",
			value: "VIC"
		},
		{
			label: "Western Australia",
			value: "WA"
		},
		{
			label: "Australian Capital Territory",
			value: "ACT"
		},
		{
			label: "Northern Territory",
			value: "NT"
		}
	];
	// Returns state of user
	const getLocation = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			// Permission was denied
			console.log("Permission to access location was denied");
			return;
		} else {
			let location = await Location.getCurrentPositionAsync({});
			let reverseGeocode = await Location.reverseGeocodeAsync({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude
			});
			if (reverseGeocode && reverseGeocode.length > 0) {
				let address = reverseGeocode[0].region;
				console.log("Address:", address);
				return address;
			}
		}
	};
	const checkAnswer = async (selectedOption: string) => {
		const userState = await getLocation();
		if (selectedOption !== "") {
			if (userState === selectedOption) {
				setQuestionCorrect(true);
				console.log("You are correct.");
			}
			setQuestionChecked(true);
			console.log("Check answer:", userState);
		}
	};
	const handleSelect = (option: { label: string; value: string }) => {
		setSelectedOption(option.value);
	};
	return (
		<ScrollView keyboardShouldPersistTaps="handled">
			<View style={styles.mainContainer}>
				<View style={styles.questionContainer}>
					<Text style={styles.question}>What state are you currently in?</Text>
					<View style={styles.optionsContainer}>
						<SelectToggle
							options={options}
							onSelect={handleSelect}
							selectedOption={selectedOption}
						/>
					</View>
					{!questionChecked && (
						<View style={styles.buttonContainer}>
							<TouchableOpacity
								style={styles.mainButton}
								onPress={() => {
									checkAnswer(selectedOption);
								}}
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
