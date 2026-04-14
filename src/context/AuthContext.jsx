import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Register new user
  const register = async (name, email, password) => {
    setAuthError(null);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Save display name
    await updateProfile(userCredential.user, { displayName: name });
    setCurrentUser({ ...userCredential.user, displayName: name });
    return userCredential;
  };

  // Login existing user
  const login = async (email, password) => {
    setAuthError(null);
    return await signInWithEmailAndPassword(auth, email, password);
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
  };

  // Map Firebase error codes to friendly messages
  const getFriendlyError = (code) => {
    switch (code) {
      case "auth/user-not-found":      return "No account found with this email.";
      case "auth/wrong-password":      return "Incorrect password. Try again.";
      case "auth/email-already-in-use":return "This email is already registered.";
      case "auth/weak-password":       return "Password must be at least 6 characters.";
      case "auth/invalid-email":       return "Please enter a valid email address.";
      case "auth/too-many-requests":   return "Too many attempts. Please try again later.";
      case "auth/invalid-credential":  return "Incorrect email or password.";
      default:                         return "Something went wrong. Please try again.";
    }
  };

  // Determine if the user has Admin privileges
  const isAdmin = currentUser && currentUser.email === 'admin@creamstone.com';

  const value = {
    currentUser,
    isAdmin,
    loading,
    authError,
    setAuthError,
    register,
    login,
    logout,
    getFriendlyError,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
