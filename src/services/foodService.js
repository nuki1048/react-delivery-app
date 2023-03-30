import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useState } from "react";

import { db } from "../config/firebase";

const foodService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const transformData = (document) => ({
    ...document.data(),
    id: document.id,
  });
  const getFullCollection = async (collectionName) => {
    setLoading(true);
    try {
      const collectionP = collection(db, collectionName);
      const data = await getDocs(collectionP);
      setLoading(false);
      return data.docs.map(transformData);
    } catch (e) {
      setLoading(false);
      setError(true);
      throw new Error(
        `Unable to load data from this ${collectionName} collection`
      );
    }
  };
  const getOneDoc = async (collectionName, id) => {
    setLoading(true);
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      setLoading(false);
      return docSnap.data();
    } catch (Error) {
      setLoading(false);
      setError(true);
      throw new Error(
        `Unable to load data from this ${collectionName} collection`
      );
    }
  };
  const addNewDoc = async (collectionName, object) => {
    try {
      await addDoc(collection(db, collectionName), { ...object });

      // eslint-disable-next-line no-shadow
    } catch (error) {
      throw new Error(`we can't add this doc on ${collectionName}`);
    }
  };

  return { loading, error, getFullCollection, getOneDoc, addNewDoc };
};
export default foodService;
