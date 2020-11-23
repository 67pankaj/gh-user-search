import React from 'react';
import {render} from 'react-dom';
import {Main} from './components';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import userStats from './store/reducer';
import './styles/App.css';

const store = createStore(userStats);

render(<Provider store={store}><Main /></Provider>, document.getElementById('app'));