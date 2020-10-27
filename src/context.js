import { firebase } from './firebase/config';
import React, { useContext } from 'react';

export const userContext = React.createContext({
	user: null
});

export const useSession = () => {
	const { user } = useContext(userContext);
	return user;
};

export const useAuth = () => {
	const [state, setState] = React.useState(() => {
		const user = firebase.auth().currentUser;
		return {
			initializing: !user,
			user
		};
	});

	function onChange(user) {
		setState({ initializing: false, user });
	}

	React.useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged(onChange);

		return () => unsubscribe();
	}, []);

	return state;
};
