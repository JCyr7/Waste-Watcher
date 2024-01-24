import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class Notification extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Notification</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    paddingHorizontal: '2%'
  },
  text: {}
})
