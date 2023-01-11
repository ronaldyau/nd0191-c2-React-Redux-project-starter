const logger = (store) => (next) => (action) => {
    console.group('Action Type: ', action.type);

    console.log('Current state: ', store.getState());
    console.log('Action: ', action);
  
    const nextMiddleware = next(action);
  
    console.log('New state: ', store.getState());
    console.groupEnd();
  
    return nextMiddleware;
  };
  
  export default logger;