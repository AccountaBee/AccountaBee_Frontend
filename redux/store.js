import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { user, goals, friends, requests, sentRequests, posts, singlePost } from "./reducers";

const reducer = combineReducers({
	user,
	friends,
	goals,
	sentRequests,
	requests,
	posts,
	singlePost
});

const middleware = composeWithDevTools(
	applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
