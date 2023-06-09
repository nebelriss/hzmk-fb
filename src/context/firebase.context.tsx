import {
  User,
  UserCredential,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase.config';

interface FirebaseContext {
  authenticating: boolean;
  user: User | undefined;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

interface FirebaseContextProps extends PropsWithChildren {}

export const firebaseContext = createContext<FirebaseContext | undefined>(
  undefined
);

export const FirebaseContextProvider: React.FC<FirebaseContextProps> = ({
  children,
}) => {
  const [authenticating, setAuthenticating] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    setAuthenticating(true);
    const sub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser ?? undefined);
      }
      setAuthenticating(false);
    });
    return sub;
  }, []);

  const login = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  return (
    <firebaseContext.Provider value={{ user, authenticating, login, logout }}>
      {children}
    </firebaseContext.Provider>
  );
};
