import React from 'react';
import ReactDOM from 'react-dom';

class Todo extends React.Component{

    render(){
        return(
            <div>
                Todo
                <input type="text" className="todo-input" placeholder="याहा लेकहनुहोस"/>
            </div>
        );
    }
}

export default Todo;