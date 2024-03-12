import React, {Component} from 'react'
import {StyleSheet, Pressable, Text} from 'react-native'
import {COLORS} from '../Utils/colors'
import {MaterialCommunityIcons} from '@expo/vector-icons'

export default class FishReduciton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Pressable style={styles.container}>
        <MaterialCommunityIcons name='fish' size={30} color={COLORS.element} />
        <Text style={styles.label}>Fish</Text>
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
    color: COLORS.element
  }
})
