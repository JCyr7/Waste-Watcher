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
  Alert,
  Keyboard
} from 'react-native'
import {COLORS} from '../Utils/colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { setDoc, collection, query, where, getDocs, doc } from "firebase/firestore";

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
      password: '',
      passwordRenter: '',
      userID: '',
      userAuth: false
    }
  }
  render() {
    // Declare constant navigation as props from parent component - enables navigation between stack pages
    const {navigation} = this.props
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                {/* title */}
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Welcome to Waste Watcher!</Text>
                </View>
                <Pressable
                style={({pressed}) => [
                  {
                    backgroundColor: pressed
                      ? COLORS.blue
                      : COLORS.blue
                  },
                  styles.continueButton
                ]}
                onPress={() => navigation.navigate('MainPage')}>
                <Text style={styles.continueText}>Continue</Text>
              </Pressable>
            </SafeAreaView>
        </TouchableWithoutFeedback>

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
    headerContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.green
    },
    title: {
    fontWeight: 'bold',
    fontSize: 32,
    color: COLORS.blue,
    },
});