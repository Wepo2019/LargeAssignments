import React from 'react';
import { Link } from 'react-router-dom';

class History extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                tel: ''
            }
        }
    }

    onInput(e) {
        this.setState({
            fields: {
            ...this.state.fields,
            [e.target.name]: e.target.value }
        });
    };

    render(){
        return (
            <>
                <input type="number" name="tel" onInput={e => this.onInput(e)}></input>
                <Link className="checkout-button bubble-link-black" to={'/orders/' + this.state.fields.tel}>Submit</Link>
            </>
        );
    }
};

export default History;