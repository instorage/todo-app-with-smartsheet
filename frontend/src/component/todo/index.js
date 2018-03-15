import React, { Component } from 'react';
import { connect } from 'react-redux';
import './todo.scss';

import TodoItem from '../todo-item';
import ToDoForm from '../todo-form';
import * as todoList from '../../action/todo.js';

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.handleCreate = this.handleCreate.bind(this);
  }
  handleCreate(todo) {
    this.props.create(todo);
  }

  componentDidMount() {
    this.props.fetch()
      .catch(console.error);
  }

  render() {
    let { todos } = this.props;
    let loaded = this.props.todos.rows ? true : false;
    let columns = this.props.todos.columns ? this.props.todos.columns : [];

    return (
      <div className='todo'>
        <h1>ToDo</h1>
        <p>
          Add a todo by entering a todo item<br/>
          Edit todo by clicking the edit button or double clicking the todo item<br/>
          Check a todo to mark it as done
        </p>
        {loaded ? todos.rows.map(item =>
          <TodoItem
            key={item.id}
            todo={item}
            columns={todos.columns}
          />)
          : 'loading...'}
        {loaded &&
          <div className='todo-form-submit'>
            <ToDoForm
              onComplete={this.handleCreate}
              columns={todos.columns}
            />
          </div>
        }
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
  fetch: () => dispatch(todoList.fetch()),
  create: (todo) => dispatch(todoList.create(todo)),
  update: (todo) => dispatch(todoList.update(todo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);

