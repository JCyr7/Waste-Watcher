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
                tintColor: COLORS.profileicon
              }}/>
          </View>
          <Text style={styles.name}>{this.state.userName}</Text>
          <Text style={styles.info}>{this.state.email}</Text>
        </View>

        {/* Account Actions Container */}
        <View style={styles.actionsContainer}>
          {/* Add Friends Button*/}
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? COLORS.settingpress : COLORS.transparent,
              },
              styles.action,
            ]}
            onPress={() => this.addfriendsVisibility(true)}>
            <View style={styles.actionIcon}>
              <Image 
              source={require('../../images/friends.png')}
              style={{
                width: 33,
                height: 33,
                tintColor: COLORS.profileicon
              }}/>
            </View>
            <View style={styles.actionInfoContainer}>
              <Text style={styles.actionName}>Friends</Text>
              <Text style={styles.actionDescription}>View and invite friends</Text>
            </View>
          </Pressable>
          {/* Add Friends Modal */}
          <Modal
            animationType='fade'
            transparent={false}
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

          {/* Dark Mode Button */}
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? COLORS.settingpress : COLORS.transparent,
              },
              styles.action,
            ]}
            onPress={() => this.referralOnPress()}>
            <View style={styles.actionIcon}>
              <Image 
                source={require('../../images/dark.png')}
                style={{
                  width: 33,
                  height: 33,
                  tintColor: COLORS.profileicon
                }}/>
            </View>
            <View style={styles.actionInfoContainer}>
              <Text style={styles.actionName}>Dark Mode</Text>
              <Text style={styles.actionDescription}>
                Change app appearance
              </Text>
            </View>
          </Pressable>

          {/* change password Button */}
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? COLORS.settingpress : COLORS.transparent,
              },
              styles.action,
            ]}
            onPress={() => this.referralOnPress()}>
            <View style={styles.actionIcon}>
              <Image 
                source={require('../../images/edit.png')}
                style={{
                  width: 33,
                  height: 33,
                  tintColor: COLORS.profileicon
                }}/>
            </View>
            <View style={styles.actionInfoContainer}>
              <Text style={styles.actionName}>Change Password</Text>
              <Text style={styles.actionDescription}>
                Reset your password
              </Text>
            </View>
          </Pressable>
          {/* Referral Button */}
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? COLORS.settingpress : COLORS.transparent,
              },
              styles.action,
            ]}
            onPress={() => this.referralOnPress()}>
            <View style={styles.actionIcon}>
              <Image 
                source={require('../../images/refer.png')}
                style={{
                  width: 33,
                  height: 33,
                  tintColor: COLORS.profileicon
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
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? COLORS.settingpress : COLORS.transparent,
              },
              styles.action,
            ]}
            onPress={() => navigation.navigate('LogoutPage')}>
            <View style={styles.actionIcon}>
              <Image 
                source={require('../../images/logout.png')}
                style={{
                  width: 33,
                  height: 33,
                  tintColor: COLORS.profileicon
                }}/>
            </View>
            <View style={styles.actionInfoContainer}>
              <Text style={styles.actionName}>Sign out</Text>

            </View>
          </Pressable>
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
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  accountContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
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
    shadowColor: COLORS.element,
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
    color: COLORS.setting,
  },
  info: {
    fontSize: 16,
    color: COLORS.settingsub,
    marginBottom: '5%'
  },
  action: {
    width: '100%',
    height: '15%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.card
  },
  actionIcon: {
    marginLeft: '10%',
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
    color: COLORS.setting
  },
  actionDescription: {
    color: COLORS.settingsub,
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
  },
})
