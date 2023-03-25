import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useState } from "react";

import { db } from "../config/firebase";

const foodService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getFullCollection = async (collectionName) => {
    setLoading(true);
    try {
      const collectionP = collection(db, collectionName);
      const data = await getDocs(collectionP);
      setLoading(false);
      return data.docs.map(_transformData);
    } catch (error) {
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
      // console.log(docSnap.data());
      setLoading(false);
      return docSnap.data();
    } catch (error) {
      setLoading(false);
      setError(true);
      throw new Error(
        `Unable to load data from this ${collectionName} collection`
      );
    }
  };
  const _transformData = (doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  };

  return { loading, error, getFullCollection, getOneDoc };
};
export default foodService;
