import React, {Component} from 'react'
import {StyleSheet, Pressable, Text} from 'react-native'
import {COLORS} from '../Utils/colors'
import {FontAwesome5} from '@expo/vector-icons'
export default class GrainReduciton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Pressable style={styles.container}>
        <FontAwesome5 name='seedling' size={28} color='black' />
        <Text style={styles.label}>Grain</Text>
      </Pressable>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '31%', // Adjust the width for three items in a row
    height: '45%', // Adjust the height as needed
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    shadowOffset: {
      width: -7,
      height: 7
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 1,
    shadowColor: COLORS.blue,
  },
  label: {
    fontSize: 15,
    marginTop: '2%'
  }
})
