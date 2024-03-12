import React, {Component} from 'react'
import {StyleSheet, Pressable, Text, Linking} from 'react-native'
import {COLORS} from '../Utils/colors'
import {MaterialCommunityIcons} from '@expo/vector-icons'

export default class MeatReduciton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const URL =
          'https://www.respectfood.com/article/9-ways-to-save-meat-before-it-gets-wasted/'
    return (
      <Pressable style={styles.container} onPress={() => Linking.openURL(URL)}>
        <MaterialCommunityIcons name='food-steak' size={30} color='black' />
        <Text style={styles.label}>Meat</Text>
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
  },
  label: {
    fontSize: 15,
    marginTop: '2%'
  }
})
