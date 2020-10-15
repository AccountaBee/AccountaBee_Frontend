import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
	apiKey: process.env.EXPO_API_API_KEY,
	authDomain: process.env.EXPO_API_AUTH_DOMAIN,
	databaseURL: process.env.EXPO_API_DATABASE_URL,
	projectId: process.env.EXPO_API_PROJECT_ID,
	storageBucket: process.env.EXPO_API_STORAGEBUCKET,
	appId: process.env.EXPO_API_APP_ID,
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export { firebase };
