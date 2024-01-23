import React, {Component} from 'react'
import {StyleSheet, View, Text, Platform} from 'react-native'
import {COLORS} from '../Utils/colors'
import Divider from '../Utils/Divider'
import ViewWaste from '../StatisticsPageComponents/ViewWaste'
import Graph from '../StatisticsPageComponents/Graph'
import {DATA} from '../Utils/TestData'

export default class StatisticsPage extends Component {
  constructor(props) {
    super(props)
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

    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Waste Statistics</Text>
          <Text style={styles.headerSubtext}>
            View statistics based on your waste from the past 7 days
          </Text>
        </View>

        {/* Waste Summary */}
        <View style={styles.summaryContainer}>
          {/* Average Daily Waste */}
          <View style={styles.sectionContent}>
            <Text style={styles.sectionText}>Average Daily Waste:</Text>
            <Text style={styles.sectionText}>{averageWaste} lbs</Text>
          </View>
          <Divider />

          {/* Total Waste */}
          <View style={styles.sectionContent}>
            <Text style={styles.sectionText}>Total Waste:</Text>
            <Text style={styles.sectionText}>{totalWaste} lbs</Text>
          </View>
          <Divider />

          {/* Waste Category */}
          <View style={styles.sectionContent}>
            <Text style={styles.sectionText}>Most Wasted Category:</Text>
            <Text style={styles.sectionText}>{mostFrequentCategory}</Text>
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
    height: '20%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.white,
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
    marginTop: '3%',
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.darkGreen
  },
  headerSubtext: {
    width: '70%',
    marginBottom: '3%',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.darkGray
  },
  summaryContainer: {
    width: '90%',
    height: '30%',
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
  sectionContent: {
    width: '100%',
    height: '30%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%'
  },
  sectionText: {
    fontWeight: '500',
    fontSize: 18,
    color: COLORS.black
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
