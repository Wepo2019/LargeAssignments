import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BundlesConsumer } from '../../context/BundlesContext';
import BubbleDetail from '../BubbleDetail/BubbleDetail';

const Bundle = (props) => {
    const { id, name, items} = props;
    
    return (
    <BundlesConsumer>
        {
            BundlesContext => {
                const bubbles = [];
                for(let i = 0; i < items.length; i++) {
                    bubbles.push(<div key={items[i]}>{<BubbleDetail bubbleid={items[i]}/>}</div>); //endi á push
                }

                return (
                    <>
                        <div className="bundle-div" style={{ width: 1000 }}>
                        <p id="bundle-name">{name}</p>
                        {bubbles}
                        <button type="button" className="cart-button">Add to cart!</button>
                        </div>
                    </>
                )
            }
        }
    </BundlesConsumer>
    );
};

Bundle.propTypes = {
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
    name: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
};

export default Bundle;