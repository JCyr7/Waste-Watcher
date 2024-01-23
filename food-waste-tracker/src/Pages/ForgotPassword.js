import * as React from 'react'
import {Component} from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  TextInput,
  Text,
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
    return (
      // Container for page
      <KeyboardAvoidingView style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../images/FoodRescueMaine_Logo_Final-01.png')}
        />
        <Text style={styles.header}>Reset Password</Text>
        <Text style={styles.subheader}>
          If you do not know your current password, you may change it.
        </Text>
        <Text style={styles.inputTitle}>Email</Text>

        {/*  */}
        <TextInput
          placeholder='example@noemail.com'
          onEndEditing={() => this.validateText()}
          onChangeText={(value) => this.setText(value)}
          style={[
            {borderColor: this.state.invalidEmail ? 'red' : COLORS.darkGreen},
            styles.input
          ]}
          cursorColor={'black'}></TextInput>

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonTextColor}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
    marginTop: '30%'
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.darkGray
  },
  subheader: {
    color: COLORS.darkGray,
    margin: '5%',
    fontSize: 12
  },
  inputTitle: {
    paddingLeft: '3%',
    paddingTop: '1%',
    paddingBottom: '1%',
    fontWeight: 'bold',
    alignSelf: 'flex-start'
  },
  input: {
    borderRadius: 10,
    borderWidth: 2,
    paddingTop: '1%',
    padding: '1%',
    paddingLeft: '3%',
    width: '95%',
    alignSelf: 'center'
  },
  submitButton: {
    margin: '4%',
    paddingTop: '1%',
    height: 30,
    width: '15%',
    borderRadius: 3,
    alignItems: 'center',
    backgroundColor: COLORS.darkGreen
  },
  submitButtonTextColor: {
    color: 'white'
  }
})
