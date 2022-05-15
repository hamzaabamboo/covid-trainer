import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import App from './App';

import './tailwind.generated.css';

import { firebaseConfig } from './firebase.config';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

firebase.initializeApp(firebaseConfig);
