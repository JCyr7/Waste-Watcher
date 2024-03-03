import React, {Component} from 'react'
import {StyleSheet, View, Text, Pressable} from 'react-native'
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
  }

  removeWaste = async () => {
    let wasteData = [];
    try {
        // Ensure you have a valid user before proceeding
        if (!FIREBASE_AUTH.currentUser) {
            console.log("No user signed in.");
            return wasteData;
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
            wasteData.push({
                date: date,
                category: data.foodType, 
                amount: data.weightValue,
                amountType: data.weightUnit,
            });
        });
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
          <Text style={styles.amount}>{this.props.unit}</Text>
          <Pressable style={styles.delete} onPress={() => this.removeWaste()}><Text>R</Text></Pressable>
        </View>
        <Divider />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '10%',
    alignItems: 'center'
  },
  logContainer: {
    width: '100%',
    height: '100%',
    paddingHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1
  },
  date: {
    flex: 1,
    fontSize: 14
  },
  category: {
    flex: 1,
    textAlign: 'left',
    fontSize: 14
  },
  amount: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14
  },
  delete: {
    flex: 1,
    textAlign: 'right',
    fontSize: 18
  }
})
