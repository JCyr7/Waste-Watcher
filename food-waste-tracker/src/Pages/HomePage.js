import React, {Component} from 'react'
import {View, StyleSheet, Text, Pressable, Modal, TextInput, Platform, Dimensions, Image} from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import {COLORS} from '../Utils/colors'
import Popup from '../Popups/Popup'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { SelectList } from 'react-native-dropdown-select-list'
import { addDoc, collection, getDoc, doc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import StreakPopup from '../Popups/StreakPopup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ReactNativeAsyncStorage} from '@react-native-async-storage/async-storage'
import updateWasteData from '../Pages/TrendsPage';

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
  {key:'1', value:'Combo'},
  {key:'2', value:'Produce'},
  {key:'3', value:'Meat'},
  {key:'4', value:'Dairy'},
  {key:'5', value:'Grains'},
  {key:'6', value:'Fish'},
  {key:'7', value:'Beverage'},
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
      weightdropdown: '',
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

  streakVisibility(value) {
    this.setState({streakModal: value})
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
        edible: this.state.edibleCheckbox,

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

        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>Home</Text>
          <Image source={require('../../images/logo.png')} style={styles.image}/>
        </View>

        {/* This Weeks Insights */}
        <View style={styles.dashContainer}>
          <Text style={styles.trackWasteHeader}>This Weeks Insights</Text>  

          <View style={styles.statsDash}>
            <View style={styles.leftDash}>
              {/*streakdash item*/}
              <Pressable 
                style={({ pressed }) => [
                {
                  backgroundColor: pressed ? COLORS.lightBlue : COLORS.transparent,
                },
                styles.dashItemSmall,
              ]}
                onPress={() => this.streakVisibility(true)}>
                <Image source={require('../../images/flamesharp.png')} style={styles.dashImage}/>
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
            </View>

            {/* Streak Modal */}
            <Modal
              style={styles.modal}
              animationType='fade'
              transparent={true}
              statusBarTranslucent={true}
              visible={this.state.streakModal}
              onRequestClose={() => this.streakVisibility(false)}>
              <Popup>
                <View style={styles.popupHeader}>
                  <View style={{width: '10%'}} />
                  <Text style={styles.popupHeaderText}>Streak</Text>
                  <Pressable
                    style={styles.closePopupButton}
                    onPress={() => this.streakVisibility(false)}>
                    <AntDesign name='close' size={24} color= 'COLORS.text' />
                  </Pressable>
                </View>
                <View style={styles.popupContent}>
                  <StreakPopup />
                </View>
              </Popup>
            </Modal>

            <View style={styles.rightDash}>
 


              {/*weekly waste dash item*/}
              <Pressable style={styles.dashItemHorizontal}>
                <Image source={require('../../images/trash.png')} style={styles.dashRightImage}/>
                <View style={styles.dashTextContainer}>

                  <View style={styles.subDashTextContainer}>
                    <Text style={styles.subDashTextLeft}>4.4 lbs</Text>
                    <Text style={styles.subDashTextRight}> of Food Waste</Text>

                  </View>
                </View>
              </Pressable>



              {/*money dash item*/}
              <Pressable style={styles.dashItemHorizontal}>
                <Image source={require('../../images/money.png')} style={styles.dashRightImage}/>
                <View style={styles.dashTextContainer}>

                  <View style={styles.subDashTextContainer}>
                    <Text style={styles.subDashTextLeft}>$15.24</Text>
                    <Text style={styles.subDashTextRight}> Wasted on Food</Text>

                  </View>
                </View>
              </Pressable>



              {/*CO2 dash item*/}
              <Pressable style={styles.dashItemHorizontal}>
                <Image source={require('../../images/leaf.png')} style={styles.dashRightImage}/>
                <View style={styles.dashTextContainer}>

                  <View style={styles.subDashTextContainer}>
                    <Text style={styles.subDashTextLeft}>9.2 lbs</Text>
                    <Text style={styles.subDashTextRight}> of CO2 Emissions</Text>

                  </View>
                </View>
              </Pressable>
            </View>
          </View>


        </View>  
           
        {/* Track Daily Food Waste */}
        <View style={styles.trackWasteContainer}>
        <Text style={styles.trackWasteHeader}>Track Daily Food Waste</Text> 

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
              cursorColor={COLORS.text}
              keyboardType='numeric'
              returnKeyType='done'
              placeholder={todayMonth} 
              placeholderTextColor={COLORS.text}
              color={COLORS.text}
              style={styles.dateInput}
              onChangeText={(value) => this.setState({selectedMonth: value})}>
              <Text style={styles.dateInputText}></Text>        
            </TextInput> 



            <Text style={styles.dateDash}>/</Text>



            {/* Choose Day */}  
            <TextInput
              textAlign={'center'}
              cursorColor={COLORS.text}
              keyboardType='numeric'
              returnKeyType='done'
              placeholder={todayDay} 
              placeholderTextColor={COLORS.text}
              color={COLORS.text}
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
              cursorColor={COLORS.text}
              keyboardType='numeric'
              returnKeyType='done'
              placeholder='0'
              placeholderTextColor={COLORS.text}
              color={COLORS.text}
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
              arrowicon={<FontAwesome name="chevron-down" marginLeft={6} size={12} style={{ color: COLORS.element }} />}              defaultOption={data2[0]}
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
            arrowicon={<FontAwesome name="chevron-down" marginLeft={5} size={12} style={{ color: COLORS.element }} />}         
            setSelected={(value) => {this.setState({weightDropdown: value})}} 
            data={data} 
            save="value"
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
              fillColor={COLORS.text}
              unfillColor={COLORS.background}
              text="Yes"
              innerIconStyle={{borderWidth: 1.9, borderRadius: 7}}
              onPress={() => {
                this.setState((prevState) => ({
                  edibleCheckbox: !prevState.edibleCheckbox,
                }));
              }}
              textStyle={styles.checkboxText}
            />
          </View>
        </View>

        {/* At Home Checkbox container */}  
        <View style={styles.homecheckBoxContainer}>
          {/* Resturaunt checkbox */}  
          <View style={styles.homequestionContainer}>
            <BouncyCheckbox
              size={20}
              style={styles.checkBox}
              fillColor={COLORS.text}
              unfillColor={COLORS.background}
              text="Resturaunt"

              innerIconStyle={{borderWidth: 1.9, borderRadius: 7}}
              textStyle={styles.checkboxText}
            />
          </View>
          <View style={styles.questionContainer}>
            <BouncyCheckbox
              size={20}
              style={styles.checkBox}
              fillColor={COLORS.text}
              unfillColor={COLORS.background}
              text="Home"

              innerIconStyle={{borderWidth: 1.9, borderRadius: 7}}
              onPress={() => {
                this.setState((prevState) => ({
                  inHomeCheckbox: !prevState.inHomeCheckbox,
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
                ? COLORS.buttonPress
                : COLORS.button,
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


  dashContainer: {
    width: '90%',
    height: '30%',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    backgroundColor: COLORS.background,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: -10,
      height: 10
    },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },


  statsDash: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10,
  },
  leftDash: {
    width: '30%',
  },
  dashItemSmall: {
    width: '100',
    height: '100',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashImage: {
    width: 60,
    height: 60,
    tintColor: COLORS.button
  },
  dashTextContainer: {
    marginTop: 5,
    alignItems: 'center',
  },
  dashTopTextContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  topLeftStreakText: {
    fontSize: 18,
    color: COLORS.boldtext,
    fontWeight: '700',    
  },
  topRightStreakText: {
    fontSize: 18,
    color: COLORS.boldtext,
    fontWeight: '700',     
  },
  dashBottomTextContainer: {
  },
  bottomStreakText: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: '500',    
  },

  rightDash: {
    justifyContent: 'space-between',
    height: '90%',
    width: '69.5%',
    marginLeft: '1.5%',
  },
  dashRightImage: {
    width: 30,
    height: 30,
    tintColor: COLORS.icon,
    marginRight: 12,
    transform: [{ scaleX: -1 }], // Flip horizontally

  },
  dashItemHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subDashTextContainer: {
    flexDirection: 'row',
    paddingBottom: 3,
  },
  subDashTextLeft: {
    fontSize: 16,
    color: COLORS.boldtext,
    fontWeight: '600',   
  },
  subDashTextRight: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '400',   
  },



  trackWasteContainer: {
    width: '95%',
    height: '57%',
    position: 'relative',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.transparent,
  },
  trackWasteHeader: {
    fontSize: 20,
    fontWeight: '500',
    color: COLORS.header,
    // textShadowColor: COLORS.lightBlue,
    // textShadowRadius: 1,
    // textShadowOffset: {
    //   width: -1,
    //   height: 1
    // },
  },

  dateContainer: {
    flexDirection: 'row',
    width: '90%',
    height: '10%',
    alignSelf: 'center',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: COLORS.element,
    borderRadius: 12, 
    backgroundColor: COLORS.element,
  },
  dateTextContainer: {
    width: '40%', 
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontWeight: '500', 
    fontSize: 16,
    color: COLORS.elementText,
  },
  dateInputContainer: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.background,
    borderRadius: 10, 
  },
  dateInput: {
    fontSize: 16,
    fontWeight: '500', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.transparent
  },
  dateInputText: {
    fontWeight: '500', 
    fontSize: 16,
    color: COLORS.text,
  },
  dateDash: {
    fontWeight: '500', 
    fontSize: 16,
    color: COLORS.text,
    paddingHorizontal: 10,
  },


  weightContainer: {
    flexDirection: 'row',
    width: '90%',
    height: '10%',

    alignSelf: 'center',
    textAlign: 'center', 
    justifyContent: 'center',
    backgroundColor: COLORS.element,
    borderWidth: 2,
    borderColor: COLORS.element,
    borderRadius: 12, 
    zIndex: 7, // Higher zIndex for weightContainer
  },
  weightTextContainer: {
    width: '40%', 
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2, // Higher zIndex for weightTextContainer
  },
  weightText: {
    fontWeight: '500', 
    fontSize: 16,
    color: COLORS.elementText,
  },
  weightInputContainer: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingLeft: 10,
    borderRadius: 10, 
    zIndex: 3, // Higher zIndex for weightInputContainer
  },
  weightInput: {
    width: '30%',
    height: '90%',
    fontSize: 17,
    fontWeight: '500', 
  },
  weightInputText: {
    fontWeight: '500', 
    fontSize: 17,
    color: COLORS.text,
    backgroundColor: COLORS.background,
  },
  weightBox: {
    width: '95%',
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
    fontWeight: '500', 
    fontSize: 16,
    color: COLORS.text,
  },
  weightDropdown: {
    borderColor: COLORS.element,
    borderWidth: 2,
    position: 'absolute',
    backgroundColor: COLORS.background,
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
    fontWeight: '500', 
    width: '100%',
    fontSize: 16,
    color: COLORS.text,
  },


  typeContainer: {
    flexDirection: 'row',
    width: '90%',
    height: '10%',
    alignSelf: 'center',
    textAlign: 'center', 
    justifyContent: 'center',
    backgroundColor: COLORS.element,
    borderWidth: 2,
    borderColor: COLORS.element,
    borderRadius: 12, 
    zIndex: 3, // Higher zIndex for weightContainer
  },
  typeTitleTextContainer: {
    width: '40%', 
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2, // Higher zIndex for weightTextContainer
  },
  typeTitleText: {
    fontWeight: '500', 
    fontSize: 16,
    color: COLORS.elementText,
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
    backgroundColor: COLORS.background,
    borderRadius: 10, 
    zIndex: 3, // Higher zIndex for weightInputContainer
  },
  categoryDropdownInputText: {
    fontWeight: '500', 
    fontSize: 16,
    color: COLORS.text,
    paddingLeft: 10,
  },
  typeDropdown: {
    borderColor: COLORS.element,
    borderWidth: 2,
    position: 'absolute',
    backgroundColor: COLORS.background,
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
    backgroundColor: COLORS.element,
    borderWidth: 2,
    borderColor: COLORS.element,
    borderRadius: 12, 
    zIndex: 1, // Higher zIndex for weightContainer
  },
  checkboxTitleContainer: {
    width: '55%', 
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxTitleText: {
    fontWeight: '500', 
    fontSize: 16,
    color: COLORS.elementText,
  },
  questionContainer: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.background,
    borderRadius: 10, 
  },
  checkboxText: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
    textDecorationLine: 'none',
    marginLeft: -3,
  },
  checkBox: {
  },


  homecheckBoxContainer: {
    flexDirection: 'row',
    width: '90%',
    height: '10%',
    alignSelf: 'center',
    textAlign: 'center', 
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.element,
    backgroundColor: COLORS.background,
    borderRadius: 12, 
    zIndex: 1, // Higher zIndex for weightContainer
  },
  homequestionContainer: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.background,
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
    color: COLORS.buttonText,
    fontSize: 16,
    fontWeight: '600',
  },


  modal: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  popupHeader: {
    flexDirection: 'row',
    height: '10%',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  popupHeaderText: {
    fontSize: 24,
    fontWeight: '800'
  },
  closePopupButton: {
    marginTop: '2%',
    paddingRight: '2%',
    alignItems: 'flex-end',
    width: '10%'
  },
  popupContent: {
    width: '100%',
    height: '90%',
    alignItems: 'center'
  }
})
