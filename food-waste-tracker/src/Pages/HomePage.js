import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Modal,
  TextInput,
  Platform
} from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {COLORS} from '../Utils/colors'
import Popup from '../Popups/Popup'
import TrackWastePopup from '../Popups/TrackWastePopup'
import GoalPopup from '../Popups/GoalPopup'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import ViewWaste from '../StatisticsPageComponents/ViewWaste'
import {DATA} from '../Utils/TestData'
import MeatReduciton from '../WasteReductionTips/MeatReduction'
import FishReduciton from '../WasteReductionTips/FishReduction'
import ProduceReduciton from '../WasteReductionTips/ProduceReduction'
import GrainReduciton from '../WasteReductionTips/GrainReduction'
import DairyReduciton from '../WasteReductionTips/DairyReduction'
import GeneralReduciton from '../WasteReductionTips/GeneralReduction'

export default class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      householdInfoModal: true,
      trackWasteModal: false,
      goalModal: false,
      checkboxValue: false,
      householdName: '',
      zipcode: '',
      householdSize: 0,
      userName: ''
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
        <View style={styles.welcomeContainer}>
          {/* Welcome Header */}
          <Text style={styles.welcomeText}>Welcome {this.state.userName}</Text>
          {/* Buttons */}
          <View style={styles.buttonContainer}>
            {/* Track Waste */}
            <Pressable
              onPress={() => this.openTrackWaste(true)}
              style={styles.trackWasteButton}>
              <Text style={styles.buttonText}>Track Waste</Text>
            </Pressable>

            {/* View Waste History */}
            <ViewWaste data={DATA} />

            {/* Set New Goal */}
            <Pressable
              onPress={() => this.openGoal(true)}
              style={styles.trackWasteButton}>
              <Text style={styles.buttonText}>View Goals</Text>
            </Pressable>
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

        {/* Goal Modal */}
        <Modal
          animationType='fade'
          transparent={true}
          statusBarTranslucent={true}
          visible={this.state.goalModal}
          onRequestClose={() => this.openGoal(false)}>
          <Popup>
            <View style={styles.goalPopupHeader}>
              <View style={{width: '10%'}} />
              <Text style={styles.goalPopupHeaderText}>Goals</Text>
              <Pressable
                style={styles.goalCloseButton}
                onPress={() => this.openGoal(false)}>
                <AntDesign name='close' size={24} color='black' />
              </Pressable>
            </View>
            <View style={styles.goalPopupContent}>
              <GoalPopup />
            </View>
          </Popup>
        </Modal>

        {/* Waste Reduction Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsHeader}>Waste Reduction Tips</Text>
          <View style={styles.linkContainer}>
            <MeatReduciton />
            <ProduceReduciton />
            <GrainReduciton />
            <FishReduciton />
            <DairyReduciton />
            <GeneralReduciton />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
    height: '45%',
    borderRadius: 10,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    shadowOffset: {
      width: -3,
      height: 4
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
    shadowColor: COLORS.shadow
  },
  welcomeText: {
    marginTop: '6%',
    marginBottom: '2%',
    fontSize: 30,
    color: COLORS.darkGreen,
    fontWeight: '700',
    textAlign: 'center'
  },
  buttonContainer: {
    borderWidth: 0,
    width: '95%',
    height: '77%',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  trackWasteButton: {
    width: '95%',
    height: '25%',
    backgroundColor: COLORS.darkGreen,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: '600'
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
    paddingLeft: '3%',
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
  tipsContainer: {
    width: '90%',
    height: '52%',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    shadowOffset: {
      width: -3,
      height: 4
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
    shadowColor: COLORS.shadow
  },
  tipsHeader: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.darkGreen,
    marginTop: '5%'
  },
  linkContainer: {
    width: '85%',
    height: '75%',
    marginBottom: '7%',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  }
})
