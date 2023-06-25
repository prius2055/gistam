import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAWQ3P_5MJyBlIgKaxsoJBCIrs76s8yBFU',
  authDomain: 'chatterapp-342a0.firebaseapp.com',
  projectId: 'chatterapp-342a0',
  storageBucket: 'chatterapp-342a0.appspot.com',
  messagingSenderId: '1027071961321',
  appId: '1:1027071961321:web:92440f8b8656e303d06878',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
export const database = getFirestore(app);
