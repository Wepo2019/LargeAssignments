import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BubbleConsumer } from '../../context/BubbleContext';
import BubbleDetail from '../BubbleDetail/BubbleDetail';

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
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
};

export default Bubble;
