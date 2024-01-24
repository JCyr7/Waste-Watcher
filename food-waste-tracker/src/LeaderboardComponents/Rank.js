import React, {Component} from 'react'
import {StyleSheet, View, Text, Pressable} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'
import {COLORS} from '../Utils/colors'
import Divider from '../Utils/Divider'

export default class Rank extends Component {
  constructor(props) {
    super(props)
    this.state = {
      img: <MaterialIcons name='face' size={24} color='black' />
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rankContainer}>
          <View style={styles.rank}>
            <Text>{this.props.rank}</Text>
          </View>
          <View style={styles.img}>
            <Text>{this.state.img}</Text>
          </View>
          <View style={styles.name}>
            <Text>{this.props.name}</Text>
          </View>
          <View style={styles.score}>
            <Text>{this.props.score}</Text>
          </View>
        </View>
        <Divider />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '10%',
    alignItems: 'center'
  },
  rankContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row'
  },
  rank: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    flex: 5,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  score: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
