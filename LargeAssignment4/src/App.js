import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import '../styles/site.css';
import thunk from 'redux-thunk';
import Login from './components/Login/Login';
import { getAllUsernames } from './actions/userActions';
import reducers from './reducers/loginReducer';

class App extends React.Component {

    componentDidMount() {
        this.props.getAllUsernames();
    }
    render () {
        return <Login />
    }
};

const AppWithUsers = connect(null, { getAllUsernames })(App);

ReactDOM.render(<Provider store={ createStore(reducers, applyMiddleware(thunk)) }><Router><AppWithUsers /></Router></Provider>, document.getElementById('app'));
