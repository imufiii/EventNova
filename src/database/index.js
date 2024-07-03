import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  
// Import the functions you need from the SDKs you need


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

apiKey: "AIzaSyCaHQQPyBk-PfxPm_1UMM0Bng-gX1kX-OQ",
authDomain: "event-app-cbb00.firebaseapp.com",
projectId: "event-app-cbb00",
storageBucket: "event-app-cbb00.appspot.com",
messagingSenderId: "216898303081",
appId: "1:216898303081:web:cdd728cf0f7f16f4431ef8"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

/**
 * Adds a data to the list of tasks.
 * 
 * @param {object} data 
 *   The data to be added.
 * @returns 
 *   If successful, returns the id of the added tasks. 
 *   If error, returns null.
 */
export async function save(data) {
  try {
    const dbCollection = collection(db, 'tasks');
    const docRef = await addDoc(dbCollection, data);
    return docRef.id;
  } catch (e) {
    return null;
  }
}

/**
 * Loads all documents from the Tasks collection.
 * 
 * @returns 
 *   Array with the tasks.
 */
export async function load() {
  const data = [];

  const querySnapshot = await getDocs(collection(db, 'tasks'));
  querySnapshot.forEach((doc) => {
    data.push({
      ...doc.data(),
      id: doc.id
    });
  });

  return data;
}

/**
 * Update a task in the database.
 * 
 * @param {string} id 
 *   The id of the task to be updated.
 * @param {object} data 
 *   The updated data.
 * @returns 
 *   Whether the data was updated.
 */
export async function update(id, data) {
  try {
    const docRef = doc(db, 'tasks', id);
    await updateDoc(docRef, data);
    return true;
  }
  catch (e) {
    return false;
  }
}

/**
 * Deletes a task from the string.
 * 
 * @param {string} id 
 *   The id of the task to be removed.
 * @returns 
 *   Whether the task was removed.
 */
export async function remove(id) {
  try {
    const docRef = doc(db, 'tasks', id);
    await deleteDoc(docRef);
    return true;
  }
  catch (e) {
    return false;
  }
}