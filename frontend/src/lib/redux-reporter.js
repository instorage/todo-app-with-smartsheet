export default store => next => action => {
  try {
    console.log('ACTION:', action);
    let result = next(action);
    console.log('STATE:', store.getState());
    return result;
  } catch (error) {
    console.error('VALIDATION ERROR:', error);
    action.error = error;
    return action;
  }
};
