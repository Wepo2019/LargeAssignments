import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BundlesConsumer } from '../../context/BundlesContext';
import BubbleDetail from '../BubbleDetail/BubbleDetail';

class Bundle extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, name, items} = this.props;
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
                            <p id="bundle-name">{this.props.name}</p>
                            {bubbles}
                            <button type="button" className="cart-button">Add to cart!</button>
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
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
    name: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
};

export default Bundle;
