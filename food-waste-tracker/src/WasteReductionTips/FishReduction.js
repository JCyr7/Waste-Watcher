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
        <MaterialCommunityIcons name='fish' size={35} color='black' />
        <Text style={styles.label}>Fish</Text>
      </Pressable>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    height: '31%',
    borderRadius: 10,
    backgroundColor: '#d3d3d3',
    marginVertical: '1%',
    marginHorizontal: '1%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: 15,
    marginTop: '2%'
  }
})
