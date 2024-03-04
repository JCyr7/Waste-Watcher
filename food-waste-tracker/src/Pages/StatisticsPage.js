import React, { Component } from 'react';
import { Modal, Pressable, Platform, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import { COLORS } from '../Utils/colors';
import Divider from '../Utils/Divider';
import ViewWaste from '../StatisticsPageComponents/ViewWaste';
import Graph from '../StatisticsPageComponents/Graph';
import { DATA } from '../Utils/TestData';
import Leaderboard from '../LeaderboardComponents/Leaderboard';
import { LOCAL, GLOBAL } from '../Utils/TestData';
import Popup from '../Popups/Popup';
import GoalPopup from '../Popups/GoalPopup';
import WasteHistoryPopup from '../Popups/WasteHistoryPopup'; // Import the WasteHistoryPopup
import { getFriends, getNameFromID, getUserStreak, getPendingFriendRequestsRecieved } from '../ProfileComponents/FriendHandler'
import { FIREBASE_AUTH } from '../../FirebaseConfig'

export default class StatisticsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: 0,
      goalPopupVisible: false, // State to control visibility of GoalPopup
      wasteHistoryPopupVisible: false, // State to control visibility of WasteHistoryPopup
      localLeaderboard: [],
      globalLeaderboard: []
    }
  }

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
    this.setState({ visibility: value });
  }

  sortDescendingScore(array) {
    array.sort((a, b) => b.score - a.score);
    return array;
  }

  getLastSevenDays(data) {
    return data.length <= 7 ? data : data.slice(data.length - 7);
  }

  getTotalWaste(data) {
    return data.reduce((accumulator, item) => accumulator + item.amount, 0);
  }

  getAverageWaste(data) {
    const total = this.getTotalWaste(data);
    return total / data.length;
  }

  getMostFrequentCategory(data) {
    const categoriesCount = {};
    let maxCount = 0;
    let mostFrequent = null;

    data.forEach(({ category }) => {
      categoriesCount[category] = (categoriesCount[category] || 0) + 1;
      if (categoriesCount[category] > maxCount) {
        maxCount = categoriesCount[category];
        mostFrequent = category;
      }
    });
    return mostFrequent;
  }

  toggleGoalPopup = () => {
    this.setState({ goalPopupVisible: !this.state.goalPopupVisible });
  };

  toggleWasteHistoryPopup = () => { // Toggle function for WasteHistoryPopup
    this.setState({ wasteHistoryPopupVisible: !this.state.wasteHistoryPopupVisible });
  };


  refreshLeaderboard = async () => {
    const localLB = this.getLeaderboardLocal;
    this.setState({localLeaderboard: localLB});
  }

  componentDidMount() {
    console.log("mounted");
    
    this.getLeaderboardLocal().then((localLB) => {
      this.setState({localLeaderboard: localLB});
    });
  }

  render() {
    const lastSevenDays = this.getLastSevenDays(DATA);
    const totalWaste = this.getTotalWaste(lastSevenDays).toFixed(2);
    const averageWaste = this.getAverageWaste(lastSevenDays).toFixed(2);
    const mostFrequentCategory = this.getMostFrequentCategory(lastSevenDays);
    const localData = this.sortDescendingScore(this.state.localLeaderboard);
    const globalData = this.sortDescendingScore(this.GLOBAL);

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.titleText}>Trends</Text>

        <View style={styles.graphContainer}>
          <Text style={styles.graphHeader}>This Week's Daily Waste</Text>
          <Graph data={lastSevenDays} />
        </View>

        <View style={styles.fulllbContainer}>
          <View style={styles.lbcontainer}>
            <View style={styles.lbheader}>
              <Text style={styles.lbheaderText}>Leaderboard</Text>
              <View style={styles.lbheaderButtons}>
                <Pressable
                  style={[
                    styles.lbbutton,
                    {
                      backgroundColor: COLORS.transparent,
                      borderBottomColor: this.state.visibility === 0 ? COLORS.blue : COLORS.transparent,
                    },
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
                      borderBottomColor: this.state.visibility === 1 ? COLORS.blue : COLORS.transparent,
                    },
                  ]}
                  onPress={() => this.setVisibility(1)}>
                  <Text style={[styles.lbbuttonText, { color: this.state.visibility === 1 ? COLORS.blue : COLORS.blue }]}>
                    Global
                  </Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.lbcontent}>
              {this.state.visibility === 0 && <Leaderboard data={localData} />}
              {this.state.visibility === 1 && <Leaderboard data={globalData} />}
            </View>
          </View>
        </View>

        <View style={styles.bottomButtonsContainer}>
          <Pressable style={styles.bottomButton} onPress={this.toggleWasteHistoryPopup}>
            <Text style={styles.bottomButtonText}>History</Text>
          </Pressable>
          <Pressable style={styles.bottomButton} onPress={this.toggleGoalPopup}>
            <Text style={styles.bottomButtonText}>Goals</Text>
          </Pressable>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.goalPopupVisible}
          onRequestClose={this.toggleGoalPopup}>
          <View style={styles.popupOverlay}>
            <View style={styles.popup}>
              <TouchableOpacity style={styles.closeButton} onPress={this.toggleGoalPopup}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <GoalPopup />
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.wasteHistoryPopupVisible}
          onRequestClose={this.toggleWasteHistoryPopup}>
          <View style={styles.popupOverlay}>
            <View style={styles.popup}>
              <TouchableOpacity style={styles.closeButton} onPress={this.toggleWasteHistoryPopup}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <WasteHistoryPopup data={DATA} />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? '3%' : '0%',
    marginBottom: '5%',
  },
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
  },
  graphHeader: {
    fontSize: 20,
    fontWeight: '400',
    color: COLORS.blue,
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
    color: COLORS.blue,
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
    borderBottomWidth: 3,
    borderBottomColor: COLORS.transparent,
  },
  lbbuttonText: {
    color: COLORS.white,
  },
  lbcontent: {
    width: '91%',
    height: 'auto',
    alignItems: 'center',
    backgroundColor: COLORS.lightBlue,
    borderRadius: 10,
    marginBottom: '5%',
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: '6.5%',
  },
  bottomButton: {
    backgroundColor: COLORS.lightBlue,
    borderRadius: 10,
    width: '40%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButtonText: {
    color: COLORS.blue,
    fontSize: 15,
    fontWeight: '600',
  },
  popupOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding:20,
    paddingTop: '20%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#333',
  },
  // Add or adjust other styles as needed
});