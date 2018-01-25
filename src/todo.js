import React from 'react';

class Todo extends React.Component{

    constructor(props){
        super(props);
        this.taskDone = this.taskDone.bind(this);
        this._newTaskAdded = this._newTaskAdded.bind(this);
        this.onHandleInputChange = this.onHandleInputChange.bind(this);
        this.state = {
            todos : [],
            newtask : ''
        };
    }

    _updateTodos(todos){
        chrome.storage.local.set({
            todos
        });
        this.setState({
            todos,
            newtask : ''
        });
    }

    onHandleInputChange(e) {
        this.setState({
            newtask: e.target.value
        });
    }

    taskDone(index){
        const todos = this.state.todos;
        todos[index]['done'] = !todos[index]['done'];
        this._updateTodos(todos);
    }

    _taskDelete(index){
        const todos = this.state.todos;
        todos.splice(index,1);
        this._updateTodos(todos);

    }

    componentWillMount(){
        chrome.storage.local.get('todos',(result)=>{
            if(result.todos){
                this.setState({
                    todos : result.todos
                })
            }
        });
    }

    renderToDos(){
        const todosTemlate = this.state.todos.map((todo,index)=>{
            return(
                <div className="row todo col-xs-offset-3" key={index}>
                    <div className="col-xs-1">
                        <span className={todo.done ? "fa fa-check-circle-o pointer" : "fa fa-circle-thin pointer"} onClick={()=>this.taskDone(index)}></span>
                    </div>
                    <div className={todo.done ? 'col-xs-8 align-left to-done' : 'col-xs-8 align-left'}>
                        { todo.todo }
                    </div>
                    <div className='col-xs-1'>
                        <span className="fa fa-times pointer" onClick={()=>this._taskDelete(index)}></span>
                    </div>
                </div>
            );
        });
        return todosTemlate;
    }

    _newTaskAdded(e){
        if (e.key === 'Enter') {
            const todos = this.state.todos;
            todos.push({
                todo : e.target.value,
                done : false
            });
            this._updateTodos(todos);
        }
    }

    render(){
        const totosTemlate = this.state.todos.length ? this.renderToDos() : '';
        return(
            <div>
                <h2>आज भोली गर्नु पर्ने केहि कार्यहरु भए यहाँ टिप्नसक्नुहुनेछ </h2>
                <br/>
                <div className="row">
                    <input type="text" onChange={this.onHandleInputChange} value={this.state.newtask} className="todo-input" placeholder="यहाँ लेख्नुहोस..." onKeyPress={this._newTaskAdded}/>
                </div>
                {
                    <div className="todos-list">
                        { totosTemlate }
                    </div>
                }
            </div>
        );
    }
}

export default Todo;