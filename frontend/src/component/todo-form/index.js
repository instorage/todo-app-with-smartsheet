import React, { Component } from 'react';
import { connect } from 'react-redux';

import './todo-form.scss';
import * as util from '../../lib/util.js';

let emptyState = {
  completed: false,
  name: '',
  dueDate: '',
  category: '',
  editing: false,
  value: false,
};

class ToDoForm extends Component {
  constructor(props) {
    super(props);
    this.state = props.todo ? { ...emptyState, ...props.todo } : emptyState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.state = { ...this.state, columns: props.columns };
    this.state = { ...this.state, name: props.todo ? props.todo.cells[0].value : '' };
    this.state = { ...this.state, dueDate: props.todo ? props.todo.cells[2].value : '' };
  }

  handleChange(e) {
    let { name, value, type } = e.target;
    if (type === 'date') {
      this.setState({ dueDate: value });
    }
    this.setState({ [name]: value });

  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state);
    this.setState(emptyState);
    console.log(this.props.todo ? 'Updated' : 'Submitted');
  }

  handleRemove(e) {
    e.preventDefault();
    console.log(e);
    this.props.onRemove(this.state);
  }

  render() {
    let { todo } = this.props;
    let buttonText = todo ? 'Update' : 'Add ToDo';

    return (
      <form
        className='todo-form'
        onSubmit={this.handleSubmit}>

        <div className='form-field'>
          <input
            type='text'
            name='name'
            value={this.state.name}
            placeholder='To Do'
            onChange={this.handleChange}
          />
        </div>
        <div className='form-field'>
          <input
            type='date'
            name='dueDate'
            value={this.state.dueDate}
            onChange={this.handleChange}
          />
        </div>
        <div className='form-field'>
          <button type='submit'> {buttonText} </button>
        </div>

      </form>
    );
  }
}

export default ToDoForm;

