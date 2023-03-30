import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import GameScreen from './screens/GameScreen';
import { Fragment, useEffect } from 'react';
import Splash from './screens/Splash';

//c7365f

export default function App() {

  const [fontsLoaded] = useFonts({
    "GameSpaceAcademy": require('./assets/fonts/GameSpaceAcademy.otf'),
    "Gameplay": require('./assets/fonts/Gameplay.ttf'),
    "GameOver": require('./assets/fonts/game_over.ttf'),
    "Alien": require("./assets/fonts/Alien.ttf"),
    "SodaBerry": require('./assets/fonts/SodaBerry.ttf'),
    "ExpoBold": require('./assets/fonts/Expo-Bold.otf')
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, [])

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <Fragment>
      <StatusBar style='dark' />
      {/* //<Splash /> */}
      <LinearGradient
        style={styles.rootContainer}
        colors={['#753682', '#bf2e34']}
      >
        <GameScreen />
      </LinearGradient>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 12,
  },
});
