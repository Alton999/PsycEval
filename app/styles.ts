import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20
	},
	contentContainer: {
		gap: 20
	},
	mainButton: {
		backgroundColor: "#f4511e",
		padding: 20,
		borderRadius: 10,
		textAlign: "center",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between"
	},
	buttonText: {
		color: "white",
		fontSize: 20
	}
});

export default styles;
