import React, {Component} from 'react'
import {View, StyleSheet, Text, Pressable, Modal, TextInput, Platform, Dimensions, Image} from 'react-native'
import {BarChart,ProgressChart} from 'react-native-chart-kit'
import Calendar from 'react-calendar'
import {AntDesign} from '@expo/vector-icons'
import {ReactNativeAsyncStorage} from '@react-native-async-storage/async-storage'
import {COLORS} from '../Utils/colors'
import Popup from '../Popups/Popup'
import TrackWastePopup from '../Popups/TrackWastePopup'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import {DATA} from '../Utils/TestData'
import { SelectList } from 'react-native-dropdown-select-list'
import SubmitButton from '../TrackWaste/SubmitButton'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { addDoc, collection, getDoc, doc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';

dialChartConfig = {
  backgroundGradientFrom: COLORS.transparent,
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: COLORS.transparent,
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(0, 40, 210, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
}

//calendar functions
screenWidth = Dimensions.get('window').width;

data = [
  {key:'1', value:'Dairy'},
  {key:'2', value:'Produce'},
  {key:'3', value:'Meat'},
  {key:'4', value:'Beverage'},
]
data2 = [
  {key:'1', value:'lbs'},
  {key:'2', value:'oz'},
  {key:'3', value:'g'},
]
data3 = [
  .75
]


export default class HomePage extends Component {
  constructor(props) {
    super(props)

    

    this.state = {
      weightdropdown: '',
      selectedMonth: '',
      selectedDay: '',
      weightUnit: '',
      weightValue: 0,
      inHomeCheckbox: false,
      edibleCheckbox: false,
      streak: [0]
    }
    this.getData();
  }

  // Method retrieves data from async storage
  getData = async () => {
    try {
      let newUser = await AsyncStorage.getItem('newUser')
      newUser = JSON.parse(newUser)
      this.setState({householdInfoModal: newUser})

      let userName = await AsyncStorage.getItem('username')
      this.setState({userName: userName})
    } catch(e) {
      //
    }
  }

  createFoodWasteFirestore = async () => {

    try {
      const docRef = await addDoc(collection(FIREBASE_DB, "users/Wnb19yz5mWWdqvrfm02MxapOYeW2/Wasted Food"), {
        foodType: this.state.weightDropdown,
        selectedDay: this.state.selectedDay,
        selectedMonth: this.state.selectedMonth,
        weightUnit: this.state.weightUnit,
        weightValue: parseFloat(this.state.weightValue),
        inHome: this.state.inHomeCheckbox,
        edible: this.state.edibleCheckbox

      });
    
      //console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  updateStreak = async () => {
    let streakVal = [0];

    try {

      const docRef = doc(FIREBASE_DB, "users", FIREBASE_AUTH.currentUser.uid);
      const docSnap = await getDoc(docRef);

      streakVal = [docSnap.data().streak];

    } catch (e) {
      console.log(e.message);
    }

    return streakVal;
  }

  componentDidMount() {
    // Update the value after component is mounted
    this.updateStreak().then(streakVal => {
      this.setState({streak: streakVal});
    }).catch(error => {
      console.error("Error updating wheels:", error);
    });
  } 

  render() {
    const {navigation} = this.props;
    const { streak } = this.state;
    const today = new Date();
    const todayMonth = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const todayDay = today.getDate().toString().padStart(2, '0');
    return (
      <View style={styles.container}>
        {/* Welcome Header */}
        {/* <Image source={require('../../images/logo.png')} style={styles.image}/> */}
        <Text style={styles.titleText}>Home</Text>

        
          {/* Progress Dials */}
        <View style={styles.dialContainer}>


          {/*streak dial*/}
          <View style={styles.smallDial}>
              <ProgressChart 
              data={[.5,.2,.6]}
              width={82}
              height={82}
              strokeWidth={10}
              radius={30}
              chartConfig={dialChartConfig}
              hideLegend={true}/>
              <Text style={styles.smallDialText}>Daily</Text>
              <Text style={styles.smallDialText}>Streak</Text>
          </View>

          {/*weekly waste dial*/}
          <View style={styles.largeDial}>
            <ProgressChart
            data={streak}
            width={125}
            height={125}
            strokeWidth={13}
            radius={45}
            chartConfig={dialChartConfig}
            hideLegend={true}/>
            <Text style={styles.largeDialText}>Weekly</Text>
            <Text style={styles.largeDialText}>Waste</Text>
          </View>

          {/*money dial*/}
          <View style={styles.smallDial}>
              <ProgressChart 
              data={streak}
              width={82}
              height={82}
              strokeWidth={10}
              radius={30}
              chartConfig={dialChartConfig}
              hideLegend={true}/>
              <Text style={styles.smallDialText}>Money</Text>
              <Text style={styles.smallDialText}>Saved</Text>
          </View>
        </View>
        
        {/* Track Waste container */}
        <View style={styles.trackWasteContainer}>
          <Text style={styles.trackWasteHeader}>Track Food Waste</Text> 


           {/* Choose Month */}      
          <View style={styles.dateContainer}>
            <TextInput
              textAlign={'center'}
              cursorColor={COLORS.blue}
              keyboardType='numeric'
              returnKeyType='done'
              placeholder={todayMonth} 
              placeholderTextColor={COLORS.blue}
              style={styles.dateInput}
              onChangeText={(value) => this.setState({selectedMonth: value})}>
              <Text style={styles.dateInputText}></Text>        
            </TextInput> 
            <Text style={styles.dateInputText}>/</Text>


            {/* Choose Day */}  
            <TextInput
              textAlign={'center'}
              cursorColor={COLORS.blue}
              keyboardType='numeric'
              returnKeyType='done'
              placeholder={todayDay} 
              placeholderTextColor={COLORS.blue}
              style={styles.dateInput}
              onChangeText={(value) =>
              this.setState({selectedDay: value})}>
              <Text style={styles.dateInputText}></Text>        
            </TextInput>
          </View>


          {/* Choose Weight */}  
          <View style={styles.weightContainer}>
            <TextInput
              textAlign={'center'}
              cursorColor={COLORS.blue}
              keyboardType='numeric'
              returnKeyType='done'
              placeholder='0'
              placeholderTextColor={COLORS.blue}
              style={styles.weightInput}
              onChangeText={(value) =>
              this.setState({weightValue: value})}>
              <Text style={styles.weightInputText}></Text>        
            </TextInput>


            {/* Choose Unit */}  
            <SelectList 
              textAlign={'center'}
              boxStyles={styles.weightBox}
              inputStyles={styles.weightInputText}
              dropdownStyles={styles.weightDropdown}
              dropdownTextStyles={styles.weightInputText}
              search = 'false'
              defaultOption={data2[0]}
              setSelected={(value) => {this.setState({weightUnit: value})}} 
              data={data2} 
              save="value"
            />
          </View>

          
          {/* Choose Type */}  
          <SelectList 
              textAlign={'center'}
              boxStyles={styles.categoryBox}
              inputStyles={styles.weightInputText}
              dropdownStyles={styles.categoryDropdown}
              dropdownTextStyles={styles.weightInputText}
              search = 'false'
              defaultOption={data[1]}
              setSelected={(value) => {this.setState({weightDropdown: value})}} 
              data={data} 
              save="value"
            />

          {/* Checkbox container */}  
          <View style={styles.checkBoxContainer}>

            {/* In-home checkbox */}  
            <BouncyCheckbox
                      size={22}
                      style={styles.checkBox}
                      fillColor={COLORS.blue}
                      unfillColor='white'
                      text="In-Home"

                      innerIconStyle={{borderWidth: 2}}
                      onPress={() => {
                        this.setState((prevState) => ({
                          inHomeCheckbox: !prevState.inHomeCheckbox,
                        }));
                      }}
                      textStyle={styles.checkboxText}
                    />

            {/* Edible checkbox */}  
            <BouncyCheckbox
                      size={22}
                      style={styles.checkBox}
                      fillColor={COLORS.blue}
                      unfillColor='white'
                      text="Edible"
                      innerIconStyle={{borderWidth: 2}}
                      onPress={() => {
                        this.setState((prevState) => ({
                          edibleCheckbox: !prevState.edibleCheckbox,
                        }));
                      }}
                      textStyle={styles.checkboxText}
                    />
            </View>


          {/* Submit button */}    
          <Pressable onPress={() => this.createFoodWasteFirestore()} style={styles.bottomButton}>
            <Text style={styles.bottomButtonText}>Submit</Text>
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
    // alignSelf: 'flex-start',
    // paddingLeft: '5%'  
  },



  dialContainer: {
    width: '90%',
    height: '27.5%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    borderRadius: 10,
    padding: 15,
    backgroundColor: COLORS.lightBlue,
  },
  largeWasteDial: {
    width: '100',
    height: '100',
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeDialText: {
    fontSize: 17,
    color: COLORS.blue,
    fontWeight: '500',
    textAlign: 'center',
  },
  smallDial: {
    width: '100',
    height: '100',
    justifyContent: 'center',
    alignItems: 'center',

  },
  smallDialText: {
    fontSize: 15,
    color: COLORS.blue,
    fontWeight: '500',
    textAlign: 'center',
  },




  trackWasteContainer: {
    width: '90%',
    height: '60%',
    position: 'relative',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.lightBlue,
  },
  trackWasteHeader: {
    fontSize: 20,
    fontWeight: '400',
    color: COLORS.blue
  },
  checkBoxContainer: {
    flexDirection: 'row',
  },
  checkBox: {
    backgroundColor: COLORS.lightBlue,
  },
  checkboxText: {
    fontSize: 15,
    color: COLORS.blue,
    padding: 5,
    fontWeight: '500',
    textDecorationLine: 'none',
  },
  bottomButton: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: '40%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtonText: {
    color: COLORS.blue,
    fontSize: 16,
    fontWeight: '600',
  },




  dateContainer: {
    borderRadius: 10,
    borderWidth: 3,
    flexDirection: 'row',
    width: '60%',
    paddingVertical: '1%',
    marginBottom: "7%",
    alignSelf: 'center',
    textAlign: 'center', 
    justifyContent: 'space-evenly',
    borderColor: COLORS.blue,
    backgroundColor: COLORS.lightBlue
  },

  dateInput: {
    fontSize: 22,
    fontWeight: '500', 
    backgroundColor: COLORS.lightBlue
  },
  dateInputText: {
    fontWeight: '500', 
    fontSize: 30,
    color: COLORS.blue,
  },
  weightContainer: {
    borderRadius: 10,
    flexDirection: 'row',
    width: '75%',
    marginBottom: "7%",
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    borderColor: COLORS.blue,
  },
  weightBox: {
    borderRadius: 10,
    flexDirection: 'row',
    width: '75%',
    marginBottom: "7%",
    borderWidth: 3,
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    borderColor: COLORS.blue,
  },
  weightInput: {
    borderColor: COLORS.blue,
    borderWidth: 3,
    borderRadius: 10,
    fontSize: 20,
    right: 0,
    fontWeight: 'bold', 
    paddingVertical: "3%",
    width: '65%',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.lightBlue
  },
  weightInputText: {
    color: COLORS.blue,
    fontSize: 13,
    position: 'absolute',
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold', 
  },
  weightDropdown: {
    borderColor: COLORS.blue,
    position: 'absolute',
    borderWidth: 3,
    borderRadius: 10,
    width: '75%',
    top: -40,
    zIndex: 1000,
    marginBottom: '7%',
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.lightBlue
    
  },
  categoryContainer: {
    borderRadius: 10,
    width: '75%',
    marginBottom: "7%",
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'flex-end',
  },
  categoryBox: {
    borderRadius: 10,
    flexDirection: 'row',
    width: '75%',
    marginBottom: "7%",
    borderWidth: 3,
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    borderColor: COLORS.blue,
  },
  categoryDropdown: {
    borderColor: COLORS.blue,
    position: 'absolute',
    borderWidth: 3,
    borderRadius: 10,
    width: '75%',
    top: -40,
    zIndex: 1000,
    marginBottom: '7%',
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.lightBlue
  },
  })
