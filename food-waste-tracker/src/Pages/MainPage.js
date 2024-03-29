import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Pressable,
  SafeAreaView,
  BackHandler,
  Image,
  Text,
  Platform
} from 'react-native'
import {COLORS} from '../Utils/colors'
import PagerView from 'react-native-pager-view'
import HomePage from '../Pages/HomePage'
import TrendsPage from './TrendsPage'
import SolutionsPage from './SolutionsPage'
import ProfilePage from '../Pages/ProfilePage'

export default class MainPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageState: 2,
      popupVisible: false
    }
    this.logOut = this.logOut.bind(this)
  }

  callStatisticsFunction = () => {
    // Assuming you have a reference to the StatisticsPage component
    this.statisticsPageRef.reloadHistoryPage();
  };

  //used to keep track of page state and sync swiping with nav bar
  setPageState(value) {
    this.setState({pageState: value})
  }

  logOut = () => {
    const {navigation} = this.props;

    navigation.navigate('LogoutPage');
  }

  changePass = () => {
    const {navigation} = this.props;

    navigation.navigate('ForgotPassword');
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
          initialPage={0}
          onPageSelected={(e) => {
            this.setPageState(e.nativeEvent.position)
          }}>
          {/* Content of the home page pager view */}
          {/* <ArcGISMap key='1' /> */}
          <HomePage key='1' navigation={navigation} onCallStatisticsFunction={this.callStatisticsFunction}/>
          <TrendsPage key='2' ref={(ref) => { this.statisticsPageRef = ref; }}></TrendsPage>
          <SolutionsPage key='3' />
          <ProfilePage key='4' callLogOut={this.logOut} callChangePass={this.changePass}/>
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
              size={27}
              style={{
                color:
                  this.state.pageState === 0
                    ? COLORS.blue
                    : COLORS.black
              }}
            /> 
          </Pressable>*/}
          <Pressable
            onPress={() => this.viewPager.setPage(0)}
            style={styles.navigationButton}>
            {/* Icon for home button in the middle */}
            {/* <Foundation
              name='home'
              size={27}
              style={{
                color:
                  this.state.pageState === 1
                    ? COLORS.blue
                    : COLORS.black
              }}
            /> */}
            <Image 
            source={require('../../images/home.png')}
            style={{
              width: 27,
              height: 27,
              tintColor: this.state.pageState === 0 ? COLORS.icon : COLORS.iconlight,
            }}/>
            <Text style={[
              styles.iconText,
              {color: this.state.pageState === 0 ? COLORS.icon : COLORS.iconlight}
            ]}>Home</Text>
          </Pressable>
          <Pressable
            onPress={() => {this.viewPager.setPage(1); this.callStatisticsFunction()}}
            style={styles.navigationButton}>
            {/* Icon for grid button on the middle left */}
            {/* <Ionicons
              name='grid'
              size={27}
              style={{
                color:
                  this.state.pageState === 0
                    ? COLORS.blue
                    : COLORS.black
              }}
            /> */}
            <Image 
            source={require('../../images/analytics.png')}
            style={{
              width: 27,
              height: 27,
              tintColor: this.state.pageState === 1 ? COLORS.icon : COLORS.iconlight,
            }}/>
            <Text style={[
              styles.iconText,
              {color: this.state.pageState === 1 ? COLORS.icon : COLORS.iconlight}
            ]}>Trends</Text>
          </Pressable>

          <Pressable
            onPress={() => this.viewPager.setPage(2)}
            style={styles.navigationButton}>
            {/* Icon for Solutions on middle right */}
            {/* <Foundation
              name='book'
              size={27}
              style={{
                color:
                  this.state.pageState === 2
                    ? COLORS.blue
                    : COLORS.black
              }}
            /> */}
            <Image 
            source={require('../../images/book.png')}
            style={{
              width: 27,
              height: 27,
              tintColor: this.state.pageState === 2 ? COLORS.icon : COLORS.iconlight,
            }}/>
            <Text style={[
              styles.iconText,
              {color: this.state.pageState === 2 ? COLORS.icon : COLORS.iconlight}
            ]}>Solutions</Text>
          </Pressable>
          <Pressable
            onPress={() => this.viewPager.setPage(3)}
            style={styles.navigationButton}>
            {/* Icon for grid button on the middle left */}
            {/* <Ionicons
              name='grid'
              size={27}
              style={{
                color:
                  this.state.pageState === 0
                    ? COLORS.blue
                    : COLORS.black
              }}
            /> */}
            <Image
            source={require('../../images/profile.png')}
            style={{
              width: 27,
              height: 27,
              tintColor: this.state.pageState === 3 ? COLORS.icon : COLORS.iconlight,
            }}/>
            <Text style={[
              styles.iconText,
              {color: this.state.pageState === 3 ? COLORS.icon : COLORS.iconlight}
            ]}>Profile</Text>
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
              size={27}
              style={{
                color:
                  this.state.pageState === 4
                    ? COLORS.blue
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
            style={{ width: 27, height: 27, tintColor: COLORS.black }}/>
          <Text style={styles.profileText}>Profile</Text>
        </Pressable> */}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },

  pagerView: {
    flex: 1
  },
  navigationBar: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '95%',
    height: '6.5%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: Platform.OS === 'android' ? '3%' : '0%',
  },
  navigationButton: {
    width: '25%',
    height: '100%',
    backgroundColor: COLORS.transparent,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconText: {
    marginTop: 5,
    marginLeft: 1.5,
  },
  
})
