import * as React from 'react'
import {Component} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  TextInput,
  Text,
  Pressable,
  TouchableOpacity
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

        {/* Container for page */}
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
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

          <Image
            style={styles.image}
            source={require('../../images/FoodRescueMaine_Logo_Final-01.png')}
          />
          <Text style={styles.header}>Forgot Password?</Text>
          <Text style={styles.subheader}>Please enter your email and we'll send you a link to reset your password.</Text>


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
              styles.submitButton,
            ]}>
            <Text style={styles.submitButtonTextColor}>Reset Password</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 0,
    margin: 0,
    width: '100%',
    height: '100%',
  },
  image: {
    flex: .1, 
    width: '100%', // Use 100% width to ensure it doesn't exceed the screen width
    marginBottom: '10%',
    aspectRatio: 792 / 283, // Set the aspect ratio based on your image dimensions
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
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.white
  },
  subheader: {
    color: COLORS.white,
    marginLeft: '.5%',
    marginRight: '7.5%',
    fontSize: 12
  },
  input: {
    height: 50,
    width: '85%',
    borderRadius: 7,
    backgroundColor: COLORS.whitetransparent,
    margin: 8,
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
