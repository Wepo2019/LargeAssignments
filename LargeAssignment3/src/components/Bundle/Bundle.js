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
                    bubbles.push(<span key={items[i]}>{<BubbleDetail bubbleid={items[i]}/>}</span>);
                }

                return (
                    <>
                        <p>{name}</p>
                        {bubbles}
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