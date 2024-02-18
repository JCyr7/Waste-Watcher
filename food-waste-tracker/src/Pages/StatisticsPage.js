import React, {Component} from 'react'
import {StyleSheet, View, Text, Platform, Pressable, Image, ScrollView} from 'react-native'
import {COLORS} from '../Utils/colors'
import Divider from '../Utils/Divider'
import ViewWaste from '../StatisticsPageComponents/ViewWaste'
import Graph from '../StatisticsPageComponents/Graph'
import {DATA} from '../Utils/TestData'
import Leaderboard from '../LeaderboardComponents/Leaderboard'
import {LOCAL, GLOBAL} from '../Utils/TestData'

export default class StatisticsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visibility: 0
    }
  }

  // Toggle visibility of local and all time leaderboard
  // 0 = Local, 1 = All Time
  setVisibility(value) {
    this.setState({visibility: value})
  }

  // Sort ranks in descending order depending on score
  sortDescendingScore(array) {
    array.sort(function (a, b) {
      return b.score - a.score
    })
    return array
  }
  // Returns array of entries from last 7 days
  getLastSevenDays(data) {
    if (data.length <= 7) return data
    else return data.slice(data.length - 7)
  }

  // Returns total waste from datset
  getTotalWaste(data) {
    const total = data.reduce(
      (accumulator, item) => accumulator + item.amount,
      0
    )
    return total
  }

  // Returns the average waste from dataset
  getAverageWaste(data) {
    const total = data.reduce(
      (accumulator, item) => accumulator + item.amount,
      0
    )
    return total / data.length
  }

  // Returns the most frequent wasted catefoy from dataset
  getMostFrequentCategory(data) {
    const categoriesCount = {}
    let maxCount = 0
    let mostFrequent = null

    data.forEach(({category}) => {
      categoriesCount[category] = (categoriesCount[category] || 0) + 1
      if (categoriesCount[category] > maxCount) {
        maxCount = categoriesCount[category]
        mostFrequent = category
      }
    })
    return mostFrequent
  }

  render() {
    const lastSevenDays = this.getLastSevenDays(DATA)
    const totalWaste = this.getTotalWaste(lastSevenDays).toFixed(2)
    const averageWaste = this.getAverageWaste(lastSevenDays).toFixed(2)
    const mostFrequentCategory = this.getMostFrequentCategory(lastSevenDays)
    const localData = this.sortDescendingScore(LOCAL)
    const globalData = this.sortDescendingScore(GLOBAL)

    return (
      <View style={styles.container}>
        {/* Header */}
        {/* <Image source={require('../../images/logo.png')} style={styles.image}/> */}
        <Text style={styles.titleText}>Trends</Text>
        {/* Waste Summary */}
        <View style={styles.fulllbContainer}>
          {/* Average Daily Waste */}
          <View style={styles.lbcontainer}>
            {/* Header Container */}
            <View style={styles.lbheader}>
              <Text style={styles.lbheaderText}>Leaderboard</Text>
              <View style={styles.lbheaderButtons}>
                {/* Local Button */}
                <Pressable
                  style={[
                    styles.lbbutton,
                    {
                      backgroundColor:
                        this.state.visibility === 0
                          ? COLORS.blue
                          : COLORS.white
                    }
                  ]}
                  onPress={() => this.setVisibility(0)}>
                  <Text style={styles.lbbuttonText}>Local</Text>
                </Pressable>

                {/* All Time Button */}
                <Pressable
                  style={[
                    styles.lbbutton,
                    {
                      backgroundColor:
                        this.state.visibility === 1
                          ? COLORS.blue
                          : COLORS.white
                    }
                  ]}
                  onPress={() => this.setVisibility(1)}>
                  <Text style={styles.lbbuttonText}>Global</Text>
                </Pressable>
              </View>
            </View>

            {/* Leaderboard Container */}
            <View style={styles.lbcontent}>
              {this.state.visibility === 0 && <Leaderboard data={localData} />}
              {this.state.visibility === 1 && <Leaderboard data={globalData} />}
            </View>
          </View>
        </View>


        {/* <View style={styles.statsContainer}>
          <View style={styles.statsContent}>
            <Text style={styles.statsText}>Average Daily Waste:</Text>
            <Text style={styles.statsText}>{averageWaste} lbs</Text>
          </View>
          <Divider /> 

          <View style={styles.statsContent}>
            <Text style={styles.statsText}>Total Waste:</Text>
            <Text style={styles.statsText}>{totalWaste} lbs</Text>
          </View>
          <Divider />

          <View style={styles.statsContent}>
            <Text style={styles.statsText}>Most Wasted Category:</Text>
            <Text style={styles.statsText}>{mostFrequentCategory}</Text>
          </View>
        </View> */}

        {/* Line Graph */}
        <View style={styles.graphContainer}>
          <Text style={styles.graphHeader}>This Week's Daily Waste</Text>
          <Graph data={lastSevenDays} />
        </View>


        <View style={styles.bottomButtonsContainer}>
          <Pressable style={styles.bottomButton}>
            <Text style={styles.bottomButtonText}>History</Text>
          </Pressable>
          <Pressable style={styles.bottomButton}>
            <Text style={styles.bottomButtonText}>Goals</Text>
          </Pressable>
        </View>


      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? '3%' : '0%',
    marginBottom: '5%'
  },


  image: {
    width: '60%',
    height: 'auto',
    tintColor: COLORS.blue,
    aspectRatio: 1290 / 193,
  },
  titleText: {
    color: COLORS.blue,
    fontWeight: '400',
    fontSize: 28,
  },


  fulllbContainer: {
    width: '90%',
    height: '40%',
    backgroundColor: COLORS.lightBlue,
    borderRadius: 10,
  },
  lbcontainer: {
    flex: 1,
    width: '100%',
    height: '80%',
    alignItems: 'center',
    marginTop: '2%',
  },
  lbheader: {
    width: '100%',
    height: '20%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: COLORS.transparent,
  },
  lbheaderText: {
    fontSize: 20,
    fontWeight: '700',
    paddingBottom: '2%',
    color: COLORS.blue
  },
  lbheaderButtons: {
    width: '90%',
    height: '45%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',

  },
  lbbutton: {
    width: '35%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: COLORS.blue
  },
  lbbuttonText: {
    color: COLORS.white
  },
  lbcontent: {
    width: '90%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },




  // statsContainer: {
  //   width: '90%',
  //   height: '10%',
  //   backgroundColor: COLORS.lightBlue,
  //   borderRadius: 10,
  // },  
  // statsContent: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   width: '100%',
  //   marginBottom: '2%',
  // },
  // statsText: {
  //   fontSize: 15,
  //   color: COLORS.blue,
  // },
  



  graphContainer: {
    width: '90%',
    height: '40%',
    padding: '3%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.lightBlue,
    borderRadius: 10,
    // shadowOffset: {
    //   width: -3,
    //   height: 4
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 6,
    // elevation: 10,
    // shadowColor: COLORS.shadow
  },

  graphHeader: {
    marginBottom: '-3%',
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.blue
  },




  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  bottomButton: {
    backgroundColor: COLORS.lightBlue,
    borderRadius: 10,
    width: '40%',
    padding: 10,
    alignItems: 'center',
  },
  bottomButtonText: {
    color: COLORS.blue,
    fontSize: 16,
    fontWeight: '700',
  },


})
