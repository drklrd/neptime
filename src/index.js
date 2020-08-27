import configureStore from './store/configureStore';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Neptime from './Neptime';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Neptime />
    </Provider>,
    document.getElementById("app"));