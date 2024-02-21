import {React, Component} from 'react'
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Modal,
  TextInput,
  Platform,
  Dimensions,
} from 'react-native'
import {
    BarChart,
    ProgressChart,
} from 'react-native-chart-kit'
import Calendar from 'react-calendar'
import {AntDesign} from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {COLORS} from '../Utils/colors'
import Popup from '../Popups/Popup'
import TrackWastePopup from '../Popups/TrackWastePopup'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import {DATA} from '../Utils/TestData'
import { SelectList } from 'react-native-dropdown-select-list'
import SubmitButton from '../TrackWaste/SubmitButton'
import { Colors } from 'react-native/Libraries/NewAppScreen'

dialChartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(0, 150, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
}

//calendar functions
screenWidth = Dimensions.get('window').width;

data = [
  {key:'1', value:'Dairy'},
  {key:'2', value:'Produce'},
  {key:'3', value:'Meat'},
  {key:'4', value:'Drinks'},
]
data2 = [
  {key:'1', value:'lbs'},
  {key:'2', value:'oz'},
  {key:'3', value:'g'},
]
data3 = [
  20
]


export default class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weightdropdown: '',
      checkboxValue: false,
      edibleCheckbox: false,
      inhomeCheckbox: false,
      householdName: '',
      zipcode: '',
      selectedMonth: '',
      selectedDay: 0,
      weightUnit: '',
      weightValue: 0,
      convertedWeight: 0
      // householdSize: 0,
      // userName: '',
      // inHomeCheckbox: false,
      // householdInfoModal: false,
      // trackWasteModal: false,
    }
    this.getData()
  }

  // Method retrieves data from async storage
  getData = async () => {
    let newUser = await AsyncStorage.getItem('newUser')
    newUser = JSON.parse(newUser)
    this.setState({householdInfoModal: newUser})

    let userName = await AsyncStorage.getItem('username')
    this.setState({userName: userName})
  }

  // Sets state of checkbox
  toggleCheckbox(value) {
    // console.log(this.state.checkboxValue)
    this.setState({checkboxValue: value})
  }

  // Method to send household info to backend
  // submitHouseholdInfo() {
  //   console.log(this.state.householdName)
  //   console.log(this.state.zipcode)
  //   console.log(this.state.householdSize)
  //   this.setState({householdInfoModal: false})
  // }

   // method to conditionally display different numbers of days for each month
   dayOption(month) {
    if (month === 'February') {
      return dayDropdown.slice(0, 28)
    } else if (
      month === 'April' ||
      month === 'June' ||
      month === 'September' ||
      month === 'November'
    ) {
      return dayDropdown.slice(0, 30)
    } else {
      return dayDropdown
    }
  }

  // Method converts weight from one unit to oz
  // convertWeight(weight, unit) {
  //   if (unit === "g")
  // }


  /*calendar  
  openCalendar(nextValue) {
    this.setState({calendar: nextValue})
  }
  */

  render() {
    const {navigation} = this.props
    return (
      <View style={styles.container}>
        {/* Welcome Header */}
        <Text style={styles.titleText}>Home</Text>
          {/* Progress Dials */}
        <View style={styles.dialContainer}>
          <View style={styles.weeklyWasteDial}>
            <ProgressChart
            data={data3}
            width={125}
            height={125}
            strokeWidth={16}
            radius={25}
            chartConfig={dialChartConfig}
            hideLegend={true}
            />
            <Text style={styles.weeklyWasteDialText}>Weekly</Text>
            <Text style={styles.weeklyWasteDialText}>Waste</Text>
        </View>
        <View style={styles.streakDial}>
            <ProgressChart 
            data={data3}
            width={125}
            height={125}
            strokeWidth={16}
            radius={45}
            chartConfig={dialChartConfig}
            hideLegend={true}
            />
            <Text style={styles.streakDialText}>Money</Text>
            <Text style={styles.streakDialText}>Wasted</Text>
        </View>
        <View style={styles.streakDial}>
            <ProgressChart 
            data={data3}
            width={125}
            height={125}
            strokeWidth={16}
            radius={25}
            chartConfig={dialChartConfig}
            hideLegend={true}
            />
            <Text style={styles.streakDialText}>Money</Text>
            <Text style={styles.streakDialText}>Wasted</Text>
        </View>
      </View>
      <View style={styles.trackWasteContainer}>
        <Text style={styles.trackWasteHeader}>Track Waste</Text>        
            <View style={styles.dateContainer}>
              <TextInput
                textAlign={'center'}
                cursorColor={COLORS.darkGreen}
                keyboardType='numeric'
                returnKeyType='done'
                placeholder='02'
                placeholderTextColor={COLORS.darkGreen}
                style={styles.dateInput}
                onChangeText={(value) =>
                this.setState({zipcode: value})}>
                <Text style={styles.dateInputText}></Text>        
              </TextInput>
              <Text style={styles.dateInputText}>/</Text>
              <TextInput
                textAlign={'center'}
                cursorColor={COLORS.darkGreen}
                keyboardType='numeric'
                returnKeyType='done'
                placeholder='18'
                placeholderTextColor={COLORS.darkGreen}
                style={styles.dateInput}
                onChangeText={(value) =>
                this.setState({zipcode: value})}>
                <Text style={styles.dateInputText}></Text>        
              </TextInput>
            </View>
            <View style={styles.weightContainer}>
              <TextInput
                textAlign={'center'}
                cursorColor={COLORS.darkGreen}
                keyboardType='numeric'
                returnKeyType='done'
                placeholder='8.2'
                placeholderTextColor={COLORS.darkGreen}
                style={styles.weightInput}
                onChangeText={(value) =>
                this.setState({zipcode: value})}>
                <Text style={styles.weightInputText}></Text>        
              </TextInput>
              <SelectList 
                textAlign={'center'}
                boxStyles={styles.weightDropdown}
                inputStyles={styles.weightInputText}
                dropdownStyles={styles.weightDropdown}
                dropdownTextStyles={styles.weightInputText}
                search = 'false'
                defaultOption={data2[0]}
                setSelected={(value) => {this.setState({weightdropdown: value})}} 
                data={data2} 
                save="value"
              />
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
          <BouncyCheckbox
                    size={22}
                    style={styles.checkBox}
                    fillColor={COLORS.darkGreen}
                    unfillColor='white'
                    text="In-Home"

                    innerIconStyle={{borderWidth: 2}}
                    onPress={() => {
                      this.setState((prevState) => ({
                        inHomeCheckbox: !prevState.inHomeCheckbox,
                      }));
                    }}
                    textStyle={styles.trackWasteInputText}
                  />
          <BouncyCheckbox
                    size={22}
                    style={styles.checkBox}
                    fillColor={COLORS.darkGreen}
                    unfillColor='white'
                    text=" Edible"
                    innerIconStyle={{borderWidth: 2}}
                    onPress={() => {
                      this.setState((prevState) => ({
                        edibleCheckbox: !prevState.edibleCheckbox,
                      }));
                    }}
                    textStyle={styles.trackWasteInputText}
                  />
          <Pressable style={styles.bottomButton}>
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

    titleText: {
      color: COLORS.blue,
      fontWeight: '500',
      fontSize: 28,
    },



    dialContainer: {
      width: '90%',
      height: '25%',
      marginTop: '3%',
      marginBottom: '6%',
      flexDirection: 'row',
      justifyContent: 'center',
      borderRadius: 20,
      backgroundColor: COLORS.white,
    },
    weeklyWasteDial: {
      width: '100',
      height: '100',
      marginLeft: '5%',
      marginRight: '5%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    weeklyWasteDialText: {
      fontSize: 20,
      color: COLORS.darkGreen,
      fontWeight: '800',
      textAlign: 'center',
    },
    streakDial: {
      width: '100',
      height: '100',
      marginLeft: '5%',
      marginRight: '5%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    streakDialText: {
      fontSize: 20,
      color: COLORS.darkGreen,
      fontWeight: '800',
      textAlign: 'center',
    },

    trackWasteContainer: {
      width: '90%',
      height: '50%',
      justifyContent: 'space-evenly',
      borderRadius: 10,
      backgroundColor: COLORS.white,
    },

    trackWasteHeader: {
      fontSize: 28,
      fontWeight: '800',
      color: COLORS.darkGreen,
      marginTop: '2%',
      marginBottom: "6%",
      textAlign: 'center'
    },

    bottomButton: {
      backgroundColor: COLORS.lightBlue,
      borderRadius: 10,
      width: '40%',
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomButtonText: {
      color: COLORS.blue,
      fontSize: 16,
      fontWeight: '700',
    },





    trackWasteInputText: {
      fontSize: 22,
      color: COLORS.darkGreen,
      fontWeight: '800',
      marginLeft: "15%",
      textDecorationLine: 'none',
    },
    trackWasteInput: {
      borderRadius: 10,
      borderWidth: 3,
      padding: '2%',
      width: '75%',
      //marginTop: "2%",
      marginBottom: "5%",
      alignSelf: 'center',
      alignText: 'center',
      borderColor: COLORS.darkGreen,
      backgroundColor: "#e2f0c9"
    },
    dateContainer: {
      borderRadius: 10,
      borderWidth: 3,
      flexDirection: 'row',
      width: '60%',
      paddingVertical: '1%',
      marginBottom: "7%",
      alignSelf: 'center',
      alignText: 'center',
      justifyContent: 'space-evenly',
      borderColor: COLORS.darkGreen,
      backgroundColor: "#e2f0c9"
    },
    dateInput: {
      fontSize: 22,
      fontWeight: 'bold', 
      backgroundColor: "#e2f0c9"
    },
    dateInputText: {
      fontWeight: 'bold', 
      fontSize: 30,
      color: COLORS.darkGreen,
    },
    weightContainer: {
      borderRadius: 10,
      //borderWidth: 3,
      flexDirection: 'row',
      width: '75%',
      //padding: '2%',
      marginBottom: "7%",
      alignSelf: 'center',
      alignText: 'center',
      justifyContent: 'flex-end',
      borderColor: COLORS.darkGreen,
      //backgroundColor: "#e2f0c9"
    },
    weightInput: {
      borderColor: COLORS.darkGreen,
      borderWidth: 3,
      borderRadius: 10,
      fontSize: 20,
      fontWeight: 'bold', 
      paddingVertical: "3%",
      width: '65%',
      alignSelf: 'flex-start',
      backgroundColor: "#e2f0c9"
    },
    weightInputText: {
      color: COLORS.darkGreen,
      fontSize: 20,
      alignText: 'center',
      alignSelf: 'center',
      fontWeight: 'bold', 
    },
    weightDropdown: {
      borderColor: COLORS.darkGreen,
      borderWidth: 3,
      borderRadius: 10,
      paddingVertical: "3%",
      alignSelf: 'flex-end',
      backgroundColor: "#e2f0c9"
    },
    categoryContainer: {
      borderRadius: 10,
      width: '75%',
      marginBottom: "7%",
      alignSelf: 'center',
      alignText: 'center',
      justifyContent: 'flex-end',
      borderColor: COLORS.darkGreen,
    },
    categoryDropdown: {
      borderColor: COLORS.darkGreen,
      borderWidth: 3,
      borderRadius: 10,
      width: '75%',
      marginBottom: '7%',
      paddingVertical: "3%",
      alignText: 'center',
      alignSelf: 'center',
      backgroundColor: "#e2f0c9"
    },









    
  })
  

  // barGraphContainer: {
  //   width: '66%',
  //   height: '100%',
  //   alignSelf: 'right',
  //   alignContent: 'center',
  //   justifyContent: 'center',
  //   borderRadius: 20,
  //   backgroundColor: "#e2f0c9",
  // },
  // friendQuestContainer: {
  //   width: '90%',
  //   height: '20%',
  //   flexDirection: 'row',
  //   verticalAlign: 'middle',
  //   borderRadius: 20,
  //   backgroundColor: "#e2f0c9",
  // },
  // friendQuestText: {
  //   height: "100%",
  //   width: "30%",
  //   marginLeft: '2%',
  //   marginRight: '2%',
  //   marginTop: '8%',
  //   fontSize: 22,
  //   color: COLORS.darkGreen,
  //   fontWeight: '800',
  //   textAlign: 'center',
  //   verticalAlign: 'middle'
  // },
  // barGraphStyle: {
  //   transform: [{rotate: '90 deg'}],
  //   alignSelf: 'flex-start',
  //   marginBottom: "30%",
  //   marginLeft: '15%',
  //   //justifyContent: 'center',
  // },
  // welcomeContainer: {
  //   width: '90%',
  //   height: '30%',
  //   borderRadius: 10,
  //   alignContent: "center",
  //   backgroundColor: "#e2f0c9",
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
            width={150}
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
                    : COLORS.darkGreen
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
//   backgroundGradientTo: COLORS.darkGreen,
//   backgroundGradientToOpacity: 0,
//   color: (opacity = 1) => COLORS.darkGreen,
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
        //   color: COLORS.darkGreen,
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
    //   backgroundColor: "#e2f0c9",
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
    //   backgroundColor: "#e2f0c9",
    //   borderRadius: 100,
    //   verticalAlign: "middle",
    //   left: "10%",
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // },
    // buttonText: {
    //   fontSize: 18,
    //   color: COLORS.darkGreen,
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