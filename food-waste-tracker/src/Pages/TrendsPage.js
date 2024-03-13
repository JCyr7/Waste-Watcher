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
import { addDoc, collection, getDoc, doc, getDocs} from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { formatDate } from 'react-calendar/dist/cjs/shared/dateFormatter';


export default class StatisticsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: 0,
      localLeaderboard: [],
      globalLeaderboard: [],
      goalPopupVisible: false, // State to control visibility of GoalPopup
      wasteHistoryPopupVisible: false, // State to control visibility of WasteHistoryPopup
      wasteData: [],
      loading: true
    };
    this.reloadHistoryPage = this.reloadHistoryPage.bind(this);
  }

  async componentDidMount() {
    console.log("mounted");
    this.updateWasteData().then(data => {
      this.setState({ wasteData: data });
    });
    this.setState({ loading: false });

    this.getLeaderboardLocal().then((localLB) => {
      console.log("LB:", localLB);
      this.setState({localLeaderboard: localLB});
      console.log("state", this.state.localLeaderboard);
    });
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
    let sortedData = [];
    let count = 0;
    let dates = [];

    today = new Date();
    for (let i = 0; i < 7; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() - i); // Subtract i days from today
      dates.push(day);
  }

  
    //really bad time complexity but it works for now. it goes through each food log 7 times
    for (let i = 0; i < 7; i++) {
      count = 0.01;
      let formattedDate = (dates[i].getMonth() + 1) + '/' + (dates[i].getDate());

      for (let x = 0; x < data.length; x++) { 
        if (data[x].date === formattedDate) { 
          if (data[x].amountType === "lbs") {count += data[x].amount;}
          else if (data[x].amountType === "oz") {count += data[x].amount/16;}
          else if (data[x].amountType === "g") {count += data[x].amount/453.592;}
          
        } 
      }
      sortedData.push({ date: formattedDate, amount: count });
    }

    
    return sortedData.reverse();
    //return data.length <= 7 ? data : data.slice(data.length - 7);
  }

  reloadHistoryPage = () => {
    console.log("Reload Stats");
    this.setState({ wasteData: [] }, this.updateWasteData);
  
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
        
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>Trends</Text>
          <Image source={require('../../images/logo.png')} style={styles.image}/>
        </View>
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
                      borderBottomColor: this.state.visibility === 0 ? COLORS.element : COLORS.transparent,
                    },
                  ]}
                  onPress={() => this.setVisibility(0)}>
                  <Text style={[styles.lbbuttonText, { color: this.state.visibility === 0 ? COLORS.element : COLORS.element }]}>
                    Friends
                  </Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.lbbutton,
                    {
                      backgroundColor: COLORS.transparent,
                      borderBottomColor: this.state.visibility === 1 ? COLORS.element : COLORS.transparent,
                    },
                  ]}
                  onPress={() => this.setVisibility(1)}>
                  <Text style={[styles.lbbuttonText, { color: this.state.visibility === 1 ? COLORS.element : COLORS.element }]}>
                    Global
                  </Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.lbcontent}>
              {this.state.visibility === 0 && <Leaderboard data={this.state.localLeaderboard} />}
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
                <Text style={styles.closeButtonText}>×</Text>
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
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>

              <WasteHistoryPopup data={this.state.wasteData} onReload={this.reloadHistoryPage}/>
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
    marginBottom: '2%'
  },


  headerContainer: {
    flexDirection: 'row',
    width: '88%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  titleText: {
    color: COLORS.header,
    fontWeight: '400',
    fontSize: 28,
  },
  image: {
    width: '65%',
    height: 'auto',
    tintColor: COLORS.header,
    aspectRatio: 1290 / 193,
    justifyContent: 'flex-end',
  },



  graphContainer: {
    width: '90%',
    height: '40%',
    padding: '3%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 10,
    shadowOffset: {
      width: -5,
      height: 5
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
    shadowColor: COLORS.shadow,
  },
  graphHeader: {
    fontSize: 20,
    fontWeight: '500',
    color: COLORS.header
  },
  fulllbContainer: {
    width: '90%',
    height: '40%',
    backgroundColor: COLORS.card,
    borderRadius: 10,
    shadowOffset: {
      width: -7,
      height: 7
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 1,
    shadowColor: COLORS.shadow,
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
  },
  lbheaderText: {
    fontSize: 20,
    fontWeight: '500',
    color: COLORS.header,
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
    backgroundColor: COLORS.text,
    borderBottomWidth: 2.5,
    borderBottomColor: COLORS.transparent,
  },
  lbbuttonText: {
    color: COLORS.element,
    fontWeight: '500',
  },
  lbcontent: {
    width: '91%',
    height: 'auto',
    alignItems: 'center',
    backgroundColor: COLORS.card,
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
    backgroundColor: COLORS.card,
    borderRadius: 10,
    width: '40%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: -7,
      height: 7
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 1,
    shadowColor: COLORS.shadow,
  },
  bottomButtonText: {
    color: COLORS.element,
    fontSize: 17,
    fontWeight: '500',
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
    backgroundColor: COLORS.background,
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
    marginRight: 15,
  },
  closeButtonText: {
    fontSize: 30,
    color: '#333',
    color: COLORS.text
  },
  // Add or adjust other styles as needed
});