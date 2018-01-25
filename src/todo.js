import React from 'react';
import ReactDOM from 'react-dom';

const todos = [
    {
        todo : 'buy tc',
        done : true
    },{
        todo : 'go to movie',
        done : false
    }

];

class Todo extends React.Component{

    constructor(props){
        super(props);
        this.taskDone = this.taskDone.bind(this);
    }

    taskDone(index){
        alert(index);
    }

    renderToDos(){
        const totosTemlate = todos.map((todo,index)=>{
            return(
                <div className="row todo col-xs-offset-4">
                    <div className="col-xs-1">
                        <span className={todo.done ? "fa fa-check-circle-o pointer" : "fa fa-circle-thin pointer"} onClick={()=>this.taskDone(index)}></span>
                    </div>
                    <div className={todo.done ? 'col-xs-7 align-left to-done' : 'col-xs-7 align-left'}>
                        { todo.todo }
                    </div>
                </div>
            );
        });
        return totosTemlate;
    }

    render(){
        return(
            <div>
                <h2>आज भोली गर्नु पर्ने केहि कार्यहरु यहाँ टिप्नुहोस </h2>

                <div className="row">
                    <input type="text" className="todo-input" placeholder="यहाँ लेकहनुहोस"/>
                </div>

                { !todos.length &&
                    <h3>
                        No todos added
                    </h3>
                }

                {
                    todos.length &&
                        <div className="todos-list">
                            { this.renderToDos() }
                        </div>

                }

            </div>
        );
    }
}

export default Todo;