import React, {Component} from 'react'
import {StyleSheet, Pressable, Text, Linking} from 'react-native'
import {COLORS} from '../Utils/colors'
import {MaterialCommunityIcons} from '@expo/vector-icons'

export default class FishReduciton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const URL =
      "https://www.linkedin.com/advice/0/what-best-practices-reducing-food-waste-increasing#:~:text=If%20you%20have%20leftover%20seafood,freeze%20it%20for%20later%20use.&text=It's%20simple.,from%20the%20ish%20once%20filleted."

    return (
      <Pressable style={styles.container} onPress={() => Linking.openURL(URL)}>
        <MaterialCommunityIcons name='fish' size={30} color='black' />
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
    backgroundColor: COLORS.white,
    marginVertical: '1%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    marginTop: '2%'
  }
})
