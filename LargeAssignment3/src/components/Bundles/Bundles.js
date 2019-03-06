import React from 'react';
import Bundle from '../Bundle/Bundle';
import { BundlesConsumer } from '../../context/BundlesContext';

const Bundles = (props) => {
    return (
        <BundlesConsumer>
            { 
                BundlesContext => BundlesContext.list.map(item => <Bundle key={ item.id } { ...item } />)
            }
        </BundlesConsumer>
    )
};

export default Bundles;