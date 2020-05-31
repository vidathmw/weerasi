import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyBtg44gn0vTz6UpF_RzVCs76hf2HhrwXZs',
    authDomain: 'weerasi.firebaseapp.com',
    databaseURL: 'https://weerasi.firebaseio.com',
    projectId: 'weerasi',
    storageBucket: 'weerasi.appspot.com',
    messagingSenderId: '275313578702',
    appId: '1:275313578702:web:66b70dbadb585c90d2f69f',
    measurementId: 'G-5357H5GES0'
}
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
export const authProviders = {
    Google: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    Email: firebase.auth.EmailAuthProvider.PROVIDER_ID
}

export const fireAuth = firebase.auth()
export default firebase
