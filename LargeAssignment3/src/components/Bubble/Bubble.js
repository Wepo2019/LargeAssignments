import React from 'react';
import PropTypes from 'prop-types';
import { BubbleConsumer } from '../../context/BubbleContext';

const Bubble = (props) => {
    const { id, name, description, price, image } = props;

    return (
    <BubbleConsumer>
        {
            BubbleContext => {
                return (
                <h3> {name} </h3>
                )
            }
        }
    </BubbleConsumer>
    );
};

Bubble.propTypes = {
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
};

export default Bubble;