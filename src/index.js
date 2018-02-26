import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import App from './App';
import chat from './reducers/index'
import registerServiceWorker from './registerServiceWorker';

const store = createStore(chat);

store.subscribe(()=>{console.log("Store Changed",store.getState());
});

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, 
document.getElementById('root'));

registerServiceWorker();
