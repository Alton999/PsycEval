import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		gap: 30,
		justifyContent: "space-between"
	},
	containerCenter: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	questionContainer: {
		display: "flex",
		gap: 20
	},
	mainButton: {
		backgroundColor: "#f4511e",
		padding: 20,
		borderRadius: 10,
		display: "flex",
		alignItems: "center",
		width: "auto"
	},
	buttonText: {
		color: "white",
		fontSize: 20
	},
	question: {
		fontSize: 20
	},
	buttonContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end"
	},
	textInput: {
		borderWidth: 1,
		borderColor: "#f4511e",
		borderRadius: 10,
		paddingVertical: 16,
		paddingHorizontal: 8,
		color: "black"
	},
	optionsContainer: {
		gap: 20
	},
	instructions: {
		fontSize: 16,
		fontWeight: "bold",
		color: "gray",
		marginBottom: 16,
		textAlign: "center"
	},
	roundButton: {
		borderRadius: 999,
		backgroundColor: "#f4511e",
		width: 80,
		height: 80,
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	buttonContainerCenter: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center"
	},
	isRecording: {
		backgroundColor: "#2ecc71"
	},
	timerText: {
		fontSize: 32,
		fontWeight: "bold"
	}
});
export default styles;
