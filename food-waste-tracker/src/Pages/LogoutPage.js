import React, {Component} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
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
import axios from 'axios'
import Ionicons from '@expo/vector-icons/Ionicons'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";

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
      passwordRenter: '',
      userAuth: false
    }
  }
  //start of login stuff
  //Login function: calls api for
  login = async (navigation) => {
    try {

        // Firebase email and pass authentication
        await signInWithEmailAndPassword(FIREBASE_AUTH, this.state.username, this.state.password).then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          this.setState({userAuth: true})
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });

      await AsyncStorage.setItem('username', this.state.username)
      const value = await AsyncStorage.getItem('username')
      this.setState({token: value})

    } catch (err) {
      console.log(err)
    } finally {
      // const userAuthReturn = await this.userAuth()
      
      if (this.state.userAuth === true) {
        navigation.navigate('MainPage')
      } else {
        Alert.alert(
          'Login failed, please enter the correct username and password.'
        )
      }
      
    }
  }

  // Method sends requests to lambda to verify user
  userAuth = async () => {
    let value
    await axios({
      method: 'get',
      url: 'https://j5htipxzpi.execute-api.us-east-1.amazonaws.com/UserCredentials',
      params: {
        username: this.state.username,
        password: this.state.password
      }
    }).then(function (response) {
      // console.log(response.data)
      value = response.data
    })
    return true
  }

  //end of login stuff

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
      <LinearGradient colors={[COLORS.white, COLORS.darkGreen]} style={styles.container}>
        <SafeAreaView style={styles.container}>
          <Image
            source={require('../../images/FoodRescueMaine_Logo_Final-01.png')}
            style={styles.image}
          />
          {/* title */}
          <Text style={styles.title}>Waste Watcher</Text>
          <Text style={styles.subtitle}>A Food Waste Tracking App</Text>


            {/* username and password input*/}
            <TextInput
              cursorColor={'black'}
              placeholder='Username'
              style={styles.userpassinput}
              onChangeText={(value) => {
                this.setState({ username: value });
              }}
            ></TextInput>
            <TextInput
              secureTextEntry
              cursorColor={'black'}
              placeholder='Password'
              style={styles.userpassinput}
              onChangeText={(value) => {
                this.setState({ password: value });
              }}
            ></TextInput>


            {/* login button */}
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed
                    ? COLORS.lightGreen
                    : COLORS.transparent
                },
                styles.loginButton
              ]}
              onPress={() => this.login(navigation)}>
              <Text style={styles.loginText}>Log In</Text>
            </Pressable>


            {/* forgot password button */}
            <Pressable
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.forgotPasswordContainer}>
              <Text style={styles.createAccountText}>
              Forgot your login details? <Text style={styles.boldtext}>Get help signing in.</Text>
            </Text>
            </Pressable>


            {/* alt logins */}
            <View style={styles.row}>
              <Pressable style={styles.altloginButton}>
                <MaterialCommunityIcons
                  name='facebook'
                  size={30}
                  color='blue'
                />
              </Pressable>
              <Pressable style={styles.altloginButton}>
                <Ionicons name='logo-google' size={29} color='black' />
              </Pressable>
            </View>


          {/* sign up button */}  
          <Pressable
            style={({pressed}) => [
              {
                backgroundColor: pressed ? COLORS.lightGreen : COLORS.transparent
              },
              styles.createAccountButton
            ]}
            onPress={() => {
              this.setModalVisible(true)
            }}>
            <Text style={styles.createAccountText}>
              Dont have an account? <Text style={styles.boldtext}>Sign up</Text>
            </Text>
          </Pressable>






          {/* Create account popup */}
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
      </LinearGradient>
    )
  }
}

// Styles
const styles = StyleSheet.create({

  //container
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 0,
    paddingHorizontal: 0,
    margin: 0,
    width: '100%',
  },

  //headings
  image: {
    flex: .26, // Set flex to 0.4 to make it take 40% of the screen
    marginTop: 20,
    width: '100%', // Use 100% width to ensure it doesn't exceed the screen width
    marginBottom: 40,
    aspectRatio: 694 / 238, // Set the aspect ratio based on your image dimensions
  },
  title: {
    fontSize: 32,
    paddingTop: 0,
    marginBottom: 0,
    color: COLORS.darkGreen,
    fontWeight: 'bold'
  },
  subtitle:{
    fontSize: 24,
    color: COLORS.darkGreen,
    marginBottom: 20,
  },

  //log in
  userpassinput: {
    height: 50,
    width: '85%',
    borderRadius: 7,
    backgroundColor: COLORS.whitetransparent,
    margin: 8
  },
  loginButton: {
    height: 50,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderColor: COLORS.whitetransparent,
    borderWidth: 3,
    borderRadius: 7,
    margin: 8
  },
  loginText: {
    color: 'white'
  },

  //forgot password
  forgotPasswordContainer: {
    backgroundColor: COLORS.transparent,
  },
  createAccountText: {
    color: 'white',
  },
  boldtext:{
    fontWeight: 'bold',
  },

  pressable: {
    height: '100%',
    width: '100%'
  },

  row: {
    flexDirection: 'row',
    margin: 10
  },
  
  altloginButton: {
    width: 50,
    borderRadius: 5,
    alignItems: 'center'
  },

  // create account modal popup
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
    alignItems: 'center',
    justifyContent: 'center'
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
