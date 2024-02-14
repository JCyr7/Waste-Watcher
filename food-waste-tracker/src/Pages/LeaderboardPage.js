import React, {Component} from 'react'
import {StyleSheet,
  View,
  Text, 
  Pressable, 
  Image,
  Platform,
} from 'react-native'
import {COLORS} from '../Utils/colors'
import Leaderboard from '../LeaderboardComponents/Leaderboard'
import {LOCAL, GLOBAL} from '../Utils/TestData'

export default class LeaderboardPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }



  render() {

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>My Food Waste Solutions</Text>
        </View>
        <View style={styles.mapContainer}>
          <Text style={styles.mapText}>Map feature coming soon</Text>
        </View>
        <View style={styles.heirarchyContainer}>
          <Text style={styles.heirarchyText}>Heirarchy feature coming soon</Text>
        </View>
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsText}>Tips feature coming soon</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    width: '100%',
    height: '7.5%',
    marginTop: Platform.OS === 'android' ? '5%' : '0%',
    // borderRadius: 0,
    // shadowOffset: {
    //   width: 0,
    //   height: 4
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 8,
    // elevation: 10,
    // shadowColor: COLORS.blue,
    marginBottom: '4%',
  },
  titleText: {
    color: COLORS.blue,
    fontWeight: '500',
    fontSize: 24,
  },
  mapContainer:{
    width: '85%',
    height: '30%',
    marginBottom: '4%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.lightBlue,
  },
  mapText: {
    color: COLORS.blue,
  },
  heirarchyContainer:{
    height: '20%',
    width: '85%',
    marginBottom: '4%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.lightBlue,
  },
  heirarchyText: {
    color: COLORS.blue,
  },
  tipsContainer:{
    height: '30%',
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.lightBlue,
  },
  tipsText: {
    color: COLORS.blue,
  },
})
