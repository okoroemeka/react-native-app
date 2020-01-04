import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import NumberContainer from '../Component/NumberContainer';
import Card from '../Component/Card';

const genereteRandomNumber = (minNumber, maxNumber, exclude) => {
  const min = Math.ceil(minNumber);
  const max = Math.floor(maxNumber);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return genereteRandomNumber(min, max, exclude);
  }
  return randomNumber;
};

const GameScreen = ({ userInput, onGameOver }) => {
  const [currentGuess, setCurrentGuess] = useState(
    genereteRandomNumber(1, 100, userInput)
  );
  const [rounds, setRounds] = useState(0);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  useEffect(() => {
    if (currentGuess === userInput) {
      onGameOver(rounds);
    }
  }, [currentGuess, onGameOver, userInput]);
  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < userInput) ||
      (direction === 'greater' && currentGuess > userInput)
    ) {
      return Alert.alert("Don't cheat bross", 'You are better than this....', [
        { text: 'sorry!', style: 'cancel' }
      ]);
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = genereteRandomNumber(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setRounds(currentRounds => currentRounds + 1);
  };
  return (
    <View style={styles.screen}>
      <Text>Opponent's guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="Lower" onPress={() => nextGuessHandler('lower')} />
        <Button title="Greater" onPress={() => nextGuessHandler('greater')} />
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    padding: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    maxWidth: '80%'
  }
});
export default GameScreen;
