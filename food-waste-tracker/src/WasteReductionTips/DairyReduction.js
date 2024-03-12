import React, {Component} from 'react'
import {StyleSheet, Pressable, Text, Linking} from 'react-native'
import {COLORS} from '../Utils/colors'
import {MaterialCommunityIcons} from '@expo/vector-icons'

export default class DairyReduciton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const URL =
      "https://www.floridamilk.com/in-the-news/blog/easy-ways-to-reduce-dairy-food-waste.stml#:~:text=Store%20in%20the%20coldest%20part,you're%20finished%20with%20it."

    return (
      <Pressable style={styles.container} onPress={() => Linking.openURL(URL)}>
        <MaterialCommunityIcons name='cow' size={30} color='black' />
        <Text style={styles.label}>Dairy</Text>
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
