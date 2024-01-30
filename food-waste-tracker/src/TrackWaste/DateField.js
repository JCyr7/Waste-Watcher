import React, {Component} from 'react'
import {StyleSheet, Pressable, Text, Linking} from 'react-native'
import {COLORS} from '../Utils/colors'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export default class GeneralReduciton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const URL =
      'https://www.mayoclinichealthsySstem.org/hometown-health/speaking-of-health/7-ways-to-reduce-food-waste-in-your-kitchen'

    return (
      <Pressable style={styles.container}>
        <Text style={styles.label}>Submit</Text>
      </Pressable>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '20%',
    borderRadius: 20,
    backgroundColor: COLORS.darkGreen,
    marginVertical: '1%',
    marginHorizontal: '1%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 25,
    color: "#e2f0c9",
    marginTop: '1%'
  }
})
