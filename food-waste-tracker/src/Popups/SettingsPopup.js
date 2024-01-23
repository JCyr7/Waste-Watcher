import {React, Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import {COLORS} from '../Utils/colors'
import Divider from '../Utils/Divider'
import {AntDesign} from '@expo/vector-icons'

export default class SettingsPopup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: this.props.userName,
      email: this.props.email,
      zipCode: this.props.zipCode
    }
    this.handlePress = this.handlePress.bind(this)
  }

  // Callback function passes state values to parent component
  handlePress() {
    Alert.alert('Changes Saved')
    this.props.callBack(
      this.state.username,
      this.state.email,
      this.state.zipCode
    )
  }

  // Functions called when respective button is pressed
  usernameSubmit(value) {
    this.setState({username: value})
  }

  emailSubmit(value) {
    if (this.checkEmail(value)) this.setState({email: value})
  }

  checkEmail(value) {
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      Alert.alert('Please Enter a Valid Email address')
      return false
    }
    return true
  }

  zipCodeSubmit(value) {
    if (this.checkZipCode) this.setState({zipCode: value})
  }

  checkZipCode(value) {
    if (!/^\d{5}$/.test(value)) {
      Alert.alert('Zip code is invalid', 'Please enter a 5 digit zip code')
      return false
    }
    return true
  }

  changePasswordOnPress() {
    console.warn('Change Password')
  }

  signOutOnPress() {
    console.warn('Sign Out')
  }

  // saveOnPress() {
  //   // Apply changes
  //   Alert.alert('Changes Saved')
  //   this.handlePress()
  // }

  deleteOnPress() {
    Alert.alert(
      'WARNING',
      'You are about to delete your account. This action cannot be undone!',
      [{text: 'Delete'}, {text: 'Cancel'}]
    )
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.actionContainer}>
            <Divider />

            {/* Username */}
            <View style={styles.actionItem}>
              <Text style={styles.text}>Username</Text>
              <TextInput
                style={styles.input}
                defaultValue={this.state.username}
                onChangeText={(value) => this.setState({username: value})}
              />
            </View>
            <Divider />

            {/* Email Address */}
            <View style={styles.actionItem}>
              <Text style={styles.text}>Email address</Text>
              <TextInput
                style={styles.input}
                keyboardType={'email-address'}
                defaultValue={this.state.email}
                onChangeText={(value) => this.setState({email: value})}
                onSubmitEditing={() => this.emailSubmit(this.state.email)}
              />
            </View>
            <Divider />

            {/* Zip Code */}
            <View style={styles.actionItem}>
              <Text style={styles.text}>Zip Code</Text>
              <TextInput
                style={styles.input}
                keyboardType={'numeric'}
                defaultValue={this.state.zipCode}
                onChangeText={(value) => this.setState({zipCode: value})}
                onSubmitEditing={() => this.zipCodeSubmit(this.state.zipCode)}
              />
            </View>
            <Divider />

            {/* Change Password */}
            <Pressable
              style={styles.actionItem}
              onPress={this.changePasswordOnPress}>
              <Text style={styles.text}>Change password</Text>
              <AntDesign name='right' size={15} color='black' />
            </Pressable>
            <Divider />

            {/* Sign Out */}
            <Pressable style={styles.actionItem} onPress={this.signOutOnPress}>
              <Text style={styles.text}>Sign Out</Text>
              <AntDesign name='right' size={15} color='black' />
            </Pressable>
            <Divider />

            {/* Save Button */}
            <Pressable style={styles.saveButton} onPress={this.handlePress}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </Pressable>
          </View>

          {/* Delete Account Button */}
          <Pressable style={styles.deleteButton} onPress={this.deleteOnPress}>
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '87%',
    marginLeft: '5%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  actionContainer: {
    width: '100%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionItem: {
    width: '100%',
    flex: 1,
    paddingHorizontal: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  saveButton: {
    marginTop: '5%',
    width: '90%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.darkGreen
  },
  saveButtonText: {
    fontWeight: '500',
    fontSize: 15,
    color: COLORS.white,
    textAlign: 'center'
  },
  deleteButton: {
    width: '40%',
    height: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.lightGray
  },
  deleteButtonText: {
    fontWeight: '500',
    fontSize: 15,
    color: COLORS.red,
    textAlign: 'center'
  },
  input: {
    width: '100%',
    flex: 1,
    textAlign: 'right',
    color: COLORS.black,
    fontSize: 16
  },
  text: {
    fontSize: 16
  }
})
