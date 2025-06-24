
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwsZYX5pJzG90QJAuucOmBhI-SVLJQEso",
  authDomain: "tasirat-morocco.firebaseapp.com",
  projectId: "tasirat-morocco",
  storageBucket: "tasirat-morocco.firebasestorage.app",
  messagingSenderId: "86336976138",
  appId: "1:86336976138:web:dd395cf1a41519289ef6f3",
  measurementId: "G-0JT6Y137F7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

// Auth functions
export const signUp = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Save user data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      displayName: displayName,
      createdAt: new Date(),
      uid: user.uid
    });
    
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Products functions
export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, "products"), {
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, products };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const q = query(
      collection(db, "products"), 
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, products };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Orders functions
export const addOrder = async (orderData) => {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      ...orderData,
      createdAt: new Date(),
      status: 'pending'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getUserOrders = async (userId) => {
  try {
    const q = query(
      collection(db, "orders"), 
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, orders };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Storage functions
export const uploadImage = async (file, path) => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return { success: true, url: downloadURL };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Auth state observer
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export { auth, db, storage };
