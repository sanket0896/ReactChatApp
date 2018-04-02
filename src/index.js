import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore,applyMiddleware } from 'redux';
// import logger from 'redux-logger';

import './index.css';
import App from './App';
import reducers from './reducers';
import setupWebSocket from './client';
import handleNewMessage from './sagas';
import registerServiceWorker from './registerServiceWorker';

// const store = createStore(chat,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); --use when needing redux dev tools
const sagaMiddleware = createSagaMiddleware();
const middleWares = applyMiddleware(/*logger,*/sagaMiddleware);
const store = createStore(reducers,middleWares);

// const userName = "Sanket";
// store.dispatch(addUser(userName));

const socket = setupWebSocket(store);

sagaMiddleware.run(handleNewMessage, {socket});

// store.subscribe(()=>console.log(store.getState()));

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, 
document.getElementById('root'));

registerServiceWorker();
