import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {COLORS} from '../Utils/colors'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {MaterialIcons} from '@expo/vector-icons'

export default class Badge extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const ICONS = [
      <MaterialCommunityIcons name='fire' size={80} color='black' />,
      <MaterialCommunityIcons
        name='clipboard-edit-outline'
        size={80}
        color='black'
      />,
      <MaterialIcons name='leaderboard' size={80} color='black' />
    ]
    return (
      <View style={styles.container}>
        {ICONS[this.props.icon]}
        <Text style={styles.text}>{this.props.msg}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    height: '25%',
    marginBottom: '4%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowOffset: {
      width: -3,
      height: 4
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
    shadowColor: COLORS.shadow,
    backgroundColor: COLORS.white
  },
  text: {
    fontSize: 15,
    fontWeight: '500'
  }
})
