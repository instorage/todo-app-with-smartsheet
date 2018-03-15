import './todo-item.scss';

import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as util from '../../lib/util.js';
import * as todoList from '../../action/todo.js';
import TodoForm from '../todo-form';

let emptyState = {
  editing: false,
};

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = props.todo ? { ...emptyState, ...props.todo } : emptyState;
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.makeEditable = this.makeEditable.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = { ...this.state, status: props.todo.cells[1].value };
  }

  makeEditable(e) {
    this.setState({ editing: true });
  }

  handleUpdate(todo) {
    this.setState({ editing: false });
    this.props.update(todo);
  }

  handleChange(e) {
    let { name, type, checked } = e.target;
    if (type === 'checkbox') {
      this.setState({ [name]: checked }, () => {
        this.props.updateCheck(this.state);
      });
    }
  }

  handleRemove(todo) {
    this.props.remove(this.props.todo);
  }

  render() {
    let { todo, columns } = this.props;
    let buttonText = this.state.editing ? 'Update' : 'Edit';

    let dateStringFormatted = () => {
      let dateString = new Date(todo.cells[2].value);
      let day = dateString.getUTCDate();
      day = day.toString().length > 1 ? day : '0' + day;
      let month = dateString.getUTCMonth() + 1;
      month = month.toString().length > 1 ? month : '0' + month;
      let year = dateString.getUTCFullYear();
      return `- ${month}/${day}/${year}`;
    };

    return (
      <div className='todo-item'>
        <div className='checkbox-status'>
          <input
            type='checkbox'
            name='status'
            onChange={this.handleChange}
            checked={this.state.status}
          />
        </div>

        {this.state.editing ?
          <div>
            <TodoForm
              todo={todo}
              columns={columns}
              onComplete={this.handleUpdate}
            />
          </div>
          :
          todo && <div onDoubleClick={this.makeEditable}>
            <p style={{ textDecoration: this.state.status && 'line-through #999' }}>
              {todo.cells[0].value} {todo.cells[2].value && dateStringFormatted()}
            </p>
          </div>
        }

        {!this.state.editing && <button onClick={this.makeEditable}>Edit</button>}
        <button
          className='remove-btn'
          onClick={this.handleRemove}>x</button>
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
  updateCheck: (todo) => dispatch(todoList.updateCheck(todo)),
  remove: (todo) => dispatch(todoList.destroy(todo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);



