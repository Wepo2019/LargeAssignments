import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NavigationBar from './NavigationBar/NavigationBar';
import Home from './Home/Home';
import About from './About/About';
import Products from './Products/Products';
import Bundles from './Bundles/Bundles';
import BubbleDetail from './BubbleDetail/BubbleDetail';
import Cart from './Cart/Cart';
import CheckOut from './CheckOut/CheckOut';
import bubbleService from '../services/bubbleService';
import { BubbleProvider } from '../context/BubbleContext';

import bundlesService from '../services/bundlesService';
import { BundlesProvider } from '../context/BundlesContext';


/*
<Route exact path="/bundles" component={ Bundles } />
<Route exact path="/cart" component={ Cart } />
<Route exact path="/orders/:telephone" component={ Orders } />
*/

class App extends React.Component {
  componentDidMount() {
    bubbleService.getAllBubbles().then(data => this.setState({ bubbles: {...this.state.bubbles, list: data}}));

    bundlesService.getAllBundles().then(data => this.setState({bundles: {...this.state.bundles, list: data}}));
  }

  constructor(props) {
    super(props);
    this.state = {
      bubbles: {
        list: []
      },
      bundles: {
        list: []
      }
    }
  }

  render() {
    return (
      <BubbleProvider value={ this.state.bubbles }>
        <BundlesProvider value={ this.state.bundles}>
          <div>
            <NavigationBar />
            <div className="container">
              <Switch>
                  <Route exact path="/" component={ Home } />
                  <Route exact path="/about" component={ About } />
                  <Route exact path="/bubbles" component={ Products } />
                  <Route exact path="/bundles" component={ Bundles } />
                  <Route exact path="/bubbles/:bubbleid" component={ BubbleDetail } />
                  <Route exact path="/cart" component={ Cart } />
                  <Route exact path="/checkout" component={CheckOut} />
              </Switch>
          </div>
        </div>
        </BundlesProvider>
      </BubbleProvider>
    )
  }
};

export default App;
