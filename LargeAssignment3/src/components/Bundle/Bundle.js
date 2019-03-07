import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BundlesConsumer } from '../../context/BundlesContext';
import BubbleDetail from '../BubbleDetail/BubbleDetail';

class Bundle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bundle: this.props
        }
    }

    handleClick(e) {
        //localStorage.clear(); // Taka út fyrir final product
        if(localStorage.getItem('cart') === null) {
            let item = {bubbles: [], bundles: [] };
            localStorage.setItem('cart', JSON.stringify(item));
        }
       let item = JSON.parse(localStorage.getItem('cart'));
       item.bundles.push(this.state.bundle);
       localStorage.setItem('cart', JSON.stringify(item));
    }

    render() {
        const { id, name, items} = this.state.bundle;
        return (
        <BundlesConsumer>
            {
                BundlesContext => {
                    const bubbles = [];
                    for(let i = 0; i < items.length; i++) {
                        bubbles.push(<div key={i}>{<BubbleDetail bubbleid={this.props.items[i]}/>}</div>); //endi á push
                    }

                    return (
                        <>
                            <div className="bundle-div" style={{ width: 1000 }}>
                                <p id="bundle-name">{name}</p>
                                {bubbles}
                                <button type="button" className="cart-button" onClick={ e => this.handleClick(e) }>Add to cart!</button>
                            </div>
                        </>
                    )
                }
            }
        </BundlesConsumer>
        );
    }
}

Bundle.propTypes = {
    //The bunble provided as props
    //The id of the bunble
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
    //The name of the bunble
    name: PropTypes.string.isRequired,
    //The items in the bunble
    items: PropTypes.array.isRequired
};

export default Bundle;
