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
                    <div className="bubble-list">
                        <h3><Link className="bubble-link" to={'/bubbles/' + id}>
                            <span className="name-span">{name}</span><br></br>
                            <span className="price-span">{price} kr.</span><br></br>
                            <img src={image} alt="" style={{ width: 120 }}></img>
                            </Link>
                        </h3>
                    </div>
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
