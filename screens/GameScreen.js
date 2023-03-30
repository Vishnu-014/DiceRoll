import { StyleSheet, Text, View, Image, Platform } from 'react-native'
import React, { useState } from 'react'

import Colors from '../constants/colors';
import PrimaryButton from '../components/UI/PrimaryButton';
import ImageDice from '../components/Game/ImageDice';
import Splash from './Splash';


let currentScoreNum = 0;
let currentDiceNum = 0;
let activePlayer = 0;
let scores = [0, 0];

const GameScreen = () => {

  const [diceRoll, setDiceRoll] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [currentScore1, setCurrentScore1] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [playerScore1, setPlayerScore1] = useState(0);
  const [activePlayerTheme, setActivePlayerTheme] = useState(true);
  const [activePlayerTheme1, setActivePlayerTheme1] = useState(false);
  const [playerWinner, setPlayerWinner] = useState(false);
  const [playerWinner1, setPlayerWinner1] = useState(false);
  const [playing, setPlaying] = useState(true);

  function addCurrentScores() {
    // Add current score 
    currentScoreNum = currentScoreNum + currentDiceNum;

    // Render the current score for active player
    if (activePlayer === 0) {
      setCurrentScore(currentScoreNum);
    }
    if (activePlayer === 1) {
      setCurrentScore1(currentScoreNum);
    }

  }

  const onRollHandler = () => {

    if (playing) {
      const dice = Math.trunc(Math.random() * 6 + 1);
      setDiceRoll(dice);

      // Check if dice is not equal to 1; 
      if (dice !== 1) {
        currentDiceNum = dice;
        addCurrentScores();
      }
      // If dice === 1 switch player, change current score = 0;
      else {

        if (activePlayer === 0) {
          setCurrentScore(0);
        }
        if (activePlayer === 1) {
          setCurrentScore1(0);
        }

        // change current score to 0 
        currentScoreNum = 0;

        // switch player
        activePlayer = activePlayer === 0 ? 1 : 0;

        if (activePlayer === 0) {
          setActivePlayerTheme(true);
          setActivePlayerTheme1(false);
        }
        if (activePlayer === 1) {
          setActivePlayerTheme(false);
          setActivePlayerTheme1(true);
        }
      }
    }

  }


  // Btn Hold
  const onHoldHandler = () => {

    if (playing) {
      // 1. Add current score to active player's score
      if (activePlayer === 0) {
        let curVal = parseInt(currentScore);
        scores[activePlayer] = scores[activePlayer] + curVal;

        setPlayerScore(scores[activePlayer]);
      }
      if (activePlayer === 1) {
        let curVal = parseInt(currentScore1);
        scores[activePlayer] = scores[activePlayer] + curVal;

        setPlayerScore1(scores[activePlayer]);
      }

      // 2. Check if player's score >= 100
      if (scores[activePlayer] >= 30) {
        //TODO: Player wins

        if (activePlayer === 0) {
          setPlayerWinner(true);
          setActivePlayerTheme(false);
        }
        if (activePlayer === 1) {
          setPlayerWinner1(true);
          setActivePlayerTheme1(false);
        }
        setPlaying(false);

      } else {
        if (activePlayer === 0) {
          setCurrentScore(0);
        }
        if (activePlayer === 1) {
          setCurrentScore1(0);
        }

        // change current score to 0 
        currentScoreNum = 0;

        // switch player
        activePlayer = activePlayer === 0 ? 1 : 0;
        // Switch player active theme
        if (activePlayer === 0) {
          setActivePlayerTheme(true);
          setActivePlayerTheme1(false);
        }
        if (activePlayer === 1) {
          setActivePlayerTheme(false);
          setActivePlayerTheme1(true);
        }
      }
    }

  }

  // New Game
  const onNewGame = () => {
    setPlaying(true);
    setDiceRoll(0);
    setCurrentScore(0);
    setCurrentScore1(0);
    setPlayerScore(0);
    setPlayerScore1(0);
    setActivePlayerTheme(true);
    setActivePlayerTheme1(false);
    setPlayerWinner(false)
    setPlayerWinner1(false);
    scores = [0, 0];
    activePlayer = 0;
    currentDiceNum = 0;
    currentScoreNum = 0;
  }

  return (
    <View style={styles.gameScreen}>

      {/* PLAYER 1 */}
      {/* <View style={activePlayerTheme ? styles.playerActive : null}>
        
      </View> */}
      <View style={[styles.playerNotActive, activePlayerTheme ? styles.playerActive : null, playerWinner ? styles.winner : null]}>
        {/* INNER BOX */}
        <View style={styles.innerBox}>
          <View style={styles.innerBoxTop}>
            <Text style={[styles.playerName, playerWinner ? styles.winnerText : null]}>PLAYER 1</Text>
            <Text style={styles.playeScore}>{playerScore}</Text>
          </View>

          <View style={[styles.innerBoxBottom]}>
            {Platform.OS === 'android' ? playerWinner ? <Splash /> : null :
              playerWinner && <Text style={[styles.winText]}>Wins 🏆</Text>
            }
            <View style={[styles.currentScoreBox]}>
              <Text style={styles.currentScoreText}>CURRENT</Text>
              <Text style={styles.currentScoreText}>{currentScore}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* BUTTON IMAGE CONTAINER */}
      <View style={styles.btnContainer}>
        <View style={styles.imgContainer}>
          {/* <Image  source={require(`../assets/images/dice-${1}.png`)} /> */}
          <ImageDice diceValue={diceRoll} />
        </View>
        {/* <Text style={{ textAlign: 'center' }}>{diceRoll}</Text> */}
        <PrimaryButton style={[styles.btnNewGame, { fontFamily: 'GameSpaceAcademy', }]} onPress={onNewGame}>
          New Game
        </PrimaryButton>
        <PrimaryButton tyle={styles.btnRoll} onPress={onRollHandler}>Roll</PrimaryButton>
        <PrimaryButton tyle={styles.btnHold} onPress={onHoldHandler}>Hold</PrimaryButton>

      </View>

      {/* PLAYER 2 */}
      {/* <View style={activePlayerTheme1 ? styles.playerActive : null}>
        
      </View> */}
      <View style={[styles.playerNotActive, activePlayerTheme1 ? styles.playerActive : null, playerWinner1 ? styles.winner : null]}>
        {/* INNER BOX */}
        <View style={styles.innerBox}>
          <View style={styles.innerBoxTop}>
            <Text style={[styles.playerName, playerWinner1 ? styles.winnerText : null]}>PLAYER 2</Text>
            <Text style={styles.playeScore}>{playerScore1}</Text>
          </View>

          <View style={styles.innerBoxBottom}>
            {Platform.OS === 'android' ? playerWinner1 ? <Splash /> : null :
              playerWinner1 && <Text style={[styles.winText]}>Wins 🏆</Text>
            }
            <View style={styles.currentScoreBox}>
              <Text style={styles.currentScoreText}>CURRENT</Text>
              <Text style={styles.currentScoreText}>{currentScore1}</Text>
            </View>
          </View>
        </View>
      </View>

    </View>
  )
}

export default GameScreen

const styles = StyleSheet.create({
  gameScreen: {
    flex: 1,
    flexDirection: 'row',
    margin: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    borderRadius: 30,
  },
  playerActive: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 30,
  },
  playerNotActive: {
    flex: 1,
  },
  innerBox: {
    flex: 1,
    marginHorizontal: 70,
    marginVertical: 20,
    backgroundColor: 'transparent',
    borderColor: 'darkgrey',
    borderWidth: 0,
  },
  innerBoxTop: {
    flex: 1,
    //backgroundColor: '#ccc'
  },
  playerName: {
    marginTop: 18,
    fontFamily: 'GameOver',
    fontSize: 59,
    //fontWeight: 'bold',
    //backgroundColor: 'yellow',
    textAlign: 'center'
  },
  playeScore: {
    marginTop: 13,
    fontSize: 30,
    fontWeight: 'bold',
    //fontFamily: 'Alien',
    color: '#c7365f',
    textAlign: 'center'
  },
  innerBoxBottom: {
    flex: 1,
    //backgroundColor: 'lightgrey',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  currentScoreBox: {
    marginTop: 35,
    // borderWidth: 2,
    //borderColor: 'tomato',
    // borderBottomWidth: 60,
    // borderRightWidth: 90,
    backgroundColor: '#c7365f',
    height: 70,
    width: 100,
  },
  currentScoreText: {
    paddingTop: 4,
    margin: 3,
    textAlign: 'center',
    //fontFamily: 'SodaBerry',
    fontWeight: 'bold',
    color: 'white'
  },
  btnContainer: {
    justifyContent: 'center',
    backgroundColor: 'rgba(117, 54, 130, 0.2)'
  },
  btnNewGame: {

    marginBottom: 50
  },
  btnRoll: {
    fontFamily: 'GameSpaceAcademy',
  },
  btnHold: {

  },
  imgContainer: {
    width: 50,
    height: 50,
    //borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',
    margin: 30,
  },
  image: {
    width: '100%',
    height: '100%'
  },
  winner: {
    flex: 1,
    backgroundColor: '#2f2f2f',
    borderRadius: 30,
  },
  winnerText: {
    color: '#c7365f',
  },
  winText: {
    color: '#c7365f',
    fontSize: 50,
    //fontWeight: 'bold',
    fontFamily: 'SodaBerry',
  }
})