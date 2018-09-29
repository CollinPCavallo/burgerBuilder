import React from 'react'
import classes from './Burger.css';
import BurgerIngredient from './BugerIngredient/BurgerIngredient';

const burger = (props) => {
    //7: returning an array of the key values coming from props.ingredients a.k.a our state of ingredients
    let transformedIngredients = Object.keys( props.ingredients )
        .map( igKey => {
            return [...Array( props.ingredients[igKey] )].map( ( _, i ) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            } );
        } )
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }
    return (
        <div className={classes.Burger}>
        <BurgerIngredient type='bread-top' />
            {transformedIngredients}
        <BurgerIngredient type='bread-bottom' />
        </div>
    );

}
export default burger;