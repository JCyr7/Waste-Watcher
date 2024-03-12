import React, {Component} from 'react'
import {StyleSheet, Pressable, Text, Linking} from 'react-native'
import {COLORS} from '../Utils/colors'
import {FontAwesome5} from '@expo/vector-icons'

export default class ProduceReduciton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const URL =
      'https://www.bamco.com/blog/24-tips-to-reduce-food-waste/'

    return (
      <Pressable style={styles.container} onPress={() => Linking.openURL(URL)}>
        <FontAwesome5 name='carrot' size={30} color='black' />
        <Text style={styles.label}>Produce</Text>
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
    marginTop: '2%',
  }
})
