import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import { COLORS } from '../Utils/colors';
import Divider from '../Utils/Divider';

import {
  getUserID,
  sendFriendRequest,
  getPendingFriendRequestsRecieved,
  acceptFriendRequest,
  getFriends,
  getNameFromID,
  removeFriend,
} from '../ProfileComponents/FriendHandler';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

export default class AddFriendsPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendRequestText: '',
      pendingRequests: [],
      friends: [],
    };
  }

  componentDidMount() {
    this.refreshPage();
  }

  async refreshPage() {
    await this.fetchPendingRequests();
    await this.fetchFriends();
  }

  async fetchFriends() {
    const friends = await getFriends();
    this.setState({ friends });
  }

  async fetchPendingRequests() {
    const requests = await getPendingFriendRequestsRecieved();
    this.setState({ pendingRequests: requests });
  }

  async submitOnPress() {
    const id = await getUserID(this.state.friendRequestText);
    if (id === null) {
      Alert.alert('User not found', 'Please check the username and try again.');
      return;
    }
    const senderId = FIREBASE_AUTH.currentUser.uid;
    const requestResults = await sendFriendRequest(senderId, id);
    if (requestResults) {
      Alert.alert('Success', 'Friend request sent successfully.');
    } else {
      Alert.alert('Error', 'Failed to send friend request. Please try again later.');
    }
    this.setState({ friendRequestText: '' }); // Reset input field
  }

  async handleAccept(request) {
    const user2 = await getNameFromID(FIREBASE_AUTH.currentUser.uid);
    const user1 = await getNameFromID(request.initiated);
    const result = await acceptFriendRequest(user1, user2);
    if (result) {
      Alert.alert('Success', 'Friend request accepted.');
      this.refreshPage(); // Refresh the list of pending requests and friends
    } else {
      Alert.alert('Error', 'Failed to accept friend request. Please try again later.');
    }
  }

  async handleIgnore(requestId) {
    const result = await removeFriend(requestId); // Changed to removeFriend
    if (result) {
      Alert.alert('Success', 'Friend request ignored.');
      this.refreshPage(); // Refresh the list of pending requests
    } else {
      Alert.alert('Error', 'Failed to ignore friend request. Please try again later.');
    }
  }

  async handleRemoveFriend(friendId) {
    const result = await removeFriend(friendId);
    if (result) {
      Alert.alert('Success', 'Friend removed successfully.');
      this.refreshPage(); // Refresh the list of friends after removal
    } else {
      Alert.alert('Error', 'Failed to remove friend. Please try again later.');
    }
  }

  renderFriendItem(friend) {
    return (
      <View key={friend.id} style={styles.friendItem}>
        <Image source={require('../../images/profile.png')} style={styles.profilePic} />
        <Text style={styles.usernameText}>{friend.data().username}</Text>
        <Pressable
          style={[styles.button, styles.removeFriendButton]}
          onPress={() => this.handleRemoveFriend(friend.id)}>
          <Text style={styles.buttonText}>Remove</Text>
        </Pressable>
      </View>
    );
  }

  renderRequestItem(request) {
    return (
      <View key={request.id} style={styles.requestItem}>
        <Image source={require('../../images/profile.png')} style={styles.profilePic} />
        <Text style={styles.usernameText}>{request.data().username}</Text>
        <View style={styles.buttonsContainer}>
          <Pressable
            style={[styles.button, styles.acceptButton]}
            onPress={() => this.handleAccept(request.data())}>
            <Text style={styles.buttonText}>Accept</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.ignoreButton]}
            onPress={() => this.handleIgnore(request.id)}>
            <Text style={styles.buttonText}>Ignore</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          cursorColor={COLORS.white}
          selectionColor={COLORS.blue}
          placeholder="Username"
          placeholderTextColor={COLORS.blue}
          style={[styles.userpassinput, {color: COLORS.white}]}
          onChangeText={(value) => this.setState({ friendRequestText: value })}
          value={this.state.friendRequestText}
        />
        <Pressable
          onPress={() => this.submitOnPress()}
          style={({ pressed }) => [
            { backgroundColor: pressed ? COLORS.whitetransparent : COLORS.transparent },
            styles.submitButton
          ]}>
          <Text style={styles.submitButtonText}>Add Friend</Text>
        </Pressable>
        <Divider />
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
          {this.state.pendingRequests.map((request) => this.renderRequestItem(request))}
          <Divider style={{ width: '100%', marginVertical: 20 }} />
          {this.state.friends.map((friend) => this.renderFriendItem(friend))}
        </ScrollView>
        <Pressable
          onPress={() => this.refreshPage()}
          style={[styles.refreshButton]}>
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '87%',
    marginLeft: '5%',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    width: '100%',
  },
  contentContainer: {
    alignItems: 'center',
  },
  userpassinput: {
    height: 50,
    width: '85%',
    borderRadius: 7,
    backgroundColor: COLORS.background,
    marginBottom: 8,
    paddingLeft: 15,
    fontSize: 15,
    marginTop: 20,
  },
  submitButton: {
    height: 50,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.blue,
    borderWidth: 2,
    borderRadius: 7,
    marginVertical: 8,
  },
  submitButtonText: {
    color: COLORS.blue,
    fontSize: 15,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightblue,
  },
  requestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightblue,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  usernameText: {
    color: COLORS.blue,
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  acceptButton: {
    backgroundColor: 'blue',
  },
  ignoreButton: {
    backgroundColor: 'gray',
  },
  removeFriendButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: COLORS.white,
  },
  container: {
    width: '90%',
    height: '87%',
    marginLeft: '5%',
    alignItems: 'center',
    backgroundColor: COLORS.whitetransparent,
  },
  // Other styles remain unchanged
  refreshButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.lightblue,
    borderRadius: 5,
  },
  refreshButtonText: {
    color: COLORS.blue,
    fontSize: 16,
  },
});
