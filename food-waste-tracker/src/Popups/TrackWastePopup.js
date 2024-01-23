import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView,
  ScrollView
} from 'react-native'
import PagerView from 'react-native-pager-view'
import {COLORS} from '../Utils/colors'
import TrackMeal from '../Popups/TrackMeal'
import TrackWaste from './TrackWaste'

export default class TrackWastePopup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageState: 0,
      closeModal: false
    }
  }
  setPageState(value) {
    this.setState({pageState: value})
  }

  render() {
    return (
      <SafeAreaView flex={1}>
        <View style={styles.tabContainer}>
          <View style={styles.tab}>
            <Pressable onPress={() => this.viewPager.setPage(0)}>
              <Text style={styles.tabText}>Track Meal</Text>
            </Pressable>
            <View
              style={[
                styles.tabIndicator,
                {
                  backgroundColor:
                    this.state.pageState === 0
                      ? COLORS.darkGreen
                      : COLORS.lightGray
                }
              ]}></View>
          </View>
          <View style={styles.tab}>
            <Pressable onPress={() => this.viewPager.setPage(1)}>
              <Text style={styles.tabText}>Track Waste</Text>
            </Pressable>
            <View
              style={[
                styles.tabIndicator,
                {
                  backgroundColor:
                    this.state.pageState === 1
                      ? COLORS.darkGreen
                      : COLORS.lightGray
                }
              ]}></View>
          </View>
        </View>
        <PagerView
          ref={(viewPager) => {
            this.viewPager = viewPager
          }}
          style={styles.pagerView}
          initialPage={0}
          onPageSelected={(e) => {
            this.setPageState(e.nativeEvent.position)
          }}>
          <View key='1'>
            <TrackMeal />
          </View>
          <ScrollView key='2'>
            <TrackWaste />
          </ScrollView>
        </PagerView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1
  },
  tabContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '10%',
    justifyContent: 'space-evenly'
  },
  tab: {
    flexDirection: 'column',
    paddingRight: '3%',
    alignItems: 'center',
    marginBottom: '4%'
  },
  tabText: {
    marginTop: '5%',
    color: COLORS.darkGreen,
    fontSize: 22,
    fontWeight: '500'
  },
  tabIndicator: {
    height: '10%',
    width: '80%',
    alignSelf: 'center',
    marginLeft: '3%',
    borderRadius: 20
  }
})
