import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Pressable,
  SafeAreaView,
  BackHandler
} from 'react-native'
import {
  Ionicons,
  Foundation,
  FontAwesome,
  FontAwesome5
} from '@expo/vector-icons'
import {COLORS} from '../Utils/colors'
import PagerView from 'react-native-pager-view'
import HomePage from '../Pages/HomePage'
import ProfilePage from '../Pages/ProfilePage'
import ArcGISMap from './ArcGISMap'
import LeaderboardPage from './LeaderboardPage'
import StatisticsPage from './StatisticsPage'

export default class MainPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageState: 2,
      popupVisible: false
    }
  }

  //used to keep track of page state and sync swiping with nav bar
  setPageState(value) {
    this.setState({pageState: value})
  }

  render() {
    BackHandler.addEventListener('hardwareBackPress', function () {
      BackHandler.exitApp()
      return true
    })
    const {navigation} = this.props
    return (
      <SafeAreaView style={styles.container}>
        {/* put key prop directly into each custom component for each page */}
        <PagerView
          //ref prop passed in order to allow the navigation bar to change the page
          ref={(viewPager) => {
            this.viewPager = viewPager
          }}
          style={styles.pagerView}
          initialPage={2}
          onPageSelected={(e) => {
            this.setPageState(e.nativeEvent.position)
          }}>
          {/* Content of the home page pager view */}
          <ArcGISMap key='1' />
          <StatisticsPage key='2'></StatisticsPage>
          <HomePage key='3' navigation={navigation} />
          <LeaderboardPage key='4' />
          <ProfilePage key='5' />
        </PagerView>
        {/* Navigation bar at the bottom of the page */}
        <View style={styles.navigationBar}>
          <Pressable
            onPress={() => this.viewPager.setPage(0)}
            style={[
              {
                borderBottomLeftRadius: 10,
                borderTopLeftRadius: 10
              },
              styles.navigationButton
            ]}>
            {/* Icon for layer button on the far left */}
            <FontAwesome5
              name='layer-group'
              size={30}
              style={{
                color:
                  this.state.pageState === 0
                    ? COLORS.darkGreen
                    : COLORS.lightGreen
              }}
            />
          </Pressable>
          <Pressable
            onPress={() => this.viewPager.setPage(1)}
            style={styles.navigationButton}>
            {/* Icon for grid button on the middle left */}
            <Ionicons
              name='grid'
              size={30}
              style={{
                color:
                  this.state.pageState === 1
                    ? COLORS.darkGreen
                    : COLORS.lightGreen
              }}
            />
          </Pressable>
          <Pressable
            onPress={() => this.viewPager.setPage(2)}
            style={styles.navigationButton}>
            {/* Icon for home button in the middle */}
            <Foundation
              name='home'
              size={30}
              style={{
                color:
                  this.state.pageState === 2
                    ? COLORS.darkGreen
                    : COLORS.lightGreen
              }}
            />
          </Pressable>
          <Pressable
            onPress={() => this.viewPager.setPage(3)}
            style={styles.navigationButton}>
            {/* Icon for leaderboard on middle right */}
            <Foundation
              name='graph-bar'
              size={30}
              style={{
                color:
                  this.state.pageState === 3
                    ? COLORS.darkGreen
                    : COLORS.lightGreen
              }}
            />
          </Pressable>
          <Pressable
            onPress={() => this.viewPager.setPage(4)}
            style={[
              {borderBottomRightRadius: 10, borderTopRightRadius: 10},
              styles.navigationButton
            ]}>
            {/* Icon for profile on the far right */}
            <FontAwesome
              name='user'
              size={30}
              style={{
                color:
                  this.state.pageState === 4
                    ? COLORS.darkGreen
                    : COLORS.lightGreen
              }}
            />
          </Pressable>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGreen
  },
  pagerView: {
    flex: 1
  },
  navigationBar: {
    flexDirection: 'row',
    width: '90%',
    height: '5%',
    marginBottom: '3%',
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: -3,
      height: 4
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
    shadowColor: COLORS.shadow
  },
  navigationButton: {
    width: '20%',
    height: '100%',
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
