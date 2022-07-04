import { combineReducers, createStore } from "redux";
import postsDataReducer from "./postsData-reducer";
import newPostTextReducer from "./newPostText-reducer";

let reducers = combineReducers({
    postsData: postsDataReducer,
    newPostText: newPostTextReducer
});

let store = createStore(reducers);

export default store;