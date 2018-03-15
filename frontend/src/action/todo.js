import superagent from 'superagent';

export const set = (todos) => ({
  type: 'TODO_SET',
  payload: todos,
});

export const add = (todo) => ({
  type: 'TODO_CREATE',
  payload: todo,
});

export const change = (todo) => ({
  type: 'TODO_UPDATE',
  payload: todo,
});

export const remove = (todo) => ({
  type: 'TODO_REMOVE',
  payload: todo,
});

export const fetch = () => (store) => {
  return superagent.get(`${__API_URL__}/todos`)
    .then(res => {
      return store.dispatch(set(res.body));
    });
};

export const create = (todo) => (store) => {
  let newToDo = {
    cells: [
      { columnId: todo.columns[0].id, value: todo.name },
      { columnId: todo.columns[1].id, value: todo.value },
      { columnId: todo.columns[2].id, value: todo.dueDate },
      { columnId: todo.columns[3].id, value: todo.category },
    ],
  };

  return superagent.post(`${__API_URL__}/todos`)
    .send(newToDo)
    .then(res => {
      return store.dispatch(add(res.body));
    });
};

export const update = (todo) => (store) => {

  let updatedToDo = {
    id: todo.id,
    cells: [
      { columnId: todo.columns[0].id, value: todo.name },
      { columnId: todo.columns[2].id, value: todo.dueDate },
      { columnId: todo.columns[3].id, value: todo.category },
    ],
  };

  return superagent.put(`${__API_URL__}/todos`)
    .send(updatedToDo)
    .then(res => {
      return store.dispatch(change(res.body));
    });
};


export const updateCheck = (todo) => (store) => {

  console.log('TODO UPDATECHECK--->', todo);

  let updatedToDo = {
    id: todo.id,
    cells: [{ columnId: todo.cells[1].columnId, value: todo.status }],
  };

  return superagent.put(`${__API_URL__}/todos`)
    .send(updatedToDo)
    .then(res => {
      return store.dispatch(change(res.body));
    });
};

export const destroy = (todo) => (store) => {
  return superagent.delete(`${__API_URL__}/todos/${todo.id}`)
    .then(() => {
      return store.dispatch(remove(todo));
    });
};