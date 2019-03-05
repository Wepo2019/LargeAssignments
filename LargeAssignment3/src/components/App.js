import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NavigationBar from './NavigationBar/NavigationBar';
import Home from './Home/Home';
import About from './About/About';
import Products from './Products/Products';
import BubbleDetail from './BubbleDetail/BubbleDetail';
import bubbleService from '../services/bubbleService';
import { BubbleProvider } from '../context/BubbleContext';

/*
<Route exact path="/bubbles/:bubbleid" component={ Bubble } />
<Route exact path="/bundles" component={ Bundles } />
<Route exact path="/cart" component={ Cart } />
<Route exact path="/orders/:telephone" component={ Orders } />
*/

class App extends React.Component {
  componentDidMount() {
    bubbleService.getAllBubbles().then(data => this.setState({ bubbles: {...this.state.bubbles, list: data}}));
  }

  constructor(props) {
    super(props);
    this.state = {
      bubbles: {
        list: []
      }
    }
  }

  render() {
    return (
      <BubbleProvider value={ this.state.bubbles }>
        <div>
          <NavigationBar />
          <div className="container">
              <Switch>
                  <Route exact path="/" component={ Home } />
                  <Route exact path="/about" component={ About } />
                  <Route exact path="/bubbles" component={ Products } />
                  <Route exact path="/bubbles/:bubbleid" component={ BubbleDetail } />
              </Switch>
          </div>
        </div>
      </BubbleProvider>
    )
  }
};

export default App;
