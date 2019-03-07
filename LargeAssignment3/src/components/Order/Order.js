import React from 'react';
import orderService from '../../services/orderService';

class Order extends React.Component {
    componentDidMount() {
        orderService.getAllOrderForTel(this.props.match.params.telephone).then(data => this.setState({ orders: data}));
    }
    
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    addOrder(e, orderIndex) {
        //LITERALLY NO TIME TO DISPLAY ANYTHING RIGHT, TIMES UP
        //get from localStorage
        let storage = JSON.parse(localStorage.getItem("cart"));
        //for loop through each bubbles and bundles
        //add those things to local storage object
        //bubbles
        console.log(this.state.orders[orderIndex].order);
        console.log(this.state.orders[orderIndex].order);
        if(this.state.orders[orderIndex].order.bubbles.length > 0) {
            for(let i = 0; i < this.state.orders[orderIndex].order.bubbles.length; i++) {
                storage.bubbles.push(this.state.orders[orderIndex].order.bubbles[i]);
            }
        }
        //bundles
        if(this.state.orders[orderIndex].order.bundles.length > 0) {
            for(let i = 0; i < this.state.orders[orderIndex].order.bundles.length; i++) {
                storage.bubbles.push(this.state.orders[orderIndex].order.bundles[i]);
            }
        }
        //save back into local storage
        localStorage.setItem("cart", JSON.stringify(storage));
        this.props.history.push('/cart');
        //redirect
    }

    fillHtmlElements() {
        let html = [];
        for(let i = 0; i < this.state.orders.length; i++) {
            html.push(
                <div key={"div" + i}>
                    <h4 key={"orderName" + i} className="detail-header">
                        {"Order " + (i + 1)}
                    </h4>
                    <button key={"addBtn" + i} className="checkout-button bubble-link-black" onClick={ e => this.addOrder(e, i) }>Add to cart</button>
                </div>
            );
        }
        return html;
        //return list of html elements
    }

    render(){
        if(this.state.orders.length > 0) {
            let htmlElements = this.fillHtmlElements();
            
            return (
                <div>{htmlElements}</div>
            );
        }
        else {
            return (
                <h4>This number has no previous orders registered</h4>
            );
        }
    }
};

export default Order;