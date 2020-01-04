import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './Component/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [useNumber, setUsenumber] = useState();
  const [guessRounds, setguessRounds] = useState(0);

  const startGameHandler = selectedNumber => {
    setUsenumber(selectedNumber);
  };
  const configureNewGame = () => {
    setguessRounds(0);
    setUsenumber(null);
  };
  const handleGameOver = numberOfRounds => {
    setguessRounds(numberOfRounds);
  };
  let current = <StartGameScreen onStartGame={startGameHandler} />;
  if (useNumber && guessRounds <= 0) {
    current = <GameScreen userInput={useNumber} onGameOver={handleGameOver} />;
  } else if (guessRounds > 0) {
    current = (
      <GameOverScreen
        numberOfRounds={guessRounds}
        userNumber={useNumber}
        handleStartNewGame={configureNewGame}
      />
    );
  }
  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {current}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
