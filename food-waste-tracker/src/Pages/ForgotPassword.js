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
        end={{ x: 1, y: 1 }}
      >
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
            ]}
          >
            <Text style={styles.backButtontext}>×</Text>
          </Pressable>

          <Image
            style={styles.image}
            source={require('../../images/FoodRescueMaine_Logo_Final-01.png')}
          />
          <Text style={styles.header}>Reset Password</Text>
          <Text style={styles.subheader}>
            Enter your email and we'll send you a link to reset your password.
          </Text>

          <TextInput
            placeholder='example@noemail.com'
            onEndEditing={() => this.validateText()}
            onChangeText={(value) => this.setText(value)}
            style={[
              { borderColor: this.state.invalidEmail ? 'red' : COLORS.darkGreen },
              styles.input,
            ]}
            placeholderTextColor={COLORS.morewhitetransparent} // Set the color of the placeholder text
            cursorColor={'white'}
            selectionColor={'white'}
          ></TextInput>

          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonTextColor}>Reset Password</Text>
          </TouchableOpacity>
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
    flex: .4, // Set flex to 0.4 to make it take 40% of the screen
    marginTop: 80,
    width: '100%', // Use 100% width to ensure it doesn't exceed the screen width
    marginBottom: 0,
    aspectRatio: 181 / 201, // Set the aspect ratio based on your image dimensions
  },
  //backbutton
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
    borderBottomWidth: 2.5, 
    paddingTop: '4%',
    paddingBottom: '1.5%', 
    paddingLeft: '1%',
    width: '85%',
    alignSelf: 'center',
    borderColor: COLORS.white,
    marginBottom: 20,
    fontSize: 17,
    color: 'white',
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
    color: 'white'
  }
})
