import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { firebaseDocument } from '../global/interfaces';

export const transformData = <T extends firebaseDocument>(
  document: QueryDocumentSnapshot<DocumentData>
): T => ({
  ...(document.data() as T),
  id: document.id,
});
