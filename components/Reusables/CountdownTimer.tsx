import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import styles from "./styles";

type Props = {
	initialTimeInSeconds: number;
	hasStarted: boolean;
	setShowTimer: React.Dispatch<React.SetStateAction<boolean>>;
};

const CountdownTimer = ({
	initialTimeInSeconds,
	hasStarted,
	setShowTimer
}: Props) => {
	const [timeRemaining, setTimeRemaining] =
		useState<number>(initialTimeInSeconds);

	useEffect(() => {
		if (hasStarted) {
			const timer = setInterval(() => {
				setTimeRemaining((timeRemaining) => timeRemaining - 1);
			}, 10000);
			return () => clearInterval(timer);
		}
	}, []);

	useEffect(() => {
		if (timeRemaining === 0) {
			setTimeRemaining(initialTimeInSeconds);
			setShowTimer(false);
		}
	}, [timeRemaining]);
	return (
		<View style={styles.container}>
			<View style={styles.timerContainer}>
				<Text style={styles.timerText}>{timeRemaining}</Text>
			</View>
		</View>
	);
};

export default CountdownTimer;
