import React, {Component} from 'react'
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
import {AntDesign} from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {COLORS} from '../Utils/colors'
import Popup from '../Popups/Popup'
import TrackWastePopup from '../Popups/TrackWastePopup'
import GoalPopup from '../Popups/GoalPopup'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import ViewWaste from '../StatisticsPageComponents/ViewWaste'
import {DATA} from '../Utils/TestData'
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
barChartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: COLORS.darkGreen,
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => COLORS.darkGreen,
  strokeWidth: 1, // optional, default 3
  barPercentage: 1,
  decimalPlaces: 0,
}


screenWidth = Dimensions.get('window').width;

data = {data: [0.4]}
data2 = {data: [0.7]}
data3 = {
  labels: ["You", "Friend"],
  datasets: [
    {
      data: [25, 15]
    }
  ]
}

export default class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      householdInfoModal: true,
      trackWasteModal: false,
      checkboxValue: false,
      householdName: '',
      zipcode: '',
      householdSize: 0,
      userName: '',
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
    console.log(this.state.householdInfoModal)
  }

  // Sets the state for the household info modal
  openHouseHoldInfo = async (value) => {
    await AsyncStorage.setItem('newUser', 'false')
    this.setState({householdInfoModal: value})
  }

  // Sets state for trackWaste popup
  openTrackWaste(value) {
    this.setState({trackWasteModal: value})
  }

  openGoal(value) {
    this.setState({goalModal: value})
  }

  // Sets state of checkbox
  toggleCheckbox(value) {
    // console.log(this.state.checkboxValue)
    this.setState({checkboxValue: value})
  }

  // Method to send household info to backend
  submitHouseholdInfo() {
    console.log(this.state.householdName)
    console.log(this.state.zipcode)
    console.log(this.state.householdSize)
    this.setState({householdInfoModal: false})
  }

  render() {
    return (
          
        <View style={styles.container}>
        {/* Welcome Header */}
        <Text style={styles.welcomeText}>Waste Watcher</Text>
            {/* Progress Dials */}
            <View style={styles.dialContainer}>
            <View style={styles.weeklyWasteDial}>
                <ProgressChart
                data={data}
                width={125}
                height={125}
                strokeWidth={24}
                radius={45}
                chartConfig={dialChartConfig}
                hideLegend={true}
                />
                <Text style={styles.weeklyWasteDialText}>Weekly</Text>
                <Text style={styles.weeklyWasteDialText}>Waste</Text>
            </View>
            <View style={styles.moneyWastedDial}>
                <ProgressChart 
                data={data2}
                width={125}
                height={125}
                strokeWidth={24}
                radius={45}
                chartConfig={dialChartConfig}
                hideLegend={true}
                />
                <Text style={styles.moneyWastedDialText}>Money</Text>
                <Text style={styles.moneyWastedDialText}>Wasted</Text>
            </View>
            </View>

        <View style={styles.friendQuestContainer}>
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
        </View>
        

        {/* Household info Modal */}
        <Modal
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
        <Modal
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
        </Modal>
        <View style={styles.tipsContainer}>
          <Text style={styles.trackWasteHeader}>Track Waste</Text>        
          <View style={styles.linkContainer}>
            <View style={styles.trackWasteContainer}>
              <TextInput
                cursorColor={'black'}
                keyboardType='numeric'
                returnKeyType='done'
                style={styles.trackWasteInput}
                onChangeText={(value) =>
                this.setState({zipcode: value})}>
                <Text style={styles.trackWasteInputText}>Date</Text>        
              </TextInput>
              <TextInput
                cursorColor={'black'}
                keyboardType='numeric'
                style={styles.trackWasteInput}
                onChangeText={(value) =>
                this.setState({zipcode: value})}>
                <Text style={styles.trackWasteInputText}>Type</Text>
              </TextInput>
              <TextInput
                cursorColor={'black'}
                keyboardType='numeric'
                style={styles.trackWasteInput}
                onChangeText={(value) =>
                this.setState({zipcode: value})}>
                <Text style={styles.trackWasteInputText}>Amount</Text>        
              </TextInput>
              
            </View>
            <SubmitButton/>
          </View>
        </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
    graphStyle: {
    },
    goalPopupHeader: {
      flexDirection: 'row',
      height: '10%',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    goalPopupHeaderText: {
      fontSize: 24,
      fontWeight: '800'
    },
    goalCloseButton: {
      marginTop: '2%',
      paddingRight: '0%',
      alignItems: 'flex-end',
      width: '10%'
    },
    goalPopupContent: {
      width: '100%',
      height: '90%'
    },
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: Platform.OS === 'android' ? '10%' : '2%',
      marginBottom: '5%'
    },
    welcomeContainer: {
      width: '90%',
      height: '30%',
      borderRadius: 10,
      alignContent: "center",
      backgroundColor: "#e2f0c9",
      shadowOffset: {
        width: -3,
        height: 4
      },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 10,
      shadowColor: COLORS.shadow
    },
    barGraphContainer: {
      width: '66%',
      height: '100%',
      alignSelf: 'right',
      alignContent: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      backgroundColor: "#e2f0c9",
    },
    friendQuestContainer: {
      width: '90%',
      height: '20%',
      flexDirection: 'row',
      verticalAlign: 'middle',
      borderRadius: 20,
      backgroundColor: "#e2f0c9",
    },
    friendQuestText: {
      height: "100%",
      width: "30%",
      marginLeft: '2%',
      marginRight: '2%',
      marginTop: '8%',
      fontSize: 22,
      color: COLORS.darkGreen,
      fontWeight: '800',
      textAlign: 'center',
      verticalAlign: 'middle'
    },
    barGraphStyle: {
      transform: [{rotate: '90 deg'}],
      alignSelf: 'flex-start',
      marginBottom: "30%",
      marginLeft: '15%',
      //justifyContent: 'center',
    },
    welcomeText: {
      marginTop: '6%',
      fontSize: 28,
      color: COLORS.darkGreen,
      fontWeight: '800',
      textAlign: 'center'
    },
    dialContainer: {
      width: '90%',
      height: '25%',
      marginTop: '3%',
      marginBottom: '3%',
      alignSelf: 'center',
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
      fontSize: 15,
      color: COLORS.darkGreen,
      fontWeight: '800',
      textAlign: 'center',
    },
    moneyWastedDial: {
      width: '100',
      height: '100',
      marginLeft: '5%',
      marginRight: '5%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    moneyWastedDialText: {
      fontSize: 15,
      color: COLORS.darkGreen,
      fontWeight: '800',
      textAlign: 'center',
    },
    buttonContainer: {
      borderWidth: 0,
      width: '95%',
      height: '77%',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    },
    weeklyWasteProgressButton: {
      width: '25%',
      height: '25%',
      backgroundColor: "#e2f0c9",
      borderRadius: 100,
      verticalAlign: "middle",
      top: "25%",
      left: "65%",
      justifyContent: 'center',
      alignItems: 'center',
    },
    moneyWastedProgressButton: {
      width: '25%',
      height: '25%',
      backgroundColor: "#e2f0c9",
      borderRadius: 100,
      verticalAlign: "middle",
      left: "10%",
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 18,
      color: COLORS.darkGreen,
      fontWeight: '800'
    },
    householdInfoHeader: {
      marginTop: '5%',
      color: COLORS.darkerGray,
      fontSize: 22,
      fontWeight: '500',
      alignSelf: 'center',
      marginBottom: '5%'
    },
    householdInfoInput: {
      borderRadius: 10,
      borderWidth: 3,
      paddingTop: '1%',
      padding: '1%',
      width: '95%',
      alignSelf: 'center',
      borderColor: 'grey'
    },
    householdInfoInputTitle: {
      paddingLeft: '3%',
      paddingTop: '1%',
      paddingBottom: '1%',
      fontWeight: 'bold',
      color: 'grey'
    },
    householdInfoPrivacyMessage: {
      paddingLeft: '3%',
      paddingTop: '1%',
      paddingBottom: '1%',
      fontWeight: 'bold',
      color: 'grey'
    },
    householdInfoSubmitButton: {
      width: 90,
      height: 40,
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 10,
      justifyContent: 'center',
      marginTop: '50%'
    },
    checkBox: {
      marginLeft: '3%'
    },
    closePopupButton: {
      padding: '2%',
      alignSelf: 'flex-end',
      alignItems: 'flex-end'
    },
    trackWasteInputText: {
      fontSize: 18,
      color: COLORS.darkGreen,
      fontWeight: '800',
      marginLeft: "15%",
    },
    trackWasteInput: {
      borderRadius: 10,
      borderWidth: 3,
      padding: '2%',
      width: '75%',
      marginTop: "2%",
      marginBottom: "5%",
      alignSelf: 'center',
      borderColor: COLORS.darkGreen,
      backgroundColor: "#e2f0c9"
    },
    tipsContainer: {
      width: '90%',
      height: '50%',
      borderRadius: 10,
      backgroundColor: COLORS.white,
    },
    trackWasteHeader: {
      fontSize: 24,
      fontWeight: '800',
      color: COLORS.darkGreen,
      marginTop: '2%',
      marginBottom: "2%",
      textAlign: 'center'
    },
    trackWasteContainer: {
      width: '100%',
      height: '60%',
      justifyContent: 'center',
      backgroundColor: COLORS.white
    },
    linkContainer: {
      width: '100%',
      height: '100%',
    }
  })
  