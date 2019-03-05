import React from 'react';
import { BubbleConsumer } from '../../context/BubbleContext';

class BubbleDetail extends React.Component {
    componentDidMount() {
        <BubbleConsumer>
        {
            (context) => { 
                const item = context.list.filter(item => item.id == this.props.match.params.bubbleid);
                console.log("Shit");
                this.setState({bubble: item});
            }
        }
        </BubbleConsumer>
    }

    constructor(props) {
        super(props);
        this.state = {
            bubble: {}
        }
    }

    render() {
        console.log(this.state.bubble);
        return (
            <h3>{this.state.bubble.name}</h3>
        );
    }
};

export default BubbleDetail;