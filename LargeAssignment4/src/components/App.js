import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login/Login';
import Chatio from './Chatio/Chatio';

class App extends React.Component {

    componentDidMount() {
        
    }

    render () {
        return (
            <Switch>
                <Route exact path="/" component={ Login } />
                <Route exact path="/ChatIO" component={ Chatio } />
            </Switch>
        )   
    }
};

export default App;