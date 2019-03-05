import React from 'react';
import { BubbleConsumer } from '../../context/BubbleContext';

/*
Ok, kannski viljum við ekki nota context til að fá allan listann og svo filterann hann í 1 item
Super messed up ef við gerum bubble consumer í render þá virkar það en verður undefined þegar við reynum að returna html element með value
*/

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