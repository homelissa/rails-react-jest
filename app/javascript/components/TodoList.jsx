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
              callback(data['todos']);
            }
          })
    }


    receiveTodos(data) {
      this.setState({ todos: data })
    }

    render() {
      if (!this.state.todos) {
        return null;
      }

      const todos = this.state.todos
      const todoItems = todos.map(todo => (
        <TodoListItem
          key={todo.id}
          todo={todo}
        />
      ))

      return(
        <ul>{ todoItems }</ul>
      )

  }

}


export default TodoList;
