import React, {Component} from 'react'
import {StyleSheet, View, Text, Pressable, Image} from 'react-native'
import {COLORS} from '../Utils/colors'
import Divider from '../Utils/Divider'
import {deleteDoc} from "firebase/firestore";
import { addDoc, collection, getDoc, doc, getDocs} from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { formatDate } from 'react-calendar/dist/cjs/shared/dateFormatter';

export default class WasteLog extends Component {
  constructor(props) {
    super(props)
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete = async () => {
    try {
      // Ensure you have a valid user before proceeding
      if (!FIREBASE_AUTH.currentUser) {
        console.log("No user signed in.");
        return;
      }
  
      const userId = FIREBASE_AUTH.currentUser.uid;
      const subcollectionRef = collection(FIREBASE_DB, "users",FIREBASE_AUTH.currentUser.uid,"/Wasted Food");
      const querySnapshot = await getDocs(subcollectionRef);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const date = `${data.selectedMonth}/${data.selectedDay}`;
        if (date === this.props.date && data.foodType === this.props.category && data.weightValue === this.props.amount && data.weightUnit === this.props.unit) {
          deleteDoc(doc.ref);
        }
      });
  
      // Call the onWasteDeleted function after deleting the waste entry
      if (this.props.onWasteDeleted) {
        this.props.onWasteDeleted();
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logContainer}>
          <Text style={styles.date}>{this.props.date}</Text>
          <Text style={styles.category}>{this.props.category}</Text>
          <Text style={styles.amount}>{this.props.amount}</Text>
          <Text style={styles.unit}>{this.props.unit}</Text>
          <Pressable style={styles.delete} onPress={this.onDelete}><Image 
            source={require('../../images/trash.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.red,
            }}/></Pressable>
        </View>
        <Divider />
     
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '7%',
    alignItems: 'center',
    borderRadius: 10,
    margin: 2,
  },
  logContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1
  },
  date: {
    fontSize: 16,
    color: COLORS.text,
    width: '15%',
    alignSelf: 'center',
    textAlign: 'center', // Center text horizontally
  },
  category: {
    fontSize: 16,
    color: COLORS.text,
    width: '25%',
    textAlign: 'center', // Center text horizontally
  },
  amount: {
    fontSize: 16,
    color: COLORS.text,
    width: '25%',
    textAlign: 'center', // Center text horizontally
  },
  unit: {
    fontSize: 16,
    color: COLORS.text,
    width: '20%',
    textAlign: 'center', // Center text horizontally
  },
  delete: {
    width: '15%',
    right: -20,
  }
})