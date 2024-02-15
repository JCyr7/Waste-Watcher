import React, {Component} from 'react'
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  Linking,
  Image
} from 'react-native'
import {
  SimpleLineIcons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
  Octicons,
  AntDesign
} from '@expo/vector-icons'
import {COLORS} from '../Utils/colors'
import Popup from '../Popups/Popup'
import SettingsPopup from '../Popups/SettingsPopup'
import NotificationsPopup from '../Popups/NotificationsPopup'
import AddFriendsPopup from '../Popups/AddFriendsPopup'
import StreakPopup from '../Popups/StreakPopup'
import BadgesPopup from '../Popups/BadgesPopup'
import ReferralPopup from '../Popups/ReferralPopup'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class ProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: 'Frank Pug',
      email: 'frankdapug',
      zipCode: '04473',
      settingsModal: false,
      notificationsModal: false,
      addfriendsModal: false,
      streakModal: false,
      badgesModal: false
    }
    this.handleCallBack = this.handleCallBack.bind(this)
  }

  handleCallBack(userName, email, zipCode) {
    this.setState({userName: userName, email: email, zipCode: zipCode})
  }

  // Toggle visibility of modals
  settingsVisibility(value) {
    this.setState({settingsModal: value})
  }

  notificaitonsVisibility(value) {
    this.setState({notificationsModal: value})
  }

  addfriendsVisibility(value) {
    this.setState({addfriendsModal: value})
  }

  streakVisibility(value) {
    this.setState({streakModal: value})
  }

  badgesVisibility(value) {
    this.setState({badgesModal: value})
  }

  referralOnPress() {
    const APPSTORE = 'https://www.apple.com/app-store/'
    const PLAYSTORE = 'https://play.google.com/store/apps'
    Platform.OS === 'android'
      ? Linking.openURL(PLAYSTORE)
      : Linking.openURL(APPSTORE)
  }

  render() {
    const {navigation} = this.props
    return (
      <View style={styles.container}>
        {/* Account Card Container */}
        <View style={styles.accountContainer}>
          <View style={styles.profilePicture}>
            <Image 
              source={require('../../images/profile.png')}
              style={{
                width: 50,
                height: 50,
              }}/>
          </View>
          <Text style={styles.name}>{this.state.userName}</Text>
          <Text style={styles.info}>{this.state.email}</Text>
        </View>
          {/* Back Button Container */}
          {/* <View style={styles.backButtonContainer}>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? COLORS.lightBlue : COLORS.transparent,
                },
                styles.backbutton,
              ]}
              onPress={() => this.badgesVisibility(true)}>
              <Image 
                source={require('../../images/backarrow.png')}
                style={{
                  width: 35,
                  height: 35,
                }}
              />
              <Text style={styles.backbuttontext}>Back</Text>
            </Pressable>
          </View> */}

          {/* Profile Information Container */}



        {/* Account Actions Container */}
        <View style={styles.actionsContainer}>
          {/* Notifications Button*/}
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? COLORS.lightBlue : COLORS.transparent,
              },
              styles.action,
            ]}
            onPress={() => this.notificaitonsVisibility(true)}>
            <View style={styles.actionIcon}>
              <Image 
              source={require('../../images/bell.png')}
              style={{
                width: 35,
                height: 35,
              }}/>
            </View>
            <View style={styles.actionInfoContainer}>
              <Text style={styles.actionName}>Notifications</Text>
              <Text style={styles.actionDescription}>No new messages</Text>
            </View>
          </Pressable>
          {/* Notifications Modal */}
          <Modal
            animationType='fade'
            transparent={true}
            statusBarTranslucent={true}
            visible={this.state.notificationsModal}
            onRequestClose={() => this.notificaitonsVisibility(false)}>
            <Popup>
              <View style={styles.popupHeader}>
                <View style={{width: '10%'}} />
                <Text style={styles.popupHeaderText}>Notifications</Text>
                <Pressable
                  style={styles.closePopupButton}
                  onPress={() => this.notificaitonsVisibility(false)}>
                  <AntDesign name='close' size={24} color='black' />
                </Pressable>
              </View>
              <NotificationsPopup />
            </Popup>
          </Modal>


          {/* add friends Button*/}
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? COLORS.lightBlue : COLORS.transparent,
              },
              styles.action,
            ]}
            onPress={() => this.addfriendsVisibility(true)}>
            <View style={styles.actionIcon}>
              <Image 
              source={require('../../images/friends.png')}
              style={{
                width: 35,
                height: 35,
              }}/>
            </View>
            <View style={styles.actionInfoContainer}>
              <Text style={styles.actionName}>Friends</Text>
              <Text style={styles.actionDescription}>View and invite friends</Text>
            </View>
          </Pressable>
          {/* Notifications Modal */}
          <Modal
            animationType='fade'
            transparent={true}
            statusBarTranslucent={true}
            visible={this.state.addfriendsModal}
            onRequestClose={() => this.addfriendsVisibility(false)}>
            <Popup>
              <View style={styles.popupHeader}>
                <View style={{width: '10%'}} />
                <Text style={styles.popupHeaderText}>Add friends</Text>
                <Pressable
                  style={styles.closePopupButton}
                  onPress={() => this.addfriendsVisibility(false)}>
                  <AntDesign name='close' size={24} color='black' />
                </Pressable>
              </View>
              <AddFriendsPopup />
            </Popup>
          </Modal>


          {/* Streak Button */}
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? COLORS.lightBlue : COLORS.transparent,
              },
              styles.action,
            ]}
            onPress={() => this.streakVisibility(true)}>
            <View style={styles.actionIcon}>
            <Image 
              source={require('../../images/streak.png')}
              style={{
                width: 35,
                height: 35,
              }}/>
            </View>
            <View style={styles.actionInfoContainer}>
              <Text style={styles.actionName}>Streak</Text>
              <Text style={styles.actionDescription}>
                Track daily, earn rewards
              </Text>
            </View>
          </Pressable>
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
                  <AntDesign name='close' size={24} color='black' />
                </Pressable>
              </View>
              <View style={styles.popupContent}>
                <StreakPopup />
              </View>
            </Popup>
          </Modal>


          {/* Badges Button */}
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? COLORS.lightBlue : COLORS.transparent,
              },
              styles.action,
            ]}
            onPress={() => this.badgesVisibility(true)}>
            <View style={styles.actionIcon}>
            <Image 
              source={require('../../images/ribbon.png')}
              style={{
                width: 35,
                height: 35,
              }}/>
            </View>
            <View style={styles.actionInfoContainer}>
              <Text style={styles.actionName}>My Badges</Text>
              <Text style={styles.actionDescription}>
                Earn badges, complete goals
              </Text>
            </View>
          </Pressable>
          {/* Badges Modal */}
          <Modal
            style={styles.modal}
            animationType='fade'
            transparent={true}
            statusBarTranslucent={true}
            visible={this.state.badgesModal}
            onRequestClose={() => this.badgesVisibility(false)}>
            <Popup>
              <View style={styles.popupHeader}>
                <View style={{width: '10%'}} />
                <Text style={styles.popupHeaderText}>Badges</Text>
                <Pressable
                  style={styles.closePopupButton}
                  onPress={() => this.badgesVisibility(false)}>
                  <AntDesign name='close' size={24} color='black' />
                </Pressable>
              </View>
              <View style={styles.popupContent}>
                <BadgesPopup />
              </View>
            </Popup>
          </Modal>


          {/* settings Button */}
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? COLORS.lightBlue : COLORS.transparent,
              },
              styles.action,
            ]}
            onPress={() => this.settingsVisibility(true)}>
            <View style={styles.actionIcon}>
            <Image 
              source={require('../../images/settings.png')}
              style={{
                width: 35,
                height: 35,
              }}/>
            </View>
            <View style={styles.actionInfoContainer}>
              <Text style={styles.actionName}>Settings</Text>
              <Text style={styles.actionDescription}>
                Edit your account info
              </Text>
            </View>
          </Pressable>
          {/* Settings Modal */}
          <Modal
            animationType='fade'
            transparent={true}
            statusBarTranslucent={true}
            visible={this.state.settingsModal}
            onRequestClose={() => this.settingsVisibility(false)}>
            <Popup>
              <View style={styles.popupHeader}>
                <View style={{width: '10%'}} />
                  <Text style={styles.popupHeaderText}>Settings</Text>
                  <Pressable
                    style={styles.closePopupButton}
                    onPress={() => this.settingsVisibility(false)}>
                    <AntDesign name='close' size={24} color='black' />
                  </Pressable>
                </View>
                <SettingsPopup
                  callBack={this.handleCallBack}
                  userName={this.state.userName}
                  email={this.state.email}
                  zipCode={this.state.zipCode}
                />
              </Popup>
            </Modal>


          {/* Referral Button */}
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? COLORS.lightBlue : COLORS.transparent,
              },
              styles.action,
            ]}
            onPress={() => this.referralOnPress()}>
            <View style={styles.actionIcon}>
              <Image 
                source={require('../../images/refer.png')}
                style={{
                  width: 35,
                  height: 35,
                }}/>
            </View>
            <View style={styles.actionInfoContainer}>
              <Text style={styles.actionName}>Refer a Friend</Text>
              <Text style={styles.actionDescription}>
                Connect and track together
              </Text>
            </View>
          </Pressable>

          {/* Log out button */}
          {/* <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? COLORS.lightBlue : COLORS.transparent,
              },
              styles.action,
            ]}
            onPress={() => navigation.navigate('LogoutPage')}>
            <View style={styles.actionIcon}>
              <Image 
                source={require('../../images/logout.png')}
                style={{
                  width: 35,
                  height: 35,
                }}/>
            </View>
            <View style={styles.actionInfoContainer}>
              <Text style={styles.actionName}>Sign out</Text>

            </View>
          </Pressable> */}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  modal: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },


  accountContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    width: '100%',
    height: '20%',
    marginTop: Platform.OS === 'android' ? '5%' : '0%',
    borderRadius: 0,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    shadowColor: COLORS.blue,
    marginBottom: 20,
  },
  profilePicture: {
    marginTop: '2.5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    marginVertical: '1%',
    fontWeight: 'bold',
    fontSize: 20,
  },
  info: {
    fontSize: 16,
    color: COLORS.darkGray,
    marginBottom: '5%'
  },
  


  action: {
    width: '100%',
    height: '13%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.morewhitetransparent
  },
  actionIcon: {
    marginLeft: '7.5%',
    marginRight: '2%'
  },
  infoContainer: {
    justifyContent: 'center'
  },
  actionsContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginTop: '5%',
  },

  actionInfoContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: '3%'
  },
  actionName: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  actionDescription: {
    color: COLORS.darkGray,
    fontSize: 13,
    marginRight: '10%'
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
