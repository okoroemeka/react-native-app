import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>Game over!</Text>
      <Text>Number of rounds: {props.numberOfRounds}</Text>
      <Text>Number was: {props.userNumber}</Text>
      <Button title="New Game" onPress={props.handleStartNewGame} />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default GameOverScreen;
