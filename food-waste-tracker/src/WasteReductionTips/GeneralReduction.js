import React, {Component} from 'react'
import {StyleSheet, Pressable, Text, Linking} from 'react-native'
import {COLORS} from '../Utils/colors'
import {MaterialCommunityIcons} from '@expo/vector-icons'

export default class GeneralReduciton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const URL =
      'https://www.mayoclinichealthsystem.org/hometown-health/speaking-of-health/7-ways-to-reduce-food-waste-in-your-kitchen'

    return (
      <Pressable style={styles.container} onPress={() => Linking.openURL(URL)}>
        <MaterialCommunityIcons
          name='food-fork-drink'
          size={30}
          color={COLORS.element}
        />
        <Text style={styles.label}>General</Text>
      </Pressable>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '31%', // Adjust the width for three items in a row
    height: '45%', // Adjust the height as needed
    borderRadius: 10,
    backgroundColor: COLORS.card,
    marginVertical: '1%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: -7,
      height: 7
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 1,
    shadowColor: COLORS.shadow,
  },
  label: {
    fontSize: 15,
    marginTop: '2%',
    color: COLORS.element,
  }
})
