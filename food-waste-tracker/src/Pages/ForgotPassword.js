import * as React from 'react'
import {Component} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  Platform
} from 'react-native'
import {COLORS} from '../Utils/colors'

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      invalidEmail: true,
      email: ''
    }
  }

  // Validate text method ensure that email field is not empty --> try and immplement valid email checking --> query database for valid email
  validateText() {
    if (this.state.email === '') {
      this.setState({invalidEmail: true})
    } else {
      this.setState({invalidEmail: false})
    }
  }

  // Sets the value of the email state, and calls the validate text method
  setText(value) {
    // console.log(this.state.email);
    this.validateText()
    this.setState({email: value})
  }

  render() {
    const { navigation } = this.props;

    return (
      <LinearGradient
        colors={[COLORS.blue, COLORS.green]}
        style={styles.container}
        start={{ x: 0, y: 0.2 }}
        end={{ x: 1, y: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Use 'padding' behavior for iOS and 'height' behavior for Android
          style={styles.container}
        >
          <Pressable
            onPress={() => navigation.navigate('LogoutPage')}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? COLORS.transparent
                  : COLORS.transparent,
              },
              styles.backButton,
            ]}>
            <Text style={styles.backButtontext}>×</Text>
          </Pressable>
          <Text style={styles.header}>Forgot Password?</Text>
          <Text style={styles.subheader}>Please enter your email and we'll send you an email with a link to reset your password.</Text>
          <TextInput
            cursorColor={'white'}
            selectionColor={'white'}
            placeholder='example@gmail.com'
            placeholderTextColor={COLORS.white} // Set the color of the placeholder text
            style={[styles.input, { color: COLORS.white }]}             
            onChangeText={(value) => this.setText(value)}
            onEndEditing={() => this.validateText()}>
          </TextInput>
          <Pressable
            //onPress={() => navigation.navigate('LogoutPage')}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? COLORS.whitetransparent : COLORS.transparent
              },
              styles.submitButton,]}>
            <Text style={styles.submitButtonTextColor}>Reset Password</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 0,
    margin: 0,
    width: '100%',
    height: '100%',
  },
  backButton: {
    alignSelf: 'flex-start',
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
  header: {
    fontSize: 35,
    color: COLORS.white
  },
  subheader: {
    color: COLORS.white,
    width: '85%',
    marginBottom: 8,
    marginTop: 80,
    fontSize: 15
  },
  input: {
    height: 50,
    width: '85%',
    borderRadius: 7,
    backgroundColor: COLORS.whitetransparent,
    marginBottom: 8,
    paddingLeft: 15,
    fontSize: 15,
  },
  submitButton: {
    height: 50,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderColor: COLORS.whitetransparent,
    borderWidth: 3,
    borderRadius: 7,
    margin: 8
  },
  submitButtonTextColor: {
    color: 'white',
    fontSize: 15,
  }
})
