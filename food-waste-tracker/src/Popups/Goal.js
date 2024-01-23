import React, {Component} from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'

export default class Goal extends Component {
  constructor(props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress(index) {
    // const index = this.props.i
    this.props.callBack(index)
  }

  render() {
    return (
      <Pressable
        style={styles.container}
        onPress={() => this.handlePress(this.props.i)}>
        <Text style={styles.dateText}>
          {this.props.month} {this.props.day}
        </Text>
        <Text style={styles.wasteText}>{this.props.waste} lbs</Text>
        <Text style={styles.streakText}>{this.props.streak} days</Text>
      </Pressable>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '95%',
    paddingHorizontal: '3%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
    // borderWidth: 1
  },
  dateText: {
    flex: 1,
    fontSize: 15,
    textAlign: 'left'
    // borderWidth: 1
  },
  wasteText: {
    flex: 1,
    fontSize: 15,
    textAlign: 'center'
    // borderWidth: 1
  },
  streakText: {
    flex: 1,
    fontSize: 15,
    textAlign: 'right'
    // borderWidth: 1
  }
})
