import React, {Component} from 'react'
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  Linking
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
import StreakPopup from '../Popups/StreakPopup'
import BadgesPopup from '../Popups/BadgesPopup'
import ReferralPopup from '../Popups/ReferralPopup'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class ProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: 'John Doe',
      email: 'jdoe99@email.com',
      zipCode: '04473',
      settingsModal: false,
      notificationsModal: false,
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
    return (
      <View style={styles.container}>
        {/* Account Card Container */}
        <View style={styles.accountContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerGap} />
            <Text style={styles.headerText}>My Profile</Text>

            {/* Settings Button */}
            <Pressable
              style={styles.headerButton}
              onPress={() => this.settingsVisibility(true)}>
              <SimpleLineIcons name='settings' size={30} color='black' />
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
          </View>

          {/* Account Card Profile Container */}
          <View style={styles.profileContainer}>
            <View style={styles.profilePicture}>
              <MaterialCommunityIcons
                name='account-box'
                size={175}
                color='black'
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{this.state.userName}</Text>
              <Text style={styles.info}>{this.state.email}</Text>
              <Text style={styles.info}>{this.state.zipCode}</Text>
            </View>
          </View>
        </View>

        {/* Account Actions Container */}
        <View style={styles.actionsContainer}>
          {/* Notifications Button*/}
          <Pressable
            style={styles.action}
            onPress={() => this.notificaitonsVisibility(true)}>
            <View style={styles.actionIcon}>
              <MaterialCommunityIcons
                name='bell-badge-outline'
                size={50}
                color='black'
              />
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

          {/* Streak Button */}
          <Pressable
            style={styles.action}
            onPress={() => this.streakVisibility(true)}>
            <View style={styles.actionIcon}>
              <MaterialIcons
                name='local-fire-department'
                size={50}
                color='black'
              />
            </View>
            <View style={styles.actionInfoContainer}>
              <Text style={styles.actionName}>Streak</Text>
              <Text style={styles.actionDescription}>
                Track waste daily to keep the streak alive
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
            style={styles.action}
            onPress={() => this.badgesVisibility(true)}>
            <View style={styles.actionIcon}>
              <Octicons
                name='file-badge'
                size={47}
                color='black'
                style={{marginHorizontal: 3}}
              />
            </View>
            <View style={styles.actionInfoContainer}>
              <Text style={styles.actionName}>My Badges</Text>
              <Text style={styles.actionDescription}>
                Earn badges by completing tasks
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

          {/* Referral Button */}
          <Pressable
            style={styles.action}
            onPress={() => this.referralOnPress()}>
            <View style={styles.actionIcon}>
              <FontAwesome
                name='mail-forward'
                size={40}
                color='black'
                style={{marginHorizontal: 5}}
              />
            </View>
            <View style={styles.actionInfoContainer}>
              <Text style={styles.actionName}>Refer a Friend</Text>
              <Text style={styles.actionDescription}>
                Invite friends to track their own waste
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  accountContainer: {
    backgroundColor: COLORS.white,
    width: '90%',
    height: '40%',
    marginTop: Platform.OS === 'android' ? '10%' : '2%',
    borderRadius: 10,
    shadowOffset: {
      width: -3,
      height: 4
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
    shadowColor: COLORS.shadow
  },
  headerContainer: {
    height: '23%',
    marginTop: '7%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: '5%'
  },
  headerGap: {
    flex: 2
  },
  headerText: {
    flex: 3,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '800'
  },
  headerButton: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  profilePicture: {
    width: '50%',
    marginLeft: '3%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoContainer: {
    justifyContent: 'center'
  },
  name: {
    fontWeight: '700',
    fontSize: 20
  },
  info: {
    fontSize: 16,
    color: COLORS.darkGray
  },
  actionsContainer: {
    flex: 1,
    width: '90%',
    marginVertical: '2.6%',
    justifyContent: 'space-around'
  },
  action: {
    width: '100%',
    height: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10
  },
  actionIcon: {
    marginLeft: '6%',
    marginRight: '1%'
  },
  actionInfoContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: '3%'
  },
  actionName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: '1%'
  },
  actionDescription: {
    color: COLORS.darkGray,
    marginRight: '10%'
  }
})
