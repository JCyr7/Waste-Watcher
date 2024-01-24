import {React, Component} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {COLORS} from '../Utils/colors'
import Divider from '../Utils/Divider'
import Badge from '../ProfileComponents/Badge'

export default class BadgesPopup extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Badge icon={2} msg='Place Top 10 on Leaderboard' />
        <Badge icon={0} msg='Streak Score of 10' />
        <Badge icon={1} msg='1st Waste Entry' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '97%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
})
