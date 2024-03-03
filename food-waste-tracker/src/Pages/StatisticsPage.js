import React, { Component } from 'react';
import { Modal, Pressable, Platform, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
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
import { addDoc, collection, getDoc, doc, getDocs} from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { formatDate } from 'react-calendar/dist/cjs/shared/dateFormatter';

export default class StatisticsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: 0,
      goalPopupVisible: false, // State to control visibility of GoalPopup
      wasteHistoryPopupVisible: false, // State to control visibility of WasteHistoryPopup
      wasteData: [],
      loading: true
    };

  }

  async componentDidMount() {
    await this.updateWasteData().then(data => {
      this.setState({ wasteData: data });
    });
    this.setState({ loading: false });
  }

  updateWasteData = async () => {
    let wasteData = [];

    try {
        // Ensure you have a valid user before proceeding
        if (!FIREBASE_AUTH.currentUser) {
            console.log("No user signed in.");
            return wasteData;
        }
        const userId = FIREBASE_AUTH.currentUser.uid;
        
        const subcollectionRef = collection(FIREBASE_DB, "users",FIREBASE_AUTH.currentUser.uid,"/Wasted Food");
        const querySnapshot = await getDocs(subcollectionRef);
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const date = `${data.selectedMonth}/${data.selectedDay}`;
            wasteData.push({
                date: date,
                category: data.foodType, 
                amount: data.weightValue,
                amountType: data.weightUnit,
            });
        });
        this.setState({ wasteData });
    } catch (e) {
        console.log(e.message);
    }
    return wasteData;
    };

  setVisibility(value) {
    this.setState({ visibility: value });
  }

  sortDescendingScore(array) {
    array.sort((a, b) => b.score - a.score);
    return array;
  }

  getLastSevenDays(data) {
    let sortedData = [];
    let count = 0;
    let dates = [];

    today = new Date();
    for (let i = 0; i < 7; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() - i); // Subtract i days from today
      dates.push(day);
  }

  
    for (let i = 0; i < 7; i++) {
      count = 0;
      let formattedDate = (dates[i].getMonth() + 1) + '/' + (dates[i].getDate());

      for (let x = 0; x < data.length; x++) {
        if (data[x].date === formattedDate) {
          if (data[x].amountType === "lb") {count += data[x].amount;}
          else if (data[x].amountType === "oz") {count += data[x].amount/16;}
          else if (data[x].amountType === "g") {count += data[x].amount/453.592;}
          
        }
      }
      sortedData.push({ date: formattedDate, amount: count });
    }

  
    return sortedData.reverse();
    //return data.length <= 7 ? data : data.slice(data.length - 7);
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

  render() {
    const lastSevenDays = [];
    const localData = this.sortDescendingScore(LOCAL);
    const globalData = this.sortDescendingScore(GLOBAL);

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.titleText}>Trends</Text>
        <View style={styles.graphContainer}>
          <Text style={styles.graphHeader}>This Week's Daily Waste</Text>
          {this.state.loading === false ? (
          <Graph data={this.getLastSevenDays(this.state.wasteData)} />
        ) : (
          // Optionally, render a placeholder or a loading indicator here
          <Text>Loading...</Text>
          
        )}
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

              <WasteHistoryPopup data={this.state.wasteData} />
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