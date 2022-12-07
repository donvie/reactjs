import React  from 'react';
import Box from '@mui/material/Box';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        description: '',
        todos: [
          {
            id: 1,
            description: 'Coding',
            isCompleted: false
          },
          {
            id: 2,
            description: 'Playing basketball',
            isCompleted: false
          }
        ]
    };

    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  handleChange(event) {
    this.setState({description: event.target.value});
  }

  addTodo () {
    this.setState({
      todos: [
        ...this.state.todos,
        ...[{
            id: this.state.todos.length,
            description: this.state.description,
            isCompleted: false
        }]
      ]
    })
    this.setState({description: ''});
  }

  deleteTodo (index) {
    const todos = [...this.state.todos];
    todos.splice(index, 1);
    this.setState({todos});
  }

  render() {
    return (
      <Box margin={'100px'}>
        <input placeholder="Input your todo" value={this.state.description} type="text" onChange={this.handleChange} /> <br/>
        <button onClick={this.addTodo}>Add Todo</button>
        <h1>Todos {this.state.description}</h1>
        {
          this.state.todos.map((todo, index) => {
            return <div key={index}>
              {todo.description}
              <button onClick={() => this.deleteTodo(index)}>X</button>
            </div>
          })
        }
      </Box>
    );
  }
}

export default Todo;
