import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ImageDice = ({ diceValue }) => {
  let diceNumber = parseInt(diceValue);
  if (diceNumber === 1) {
    return <Image style={styles.image} source={require('../../assets/images/dice-1.png')} />
  }
  if (diceNumber === 2) {
    return <Image style={styles.image} source={require('../../assets/images/dice-2.png')} />
  }
  if (diceNumber === 3) {
    return <Image style={styles.image} source={require('../../assets/images/dice-3.png')} />
  }
  if (diceNumber === 4) {
    return <Image style={styles.image} source={require('../../assets/images/dice-4.png')} />
  }
  if (diceNumber === 5) {
    return <Image style={styles.image} source={require('../../assets/images/dice-5.png')} />
  }
  if (diceNumber === 6) {
    return <Image style={styles.image} source={require('../../assets/images/dice-6.png')} />
  }
}

export default ImageDice

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    shadowColor: '#171717',
    shadowOffset: { height: 3, width: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 0.5
  },
})