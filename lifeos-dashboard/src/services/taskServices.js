import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  where,
  query
} from "firebase/firestore";

import { db } from "../firebase/firebase";

//Add a task to Firestore
export const addTaskToFirestore = async (task) => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), task);

    console.log("Task added with ID:", docRef.id);

    return docRef.id;

  } catch (error) {
    console.error("Firestore Error:", error);
      throw error;
  }
};


// Retrieve tasks from Firestore
export const getTasksFromFirestore = async (uid) => {
  try {

    const q = query(
      collection(db, "tasks"),
      where("uid", "==", uid)
    );

    const snapshot = await getDocs(q);

    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    return tasks;

  } catch (error) {
    console.error("Firestore Error:", error);
    throw error;
  }
};
// Update a task in Firestore
export const updateTaskInFirestore = async (taskId, updatedTask) => {

  try { 
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, updatedTask);
      console.log("Task updated successfully");
      } 
      catch (error) {
      console.error("Firestore Error:", error);
      throw error;
  }
};