import React, {Component} from 'react'
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native'
import {COLORS} from '../Utils/colors'
import axios from 'axios'
import Ionicons from '@expo/vector-icons/Ionicons'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      token: ''
    }
  }

  //Login function: calls api for
  login = async (navigation) => {
    try {
      await AsyncStorage.setItem('username', this.state.username)
      const value = await AsyncStorage.getItem('username')
      this.setState({token: value})
    } catch (err) {
      console.log(err)
    } finally {
      // const userAuthReturn = await this.userAuth()
      const userAuthReturn = true
      console.log(userAuthReturn)
      if (userAuthReturn === true) {
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

  render() {
    //Navigation constant declared
    const {navigation} = this.props
    return (
      <Pressable onPress={Keyboard.dismiss} style={styles.pressable}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require('../../images/FoodRescueMaine_Logo_Final-01.png')}></Image>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView behavior='height' style={styles.loginBox}>
              <TextInput
                cursorColor={'black'}
                placeholder='Username'
                style={styles.inputBox}
                onChangeText={(value) => {
                  this.setState({username: value})
                }}></TextInput>
              <TextInput
                cursorColor={'black'}
                secureTextEntry
                placeholder='Password'
                style={styles.inputBox}
                onChangeText={(value) => {
                  this.setState({password: value})
                }}></TextInput>
              <Pressable
                onPress={() => navigation.navigate('ForgotPassword')}
                style={styles.forgotPasswordContainer}>
                <Text style={styles.link}>Forgot password?</Text>
              </Pressable>

              <Pressable
                style={({pressed}) => [
                  {
                    backgroundColor: pressed
                      ? COLORS.lightGreen
                      : COLORS.darkGreen
                  },
                  styles.loginButton
                ]}
                onPress={() => this.login(navigation)}>
                <Text style={styles.loginText}>Log In</Text>
              </Pressable>
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
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </Pressable>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGreen,
    alignItems: 'center'
  },
  image: {
    margin: '20%'
  },
  loginBox: {
    width: '70%',
    height: 250,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 20,
    shadowOffset: {
      width: -3,
      height: 4
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
    shadowColor: COLORS.shadow
  },
  inputBox: {
    width: '80%',
    paddingTop: '1%',
    padding: '1%',
    paddingLeft: '3%',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'grey',
    margin: '4%'
  },
  link: {
    textDecorationLine: 'underline',
    color: 'blue',
    fontSize: 14,
    alignSelf: 'center'
  },
  loginButton: {
    height: 30,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 5,
    paddingBottom: '1%',
    shadowOffset: {
      width: -3,
      height: 4
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
    shadowColor: COLORS.shadow
  },
  loginText: {
    color: 'white'
  },
  forgotPasswordContainer: {
    height: '15%',
    width: '45%',
    alignSelf: 'flex-start',
    marginLeft: '22%',
    alignItems: 'flex-start'
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
  }
})
