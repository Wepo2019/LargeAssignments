import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NavigationBar from './NavigationBar/NavigationBar';
import Home from './Home/Home';
import About from './About/About';

const App = () => {
    return (
      <div>
        <NavigationBar />
        <div className="container">
            <Switch>
                <Route exact path="/" component={ Home } />
                <Route exact path="/about" component={ About } />
            </Switch>
        </div>
      </div>
    )
};

export default App;
