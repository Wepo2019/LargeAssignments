import '../styles/site.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Login from './components/Login/Login';


class App extends React.Component {

    componentDidMount() {
        
    }

    render () {
        return <Login />
    }
};

ReactDOM.render(<Router><App /></Router>, document.getElementById('app'));
