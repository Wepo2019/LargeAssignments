import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BubbleConsumer } from '../../context/BubbleContext';

const Bubble = (props) => {
    const { id, name, description, price, image } = props;

    return (
    <BubbleConsumer>
        {
            BubbleContext => {
                return (
                    <h3><Link className="bubble-link" to={'/bubbles/' + id}>{name}</Link></h3>
                )
            }
        }
    </BubbleConsumer>
    );
};

Bubble.propTypes = {
    //The bubble provided as props
    //Id of the bubble
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
    //Name of the bubble
    name: PropTypes.string.isRequired,
    //Description of the bubble
    description: PropTypes.string.isRequired,
    //Price of the bubble
    price: PropTypes.number.isRequired,
    //Image of the bubble
    image: PropTypes.string.isRequired
};

export default Bubble;
