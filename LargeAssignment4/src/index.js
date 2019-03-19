import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import '../styles/site.css';
import '../styles/site.less';

ReactDOM.render(<Router><App /></Router>, document.getElementById('app'));
