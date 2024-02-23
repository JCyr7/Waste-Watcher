import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
} from 'react-native'
import {
    ProgressChart,
} from 'react-native-chart-kit'
import {COLORS} from '../Utils/colors'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { SelectList } from 'react-native-dropdown-select-list'

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
//screenWidth = Dimensions.get('window').width;

data = [
  {key:'1', value:'Dairy'},
  {key:'2', value:'Produce'},
  {key:'3', value:'Meat'},
  {key:'4', value:'Grains'},
  {key:'5', value:'Fish'},
  {key:'6', value:'Beverage'},
  {key:'7', value:'Combination'},
]
data2 = [
  {key:'1', value:'lbs  '},
  {key:'2', value:'oz  '},
  {key:'3', value:'cups  '},
  {key:'4', value:'tbs  '},

]
data3 = [
  20
]


export default class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weightdropdown: '',
      selectedMonth: '',
      selectedDay: '',
      weightUnit: '',
      weightValue: '',
      convertedWeight: '',

      //user streak
      //total number of user logins
    

      //modal for additional data on user
      //all relevant props



      // householdName: '',
      // zipcode: '',
      // householdSize: 0,
      // userName: '',
      // inHomeCheckbox: false,
      // householdInfoModal: false,
      // trackWasteModal: false,
      // checkboxValue: false,

    }
    this.getData()
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

  render() {
    const {navigation} = this.props
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          {/* Welcome Header */}
          {/* <Image source={require('../../images/logo.png')} style={styles.image}/> */}
          <Text style={styles.titleText}>Home</Text>
            {/* Progress Dials */}
          <View style={styles.dialContainer}>
            
            <View style={styles.smallDial}>
                <ProgressChart 
                data={data3}
                width={82}
                height={82}
                strokeWidth={10}
                radius={30}
                chartConfig={dialChartConfig}
                hideLegend={true}/>
                <Text style={styles.smallDialText}>Daily</Text>
                <Text style={styles.smallDialText}>Streak</Text>
            </View>
            <View style={styles.largeDial}>
              <ProgressChart
              data={data3}
              width={125}
              height={125}
              strokeWidth={13}
              radius={45}
              chartConfig={dialChartConfig}
              hideLegend={true}/>
              <Text style={styles.largeDialText}>Weekly</Text>
              <Text style={styles.largeDialText}>Waste</Text>
            </View>
            <View style={styles.smallDial}>
                <ProgressChart 
                data={data3}
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
          <View style={styles.trackWasteContainer}>
            <Text style={styles.trackWasteHeader}>Track Food Waste</Text>        
            <View style={styles.dateContainer}>
              <View style={styles.dateTitleInputTextContainer}>
              <Text style={styles.dateTitleInputText}>Date</Text>
              </View>






              <View style={styles.dateInputContainer}>
                <TextInput
                  onChangeText={(value) => this.setState({selectedDay: value})}
                  cursorColor={COLORS.blue}
                  selectionColor={COLORS.blue}
                  maxLength={2} // Set the maximum length to 2 characters
                  keyboardType='numeric'
                  returnKeyType='done'
                  placeholder="2" //get the date
                  placeholderTextColor={COLORS.blue}
                  style={[styles.dateInput, { color: COLORS.blue }]}>             
                </TextInput>





                <Text style={styles.dateInputText}> - </Text>
                <TextInput
                  cursorColor={COLORS.blue}
                  selectionColor={'white'}
                  keyboardType='numeric'
                  returnKeyType='done'
                  placeholder='22' //get the date
                  placeholderTextColor={COLORS.blue}
                  style={[styles.dateInput, { color: COLORS.blue }]}             
                  onChangeText={(value) => this.setState({selectedMonth: value})}>
                </TextInput>
              </View>
            </View>







            <View style={styles.weightContainer}>
            <SelectList 
                textAlign={'center'}
                boxStyles={styles.weightDropdownBox}
                inputStyles={styles.weightInputTextBox}
                dropdownStyles={styles.weightDropdown}
                dropdownTextStyles={styles.weightInputText}
                search = 'false'
                defaultOption={data2[0]}
                setSelected={(value) => {this.setState({weightdropdown: value})}} 
                data={data2} 
                save="value"
              />
              <View style={styles.dateInputContainer}>
                <TextInput
                  textAlign={'center'}
                  cursorColor={COLORS.blue}
                  keyboardType='numeric'
                  returnKeyType='done'
                  placeholder='8.2'
                  placeholderTextColor={COLORS.blue}
                  style={[styles.dateInput, { color: COLORS.blue }]}             
                  onChangeText={(value) =>
                  this.setState({zipcode: value})}>
                </TextInput>
              </View>
              
            </View>
            <SelectList 
                textAlign={'center'}
                boxStyles={styles.categoryDropdown}
                inputStyles={styles.weightInputText}
                dropdownStyles={styles.categoryDropdown}
                dropdownTextStyles={styles.weightInputText}
                search = 'false'
                defaultOption={data[1]}
                setSelected={(value) => {this.setState({weightdropdown: value})}} 
                data={data} 
                save="value"
              />
            <View style={styles.checkBoxContainer}>
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
            <Pressable style={styles.bottomButton}>
              <Text style={styles.bottomButtonText}>Submit</Text>
            </Pressable>    

            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
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
    padding: 17,
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
    fontSize: 17,
    color: COLORS.blue,
    fontWeight: '500',
    textAlign: 'center',
  },




  trackWasteContainer: {
    width: '90%',
    height: '60%',
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





  dateContainer: {
    flexDirection: 'row',
    width: '40%',
    height: '12%',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.blue,
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'space-evenly',
    borderColor: COLORS.blue,
    backgroundColor: COLORS.lightBlue
  },
  dateTitleInputTextContainer:{
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
  },
  dateTitleInputText:{
    fontWeight: '500', 
    fontSize: 17,
    color: COLORS.white,
  },
  dateInputContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '60%', // Adjusted width to make it take 50% of dateContainer
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateInput: {
    fontSize: 17,
    fontWeight: '500', 
    backgroundColor: COLORS.transparent,
  },
  dateInputText: {
    fontWeight: '500', 
    fontSize: 17,
    color: COLORS.blue,
  },





  weightContainer: {
    flexDirection: 'row',
    width: '40%',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.blue,
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'space-evenly',
    borderColor: COLORS.blue,
    backgroundColor: COLORS.lightBlue
  },
  weightDropdownBox: {
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
  },
  weightInputTextBox: {
    width: '40%',

    color: COLORS.white,
    fontSize: 17,
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: '500', 
  },
  weightDropdown: {
    borderColor: COLORS.blue,
    alignSelf: 'flex-end',
    backgroundColor: COLORS.lightBlue
  },
  weightInputText: {
    color: COLORS.blue,
    fontSize: 17,
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold', 
  },



  categoryContainer: {
    borderRadius: 10,
    width: '75%',
    marginBottom: "7%",
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'flex-end',
    borderColor: COLORS.blue,
  },
  categoryDropdown: {
    borderColor: COLORS.blue,
    borderWidth: 3,
    borderRadius: 10,
    width: '75%',
    marginBottom: '7%',
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.lightBlue
  },





  checkBoxContainer: {
    flexDirection: 'row',
  },
  checkBox: {
    backgroundColor: 'white',
  },
  checkboxText: {
    fontSize: 17,
    color: COLORS.blue,
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
})
  

  // barGraphContainer: {
  //   width: '66%',
  //   height: '100%',
  //   alignSelf: 'right',
  //   alignContent: 'center',
  //   justifyContent: 'center',
  //   borderRadius: 20,
  //   backgroundColor: COLORS.lightBlue,
  // },
  // friendQuestContainer: {
  //   width: '90%',
  //   height: '20%',
  //   flexDirection: 'row',
  //   verticalAlign: 'middle',
  //   borderRadius: 20,
  //   backgroundColor: COLORS.lightBlue,
  // },
  // friendQuestText: {
  //   height: "100%",
  //   width: "30%",
  //   marginLeft: '2%',
  //   marginRight: '2%',
  //   marginTop: '8%',
  //   fontSize: 22,
  //   color: COLORS.blue,
  //   fontWeight: '800',
  //   textAlign: 'center',
  //   verticalAlign: 'middle'
  // },
  // barGraphStyle: {
  //   transform: [{rotate: '90 deg'}],
  //   alignSelf: 'flex-start',
  //   marginBottom: "30%",
  //   marginLeft: '17%',
  //   //justifyContent: 'center',
  // },
  // welcomeContainer: {
  //   width: '90%',
  //   height: '30%',
  //   borderRadius: 10,
  //   alignContent: "center",
  //   backgroundColor: COLORS.lightBlue,
  //   shadowOffset: {
  //     width: -3,
  //     height: 4
  //   },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 6,
  //   elevation: 10,
  //   shadowColor: COLORS.shadow
  // },

  // goalPopupHeader: {
  //   flexDirection: 'row',
  //   height: '10%',
  //   justifyContent: 'space-around',
  //   alignItems: 'center'
  // },
  // goalPopupHeaderText: {
  //   fontSize: 24,
  //   fontWeight: '800'
  // },
  // goalCloseButton: {
  //   marginTop: '2%',
  //   paddingRight: '0%',
  //   alignItems: 'flex-end',
  //   width: '10%'
  // },
  // goalPopupContent: {
  //   width: '100%',
  //   height: '90%'
  // },
        {/* <View style={styles.friendQuestContainer}>
            <Text style={styles.friendQuestText}>Friend Quest Progress</Text>
            <View style={styles.barGraphContainer}>
            <BarChart
            style={styles.barGraphStyle}
            data={data3}
            width={170}
            height={250}
            fromZero={true}
            showBarTops={false}
            withInnerLines={false}
            withHorizontalLabels={false}
            chartConfig={barChartConfig}
            verticalLabelRotation={-90}>
            </BarChart>
            </View>
        </View> */}
        

        {/* Household info Modal */}
        {/* <Modal
            animationType='fade'
            transparent={true}
            statusBarTranslucent={true}
            visible={this.state.householdInfoModal}
            onRequestClose={() => this.openHouseHoldInfo(false)}>
            <Popup>
            <Pressable
                onPress={() => this.openHouseHoldInfo(false)}
                style={styles.closePopupButton}>
                <AntDesign name='close' size={24} color='black' />
            </Pressable>
            <Text style={styles.householdInfoHeader}>Household Info</Text>
            <Text style={styles.householdInfoInputTitle}>Household Name</Text>
            <TextInput
                cursorColor={'black'}
                style={styles.householdInfoInput}
                onChangeText={(value) =>
                this.setState({householdName: value})
                }></TextInput>
            <Text style={styles.householdInfoInputTitle}>Zip Code</Text>
            <TextInput
                cursorColor={'black'}
                keyboardType='numeric'
                style={styles.householdInfoInput}
                onChangeText={(value) =>
                this.setState({zipcode: value})
                }></TextInput>
            <Text style={styles.householdInfoInputTitle}>Household Size</Text>
            <TextInput
                cursorColor={'black'}
                keyboardType='numeric'
                style={styles.householdInfoInput}
                onChangeText={(value) =>
                this.setState({householdSize: value})
                }></TextInput>
            <Text style={styles.householdInfoPrivacyMessage}>
                Entering some info about your household helps us at the Mitchell
                Center get a better idea about how food is being wasted in the
                state of Maine, but is not essential to the functionality of the
                app. By checking the box below, you agree to associate the above
                information with your account.
            </Text>
            <BouncyCheckbox
                size={22}
                style={styles.checkBox}
                fillColor={COLORS.lightGreen}
                unfillColor='white'
                text='I agree'
                innerIconStyle={{borderWidth: 2}}
                onPress={() => this.toggleCheckbox(!this.state.checkboxValue)}
                textStyle={{textDecorationLine: 'none'}}
            />
            <Pressable
                onPress={() => this.submitHouseholdInfo()}
                style={({pressed}) => [
                {
                    backgroundColor: pressed
                    ? COLORS.lightGreen
                    : COLORS.blue
                },
                styles.householdInfoSubmitButton
                ]}>
                <Text style={[styles.buttonText, {color: 'white'}]}>Submit</Text>
            </Pressable>
            </Popup>
        </Modal>

        {/* Track waste modal */}
        {/* <Modal
            animationType='fade'
            transparent={true}
            statusBarTranslucent={true}
            visible={this.state.trackWasteModal}
            onRequestClose={() => this.openTrackWaste(false)}>
            <Popup>
            <Pressable
                onPress={() => this.openTrackWaste(false)}
                style={styles.closePopupButton}>
                <AntDesign name='close' size={24} color='black' />
            </Pressable>
            <TrackWastePopup />
            </Popup>
        </Modal> */}


  // // Sets the state for the household info modal
  // openHouseHoldInfo = async (value) => {
  //   await AsyncStorage.setItem('newUser', 'false')
  //   this.setState({householdInfoModal: value})
  // }

  // // Sets state for trackWaste popup
  // openTrackWaste(value) {
  //   this.setState({trackWasteModal: value})
  // }

  // openGoal(value) {
  //   this.setState({goalModal: value})
  // }
// barChartConfig = {
//   backgroundGradientFrom: "#1E2923",
//   backgroundGradientFromOpacity: 0,
//   backgroundGradientTo: COLORS.blue,
//   backgroundGradientToOpacity: 0,
//   color: (opacity = 1) => COLORS.blue,
//   strokeWidth: 1, // optional, default 3
//   barPercentage: 1,
//   decimalPlaces: 0,
// }


  {/* <Pressable
        style={styles.profileIcon}
        onPress={() => navigation.navigate('ProfilePage')}>
        <Image
          source={require('../../images/profile.png')} // Provide the correct path to your profile image
          style={{ width: 30, height: 30, tintColor: COLORS.black }}/>
        {/* <Text style={styles.profileText}>Profile</Text>
        </Pressable> */}

        // welcomeText: {
        //   marginTop: '6%',
        //   fontSize: 28,
        //   color: COLORS.blue,
        //   fontWeight: '800',
        //   textAlign: 'center'
        // },



            
    // buttonContainer: {
    //   borderWidth: 0,
    //   width: '95%',
    //   height: '77%',
    //   justifyContent: 'space-evenly',
    //   alignItems: 'center'
    // },
    // weeklyWasteProgressButton: {
    //   width: '25%',
    //   height: '25%',
    //   backgroundColor: COLORS.lightBlue,
    //   borderRadius: 100,
    //   verticalAlign: "middle",
    //   top: "25%",
    //   left: "65%",
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // },
    // moneyWastedProgressButton: {
    //   width: '25%',
    //   height: '25%',
    //   backgroundColor: COLORS.lightBlue,
    //   borderRadius: 100,
    //   verticalAlign: "middle",
    //   left: "10%",
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // },
    // buttonText: {
    //   fontSize: 18,
    //   color: COLORS.blue,
    //   fontWeight: '800'
    // },
    // householdInfoHeader: {
    //   marginTop: '5%',
    //   color: COLORS.darkerGray,
    //   fontSize: 22,
    //   fontWeight: '500',
    //   alignSelf: 'center',
    //   marginBottom: '5%'
    // },
    // householdInfoInput: {
    //   borderRadius: 10,
    //   borderWidth: 3,
    //   paddingTop: '1%',
    //   padding: '1%',
    //   width: '95%',
    //   alignSelf: 'center',
    //   borderColor: 'grey'
    // },



    // householdInfoInputTitle: {
    //   paddingLeft: '3%',
    //   paddingTop: '1%',
    //   paddingBottom: '1%',
    //   fontWeight: 'bold',
    //   color: 'grey'
    // },
    // householdInfoPrivacyMessage: {
    //   paddingLeft: '3%',
    //   paddingTop: '1%',
    //   paddingBottom: '1%',
    //   fontWeight: 'bold',
    //   color: 'grey'
    // },
    // householdInfoSubmitButton: {
    //   width: 90,
    //   height: 40,
    //   alignItems: 'center',
    //   alignSelf: 'center',
    //   borderRadius: 10,
    //   justifyContent: 'center',
    //   marginTop: '50%'
    // },


    // profileIcon: {
    //   position: 'absolute',
    //   flexDirection: 'column',
    //   alignItems: 'center',
    //   top: 10,
    //   right: 40,
    // },
    // profileText: {
    //   color: COLORS.black,
    //   marginTop: 3,
    //   fontSize: 12,
    // },


    // linkContainer: {
    //   width: '100%',
    //   height: '100%',
    // },


    // checkBox: {
    //   marginBottom: "5%",
    //   marginLeft: '30%'
    // },
    // closePopupButton: {
    //   padding: '2%',
    //   alignSelf: 'flex-end',
    //   alignItems: 'flex-end'
    // },

      // Sets state of checkbox
  // toggleCheckbox(value) {
  //   // console.log(this.state.checkboxValue)
  //   this.setState({checkboxValue: value})
  // }

  // Method to send household info to backend
  // submitHouseholdInfo() {
  //   console.log(this.state.householdName)
  //   console.log(this.state.zipcode)
  //   console.log(this.state.householdSize)
  //   this.setState({householdInfoModal: false})
  // }


    //  // method to conditionally display different numbers of days for each month
  //  dayOption(month) {
  //   if (month === 'February') {
  //     return dayDropdown.slice(0, 28)
  //   } else if (
  //     month === 'April' ||
  //     month === 'June' ||
  //     month === 'September' ||
  //     month === 'November'
  //   ) {
  //     return dayDropdown.slice(0, 30)
  //   } else {
  //     return dayDropdown
  //   }
  // }


    // Method converts weight from one unit to oz
  // convertWeight(weight, unit) {
  //   if (unit === "g")
  // }


  /*calendar  
  openCalendar(nextValue) {
    this.setState({calendar: nextValue})
  }
  */