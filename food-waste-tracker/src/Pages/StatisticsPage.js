import React, {Component} from 'react'
import {StyleSheet, View, Text, Platform, Pressable} from 'react-native'
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
        <View style={styles.header}>
          <Text style={styles.headerText}>My Food Waste Trends</Text>
        </View>

        {/* Waste Summary */}
        <View style={styles.summaryContainer}>
          {/* Average Daily Waste */}
          {/* <View style={styles.sectionContent}>
            <Text style={styles.sectionText}>Average Daily Waste:</Text>
            <Text style={styles.sectionText}>{averageWaste} lbs</Text>
          </View>
          <Divider /> */}

          {/* Total Waste */}
          {/* <View style={styles.sectionContent}>
            <Text style={styles.sectionText}>Total Waste:</Text>
            <Text style={styles.sectionText}>{totalWaste} lbs</Text>
          </View>
          <Divider /> */}

          {/* Waste Category */}
          {/* <View style={styles.sectionContent}>
            <Text style={styles.sectionText}>Most Wasted Category:</Text>
            <Text style={styles.sectionText}>{mostFrequentCategory}</Text>
          </View> */}
          <View style={styles.lbcontainer}>
            {/* Header Container*/}
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
                          ? COLORS.darkGreen
                          : COLORS.lightGreen
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
                          ? COLORS.darkGreen
                          : COLORS.lightBlue
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

        {/* Line Graph */}
        <View style={styles.graphContainer}>
          <Text style={styles.graphHeader}>This Week's Daily Waste</Text>
          <Graph data={lastSevenDays} />
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
    marginTop: Platform.OS === 'android' ? '10%' : '2%',
    marginBottom: '5%'
  },




  header: {
    width: '90%',
    height: '7%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.color1,
    shadowOffset: {
      width: -3,
      height: 4
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
    shadowColor: COLORS.shadow
  },
  headerText: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.color5
  },




  summaryContainer: {
    width: '90%',
    height: '44%',
    backgroundColor: COLORS.blue,
    borderRadius: 10,
  },
  lbcontainer: {
    flex: 1,
    width: '100%',
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
    color: COLORS.color4
  },
  lbheaderButtons: {
    width: '90%',
    height: '45%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',

  },
  lbbutton: {
    width: '40%',
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
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },









  graphContainer: {
    width: '90%',
    height: '44%',
    padding: '3%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    shadowOffset: {
      width: -3,
      height: 4
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
    shadowColor: COLORS.shadow
  },
  graphHeader: {
    marginTop: '3%',
    marginBottom: '-5%',
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.darkGreen
  }
})
