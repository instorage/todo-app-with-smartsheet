let emptyState = {};

export default (state = emptyState, { type, payload }) => {

  switch (type) {
    case 'TODO_SET':
      return payload;

    case 'TODO_CREATE':
      return { ...state, rows: [...state.rows, payload.result] };

    case 'TODO_UPDATE':
      return {
        ...state,
        rows: state.rows.map(row => row.id === payload.result[0].id ? payload.result[0] : row),
      };

    case 'TODO_REMOVE':
      return {
        ...state,
        rows: state.rows.filter(row => row.id !== payload.id),
      };

    default:
      return state;
  }
};

