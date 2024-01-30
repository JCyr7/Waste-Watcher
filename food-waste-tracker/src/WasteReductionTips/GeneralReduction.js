import React, {Component} from 'react'
import {StyleSheet, Pressable, Text, Linking} from 'react-native'
import {COLORS} from '../Utils/colors'
import {MaterialCommunityIcons} from '@expo/vector-icons'

import { FIREBASE_DB } from '../../FirebaseConfig'
import { addDoc, collection } from 'firebase/firestore'

export default class GeneralReduciton extends Component {
  constructor(props) {
    super(props)
  }

  onPressGeneral = async () => {

    console.log("this is a test");

    try {
      const docRef = await addDoc(collection(FIREBASE_DB, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  render() {
    const URL =
      'https://www.mayoclinichealthsystem.org/hometown-health/speaking-of-health/7-ways-to-reduce-food-waste-in-your-kitchen'

    return (
      <Pressable style={styles.container} 
      onPress={ () => this.onPressGeneral()}>
        <MaterialCommunityIcons
          name='food-fork-drink'
          size={35}
          color='black'
        />
        <Text style={styles.label}>General</Text>
      </Pressable>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    height: '31%',
    borderRadius: 10,
    backgroundColor: '#d3d3d3',
    marginVertical: '1%',
    marginHorizontal: '1%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: 15,
    marginTop: '2%'
  }
})
