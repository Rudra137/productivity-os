import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  where,
  query,
  onSnapshot
} from "firebase/firestore";

import { db } from "../firebase/firebase";


// ADD TASK
export const addTaskToFirestore = async (task) => {
  try {
    const docRef = await addDoc(
      collection(db, "tasks"),
      task
    );

    console.log("Task added with ID:", docRef.id);

    return docRef.id;

  } catch (error) {
    console.error("Firestore Error:", error);
    throw error;
  }
};


// GET TASKS
export const getTasksFromFirestore = async (uid) => {
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
};


// REALTIME TASK LISTENER
export const subscribeToTasks = (uid, callback) => {
  const q = query(
    collection(db, "tasks"),
    where("uid", "==", uid)
  );

  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log("REALTIME TASKS:", tasks);

    callback(tasks);
  });
};


// UPDATE TASK
export const updateTaskInFirestore = async (
  taskId,
  updatedTask
) => {
  try {
    const taskRef = doc(
      db,
      "tasks",
      taskId
    );

    await updateDoc(
      taskRef,
      updatedTask
    );

    console.log("Task updated successfully");

  } catch (error) {
    console.error("Firestore Error:", error);
    throw error;
  }
};


// DELETE TASK
export const deleteTaskFromFirestore = async (taskId) => {
  try {
    const taskRef = doc(
      db,
      "tasks",
      taskId
    );

    await deleteDoc(taskRef);

    console.log("Task deleted successfully");

  } catch (error) {
    console.error("Firestore Error:", error);
    throw error;
  }
};