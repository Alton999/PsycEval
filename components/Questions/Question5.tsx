import React, { useState } from "react";
import {
	TextInput,
	TouchableOpacity,
	View,
	Text,
	ScrollView
} from "react-native";
import styles from "./styles";
import { Mic } from "lucide-react-native";
import { Audio } from "expo-av";
import CountdownTimer from "../Reusables/CountdownTimer";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

type Props = {
	finishQuestion: React.Dispatch<React.SetStateAction<boolean>>;
};

const Question5 = ({ finishQuestion }: Props) => {
	const [isRecording, setIsRecording] = useState<boolean>(false);
	const [transcription, setTranscription] = useState<string>("");
	const [numAnimalsDetected, setNumAnimalsDetected] = useState<string>("");
	const [timerValue, setTimerValue] = useState<number>(60);
	const [hasStarted, setHasStarted] = useState<boolean>(true);
	const [questionChecked, setQuestionChecked] = useState<Boolean>(false);

	const countAnimals = async (transcription: string) => {
		const formData = new FormData();
		formData.append("transcription", transcription);
		try {
			const response = await fetch("http://192.168.1.90:5000/count-animals", {
				method: "POST",
				body: formData
			});
			const responseData = await response.json();
			console.log("Num animals detected", responseData);
			setNumAnimalsDetected(responseData);
		} catch (err) {
			console.log(err);
		}
	};
	// Function to transcribe audio from custom Flask endpoint
	const transcribeAudio = async (audioUri: string) => {
		const formData = new FormData();
		const uriParts = audioUri.split(".");
		const type = uriParts[uriParts.length - 1];
		formData.append("file", {
			uri: audioUri,
			type: `audio/${type}`,
			name: `test.${type}`
		} as unknown as Blob);
		// const responseBlob = await fetch(audioUri);
		// const blob = await responseBlob.blob();
		// console.log("Response Blob original", blob);

		// console.log("Blob", blob);
		// formData.append("file", blob);
		formData.append("filename", "test.wav");
		try {
			const response = await fetch("http://192.168.1.90:5000/transcribe", {
				method: "POST",
				body: formData
			});
			const responseData = await response.json();
			setTranscription(responseData);
			if (responseData) {
				countAnimals(responseData);
			}
			return responseData;
		} catch (err) {
			console.log(err);
		}
	};
	// Returns audio uri
	const recordAudio = async () => {
		try {
			await Audio.requestPermissionsAsync();
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: true,
				playsInSilentModeIOS: true
			});

			// start recording
			console.log("start recording");
			const recording = new Audio.Recording();
			await recording.prepareToRecordAsync(
				Audio.RecordingOptionsPresets.HighQuality
			);
			await recording.startAsync();
			setIsRecording(true);
			// stop recording
			setTimeout(async () => {
				await recording.stopAndUnloadAsync();
				const uri = recording.getURI();
				if (uri) {
					setIsRecording(false);
					// console.log("Recording has stopped.", uri);
					transcribeAudio(uri);
				}
			}, 60000);
		} catch (err) {
			console.log("Failed to start recording", err);
		}
	};
	return (
		<ScrollView
			keyboardShouldPersistTaps="handled"
			contentContainerStyle={styles.mainContainer}
		>
			<View style={styles.questionContainer}>
				<Text style={styles.question}>
					Please name as many animals as you can in one minute.
				</Text>

				{transcription && <Text>Transcription: {transcription}</Text>}
				{numAnimalsDetected && (
					<Text>Number of animals detected: {numAnimalsDetected}</Text>
				)}
			</View>
			<View>
				{isRecording && (
					<View style={styles.containerCenter}>
						{/* <CountdownTimer
                initialTimeInSeconds={timerValue}
                hasStarted={hasStarted}
                setShowTimer={setShowTimer}
              /> */}
						<CountdownCircleTimer
							isPlaying={isRecording}
							duration={timerValue}
							colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
							colorsTime={[30, 15, 5, 3]}
						>
							{({ remainingTime }) => (
								<Text style={styles.timerText}>{remainingTime}</Text>
							)}
						</CountdownCircleTimer>
					</View>
				)}
			</View>

			{!questionChecked ? (
				<View>
					<Text style={styles.instructions}>
						Press the microphone when you are ready.
					</Text>
					<View style={styles.buttonContainerCenter}>
						<TouchableOpacity
							style={[styles.roundButton, isRecording && styles.isRecording]}
							disabled={isRecording}
							onPress={() => recordAudio()}
						>
							<Mic size={32} color="white" />
						</TouchableOpacity>
					</View>
				</View>
			) : (
				<View style={styles.questionContainer}>
					<Text></Text>
					<TouchableOpacity
						style={styles.mainButton}
						onPress={() => finishQuestion(true)}
					>
						<Text style={styles.buttonText}>Next question</Text>
					</TouchableOpacity>
				</View>
			)}
		</ScrollView>
	);
};

export default Question5;
