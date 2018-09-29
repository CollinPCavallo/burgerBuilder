import React, {Component} from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Aux from '../../hoc/Auxil/Aux';
import Burger from '../../componets/Burger/Burger';
import BuildControls from '../../componets/Burger/BuildControls/BuildControls';
import Modal from '../../componets/UI/Modal/Modal';
import OrderSummary from '../../componets/Burger/OrderSummary/OrderSummary';
import Spinner from '../../componets/UI/Spinner/Spinner';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.7,
    meat: 1.5,
    bacon: 1
}
class BurgerBuidler extends Component {
    state = {
        ingredients: null,
        purchaseable: false,
        totalPrice: 4,
        orderClicked: false,
        loading: false,
        error: false
    };
    componentDidMount = () => {
        axios.get('https://burgerbuilder-9c368.firebaseio.com/ingredients.json')
        .then(res => {
            this.setState({ingredients: res.data})
        })
        .catch(err => {
            this.setState({error: true})
        })
    };

    updatePurchaseableState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            },0);
            this.setState({purchaseable: sum > 0});
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseableState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        };
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseableState(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({orderClicked: true});
    };

    purchaseCancelHandler = () => {
        this.setState({orderClicked: false});
    };

    purchaseContinuelHandler = () => {
        this.setState({loading: true});
        const {ingredients, totalPrice} = this.state;
        const order ={
            ingredients,
            totalPrice,
            customer: {
                name:'Collin Cavallo',
                address: {
                    street: 'Test St',
                    zipCode: '77777',
                    country: 'US'
                },
                email: 'test@test.com'

            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({loading: false, orderClicked: false});
            })
            .catch(err => {
                this.setState({loading: false, orderClicked: false});
            });
    };


    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };

        let orderSummary = null;

        let burger = this.state.error ? <p>ingredients cannot be loaded</p> : <Spinner /> ;
        
        if ( this.state.ingredients ) {
            burger = (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchaseable={this.state.purchaseable}
                    order={this.purchaseHandler} /> 
            </Aux> 
            );
            orderSummary = <OrderSummary
                continueClicked={this.purchaseContinuelHandler}
                cancelClicked={this.purchaseCancelHandler}
                ingredients={this.state.ingredients}
                price={this.state.totalPrice} />;
        };

        if (this.state.loading) {
            orderSummary = <Spinner />;
        };

        return (
            <Aux>
                <Modal show={this.state.orderClicked} modalClose={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
                
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuidler, axios);