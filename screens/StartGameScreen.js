import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import Card from '../Component/Card';
import Input from '../Component/Input';
import colors from '../constants/colors';
import NumberContainer from '../Component/NumberContainer';

const StartGameScreen = props => {
  const [inputText, setInputText] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [enteredNumber, setEnteredNumber] = useState();
  const handleTextInput = textInput => {
    setInputText(textInput.replace(/[^0-9]/g, ''));
  };
  const handleReset = () => {
    setInputText('');
    setConfirmed(false);
  };
  const handleConfirmed = () => {
    const chosenNumber = Number(inputText);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('invalid number', 'enter a number between 0 and 99', [
        { text: 'okay', style: 'destructive', onPress: handleReset }
      ]);
      return;
    }
    setConfirmed(true);
    setEnteredNumber(chosenNumber);
    setInputText('');
    Keyboard.dismiss();
  };
  let feedbackMessage;
  if (confirmed) {
    feedbackMessage = (
      <Card style={styles.summeryContainer}>
        <Text>You selected:</Text>
        <NumberContainer>{enteredNumber}</NumberContainer>
        <Button
          title="Start Game"
          onPress={() => props.onStartGame(enteredNumber)}
        />
      </Card>
    );
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text>Start a New Game</Text>
        <Card style={styles.inputContainer}>
          <Text style={styles.title}>Select a Number</Text>
          <Input
            onChangeText={handleTextInput}
            value={inputText}
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={handleReset}
                color={colors['primaryColor']}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Comfirm"
                onPress={handleConfirmed}
                color={colors['accent']}
              />
            </View>
          </View>
        </Card>
        {feedbackMessage && feedbackMessage}
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginVertical: 10
  },
  input: {
    width: 40,
    textAlign: 'center'
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
    marginVertical: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  button: {
    width: '40%'
  },
  summeryContainer: {
    marginTop: 10,
    alignItems: 'center'
  }
});
export default StartGameScreen;
