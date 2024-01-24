import React, {Component} from 'react'
import {StyleSheet, View, Text, Pressable, Platform} from 'react-native'
import {COLORS} from '../Utils/colors'
import Leaderboard from '../LeaderboardComponents/Leaderboard'
import {LOCAL, GLOBAL} from '../Utils/TestData'

export default class LeaderboardPage extends Component {
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

  render() {
    const localData = this.sortDescendingScore(LOCAL)
    const globalData = this.sortDescendingScore(GLOBAL)

    return (
      <View style={styles.container}>
        {/* Header Container*/}
        <View style={styles.header}>
          <Text style={styles.headerText}>Leaderboard</Text>
          <View style={styles.headerButtons}>
            {/* Local Button */}
            <Pressable
              style={[
                styles.button,
                {
                  backgroundColor:
                    this.state.visibility === 0
                      ? COLORS.darkGreen
                      : COLORS.lightGreen
                }
              ]}
              onPress={() => this.setVisibility(0)}>
              <Text style={styles.buttonText}>Local</Text>
            </Pressable>

            {/* All Time Button */}
            <Pressable
              style={[
                styles.button,
                {
                  backgroundColor:
                    this.state.visibility === 1
                      ? COLORS.darkGreen
                      : COLORS.lightGreen
                }
              ]}
              onPress={() => this.setVisibility(1)}>
              <Text style={styles.buttonText}>Global</Text>
            </Pressable>
          </View>
        </View>

        {/* Leaderboard Container */}
        <View style={styles.content}>
          {this.state.visibility === 0 && <Leaderboard data={localData} />}
          {this.state.visibility === 1 && <Leaderboard data={globalData} />}
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
    height: '25%',
    justifyContent: 'space-evenly',
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
  headerText: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.darkGreen
  },
  headerButtons: {
    width: '90%',
    height: '25%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  button: {
    width: '25%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: COLORS.darkGreen
  },
  buttonText: {
    color: COLORS.white
  },
  content: {
    width: '90%',
    height: '72%',
    justifyContent: 'center',
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
  }
})

// Data for testing
// const friends = [
//   {
//     name: 'Finn',
//     score: '1234'
//   },
//   {
//     name: 'Levi',
//     score: '1143'
//   },
//   {
//     name: 'Gavin',
//     score: '985'
//   },
//   {
//     name: 'Chase',
//     score: '837'
//   },
//   {
//     name: 'Declan',
//     score: '836'
//   }
// ]

// const local = [
//   {
//     name: 'Finn',
//     score: '1234'
//   },
//   {
//     name: 'Levi',
//     score: '1143'
//   },
//   {
//     name: 'Gavin',
//     score: '985'
//   },
//   {
//     name: 'Chase',
//     score: '837'
//   },
//   {
//     name: 'Declan',
//     score: '836'
//   },
//   {
//     name: 'Local Noob',
//     score: '13'
//   }
// ]

// const allTime = [
//   {
//     name: 'Finn',
//     score: '1234'
//   },
//   {
//     name: 'Levi',
//     score: '1143'
//   },
//   {
//     name: 'Gavin',
//     score: '985'
//   },
//   {
//     name: 'Chase',
//     score: '837'
//   },
//   {
//     name: 'Declan',
//     score: '836'
//   },
//   {
//     name: 'Local Noob',
//     score: '13'
//   },
//   {
//     name: 'All Time Noob',
//     score: '-1'
//   },
//   {
//     name: 'Gavin',
//     score: '985'
//   },
//   {
//     name: 'Chase',
//     score: '837'
//   },
//   {
//     name: 'Declan',
//     score: '836'
//   },
//   {
//     name: 'Local Noob',
//     score: '13'
//   },
//   {
//     name: 'All Time Noob',
//     score: '-1'
//   },
//   {
//     name: 'Finn',
//     score: '1234'
//   },
//   {
//     name: 'Levi',
//     score: '1143'
//   },
//   {
//     name: 'Gavin',
//     score: '985'
//   },
//   {
//     name: 'Chase',
//     score: '837'
//   },
//   {
//     name: 'Declan',
//     score: '836'
//   },
//   {
//     name: 'Local Noob',
//     score: '13'
//   },
//   {
//     name: 'All Time Noob',
//     score: '-1'
//   },
//   {
//     name: 'Gavin',
//     score: '985'
//   },
//   {
//     name: 'Chase',
//     score: '837'
//   },
//   {
//     name: 'Declan',
//     score: '836'
//   },
//   {
//     name: 'Local Noob',
//     score: '13'
//   },
//   {
//     name: 'All Time Noob',
//     score: '-1'
//   }
// ]
