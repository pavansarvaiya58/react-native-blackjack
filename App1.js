import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	ImageBackground,
	UIManager,
	StatusBar,
	NativeModules,
	AppState,
	Platform,
} from "react-native";
import cardsDeck from "./src/data/cards";
import { shuffle, calculatePoints } from "./src/helpers";
import {
	Overlay,
	ChipSelector,
	UserControls,
	FloatingText,
} from "./src/components";
import boardBg from "./src/assets/board.png";

const App1 = () => {
	const [totalBet, setTotalBet] = useState(0);
	const [amount, setAmmount] = useState(5000);
	const [playerHand, setPlayerHand] = useState([]);
	const [dealerHand, setDealerHand] = useState([]);
	const [gameOver, setGameOver] = useState(false);
	const [cardCount, setCardCount] = useState(0);
	const [gameMessage, setGameMessage] = useState("");
	const [appState, setAppState] = useEffect(AppState.currentState);

	useEffect(() => {
		if (Platform.OS === "android") {
			UIManager.setLayoutAnimationEnabledExperimental &&
				UIManager.setLayoutAnimationEnabledExperimental(true);
		}
	}, []);

	const newGame = () => {
		let cardCount = 0;
		shuffle(cardsDeck);

		let playerHand = [],
			dealerHand = [];

		for (let i = 0; i < 2; i++) {
			playerHand.push(cardsDeck[cardCount]);
			cardCount++;
			dealerHand.push(cardsDeck[cardCount]);
			cardCount++;
		}

		this.setState({
			playerHand,
			dealerHand,
			gameover: false,
			cardCount,
			gameMessage: "",
		});
	};

	return (
		<ImageBackground source={boardBg} style={styles.container}>
			<StatusBar backgroundColor={"green"} translucent={true} />

			<View style={styles.bottom}>
				<UserControls
					playerHand={playerHand}
					dealerHand={dealerHand}
					newGame={() => this.newGame()}
					hit={() => this.hit()}
					doubleGame={() => this.doubleGame()}
					endgame={() => this.endgame()}
					gameover={gameover}
					totalBet={totalBet}
					moreMoney={() => this.moreMoney()}
				/>

				<View style={styles.center}>
					<FloatingText text={`Total Bet $ ${totalBet}`} />
				</View>
				<ChipSelector
					onSelect={(chipValue) => {
						if (!gameover) {
							if (chipValue <= amount) {
								this.setState({
									totalBet: totalBet + chipValue,
									amount: amount - chipValue,
								});
							}
						} else {
							if (amount > 0) {
								this.newGame();
								this.setState({
									totalBet: totalBet + chipValue,
									amount: amount - chipValue,
								});
							}
						}
					}}
				/>
				<View style={styles.center}>
					<FloatingText text={`Available $ ${amount}`} />
				</View>

				{gameover && gameMessage != "" && (
					<Overlay
						text={gameMessage}
						onClose={() => {
							this.newGame();
						}}
					/>
				)}
			</View>
		</ImageBackground>
	);
};

export default App1;
