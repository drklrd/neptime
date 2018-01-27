import {FETCH_TODOS,ADD_TODO} from '../actions/actionTypes';

export default function(state=[],action){
    switch(action.type){
        case FETCH_TODOS:
            return action.payload;
        case ADD_TODO:
            return state;
        default:
            return state;
    }
}