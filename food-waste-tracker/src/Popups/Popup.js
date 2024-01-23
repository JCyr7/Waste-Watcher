import React, {Component} from 'react'
import {View, StyleSheet, Platform} from 'react-native'
import {COLORS} from '../Utils/colors'
export default class Popup extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.popupContainer}>
        <View style={styles.popup}>{this.props.children}</View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  popupContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.opaqueGray,
    alignItems: 'center'
  },
  popup: {
    height: '85%',
    width: '90%',
    marginTop: Platform.OS === 'android' ? '12%' : '14%',
    backgroundColor: COLORS.lightGray,
    borderRadius: 10
  }
})
