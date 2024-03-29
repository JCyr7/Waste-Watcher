import React, { useState, useEffect, Component } from 'react';
import { addDoc, collection, query, where, getDoc, getDocs, or, and, doc, setDoc, deleteDoc } from "firebase/firestore";

import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { Alert } from 'react-native';

// Takes in a users username and returns their userID, if the user is not found returns null
export const getUserID = async (username) => {

    let retval = null;

    try {
        const usersRef = collection(FIREBASE_DB, "users");
        const nameQuery = query(usersRef, where("username", "==", username));

        const nameQuerySnapshot = await getDocs(nameQuery);

        if (nameQuerySnapshot.docs.length == 1) {
            retval = nameQuerySnapshot.docs[0].id;
        }

    } catch (e) {
        console.log(e.message);
        return null;
    }
    
    return retval;
}

const sortStringsAlphabetically = (s1, s2) => {
    let u1 = "";
    let u2 = "";

    console.log(s1, s2);

    // sorts the strings alphabetically
    if (s1.localeCompare(s2) < 0) {
        u1 = s1;
        u2 = s2;
    } else {
        u1 = s2;
        u2 = s1;
    }

    return [u1, u2];
}

export const getFriendRequestStatus = async (user1, user2) => {    

    if (!user1 || !user2) {
        return null;
    }

    const userTuple = sortStringsAlphabetically(user1, user2);

    user1 = userTuple[0];
    user2 = userTuple[1];

    console.log("u1:", user1, "u2:", user2);

    try {

        const requestRef = collection(FIREBASE_DB, "friendship-matrix");
        const requestQuery = query(requestRef, where("friend1_ID", "==", user1), where("friend2_ID", "==", user2));

        const requestQuerySnapshot = await getDocs(requestQuery);

        requestQuerySnapshot.forEach((doc) => {
            console.log("test:", doc.data().friend1_ID);
        });

        if (requestQuerySnapshot != null && requestQuerySnapshot.docs.length > 0) {
            return requestQuerySnapshot.docs[0].data().status;
        }

    } catch (e) {
        console.log(e.message);
    }

    return null;
}

export const sendFriendRequest = async (sender, reciever) => {

    if (!sender || !reciever) {
        return null;
    }

    const userTuple = sortStringsAlphabetically(sender, reciever);

    const user1 = userTuple[0];
    const user2 = userTuple[1];

    requestStatus = await getFriendRequestStatus(user1, user2);

    console.log("requestStatus:", requestStatus);

    if (requestStatus) {
        return false;
    }

    try {

        await addDoc(collection(FIREBASE_DB, "friendship-matrix"), {
          friend1_ID: user1,
          friend2_ID: user2,
          status: "pending",
          initiated: sender
        });
      
        return true;

    } catch (e) {
        Alert.alert("Unable to send request at this time", "Please try again later");
        console.error("Error adding document: ", e);
        return null;
    }

}

export const getPendingFriendRequestsRecieved = async () => {

    user = FIREBASE_AUTH.currentUser.uid.toString();

    try {
        const usersRef = collection(FIREBASE_DB, "friendship-matrix");
        const requestQuery = query(usersRef, and(
        where("status", "==", "pending"),
        where("initiated", "!=", user),
        or(
            where("friend1_ID", "==", user),
            where("friend2_ID", "==", user)
        ))
    );
    
    const requestQuerySnapshot = await getDocs(requestQuery);

    return requestQuerySnapshot.docs;
    } catch (e) {
        console.log(e.message);
        return null;
    }
    
        
}

export const getFriends = async () => {

    user = FIREBASE_AUTH.currentUser.uid.toString();


    try {
        const usersRef = collection(FIREBASE_DB, "friendship-matrix");
        const requestQuery = query(usersRef, and(
            where("status", "==", "accepted"),
            or(
                where("friend1_ID", "==", user),
                where("friend2_ID", "==", user)
            ))
        );
        
        const requestQuerySnapshot = await getDocs(requestQuery);
    
        return requestQuerySnapshot.docs;
    } catch (e) {
        console.log(e.message);
        return null;
    }
    
        
}

export const getNameFromID = async (ID) => {
    try {
        const docRef = doc(FIREBASE_DB, "users", ID);
        const docSnap = await getDoc(docRef);
        return docSnap.data().username;
    } catch (e) {
        console.log(e.message);
        return null;
    }

}

export const acceptFriendRequest = async (username1, username2) => {

    if (!username1 || !username2) {
        return null;
    }

    username1 = await getUserID(username1);
    username2 = await getUserID(username2);

    console.log(username1, username2);

    const userTuple = sortStringsAlphabetically(username1, username2);

    const user1 = userTuple[0];
    const user2 = userTuple[1];

    try {

        const requestRef = collection(FIREBASE_DB, "friendship-matrix");
        const requestQuery = query(requestRef, where("friend1_ID", "==", user1), where("friend2_ID", "==", user2));

        const requestQuerySnapshot = await getDocs(requestQuery);

        const friendRequestStatus = requestQuerySnapshot.docs[0].data().status;
    
        if (!friendRequestStatus || friendRequestStatus == "accepted" || friendRequestStatus == "blocked") {
            return false;
        } else if (friendRequestStatus == "pending") {

            const docRef = doc(FIREBASE_DB, "friendship-matrix", requestQuerySnapshot.docs[0].id);

            await setDoc(docRef, {
                status: "accepted"
            }, {merge: true});

            return true;
        }

    } catch (e) {
        console.log("Unable to accept friend request", e.message);
        return false;
    }   

    return null;

}

export const blockFriendRequest = async (username1, username2) => {

    if (!username1 || !username2) {
        return null;
    }

    username1 = await getUserID(username1);
    username2 = await getUserID(username2);

    console.log(username1, username2);

    const userTuple = sortStringsAlphabetically(username1, username2);

    const user1 = userTuple[0];
    const user2 = userTuple[1];

    try {

        const requestRef = collection(FIREBASE_DB, "friendship-matrix");
        const requestQuery = query(requestRef, where("friend1_ID", "==", user1), where("friend2_ID", "==", user2));

        const requestQuerySnapshot = await getDocs(requestQuery);

        const friendRequestStatus = requestQuerySnapshot.docs[0].data().status;
    
        if (!friendRequestStatus) {
            return false;
        } else if (friendRequestStatus == "pending") {

            const docRef = doc(FIREBASE_DB, "friendship-matrix", requestQuerySnapshot.docs[0].id);

            await setDoc(docRef, {
                status: "blocked"
            }, {merge: true});

            return true;
        }

    } catch (e) {
        console.log("failed");
        console.log(e.message);
        return null;
    }   

    return null;

}

export const refuseFriendRequest = async (username1, username2) => {

    if (!username1 || !username2) {
        return null;
    }

    username1 = await getUserID(username1);
    username2 = await getUserID(username2);

    console.log(username1, username2);

    const userTuple = sortStringsAlphabetically(username1, username2);

    const user1 = userTuple[0];
    const user2 = userTuple[1];

    try {

        const requestRef = collection(FIREBASE_DB, "friendship-matrix");
        const requestQuery = query(requestRef, where("friend1_ID", "==", user1), where("friend2_ID", "==", user2));

        const requestQuerySnapshot = await getDocs(requestQuery);

        const friendRequestStatus = requestQuerySnapshot.docs[0].data().status;
    
        if (!friendRequestStatus || friendRequestStatus == "blocked") {
            return false;
        } else if (friendRequestStatus == "pending" || friendRequestStatus == "accepted") {

            const docRef = doc(FIREBASE_DB, "friendship-matrix", requestQuerySnapshot.docs[0].id);

            await deleteDoc(docRef);

            return true;
        }

    } catch (e) {
        console.log("failed");
        console.log(e.message);
        return null;
    }   

    return null;

}

// Existing imports...

// Existing functions...

export const removeFriend = async (friendId) => {
  // Assuming friendId is the ID of the friendship document
  try {
    await deleteDoc(doc(FIREBASE_DB, "friendship-matrix", friendId));
    return true;
  } catch (e) {
    console.log("Failed to remove friend", e.message);
    return false;
  }
}

// Existing functions continue...


export const getUserStreak = async (ID) => {

    try {
        const docRef = doc(FIREBASE_DB, "users", ID);
        const docSnap = await getDoc(docRef);

        return docSnap.data().streak;

    } catch (e) {
        console.log("Unable to get User Streak", e.message);
        return null;
    }

}