import React, {Component} from 'react'
import {StyleSheet, View, Text, Pressable} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'
import {COLORS} from '../Utils/colors'
import Divider from '../Utils/Divider'

export default class Rank extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rankContainer}>
          <View style={styles.rank}>
            <Text style={styles.textStyle}>{this.props.rank}</Text>
          </View>
          <View style={styles.name}>
            <Text style={styles.textStyle}>{this.props.name}</Text>
          </View>
          <View style={styles.score}>
            <Text style={styles.textStyle}>{this.props.score}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '25%',
    marginVertical: 2,
    alignItems: 'center',
  },
  rankContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: COLORS.settingpress
  },
  rank: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    flex: 5,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  score: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    color: COLORS.text
  },
})
