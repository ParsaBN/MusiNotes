import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyBvrCDOYaiJ9Bvwvxnla6Hi32Z7ZFbrpEc",
    authDomain: "pastalavista-musinotes.firebaseapp.com",
    databaseURL: "https://pastalavista-musinotes.firebaseio.com",
    projectId: "pastalavista-musinotes",
    storageBucket: "pastalavista-musinotes.appspot.com",
    messagingSenderId: "1028211043613",
    appId: "1:1028211043613:web:c8b2336bf51cf81665c5f4",
    measurementId: "G-HBF1KMS1W8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
// firebase.analytics();

export default firebase;