import React from 'react';
import Bubble from '../Bubble/Bubble';
import { BubbleConsumer } from '../../context/BubbleContext';

const Products = (props) => {
    return (
        <BubbleConsumer>
            { 
                BubbleContext => console.log(BubbleContext.list.map(item => <Bubble key={ item.id } { ...item } />))
            }
        </BubbleConsumer>
    )
};

export default Products;