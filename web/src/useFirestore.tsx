import React, { useState, useEffect } from "react";
export const useFirestoreDocument = <T,>(
  ref: firebase.firestore.DocumentReference
): [T | undefined, (newData: Partial<T>, update: boolean) => void] => {
  const [current, _setCurrent] = useState<T | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = ref.onSnapshot((snapshot) => {
      _setCurrent(snapshot.data() as T);
    });
    return unsubscribe;
  }, [ref]);

  const setCurrent = async (newData: Partial<T>, update: boolean = true) => {
    if (update) {
      await ref.update(newData);
    } else {
      await ref.set(newData);
    }
  };

  return [current, setCurrent];
};
