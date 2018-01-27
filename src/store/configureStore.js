import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/rootReducer';
import ReduxPromise from 'redux-promise';

export default function configureStore() {
    return applyMiddleware(ReduxPromise)(createStore)(rootReducer);
}