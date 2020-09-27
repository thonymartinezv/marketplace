import credentials from './Credentials'
import firebase from 'firebase/app'
import 'firebase/firestore'

if (!firebase.apps.length) {
    try {
        firebase.initializeApp(credentials)
    } catch (err) {
        console.log(err)
    }
}

export default firebase