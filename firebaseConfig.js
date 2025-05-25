import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// console.log(getApps()[0].name);

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCHCf4_nDGsQwztLalTgxPY6p-b-Sw-0a4',
  authDomain: 'app-crud-31f45.firebaseapp.com',
  databaseURL: 'https://app-crud-31f45-default-rtdb.firebaseio.com/',
  projectId: 'app-crud-31f45',
  storageBucket: 'app-crud-31f45.firebasestorage.app',
  messagingSenderId: '376248190815',
  appId: '1:376248190815:web:1814189c594c93dc9c58ea',
  measurementId: 'G-JP0RYFJ13K',
};

const appFB = initializeApp(firebaseConfig);

const dbFB = getDatabase(appFB);
export { appFB, dbFB };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
