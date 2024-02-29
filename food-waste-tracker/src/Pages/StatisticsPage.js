import React, {Component} from 'react'
import {StyleSheet, View, Text, Platform, Pressable, Image, ScrollView} from 'react-native'
import {COLORS} from '../Utils/colors'
import Divider from '../Utils/Divider'
import ViewWaste from '../StatisticsPageComponents/ViewWaste'
import Graph from '../StatisticsPageComponents/Graph'
import {DATA} from '../Utils/TestData'
import Leaderboard from '../LeaderboardComponents/Leaderboard'
import { getFriends, getNameFromID, getUserStreak } from '../ProfileComponents/FriendHandler'
import { FIREBASE_AUTH } from '../../FirebaseConfig'

export default class StatisticsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visibility: 0
    }
  }

  LOCAL = [
    {
      name: 'Declan',
      score: '1'
    },
    {
      name: 'Finn',
      score: '2'
    },
    {
      name: 'Levi',
      score: '3'
    },
    {
      name: 'Gavin',
      score: '4'
    },
    {
      name: 'Chase',
      score: '5'
    }
  ]

  GLOBAL = [
    {
      name: 'Declan',
      score: '936'
    },
    {
      name: 'Finn',
      score: '695'
    },
    {
      name: 'Levi',
      score: '643'
    },
    {
      name: 'Gavin',
      score: '885'
    },
    {
      name: 'Callen',
      score: '737'
    }
  ]

  getLeaderboardLocal = async () => {
    const friends = await getFriends();
    const friendIDs = [];
    friends.forEach((doc) => {
      const id = doc.data().friend1_ID;
      const id2 = doc.data().friend2_ID;

      if (id == FIREBASE_AUTH.currentUser.uid) {
        id = id2;
      }

      friendIDs.push(id);

    });

    const retval = [];
    for (let i = 0; i < friendIDs.length; i++) {
      retval.push({name: await getNameFromID(friendIDs[i]), score: await getUserStreak(friendIDs[i])});
    }

    return retval;

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

  componentDidMount() {
    console.log("mounted");

    this.getLeaderboardLocal().then((localLeaderboard) => {
      console.log(localLeaderboard);
    });
  }

  render() {
    const lastSevenDays = this.getLastSevenDays(DATA)
    const totalWaste = this.getTotalWaste(lastSevenDays).toFixed(2)
    const averageWaste = this.getAverageWaste(lastSevenDays).toFixed(2)
    const mostFrequentCategory = this.getMostFrequentCategory(lastSevenDays)
    const localData = this.sortDescendingScore(this.LOCAL)
    const globalData = this.sortDescendingScore(this.GLOBAL)

    return (
      <View style={styles.container}>
        {/* Header */}
        {/* <Image source={require('../../images/logo.png')} style={styles.image}/> */}
        <Text style={styles.titleText}>Trends</Text>

        {/* Line Graph */}
        <View style={styles.graphContainer}>
          <Text style={styles.graphHeader}>This Week's Daily Waste</Text>
          <Graph data={lastSevenDays} />
        </View>

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
                      backgroundColor: COLORS.transparent,
                      borderBottomColor:
                        this.state.visibility === 0 ? COLORS.blue : COLORS.transparent
                    }
                  ]}
                  onPress={() => this.setVisibility(0)}>
                  <Text style={[styles.lbbuttonText, { color: this.state.visibility === 0 ? COLORS.blue : COLORS.blue }]}>
                    Friends
                  </Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.lbbutton,
                    {
                      backgroundColor: COLORS.transparent,
                      borderBottomColor:
                        this.state.visibility === 1 ? COLORS.blue : COLORS.transparent
                    }
                  ]}
                  onPress={() => this.setVisibility(1)}>
                  <Text style={[styles.lbbuttonText, { color: this.state.visibility === 1 ? COLORS.blue : COLORS.blue }]}>
                    Global
                  </Text>
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? '3%' : '0%',
    marginBottom: '5%'
  },


  // image: {
  //   width: '60%',
  //   height: 'auto',
  //   tintColor: COLORS.blue,
  //   aspectRatio: 1290 / 193,
  // },
  titleText: {
    color: COLORS.blue,
    fontWeight: '500',
    fontSize: 28,
  },





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
    fontSize: 20,
    fontWeight: '400',
    color: COLORS.blue
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
  },
  lbheader: {
    width: '80%',
    height: '25%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: COLORS.transparent,
  },
  lbheaderText: {
    fontSize: 20,
    fontWeight: '400',
    color: COLORS.blue
  },
  lbheaderButtons: {
    width: '100%',
    height: '40%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  lbbutton: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    backgroundColor: COLORS.transparent,
    borderBottomWidth: 3,  // Add a bottom border
    borderBottomColor: COLORS.transparent  // Set initial border color
  },
  lbbuttonText: {
    color: COLORS.white //initial text color
  },
  lbcontent: {
    width: '91%',
    height: 'auto',
    alignItems: 'center',
    backgroundColor: COLORS.lightBlue,
    borderRadius: 10,
    marginBottom: '5%',
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
    fontWeight: '600',
  },


})
