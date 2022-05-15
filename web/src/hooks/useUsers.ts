import { useRef } from "react";
import { firestore } from "firebase";

import { IUser } from "../UserProvider";

import { useFirestoreCollection } from "./useFirestore";

export const useUsers = () => {
  const usersRef = useRef(firestore().collection("users"));
  const [users] = useFirestoreCollection<IUser>(usersRef.current);

  return Object.fromEntries(
    users?.map(({ id, ...rest }) => [id, { ...rest }]) || []
  );
};
