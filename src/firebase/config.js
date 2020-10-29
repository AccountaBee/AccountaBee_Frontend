import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import apiKeys from '../../config/keys'

if (!firebase.apps.length) {
	firebase.initializeApp(apiKeys.firebaseConfig);
}

export { firebase };
