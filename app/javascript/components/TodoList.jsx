import React from 'react';
import TodoListItem from './TodoListItem.jsx';

class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { todos: null };
    }

    componentDidMount() {
        this.fetchTodos(this.receiveTodos.bind(this));
    }

    fetchTodos(callback) {
        $.ajax({
            type: 'GET',
            url: '/todos',
            success: function(data) {
              callback(data);
            }
          })
    }


    receiveTodos(data) {
      const allTodos = Object.keys(data).map(id => data[id]) // array of todos
      this.setState({ todos: allTodos })
      console.log('hits this')

    }

    render() {
        if (this.state.todos !== {}) {
          return (
            const todos = this.state.todos;
            <div>

              ${todos}

            </div>

          )

        } else {
          return null;
        }



  }



}


export default TodoList;
