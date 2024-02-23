import React, {Component} from 'react'
import {View, StyleSheet, Text, ScrollView, TextInput, Pressable} from 'react-native'
import {COLORS} from '../Utils/colors'
import Divider from '../Utils/Divider'
import Notification from '../ProfileComponents/Notification'

import { getUserID, checkFriendRequestStatus, sendFriendRequest, getPendingFriendRequests, getNameFromID, acceptFriendRequest } from '../ProfileComponents/FriendHandler'
import { FIREBASE_AUTH } from '../../FirebaseConfig'

export default class NotificationsPopup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      friendRequestText: ''
    }
  }

  async submitOnPress() {
    const id = this.state.friendRequestText;
    const id2 = await getNameFromID(FIREBASE_AUTH.currentUser.uid);
    const requestresults = await acceptFriendRequest(id, id2);
    console.log(requestresults);
  }

  render() {
    return (
      <View style={styles.container}>
        <Divider />
        {/* Scroll Container for notifications */}
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
   
              <TextInput
                cursorColor={'white'}
                selectionColor={'white'}
                keyboardType="email-address"  // Set keyboardType to "email-address"
                placeholder='Email'
                placeholderTextColor={COLORS.white} // Set the color of the placeholder text
                style={[styles.userpassinput, { color: COLORS.white }]}             
                onChangeText={(value) => {
                  this.setState({ friendRequestText: value });
                }}
              ></TextInput>
              <Pressable
                onPress={() => this.submitOnPress()}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? COLORS.whitetransparent : COLORS.transparent
                  },
                  styles.submitButton,]}>
                <Text style={styles.submitButtonTextColor}>Submit</Text>
              </Pressable>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '87%',
    marginLeft: '5%',
    alignItems: 'center',
    backgroundColor: COLORS.blue,
  },
  scrollContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  contentContainer: {
    flex: 1
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
