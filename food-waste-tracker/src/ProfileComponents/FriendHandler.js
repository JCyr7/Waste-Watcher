import React, { useState, useEffect, Component } from 'react';
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";

import { FIREBASE_DB } from '../../FirebaseConfig';

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
    } finally {
        return retval;
    }
    
}

export const checkRequestExists = async (user1, user2) => {

}

export const sendFriendRequest = async (user1, user2) => {

}