import * as firebase from 'firebase';
import { FIREBASE_CONFIG } from '../config';

export const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.database();

type FirebaseMapNode<T> = { [key: string]: T; }
type Entity<T extends object> = T & { id: string };

export function getValue<T>(rootData: { [key: string]: any }, path: string): T | undefined {
  return path.split('/').filter(p => !!p).reduce((acc, key) => {
    return acc && acc[key];
  }, rootData) as T;
}

export function flatten<T>(data: FirebaseMapNode<FirebaseMapNode<T>> = {}): FirebaseMapNode<T> {
  return Object.keys(data).reduce((acc, key) => {
    return Object.assign(acc, data[key]);
  }, {});
}

export function convertMapToList<T extends object>(data: FirebaseMapNode<T>): Entity<T>[] {
  return Object.keys(data).reduce((acc, id) => {
    acc.push(Object.assign({}, { id }, data[id]));
    return acc;
  }, [] as Entity<T>[]);
}
