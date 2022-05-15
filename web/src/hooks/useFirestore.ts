import { useState, useEffect, useCallback } from "react";
import { firestore } from "firebase";
export const useFirestoreDocument = <T>(
  ref: firebase.firestore.DocumentReference
): [T | undefined, (newData: Partial<T>, update: boolean) => void] => {
  const [current, _setCurrent] = useState<T | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = ref.onSnapshot((snapshot) => {
      _setCurrent(snapshot.data() as T);
    });
    return unsubscribe;
  }, [ref]);

  const setCurrent = useCallback(
    async (newData: Partial<T>, update: boolean = true) => {
      if (update) {
        await ref.update(newData);
      } else {
        await ref.set(newData);
      }
    },
    [ref]
  );

  return [current, setCurrent];
};

export type WithId<T> = T & { id: string };
export const useFirestoreCollection = <T>(
  ref: firebase.firestore.CollectionReference
): [WithId<T>[] | undefined, (newData: T) => void, (delId: string) => void] => {
  const [current, _setCurrent] = useState<WithId<T>[] | undefined>(undefined);

  const updateCurrent = useCallback(
    (snapshot: firestore.QuerySnapshot<firestore.DocumentData>) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const doc = { id: change.doc.id, ...(change.doc.data() as T) };
          _setCurrent((current) =>
            current !== undefined ? [...current, doc] : [doc]
          );
        } else if (change.type === "removed") {
          _setCurrent((current) =>
            current?.filter(({ id }) => id !== change.doc.id)
          );
        } else if (change.type === "modified") {
          _setCurrent((current) =>
            current?.map((c) =>
              c.id !== change.doc.id
                ? c
                : { id: change.doc.id, ...(change.doc.data() as T) }
            )
          );
        }
      });
    },
    []
  );

  useEffect(() => {
    const unsubscribe = ref.onSnapshot(updateCurrent);
    return () => {
      unsubscribe();
      _setCurrent(undefined);
    };
  }, [ref, updateCurrent]);

  const add = useCallback(
    async (newData: T) => {
      await ref.add(newData);
    },
    [ref]
  );

  const remove = useCallback(
    async (id: string) => {
      await ref.doc(id).delete();
    },
    [ref]
  );

  return [current, add, remove];
};

export const useFirestoreQuery = <T>(
  ref: firebase.firestore.Query | undefined
): [WithId<T>[] | undefined, boolean] => {
  const [current, _setCurrent] = useState<WithId<T>[] | undefined>(undefined);
  const [isLoading, _setLoading] = useState(false);

  const updateCurrent = useCallback(
    (snapshot: firestore.QuerySnapshot<firestore.DocumentData>) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const doc = { id: change.doc.id, ...(change.doc.data() as T) };
          _setCurrent((current) =>
            current !== undefined ? [...current, doc] : [doc]
          );
        } else if (change.type === "removed") {
          _setCurrent((current) =>
            current?.filter(({ id }) => id !== change.doc.id)
          );
        } else if (change.type === "modified") {
          _setCurrent((current) =>
            current?.map((c) =>
              c.id !== change.doc.id
                ? c
                : { id: change.doc.id, ...(change.doc.data() as T) }
            )
          );
        }
      });
    },
    []
  );

  useEffect(() => {
    if (ref) {
      const unsubscribe = ref.onSnapshot(updateCurrent);
      _setLoading(true);
      const data = ref.get().then((s) => {
        _setCurrent(
          s.docs.map((doc) => ({ id: doc.id, ...(doc.data() as T) }))
        );
        _setLoading(false);
      });
      return () => {
        unsubscribe();
        _setCurrent(undefined);
      };
    }
  }, [ref, updateCurrent]);

  return [current, isLoading];
};
