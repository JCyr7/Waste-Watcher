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
                    <Text style={styles.title}>Why Track My Food Waste?</Text>
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoText}>Tracking and measuring is a proven most-effective way to help you reduce your food waste and gain these benefits:</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Image 
                            source={require('../../images/trash.png')}
                            style={styles.infoImage}/>
                        <Text style={styles.infoText}>Save on your ever-increasing food spending.</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Image 
                            source={require('../../images/trash.png')}
                            style={styles.infoImage}/>
                        <Text style={styles.infoText}>Fight hunger in your community.</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Image 
                            source={require('../../images/trash.png')}
                            style={styles.infoImage}/>
                        <Text style={styles.infoText}>Reduce GHG emissions driving climate change impact.</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoText}>Thanks for doing your part to end food waste!</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
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
              </View>
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
        height: '7.5%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.green
    },
    title: {
        fontWeight: '600',
        fontSize: 24,
        color: COLORS.blue,
    },
    infoContainer: {
        width: '90%',
        height: '72.5%',
        justifyContent: 'space-evenly',
        backgroundColor: COLORS.button
    },
    infoItem: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoImage: {
        width: 25,
        height: 25,
        marginRight: 15,
    },
    infoText: {
        width: '85%',
        fontSize: 17,
    },
    buttonContainer: {
        height: '20%',
        backgroundColor: COLORS.green
    },
    continueButton: {
        height: '20%',
    },
    continueText: {
        color
    },
});