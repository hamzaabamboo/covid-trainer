import React, { createContext, useState, useEffect } from "react";
import { auth, firestore } from "firebase";
import { Levels } from "./types";
export interface IUser {
  name: string;
  uid: string;
  photo: string;
  email: string;
  level?: Levels;
}
export const UserContext = createContext<{
  user: IUser | undefined;
  signOut?: () => void;
}>({ user: undefined, signOut: undefined });

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const authInstance = auth();
    authInstance.onAuthStateChanged((user) => {
      if (user === null) {
        authInstance.signInWithRedirect(new auth.GoogleAuthProvider());
      } else {
        setUser({
          name: user.displayName ?? "",
          uid: user.uid,
          photo: user.photoURL ?? "",
          email: user.email ?? "",
        });
        firestore()
          .collection("users")
          .doc(user.uid)
          .set({
            name: user.displayName ?? "",
            uid: user.uid,
            photo: user.photoURL ?? "",
            email: user.email ?? "",
          });
      }
    });
  }, []);
  const signOut = () => {
    setUser(undefined);
  };

  return user ? (
    <UserContext.Provider value={{ user, signOut }}>
      {children}
    </UserContext.Provider>
  ) : (
    <div>Loading...</div>
  );
};
