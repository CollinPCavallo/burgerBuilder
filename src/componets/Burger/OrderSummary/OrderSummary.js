import React, { Component } from 'react';
import Aux from '../../../hoc/Auxil/Aux';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component {
    //this could be a functional component, doesnt have to be a class
    componentWillUpdate() {
        console.log('OrderSummary willUpdate')
    }
    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map( igKey => {
                return ( 
                    <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li>);
            } );

        
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Your Burger:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: <strong>${this.props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button clicked={this.props.cancelClicked} btnType='Danger'>CANCEL</Button>
            <Button clicked ={this.props.continueClicked} btnType='Success'>CONTINUE</Button>
        </Aux>

    )
}
}

export default OrderSummary;