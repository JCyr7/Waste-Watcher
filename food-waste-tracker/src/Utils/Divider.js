import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import {COLORS} from './colors'

export default class Divider extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <View style={styles.divider} />
  }
}

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 2,
    borderRadius: 2,
    backgroundColor: COLORS.darkGray
  }
})
