import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import './index.css';
import App from './App';
import chat from './reducers/index';
import { addUser } from './actions/index';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(chat,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.dispatch(addUser("Sanket"));
store.dispatch(addUser("Som"));
store.dispatch(addUser("Gulu"));

// store.subscribe(()=>console.log(store.getState()));

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, 
document.getElementById('root'));

registerServiceWorker();
