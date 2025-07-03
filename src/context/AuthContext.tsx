import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile as firebaseUpdateProfile,
  sendEmailVerification
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';
import { auth, db } from '../firebase-config';

interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
  grades?: string;
  experience?: string;
  school?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Partial<User> & { email: string; password: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  deleteAccount: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docSnap = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (docSnap.exists()) {
          setUser({ id: firebaseUser.uid, ...docSnap.data() } as User);
          setIsAuthenticated(true);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
    return unsubscribe;
  }, []);

 const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);

    if (!res.user.emailVerified) {
      await signOut(auth);
      alert('Please verify your email before logging in.');
      return false;
    }

    const docSnap = await getDoc(doc(db, 'users', res.user.uid));
    if (docSnap.exists()) {
      setUser({ id: res.user.uid, ...docSnap.data() } as User);
    }
    setIsAuthenticated(true);
    return true;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};


  const signup = async (userData: Partial<User> & { email: string; password: string }): Promise<boolean> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, userData.email, userData.password);

    // Set display name
    await firebaseUpdateProfile(res.user, {
      displayName: `${userData.name} ${userData.surname}`
    });

    // Save profile to Firestore
    const userDoc = {
      email: userData.email,
      name: userData.name || '',
      surname: userData.surname || '',
      grades: userData.grades || '',
      experience: userData.experience || '',
      school: userData.school || '',
      createdAt: new Date()
    };

    await setDoc(doc(db, 'users', res.user.uid), userDoc);

    // ✅ Send verification email
    await sendEmailVerification(res.user);

    // 🚫 Immediately sign them out until they verify
    await signOut(auth);

    return true;
  } catch (error) {
    console.error('Signup error:', error);
    return false;
  }
};


  const logout = () => {
    signOut(auth);
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      setDoc(doc(db, 'users', user.id), updatedUser);
    }
  };

  const deleteAccount = () => {
    // Optional: implement Firebase account deletion
    console.warn('Account deletion not implemented yet.');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        signup,
        logout,
        updateProfile,
        deleteAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
