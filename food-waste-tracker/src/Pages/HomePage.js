import React, {Component} from 'react'
import {View, StyleSheet, Text, Pressable, Modal, TextInput, Platform, Dimensions, Image} from 'react-native'
import {ProgressChart} from 'react-native-chart-kit'
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
import updateWasteData from '../Pages/StatisticsPage';

dialChartConfig = {
  backgroundGradientFrom: COLORS.transparent,
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: COLORS.transparent,
  backgroundGradientToOpacity: 0,
  color: (opacity = 0) => `rgba(0, 102, 255, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
}

//calendar functions
screenWidth = Dimensions.get('window').width;

data = [
  {key:'1', value:'Dairy'},
  {key:'2', value:'Produce'},
  {key:'3', value:'Meat'},
  {key:'4', value:'Fish'},
  {key:'5', value:'Grains'},
  {key:'6', value:'Beverage'},
  {key:'6', value:'Combination'},
]
data2 = [
  {key:'1', value:'lbs'},
  {key:'2', value:'ozs'},
  {key:'3', value:'grams'},
  {key:'4', value:'cups'},
  {key:'5', value:'tbsps'},
]
data3 = [
  .75
]


export default class HomePage extends Component {
  constructor(props) {
    super(props)

    

    this.state = {
      weightdropdown: 'mixed',
      selectedMonth: new Date().getMonth() + 1,
      selectedDay: new Date().getDate(),
      weightUnit: 'lbs',
      weightValue: 0,
      inHomeCheckbox: false,
      edibleCheckbox: false,
      streak: 0
    }
    this.getData();
  }

  reloadHomePage = () => {

    this.setState({ streak: [] }, this.streak);
  
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
      const docRef = await addDoc(collection(FIREBASE_DB, "users/",FIREBASE_AUTH.currentUser.uid,"/Wasted Food"), {
        foodType: this.state.weightDropdown,
        selectedDay: this.state.selectedDay,
        selectedMonth: this.state.selectedMonth,
        weightUnit: this.state.weightUnit,
        weightValue: parseFloat(this.state.weightValue),
        inHome: this.state.inHomeCheckbox,
        edible: this.state.edibleCheckbox

      });
      this.reloadHomePage();
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
        <View style={styles.dashContainer}>


          {/*streakdash item*/}
          <Pressable style={styles.dashItemSmall}>
            <Image source={require('../../images/streak.png')} style={styles.dashImage}/>
            <View style={styles.dashTextContainer}>

              <View style={styles.dashTopTextContainer}>
                <Text style={styles.topLeftStreakText}>{this.state.streak} </Text>
                <Text style={styles.topRightStreakText}>Day</Text>
              </View>

              <View style={styles.dashBottomTextContainer}>
                <Text style={styles.bottomStreakText}>Streak</Text>
              </View>
            </View>
          </Pressable>

          {/*weekly waste dial*/}
          <View style={styles.dialContainer}>
            <View style={styles.dial}>
            <ProgressChart
            data={[.6]}
            width={125}
            height={125}
            strokeWidth={11}
            radius={44}
            chartConfig={dialChartConfig}
            hideLegend={true}/>
            <View style={styles.dialLabel}>
              <Text style={styles.additionalText}>4.2 lbs</Text>
            </View>
            </View>
            <Text style={styles.largeDialText}>Weekly</Text>
            <Text style={styles.largeDialText}>Waste</Text>
          </View>

          {/*money dash item*/}
          <Pressable style={styles.dashItemSmall}>
            <Image source={require('../../images/money.png')} style={styles.dashImage}/>
            <View style={styles.dashTextContainer}>

              <View style={styles.dashTopTextContainer}>
                <Text style={styles.topRightStreakText}>$</Text>
                <Text style={styles.topLeftStreakText}>14.34</Text>
              </View>

              <View style={styles.dashBottomTextContainer}>
                <Text style={styles.bottomStreakText}>Saved</Text>
              </View>
            </View>
          </Pressable>
          
        </View>     
        {/* Track Waste container */}
        <View style={styles.trackWasteContainer}>
        <Text style={styles.trackWasteHeader}>Track Food Waste</Text> 


          {/* Date Container */}      
        <View style={styles.dateContainer}>
          <View style={styles.dateTextContainer}>
            <Text style={styles.dateText}>Date</Text>
          </View>

          {/* Choose Date */}  
          <View style={styles.dateInputContainer}>
            {/* Choose Month */}  
            <TextInput
              textAlign={'center'}
              cursorColor={COLORS.blue}
              keyboardType='numeric'
              returnKeyType='done'
              placeholder={todayMonth} 
              placeholderTextColor={COLORS.blue}
              color={COLORS.blue}
              style={styles.dateInput}
              onChangeText={(value) => this.setState({selectedMonth: value})}>
              <Text style={styles.dateInputText}></Text>        
            </TextInput> 



            <Text style={styles.dateDash}>/</Text>



            {/* Choose Day */}  
            <TextInput
              textAlign={'center'}
              cursorColor={COLORS.blue}
              keyboardType='numeric'
              returnKeyType='done'
              placeholder={todayDay} 
              placeholderTextColor={COLORS.blue}
              color={COLORS.blue}
              style={styles.dateInput}
              onChangeText={(value) =>
              this.setState({selectedDay: value})}>
              <Text style={styles.dateInputText}></Text>        
            </TextInput>
          </View>
        </View>


        {/* Weight Container */}  
        <View style={styles.weightContainer}>

          {/* Choose Weight Title */}  
          <View style={styles.weightTextContainer}>
            <Text style={styles.weightText}>Amount</Text>
          </View>

          <View style={styles.weightInputContainer}>
            {/* Choose Weight */}  
            <TextInput
              textAlign={'center'}
              cursorColor={COLORS.blue}
              keyboardType='numeric'
              returnKeyType='done'
              placeholder='0'
              placeholderTextColor={COLORS.blue}
              color={COLORS.blue}
              style={styles.weightInput}
              onChangeText={(value) =>
              this.setState({weightValue: value})}>
              <Text style={styles.weightInputText}></Text>        
            </TextInput>


            {/* Choose Unit */}  
            <SelectList 
              textAlign={'center'}
              boxStyles={styles.weightBox}
              inputStyles={styles.weightDropdownInputText}
              dropdownStyles={styles.weightDropdown}
              dropdownItemStyles={styles.weightDropdownItems}
              dropdownTextStyles={styles.weightDropdownText}
              search = 'false'
              defaultOption={data2[0]}
              setSelected={(value) => {this.setState({weightUnit: value})}} 
              data={data2} 
              save="value"
            />
          </View>
        </View>


        {/* Type Container */}  
        <View style={styles.typeContainer}>
          {/* Choose Weight Title */}  
          <View style={styles.typeTitleTextContainer}>
            <Text style={styles.typeTitleText}>Type</Text>
          </View>

          <View style={styles.typeDropdownContainer}>
            {/* Choose Type */}  
            <SelectList 
            textAlign={'center'}
            boxStyles={styles.categoryBox}
            inputStyles={styles.categoryDropdownInputText}
            dropdownStyles={styles.typeDropdown}
            dropdownItemStyles={styles.weightDropdownItems}
            dropdownTextStyles={styles.weightDropdownText}
            search = 'false'
            defaultOption={data[1]}
            setSelected={(value) => {this.setState({weightDropdown: value})}} 
            data={data} 
            save="value"
            />
          </View>
        </View>
         

        {/* At Home Checkbox container */}  
        <View style={styles.checkBoxContainer}>
          {/* Resturaunt Title */}  
          <View style={styles.checkboxTitleContainer}>
            <Text style={styles.checkboxTitleText}>From grocery store?</Text>
          </View>
          {/* Resturaunt checkbox */}  
          <View style={styles.questionContainer}>
            <BouncyCheckbox
              size={22}
              style={styles.checkBox}
              fillColor={COLORS.blue}
              unfillColor='white'
              text="Yes"

              innerIconStyle={{borderWidth: 2, borderRadius: 7}}
              onPress={() => {
                this.setState((prevState) => ({
                  inHomeCheckbox: !prevState.inHomeCheckbox,
                }));
              }}
              textStyle={styles.checkboxText}
            />
          </View>
        </View>


        {/* Edible Checkbox container */}  
        <View style={styles.checkBoxContainer}>

          {/* Edible Title */}  
          <View style={styles.checkboxTitleContainer}>
            <Text style={styles.checkboxTitleText}>Is the food edible?</Text>
          </View>

          {/* Edible Checkbox */}  
          <View style={styles.questionContainer}>
            <BouncyCheckbox
              size={20}
              style={styles.checkBox}
              fillColor={COLORS.blue}
              unfillColor='white'
              text="Yes"
              innerIconStyle={{borderWidth: 2, borderRadius: 7}}
              onPress={() => {
                this.setState((prevState) => ({
                  edibleCheckbox: !prevState.edibleCheckbox,
                }));
              }}
              textStyle={styles.checkboxText}
            />
          </View>
        </View>


        {/* Submit button */}    
        <Pressable
          onPress={() => {this.createFoodWasteFirestore(); this.props.onCallStatisticsFunction()}}
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? COLORS.lightBlue
                : COLORS.blue,
            },
            styles.bottomButton,
          ]}>
          <Text style={styles.bottomButtonText}>Submit</Text>
        </Pressable>  
      </View>
    </View>
  )
}}

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
    fontWeight: '400',
    fontSize: 28,
    // alignSelf: 'flex-start',
    // paddingLeft: '5%'  
  },


  dashContainer: {
    width: '90%',
    height: '27.5%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    borderRadius: 10,
    padding: 15,
    backgroundColor: COLORS.lightBlue,
  },
  
  dialContainer: {
  },
  dial: {
    width: '100',
    height: '100',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Ensure relative positioning for proper absolute positioning
  },
  
  largeDialText: {
    fontSize: 17,
    color: COLORS.blue,
    fontWeight: '400',
    textAlign: 'center',
  },

  dialLabel: {
    top: '43%',
    position: 'absolute', // Absolute positioning
  },
  additionalText: {
    fontSize: 17,
    color: COLORS.blue,
    fontWeight: '500',
  },







  // largeDialText: {
  //   fontSize: 17,
  //   color: COLORS.blue,
  //   fontWeight: '400',
  //   textAlign: 'center',
  // },



  
 
 
  dashItemSmall: {
    width: '100',
    height: '100',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashImage: {
    width: 50,
    height: 50,
    tintColor: COLORS.blue
  },
  dashTextContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  dashTopTextContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  topLeftStreakText: {
    fontSize: 17,
    color: COLORS.blue,
    fontWeight: '700',    
  },
  topRightStreakText: {
    fontSize: 16,
    right: 0,
    color: COLORS.blue,
    fontWeight: '500',    
  },
  dashBottomTextContainer: {
  },
  bottomStreakText: {
    fontSize: 16,
    color: COLORS.blue,
    fontWeight: '500',    
  },





  trackWasteContainer: {
    width: '90%',
    height: '60%',
    position: 'relative',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.lightBlue,
  },
  trackWasteHeader: {
    fontSize: 20,
    fontWeight: '400',
    color: COLORS.blue
  },


  dateContainer: {
    flexDirection: 'row',
    width: '90%',
    height: '10%',
    alignSelf: 'center',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: COLORS.blue,
    borderRadius: 12, 
    backgroundColor: COLORS.blue,
  },

  dateTextContainer: {
    fontWeight: '400',
    width: '40%', 
    fontSize: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontWeight: '400', 
    fontSize: 17,
    color: COLORS.white,
  },
  dateInputContainer: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.lightBlue,
    borderRadius: 10, 
  },
  dateInput: {
    fontSize: 17,
    fontWeight: '400', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.transparent
  },
  dateInputText: {
    fontWeight: '400', 
    fontSize: 17,
    color: COLORS.blue,
  },
  dateDash: {
    fontWeight: '400', 
    fontSize: 17,
    color: COLORS.blue,
    paddingHorizontal: 10,
  },


  weightContainer: {
    flexDirection: 'row',
    width: '90%',
    height: '10%',

    alignSelf: 'center',
    textAlign: 'center', 
    justifyContent: 'center',
    backgroundColor: COLORS.blue,
    borderWidth: 2,
    borderColor: COLORS.blue,
    borderRadius: 12, 
    zIndex: 7, // Higher zIndex for weightContainer
  },
  weightTextContainer: {
    fontWeight: '400',
    width: '40%', 
    fontSize: 17,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2, // Higher zIndex for weightTextContainer
  },
  weightText: {
    fontWeight: '400', 
    fontSize: 17,
    color: COLORS.white,
  },
  weightInputContainer: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: COLORS.lightBlue,
    paddingLeft: 10,
    borderRadius: 10, 
    zIndex: 3, // Higher zIndex for weightInputContainer
  },
  weightInput: {
    width: '30%',
    height: '90%',
    fontSize: 17,
    fontWeight: '400', 
  },
  weightInputText: {
    fontWeight: '400', 
    fontSize: 17,
    color: COLORS.blue,
    backgroundColor: 'white',
  },
  weightBox: {
    width: '90%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    paddingVertical: 4,
    paddingHorizontal: 0,
    paddingLeft: 0,
    borderColor: COLORS.transparent,
    zIndex: 4, // Higher zIndex for weightBox
  },
  weightDropdownInputText: {
    fontWeight: '400', 
    fontSize: 17,
    color: COLORS.blue,
  },
  weightDropdown: {
    borderColor: COLORS.blue,
    borderWidth: 2,
    position: 'absolute',
    backgroundColor: COLORS.lightBlue,
    MarginHorizontal: 0,
    marginTop: -2,
    marginRight: 0,
    width: '103%',
    zIndex: 5, // Higher zIndex for weightDropdown
  },
  weightDropdownItems: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    width: '100%',
    zIndex: 5, // Higher zIndex for weightDropdownItems
  },
  weightDropdownText: {
    paddingVertical: 10,
    paddingLeft: 20,
    marginVertical: 0,
    fontWeight: '400', 
    width: '100%',
    fontSize: 17,
    color: COLORS.blue,
  },














  typeContainer: {
    flexDirection: 'row',
    width: '90%',
    height: '10%',
    alignSelf: 'center',
    textAlign: 'center', 
    justifyContent: 'center',
    backgroundColor: COLORS.blue,
    borderWidth: 2,
    borderColor: COLORS.blue,
    borderRadius: 12, 
    zIndex: 3, // Higher zIndex for weightContainer
  },
  typeTitleTextContainer: {
    fontWeight: '400',
    width: '40%', 
    fontSize: 17,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2, // Higher zIndex for weightTextContainer
  },
  typeTitleText: {
    fontWeight: '400', 
    fontSize: 17,
    color: COLORS.white,
  },
  categoryBox: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    paddingVertical: 4,
    paddingHorizontal: 0,
    backgroundColor: COLORS.transparent,
    paddingLeft: 0,
    borderColor: COLORS.transparent,
    zIndex: 4, // Higher zIndex for weightBox
  }, 
  typeDropdownContainer: {
    width: '60%',
    backgroundColor: COLORS.lightBlue,
    borderRadius: 10, 
    zIndex: 3, // Higher zIndex for weightInputContainer
  },
  categoryDropdownInputText: {
    fontWeight: '400', 
    fontSize: 17,
    color: COLORS.blue,
    paddingLeft: 10,
  },
  typeDropdown: {
    borderColor: COLORS.blue,
    borderWidth: 2,
    position: 'absolute',
    backgroundColor: COLORS.lightBlue,
    MarginHorizontal: 0,
    marginTop: -2,
    marginRight: 0,
    width: '102%',
    zIndex: 5, // Higher zIndex for weightDropdown
  },
  















  checkBoxContainer: {
    flexDirection: 'row',
    width: '90%',
    height: '10%',
    alignSelf: 'center',
    textAlign: 'center', 
    justifyContent: 'center',
    backgroundColor: COLORS.blue,
    borderWidth: 2,
    borderColor: COLORS.blue,
    borderRadius: 12, 
    zIndex: 1, // Higher zIndex for weightContainer
  },
  checkboxTitleContainer: {
    fontWeight: '400',
    width: '55%', 
    fontSize: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxTitleText: {
    fontWeight: '400', 
    fontSize: 17,
    color: COLORS.white,
  },
  questionContainer: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.lightBlue,
    borderRadius: 10, 
  },
  checkboxText: {
    fontSize: 17,
    color: COLORS.blue,
    fontWeight: '400',
    textDecorationLine: 'none',
    marginLeft: -3,
  },
  checkBox: {
  },








  bottomButton: {
    borderRadius: 10,
    width: '45%',
    height: '10%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
    borderRadius: 12, 
  },
  bottomButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  
})
