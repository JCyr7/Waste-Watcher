import React, {Component} from 'react'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import {
  StyleSheet,
  Text,
  Image,
  Modal,
  View,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  TouchableWithoutFeedback,
  SafeAreaView,
  Alert
} from 'react-native'
import {COLORS} from '../Utils/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export default class LogoutPage extends Component {
  //Parent contstructo
  constructor(props) {
    super(props)
    //Additional states to keep track of account creation information
    this.state = {
      modalVisible: false,
      checkboxValue: false,
      email: '',
      username: '',
      password: '',
      passwordRenter: ''
    }
  }

  // Function to set the create account modal state to true or false
  setModalVisible(visible) {
    this.setState({modalVisible: visible})
  }

  // Function to set checkbox value state to true or false
  toggleCheckbox(value) {
    // console.log(this.state.checkboxValue)
    this.setState({checkboxValue: value})
  }

  // Create account function: Checks all inputs from the user, ensuring that the username is less than 12 characters, the email adheres to a regex,
  // and the password is complex and has enough characters
  // Axios method calls to send data to the backend
  createAccount = async (navigation) => {
    // checks the validity of inputs
    const passwordCheck = this.checkPasswordComplexity()
    const emailCheck = this.checkEmail()
    const usernameCheck = this.checkUsername()
    const privacyCheck = this.privacyCheck()

    // if statement only executes if all user input checks pass
    if (passwordCheck && emailCheck && usernameCheck && privacyCheck) {
      let value

      // axios request - sends email, username and password as post request
      // await axios({
      //   method: 'post',
      //   url: 'https://j5htipxzpi.execute-api.us-east-1.amazonaws.com/UserCredentials',
      //   params: {
      //     email: this.state.email,
      //     username: this.state.username,
      //     password: this.state.password
      //   }
      // }).then(function (response) {
      //   console.log(response.data)
      //   value = response.data
      // })
      // if statement evaluates return value - if SQL query successfully executes on backend, user has been added to db, navigates to the main page
      if (true) {
        this.setModalVisible(false)
        navigation.navigate('MainPage')
      }
    }
    // sets two async storage items - username and bool value for the household information modal
    await AsyncStorage.setItem('newUser', JSON.stringify(true))
    await AsyncStorage.setItem('username', this.state.username)
  }

  // Method checks if the email entered by the user is in the correct format
  checkEmail() {
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
      Alert.alert('Please Enter a Valid Email address')
      return false
    } else {
      return true
    }
  }
  // Method checks if the username is greater than 12 characters and returns true if
  // it isnt
  checkUsername() {
    if (this.state.username.length > 12) {
      Alert.alert('Username cannot be more than 12 characters long')
      return false
    } else {
      return true
    }
  }
  // Method checks password length, complexity and if the two passwords entered match
  // Get rid of alerts and switch to text under the box to alert user of requirements
  checkPasswordComplexity() {
    // if logic checks password complexity and length
    if (this.state.password === '') {
      Alert.alert('Password cannot be empty', 'Please enter a valid password')
      return false
    } else if (this.state.password.length < 8) {
      Alert.alert('Password must be at least 8 characters')
      return false
    } else if (
      !(
        this.state.password.includes('!') ||
        this.state.password.includes('@') ||
        this.state.password.includes('#') ||
        this.state.password.includes('$') ||
        this.state.password.includes('%')
      )
    ) {
      Alert.alert(
        'Password must contain one of the following characters',
        '!, @, #, $'
      )
    } else if (!this.state.password.match(/[A-Z]/)) {
      Alert.alert('Password must contain at least 1 uppercase letter')
      return false
    } else if (!this.state.password.match(/[a-z]/)) {
      Alert.alert('Password must contain at least 1 lowercase letter')
      return false
    } else if (!this.state.password.match(/[0-9]/)) {
      Alert.alert('Password must contain at least one digit')
      return false
    } else if (this.state.password !== this.state.passwordRenter) {
      Alert.alert(
        'Passwords do not match',
        'Please re-enter password and try again'
      )
      return false
    } else {
      return true
    }
  }

  // Method returns true if the user has clicked the privacy policy checkbox
  privacyCheck() {
    if (this.state.checkboxValue === false) {
      Alert.alert('Please agree the privacy policy')
      return false
    } else {
      return true
    }
  }

  render() {
    // Declare constant navigation as props from parent component - enables navigation between stack pages
    const {navigation} = this.props
    return (
      // Container view
      <SafeAreaView style={styles.container}>
        <Image
          source={require('../../images/FoodRescueMaine_Logo_Final-01.png')}
        />
        <Text style={styles.title}>Waste Watcher</Text>
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed ? COLORS.lightGreen : COLORS.darkGreen
            },
            styles.createAccountButton
          ]}
          onPress={() => {
            this.setModalVisible(true)
          }}>
          <Text style={styles.createAccountText}>
            I AM NEW TO WASTE WATCHER
          </Text>
        </Pressable>
        <Text style={styles.signin}>Already have an account?</Text>

        {/* Pressable component for navigating to the login page if user already has an account */}
        <Pressable
          onPress={() => navigation.navigate('LoginPage')}
          style={styles.signinContainer}>
          <Text style={styles.link}>Sign-In</Text>
        </Pressable>

        {/* Create account modal */}
        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false)
            this.toggleCheckbox(false)
          }}>
          {/* Pressable component so that when the user taps outside the modal, it closes */}
          <Pressable
            onPress={() => {
              this.setModalVisible(false)
              this.toggleCheckbox(false)
            }}
            style={styles.pressable}>
            {/* Modal content enclosed with touchable without feedback component so it does *not* close if a user taps inside the modal content area */}
            <TouchableWithoutFeedback>
              <KeyboardAvoidingView behavior='padding' style={styles.modal}>
                <Text style={styles.createAccount}>Create an Account</Text>
                <View>
                  {/* Text input for email */}
                  <Text style={styles.inputTitle}>Email</Text>
                  <TextInput
                    defaultValue={this.state.email}
                    onChangeText={(emailInput) =>
                      this.setState({email: emailInput})
                    }
                    cursorColor={'black'}
                    style={styles.input}></TextInput>
                </View>
                <View>
                  {/* Text input for username */}
                  <Text style={styles.inputTitle}>Username</Text>
                  <TextInput
                    defaultValue={this.state.username}
                    onChangeText={(usernameInput) =>
                      this.setState({username: usernameInput})
                    }
                    cursorColor={'black'}
                    style={styles.input}></TextInput>
                </View>
                <View>
                  {/* Text input for password */}
                  <Text style={styles.inputTitle}>Password</Text>
                  <TextInput
                    onChangeText={(newText) =>
                      this.setState({password: newText})
                    }
                    cursorColor={'black'}
                    secureTextEntry
                    style={styles.input}></TextInput>
                </View>
                <View>
                  {/* Text input for password re-enter */}
                  <Text style={styles.inputTitle}>Re-Enter Password</Text>
                  <TextInput
                    onChangeText={(newText) =>
                      this.setState({passwordRenter: newText})
                    }
                    cursorColor={'black'}
                    secureTextEntry
                    style={styles.input}></TextInput>
                </View>
                {/* Password requirements */}
                <View style={styles.passReqsContainer}>
                  <Text style={styles.passReqLabel}>
                    Password must contain the following:
                  </Text>
                  <Text style={styles.passReq}>8 or more characters</Text>
                  <Text style={styles.passReq}>1 or more numbers</Text>
                  <Text style={styles.passReq}>
                    1 or more uppercase letters
                  </Text>
                  <Text style={styles.passReq}>
                    1 or more lowercase letters
                  </Text>
                  <Text style={styles.passReq}>
                    1 or more special characters (!@#$)
                  </Text>
                </View>
                {/* Checkbox for ensuring user is over 18 */}
                <BouncyCheckbox
                  size={22}
                  style={styles.checkBox}
                  fillColor={COLORS.lightGreen}
                  unfillColor='white'
                  text="I'm at least 18 years old and agree to the Privacy Policy"
                  innerIconStyle={{borderWidth: 2}}
                  onPress={() => this.toggleCheckbox(!this.state.checkboxValue)}
                  textStyle={styles.tosText}
                />

                <Pressable
                  // Create account button - executes create account function defined above on press
                  onPress={() => this.createAccount(navigation)}
                  style={({pressed}) => [
                    {
                      backgroundColor: pressed
                        ? COLORS.lightGreen
                        : COLORS.darkGreen
                    },
                    styles.submitButton
                  ]}>
                  <Text style={styles.submitButtonText}>Join</Text>
                </Pressable>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </Pressable>
        </Modal>
      </SafeAreaView>
    )
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGreen,
    alignItems: 'center',
    paddingTop: '50%'
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    paddingTop: '5%',
    color: COLORS.darkerGray
  },
  signin: {
    marginTop: '5%',
    fontSize: 18
  },
  link: {
    textDecorationLine: 'underline',
    color: 'blue',
    fontSize: 18
  },
  modal: {
    height: '80%',
    marginTop: 'auto',
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  },
  createAccount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'grey',
    alignSelf: 'center'
  },
  createAccountButton: {
    width: '70%',
    height: '8%',
    borderRadius: 10,
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  createAccountText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16
  },
  input: {
    borderRadius: 10,
    borderWidth: 3,
    paddingTop: '1%',
    padding: '1%',
    paddingLeft: '3%',
    width: '95%',
    alignSelf: 'center',
    borderColor: 'grey'
  },
  inputTitle: {
    paddingLeft: '3%',
    paddingTop: '1%',
    paddingBottom: '1%',
    fontWeight: 'bold',
    color: 'grey'
  },
  submitButton: {
    padding: '1%',
    borderRadius: 5,
    height: '5%',
    width: '20%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  signinContainer: {
    height: '7%',
    width: '20%',
    alignItems: 'center'
  },
  submitButtonText: {
    color: 'white'
  },
  pressable: {
    height: '100%',
    width: '100%'
  },
  tosText: {
    textDecorationLine: 'none',
    fontSize: 13,
    fontWeight: 'bold'
  },
  checkBox: {
    marginLeft: '3%',
    marginBottom: '10%'
  },
  passReqsContainer: {
    // borderWidth: 1,
    margin: '3%'
  },
  passReqLabel: {
    color: COLORS.darkGray,
    fontSize: 15,
    fontWeight: 'bold'
  },
  passReq: {
    marginLeft: '3%',
    color: COLORS.darkGray,
    fontSize: 13,
    fontWeight: 'bold'
  }
})
