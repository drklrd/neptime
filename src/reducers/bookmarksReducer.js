import {FETCH_BOOKMARKS} from '../actions/actionTypes';

export default function(state=[],action){
    switch(action.type){
        case FETCH_BOOKMARKS:
            return action.payload;
        default:
            return state;
    }
}