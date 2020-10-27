import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { user, goals, friends, requests, sentRequests, posts, unseenLikes } from './reducers';

const reducer = combineReducers({
	user,
	friends,
	goals,
	sentRequests,
	requests,
	posts,
	unseenLikes
});

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = createStore(reducer, middleware);

export default store;
