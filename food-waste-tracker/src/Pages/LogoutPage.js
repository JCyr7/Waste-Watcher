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
  Alert,
  Keyboard
} from 'react-native'
import {COLORS} from '../Utils/colors'
import axios from 'axios'
import Ionicons from '@expo/vector-icons/Ionicons'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default class LogoutPage extends Component {
  //Parent contstructo
  constructor(props) {
    super(props)
    //Additional states to keep track of account creation information
    this.state = {
      modalVisible: false,
      checkboxValue: false,
      checkboxprivacy: false,
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      newusername: '',
      password: '',
      passwordRenter: '',
      userAuth: false
    }
  }

  //start of login stuff
  //Login function: calls api for
  login = async (navigation) => {
    let userAuthReturn = false;
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, this.state.username, this.state.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        this.setState({userAuth: true});
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });

      const value = await AsyncStorage.getItem('username')
      this.setState({token: value})
    } catch (err) {
      console.log(err)
    } finally {
      
      if (this.state.userAuth === true) {
        navigation.navigate('MainPage')
      } else {
        Alert.alert(
          'Incorrect username or password'
        )
      }
    }
  }

  //end of login stuff

  // Function to set the create account modal state to true or false
  setModalVisible(visible) {
    this.setState({modalVisible: visible})
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

      if (true) {
        this.setModalVisible(false)
        navigation.navigate('MainPage')
      }
    }
    // sets two async storage items - username and bool value for the household information modal
    await AsyncStorage.setItem('newUser', JSON.stringify(true))
    await AsyncStorage.setItem('newusername', this.state.newusername)
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
    if (this.state.newusername.length > 12) {
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

  // Function to set checkbox value state to true or false
  toggleCheckbox(value) {
    this.setState({checkboxValue: value})
  }

  // Method returns true if the user has clicked age chekcbox

  
  // Method returns true if the user has clicked the privacy policy checkbox
  privacyCheck() {
    if (this.state.checkboxprivacy === false) {
      Alert.alert('Please agree the Terms of Service & Privacy Policy')
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
      <LinearGradient 
        colors={[COLORS.blue, COLORS.green]} style={styles.container}
        start={{x: 0, y: 0.2}}
        end={{x: 1, y: 1}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          
            <Image source={require('../../images/FoodRescueMaine_Logo_Final-01.png')} style={styles.image}/>
            {/* title */}
            <Text style={styles.title}>Waste Watcher</Text>
            <Text style={styles.subtitle}>Food Waste Tracker</Text>


              {/* username and password input*/}
              <TextInput
                cursorColor={'white'}
                selectionColor={'white'}
                placeholder='Username'
                placeholderTextColor={COLORS.white} // Set the color of the placeholder text
                style={[styles.userpassinput, { color: COLORS.white }]}             
                onChangeText={(value) => {
                  this.setState({ username: value });
                }}
              ></TextInput>
              <TextInput
                secureTextEntry
                cursorColor={'white'}
                selectionColor={'white'}
                placeholder='Password'
                placeholderTextColor={COLORS.white} // Set the color of the placeholder text
                style={[styles.userpassinput, { color: COLORS.white }]}
                onChangeText={(value) => {
                  this.setState({ password: value });
                }}
              ></TextInput>


              {/* login button */}
              <Pressable
                style={({pressed}) => [
                  {
                    backgroundColor: pressed
                      ? COLORS.whitetransparent
                      : COLORS.transparent
                  },
                  styles.loginButton
                ]}
                onPress={() => this.login(navigation)}>
                <Text style={styles.loginText}>Log In</Text>
              </Pressable>


              {/* forgot password button */}
              <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? COLORS.whitetransparent : COLORS.transparent
                },
                styles.forgotAccountButton
              ]}
              onPress={() => navigation.navigate('ForgotPassword')}>
                
              <Text style={styles.createAccountText}>
                Forgot your login details? <Text style={styles.boldtext}>Get help signing in.</Text>
              </Text>
            </Pressable>
              <Text style={styles.or}>OR</Text>

              {/* alt logins */}
              <Pressable style={styles.altLoginButton}>
                <Ionicons name='logo-google' size={29} color='white' />
                <Text style={styles.altLoginButtonText}>Sign in with Google</Text>
            </Pressable>

            {/* sign up button */}  
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? COLORS.whitetransparent : COLORS.transparent
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
              <LinearGradient
                colors={[COLORS.blue, COLORS.green]}
                style={{ flex: 1 }}
                start={{ x: 0, y: 0.2 }}
                end={{ x: 1, y: 1 }}>
                {/* Pressable component so that when the user taps outside the modal, it closes */}
                {/* <Pressable
                onPress={() => {
                  this.setModalVisible(false)
                  this.toggleCheckbox(false)
                }}
                style={styles.pressable}> */}
                {/* Modal content enclosed with touchable without feedback component so it does *not* close if a user taps inside the modal content area */}
                  <KeyboardAvoidingView behavior='padding' style={styles.modal}>
                      {/* Back button to exit the modal */}
                    <Pressable
                      // Create account button - executes create account function defined above on press
                      onPress={() => {
                        this.setModalVisible(false);
                        this.toggleCheckbox(false);
                      }}
                      style={({pressed}) => [
                        {
                          backgroundColor: pressed
                            ? COLORS.transparent
                            : COLORS.transparent
                        },
                        styles.backButton
                      ]}>
                    <Text style={styles.backButtontext}>×</Text>
                    </Pressable>
                    <Text style={styles.createAccount}>Create Account</Text>
                    <View style={styles.rowContainer}>
                    {/* Text inputs*/}
                    <View style={styles.inputContainer}>
                      <TextInput
                        defaultValue={this.state.firstname}
                        onChangeText={(firstnameInput) =>
                          this.setState({ firstname: firstnameInput })
                        }
                        placeholder="First"
                        placeholderTextColor={COLORS.morewhitetransparent} // Set the color of the placeholder text
                        cursorColor={'black'}
                        style={styles.nameInput}
                      />
                    </View>

                    {/* Text input for lastname */}
                      <View style={styles.inputContainer}>
                        <TextInput
                          defaultValue={this.state.lastname}
                          onChangeText={(lastnameInput) =>
                            this.setState({ lastname: lastnameInput })
                          }
                          placeholder="Last"
                          placeholderTextColor={COLORS.morewhitetransparent} // Set the color of the placeholder text
                          cursorColor={'black'}
                          style={styles.nameInput}
                        />
                      </View>
                    </View>

                    <View>
                      {/* Text input for email */}
                      <TextInput
                        defaultValue={this.state.email}
                        onChangeText={(emailInput) => this.setState({ email: emailInput })}
                        placeholder="Email"
                        placeholderTextColor={COLORS.morewhitetransparent} // Set the color of the placeholder text
                        cursorColor={'white'}
                        selectionColor={'white'}
                        style={styles.input}
                      />
                    </View>

                    <View>
                      {/* Text input for newusername */}
                      <TextInput
                        defaultValue={this.state.newusername}
                        onChangeText={(newusernameInput) =>
                          this.setState({ newusername: newusernameInput })
                        }
                        placeholder="Username"
                        placeholderTextColor={COLORS.morewhitetransparent} // Set the color of the placeholder text
                        cursorColor={'white'}
                        selectionColor={'white'}
                        style={styles.input}
                      />
                    </View>

                    <View>
                      {/* Text input for password */}
                      <TextInput
                        onChangeText={(newText) => this.setState({ password: newText })}
                        cursorColor={'white'}
                        selectionColor={'white'}
                        secureTextEntry
                        placeholder="Password"
                        placeholderTextColor={COLORS.morewhitetransparent} // Set the color of the placeholder text
                        style={styles.input}
                      />
                    </View>

                    <View>
                      {/* Text input for password re-enter */}
                      <TextInput
                        onChangeText={(newText) => this.setState({ passwordRenter: newText })}
                        cursorColor={'white'}
                        selectionColor={'white'}
                        secureTextEntry
                        placeholder="Re-Enter Password"
                        placeholderTextColor={COLORS.morewhitetransparent} // Set the color of the placeholder text
                        style={styles.input}
                      />
                    </View>
                      {/* Password requirements
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
                        fillColor={COLORS.whitetransparent}
                        unfillColor='white'
                        text="I agree to the Terms of Service & Privacy Policy"
                        innerIconStyle={{borderWidth: 2}}
                        onPress={() => {
                          this.setState((prevState) => ({
                            checkboxprivacy: !prevState.checkboxprivacy,
                          }));
                        }}
                        textStyle={styles.tosText}
                      />

                      <Pressable
                        // Create account button - executes create account function defined above on press
                        onPress={() => this.createAccount(navigation)}
                        style={({pressed}) => [
                          {
                            backgroundColor: pressed
                              ? COLORS.lesswhitetransparent
                              : COLORS.transparent
                          },
                          styles.signupButton
                        ]}>
                        <Text style={styles.submitButtonText}>Sign Up</Text>
                      </Pressable>
                      
                </KeyboardAvoidingView> 
            {/* </Pressable> */}
              </LinearGradient>
            </Modal>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </LinearGradient>
    )
  }
}

// Styles
const styles = StyleSheet.create({

  //sign in page
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 0,
    margin: 0,
    width: '100%',
    height: '100%',
  },
  image: {
    flex: .25,
    marginTop: 20,
    width: '100%',
    marginBottom: '10%',
    aspectRatio: 792 / 283,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    color: 'white',
  },
  subtitle:{
    fontSize: 24,
    color: 'white',
    marginBottom: '10%',
  },
  userpassinput: {
    height: 50,
    width: '85%',
    borderRadius: 7,
    backgroundColor: COLORS.whitetransparent,
    margin: 8,
    paddingLeft: 15,
    fontSize: 15,
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
    color: 'white',
    fontWeight: 'bold',
  },
  forgotAccountButton: {
    paddingTop: 0,
    width: '85%',
    marginTop: 3,
    height: 30,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  forgotPasswordContainer: {
    backgroundColor: COLORS.transparent,
    paddingTop: 10
  },
  createAccountText: {
    color: 'white',
  },
  boldtext:{
    fontWeight: 'bold',
  },
  or:{
    marginTop: 15,
    marginBottom: 15,
    color: COLORS.white,
    fontSize: 16
  },
  pressable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  altLoginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: '85%',
    borderRadius: 7,
    backgroundColor: COLORS.whitetransparent,
    fontSize: 15,
  },
  altLoginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 8,
  },
  createAccountButton: {
    paddingTop: 0,
    width: '85%',
    marginTop: 10,
    height: 50,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center'
  },

  // modal
  modal: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    margin: 10,
    marginTop: 40,
    borderRadius: 14,
  },
  backButtontext: {
    fontSize: 40,
    color: COLORS.white,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 25,
    paddingRight: 25
  },
  createAccount: {
    paddingTop: '27.5%',
    paddingBottom: '7.5%',
    fontSize: 28,
    color: COLORS.white,
    alignSelf: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '5.7%',
    paddingRight: '5.7%',
  },
  inputContainer: {
    paddingLeft: '2%',
    paddingRight: '2%',
    flex: 1, 
  },
  nameInput: {
    height: 50,
    width: '100%',
    borderRadius: 7,
    backgroundColor: COLORS.whitetransparent,
    paddingLeft: 15,
    fontSize: 15,
    color: 'white',
    },
  input:{
    height: 50,
    width: '85%',
    borderRadius: 7,
    backgroundColor: COLORS.whitetransparent,
    paddingLeft: 15,
    marginTop: '4%',
    fontSize: 15,
    color: 'white',
    alignSelf: 'center',
    alignItems: 'center'
  },
  tosText: {
    textDecorationLine: 'none',
    fontSize: 13.7,
    color: 'white',
  },
  checkBox: {
    alignSelf: 'center',
    paddingVertical: '5%',
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 15,
  },
  signupButton: {
    height: 50,
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderColor: COLORS.whitetransparent,
    borderWidth: 3,
    borderRadius: 7,
  },
  // pressable: {
  //   height: '100%',
  //   width: '100%'
  // },
  // passReqsContainer: {
  //   margin: '3%'
  // },
  // passReqLabel: {
  //   color: COLORS.white,
  //   fontSize: 15,
  //   fontWeight: 'bold'
  // },
  // passReq: {
  //   marginLeft: '3%',
  //   color: COLORS.white,
  //   fontSize: 13,
  //   fontWeight: 'bold'
  // }
});