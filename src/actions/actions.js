import * as types from './actionTypes';

export function getToDos(){
    return {
        type : types.FETCH_TODOS,
        payload : new Promise((resolve,reject)=>{
            chrome.storage.local.get('todos',(result)=>{
                resolve(result.todos);
            });
        })
    };
}


export function addToDo(todos){
    return {
        type : types.ADD_TODO,
        payload : new Promise((resolve,reject)=>{
            chrome.storage.local.set({
                todos
            },()=>{
                resolve();
            });
        })
    };
}

export function getBookmarks(recentPageToView){
    return {
        type : types.FETCH_BOOKMARKS,
        payload : new Promise((resolve,reject)=>{
            chrome.bookmarks.search({},(data)=>{
                data.sort((a,b)=>{
                    return b.dateAdded-a.dateAdded;
                });
                resolve(data.slice(0,recentPageToView).filter((page)=>page.title));
            });
        })

    }
}