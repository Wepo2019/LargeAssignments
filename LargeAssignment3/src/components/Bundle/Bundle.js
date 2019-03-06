import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BundlesConsumer } from '../../context/BundlesContext';

const Bundle = (props) => {
    const { id, name, items} = props;
    
    return (
    <BundlesConsumer>
        {
            BundlesContext => {
                return (
                    <h3><Link to={'/bundles/' + id}>{name}</Link></h3>
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