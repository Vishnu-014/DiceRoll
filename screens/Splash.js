import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native';
import GameScreen from './GameScreen';


const Splash = () => {
  const screen = <GameScreen />
  return (
    <View style={styles.animation}>
      <Lottie
        source={require('../assets/images/winner.json')}
        autoPlay
        loop={true}
        renderMode="cover"
      />
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  animation: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
    height: 100,
    width: 100
  },
})