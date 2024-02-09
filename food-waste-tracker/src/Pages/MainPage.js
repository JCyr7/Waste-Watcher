import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Pressable,
  SafeAreaView,
  BackHandler,
  Image,
  Text,
} from 'react-native'
import {
  Ionicons,
  Foundation,
  FontAwesome
} from '@expo/vector-icons'
import {COLORS} from '../Utils/colors'
import PagerView from 'react-native-pager-view'
import HomePage from '../Pages/HomePage'
//import ProfilePage from '../Pages/ProfilePage'
//import ArcGISMap from './ArcGISMap'
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
          initialPage={1}
          onPageSelected={(e) => {
            this.setPageState(e.nativeEvent.position)
          }}>
          {/* Content of the home page pager view */}
          {/* <ArcGISMap key='1' /> */}
          <StatisticsPage key='1'></StatisticsPage>
          <HomePage key='2' navigation={navigation} />
          <LeaderboardPage key='3' />
          {/* <ProfilePage key='5' /> */}
        </PagerView>
        {/* Navigation bar at the bottom of the page */}
        <View style={styles.navigationBar}>
          {/* <Pressable
            onPress={() => this.viewPager.setPage(0)}
            style={[
              {
                borderBottomLeftRadius: 10,
                borderTopLeftRadius: 10,
              },
              styles.navigationButton
            ]}> */}
            {/* Icon for layer button on the far left */}
            {/* <FontAwesome5
              name='layer-group'
              size={30}
              style={{
                color:
                  this.state.pageState === 0
                    ? COLORS.darkGreen
                    : COLORS.black
              }}
            /> 
          </Pressable>*/}
          <Pressable
            onPress={() => this.viewPager.setPage(0)}
            style={styles.navigationButton}>
            {/* Icon for grid button on the middle left */}
            {/* <Ionicons
              name='grid'
              size={30}
              style={{
                color:
                  this.state.pageState === 0
                    ? COLORS.darkGreen
                    : COLORS.black
              }}
            /> */}
            <Image 
            source={require('../../images/bulb.png')}
            style={{
              width: 30,
              height: 30,
              tintColor: this.state.pageState === 0 ? COLORS.darkGreen : COLORS.black,
            }}/>
            <Text style={[
              styles.iconText,
              {color: this.state.pageState === 0 ? COLORS.darkGreen : COLORS.black}
            ]}>Insights</Text>
          </Pressable>
          <Pressable
            onPress={() => this.viewPager.setPage(1)}
            style={styles.navigationButton}>
            {/* Icon for home button in the middle */}
            {/* <Foundation
              name='home'
              size={30}
              style={{
                color:
                  this.state.pageState === 1
                    ? COLORS.darkGreen
                    : COLORS.black
              }}
            /> */}
            <Image 
            source={require('../../images/home.png')}
            style={{
              width: 30,
              height: 30,
              tintColor: this.state.pageState === 1 ? COLORS.darkGreen : COLORS.black,
            }}/>
            <Text style={[
              styles.iconText,
              {color: this.state.pageState === 1 ? COLORS.darkGreen : COLORS.black}
            ]}>Home</Text>
          </Pressable>
          <Pressable
            onPress={() => this.viewPager.setPage(2)}
            style={styles.navigationButton}>
            {/* Icon for leaderboard on middle right */}
            {/* <Foundation
              name='book'
              size={30}
              style={{
                color:
                  this.state.pageState === 2
                    ? COLORS.darkGreen
                    : COLORS.black
              }}
            /> */}
            <Image 
            source={require('../../images/book.png')}
            style={{
              width: 30,
              height: 30,
              tintColor: this.state.pageState === 2 ? COLORS.darkGreen : COLORS.black,
            }}/>
            <Text style={[
              styles.iconText,
              {color: this.state.pageState === 2 ? COLORS.darkGreen : COLORS.black}
            ]}>Explore</Text>
          </Pressable>
          {/* <Pressable
            onPress={() => this.viewPager.setPage(4)}
            style={[
              {borderBottomRightRadius: 10, borderTopRightRadius: 10},
              styles.navigationButton
            ]}> */}
            {/* Icon for profile on the far right */}
            {/* <FontAwesome
              name='user'
              size={30}
              style={{
                color:
                  this.state.pageState === 4
                    ? COLORS.darkGreen
                    : COLORS.black
              }}
            />
          </Pressable> */}
        </View>
        {/* Profile icon in the top right */}
        {/* <Pressable
          style={styles.profileIcon}
          onPress={() => {
            // Add logic to navigate to the profile page
          }}>
          <Image
            source={require('../../images/profile.png')} // Provide the correct path to your profile image
            style={{ width: 30, height: 30, tintColor: COLORS.black }}/>
          <Text style={styles.profileText}>Profile</Text>
        </Pressable> */}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  pagerView: {
    flex: 1
  },
  navigationBar: {
    flexDirection: 'row',
    width: '90%',
    height: '6.5%',
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
    width: '33%',
    height: '100%',
    backgroundColor: COLORS.transparent,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconText: {
    color: COLORS.black,
    marginTop: 5,
    marginLeft: 1.5,
  },
  
})
