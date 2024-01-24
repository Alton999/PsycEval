import React, { useEffect, useState } from "react";
import {
	TouchableOpacity,
	Text,
	StyleSheet,
	View,
	Touchable
} from "react-native";
// import styles from "./styles";
type Option = {
	label: string;
	value: string;
};
type ToggleProps = {
	options: Option[];
	onSelect: (option: Option) => void;
	selectedOption: string;
};

const SelectToggle = ({ options, onSelect, selectedOption }: ToggleProps) => {
	return (
		<View style={styles.container}>
			<Text>{selectedOption}</Text>
			{options.map((option, index) => (
				<TouchableOpacity
					style={[
						styles.toggleButton,
						selectedOption === option.value && styles.selectedOption
					]}
					key={index}
					onPress={() => onSelect(option)}
				>
					<Text
						style={[
							styles.optionText,
							selectedOption === option.value && styles.selectedOptionText
						]}
					>
						{option.label}
					</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		gap: 12
	},
	toggleButton: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "black"
	},
	selectedOption: {
		backgroundColor: "rgba(244, 81, 30, 0.8)"
	},
	optionText: {
		color: "gray"
	},
	selectedOptionText: {
		color: "black"
	}
});
export default SelectToggle;
